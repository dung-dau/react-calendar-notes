import React from 'react';
import Calendar from "./components/Calendar";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          {/* contains the logo and reactcalendar text */}
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              react<b>calendar</b>
            </span>
          </div>
        </header>
        <main>
          <div className="calendar-container">
            {/* contains the calendar component itself */}
            <Calendar />
          </div>
        </main>
      </div>
    );
  }
}

export default App;