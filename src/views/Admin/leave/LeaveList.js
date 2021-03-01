import MUIDataTable from "mui-datatables";
import React from 'react'
import {connect} from 'react-redux'
import CircularProgress  from '@material-ui/core/CircularProgress';

const LeaveList = (props) =>{
    const columns = ["Apply Date", "From", "To", "Status"];
    console.log(props.leaves)
    let data= null
    if(props.leaves !== null){
      data = props.leaves.Leaves.map((row) =>(
        [
            row['Apply Date'].split(' ')[0],
            row['Start Date'],
            row['End Date'],
            row['Status'] === 'Pending' || row['Status'] === 'Cancle'
            ? <span style={{color:'red'}}> {row['Status']}</span> 
            : <span style={{color:'green'}}>{row['Status']}</span>
        ]
      )) ;
    }
    
    const options = {
    filterType: 'checkbox',
    };

    
    return ( 

    <>
      {props.leaves !== null 
        ? <MUIDataTable title={"Leaves List"} data={data} columns={columns} options={options} />
        : <div style={{margin:'180px 450px auto'}}><CircularProgress /></div>
      }
     </>
    )
    
}

const maptostate = state =>{
  return{
    // token : state.auth.token,
    leaves : state.admin.AllLeaves
  }
}

export default connect(maptostate)(LeaveList)
