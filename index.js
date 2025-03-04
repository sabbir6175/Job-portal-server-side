const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


//middleware
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vlz3r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // job related apis
    const JobsCollection = client.db('JobPortal').collection('Jobs')
    const JobsApplicationCollection = client.db('JobPortal').collection("job_application")

    app.get('/Jobs',async(req, res)=>{
        const cursor = JobsCollection.find();
        const result = await cursor.toArray()
        res.send(result)
    })
     //job details page
     app.get('/Jobs/:id', async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await JobsCollection.findOne(query)
      res.send(result)
  })
  //job post
  app.post('/jobs', async(req, res)=>{
    const job = req.body;
    const result = await JobsCollection.insertOne(job)
    res.send(result)
  })

    // job my application all data fetch
    //get all data get one data get some data [o , 1, many]
    app.get('/job-application', async(req,res)=>{
      const email = req.query.email;
      const query = {applicant_email: email}
      const result = await JobsApplicationCollection.find(query).toArray()

      for(const application of result){
          console.log(application.job_id)
          const query = {_id: new ObjectId(application.job_id)}
          const job = await JobsCollection.findOne(query)
          if(job){
            application.title = job.title;
            application.company = job.company;
            application.company_logo = job.company_logo;
            application.location = job.location;
            application.jobType = job.jobType;
          }
      }

      res.send(result)
    })
    app.post('/job-applications', async(req,res)=>{
      const application = req.body;
      const result = await JobsApplicationCollection.insertOne(application)
      res.send(result)
    })

    //delete JobsApplicationCollection data
    app.delete('/job-application/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await JobsApplicationCollection.deleteOne(query)
      res.send(result)
    })
    
   


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res)=>{
    res.send('Job is falling from the sky')
})
app.listen(port, ()=> {
    console.log(`Job is waiting at: ${port}`)
})