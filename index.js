const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// shahedshihab0
// vkFod6Y0k4kckwKa



const uri = "mongodb+srv://shahedshihab0:vkFod6Y0k4kckwKa@cluster0.tc6ru5z.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const productsCollection = client.db("productsDB").collection("products");

    app.post("/products", async(req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("gadget geek data is availabe now");
});

app.listen(port, () => {
  console.log(`gadget geek server is running on port: ${port}`);
});
