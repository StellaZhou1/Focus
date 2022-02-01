import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import taskReducer from './reducers/taskReducer'
import userReducer from './reducers/userReducer'
import interruptReducer from './reducers/interruptReducer'
import categoryReducer from './reducers/categoryReducer'

const reducer = combineReducers({
  tasks: taskReducer,
  user:userReducer,
  interrupts:interruptReducer,
  categories:categoryReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store