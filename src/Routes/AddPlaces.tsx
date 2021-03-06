import { FC, useState, useContext } from 'react'
import { PlacesContext } from '../contexts/PlacesContext'
import { makeStyles } from "@material-ui/core/styles"
import { Theme } from '@material-ui/core'
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import SearchAndSelectPlaces from "../components/SearchAndSelectPlaces"
import deepCopy from 'clone-deep'
import SelectedPlaces from '../components/SelectedPlaces'
import { RouteComponentProps } from 'react-router-dom'

export interface AddPlacesProps extends RouteComponentProps {

}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2, 2, 0, 2),
        height: '60vh',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}))

const AddPlaces: FC<AddPlacesProps> = ({ history }) => {
    const classes = useStyles()
    const places = useContext(PlacesContext)
    const [newPlaces, setNewPlaces] = useState<google.maps.places.PlaceResult[]>([])
    const [newPlacesLoading, setNewPlacesLoading] = useState(false)

    const addNewPlaceHandler = (place: google.maps.places.PlaceResult) => {
        const alreadyAdded = newPlaces.filter(
            newPlace => newPlace.place_id === place.place_id)
        if (alreadyAdded.length) return
        let updatedNewPlaces = deepCopy(newPlaces)
        updatedNewPlaces = [place].concat(updatedNewPlaces)
        setNewPlaces(updatedNewPlaces)
    }

    const newPlaceDeleteHandler = (place_id: string) => {
        let updatedNewPlaces = deepCopy(newPlaces)
        updatedNewPlaces = updatedNewPlaces.filter(
            newPlace => newPlace.place_id !== place_id)
        setNewPlaces(updatedNewPlaces)
    }

    const setNewPlacesLoadingHandler =
        (loading: boolean) => setNewPlacesLoading(loading)

    const closeHandler = () => history.goBack()

    const addNewPlacesHandler = () => {
        places.updatePlaces(newPlaces.concat(places.places))
        history.goBack()
    }

    const removePreSelectedPlaceHandler = (place_id: string) => {
        places.updatePlaces(
            places.places.filter(place => place.place_id !== place_id))
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'md'}
            onClose={closeHandler}
            aria-labelledby="aria-label-dialog-title"
            open={true}
        >
            <DialogTitle id="aria-label-dialog-title" disableTypography >
                <Typography variant="h6">Add places</Typography>
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={closeHandler}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.root} dividers>
                <Box display="flex" flexDirection="column" style={{ height: '100%' }}>
                    <SearchAndSelectPlaces
                        newPlaces={newPlaces}
                        setNewPlacesLoading={setNewPlacesLoadingHandler}
                        addNewPlace={addNewPlaceHandler}
                    />
                    <SelectedPlaces
                        places={newPlaces}
                        newPlacesLoading={newPlacesLoading}
                        newPlaceDelete={newPlaceDeleteHandler}
                        preSelectedPlaces={places.places}
                        removePreSelectedPlace={removePreSelectedPlaceHandler}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={addNewPlacesHandler} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddPlaces