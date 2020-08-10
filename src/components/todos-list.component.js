import React, { Component } from 'react';
import sortimg from './sorting.png';
import {Button, Table} from 'react-bootstrap';

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
                <section class="jumbotron width:50 height=50">
                    <h2 class="text-center" >Summary</h2>
                    <p>Total Project Number: <text>{this.props.TotalPJ}</text></p>
                    <p>Overall Income: <text class="text-center">{this.props.TotalIncome}</text></p>
                    <p>Overall Spending: <text class="text-right">{this.props.TotalSpending}</text></p>
                    <p>Overall Gross Profit: <text class="text-right">{this.props.TotalGp}</text></p>
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
                <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                            <th class="th-sm">Project Name
                            </th>
                            <th class="th-sm">Customer
                            </th>
                            <th class="th-sm">PM
                            </th>
                            <th class="th-sm">Current Period
                            </th>
                            <th class="th-sm">Time Spent(days)
                            </th>
                            <th class="th-sm">EC
                            </th>
                            <th class="th-sm">AC
                            </th>
                            <th class="th-sm">Ioncome
                            </th>
                            <th class="th-sm">GP
                            </th>
                            <th class="th-sm"></th>
                            </tr>
                            
                        </thead>
                        <tbody>
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
                                <Button variant="primary" href="/project/1" style={{marginLeft:20}}>Open</Button>{' '}
                            </tr>
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
                                <Button variant="primary" href="/project/1" style={{marginLeft:20}}>Open</Button>{' '}
                            </tr>
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
                                <Button variant="primary" href="/project/1" style={{marginLeft:20}}>Open</Button>{' '}
                            </tr>
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
                                <Button variant="primary" href="/project/1" style={{marginLeft:20}}>Open</Button>{' '}
                            </tr>
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
                                <Button variant="primary" href="/project/1" style={{marginLeft:20}}>Open</Button>{' '}
                            </tr>
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
                                <Button variant="primary" href="/project/1" style={{marginLeft:20}}>Open</Button>{' '}
                            </tr>
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
                                <Button variant="primary" href="/project/1" style={{marginLeft:20}}>Open</Button>{' '}
                            </tr>
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
                                <Button variant="primary" href="/project/1" style={{marginLeft:20}}>Open</Button>{' '}
                            </tr>
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
                                <Button variant="primary" href="/project/1" style={{marginLeft:20}}>Open</Button>{' '}
                            </tr>

                        </tbody>
                </table>
            </div>

                
                
            
        )
    }
}