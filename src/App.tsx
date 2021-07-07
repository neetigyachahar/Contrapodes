import { useState } from 'react'
import axios from 'axios'

import antipodes from 'antipodes'

import AddPlaces from './Routes/AddPlaces'

import Home from './Routes/Home'

const App = (props: any) => {
  console.log(props)


  console.log(antipodes({
    longitude: -73.951442,
    latitude: 40.698470
  }));


  return (
    <div className="App" >
      <AddPlaces />
      {/* <Home /> */}
    </div >
  );
}

export default App;