// A simple Express App made by @CascadiaTech for getting user info from a MongoDB cluster and Posting information to the cluster.
// Refer to ApeMotorcycleClub repository for the correposding code on the frontend. 
//NOTES// git rm -r --cached node_modules

import { MongoClient } from "mongodb"
import cors from 'cors'
import express from 'express'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config()
var app = express();
app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({extended: true})) 
app.use(express.json()) 

app.get('/',async (req, res) => {

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

if (req.method == "GET") {
      try {
        const uri = process.env.SECRETKEY
        const client = new MongoClient(uri)
        await client.connect()
        const database = client.db('Userinfo')
        const userinfo = database.collection('Userinformation')
        const cursor = await userinfo.find()
        const allValues = await cursor.toArray()
        const final = JSON.stringify(allValues)
        res.send(final)
        return final
      } catch (error) {
        console.log(error)
      } finally {
        const uri = process.env.SECRETKEY
        const client = new MongoClient(uri)
        await client.close()
}}     

})
app.post('/',async (req, res) => {

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
if (req.method == "POST") {
    try {

        const uri = process.env.SECRETKEY
        const client = new MongoClient(uri)
        await client.connect()
        const database = client.db('Userinfo')
        const userinfo = database.collection('Userinformation')

        const doc = {
            address: req.body.address,
            ID: req.body.ID,
            name: req.body.name,
            account: req.body.account,
          }
            await userinfo.insertOne(doc);
          return res.send({result:"success"})
    } catch(error) {
    console.log(error)
    }finally {
    const uri = process.env.SECRETKEY
    const client = new MongoClient(uri)
    await client.close()
  }
  
}})

app.listen(process.env.PORT || 5500, 
	() => console.log("Server is running..."));



