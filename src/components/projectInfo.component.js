import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { TextField, Paper, Box} from '@material-ui/core';
import PjPeriod from './pjperiod.component';
import Staff from './staff.component';
import Ecchart from './EC.component';
import Acchart from './AC.component';

export default class ProjectInfo extends Component {
    render() {
        return (
            <div className="container">
                <div class="d-flex justify-content-around"> 
                <TextField
                id="standard-read-only-input"
                label="Project Name:"
                defaultValue={this.props.ProjectName}
                InputProps={{
                    readOnly: true,
                }}/>
                <TextField
                id="standard-read-only-input"
                label="Customer Name:"
                defaultValue={this.props.CustomerName}
                InputProps={{
                    readOnly: true,
                }}/>
                <TextField
                id="standard-read-only-input"
                label="Project Status:"
                defaultValue={this.props.PJStatus}
                size="Normal"
                InputProps={{
                    readOnly: true,
                }}/>
                <TextField
                id="standard-read-only-input"
                label="Real Time Spent:"
                defaultValue={this.props.TimeSpent}
                InputProps={{
                    readOnly: true,
                }}/>
            </div>
            <br/>
            <div class="d-flex justify-content-around">
            <TextField
                id="standard-read-only-input"
                label="Total Income:"
                defaultValue={this.props.TotalIncome}
                InputProps={{
                    readOnly: true,
                }}/>
                <TextField
                id="standard-read-only-input"
                label="Gp:"
                defaultValue={this.props.Gp}
                InputProps={{
                    readOnly: true,
                }}/>
            </div>
            <br/><br/><br/>
            <Box display="flex" flexDirection="row" flexWrap="wrap" style={{ height:400, }}>
               <Box flexGrow={1}>
                   <Acchart />
               </Box>
                <Box flexGrow={1}>
                    <Ecchart/>
                </Box>
            </Box>
               <PjPeriod/>
               <br/><br/><br/>
                <Staff/>
            </div>
            
                 
            );
    }
}