/* flow */
import React, { Component } from "react"
import { shortDayNames } from "./../utils/Strings"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"
import PropTypes from "prop-types"
import Paper from "material-ui/Paper"
import { getWeeksOfMonth, getDaysInMonth } from "./../utils/DateHelper"
import FiberManualRecord from "material-ui-icons/FiberManualRecord"
import { blue } from "material-ui/styles/colors"
import { getWeekOfMonth } from "./../utils/DateHelper"

const stylesheet = createStyleSheet("MobileMonthView", theme => ({
  todayNumber: {
    marginLeft: "-5px",
    marginTop: "-10px",
    fontWeight: "600"
  },
  otherDayNumber: {
    marginLeft: "-5px",
    marginTop: "-10px"
  },
  eventIcon: {
    fill: blue[500],
    width: "15px",
    height: "15px"
  },
  root: {
    height: "100%"
  },
  pastMonthDay: {
    fontSize: "15px",
    border: "1px solid white",
    padding: "10px",
    backgroundColor: "#E0E0E0"
  },
  currentDay: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#000000",
    border: "1px solid white",
    padding: "10px",
    backgroundColor: "rgba(86,162,234, 0.5)"
  },
  monthDay: {
    fontSize: "15px",
    border: "1px solid white",
    padding: "10px"
  },
  event: {
    display: "flex",
    justifyContent: "center"
  },
  monthDiv: {
    height: "100%"
  },
  monthTitleBar: {
    position: "relative",
    height: "50px"
  },
  table: {
    width: "100%",
    borderTop: "hidden",
    borderLeft: "hidden",
    borderRight: "hidden",
    borderCollapse: "collapse",
    height: "100%"
  },
  tableHead: {
    border: "1px solid rgba(0, 0, 0, 0.075)",
    color: "#000000",
    opacity: 0.7,
    textAlign: "center",
    fontWeight: "bold",
    borderTop: "hidden",
    height: "20%"
  },
  tableBody: {
    backgroundColor: "rgb(255,243,233)",
    color: "#000000",
    textAlign: "left",
    verticalAlign: "top"
  }
}))

class MobileMonthView extends Component {
  constructor() {
    super()
    this.state = {
      width: window.outerWidth,
      currentDay: null,
      events: null
    }
    this.monthDayCounter = 1
  }
  // @flow
  handleEventClick = (year: string, month: string, day: string) => {
    let week = getWeekOfMonth(year, month, day)
    console.log("day: " + day)
    console.log("week: " + week)
    console.log("month: " + month)
    console.log("year: " + year)
    console.log("I've been clicked")

    this.props.updateClicked(year, month, week, day)
  }

  weekDays = () => {
    let weekDaysRow = []

    for (let i = 0; i < 7; ++i) {
      weekDaysRow.push(
        <td key={i + Math.random()} style={{ width: "100rem" }}>
          <Typography type="body1" component="div" style={{ fontWeight: 600 }}>
            {shortDayNames[i]}
          </Typography>
        </td>
      )
    }
    return weekDaysRow
  }

  getMonthRows = () => {
    let first = new Date(
      this.props.currentDateRange.year,
      this.props.currentDateRange.month,
      1
    )
    let wks = getWeeksOfMonth(first)
    let rows = []

    for (let i = 0; i < wks; i++) {
      rows.push(
        <tr key={i + Math.random()}>
          {this.getDays(i)}
        </tr>
      )
    }
    this.monthDayCounter = 1
    return rows
  }

  // @flow
  getDays = (wk: number) => {
    const classes = this.props.classes
    let days = []
    let numDays = getDaysInMonth(
      this.props.currentDateRange.year,
      this.props.currentDateRange.month
    ).getDate()

    let first = new Date(
      this.props.currentDateRange.year,
      this.props.currentDateRange.month,
      1
    )

    let today = new Date()
    for (let i = 0; i < 7; i++) {
      if (this.monthDayCounter > numDays) {
        days.push(
          <td key={i + Math.random()} className={classes.pastMonthDay} />
        )
      } else if (
        this.monthDayCounter === 1 &&
        wk === 0 &&
        first.getDay() !== i
      ) {
        days.push(
          <td key={i + Math.random()} className={classes.pastMonthDay} />
        )
      } else {
        if (
          this.props.currentDateRange.year === today.getFullYear() &&
          this.props.currentDateRange.month === today.getMonth() &&
          this.monthDayCounter === today.getDate()
        ) {
          if (
            this.props.events[this.props.currentDateRange.month] !==
              undefined &&
            this.props.events[this.props.currentDateRange.month][
              this.monthDayCounter
            ] !== undefined
          ) {
            let scopedDayNumber = this.monthDayCounter
            days.push(
              <td
                onClick={(day, month, year) =>
                  this.handleEventClick(
                    this.props.currentDateRange.year,
                    this.props.currentDateRange.month,
                    scopedDayNumber
                  )}
                key={i + Math.random() + this.monthDayCounter}
                className={classes.currentDay}
              >
                <Typography
                  type="body1"
                  component="div"
                  className={classes.todayNumber}
                >
                  {this.monthDayCounter}
                </Typography>
                <div className={classes.event}>
                  <FiberManualRecord className={classes.eventIcon} />
                </div>
              </td>
            )
          } else {
            days.push(
              <td
                key={i + Math.random() + this.monthDayCounter}
                className={classes.currentDay}
              >
                <Typography
                  type="body1"
                  component="div"
                  className={classes.todayNumber}
                >
                  {this.monthDayCounter}
                </Typography>
              </td>
            )
          }
        } else {
          if (
            this.props.events[this.props.currentDateRange.month] !==
              undefined &&
            this.props.events[this.props.currentDateRange.month][
              this.monthDayCounter
            ] !== undefined
          ) {
            let scopedDayNumber = this.monthDayCounter
            days.push(
              <td
                onClick={(day, month, year) =>
                  this.handleEventClick(
                    this.props.currentDateRange.year,
                    this.props.currentDateRange.month,
                    scopedDayNumber
                  )}
                key={i + Math.random() + this.monthDayCounter}
                className={classes.monthDay}
              >
                <Typography
                  type="body1"
                  component="div"
                  className={classes.otherDayNumber}
                >
                  {this.monthDayCounter}
                </Typography>
                <div className={classes.event}>
                  <FiberManualRecord className={classes.eventIcon} />
                </div>
              </td>
            )
          } else {
            days.push(
              <td
                key={i + Math.random() + this.monthDayCounter}
                className={classes.monthDay}
              >
                <Typography
                  type="body1"
                  component="div"
                  className={classes.otherDayNumber}
                >
                  {this.monthDayCounter}
                </Typography>
              </td>
            )
          }
        }
        this.monthDayCounter++
      }
    }
    return days
  }

  render() {
    const classes = this.props.classes
    console.log(this.props.events[5][3])
    return (
      <Paper className={classes.root}>
        <div className={classes.monthDiv}>
          <table className={classes.table}>
            <thead className={classes.tableHead}>
              <tr style={{ height: "50px" }}>
                {this.weekDays()}
              </tr>
            </thead>
            <tbody className={classes.tableBody}>
              {this.getMonthRows()}
            </tbody>
          </table>
        </div>
      </Paper>
    )
  }
}

MobileMonthView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(stylesheet)(MobileMonthView)
