import { createStore,applyMiddleware } from 'redux';
import logger from 'redux-logger';

const increment='increment'
const decrement='decrement'
const incrementByAmount='incrementByAmount'
const store=createStore(reducer,applyMiddleware(logger.default));
function reducer(state={amount:1},action) {
    //immutability
    if(action.type===increment) return {amount:state.amount+1}
    if(action.type===decrement) return {amount:state.amount-1}
    if(action.type===incrementByAmount) return {amount:state.amount+action.payload}
    return state
}

//global state
//console.log(store.getState())
//store.dispatch({type:"increment"})
//console.log(store.getState())


//action name constant


const inc=()=>{
    return {type:increment}
}
const dec=()=>{
    return {type:decrement}
}
const iBa=(value)=>{
    return {type:incrementByAmount,payload:value}
}
setInterval(() => {
    //store.dispatch({type:'incrementByAmount',payload:4})
    store.dispatch(iBa(10))
}, 5000);