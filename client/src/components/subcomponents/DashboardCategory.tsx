import React from 'react';

interface Props {
  category: string
  amount: number
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const Dashboard_category: React.FC<Props> = ({category, amount, Icon}) => {
  return (
    <div className="dashboard__categories__category">
      <div className="dashboard__categories__category__left">
        <Icon />
        <div>
          <h3 className="dashboard__categories__category__left__name">{category}</h3>
          <p className="dashboard__categories__category__left__transactions">1 transaction</p>
        </div>
      </div>
      <p className="dashboard__categories__category__amount">{`${amount}kr`}</p>
    </div>
  )
}

export default Dashboard_category;