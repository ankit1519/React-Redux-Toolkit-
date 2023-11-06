import { createStore,applyMiddleware,combineReducers } from 'redux';
import logger from 'redux-logger';
import axios from 'axios'
import thunk from 'redux-thunk';

//action name constant
const increment='account/increment'
const decrement='decrement'
const incrementByAmount='incrementByAmount'
const incrementBonus="bonus/increment"

//for db
const init="init"
/*async function getUser(dispatch,getState){
    const {data}= await axios.get("http://localhost:3000/accounts/1");
    dispatch({type:init,payload:data.amount})
}*/
 function getUsers(id){
  return  async (dispatch,getState)=>{
        const {data}= await axios.get(`http://localhost:3000/accounts/${id}`);
        dispatch({type:init,payload:data.amount})
    }
 }
const store=createStore(combineReducers({account:accountReducer,bonus:bonusReducer})
    ,applyMiddleware(logger.default,thunk.default));
function accountReducer(state={amount:1},action) {
    //immutability
    if(action.type===increment) return {amount:state.amount+1}
    if(action.type===decrement) return {amount:state.amount-1}
    if(action.type===incrementByAmount) return {amount:state.amount+action.payload}
    if(action.type===init) return {amount:action.payload}
    return state
}
function bonusReducer(state={points:1},action) {
    //immutability
    if(action.type===incrementByAmount) return action.payload>=100? {points:state.points+1} : state;
   
    return state
}
//global state
//console.log(store.getState())
//store.dispatch({type:"increment"})
//console.log(store.getState())


const inc=()=>{
    return {type:increment}
}
const dec=()=>{
    return {type:decrement}
}
const iBa=(value)=>{
    return {type:incrementByAmount,payload:value}
}

const initUser=(v)=>{
    return {type:init,payload:v}
}
setTimeout(() => {
    //store.dispatch({type:'incrementByAmount',payload:4})
     store.dispatch(iBa(1000))
   //store.dispatch(initUser(200))
   store.dispatch(getUsers(2))
}, 5000);