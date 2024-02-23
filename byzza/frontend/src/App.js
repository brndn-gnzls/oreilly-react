import React from 'react'
import './App.css';
import './components/EventRegistration/EventRegistration.jsx'
import EventRegistration from './components/EventRegistration/EventRegistration.jsx';
import axios from 'axios';

axios.defaults.withCredentials = true

function App() {
  return (
    <div>
      <EventRegistration/>
    </div>
  );
}
 
export default App;