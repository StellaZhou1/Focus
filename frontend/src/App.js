import React, { useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { useDispatch, useSelector } from 'react-redux'

import LoginPage from './components/LoginPage'
import Task from './components/Task'
import { Routes, Route, Navigate } from 'react-router-dom'
import taskService from './services/task'
import categoryService from './services/category'
import { setUser } from './reducers/userReducer'
import Statistics from './components/Statistics'
import Register from './components/Register'

const App = () => {
  const dispatch = useDispatch()
  let loggedInUserJSON = window.localStorage.getItem('loggedInUser')
  useEffect(() => {
    loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const parsedUser = JSON.parse(loggedInUserJSON)
      taskService.setToken(parsedUser.token)
      categoryService.setToken(parsedUser.token)
      dispatch(setUser(parsedUser))
    }
  }, [dispatch])

  const user = useSelector(state => state.user)
  if(loggedInUserJSON && !user.username){
    return <></>
  }
  return (
    <>
      <Routes>
        <Route exact path='/login' element={user.username ?<Navigate replace to="/tasks" />:<LoginPage/>}></Route>
        <Route exact path='/tasks/:id' element={<Task/>}></Route>
        <Route exact path='/tasks' element={user.username ?<Dashboard />:<Navigate replace to="/login" />}></Route>
        <Route exact path='/statistics' element={user.username ?<Statistics />:<Navigate replace to="/login" />}></Route>
        <Route exact path='/register' element={<Register/>}></Route>
        <Route path="" element={<Navigate replace to="/tasks" />}/>
      </Routes>
    </>
  )
}

export default App