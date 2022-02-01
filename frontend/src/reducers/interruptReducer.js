import interruptService from '../services/interrupt'

const interruptReducer = (state=[], action) => {
  switch (action.type) {
  default:
    return state
  }
}

export const createInterrupt = (taskid,reason,successful) => {
  return async dispatch => {
    const createdInterrupt = await interruptService.createNew(taskid,reason,successful)
    dispatch({
      type:'NEW_INTERRUPT',
      data:createdInterrupt
    })
  }
}

export default interruptReducer