import React, { useState} from 'react';
import './Add.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from "axios"
import { useNavigate, useLocation } from 'react-router-dom'

const API = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001/'
const Edit = () => {
  const { state }: any = useLocation()
  const dateParts = state.date.split('/')
  const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
 
  const [amount, setAmount] = useState<any>(state.amount)
  const [category, setCategory] = useState<string>(state.category)
  const [date, setDate] = useState<any>(dateObject)
  const [comment, setComment] = useState<string>(state.comment)

  const [amountClass, setAmountClass] = useState<string>('')
  const [categoryClass, setCategoryClass] = useState<string>('')
  const [dateClass, setDateClass] = useState<string>('')
  const navigate = useNavigate();

  const handleClick = async () => {
    amount === '' ? setAmountClass('input-missing') : setAmountClass('')
    category === '' || category === 'Select category' ? setCategoryClass('input-missing') : setCategoryClass('')
    date === null ? setDateClass('input-missing') : setDateClass('');
    
    if (amount === 0 || amount === '' || category === '' || category === 'Select category' || date === null) return;
    const expense = { amount, category, date, comment}
    await axios.put(`${API}update`, { oldExpense: {id: state.id, month: state.month}, newExpense: expense })
    // navigate('/')
  }

  return ( 
    <div className="add">
      <h1 className="add__heading">Edit expense</h1>
      
      <div className="add__inputs">
        <div className="add__inputs__container">
          <h2 className={`add__inputs__container__title ${amountClass}`}>Amount:</h2>
          <input 
            className={`add__inputs__container__input`}
            type="number" 
            placeholder="....."
            value={amount}
            onChange={e => e.target.value === "" ? setAmount(e.target.value) : setAmount(e.target.valueAsNumber)}
          />
        </div>
        <div className="add__inputs__container">
          <h2 className={`add__inputs__container__title ${categoryClass}`}>Category:</h2>
          <select 
            className="add__inputs__container__input"
            value={category}
            onChange={e => setCategory(e.target.value) }
          >
            <option className="add__inputs__container__option">Select category</option>
            <option className="add__inputs__container__option">Home</option>
            <option className="add__inputs__container__option">Groceries</option>
            <option className="add__inputs__container__option">Travel</option>
            <option className="add__inputs__container__option">Other</option>
          </select>
        </div>
        <div className="add__inputs__container">
          <h2 className={`add__inputs__container__title ${dateClass}`}>Date:</h2>
          <DatePicker 
            selected={date} 
            onChange={date => setDate(date)}
            dateFormat='dd/MM/yyyy'
            className="datepicker-input"
            placeholderText="Click to select a date"
          />
        </div>
        <div className="add__inputs__container">
          <h2 className="add__inputs__container__title">Comment:</h2>
          <input 
            className="add__inputs__container__input" 
            type="text" 
            placeholder="....."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
      </div>

      <button className="add__button" onClick={handleClick}>Save</button>
    </div>
  )
};

export default Edit;
