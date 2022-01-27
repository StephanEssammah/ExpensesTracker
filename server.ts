import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { sortTransactions, getDocument, updateDocument, generateGraphData, splitDataIntoCategories } from "./utils"

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
    comment
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
  const sorted = sortTransactions(document[month])

  res.status(200)
  res.json(sorted)
})

app.listen(port, () => console.log(`Server started on port ${port}`));