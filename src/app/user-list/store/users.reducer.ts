import { User } from 'src/app/model/user.model';
import { UserActions, ADD_USER, DELETE_USER, EDIT_USER } from './users.action';

export interface State{
  users: User[]
}

export const initialState: State = {
  users: []
}

export function usersReducer(
  state = initialState,
  action: UserActions
){
  switch (action.type) {
    case ADD_USER:
      return{
        ...state,
        users: [...state.users, action.payload]
      }
    case DELETE_USER:
      return{
        ...state,
        users: state.users.filter(user=>{
          return user.id !== action.payload
        })
      }
    case EDIT_USER:
      const index = state.users.findIndex(user=>{
        return user.id === action.payload.id;
      })
      const updatedUsers = [...state.users]
      updatedUsers[index] = action.payload
      return{
        ...state,
        users: updatedUsers
      }
    default:
      return {
        ...state
      }
  }
}
