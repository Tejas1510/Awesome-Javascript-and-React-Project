import React, { useContext } from 'react'
import { GlobalContext } from '../context/context-api'


export const IncomeExpenses = () => {

    const { transactions } = useContext(GlobalContext)
    
    const amounts = transactions.map(transaction => transaction.amount)

    const totalIncome = amounts.filter(value => value > 0).reduce((t,n)=> t+=n ,0).toFixed(2)
    const totalExpense = amounts.filter(value => value < 0).reduce((t,n)=> t+=n ,0).toFixed(2)
    
    return (
        <div className="income-expense-container">
            <div className="box">
                <h4 >Income</h4>
                <p className="income">+ $ {totalIncome}</p>
            </div>
            <div className="box">
                <h4>Expense</h4>
                <p  className="expense">- $ {totalExpense}</p>
            </div>
        </div>
    )
}
