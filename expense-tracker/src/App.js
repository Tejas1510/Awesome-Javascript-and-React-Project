import React from "react"
import { Header } from './components/Header'
import { Balance } from './components/Balance'
import { IncomeExpenses } from "./components/IncomeExpenses"
import { TransactionList } from "./components/TransactionList"
import { AddTransaction } from "./components/AddTransaction"
import { GlobalProvider } from "./context/context-api"
const App = () =>{
    return(
        <GlobalProvider>
            <div className="App">
                <Header />
                <div className="container"> 
                    <Balance />
                    <IncomeExpenses />
                    <TransactionList/>
                    <AddTransaction/>
                </div>
            </div>
        </GlobalProvider>
    )
}

export default App