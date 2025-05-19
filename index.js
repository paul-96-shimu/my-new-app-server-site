const express = require('express')
const app = express()

const cors = require('cors')
require('dotenv').config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000
app.use(express.json())

app.use(cors())


// pass-ksRrhtxOTIdlb16s users-new_app


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rhmlrci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const uri = "mongodb+srv://new_app:ksRrhtxOTIdlb16s@cluster0.rhmlrci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


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
        // Send a ping to confirm a successful connection

        const database = client.db("newapssdb");
        const newAppsCollection = database.collection("newapps");



        app.get('/newapps', async (req, res) => {
            // console.log('data in the server', req.body)
            const cursor = newAppsCollection.find();
            const result = await cursor.toArray();
            res.send(result)

        })

        app.get('/newapps/:id', async (req, res) => {
            // console.log('data in the server', req.body)
            const id = req.params.id;

            const query = { _id: new ObjectId(id) };
            const result = await newAppsCollection.findOne(query);
            res.send(result)

        })

        app.post('/newapps', async (req, res) => {
            console.log('data in the server', req.body)
            const newUser = req.body
            const result = await newAppsCollection.insertOne(newUser);
            res.send(result)


        })


        app.put('/newapps/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: new ObjectId(id) };
            const User = req.body


            const updatedDoc = {
                $set: {
                    email: User.email,
                    password: User.password


                }


            }

            const options = { upsert: true }
            const result = await newAppsCollection.updateOne(query, updatedDoc, options);
            res.send(result)

            // console.log(User)

        })



        app.delete('/newapps/:id', async (req, res) => {
            // console.log('data in the server', req.body)
            const id = req.params.id;

            const query = { _id: new ObjectId(id) };
            const result = await newAppsCollection.deleteOne(query);
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


app.get('/', (req, res) => {
    res.send('Hello my new appp')
})

app.listen(port, () => {
    console.log(`new app server ${port}`)
})

