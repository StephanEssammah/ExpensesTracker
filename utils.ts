import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import { Document, Day, Category } from './interfaces'
dotenv.config()

const { MONGO_USER, MONGO_PASSWORD } = process.env
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@salt1.r85z6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const collection = client.db("ExpensesTracker").collection("users")

const connectToDB = async () => await client.connect()
connectToDB()



export const sortTransactions = (document: Array<Document>) => {
  return document.sort((a: Day, b: Day) => {
    const dayOne = a.date.split('/')[0]
    const dayTwo = b.date.split('/')[0]
    return Number(dayTwo) - Number(dayOne)
  })
}



export const getDocument = async (req: any, month: string) => {
  const document = await collection.findOne({ user: 'stephan'}, {projection: {[month]: 1}});
  if (document === null) {
    throw new Error("No document found");
  }
  return document
}



export const addExpense = async (month: string, expense: object) => {
  await collection.updateOne( {user: 'stephan'}, { $push: { [month]: expense } })
}



export const generateGraphData = (document: Array<Document>) => {
  const graphData = []
  if (document === undefined) {
    for(let i = 1; i < 30; i++) {
      graphData.push({value: 0, date: i})
    } 
  } else {
    for(let i = 1; i < 30; i++) {
      const amount = document.reduce((prev, curr) => {
        const day = Number(curr.date.split('/')[0])
        if (day === i) return prev + curr.amount
        return prev + 0
      }, 0)
      graphData.push({value: amount, date: i})
    }
  }
  return graphData;
}



export const splitDataIntoCategories = (document: Array<Document>) => {

  const categories: Category =  {
    home: {
      value: 0,
      transactions: 0,
    },
    groceries: {
      value: 0,
      transactions: 0,
    },
    travel: {
      value: 0,
      transactions: 0,
    },
    other: {
      value: 0,
      transactions: 0,
    }
  }

  if(document === undefined){
    return {
      total: 0,
      home: {
        value: 0,
        transactions: 0,
      },
      groceries: {
        value: 0,
        transactions: 0,
      },
      travel: {
        value: 0,
        transactions: 0,
      },
      other: {
        value: 0,
        transactions: 0,
      },
    }
  }

  let total: number = 0;
  document.forEach((expense) => {
    const expenseCategory: string = expense.category.toLocaleLowerCase()
    total += expense.amount
    categories[expenseCategory as keyof Category].value += expense.amount
    categories[expenseCategory as keyof Category].transactions++
  })
  return {total, ...categories};
}

export const deleteExpense = async (req: any) => {
  await collection.updateOne( {user: 'stephan'}, { $pull: {[req.body.month]: { id: req.body.id } }})
}

export const updateExpense = async (req: any) => {
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
  
  await collection.updateOne( {user: 'stephan'}, { $pull: {[oldExpense.month]: { id: oldExpense.id } }})
  await collection.updateOne( {user: 'stephan'}, { $push: { [month]: expense } })
}