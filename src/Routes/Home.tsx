import { FC, useContext } from 'react'
import { PlacesContext } from '../contexts/PlacesContext';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton
} from '@material-ui/core'
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined'
import AddPlacesBtn from '../components/AddPlacesBtn'
import MapPair from 'src/components/MapPair';

const useStyles = makeStyles(({ spacing, breakpoints }: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        homeButton: {
            marginRight: spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        mapsList: {
            width: '70%',
            [breakpoints.down('sm')]: {
                width: '100%'
            }
        },
        mapsListCont: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }),
);


const Home: FC = () => {
    const classes = useStyles();
    const places = useContext(PlacesContext)
    console.log(places.places)
    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.homeButton}
                        color="inherit"
                        aria-label="Contrapodes"
                    >
                        <ExploreOutlinedIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="h4" className={classes.title}>
                        Contrapodes
                    </Typography>
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
            <Box m={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h4">
                    Find antipodes of places in just few clicks!
                </Typography>
            </Box>
            <AddPlacesBtn />
            {/* <MapSnippet places={places.places} /> */}
            <Box className={classes.mapsListCont}>
                <Box className={classes.mapsList}>
                    {places.places.length >= 2 &&
                        <MapPair
                            place={places.places[0]}
                            antipode={places.places[1]}
                        />
                    }
                    {places.places.length >= 2 &&
                        <MapPair
                            place={places.places[0]}
                            antipode={places.places[1]}
                        />
                    }
                    {places.places.length >= 2 &&
                        <MapPair
                            place={places.places[0]}
                            antipode={places.places[1]}
                        />
                    }
                    {places.places.length >= 2 &&
                        <MapPair
                            place={places.places[0]}
                            antipode={places.places[1]}
                        />
                    }
                    {places.places.length >= 2 &&
                        <MapPair
                            place={places.places[0]}
                            antipode={places.places[1]}
                        />
                    }
                    {places.places.length >= 2 &&
                        <MapPair
                            place={places.places[0]}
                            antipode={places.places[1]}
                        />
                    }
                    {places.places.length >= 2 &&
                        <MapPair
                            place={places.places[0]}
                            antipode={places.places[1]}
                        />
                    }
                    {places.places.length >= 2 &&
                        <MapPair
                            place={places.places[0]}
                            antipode={places.places[1]}
                        />
                    }
                    {places.places.length >= 2 &&
                        <MapPair
                            place={places.places[0]}
                            antipode={places.places[1]}
                        />
                    }
                </Box>
            </Box>
        </>
    )

}

export default Home