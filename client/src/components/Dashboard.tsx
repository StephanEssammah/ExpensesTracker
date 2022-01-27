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
  const [fetching, setFetching] = useState(false)
  const [data, setData] = useState(
    {
      graphData: [],
      categories: {
        total: 0,
        home: {
          value: 0,
          transactions: 0,
        },
        groceries: {
          value: 0,
          transactions: 0,
        },
        travel: {
          value: 0,
          transactions: 0,
        },
        other: {
          value: 0,
          transactions: 0,
        },

      }
    }
  )

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true)
      const stats = await axios.get(`${API}expenses`, { params: {'month': month}})
      setData(stats.data)
      setFetching(false)
    }
    fetchData()
  }, [month])

  return (
    <div className="dashboard">

      <div className="dashboard__top">
        <button 
          className="dashboard__top__button"
          onClick={() => setMonth(prevMonth => (!fetching && prevMonth !== 0) ? prevMonth - 1 : prevMonth)}
        >&lt;</button>
        <p>{month}</p>
        <button 
          className="dashboard__top__button"
          onClick={() => setMonth(prevMonth => (!fetching && prevMonth !== 11) ? prevMonth + 1 : prevMonth)}
        >&gt;</button>
      </div>

      <div className="dashboard__mid">
        <h1 className="dashboard__mid__total">{`${data.categories.total}kr`}</h1>
        <DashboardChart data={data.graphData} chartType={chartType}/>
      </div>

      <div className="dashboard__categories">
        <DashboardCategory 
          category='Home' 
          data={data.categories.home} 
          Icon={() => <AiOutlineHome size="2.5em" className="dashboard__categories__category__left__logo"/>}/>
        <DashboardCategory 
          category='Groceries' 
          data={data.categories.groceries} 
          Icon={() => <GiMeal size="2.5em" className="dashboard__categories__category__left__logo"/>}/>
        <DashboardCategory 
          category='Travel' 
          data={data.categories.travel} 
          Icon={() => <AiFillCar size="2.5em" className="dashboard__categories__category__left__logo"/>}/>
        <DashboardCategory 
          category='Other' 
          data={data.categories.other} 
          Icon={() => <MdCategory size="2.5em" className="dashboard__categories__category__left__logo"/>} />
      </div>
    </div>
  )
};

export default Dashboard;
