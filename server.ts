import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import { generateGraphData, splitDataIntoCategories } from "./utils"
dotenv.config()


const port = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json())


const { MONGO_USER, MONGO_PASSWORD } = process.env
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@salt1.r85z6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const collection = client.db("ExpensesTracker").collection("users")


app.post('/addExpense', async (req, res) => {
  const { amount, category, date, comment  } = req.body.expense
  const fullDate = new Date(date)
  const month = fullDate.toLocaleString('en-GB', { month: 'long' })

  const expense = {
    amount,
    category,
    'date': fullDate.toLocaleDateString('en-GB'),
    comment
  }

  await client.connect()
  await collection.updateOne( {user: 'stephan'}, { $push: { [month]: expense } })
  await client.close();
  res.status(201)
  res.end();
})


app.get('/expenses', async (req, res) => {
  if (typeof req.query.month !== "string") {
    throw new Error("Query param 'month' has to be of type string");
  }
  const month = req.query.month.toString()

  await client.connect()
  const document = await collection.findOne({ user: 'stephan'}, {projection: {[month]: 1}});
  await client.close();

  if (document === null) {
    throw new Error("No document found");
  }
  
  const graphData = generateGraphData(document[month])
  const categories = splitDataIntoCategories(document[month])
  res.status(200)
  res.json({graphData, categories});
})

app.listen(port, () => console.log(`Server started on port ${port}`));