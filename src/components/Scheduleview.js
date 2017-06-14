import React, { Component } from "react"
import Typography from "material-ui/Typography"
import Paper from "material-ui/Paper"
import { getWeekArray } from "./../utils/DateHelper"
import { monthNames } from "./../utils/Strings"
import ScheduleEvent from "./ScheduleEvent"
import { withStyles, createStyleSheet } from "material-ui/styles"
import PropTypes from "prop-types"

const styleSheet = createStyleSheet("Scheduleview", theme => ({
  dayPaper: {
    display: "flex",
    padding: "15px",
    marginBottom: "5px"
  },

  date: {
    width: "100px"
  }
}))

class Scheduleview extends Component {
  generateWeek = () => {
    const classes = this.props.classes
    let currentDate = this.props.currentDateRange
    let week = getWeekArray(
      currentDate.month,
      currentDate.year,
      currentDate.week
    )
    let view = []
    for (let i = 0; i < week.length; i++) {
      view.push(
        <Paper elevation={0} className={classes.dayPaper}>
          <div className={classes.date}>
            <Typography type="display2">
              {week[i].day}
            </Typography>
            <Typography type="display1">
              {week[i].dayName}
            </Typography>
          </div>
          <div style={{ flex: "1" }}>
            {
              <ScheduleEvent
                day={week[i].day}
                month={week[i].month}
                events={this.props.events}
              />
            }
          </div>
        </Paper>
      )
    }
    return view
  }

  render() {
    return (
      <div>
        {this.generateWeek()}
      </div>
    )
  }
}

Scheduleview.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Scheduleview)