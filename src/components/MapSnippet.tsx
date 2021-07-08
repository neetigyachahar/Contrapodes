import { FC, useEffect, useRef } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Map, Marker } from 'google-maps-react'
import randomColor from 'randomcolor'
import { Antipode } from '../containers/PlacesAntipodesList'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
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
    places: google.maps.places.PlaceResult[]
    antipodes?: Antipode[]
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

const MapSnippet: FC<MapSinppetProps> = ({ places, antipodes, disableTitle = false }) => {
    const mapRef = useRef<any | null>(null)
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    useEffect(() => {
        if (mapRef && mapRef.current) {
            let bounds = new google.maps.LatLngBounds()
            let allPlaces = places
            if (antipodes)
                allPlaces = allPlaces.concat(antipodes.map(antipode => antipode.antipode))
            allPlaces.forEach(place => {
                bounds.extend({
                    lat: place.geometry?.location?.lat() ?? 0,
                    lng: place.geometry?.location?.lng() ?? 0
                })
            })
            mapRef?.current?.map.setCenter(bounds.getCenter())
            mapRef?.current?.map.fitBounds(bounds)
            if (allPlaces.length === 1) {
                const zoomChangeBoundsListener =
                    google.maps.event.addListenerOnce(mapRef?.current?.map, 'bounds_changed', () => {
                        mapRef?.current?.map.setZoom(8);
                    });
                setTimeout(function () { google.maps.event.removeListener(zoomChangeBoundsListener) }, 1000);
            }

            if (antipodes) {

                const lineSymbol = {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                };

                // Create the polyline and add the symbol via the 'icons' property.
                places.forEach(place => {
                    let antipode = antipodes.filter(antipode =>
                        antipode.org_place_id === place.place_id
                    )[0].antipode
                    new google.maps.Polyline({
                        path: [
                            {
                                lat: place.geometry?.location?.lat() ?? 0,
                                lng: place.geometry?.location?.lng() ?? 0
                            },
                            {
                                lat: antipode.geometry?.location?.lat() ?? 0,
                                lng: antipode.geometry?.location?.lng() ?? 0
                            }
                        ],
                        icons: [
                            {
                                icon: lineSymbol,
                                offset: "100%"
                            },
                        ],
                        strokeColor: randomColor(),
                        map: mapRef.current.map,
                    });
                })

            }
        }
    }, [places])
    return (
        <Paper
            variant="outlined"
            className={classes.container}
            style={{
                ...(antipodes ? {
                    ...(isMobile ?
                        {
                            width: '100vw',
                            height: '50vw',
                        } :
                        {
                            width: '80vw',
                            height: '26vw',
                        }
                    ),
                    maxWidth: '100%',
                    maxHeight: '100%'
                } : {})
            }}
        >
            <Box className={classes.mapBox}>
                <Map
                    ref={mapRef}
                    google={window.google}
                    containerStyle={{
                        top: 0, left: 0,
                        right: 0, bottom: 0
                    }}
                    zoom={8}
                >
                    {places.map((place, i) => {
                        return <Marker
                            key={i}
                            title={place.name ?? ''}
                            position={place.geometry?.location}

                        />
                    })}
                    {antipodes && antipodes.map((place, i) => {
                        return <Marker
                            key={place.org_place_id}
                            title={place.antipode.name ?? ''}
                            position={place.antipode.geometry?.location}
                            icon={{
                                path: google.maps.SymbolPath.CIRCLE,
                                strokeColor: "red",
                                scale: 3
                            }}
                        />
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
                                <Box>{places[0].formatted_address ?? ''}</Box>
                                <Box>
                                    {places[0].geometry?.location?.lat().toFixed(6)},&nbsp;
                                    {places[0].geometry?.location?.lng().toFixed(6)}
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