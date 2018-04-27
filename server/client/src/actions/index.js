import axios from 'axios';
import { RECEIVE_USER, CREATE_CHANNEL,RECEIVE_SESSION_ERRORS, RECEIVE_ALL_CHANNELS,RECEIVE_CHANNEL,RECEIVE_CHANNELS_ERRORS, RECEIVE_ALL_MESSAGES, RECEIVE_MESSAGE } from './types';

// axios pings back-end with a http request.
// res is what the back-end returns
// dispatch a regular pojo contained within res

export const fetchChannels = () => async dispatch => {


  try{
    const res = await axios.get('/api/channels');
    return dispatch({type: RECEIVE_ALL_CHANNELS, payload: res.data});

  }catch(error){
    return dispatch({type:RECEIVE_CHANNELS_ERRORS,payload:error.data});
  }


};

export const fetchMessages = (channel_id) => async dispatch => {


  try{
    const res = await axios.get('/api/messages/channel_id', {params:{channel_id: channel_id}});

    return dispatch({type: RECEIVE_ALL_MESSAGES, payload: res.data});

  }catch(error){
    // return dispatch({type:RECEIVE_CHANNELS_ERRORS,payload:error.data});

  }


};

export const createMessage = (body,channel_id) => async dispatch => {


  try{
    const res = await axios.post('/api/message/new', {body,channel_id});

    return dispatch({type: RECEIVE_MESSAGE, payload: res.data});

  }catch(error){
    // return dispatch({type:RECEIVE_CHANNELS_ERRORS,payload:error.data});

  }


};

export const fetchUser = () => async dispatch => {
      const res = await axios.get('/api/current_user');

      return dispatch({type: RECEIVE_USER, payload: res.data});
};



export const createChannel = (channel,type) => async dispatch => {

      const res =  await axios.post(
      '/api/channel/new', {name: channel,type: type}
      );

      return dispatch({type: RECEIVE_CHANNEL, payload: res.data});
};

export const login = (username,password) => async dispatch => {

  try {

      // wait for the fetch to finish then dispatch the result
      const res = await axios.post('/api/local-login', {username:username,password:password});



      return dispatch({type: RECEIVE_USER, payload: res.data});

    } catch (error) {

      // catch errors from fetch
      dispatch({type:RECEIVE_SESSION_ERRORS, payload: error.data});
    }




};

export const signup = (username,password) => async dispatch => {
  try{


    const res = await axios.post('/api/local-signup', {username:username,password:password});

    return dispatch({type: RECEIVE_USER, payload: res.data});

  }catch(error){

      dispatch({type: RECEIVE_SESSION_ERRORS, payload: error.data});

  }


};
