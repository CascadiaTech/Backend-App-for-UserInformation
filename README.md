# Userinformation fetching and posting
A simple Node.js and Express app for fetching user information from a MongoDB Cluster and posting information to the same cluster.


This is an open sourced Node.js program that can be copied by just about anyone!
Its really easy to setup and is meant for begginers who are trying to learn the MERN stack


Instructions: 

git clone the repo in your project folder

create a .env file with your SECRETKEY or srv string from Mongodb in your project folder

Create a srv key on Mongodb - To create an SRV key on Mongodb make yourself user credentials to read/write from your cluster and follow the steps to create a srv for a Node.js driver

insert your srv key in the .env file called SECRETKEY (e.g. SECRETKEY="srv")

run npm install
run node app.mjs

It will run on port 5500 on your local machine. If you wish to deploy to heroku it will deploy to the preconfigured port they provide. 

if it is active you will see a console.log(server running on port....)
Contributions: 

app.mjs file carries all the code of the program, if you want to add features to the base repositroy submit a pull request and we will review it. 

Lastly: If you liked this come see more of our work at cascadiafinance.io or @CascadiaTech on tg
