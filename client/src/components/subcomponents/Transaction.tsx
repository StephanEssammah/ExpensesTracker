import React from 'react';

interface Props {
  amount: number
  category: string
  date: string
  comment: string
  Icon: any
}

export const Transaction: React.FC<Props> = ({amount, category, date, comment, Icon}) => {
  return (
    <div className="history__container">
      <div className="history__container__left">
        <Icon />
        <div>
          <h3 className="history__cotainer__left__name">{category}</h3>
          <p className="history__container__left__transactions">{date}</p>
        </div>
      </div>
      <p className="history__container__amount">{`${amount}kr`}</p>
    </div>
  )
}