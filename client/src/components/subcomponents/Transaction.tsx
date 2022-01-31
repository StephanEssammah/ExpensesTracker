import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const API = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001/'

interface Props {
  amount: number
  category: string
  date: string
  comment: string
  id: number
  month: string
  Icon: any
  data: never[]
  setData: React.Dispatch<React.SetStateAction<never[]>>
}

export const Transaction: React.FC<Props> = ({amount, category, date, comment, id, month, Icon, setData, data}) => {
  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate()


  const handleClick = () => {
    clicked === true ? setClicked(false) : setClicked(true)
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)  => {
    e.stopPropagation();
    navigate('/edit', { state: {amount, category, date, comment, id, month}})
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)  => {
    e.stopPropagation();
    await axios.delete(`${API}delete`, { data: {'id': id, month}})
    interface Expense { 
      amount: number,
      category: string,
      date: string,
      other: string,
      id: number,
    }
    setData(prevState => prevState.filter((expense: Expense) => expense.id !== id))    
  }

  return (
    <div className="history__container" onClick={handleClick}>
      <div className="history__container__main">
        <div className="history__container__main__left">
          <Icon />
          <div>
            <h3 className="history__container__main__left__name">{category}</h3>
            <p className="history__container__main__left__transactions">{date}</p>
          </div>
        </div>
        <p className="history__container__main__amount">{`${amount}kr`}</p>
      </div>
      {clicked && <div className="history__container__buttons">
            <button 
              className="history__container__buttons__btn history__container__buttons__btn--edit"
              onClick={e => handleEdit(e)}
            >Edit</button>
            <button 
              className="history__container__buttons__btn history__container__buttons__btn--delete"
              onClick={e => handleDelete(e)}  
            >Delete</button>
          </div>}
    </div>
  )
}