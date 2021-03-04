import MUIDataTable from "mui-datatables";
import React from 'react'
import {connect} from 'react-redux'
import CircularProgress  from '@material-ui/core/CircularProgress';
import format from "date-fns/format"

const Test = (props) =>{
    const columns = ["DateTime", "Username","ProjectName", "Technology", "Working Hour"];
    let data = null
    if(props.tasks !== null){
      data = props.tasks.Tasks.map((row) =>(
        [
            format(new Date(row['DateTime']),"EEE, dd MMM yyyy"),
            row['Username'],
            row['ProjectName'],
            row['Technology'] ,
            row['hour']
        ]
    )) ;
    } 


    const options = {
    filterType: 'checkbox',
    };

    return ( 
    // {show}
    <>
      {props.tasks !== null 
        ? <MUIDataTable title={"Tasks List"} data={data} columns={columns} options={options} />
        : <div style={{margin:'180px 450px auto'}}><CircularProgress /></div>
      }
     </>
    )
}

const maptostate = state =>{
  return{
    // token : state.auth.token,
    tasks :state.admin.Alltasks,
    employees : state.admin.employees.Employees
  }
}

export default connect(maptostate)(Test)
