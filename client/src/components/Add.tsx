import React from 'react';
import './Add.scss';

const Add = () => {
  return ( 
    <div className="add">
      <h1 className="add__heading">Add expense</h1>
      
      <div className="add__inputs">
        <div className="add__inputs__container">
          <h2 className="add__inputs__container__title">Amount:</h2>
          <input className="add__inputs__container__input" type="number" placeholder="....."/>
        </div>
        <div className="add__inputs__container">
          <h2 className="add__inputs__container__title">Category:</h2>
          <input className="add__inputs__container__input" type="text" placeholder="....."/>
        </div>
        <div className="add__inputs__container">
          <h2 className="add__inputs__container__title">Date:</h2>
          <input className="add__inputs__container__input" type="text" placeholder="....."/>
        </div>
        <div className="add__inputs__container">
          <h2 className="add__inputs__container__title">Comment:</h2>
          <input className="add__inputs__container__input" type="text" placeholder="....."/>
        </div>
      </div>

      <button className="add__button">Save</button>
    </div>
  )
};

export default Add;
