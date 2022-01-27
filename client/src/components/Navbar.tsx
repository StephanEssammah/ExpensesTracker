import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { FiSettings } from 'react-icons/fi'
import { RiListCheck2 } from 'react-icons/ri'
import './Navbar.scss';


export const Navbar = () => {
  return (
    <div className="nav">
      <NavLink to="/" 
        style={({ isActive }) => {
          return {
            color: isActive ? "#CFEF0A" : ""
          };
        }}
        className="nav__button">
        <AiOutlineHome size="3em" className="nav__logo"/>
        Home
      </NavLink>
      <NavLink to="/history" 
        style={({ isActive }) => {
          return {
            color: isActive ? "#CFEF0A" : ""
          };
        }}
        className="nav__button">
        <RiListCheck2 size="3em" className="nav__logo"/>
        History
      </NavLink>
      <NavLink to="/add" 
        className="nav__button"
        style={({ isActive }) => {
          return {
            color: isActive ? "#CFEF0A" : ""
          };
        }}
        >
        <IoMdAddCircleOutline size="3em"/>
        Add
      </NavLink>
      <NavLink to="/settings" 
        style={({ isActive }) => {
          return {
            color: isActive ? "#CFEF0A" : ""
          };
        }}
        className="nav__button">
        <FiSettings size="3em"/>
        Settings
      </NavLink>
    </div>
  )
};
