import MUIDataTable from "mui-datatables";
import React from 'react'
import {Button} from '@material-ui/core'
import {connect} from 'react-redux'
import CircularProgress  from '@material-ui/core/CircularProgress';
import format from "date-fns/format"
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {approve_leave,fetch_leaves_start,reject_leave} from 'src/store/action/Admin'

const LeaveList = (props) =>{
    const columns = ["Apply Date", "Username","Type","From", "To", "Status","Approve","Cancle"];
    const [call,setCall] = React.useState(false)
    const [show,setShow] = React.useState(false)
    const [status,setStatus] = React.useState({status : ''})

    React.useEffect(()=>{
      setCall(false)
      props.OnLeavesGet(props.token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[call])

    let showsnak = null
    if(show){
      showsnak = (
        <div>
          <Snackbar open={show} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000} onClose={() => setShow(false)}>
            <Alert severity="success">
              {'Application ' + status.status}
            </Alert>
          </Snackbar>
        </div>
      )
    }

    const LeaveApprove = (id) =>{
        // console.log(id)
        setStatus({status : 'Approved'})
        const data = {status : 'Approved'}
        setCall(true)
        setShow(true)
        props.OnApproveLeave(id,data,props.token)
    }

    const LeaveCancle = (id) =>{
        // console.log(id)
        const data = {status : 'Cancle'}
        setStatus({status : 'Cancle'})
        setCall(true)
        setShow(true)
        props.OnCancleLeave(id,data,props.token)
    } 

    let data= null
    if(props.leaves !== null){
      data = props.leaves.Leaves.map((row) =>(
        [
            format(new Date(row['Apply Date']),"EEE, dd MMM yyyy"),
            row['Username'],
            row['Type'],
            format(new Date(row['Start Date']),"EEE, dd MMM yyyy"),
            format(new Date(row['End Date']),"EEE, dd MMM yyyy"),
            row['Status'] === 'Pending' || row['Status'] === 'Cancle'
            ? <span style={{color:'red'}}> {row['Status']}</span> 
            : <span style={{color:'green'}}>{row['Status']}</span>,
            <Button variant="outlined" color="primary" disabled={row['Status'] === 'Approved'} onClick={(id) => LeaveApprove(row.leave_id)}>Approve</Button>,
            <Button variant="outlined" color="secondary"  onClick={(id) => LeaveCancle(row.leave_id)}>Cancle</Button>
        ]
      )) ;
    }
    
    const options = {
    filterType: 'dropdown',
    rowsPerPageOptions : [5,10,15,25,50,100],
    rowsPerPage : 5,
    // expandableRows: true, // Try Adding This
    // renderExpandableRow: (rowData, rowMeta) => {
    // console.log(rowData, rowMeta);
    // return (
    //   <TableRow>
    //     <TableCell colSpan={rowData.length} style={{padding:'10px'}}>
    //       sadadhkajs
    //     </TableCell>
    //   </TableRow>
    // );}
    };

    
    return ( 

    <>
      {props.leaves !== null 
        ? <MUIDataTable title={"Leaves List"} data={data} columns={columns} options={options} />
        : <div style={{margin:'180px 450px auto'}}><CircularProgress /></div>
      }
      {showsnak}
     </>
    )
    
}

const maptostate = state =>{
  return{
    token : state.auth.token,
    leaves : state.admin.AllLeaves
  }
}

const maptodispatch = dispatch =>{
  return {
    OnLeavesGet : (token) => dispatch(fetch_leaves_start(token)),
    OnApproveLeave : (id,data,token) => dispatch(approve_leave(id,data,token)),
    OnCancleLeave : (id,data,token) => dispatch(reject_leave(id,data,token))
  }
}

export default connect(maptostate,maptodispatch)(LeaveList)
