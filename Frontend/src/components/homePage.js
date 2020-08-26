import React, { Component } from 'react';
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const List = props => (
  <tr>
    <td>{props.idx}</td>
    <td>{props.elem.name}</td>
    <td>{props.elem.customer.lastName + ' ' + props.elem.customer.firstName}</td>
    <td>{props.elem.selling}</td>
    <td>{props.elem.totalCost}</td>
    <td><Link to={'/project/'+props.elem._id}>View</Link></td>
  </tr>
)

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    // this.options = {
    //     sortIndicator: true
    // };
    this.state = {
      projectList: []
    };
  }

  // CellFormatter(cell, row) {
  //   return (<div><a color='#fff' href={"/project/"+row.Project_id}>{cell}</a></div>);
  // }

  // componentDidUpdate = () => {
  //   axios.get('http://localhost:4000/project/')
  //       .then(res => {
  //         this.setState({projectList: res.data})
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  // }

  componentDidMount = () => {
    axios.get('http://localhost:4000/project/')
      .then(res => {
        this.setState({projectList: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  }


  render() {
    return (
      <div className="container fluid">
        <section className="jumbotron width:50 height=50">
          <h2 className="text-center" >Summary</h2>
          <p>Total Project Number: </p>
          <p>Overall Income: </p>
          <p>Overall Spending: </p>
          <p>Overall Gross Profit: </p>
        </section>

        <table className='table table-striped'>
          <thead>
            <tr>
              <th>#</th>
              <th>Project</th>
              <th>Customer Name</th>
              {/* <th>Period</th> */}
              <th>Project Selling</th>
              <th>Expected Cost</th>
              {/* <th>Actual Cost</th> */}
              {/* <th>Gross Profit</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.projectList.map((item, i) => (
              <List elem={item} key={i} idx={i+1}/>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}   
