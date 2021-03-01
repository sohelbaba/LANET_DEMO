import React from 'react'
import {Card,Grid} from '@material-ui/core';
import Chart from 'react-apexcharts'

const Demo = () => {
    const options = {
        chart: { height: 150, type: 'radialBar'},
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: { fontSize: '8px',},
                    value: { fontSize: '18px',},
                    total: {
                      show: true,
                      label: 'Available',
                      formatter: function (w) {
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return 12
                      }
                    }
                  }
                }
              },
            labels: ['Total', 'Consumed'],
        }
    const series = [100, 55]
    return (
        <>
        <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card>
                <Chart options={options} series={series} type="radialBar" 
                 height={300} />
            </Card>
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card>
                <Chart options={options} series={series} type="radialBar" 
                 height={300} />
            </Card>
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card>
                <Chart options={options} series={series} type="radialBar" 
                 height={300} />
            </Card>
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card>
                <Chart options={options} series={series} type="radialBar" 
                 height={300} />
            </Card>
        </Grid>
        </Grid>
        </>
    )
}

export default Demo