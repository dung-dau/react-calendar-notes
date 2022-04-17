
import React from "react";
import { format, addMonths, subMonths, addDays, startOfMonth, isSameDay, isSameMonth } from 'date-fns';
import { endOfMonth, endOfWeek, startOfWeek } from "date-fns/esm";
import { useState } from "react";

function Calendar({parentState, setState}) {
  // contains the state for the current month and the current date
  // const [state, setState] = useState(parentState);

  // Renders the top part of the calendar
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        {/* the left arrow */}
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        {/* the middle that displays the current month and year */}
        <div className="col col-center">
          <span>
            {format(parentState.currentMonth, dateFormat)}
          </span>
        </div>
        {/* the right arrow */}
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  // sets the clicked on date for styling
  const onDateClick = day => {
    setState({
      ...parentState,
      currentDate: day,
    });
  };

  // displays the days of the week
  const renderDays = () => {
    const dateFormat = "E";
    const days = [];

    let startDate = startOfWeek(parentState.currentMonth)

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
  const renderCells = () => {
    const { currentMonth, currentDate } = parentState;
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
                : isSameDay(day, currentDate) ? "selected" : ""
              
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
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
  const prevMonth = () => {
    setState({
      ...parentState,
      currentMonth: subMonths(parentState.currentMonth, 1)
    })
  };

  // changes the month when the right arrow is clicked
  const nextMonth = () => {
    setState({
      ...parentState,
      currentMonth: addMonths(parentState.currentMonth, 1)
    });
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}

export default Calendar;