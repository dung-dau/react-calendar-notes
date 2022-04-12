
import React from "react";
import { format, addMonths, subMonths, addDays, startOfMonth, isSameDay, parse, isSameMonth } from 'date-fns';
import { endOfMonth, endOfWeek, startOfWeek } from "date-fns/esm";

class Calendar extends React.Component {
  // contains the state for the current month and the current date
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  // Renders the top part of the calendar
  renderHeader() {
    const dateFormat = "MMMM yyyy";
    const formattedDate = format(this.state.currentMonth, dateFormat);
    console.log(formattedDate)
    return (
      <div className="header row flex-middle">
        {/* the left arrow */}
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        {/* the middle that displays the current month and year */}
        <div className="col col-center">
          <span>
            {format(this.state.currentMonth, dateFormat)}
          </span>
        </div>
        {/* the right arrow */}
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  // sets the clicked on date for styling
  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  // displays the days of the week
  renderDays() {
    const dateFormat = "E";
    const days = [];

    let startDate = startOfWeek(this.state.currentMonth)

    for(let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    }
    return <div className="days row">{days}</div>
  }

  // renders the days of the month
  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          // render different styling classes if the days are not in the current month or
          // if the date being rendered is the current date
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      // each element in rows has the 7 days of a particular week
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  // changes the month when the left arrow is clicked
  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    })
  };

  // changes the month when the right arrow is clicked
  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;