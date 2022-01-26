
interface Document {
  amount: number;
  category: string;
  date: string;
  comment: string;
}

export const generateGraphData = (document: Array<Document>) => {
  const graphData = []
  for(let i = 1; i < 30; i++) {
    const amount = document.reduce((prev, curr) => {
      const day = Number(curr.date.split('/')[0])
      if (day === i) return prev + curr.amount
      return prev + 0
    }, 0)
    graphData.push({value: amount, date: i})
  }
  return graphData;
}

export const splitDataIntoCategories = (document: Array<Document>) => {
  const categories = {
    total: 0,
    home: 0,
    groceries: 0,
    travel: 0,
    other: 0,
  }
  document.forEach((expense) => {
    categories.total += expense.amount
    if(expense.category === 'Other') return categories.other += expense.amount
    if(expense.category === 'Travel') return categories.travel += expense.amount
    if(expense.category === 'Groceries') return categories.groceries += expense.amount
    if(expense.category === 'Home') return categories.home += expense.amount
  })
  return categories;
}
