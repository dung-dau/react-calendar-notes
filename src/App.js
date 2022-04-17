import React from 'react';
import Calendar from "./components/Calendar";
import Note from './components/Note';
import { useState } from 'react';

import "./App.css";

function App() {
  const [state, setState] = useState({
    currentMonth: new Date(),
    currentDate: new Date(),
    contents: "",
  })
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
        <div>
          {/* Contains the calendar component itself */}
          <Calendar parentState={state} setState={setState}/>
        </div>
        <div>
          <Note parentState={state} setState={setState}/>
        </div>
      </main>
    </div>
  );
}

export default App;