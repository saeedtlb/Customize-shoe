import { act } from 'react-dom/test-utils'

const reducer = (state, action) => {
  switch (action.type) {
    case 'COLOR':
      return {
        ...state,
        items: {
          ...state.items,
          [state.selected]: action.color
        }
      }
    case 'NAME':
      return {
        ...state,
        current: action.name
      }
    case 'SELECT':
      return {
        ...state,
        selected: action.name
      }
    default:
      return state
  }
}

export default reducer
