import React, { Component } from 'react';
import SortTable from './table_homepage.component';

export default class TodosList extends Component {
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
                <SortTable/>
            </div>
        )
    }
}    
