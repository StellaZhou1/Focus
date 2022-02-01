import React from 'react'
import Paper from '@mui/material/Paper'
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  ScatterSeries
} from '@devexpress/dx-react-chart-material-ui'
import { scaleBand } from '@devexpress/dx-chart-core'
import { ArgumentScale } from '@devexpress/dx-react-chart'
import { useSelector } from 'react-redux'
const generateData = (tasks,category,scale) => {
  let categoryTasks = tasks
  if(category!=='Default'){
    categoryTasks = tasks.filter(t => t.category===category)
  }
  let data = []
  let currentTime = new Date()
  for (let i=0;i<6;i++ ){
    if(scale==='Day'){
      let end=new Date()
      end.setDate(currentTime.getDate() + i - 5)
      let start = new Date()
      start.setDate(start.getDate() + i - 6)
      const tempTasks = categoryTasks.filter(t => {
        const tStartTime = new Date(t.startTime)
        return (tStartTime<end&&tStartTime>start)})
      data.push({ time:`Day ${i+1}`,value:averageInterrupts(tempTasks) })
    }
    else if (scale==='Week'){
      let end=new Date()
      end.setDate(currentTime.getDate() + (i - 5)*7)
      let start = new Date()
      start.setDate(start.getDate() + (i - 6)*7)
      const tempTasks = categoryTasks.filter(t => {
        const tStartTime = new Date(t.startTime)
        return (tStartTime<end&&tStartTime>start)})
      data.push({ time:`Week ${i+1}`,value:averageInterrupts(tempTasks) })
    }
    else if (scale==='Month'){
      let end=new Date()
      end.setMonth(currentTime.getMonth() + i - 5)
      let start = new Date()
      start.setMonth(start.getMonth() + i - 6)
      const tempTasks = categoryTasks.filter(t => {
        const tStartTime = new Date(t.startTime)
        return (tStartTime<end&&tStartTime>start)})
      data.push({ time:`Month ${i+1}`,value:averageInterrupts(tempTasks) })
    }
  }
  return data
}
const averageInterrupts = (tasks) => {
  const sum = (previousValue, task) => {
    return (task.interrupts.length + previousValue)}
  if(tasks.length===0){
    return 0
  }
  return tasks.reduce(sum,0)/tasks.length
}
const CustomizedChart = ({ categoryToDisplay,timeScale }) => {
  const tasks = useSelector(state => state.tasks)
  const data = generateData(tasks,categoryToDisplay,timeScale)
  return(
    <Paper>
      <Chart
        data={data} id="chart" height={300}
      >
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis showGrid/>
        <ValueAxis tickSize={1}/>
        <ScatterSeries
          valueField="value"
          argumentField="time"
        />
        <LineSeries valueField="value" argumentField="time" />

      </Chart>
    </Paper>
  )}

export default CustomizedChart
