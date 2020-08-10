import React, { Component } from 'react';
import 'fontsource-roboto';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Table, TableBody, TableCell, TableRow, TableHead} from '@material-ui/core';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
  
const rows = [
    createData('SA&D', '2020/8/10','2020/8/20', 5000, 4000),
    createData('SI&I', '2020/8/10','2020/8/20', 5000,4000),
    createData('UAT', '2020/8/10','2020/8/20', 5000, 4000),
    createData('Production Rollout', '2020/8/10','2020/8/20', 5000, 4000),
    createData('Nursing','2020/8/10','2020/8/20', 5000, 4000),
    createData('SM&S','2020/8/10','2020/8/20', 5000, 4000),
  ];

  export default class PJperiod extends Component {
      render() {
          return(
            <Table size="small" aria-label="a dense table" >
                <TableHead>
                    <TableRow>
                        <TableCell>Project Period</TableCell>
                        <TableCell align="right">Start Date</TableCell>
                        <TableCell align="right">End Date</TableCell>
                        <TableCell align="right">Expected Cost</TableCell>
                        <TableCell align="right">Actual Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>


            </Table>
          );
      }
  }
            