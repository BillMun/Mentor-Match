import {configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit'
import {applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'


const rootReducer = combineReducers({
})

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware, logger))

export const store = configureStore({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

})

export default store;