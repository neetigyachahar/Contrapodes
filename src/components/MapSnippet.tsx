import { FC, useEffect, useRef } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Map, Marker } from 'google-maps-react'
import {
    Box,
    Paper,
    Theme,
    ListItem,
    Avatar,
    ListItemText,
    ListItemAvatar
} from '@material-ui/core'

export interface MapSinppetProps {
    disableTitle?: boolean
    places: any[]
}

const useStyles = makeStyles(({ breakpoints }: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '50vw',
        height: '50vw',
        maxWidth: '400px',
        maxHeight: '400px',
        [breakpoints.down('sm')]: {
            width: '100vw',
            height: '100vw'
        }
    },
    mapBox: {
        position: 'relative',
        width: '100%',
        flex: 1
    }
}))

const MapSnippet: FC<MapSinppetProps> = ({ places, disableTitle = false }) => {
    const mapRef = useRef<any | null>(null)
    const classes = useStyles()
    useEffect(() => {
        if (mapRef && mapRef.current) {
            if (places.length !== 1) {
                let bounds = new google.maps.LatLngBounds();
                places.forEach(place => {
                    bounds.extend({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                    })
                })
                mapRef?.current?.map.setCenter(bounds.getCenter())
                mapRef?.current?.map.fitBounds(bounds)
            } else {
                mapRef?.current?.map.setCenter(places[0].geometry.location)
            }
        }
    }, [places])
    return (
        <Paper variant="outlined" className={classes.container}>
            <Box className={classes.mapBox}>
                <Map
                    ref={mapRef}
                    google={window.google}
                    containerStyle={{
                        top: 0, left: 0,
                        right: 0, bottom: 0
                    }}
                    zoom={8}
                    initialCenter={places[0]}
                >
                    {places.map((place, i) => {
                        return <Marker key={i} position={place.geometry.location} />;
                    })}
                </Map>
            </Box>
            {places.length === 1 && !disableTitle &&
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt={places[0].name} src={places[0].icon} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={places[0].name}
                        secondary={
                            <Box>
                                <Box>{places[0].formatted_address}</Box>
                                <Box>
                                    {places[0].geometry.location.lat().toFixed(6)},&nbsp;
                                    {places[0].geometry.location.lng().toFixed(6)}
                                </Box>
                            </Box>
                        }
                    />
                </ListItem>
            }
        </Paper>
    )
}

export default MapSnippet