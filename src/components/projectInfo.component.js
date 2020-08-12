import React, { Component } from 'react';
import { TextField,  Box, Button, Grid} from '@material-ui/core';
import PjPeriod from './pjperiod.component';
import Staff from './staff.component';
import Ecchart from './EC.component';
import Acchart from './AC.component';

export default class ProjectInfo extends Component {
    render() {
        return (
            <div className="container">
                <Grid container spacing={3} justify="flex-end"
  alignItems="flex-end">

                    <Grid item xs={4}>
                        <TextField
                        id="standard-read-only-input"
                        label="Project Name:"
                        defaultValue={this.props.ProjectName}
                        InputProps={{
                            readOnly: true,
                        }}/>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                        id="standard-read-only-input"
                        label="Customer Name:"
                        defaultValue={this.props.CustomerName}
                        InputProps={{
                            readOnly: true,
                        }}/>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                        id="standard-read-only-input"
                        label="Project Status:"
                        defaultValue={this.props.PJStatus}
                        size="Normal"
                        InputProps={{
                            readOnly: true,
                        }}/>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                        id="standard-read-only-input"
                        label="Real Time Spent:"
                        defaultValue={this.props.TimeSpent}
                        InputProps={{
                            readOnly: true,
                        }}/>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                        id="standard-read-only-input"
                        label="Income$"
                        defaultValue={this.props.Income}
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                        id="standard-read-only-input"
                        label="Gp:"
                        defaultValue={this.props.Gp}
                        InputProps={{
                            readOnly: true,
                        }}/>
                    </Grid>
                
                    <Grid  justify="flex-end" alignItems="flex-end">
                        <Button variant="contained" color="primary" href="/edit/:id" >Edit</Button>{' '}
                    </Grid>
                </Grid>
                
                
                <br/><br/>
                <div className="container-fluid">
                        <Box display="flex" flexDirection="row" flexWrap="wrap" justify="space-evenly">
                                <Box flexGrow={1}>
                                    <Acchart  />
                                </Box>
                                <Box flexGrow={1}>
                                    <Ecchart />
                                </Box>
                        </Box>
                </div>
                    <br/><br/><br/>
                    <PjPeriod/>
                    <br/><br/><br/>
                    <Staff/>
            </div>
            
            
            
            
            
            
                 
            );
    }
}
