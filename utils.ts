import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const { MONGO_USER, MONGO_PASSWORD } = process.env
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@salt1.r85z6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const collection = client.db("ExpensesTracker").collection("users")


interface Document {
  amount: number;
  category: string;
  date: string;
  comment: string;
  id: number;
}

export const sortTransactions = (document: Array<Document>) => {
  interface Day {
    amount: number,
    category: string,
    date: string,
    comment: string,
    id: number,
  }
  return document.sort((a: Day, b: Day) => {
    const dayOne = a.date.split('/')[0]
    const dayTwo = b.date.split('/')[0]
    return Number(dayTwo) - Number(dayOne)
  })
}


export const getDocument = async (req: any, month: string) => {
  await client.connect()
  const document = await collection.findOne({ user: 'stephan'}, {projection: {[month]: 1}});
  await client.close();
  if (document === null) {
    throw new Error("No document found");
  }
  return document
}



export const updateDocument = async (month: string, expense: object) => {
  await client.connect()
  await collection.updateOne( {user: 'stephan'}, { $push: { [month]: expense } })
  await client.close();
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
  interface Categories {
    home: {
      value: number,
      transactions: number,
    },
    groceries: {
      value: number,
      transactions: number,
    },
    travel: {
      value: number,
      transactions: number,
    },
    other: {
      value: number,
      transactions: number,
    },
  }


  const categories: Categories =  {
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
    categories[expenseCategory as keyof Categories].value += expense.amount
    categories[expenseCategory as keyof Categories].transactions++
  })
  return {total, ...categories};
}
