import { MongoClient } from "mongodb";

const url = "mongodb+srv://Bahaa_Wafy:a2km62wHeGDrsUw9@cluster0.jm99k54.mongodb.net/"
const client = new MongoClient(url);
client.connect().then(() => {
    console.log("Connected to Mongo server");
}).catch(err => {
    console.log("Error connecting to Mongo server" + err.message);
})


export const db = client.db('mongo_Ass');
