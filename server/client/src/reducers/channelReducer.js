import { CREATE_CHANNEL } from '../actions/types';



export default function(state = {}, action){

  Object.freeze(state);

  switch(action.type){
    case CREATE_CHANNEL:
      let newChannel =  { [action.payload.data._id]: action.payload.data };

      return Object.assign({},state, newChannel);

      break;


    default:
      return state;
  }

}