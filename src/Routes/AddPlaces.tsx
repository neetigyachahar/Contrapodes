import { FC, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from '@material-ui/core';
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
import CloseIcon from '@material-ui/icons/Close';
import SearchAndSelectPlaces from "../components/SearchAndSelectPlaces"
import deepCopy from 'clone-deep'
import SelectedPlaces from '../components/SelectedPlaces'
import { RouteComponentProps } from 'react-router-dom'

export interface AddPlacesProps extends RouteComponentProps<any> {

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
}));

const AddPlaces: FC<AddPlacesProps> = ({ history }) => {
    const classes = useStyles()
    const [newPlaces, setNewPlaces] = useState<any[]>([]);
    const [newPlacesLoading, setNewPlacesLoading] = useState(false)

    const addNewPlaceHandler = (place: any) => {
        const alreadyAdded = newPlaces.filter(
            newPlace => newPlace.place_id === place.place_id)
        if (alreadyAdded.length) return;
        let updatedNewPlaces = deepCopy(newPlaces)
        updatedNewPlaces = [place].concat(updatedNewPlaces)
        setNewPlaces(updatedNewPlaces);
    }

    const newPlaceDeleteHandler = (place_id: string) => {
        let updatedNewPlaces = deepCopy(newPlaces)
        updatedNewPlaces = updatedNewPlaces.filter(
            newPlace => newPlace.place_id !== place_id)
        setNewPlaces(updatedNewPlaces);
    }

    const setNewPlacesLoadingHandler =
        (loading: boolean) => setNewPlacesLoading(loading)

    const handleClose = () => history.goBack()

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'md'}
            onClose={handleClose}
            aria-labelledby="aria-label-dialog-title"
            open={true}
        >
            <DialogTitle id="aria-label-dialog-title" disableTypography >
                <Typography variant="h6">Add places</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
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
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddPlaces