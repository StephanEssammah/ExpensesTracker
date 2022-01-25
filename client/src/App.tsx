import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Add from './components/Add';
import Dashboard from './components/Dashboard';
import { Navbar } from './components/Navbar';
import { Settings } from './components/Settings';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


const App = () => {
  const [month, setMonth] = useState(0)
  const [chartType, setChartType] = useState('Line')

  return <>
    <Routes>
      <Route path="/" element={<Dashboard month={months[month]} setMonth={setMonth} chartType={chartType}/>} />
      <Route path="/add" element={<Add />} />
      <Route path="/settings" element={<Settings chartType={chartType} setChartType={setChartType} />} />
    </Routes>
    <Navbar />
    </>
}

export default App;
