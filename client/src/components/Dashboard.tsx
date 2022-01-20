import React from 'react';
import './Dashboard.scss';
import DashboardCategory from './subcomponents/DashboardCategory';
import DashboardChart from './subcomponents/DashboardChart';
import { AiOutlineHome, AiFillCar} from 'react-icons/ai'
import { GiMeal } from 'react-icons/gi'
import { MdCategory } from 'react-icons/md'

interface Props {
  month: {
    Month: string,
    Home: number,
    Travel: number,
    Groceries: number,
    Other: number,
    data: any,
  }
  setMonth: React.Dispatch<React.SetStateAction<number>>
}

const Dashboard: React.FC<Props> = ({month, setMonth}) => {
  const { Month, Home, Travel, Groceries, Other, data } = month
  const total = Home + Travel + Groceries + Other

  return (
    <div className="dashboard">

      <div className="dashboard__top">
        <button 
          className="dashboard__top__button"
          onClick={() => setMonth(prevMonth => prevMonth - 1)}
        >&lt;</button>
        <p>{Month}</p>
        <button 
          className="dashboard__top__button"
          onClick={() => setMonth(prevMonth => prevMonth + 1)}
        >&gt;</button>
      </div>

      <div className="dashboard__mid">
        <h1 className="dashboard__mid__total">{`${total}kr`}</h1>
        <DashboardChart data={data}/>
      </div>

      <div className="dashboard__categories">
        <DashboardCategory category='Home' amount={Home} Icon={() => <AiOutlineHome size="2.5em" className="dashboard__categories__category__left__logo"/>}/>
        <DashboardCategory category='Groceries' amount={Groceries} Icon={() => <GiMeal size="2.5em" className="dashboard__categories__category__left__logo"/>}/>
        <DashboardCategory category='Travel' amount={Travel} Icon={() => <AiFillCar size="2.5em" className="dashboard__categories__category__left__logo"/>}/>
        <DashboardCategory category='Other' amount={Other} Icon={() => <MdCategory size="2.5em" className="dashboard__categories__category__left__logo"/>} />
      </div>
    </div>
  )
};

export default Dashboard;
