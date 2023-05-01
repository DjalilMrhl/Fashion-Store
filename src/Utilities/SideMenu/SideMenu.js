import React from 'react'
import './SideMenu.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Divider } from '@mui/material'
import { Close, PersonPinCircleRounded } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../Redux/Slices/authSlice'

function SideMenu({menuOpen,setMenuOpen}) {

    const user = useSelector(state=> state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = ()=> {
      dispatch(logoutUser())
      setMenuOpen(false)
      navigate('/')
    }

  return (
    (menuOpen &&
    <aside className="menu" id="menu">
        <Close onClick={()=> setMenuOpen(false)}/>                
        <span className='modal' onClick={()=> setMenuOpen(false)}></span>
        <div className="menu--container">
          {user.photo? <img src="" alt="" />:<PersonPinCircleRounded />}
          <Divider className='hr'/>
          <h2>{user.username}</h2>
          <h3>{user.email}</h3>
          <Divider className='hr'/>
          {/* {user.role=== "admin" &&<Link to='/admin' onClick={()=> setMenuOpen(false)}>Dashboard</Link>} */}
          <p onClick={handleLogout}>Logout</p>
        </div>
    </aside>)
  )
}

export default SideMenu