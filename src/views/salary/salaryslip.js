import React from "react";
import "./salayslip.css";
import { connect } from "react-redux";

function SalarySlip(props) {
  return (
    <>
      {props.user.employee.Employee["Person Details"] !== undefined &&
      props.user.employee.Employee["Salary Details"].length !== 0 &&
      props.user.salarydetails.salary !== undefined ? (
        <div class="salary-slip" ref={props.ref}>
          <table class="empDetail" style={{ border: "1px solid black" }}>
            <tr height="60px" style={{ borderBottom: "1px solid black" }}>
              {/* <td colspan="4">Logo</td> */}
              <td colspan="8" class="companyName">
                {" "}
                SoftTech Pvt. Ltd.
              </td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{props.user.employee.Employee.username}</td>
              <td></td>
              <th>Bank Code</th>
              <td>
                {props.user.employee.Employee["Salary Details"][0]["IFSC Code"]}
              </td>
              <td></td>
              <th>Pay Slip No.</th>
              <td>ABC123</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{props.user.employee.Employee.email}</td>
              <td></td>
              <th>Bank Name</th>
              <td>
                {props.user.employee.Employee["Salary Details"][0]["BankName"]}
              </td>
              <td></td>
              <th>Pay Period</th>
              <td>{props.user.salarydetails.salary[0].month}</td>
            </tr>
            <tr>
              <th>Contact Number</th>
              <td>
                {
                  props.user.employee.Employee["Person Details"][0][
                    "Contact No."
                  ]
                }
              </td>
              <td></td>
              <th>Bank A/C no.</th>
              <td colspan="2">
                {
                  props.user.employee.Employee["Salary Details"][0][
                    "Account No."
                  ]
                }
              </td>
              <th>Date</th>
              <td>{"" + new Date().toLocaleDateString()}</td>
            </tr>
            <tr>
              <th>Designation:</th>
              <td colspan="5">
                {props.user.employee.Employee["Grade Details"][0]["Grade"]}
              </td>
            </tr>
            <tr>
              <th></th>
              <td></td>
              <td></td>
              <th></th>
              <td></td>
              <td></td>
              <th></th>
              <td></td>
            </tr>
            <tr class="myBackground">
              <th colspan="2">Payments</th>
              <th>Particular</th>
              <th class="table-border-right">Amount (Rs.)</th>
              <th colspan="2">Deductions</th>
              <th>Particular</th>
              <th>Amount (Rs.)</th>
            </tr>
            <tr>
              <th colspan="2">Basic Salary</th>
              <td></td>
              <td class="myAlign">
                {props.user.employee.Employee[
                  "Grade Details"
                ][0].Basic.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>
              <th colspan="2">Provident Fund</th>
              <td></td>

              <td class="myAlign">00.00</td>
            </tr>
            <tr>
              <th colspan="2">Fixed Dearness Allowance</th>
              <td></td>

              <td class="myAlign"> &nbsp; &nbsp; &nbsp; 00.00</td>
              <th colspan="2">LIC</th>
              <td></td>

              <td class="myAlign">00.00</td>
            </tr>
            <tr>
              <th colspan="2">Variable Dearness Allowance</th>
              <td></td>

              <td class="myAlign">
                {(
                  props.user.employee.Employee["Grade Details"][0].Basic * 0.25
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>
              <th colspan="2">Loan</th>
              <td></td>

              <td class="myAlign">00.00</td>
            </tr>
            <tr>
              <th colspan="2">House Rent Allowance</th>
              <td></td>
              <td class="myAlign">
                {(
                  props.user.employee.Employee["Grade Details"][0].Basic * 0.1
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>
              <th colspan="2">Professional Tax</th>
              <td></td>
              <td class="myAlign">00.00</td>
            </tr>
            <tr>
              <th colspan="2">Graduation Allowance</th>
              <td></td>

              <td class="myAlign">&nbsp; &nbsp; &nbsp; 00.00</td>
              <th colspan="2">Security Deposite(SD)</th>
              <td></td>

              <td class="myAlign">00.00</td>
            </tr>
            <tr>
              <th colspan="2">Conveyance Allowance</th> <td></td>
              <td class="myAlign"> &nbsp; &nbsp; &nbsp; 00.00</td>
              <th colspan="2">Labour Welfare Fund</th>
              <td></td>
              <td class="myAlign">00.00</td>
            </tr>
            <tr>
              <th colspan="2">Post Allowance</th>
              <td></td>
              <td class="myAlign">&nbsp; &nbsp; &nbsp; 00.00</td>
              <th colspan="2"></th>
              <td></td>
              <td class="myAlign"></td>
            </tr>
            <tr>
              <th colspan="2">Special Allowance</th>
              <td></td>
              <td class="myAlign">
                {(
                  props.user.employee.Employee["Grade Details"][0].Basic * 0.2
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>
              <th colspan="2"></th>
              <td></td>
              <td class="myAlign"></td>
            </tr>

            <tr class="myBackground">
              <th colspan="3">Total Payments</th>
              <td class="myAlign">
                {props.user.salarydetails.salary[0].amount.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </td>
              <th colspan="3">Total Deductions</th>
              <td class="myAlign">0.00</td>
            </tr>
            <tr height="40px">
              <th colspan="2"></th>
              <th></th>
              <td class="table-border-right"></td>
              <th colspan="2" class="table-border-bottom">
                Net Salary
              </th>
              <td></td>
              <td>
                &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                {props.user.salarydetails.salary[0].amount.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </td>
            </tr>
            <tr>
              <td colspan="2">Gross Salary</td> <td></td>
              <td class="myAlign">
                {props.user.salarydetails.salary[0].amount.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </td>
              <td colspan="4"></td>
            </tr>
            <tr>
              <td colspan="2">Aggr. Dedu - P.Tax & Std Ded</td> <td></td>
              <td class="myAlign">&nbsp; &nbsp; &nbsp; 00.00</td>
              <th colspan="2">Cumulative</th>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td colspan="2">Gross Total Income</td> <td></td>
              <td class="myAlign">
                {props.user.salarydetails.salary[0].amount.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </td>
              <td colspan="2">Empl PF Contribution</td> <td></td>
              <td class="myAlign">00.00</td>
            </tr>
            <tr>
              <td colspan="2">Aggr of Chapter "PF"</td> <td></td>
              <td class="myAlign">&nbsp; &nbsp; &nbsp; 00.00</td>
              <td colspan="4"></td>
            </tr>
            <tr>
              <td colspan="2">Total Income</td> <td></td>
              <td class="myAlign">
                {props.user.salarydetails.salary[0].amount.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </td>
              <td colspan="4"></td>
            </tr>
            <tbody class="border-center"></tbody>
          </table>
          *This slip is computer generated. If you see any mistake in
          calculation contact to HR department.
        </div>
      ) : null}
    </>
  );
}

const maptostate = (state) => {
  console.log(state.user);
  return {
    user: state.user,
  };
};

export default connect(maptostate)(SalarySlip);
