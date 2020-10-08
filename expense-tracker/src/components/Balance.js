import React, {useContext} from 'react'
import { GlobalContext } from '../context/context-api'

export const Balance = () => {

    const { transactions } = useContext(GlobalContext)

    const amount = transactions.map(transaction => {
        return  transaction.amount
    })

    const balance = amount.reduce((a,s) => a+=s ,0).toFixed(2) 
    
    return (
        <div className="balance-div">
            <h4>Balance</h4>
            <h1>$ {balance}</h1>
        </div>
    )
}
