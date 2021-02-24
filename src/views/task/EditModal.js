import React from 'react';
import {makeStyles} from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {update_task} from 'src/store/action/User'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  leaveboard :{
    padding:'15px'
  }

}));

function EditModel({data,token,onUpdateTask,changed}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false)
  const [tech,setTech] = React.useState(data.Technology)
  const [project,setProjectname] = React.useState(data.ProjectName)
  const [desc,setDesc] = React.useState(data.desc)
  const [hour,setHour] = React.useState(data.hour)

  const showHandler = () =>{
    setShow(true)
  }

  const closeHandler = () =>{
    setShow(false)
  }

  const updateHandler = () =>{
    setShow(false)
    setOpen(true)
    const newtask = {
      technology : tech,
      projectname : project,
      hour:hour,
      desc: desc
    }
    onUpdateTask(newtask,token,data.id)

  }

  let showsnak = null
  if(open){
      showsnak = (
        <div>
          <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000} onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity="success">
              {/* {props.AddressDetails === undefined ? 'Details Are Added.' : 'Details Are Updated.'} */}
              Task Updated..
            </Alert>
          </Snackbar>
        </div>
      )
  }


  
  return (
    <>
    <div>
      <IconButton onClick={showHandler}>
        <EditIcon/>
      </IconButton>
      {/* <Button variant="outlined" onClick={showHandler} color="primary">Update</Button> */}
      
      <Dialog open={show} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title" >Today's Task</DialogTitle>
        <form>
          <DialogContent>
              <TextField
                  margin="dense"
                  fullWidth
                  label="Technology"
                  name="technology"
                  onChange={(e) => setTech(e.target.value)}
                  value={tech}
                  variant="outlined"
              />
              <TextField
                  margin="dense"
                  fullWidth
                  label="Project Name"
                  name="projectname"
                  onChange={(e) => setProjectname(e.target.value)}
                  value={project}
                  variant="outlined"
              />
              <TextField
                  margin="dense"
                  fullWidth
                  label="Working Hours"
                  name="hour"
                  onChange={(e) => setHour(e.target.value)}
                  value={hour}
                  variant="outlined"
              />
              <TextField
                  margin="dense"
                  id="desc"
                  multiline
                  name="desc"
                  rows={5}
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  variant="outlined"
                  label="Task Detaild Description"
                  fullWidth
              />

          </DialogContent>
          <DialogActions>
          <Button onClick={updateHandler} color="primary">
            Update
          </Button>
          <Button onClick={closeHandler} color="primary">
            Cancle
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
    {showsnak}
    </>
  );
}


const maptostate = state =>{
  return{
    token : state.auth.token,
  }
}

const maptodispatch = dispatch =>{
  return {
    onUpdateTask : (data,token,index) => dispatch(update_task(data,token,index))
  }
}


export default connect(maptostate,maptodispatch)(EditModel)