import React from 'react'
import { AiTwotoneHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { NavLink } from 'react-router-dom';
const menuMobile = () => {


  const style = { width: '20px', height: '20px', marginRight: '10px', paddingTop: '10px' };

  return (
    <div className='menuFooter'>
      <footer>
        <ul>
          <li><NavLink to="/"><AiTwotoneHome style={style}/>Home</NavLink></li>
          <li><NavLink to="/search"><BsSearch style={style}/>Search</NavLink></li>
          <li><NavLink to="/library"><MdOutlineVideoLibrary style={style}/>Library</NavLink></li>
        </ul>
      </footer>
    </div>
  )
}

export default menuMobile