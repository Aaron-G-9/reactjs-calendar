import React, { Component } from "react"
import Weekview from "./components/Weekview"
import Scheduleview from "./components/Scheduleview"
import Titlebar from "./components/Titlebar"
import MonthView from "./components/MonthView"
import { getWeekOfMonth } from "./utils/DateHelper"
import Perf from "react-addons-perf"

class App extends Component {
  constructor() {
    super()
    window.Perf = Perf
    this.state = {
      meetings: null,
      termBounds: null,
      currentDateRange: null,
      calendarType: "weekview",
      theme: "oakland",
      url: null,
      width: document.getElementById("root").clientWidth,
      mobile: false
    }
 }

  updateWidth = () => {
    this.setState({ width: document.getElementById("root").clientWidth })
    if (this.state.width < 768) {
      this.setState({ mobile: true })
    } else {
      this.setState({ mobile: false })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth)
    fetch("http://localhost:8082/api/terms")
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ termBounds: [1494216000000, 1503720000000] })
      })

    fetch("http://localhost:8082/api/calendar")
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ events: data })
      })

    let d = new Date()
    let obj = {
      year: d.getFullYear(),
      month: d.getMonth(),
      week: getWeekOfMonth(d.getFullYear(), d.getMonth(), d.getDate()),
      day: d.getDate()
    }
    this.setState({ currentDateRange: obj })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth)
  }

  changeCalendarView = view => {
    this.setState({ calendarType: view })
  }

  changeDateRange = obj => {
    this.setState({
      currentDateRange: {
        year: obj.year,
        month: obj.month,
        week: obj.week,
        day: obj.day
      }
    })
  }

  chooseCalendarType = () => {
    switch (this.state.calendarType) {
      case "weekview":
        return (
          <Weekview
            meetings={this.state.events}
            currentDateRange={this.state.currentDateRange}
          />
        )
      case "monthview":
        return (
          <MonthView
            calendar={this.state.calendar}
            currentDateRange={this.state.currentDateRange}
            changeDateRange={this.changeDateRange}
          />
        )
      case "scheduleview":
        return (
          <Scheduleview
            events={this.state.events}
            currentDateRange={this.state.currentDateRange}
          />
        )
      default:
        return (
          <Weekview
            meetings={this.state.calendar}
            currentDateRange={this.state.currentDateRange}
          />
        )
    }
  }

  render() {
    if (this.state.events === null || this.state.events === undefined) {
      return <div>boom</div>
    }
    return (
      <div>
        <Titlebar
          currentDateRange={this.state.currentDateRange}
          termBounds={this.state.termBounds}
          calendar={this.state.calendar}
          calendarType={this.state.calendarType}
          changeCalendarView={this.changeCalendarView}
          changeDateRange={this.changeDateRange}
        />
        {this.chooseCalendarType()}
      </div>
    )
  }
}

export default App
