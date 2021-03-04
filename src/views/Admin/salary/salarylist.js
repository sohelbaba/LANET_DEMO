import MUIDataTable from "mui-datatables";
import React from 'react'
import {connect} from 'react-redux'
import format from "date-fns/format"
import CircularProgress  from '@material-ui/core/CircularProgress';

const SalaryList = (props) =>{
    const columns = ["Username", "Month", "Amount", "Payment Date"];
    // console.log(props.employees[0]['Joining Details'].length !== 0 ? props.employees['Joining Details'][0]['Join Date'] : '')
    let rows = null
    let data = null
    if(props.salary !== null){
      rows = [...props.salary.SalaryDetails].reverse()
      data = rows.map((row) =>(
        [
            row['username'],
            row['month'],
            row['amount'].toLocaleString(undefined,{ minimumFractionDigits: 2 }),
            format(new Date(row['generateddate']),"EEE, dd MMM yyyy")
        ]
      )) ;
    }
    

    
    const options = {
    filterType: 'dropdown',
    rowsPerPageOptions : [5,10,15,25,50,100],
    rowsPerPage : 5,
    // expandableRows: true, // Try Adding This
    // renderExpandableRow: (rowData, rowMeta) => {
    // // console.log(rowData, rowMeta);
    // return (
    //   <TableRow>
    //     <TableCell colSpan={rowData.length}>
    //       Custom expandable row option. Data: {JSON.stringify(rowData)}
    //     </TableCell>
    //   </TableRow>
    // );}
    
    };

    return ( 
      <>
      {props.salary !== null 
      ? <MUIDataTable title={"Employee List"} data={data} columns={columns} options={options}/>
      : <div style={{margin:'180px 450px auto'}}><CircularProgress /></div>
      }
    </>
    )

}

const maptostate = state =>{
  return{
    // token : state.auth.token,
    salary : state.admin.salarydetails
  }
}

export default connect(maptostate)(SalaryList)
