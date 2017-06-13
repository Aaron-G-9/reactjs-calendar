import React, { Component } from "react"
import { prettyHours, dayNames, shortDayNames } from "./utils/Strings"

const columnStyle = {
  width: "14%",
  height: "100%",
  textAlign: "center"
}

const hourColStyle = {
  display: "flex",
  flexDirection: "column",
  width: "5%"
}

const hourCol = () => {
  let column = [<div key="TopLeftCorner" style={{ height: "1.8%" }} />]
  for (let i = 0, size = prettyHours.length; i < size; i++) {
    column.push(
      <div
        style={{ textAlign: "center", height: "5.72%" }}
        key={prettyHours[i]}
      >
        {prettyHours[i]}
      </div>
    )
  }
  return column
}

const weekCol = (meetings) => {
  let column = []
  for (let i = 0; i < 34; i++) {
    if (meetings !== null && meetings !== undefined && (meetings[0].starttime.substring(0, 2) * 2 -14) === i){

      column.push(
        <div key={"weekCol" + i} style={{ border: "1px solid lightgrey", height: "2.65%" }}>
          <button style={{backgroundColor: 'lightblue', border: 'none', width: '100%', height: '250%'}}>
            {meetings[0].coursetitle}
          </button>
        </div>
      )
    }else {
      column.push(
          <div key={"weekCol" + i} style={{ border: "1px solid lightgrey", height: "2.65%" }}/>
      )
    }
  }
  return column
}

class Weekview extends Component {
  getDayNames = () => {
    
  }

  render() {
    console.log(this.props.meetings)
    return (
      <div style={{ border: "1px solid black", height: 950, display: "flex", fontFamily: "Arimo" }}>
        <div style={hourColStyle}>
          {hourCol()}
        </div>
        <div style={columnStyle}>
          <div style={{ height: "2.7%" }}>
            {dayNames[0]}
          </div>
          {weekCol(this.props.meetings[5][13])}
        </div>
        <div style={columnStyle}>
          <div style={{ height: "2.7%" }}>
            {dayNames[1]}
          </div>
          {weekCol()}
        </div>
        <div style={columnStyle}>
          <div style={{ height: "2.7%" }}>
            {dayNames[2]}
          </div>
          {weekCol()}
        </div>
        <div style={columnStyle}>
          <div style={{ height: "2.7%" }}>
            {dayNames[3]}
          </div>
          {weekCol()}
        </div>
        <div style={columnStyle}>
          <div style={{ height: "2.7%" }}>
            {dayNames[4]}
          </div>
          {weekCol()}
        </div>
        <div style={columnStyle}>
          <div style={{ height: "2.7%" }}>
            {dayNames[5]}
          </div>
          {weekCol()}
        </div>
        <div style={columnStyle}>
          <div style={{ height: "2.7%" }}>
            {dayNames[6]}
          </div>
          {weekCol()}
        </div>
      </div>
    )
  }
}

export default Weekview
