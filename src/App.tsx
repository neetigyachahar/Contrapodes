import { FC } from 'react'

import { Route } from 'react-router-dom'

import AddPlaces from './Routes/AddPlaces'

import Home from './Routes/Home'

const App: FC = () => (
  <>
    <Route exact path="/AddPlaces" component={AddPlaces} />
    <Route path="/" component={Home} />
  </>
)

export default App