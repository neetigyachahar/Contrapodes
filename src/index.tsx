import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import Theme from './hoc/Theme'
import MapsApiWapper from './hoc/MapsApiWrapper'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Theme>
        <MapsApiWapper>
          <App />
        </MapsApiWapper>
      </Theme>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);