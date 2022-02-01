import taskService from '../services/task'

const taskReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_TASK':
    return [...state, action.data]
  case 'EDIT_TASK':
    return state.map(task => task.id!==action.data.id?task:action.data)
  case 'DELETE_TASK':
    return state.filter(task => task.id!==action.data)
  case 'INIT_TASKS':
    return action.data
  case 'NEW_INTERRUPT':
    return state.map(task => task.id!==action.data.id?task:action.data)
  case 'DELETE_INTERRUPT':
    return state.map(task => task.id!==action.data.id?task:action.data)
  default:
    return state
  }
}

export const createTask = (content,category) => {
  return async dispatch => {
    const newTask = await taskService.createNew(content,category)
    dispatch({
      type: 'NEW_TASK',
      data: newTask,
    })
  }
}


export const deleteTask = (id) => {
  return async dispatch => {
    await taskService.remove(id)
    dispatch({
      type: 'DELETE_TASK',
      data: id,
    })
  }

}

export const editTask = (id, content, category) => {
  return async dispatch => {
    await taskService.edit(id, content, category)
    const tasks = await taskService.getAll()
    dispatch({
      type: 'EDIT_TASK',
      data: tasks,
    })
  }

}

export const initializeTasks = () => {
  return async dispatch => {
    const tasks = await taskService.getAll()
    dispatch({
      type: 'INIT_TASKS',
      data: tasks,
    })
  }
}

export default taskReducer