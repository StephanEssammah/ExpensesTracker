import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import './Dashboard.scss';
import DashboardCategory from './subcomponents/DashboardCategory';
import DashboardChart from './subcomponents/DashboardChart';
import { AiOutlineHome, AiFillCar} from 'react-icons/ai'
import { GiMeal } from 'react-icons/gi'
import { MdCategory } from 'react-icons/md'

const API = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001/'

interface Props {
  month: string
  setMonth: React.Dispatch<React.SetStateAction<number>>,
  chartType: string,
}

const Dashboard: React.FC<Props> = ({month, setMonth, chartType}) => {
  const [data, setData] = useState(
    {
      graphData: [],
      categories: {
        total: 0,
        home: 0,
        groceries: 0,
        travel: 0,
        other: 0,
      }
    }
  )

  useEffect(() => {
    const fetchData = async () => {
      const stats = await axios.get(`${API}expenses`, { params: {'month': month}})
      setData(stats.data)
    }
    fetchData()
  }, [month])

  return (
    <div className="dashboard">

      <div className="dashboard__top">
        <button 
          className="dashboard__top__button"
          onClick={() => setMonth(prevMonth => prevMonth - 1)}
        >&lt;</button>
        <p>{month}</p>
        <button 
          className="dashboard__top__button"
          onClick={() => setMonth(prevMonth => prevMonth + 1)}
        >&gt;</button>
      </div>

      <div className="dashboard__mid">
        <h1 className="dashboard__mid__total">{`${data.categories.total}kr`}</h1>
        <DashboardChart data={data.graphData} chartType={chartType}/>
      </div>

      <div className="dashboard__categories">
        <DashboardCategory 
          category='Home' 
          amount={data.categories.home} 
          Icon={() => <AiOutlineHome size="2.5em" className="dashboard__categories__category__left__logo"/>}/>
        <DashboardCategory 
          category='Groceries' 
          amount={data.categories.groceries} 
          Icon={() => <GiMeal size="2.5em" className="dashboard__categories__category__left__logo"/>}/>
        <DashboardCategory 
          category='Travel' 
          amount={data.categories.travel} 
          Icon={() => <AiFillCar size="2.5em" className="dashboard__categories__category__left__logo"/>}/>
        <DashboardCategory 
          category='Other' 
          amount={data.categories.other} 
          Icon={() => <MdCategory size="2.5em" className="dashboard__categories__category__left__logo"/>} />
      </div>
    </div>
  )
};

export default Dashboard;
