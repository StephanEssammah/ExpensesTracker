import React, { useEffect, useState }from 'react';
import axios from 'axios';
import './History.scss';
import { Transaction } from './subcomponents/Transaction';
import { AiOutlineHome, AiFillCar} from 'react-icons/ai'
import { GiMeal } from 'react-icons/gi'
import { MdCategory } from 'react-icons/md'
const API = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001/'

interface Props {
  month: string
  setMonth: React.Dispatch<React.SetStateAction<number>>
}

interface Expense {
  amount: number
  category: string
  date: string
  comment: string
}
export const History: React.FC<Props> =  ({month, setMonth}) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const stats = await axios.get(`${API}history`, { params: {'month': month}})
      setData(stats.data)
    }
    fetchData()
  }, [month])


  const getIconFromCategory = (category: string) => {
    if (category === 'Home') {
      return <AiOutlineHome size="2.5em" className="dashboard__categories__category__left__logo"/>
    }  
    if (category === 'Groceries') {
      return <GiMeal size="2.5em" className="dashboard__categories__category__left__logo"/>
    }
    
    if (category === 'Travel') {
      return <AiFillCar size="2.5em" className="dashboard__categories__category__left__logo"/>
    }
    
    if (category === 'Other') {
      return <MdCategory size="2.5em" className="dashboard__categories__category__left__logo"/>
    }
  }

  return (
    <div className="history"> 
      <div className="history__month-selection">
        <button 
          className="history__month-selection__button"
          onClick={() => setMonth(prevMonth => prevMonth - 1)}
        >&lt;</button>
        <p>{month}</p>
        <button 
          className="history__month-selection__button"
          onClick={() => setMonth(prevMonth => prevMonth + 1)}
        >&gt;</button>
      </div>

      <h1 className="history__heading">History</h1>
      {data.map((expense: Expense, index: number) => (
        <Transaction
          key={index}
          amount={expense.amount} 
          category={expense.category} 
          date={expense.date} 
          comment={expense.comment} 
          Icon={() => getIconFromCategory(expense.category)}
        />
      ))}
    </div>
  )
};
