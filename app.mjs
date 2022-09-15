import { createServer } from 'http'
import { MongoClient } from "mongodb"
import cors from 'cors';
import express from 'express'
//import { env } from 'dotenv'

const app = express();
app.use(cors())

app.use(express.static("public"))

app.get('/',async (req, res) => {

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

if (req.method == "GET") {
      try {
        const uri = 'mongodb+srv://Flaskapp:iamdiablo@clustertest.rxvyc0x.mongodb.net/?retryWrites=true&w=majority'
        const client = new MongoClient(uri)
        await client.connect()
        const database = client.db('Userinfo')
        const movies = database.collection('Userinformation')
        const cursor = await movies.find()
        const allValues = await cursor.toArray()
        //console.log(allValues)
        //const final = await cursor.forEach((doc) => console.log(doc))
        const final = JSON.stringify(allValues)
        res.send(final)
        return final
      } catch (error) {
        console.log(error)
      } finally {
        const uri = 'mongodb+srv://Flaskapp:iamdiablo@clustertest.rxvyc0x.mongodb.net/?retryWrites=true&w=majority'
        const client = new MongoClient(uri)
        await client.close()
}}     

})
app.post('/',async (req) => {
if (req.method == "POST") {
    try {

        const uri = 'mongodb+srv://Flaskapp:iamdiablo@clustertest.rxvyc0x.mongodb.net/?retryWrites=true&w=majority'
        const client = new MongoClient(uri)
        await client.connect()
        const database = client.db('Userinfo')
        const movies = database.collection('Userinformation')

        const doc = {
            address: req.body.address,
            name: req.body.name,
          }
          const result = await movies.insertOne(doc);
          return result
    } catch(error) {
    console.log(error)
    }finally {
    const uri = 'mongodb+srv://Flaskapp:iamdiablo@clustertest.rxvyc0x.mongodb.net/?retryWrites=true&w=majority'
    const client = new MongoClient(uri)
    await client.close()
  }
  
}})

app.listen(process.env.PORT || 5500, 
	() => console.log("Server is running..."));



