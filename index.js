import { createStore,applyMiddleware } from 'redux';
import logger from 'redux-logger';
import axios from 'axios'
import thunk from 'redux-thunk';

//action name constant
const increment='increment'
const decrement='decrement'
const incrementByAmount='incrementByAmount'

//for db
const init="init"
async function getUser(dispatch,getState){
    const {data}= await axios.get("http://localhost:3000/accounts/1");
    dispatch({type:init,payload:data.amount})
}
const store=createStore(reducer,applyMiddleware(logger.default,thunk.default));
function reducer(state={amount:1},action) {
    //immutability
    if(action.type===increment) return {amount:state.amount+1}
    if(action.type===decrement) return {amount:state.amount-1}
    if(action.type===incrementByAmount) return {amount:state.amount+action.payload}
    if(action.type===init) return {amount:action.payload}
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
setInterval(() => {
    //store.dispatch({type:'incrementByAmount',payload:4})
   // store.dispatch(iBa(10))
   //store.dispatch(initUser(200))
   store.dispatch(getUser)
}, 5000);