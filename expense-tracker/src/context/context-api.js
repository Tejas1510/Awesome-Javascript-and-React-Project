import React, { useReducer, createContext } from 'react'
import {reducer} from './reducer'

    const initialState = {
    transactions: []
}

export const GlobalContext = createContext(initialState)

//provider component

export const GlobalProvider = ({children}) => {
    const [state, dispatch]  = useReducer(reducer , initialState)

    function deleteTransaction(id){
        dispatch({
            type: "DELETE_TRANSACTION",
            payload: id 
        })
    }
    
    function addTransaction(transaction){
        dispatch({
            type: "ADD_TRANSACTION",
            payload: transaction
        })
    }
    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction
            }}>
            {children}
        </GlobalContext.Provider>
    )
}