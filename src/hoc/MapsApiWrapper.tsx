import { FC } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import { MAPS_API_KEY, MAPS_LIB_NAMES } from '../variables'
import { Box } from '@material-ui/core'

const LoadingContainer: FC = () => (
    <Box>Loading...</Box>
)

const MapsApiWrapper: FC = ({ children }) => <>{children}</>

export default GoogleApiWrapper({
    apiKey: MAPS_API_KEY,
    libraries: [...MAPS_LIB_NAMES],
    LoadingContainer
})(MapsApiWrapper);