import React, { Component } from 'react';
import sortimg from './sorting.png';

export default class TodosList extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeFilterCustomer = this.onChangeFilterCustomer.bind(this);
        this.onChangeFilterProject = this.onChangeFilterProject.bind(this);
        this.onChangeFilterAD = this.onChangeFilterAD.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            Filter_Customer: '',
            Filter_Project: '',
            Filter_AD: '', 
        }
    }

    onChangeFilterCustomer(e) {
        this.setState({
            Filter_Customer: e.target.value
        });
    }

    onChangeFilterProject(e) {
            this.setState({
                Filter_Project: e.target.value
            });
    }

    onChangeFilterAD(e) {
        this.setState({
            Filter_AD: e.target.value
        });
    }
    
    onSubmit(e) {
        e.preventDefault();
        console.log(`Customer: ${this.state.Filter_Customer}`);
        console.log(`Project: ${this.state.Filter_Project}`);
        console.log(`AD: ${this.state.Filter_AD}`);

    }

    handleClick = () => {
        console.log('Sorting  method will be done');
      }

    render() {
        return (
            <div className="container fluid">
                <section class="jumbotron width:100 height=100">
                    <h2 class="text-center">Summary</h2>
                    <p>Total Project Number: <text class="textAlign-right">variable</text></p>
                    <p>Overall Income: <text class="text-center">variable</text></p>
                    <p>Overall Spending: <text class="text-right">variable</text></p>
                    <p>Overall Gross Profit: <text class="text-right">variable</text></p>
                </section>
                <hr></hr>
                <section >
                    <h4>Filter by</h4>
                    <form onSubmit={this.onSubmit}>
                        <p>Customer Name: 
                                <input type="text"
                                className="form-control"
                                value={this.state.Filter_Customer}
                                onChange={this.onChangeFilterCustomer}
                                /></p>
                                
                    <p>Project Name:    
                                <input type="text"
                                className="form-control"
                                value={this.state.Filter_Project}
                                onChange={this.onChangeFilterProject}
                                /> </p>
                    
                    <p>AD user ID:    
                                <input type="text"
                                className="form-control"
                                value={this.state.Filter_AD}
                                onChange={this.onChangeFilterAD}
                                /></p>

                        <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary" />
                    </div>
                    </form>
                    
                    
                </section>
                <hr></hr>
                <table cellPadding="15"> 
                    <tr>
                        <th>Project Name
                            <button  onClick={this.handleClick} variant="light">
                                <img src={sortimg} width="15" height="15" padding-left="5"/>
                            </button>
                            </th>
                        <th>Customer
                            <button onClick={this.handleClick} variant="light">
                                <img src={sortimg} width="15" height="15" padding-left="5"/>
                            </button></th>
                        <th>PM
                            <button onClick={this.handleClick} variant="light">
                                <img src={sortimg} width="15" height="15" padding-left="5"/>
                            </button></th>
                        <th>Period
                            <button onClick={this.handleClick} variant="light">
                                <img src={sortimg} width="15" height="15" padding-left="5"/>
                            </button></th>
                        <th>Time Spent(days)
                            <button  onClick={this.handleClick} variant="light">
                                <img src={sortimg} width="15" height="15" padding-left="5"/>
                            </button></th>
                        <th>EC
                            <button onClick={this.handleClick} variant="light">
                                <img src={sortimg} width="15" height="15" padding-left="5"/>
                            </button></th>
                        <th>AC
                            <button onClick={this.handleClick} variant="light">
                                <img src={sortimg} width="15" height="15" padding-left="5"/>
                            </button></th>
                        <th>I
                            <button onClick={this.handleClick} variant="light">
                                <img src={sortimg} width="15" height="15" padding-left="5"/>
                            </button></th>
                        <th>GP
                            <button onClick={this.handleClick} variant="light">
                                <img src={sortimg} width="15" height="15" padding-left="5"/>
                            </button></th>
                    </tr>
                    <hr></hr>
                    <tr>
                        <td>mobile app</td>
                        <td>EPD</td>
                        <td>A</td>
                        <td>SA&D</td>
                        <td>50</td>
                        <td>$17231</td>
                        <td>$12495</td>
                        <td>$100000</td>
                        <td>$82735</td>
                    </tr>
                </table>
            </div>
        )
    }
}
