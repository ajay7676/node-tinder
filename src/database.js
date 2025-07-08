// Go to mongodb website
// Create a free M0 cluster
// Create a user
// Get the connection String

// const URI = "mongodb+srv://ajaychauhanpp44:<ph9OmQ1nTuP7mcoN>@namaste-node.5r8ejyg.mongodb.net/"
// mongodb+srv://ajaychauhanpp44:<ph9OmQ1nTuP7mcoN>@namaste-node.5r8ejyg.mongodb.net/

// Install Mongodb Compass into system

const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://ajaychauhanpp44:e9I5HdTHAPB6YNLw@namaste-node.5r8ejyg.mongodb.net/";

const client = new MongoClient(url, {
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true,
});
const dbName = "HelloWord";

async function main() {
  await client.connect();
  console.log("Connect successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  // Read
  const findResult = await collection.find({}).toArray();
  console.log("Found Documents =>", findResult);

  // Write

  const insertDoc = {
    firstName: "Rahul",
    lastName: "Chauhan",
    age: 31,
    city: "Shahpur",
    country: "India",
    Phone: "9473730263",
  };
  const insertResult = await collection.insertOne(insertDoc);
  console.log(`A document was inserted with the _id: ${insertResult}`);

  // Update
  const query = { firstName: "Ajay" };
  const update = { $set: {  city: "Noida" } };
  const options = {};
  const updateResult = await collection.updateOne(query, update, options);
   console.log(`Update Result` , updateResult)


  // Delete 

    //  const queryDelete = { firstName: "Saurav" };
    // const resultDelete = await collection.deleteOne(queryDelete);
    // if (resultDelete.deletedCount === 1) {
    //   console.log("Successfully deleted one document.");
    // } else {
    //   console.log("No documents matched the query. Deleted 0 documents.");
    // }

    // Get Doocuments Count

    const countResult =await collection.countDocuments({});
     console.log(`Get Doocuments Count` , countResult)
     
  return "Done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
