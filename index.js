const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// shahedshihab0
// vkFod6Y0k4kckwKa

const uri =
  "mongodb+srv://shahedshihab0:vkFod6Y0k4kckwKa@cluster0.tc6ru5z.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const productsCollection = client.db("productsDB").collection("products");
    const cartCollection = client.db("cartDB").collection("cart");

    // api's for products collection
    app.get("/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    app.get("/products/:brand", async (req, res) => {
      const brandName = req.params.brand;
      const query = { brand: brandName };
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send(result);
    });

    app.put("/product/:id", async(req, res) => {
      const id = req.params.id;
      const updatedProduct = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};
      const newProduct = {
        $set: {
          name: updatedProduct.name,
          brand: updatedProduct.brand,
          type: updatedProduct.type,
          price: updatedProduct.price,
          img: updatedProduct.img,
          rating: updatedProduct.rating
        }
      };
      const result = await productsCollection.updateOne(filter, newProduct, options);
      res.send(result);
    })

    // api's for cart
    app.get("/cart", async(req, res) => {
      const result = await cartCollection.find().toArray();
      res.send(result);
    })

    app.post("/cart", async (req, res) => {
      const product = req.body;
      console.log(product);
      const result = await cartCollection.insertOne(product);
      res.send(result)
    });

    app.delete("/cart/:id", async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    })

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
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
