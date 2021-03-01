import MUIDataTable from "mui-datatables";
import React from 'react'
import {connect} from 'react-redux'

const Test = (props) =>{
    const columns = ["Username", "Designation", "Status", "JoiningDate"];
    console.log(props.employees[0]['Joining Details'].length !== 0 ? props.employees['Joining Details'][0]['Join Date'] : '')
    const data = props.employees.map((row) =>(
        [
            row['username'],
            row['role'],
            row['isActive'] ? 'Active' : 'DeActive',
            row['Joining Details'].length !== 0 ? row['Joining Details'][0]['Join Date'] : ''
        ]
    )) ;

    const options = {
    filterType: 'checkbox',
    };

    return ( 
    <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
    />)
}

const maptostate = state =>{
  console.log(state.admin.employees.Employees)
  return{
    // token : state.auth.token,
    employees : state.admin.employees.Employees
  }
}

export default connect(maptostate)(Test)
