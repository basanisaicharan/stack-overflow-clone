import React from 'react'
import {useSelector} from 'react-redux'
import {User} from './User'
import './Users.css'

const UsersList = () => {
    const users =useSelector((state)=>(state.userReducer))
    
    
  return (
    <div className='user-List-container'>
      
      {
        users.map((user)=>(
          <User user={user} key={user?.id}/>
        ))
      }
    </div>
  )
}

export default UsersList