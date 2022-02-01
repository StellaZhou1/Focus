import taskService from '../services/task'
import categoryService from '../services/category'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeTasks } from '../reducers/taskReducer'
import { initializeCategorys } from '../reducers/categoryReducer'
import React from 'react'
const Authorization = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const parsedUser = JSON.parse(loggedInUserJSON)
      taskService.setToken(parsedUser.token)
      categoryService.setToken(parsedUser.token)
      dispatch(setUser(parsedUser))
    }
  }, [])
  useEffect(() => {
    dispatch(initializeTasks())
    dispatch(initializeCategorys())
  },[dispatch])
  return <></>
}
export default Authorization