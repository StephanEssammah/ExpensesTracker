import React, { useState } from 'react';
import Add from './components/Add';
import Dashboard from './components/Dashboard';

const generateData = () => {
  const data = []
  for(let i = 0; i < 30; i++) {
    data.push({value: Math.round(Math.random() * 1000), date: i})
  }
  return data;
}

const year = [
    {
      Month: 'January',
      Home: 11500,
      Travel: 3913,
      Groceries: 2834,
      Other: 5831,
      data: generateData()
    },
    {
      Month: 'February',
      Home: 11500,
      Travel: 1043,
      Groceries: 3859,
      Other: 4851,
      data: generateData()
    },
]

// const date = new Date().toLocaleDateString('en-GB')
// const split = date.split('/')
// console.log(split)
const App = () => {
  const [month, setMonth] = useState(0)

  return (
    <div className="App">
      {true 
        ? <Dashboard month={year[month]} setMonth={setMonth}/>
        : <Add />
      }
    </div>
  );
}

export default App;
