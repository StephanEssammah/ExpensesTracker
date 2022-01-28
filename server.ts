import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { MongoClient } from 'mongodb'
import { sortTransactions, getDocument, updateDocument, generateGraphData, splitDataIntoCategories } from "./utils"

const { MONGO_USER, MONGO_PASSWORD } = process.env
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@salt1.r85z6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const collection = client.db("ExpensesTracker").collection("users")


dotenv.config()


const port = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json())


app.post('/addExpense', async (req, res) => {
  const { amount, category, date, comment  } = req.body.expense
  const fullDate = new Date(date)
  const month = fullDate.toLocaleString('en-GB', { month: 'long' })

  const expense = {
    amount,
    category,
    'date': fullDate.toLocaleDateString('en-GB'),
    comment,
    id: Date.now()
  }

  await updateDocument(month, expense)
  res.status(201)
  res.end();
})


app.get('/expenses', async (req, res) => {
  if (typeof req.query.month !== "string") {
    throw new Error("Query param 'month' has to be of type string");
  }
  const month = req.query.month.toString()
  const document = await getDocument(req, month)
  const graphData = generateGraphData(document[month])
  const categories = splitDataIntoCategories(document[month])
  res.status(200)
  res.json({graphData, categories});
})

app.get('/history', async (req, res) => {
  if (typeof req.query.month !== "string") {
    throw new Error("Query param 'month' has to be of type string");
  }
  const month = req.query.month.toString()
  const document = await getDocument(req, month)
  if (document[month] === undefined) {

    res.status(200)
    res.json([])
    return;
  }
  const sorted = sortTransactions(document[month])

  res.status(200)
  res.json(sorted)
})

app.delete('/delete', async (req, res) => {
  await client.connect()
  await collection.updateOne( {user: 'stephan'}, { $pull: {[req.body.month]: { id: req.body.id } }})
  await client.close();
  res.status(200).end()
})

app.put('/update', async (req, res) => {
  const {oldExpense, newExpense} = req.body
  const fullDate = new Date(newExpense.date)
  const month = fullDate.toLocaleString('en-GB', { month: 'long' })
  const expense = {
    amount: newExpense.amount,
    category: newExpense.category,
    date: fullDate.toLocaleDateString('en-GB'),
    comment: newExpense.comment,
    id: oldExpense.id
  }
  await client.connect()
  await collection.updateOne( {user: 'stephan'}, { $pull: {[oldExpense.month]: { id: oldExpense.id } }})
  await collection.updateOne( {user: 'stephan'}, { $push: { [month]: expense } })
  await client.close();
  res.status(200).end()
})

app.listen(port, () => console.log(`Server started on port ${port}`));