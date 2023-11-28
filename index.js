const express = require('express');
const app = express()
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ij3feyg.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    
    const trainersCollection = client.db("FitZ").collection("trainers");
    const newsletterCollection = client.db("FitZ").collection("newsletter");
    const galleryCollection = client.db("FitZ").collection("gallery");
    const blogCollection = client.db("FitZ").collection("blogs");
    
    app.get('/trainers', async (req, res) => {
      const result = await trainersCollection.find().toArray()
      res.send(result)
    })
    
    app.get('/trainers/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await trainersCollection.findOne(query);
      res.send(result)
    })
    
    app.get('/gallery', async (req, res) => {
      const result = await galleryCollection.find().toArray()
      res.send(result)
    })

    app.get('/blogs', async (req, res) => {
      const result = await blogCollection.find().toArray()
      res.send(result)
    })

    app.get('/blogs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.findOne(query);
      res.send(result)
    })
    

    app.post('/be-trainer', async (req, res) => {
      const newTrainer = req.body;
      console.log(newTrainer);
      const result = await trainersCollection.insertOne(newTrainer)
      res.send(result)
    })

    app.post('/newsletter', async (req, res) => {
      const newNewsletter = req.body;
      console.log(newNewsletter);
      const result = await newsletterCollection.insertOne(newNewsletter)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('server running')
})

app.listen(port, () => {
  console.log(`runing on port:${port}`);
})