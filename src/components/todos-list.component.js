import React, { Component } from 'react';

export default class TodosList extends Component {
    render() {
        return (
            <div>
                <section class="jumbotron width:100 height=100">
                    <h2 class="text-center">Summary</h2>
                    <p>Total Project Number: <p class="text-right">Number</p></p>
                    <p>Overall Income: <p class="text-right">Number</p></p>
                    <p>Overall Spending: <p class="text-right">Number</p></p>
                    <p>Overall Gross Profit: <p class="text-right">Number</p></p>
                </section>
                <hr></hr>
                <section >
                    <p>Filter by</p>
                    <p>Customer Name:</p>
                    <p>Project Name: </p>
                    <p>AD user ID: </p>
                </section>
                <hr></hr>
                <table boder="100" cellPadding="10" cellSpacing="0"> 
                    <tr>
                        <th>Project Name</th>
                        <th>Customer</th>
                        <th>PM</th>
                        <th>Period</th>
                        <th>Time Spent(days)</th>
                        <th>EC</th>
                        <th>AC</th>
                        <th>I</th>
                        <th>GP</th>
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