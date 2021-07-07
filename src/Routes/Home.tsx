import { FC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined'
import AddPlacesBtn from '../components/AddPlacesBtn'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        homeButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);


const Home: FC = () => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.homeButton}
                        color="inherit"
                        aria-label="Contradopes"
                    >
                        <ExploreOutlinedIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="h4" className={classes.title}>
                        Contradopes
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Link to="/AddPlaces" >Click here</Link>
            <AddPlacesBtn />
        </>
    )

}

export default Home