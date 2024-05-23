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

module.exports = cds.service.impl(async function () {
  // Connect to MongoDB when the service starts
  await connectToMongoDB();

  const { fieldUserService } = this.entities;

  this.on("READ", fieldUserService, async (req) => {
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

  this.on("disconnect", async () => {
    if (client) {
      await client.close();
      console.log("Disconnected from MongoDB.");
    }
  });
});
