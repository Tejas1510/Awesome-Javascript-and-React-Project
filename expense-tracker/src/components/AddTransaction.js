import React, { useState , useContext} from 'react'
import { GlobalContext } from '../context/context-api'

export const AddTransaction = () => {
    
    const [subject, setsubject] = useState("")
    const [amount, setamount] = useState("")
    
    const { addTransaction } = useContext(GlobalContext)

    const submitHandle = (e) => {
        e.preventDefault()

       if(!subject || !amount){
            alert("One or more fields are empty")
       }else{
        const newtransaction = {
            id: Math.floor(Math.random() * 1000000000),
            subject,
            amount: +amount
        }
        addTransaction(newtransaction)
       }
    }
    return (
        <div className="add-transaction-div">
            <form onSubmit={submitHandle}>
                <div className="form-control">
                    <label className="form-label">Subject</label>
                    <input className="form-input" type="text" value={subject} onChange={e=>setsubject(e.target.value)} placeholder="enter subject..."/>
                </div>
                <div className="form-control">
                    <label className="form-label">Amount</label>
                    <input className="form-input" type="number" value={amount} onChange={e=>setamount(e.target.value)} placeholder="enter amount..."/>
                </div>
                <button className="submit-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}
