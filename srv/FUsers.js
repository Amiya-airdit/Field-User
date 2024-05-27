const cds = require("@sap/cds");
const { MongoClient} = require("mongodb");

// MongoDB connection URI
const uri = "mongodb://Amiya:Amiya1999@74.225.222.62:27017/";

// MongoDB Client setup
let client;
let mongoCollection;

async function connectToMongoDB() {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db("Pratham");
    mongoCollection = database.collection("Users");
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

module.exports = async (srv) => {
  // Connect to MongoDB when the service starts
  await connectToMongoDB();

  // const { fieldUserService } = this.entities;

  srv.on("READ", "fieldUserService", async (req) => {
    try {
      let query = { type: 2 }; // Initialize query with a default filter

      // Extract conditions from the req.query.SELECT.where clause if it exists
      if (req.query.SELECT.where) {
        const whereClause = req.query.SELECT.where;
        for (let i = 0; i < whereClause.length; i += 2) {
          // Check for field and value pairs
          if (whereClause[i].ref && whereClause[i + 1] === "=") {
            const field = whereClause[i].ref[0];
            const value = whereClause[i + 2].val;
            query[field] = value;
            i++;
          }
        }
      }

      console.log("Query based on conditions:", query);

      // Fetch users based on constructed query
      const users = await mongoCollection.find(query).toArray();
      console.log("Fetched users:", users);

      for (const user of users) {
        if (user.departments && user.departments.length > 0) {
          const firstDepartmentname = user.departments[0].name;
          user.departments = firstDepartmentname;
        } else {
          user.departments = null; // Set to null if no departments exist
        }
      }

      // Log the results
      users.forEach((user) => {
        console.log(`User: ${user.username}`);
        console.log(`Department Name: ${user.departments}`);
      });
       users['$count'] = users.length
      return users;
    } catch (err) {
      console.error("Failed to fetch data from MongoDB", err);
      req.reject(500, "Failed to fetch data from MongoDB");
    }
  });

  srv.on("PUT", "fieldUserService", async (req) => {
    const email = req.params[0].email;
    const { username, name, departments, phone } = req.data;

    // Prepare the updated data object
    const updatedData = {
      username,
      name,
      phone,
    };

    const departmentUpdate = {
      "departments.0.name": departments,
    };
    try {
      const result = await mongoCollection.updateOne(
        { email: email },
        { $set: { ...updatedData, ...departmentUpdate } }
      );
      console.log(`updated with email${email}`);
      return result;
    } catch (err) {
      console.error("Failed to update data in MongoDB", err);
      req.reject(500, "Failed to update data in MongoDB");
    }
  });
  srv.on("disconnect", async () => {
    if (client) {
      await client.close();
      console.log("Disconnected from MongoDB.");
    }
  });
};
