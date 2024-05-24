const cds = require("@sap/cds");
const { MongoClient, ObjectId } = require("mongodb");

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
    mongoCollection = database.collection("Field Users");
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
      const users = await mongoCollection.find({}).toArray();

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

      return users;
    } catch (err) {
      console.error("Failed to fetch data from MongoDB", err);
      req.reject(500, "Failed to fetch data from MongoDB");
    }
  });

  srv.on("PUT", "fieldUserService", async (req) => {
    const id = req.params[0].id;
    const { username, name, email, departments, createdBy, phone } = req.data;

    // Prepare the updated data object
    const updatedData = {
      username,
      name,
      email,
      createdBy,
      phone,
    };

    const departmentUpdate = {
      "departments.0.name": departments,
    };
    try {
      const result = await mongoCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updatedData, ...departmentUpdate } }
      );

      if (result.modifiedCount === 1) {
        console.log(`Successfully updated user with ID: ${id}`);
        return { message: "User updated successfully" };
      } else {
        req.reject(404, "User not found or no changes made");
      }
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
