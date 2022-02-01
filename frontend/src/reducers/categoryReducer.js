import categoryService from '../services/category'

const categoryReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_CATEGORY':
    return [...state, action.data]
  case 'DELETE_CATEGORY':
    return state.filter(category => category.id!==action.data)
  case 'INIT_CATEGORYS':
    return action.data
  default:
    return state
  }
}

export const createCategory = (content,category) => {
  return async dispatch => {
    const newCategory = await categoryService.createNew(content,category)
    dispatch({
      type: 'NEW_CATEGORY',
      data: newCategory,
    })
  }
}


export const deleteCategory = (id) => {
  return async dispatch => {
    await categoryService.remove(id)
    dispatch({
      type: 'DELETE_CATEGORY',
      data: id,
    })
  }

}


export const initializeCategorys = () => {
  return async dispatch => {
    const categories = await categoryService.getAll()
    dispatch({
      type: 'INIT_CATEGORYS',
      data: categories,
    })
  }
}

export default categoryReducer