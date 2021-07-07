import { FC } from 'react'

// import antipodes from 'antipodes'

import { Route } from 'react-router-dom'

import AddPlaces from './Routes/AddPlaces'

import Home from './Routes/Home'

const App: FC = (props: any) => {
  // console.log(antipodes({
  //   longitude: -73.951442,
  //   latitude: 40.698470
  // }));

  return (
    <>
      <Route exact path="/AddPlaces" component={AddPlaces} />
      <Route path="/" component={Home} />
    </>
  );
}

export default App;