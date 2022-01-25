import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()


const port = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json())


const { MONGO_USER, MONGO_PASSWORD } = process.env
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@salt1.r85z6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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
  // send user from frontend
  const { month } = req.query
  await client.connect()
  const document = await collection.find({ user: 'stephan'}).project({[month]: 1}).toArray();
  await client.close();

  const graphData = []
  for(let i = 1; i < 30; i++) {
    const amount = document[0][month].reduce((prev, curr) => {
      const day = Number(curr.date.split('/')[0])
      if (day === i) return prev + curr.amount
      return prev + 0
    }, 0)
    graphData.push({value: amount, date: i})
  }

  const categories = {
    total: 0,
    home: 0,
    groceries: 0,
    travel: 0,
    other: 0,
  }
 
  document[0][month].forEach((expense) => {
    categories.total += expense.amount
    if(expense.category === 'Other') return categories.other += expense.amount
    if(expense.category === 'Travel') return categories.travel += expense.amount
    if(expense.category === 'Groceries') return categories.groceries += expense.amount
    if(expense.category === 'Home') return categories.home += expense.amount
  })

  res.status(200)
  res.json({graphData, categories});
})



app.listen(port, () => console.log(`Server started on port ${port}`));