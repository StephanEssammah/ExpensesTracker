import React from 'react';
import { AiOutlineHome } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { FiSettings } from 'react-icons/fi'
import './Navbar.scss';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<string>>
}

export const Navbar: React.FC<Props> = ({setPage}) => {
  
  
  return (
    <div className="nav">
      <button 
        className="nav__button nav__button__active"
        onClick={() => setPage("Home") }
        >
        <AiOutlineHome size="3em" className="nav__logo"/>
        Home
      </button>
      <button 
        className="nav__button"
        onClick={() => setPage("Add") }
        >
        <IoMdAddCircleOutline size="3em"/>
        Add
      </button>
      <button className="nav__button">
        <FiSettings size="3em"/>
        Settings
      </button>
    </div>
  )
};
