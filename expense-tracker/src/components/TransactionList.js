import React,{useContext} from 'react'
import { GlobalContext } from '../context/context-api'
import { Transaction } from './Transaction'

export const TransactionList = () => {

    const context = useContext(GlobalContext)

    

    return (
        <div className="transaction-list">
            <h4 className="history-header">History</h4>
            <ul className="transaction-ul">
                {
                    context.transactions.map((transaction,index) => (
                        <Transaction key={index} transaction={transaction}/>
                    ))
                }
            </ul>
        </div>
    )
}
