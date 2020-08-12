import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableRow, TableHead} from '@material-ui/core';

function createData(name,position, wh, period) {
    return { name, position, wh, period};
  }

const rows = [
    createData('Ben', 'PM', 50, 'SA&d'),
    createData('Peter', 'SA',400, 'SI&I'),
    createData('Samuel', 'AP', 200, 'SI&I, SA&D'),
    createData('Charlie', 'P', 45, 'Nursing'),
  ];

  export default class StaffDetail extends Component {
      render() {
          return(
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Position</TableCell>
                        <TableCell align="right">Working Hour</TableCell>
                        <TableCell align="right">Period Involved</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.position}</TableCell>
                        <TableCell align="right">{row.wh}</TableCell>
                        <TableCell align="right">{row.period}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          );
      }
  }
            
