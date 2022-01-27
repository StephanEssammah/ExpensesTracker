import React from 'react';

interface Props {
  category: string
  data: {
    value: number
    transactions: number
  }
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const Dashboard_category: React.FC<Props> = ({category, data, Icon}) => {
  const { value, transactions } = data
  const word = transactions > 1 || transactions === 0 ? 'transactions' : 'transaction'

  return (
    <div className="dashboard__categories__category">
      <div className="dashboard__categories__category__left">
        <Icon />
        <div>
          <h3 className="dashboard__categories__category__left__name">{category}</h3>
          <p className="dashboard__categories__category__left__transactions">{transactions} {word}</p>
        </div>
      </div>
      <p className="dashboard__categories__category__amount">{`${value}kr`}</p>
    </div>
  )
}

export default Dashboard_category;