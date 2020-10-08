import React, { useContext } from 'react'
import { GlobalContext } from '../context/context-api'

export const Transaction = ({transaction}) => {
    
    const {deleteTransaction} = useContext(GlobalContext)
    
    const sign = transaction.amount < 0 ? "-" : "+"
    const a = transaction.amount < 0 ? Math.abs(transaction.amount) : transaction.amount
    return (
            <li onDoubleClick={()=>deleteTransaction(transaction.id)}  className={transaction.amount < 0 ? "minus transaction-item "  : "plus transaction-item"} >
                <span>{transaction.subject}</span> 
                <span> {sign} $ {a}</span>    
                <button className="transaction-btn" >x</button>
        </li>
    )
}
