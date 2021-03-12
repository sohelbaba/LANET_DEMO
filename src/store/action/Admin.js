import * as actionTypes from "./actions";
import axios from "axios";

const fetch_employeesdata = (data) => {
  return {
    type: actionTypes.FETCH_ALL_USER_DATA,
    data,
  };
};

const error_fetchdata = (data) => {
  return {
    type: actionTypes.ERROR_FETCH_ALL_DATA,
    data,
  };
};

const Set_Error = (error) => {
  return {
    type: actionTypes.SET_DATA_ERROR,
    error,
  };
};

const Server_Error = (error) => {
  return {
    type: actionTypes.SERVER_ERROR,
    error: error,
  };
};

export const fetch_employeedata_start = (token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://127.0.0.1:5000/employee/data", yourConfig)
      .then((response) => {
        //console.log(response.data.Employees)
        dispatch(fetch_employeesdata(response.data));
      })
      .catch((error) => {
        dispatch(Server_Error(error));
      });
  };
};

export const save_designation = (data) => {
  return {
    type: actionTypes.ADD_DESIGNATIONS,
    data,
  };
};

export const get_designations = (token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://127.0.0.1:5000/getdesignation", yourConfig)
      .then((response) => {
        // console.log(response.data)
        dispatch(save_designation(response.data));
      })
      .catch((error) => {
        // dispatch(Server_Error(error))
      });
  };
};

export const add_designation_start = (data, token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const payload = JSON.stringify(data);
    axios
      .post("http://127.0.0.1:5000/designations", payload, yourConfig)
      .then((response) => {
        // dispatch(save_designation(response.data))
      })
      .catch((error) => {
        dispatch(Server_Error(error));
      });
  };
};

export const update_designation = (data, token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const payload = JSON.stringify(data);
    axios
      .put("http://127.0.0.1:5000/designations", payload, yourConfig)
      .then((response) => {
        console.log(response.data);
        // dispatch(save_designation(response.data))
      })
      .catch((error) => {
        //   dispatch(Server_Error(error));
      });
  };
};

export const add_employee = (data, token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const payload = JSON.stringify(data);
    axios
      .post("http://127.0.0.1:5000/employee/register", payload, yourConfig)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        dispatch(Set_Error(error));
      });
  };
};

export const fetch_tasks = (data) => {
  // console.log(data)
  return {
    type: actionTypes.GET_TASKS,
    data,
  };
};

export const fetch_tasks_start = (token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://127.0.0.1:5000/employee/Alltasks", yourConfig)
      .then((response) => {
        console.log(response.data);
        dispatch(fetch_tasks(response.data));
      })
      .catch((error) => {
        // dispatch(Server_Error(error))
      });
  };
};

export const fetch_leaves = (data) => {
  // console.log(data)
  return {
    type: actionTypes.GET_LEAVES,
    data,
  };
};

export const fetch_leaves_start = (token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://127.0.0.1:5000/employee/AllLeaves", yourConfig)
      .then((response) => {
        console.log(response.data);
        dispatch(fetch_leaves(response.data));
      })
      .catch((error) => {
        // dispatch(Server_Error(error))
      });
  };
};

export const approve_leave = (id, data, token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const payload = JSON.stringify(data);
    axios
      .put("http://127.0.0.1:5000/leave/" + id, payload, yourConfig)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // dispatch(Server_Error(error))
      });
  };
};

export const reject_leave = (id, data, token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const payload = JSON.stringify(data);
    axios
      .put("http://127.0.0.1:5000/leave/" + id, payload, yourConfig)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // dispatch(Server_Error(error))
      });
  };
};

export const salaryGenerate = (data, token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const payload = JSON.stringify(data);
    axios
      .post(
        "http://127.0.0.1:5000/employee/salarygenerate",
        payload,
        yourConfig
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // dispatch(Server_Error(error))
      });
  };
};

export const fetch_all_salary = (data) => {
  // console.log(data)
  return {
    type: actionTypes.FETCH_ALL_SALARY_DETAILS,
    data,
  };
};

export const fetch_all_salary_start = (token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://127.0.0.1:5000/salarydetails", yourConfig)
      .then((response) => {
        console.log(response.data);
        dispatch(fetch_all_salary(response.data));
      })
      .catch((error) => {
        // dispatch(Server_Error(error))
      });
  };
};

// reports api call

const employee_report = (data) => {
  return {
    type: actionTypes.FETCH_EMPLOYEE_REPORT,
    data,
  };
};

export const fetch_employee_report = (data, token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const payload = JSON.stringify(data);
    axios
      .post("http://127.0.0.1:5000/employee/reports", payload, yourConfig)
      .then((response) => {
        // console.log(response.data);
        dispatch(employee_report(response.data));
      })
      .catch((error) => {
        dispatch(Server_Error(error));
      });
  };
};

const task_report = (data) => {
  return {
    type: actionTypes.FETCH_TASK_REPORT,
    data,
  };
};

export const fetch_task_report = (data, token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const payload = JSON.stringify(data);
    axios
      .post("http://127.0.0.1:5000/task/reports", payload, yourConfig)
      .then((response) => {
        dispatch(task_report(response.data));
      })
      .catch((error) => {
        // dispatch(Server_Error(error));
      });
  };
};

const salary_report = (data) => {
  return {
    type: actionTypes.FETCH_SALARY_REPORT,
    data,
  };
};

export const fetch_salary_report = (data, token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const payload = JSON.stringify(data);
    axios
      .post("http://127.0.0.1:5000/salary/reports", payload, yourConfig)
      .then((response) => {
        dispatch(salary_report(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        // dispatch(Server_Error(error));
      });
  };
};

const leave_report = (data) => {
  return {
    type: actionTypes.FETCH_LEAVE_REPORT,
    data,
  };
};

export const fetch_leave_report = (data, token) => {
  return (dispatch) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const payload = JSON.stringify(data);
    axios
      .post("http://127.0.0.1:5000/leave/reports", payload, yourConfig)
      .then((response) => {
        dispatch(leave_report(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        // dispatch(Server_Error(error));
      });
  };
};

export const clean_stuff = () => {
  return {
    type: actionTypes.CLEAN_STUFF,
  };
};
