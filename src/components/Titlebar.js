import React, { Component } from "react"
import IconButton from "material-ui/IconButton"
import NavigateBefore from "material-ui-icons/NavigateBefore"
import NavigateNext from "material-ui-icons/NavigateNext"
import CloseIcon from "material-ui-icons/Close"
import MoreVert from "material-ui-icons/MoreVert"
import Menu, { MenuItem } from "material-ui/Menu"
import { withStyles, createStyleSheet } from "material-ui/styles"
import PropTypes from "prop-types"
import AppBar from "material-ui/AppBar"
import Snackbar from "material-ui/Snackbar"
import Toolbar from "material-ui/Toolbar"
import Typography from "material-ui/Typography"
import { shortMonthNames, monthNames } from "../utils/Strings"
import {
  getWeekDateRange,
  getWeekOfMonth,
  getWeeksOfMonth
} from "./../utils/DateHelper"

const styleSheet = createStyleSheet("SimpleAppBar", theme => ({
  root: {
    position: "relative",
    marginTop: 30,
    width: "100%"
  },
  appBar: {
    position: "relative"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  paginator: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  icons: {
    color: "white"
  },
  dateRange: {
    color: "inherit",
    width: 120
  }
}))

class Titlebar extends Component {
  state = {
    anchorEl: undefined,
    snackbar: false,
    snackbarMessage: "",
    open: false,
    selected: ""
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  openSnackbar = message => {
    this.setState({ snackbar: true, snackbarMessage: message })
    if (Object.is(document.getElementById("calendar-alert-snackbar"), null)) {
      setTimeout(() => {
        document.getElementById("calendar-alert-snackbar").focus()
      }, 50)
    } else {
      document.getElementById("calendar-alert-snackbar").focus()
    }
  }

  closeSnackbar = () => {
    this.setState({ snackbar: false })
  }

  paginateForward = () => {
    if (
      Object.is(this.props.termBounds, null) ||
      Object.is(this.props.termBounds, undefined)
    ) {
      return
    }
    let termEnd = new Date(this.props.termBounds[1])

    const endMonth = termEnd.getMonth()
    const endYear = termEnd.getFullYear()
    const endDay = termEnd.getDate()
    const endWeek = getWeekOfMonth(endYear, endMonth, endDay)
    let dateObj = this.props.currentDateRange

    switch (this.props.calendarType) {
      case "monthview":
        if (dateObj.month === endMonth) {
          this.openSnackbar("End of term reached")
          return
        }
        if (dateObj.month === 11) {
          dateObj.year++
          dateObj.month = 0
          this.props.changeDateRange(dateObj)
        } else {
          dateObj.month++
          this.props.changeDateRange(dateObj)
        }

        break

      case "weekview":
      case "scheduleview":
      default:
        if (dateObj.month === endMonth && dateObj.week === endWeek) {
          this.openSnackbar("End of term reached")
        } else {
          let dayOfMonth = new Date(dateObj.year, dateObj.month, dateObj.day)
          if (getWeeksOfMonth(dayOfMonth) === dateObj.week) {
            dateObj.month++
            dateObj.week = 1
            this.props.changeDateRange(dateObj)
          } else {
            dateObj.week++
            this.props.changeDateRange(dateObj)
          }

          break
        }
        break
    }
  }

  paginateBackward = () => {
    if (
      Object.is(this.props.termBounds, null) ||
      Object.is(this.props.termBounds, undefined)
    ) {
      return
    }
    let termStart = new Date(this.props.termBounds[0])

    const startMonth = termStart.getMonth()
    const startYear = termStart.getFullYear()
    const startDay = termStart.getDate()
    const startWeek = getWeekOfMonth(startYear, startMonth, startDay)
    let dateObj = this.props.currentDateRange

    switch (this.props.calendarType) {
      case "monthview":
        if (dateObj.month === startMonth) {
          this.openSnackbar("Start of term reached")
          return
        }
        if (dateObj.year === 0) {
          dateObj.year--
          dateObj.month = 11
          this.props.changeDateRange(dateObj)
        } else {
          dateObj.month--
          this.props.changeDateRange(dateObj)
        }

        break

      case "weekview":
      case "scheduleview":
      default:
        if (dateObj.month === startMonth && dateObj.week === startWeek) {
          this.openSnackbar("Start of term reached")
        } else {
          let dayOfMonth = new Date(dateObj.year, dateObj.month, dateObj.day)
          if (dateObj.week === 1) {
            dateObj.month--
            dayOfMonth = new Date(dateObj.year, dateObj.month, 1)
            dateObj.week = getWeeksOfMonth(dayOfMonth)
            this.props.changeDateRange(dateObj)
          } else {
            dateObj.week--
            this.props.changeDateRange(dateObj)
          }

          break
        }
        break
    }
  }

  getDateRange = () => {
    const classes = this.props.classes
    const dateObj = this.props.currentDateRange
    const weekDateRange = getWeekDateRange(
      dateObj.month,
      dateObj.year,
      dateObj.week
    )
    const longMonth = monthNames[dateObj.month]

    let text
    let ariaLabel

    if (
      this.props.calendarType === "weekview" ||
      this.props.calendarType === "scheduleview"
    ) {
      if (weekDateRange[1] === "") {
        text = `${shortMonthNames[dateObj.month]} ${weekDateRange[0]}`
        ariaLabel = `${longMonth} ${weekDateRange[0]}`
      } else {
        text = `${shortMonthNames[dateObj.month]} ${weekDateRange[0]} - ${weekDateRange[1]}`
        ariaLabel = `${longMonth} ${weekDateRange[0]} to ${longMonth} ${weekDateRange[1]}`
      }
    } else if (this.props.calendarType === "monthview") {
      text = shortMonthNames[dateObj.month]
      ariaLabel = longMonth
    }

    return (
      <Typography
        type="title"
        className={classes.dateRange}
        aria-label={ariaLabel}
        tabIndex="0"
      >
        {text}
      </Typography>
    )
  }

  handleMenuItemClick = index => {
    this.props.changeCalendarView(index)
    this.setState({ open: false })
  }

  render() {
    // if (Object.is(document.getElementById("calendar-alert-snackbar"), null)){
    // }else{
    //   document.getElementById("calendar-alert-snackbar").focus();
    // }

    const classes = this.props.classes
    return (
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.paginator}>
            <IconButton
              aria-label="Paginate Backward"
              onClick={this.paginateBackward}
            >
              <NavigateBefore className={classes.icons} />
            </IconButton>
            {this.getDateRange()}
            <IconButton
              aria-label="Paginate Forward"
              onClick={this.paginateForward}
            >
              <NavigateNext className={classes.icons} />
            </IconButton>
          </div>
          <IconButton
            aria-label="More options and views"
            onClick={this.handleClick}
          >
            <MoreVert style={{ color: "white" }} />
          </IconButton>

          <Menu
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
          >
            <MenuItem onClick={() => this.handleMenuItemClick("monthview")}>
              Month View
            </MenuItem>
            <MenuItem onClick={() => this.handleMenuItemClick("weekview")}>
              Week View
            </MenuItem>
            <MenuItem onClick={() => this.handleMenuItemClick("dayview")}>
              Day View
            </MenuItem>
            <MenuItem onClick={() => this.handleMenuItemClick("scheduleview")}>
              Schedule View
            </MenuItem>
            <MenuItem onClick={this.handleRequestClose}>Download ICal</MenuItem>
          </Menu>
        </Toolbar>
        <Snackbar
          id="calendar-alert-snackbar"
          tabIndex="0"
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.snackbar}
          autoHideDuration={6e3}
          onRequestClose={this.closeSnackbar}
          contentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
          action={
            <IconButton
              tabIndex="0"
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.closeSnackbar}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </AppBar>
    )
  }
}

Titlebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Titlebar)
