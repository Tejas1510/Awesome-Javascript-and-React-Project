import React from 'react';


class CalculatorForm extends React.Component {

    state = {
        amount: 0,
        salary: 0,
        salary_save_rate: 0.0,
        deposit_rate: 0.0,
        salary_increase_rate: 0.0,
        year: 0,
    }

    onChangeAmount = (e) => {
        this.setState({
            amount: parseFloat(e.target.value)
        })
    }

    onChangeSalary = (e) => {
        this.setState({
            salary: parseFloat(e.target.value)
        })
    }

    onChangeSalarySaveRate = (e) => {
        this.setState({
            salary_save_rate: parseFloat(e.target.value)
        })
    }

    onChangeDepositRate = (e) => {
        this.setState({
            deposit_rate: parseFloat(e.target.value)
        })
    }

    onChangeSalaryIncrease = (e) => {
        this.setState({
            salary_increase_rate: parseFloat(e.target.value)
        })
    }

    onChangeYear = (e) => {
        this.setState({
            year: parseInt(e.target.value)
        })
    }

    onClickCalculateButton = () => {
        //  alert('hey')
        console.log(this.state)
        this.setState({
            result: []
        })
        let amount = this.state.amount;
        let salary = this.state.salary
        let new_result = []
        for (let i = 1; i <= this.state.year; i++) {
            // let new_result = this.state.result;
            amount += salary * (this.state.salary_save_rate) / 100;
            amount += amount * (this.state.deposit_rate) / 100;
            //  console.log(amount, salary * this.s)
            new_result.push({
                year: i,
                amount: amount.toFixed(2),
                salary: salary.toFixed(2),
                name: 'Year ' + i
            })
            salary += salary * (this.state.salary_increase_rate) / 100;

        }
        this.props.sendResult(new_result);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputEmail4">Amount</label>
                                <input type="number" className="form-control" onChange={this.onChangeAmount} />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputPassword4">Salary</label>
                                <input type="number" className="form-control" onChange={this.onChangeSalary} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputEmail4">Salary Save Rate</label>
                                <input type="number" className="form-control" onChange={this.onChangeSalarySaveRate} />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputPassword4">Deposit Rate</label>
                                <input type="number" className="form-control" onChange={this.onChangeDepositRate} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputEmail4">Salary Increase</label>
                                <input type="number" className="form-control" onChange={this.onChangeSalaryIncrease} />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputPassword4">Year</label>
                                <input type="number" className="form-control" onChange={this.onChangeYear} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <button className="btn btn-primary" onClick={this.onClickCalculateButton}>Calculate</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CalculatorForm;