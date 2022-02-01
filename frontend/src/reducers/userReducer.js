
const userReducer = (state = {}, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.data
  case 'LOGOUT':
    return {}
  default:
    return state
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedInUser')
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}


export default userReducer
