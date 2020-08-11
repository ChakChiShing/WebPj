import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const project_Info = [
    {
        Project_id:1212,
        projectName: "MAobile app",
        CustomerName: "BPD",
        Position_PM: "A",
        CurrentPeriod: "SA&D",
        TimeSpent: 15,
        EC:1335,
        AC:3552,
        I:153262,
        GP:32593693
    },
    {
        Project_id:1252535,
        projectName: "Mobile app",
        CustomerName: "DPD",
        Position_PM: "B",
        CurrentPeriod: "SA&D",
        TimeSpent: 125,
        EC:135,
        AC:352452,
        I:1532622,
        GP:32936936
    },
    {
        Project_id:1252335,
        projectName: "Aobile app",
        CustomerName: "APD",
        Position_PM: "C",
        CurrentPeriod: "A&D",
        TimeSpent: 25,
        EC:135235,
        AC:32452,
        I:532622,
        GP:32593463636366,
    }
];


export default class TableHome extends Component {
    constructor(props) {
        super(props);
    
        this.options = {
            // onRowClick: function(row) {
            //     <Route>
            //         <Link to="/project/"></Link>
            //     </Route>
            // },
            onRowClick: function(row) {
                alert(`You click row id: ${row.Project_id}`);
              },

            sortIndicator: true
        };
      }

    render() {
        return(
            <div>

<BootstrapTable data={project_Info} pagination striped hover options={this.options}>
      <TableHeaderColumn isKey dataField='projectName' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>Product</TableHeaderColumn>
      <TableHeaderColumn dataField='CustomerName' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>Customer Name</TableHeaderColumn>
      <TableHeaderColumn dataField='Position_PM' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>PM</TableHeaderColumn>
      <TableHeaderColumn dataField='CurrentPeriod' dataSort>Period</TableHeaderColumn>
      <TableHeaderColumn dataField='TimeSpent' dataSort>Time Spent </TableHeaderColumn>
      <TableHeaderColumn dataField='EC' dataSort>EC</TableHeaderColumn>
      <TableHeaderColumn dataField='AC' dataSort>AC</TableHeaderColumn>
      <TableHeaderColumn dataField='I' dataSort>I</TableHeaderColumn>
      <TableHeaderColumn dataField='GP' dataSort>GP</TableHeaderColumn>
  </BootstrapTable>
            </div>
        );
    }
}
