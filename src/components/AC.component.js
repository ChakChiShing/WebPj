import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

export default class ECChart extends Component {
    constructor(props){
        super(props);
        this.state ={
            chartData:{
                labels:['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
                datasets:[
                    {
                        label:'Actual Cost',
                        data:[
                            125252,
                            123525,
                            364363,
                            346346,
                            23423,
                            254662
                        ],
                        backgroundColor:[
                            '#339EFF',
                            '#339EFF',
                            '#339EFF',
                            '#339EFF',
                            '#339EFF',
                            '#339EFF',
                            '#339EFF',
                        ]
                    }
                ]
            }
        }
    }
    render() {
        return(
            <div className="chart" style={{width:300, height:300}}>
                <Bar 
                    data={this.state.chartData}
                    width={10}
                    height={10}
                    options={{}}
                />
            </div>
        );
    }
}