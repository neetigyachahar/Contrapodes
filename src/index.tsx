import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import Theme from './hoc/Theme'
import MapsApiWapper from './hoc/MapsApiWrapper'

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <MapsApiWapper>
        <App />
      </MapsApiWapper>
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
);