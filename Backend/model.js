const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

let Project = new Schema({
  name: String , 
  selling: String , 
  customer: {
    lastName: String, 
    firstName: String, 
    organization: String
  }, 
  totalCost: String, 
  checkbox: [{
    period: String, 
    option: Boolean, 
    startDD: String, 
    startMM: String, 
    startYYYY: String, 
    endDD: String, 
    endMM: String, 
    endYYYY: String,
  }], 
  rowsTM: [{
    lastName: String, 
    firstName: String, 
    position: String, 
    checkboxTeamMember: [{
      period: String, 
      option: Boolean, 
      daysSpent: String, 
      remarks: String
    }], 
    cost: Number
  }], 
  rowsOC: [{
    equipment: String, 
    quantity: String, 
    cost: Number
  }]
})

module.exports = mongoose.model('Project', Project)