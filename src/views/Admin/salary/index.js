import React from 'react'
import { Container,Button,CardContent,makeStyles,Card,Grid} from '@material-ui/core';
import Page from 'src/components/Page';
import SalaryList from './salarylist'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {salaryGenerate,fetch_all_salary_start} from 'src/store/action/Admin'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
  },
 
}));

const  month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

function Salary(props) {
    const classes = useStyles()
    const [call,setCall] = React.useState(false)
    const [show,setShow] = React.useState(false)
    const [salary,setSalary] = React.useState({
        username : '',
        month : ''
    })

    React.useEffect(() =>{
        setCall(false)
        props.onEmployeesSalaryFetch(props.token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[call])

    let showsnak = null
    if(show){
      showsnak = (
        <div>
          <Snackbar open={show} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000} onClose={() => setShow(false)}>
            <Alert severity="success">
              {'Generated'}
            </Alert>
          </Snackbar>
        </div>
      )
    }

    const handleChange = (e) =>{
        const {name,value} = e.target
        setSalary(prevstate => ({
            ...prevstate,
            [name] : value 
        }))
    }

    const submithandle = (e) =>{
        e.preventDefault()
        setCall(true)
        setShow(true)
        props.onSalaryGenerate(salary,props.token)
        
    } 
    return (
        <>
        <Page className={classes.root} title="Salary">
            <Container style={{paddingTop:'15px'}}>
                <Card>
                <form onSubmit={submithandle}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={4}>
                            <FormControl  className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Username</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={salary.username}
                                    onChange={handleChange}
                                    label="Username"
                                    required
                                    name="username"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {props.employees.map(val => (
                                    <MenuItem value={val.username}>{val.username}</MenuItem>    
                                ))}
                                
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Month</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple"
                                    id="demo-simple"
                                    required
                                    value={salary.month}
                                    onChange={handleChange}
                                    label="Month"
                                    name="month"

                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {month.map(val =>(
                                    <MenuItem value={val}>{val}</MenuItem>    
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} style={{marginTop:'18px'}}>
                            <Button type="submit" variant={'outlined'} color="primary">Generate</Button>
                        </Grid>
                    </Grid>
                </CardContent>
                </form>
                </Card>
            </Container>
            <Container style={{paddingTop:'15px'}}>
                <SalaryList/>
            </Container>
        </Page>
        {showsnak}
        </>
    )
}

const maptostate = state =>{
    return{
        token : state.auth.token,
        employees : state.admin.employees.Employees,
    }
}

const maptodispatch = dispatch =>{
    return{
        onSalaryGenerate : (data,token) => dispatch(salaryGenerate(data,token)),
        onEmployeesSalaryFetch : (token) => dispatch(fetch_all_salary_start(token))
    }
}
export default connect(maptostate,maptodispatch)(Salary)
