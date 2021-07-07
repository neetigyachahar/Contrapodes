import { FC, useState } from 'react'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from "@material-ui/core/styles"
import Ellipsis from '../hoc/Ellipsis'
import {
    Box,
    Tooltip,
    Chip,
    Avatar,
    Typography,
    Theme,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    LinearProgress,
    Divider
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MapSnippet from '../components/MapSnippet'

export interface SelectedPlacesProps {
    places: any[]
    newPlaceDelete: (place_id: string) => void
    newPlacesLoading: boolean,
    preSelectedPlaces: any[],
    removePreSelectedPlace: (place_id: string) => void
}

const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
    container: {
        flex: 1,
        paddingTop: spacing(1),
        height: '100%',
        overflow: 'auto'
    },
    chipContainer: {
        flex: 1,
        margin: 0,
        padding: 0,
        paddingTop: spacing(1),
        overflow: 'auto'
    },
    chip: {
        margin: spacing(1)
    },
    closeBtn: {
        position: 'absolute',
        right: spacing(1),
        top: spacing(1),
        color: palette.grey[500]
    },
    mapDialogContent: {
        height: '46vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const SelectedPlaces: FC<SelectedPlacesProps> = ({
    places,
    newPlaceDelete,
    newPlacesLoading,
    preSelectedPlaces,
    removePreSelectedPlace
}) => {
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const [openMapDialog, setOpenMapDialog] = useState(false)
    const [mapDisplayPlace, setMapDisplayPlace] = useState<any[]>([])

    const openMapHandler = (placeId: string) => {
        setOpenMapDialog(true)
        setMapDisplayPlace(places.filter(place => place.place_id === placeId))
    }

    const closeMapDisplayHandler = () => {
        setOpenMapDialog(false)
        setMapDisplayPlace([])
    }

    return (
        <Box className={classes.container}>
            <Typography variant="caption" color="textSecondary">Selected new places</Typography>
            {newPlacesLoading && <LinearProgress />}
            <Box
                component="ul"
                display="flex"
                flexWrap="wrap"
                className={classes.chipContainer}
            >
                {places.map(place => (
                    <Tooltip
                        key={place.place_id}
                        title={place.formatted_address}
                        aria-label={place.formatted_address}
                        placement="top"
                    >
                        <Chip
                            className={classes.chip}
                            component="li"
                            avatar={<Avatar alt={place.name} src={place.icon} />}
                            label={<Typography color="textPrimary">
                                <Ellipsis mobileViewOnly >
                                    {place.name}
                                </Ellipsis>
                            </Typography>}
                            onClick={() => openMapHandler(place.place_id)}
                            onDelete={() => newPlaceDelete(place.place_id)}
                            variant="outlined"
                        />
                    </Tooltip>
                ))}
            </Box>
            <Divider />
            <Typography variant="caption" color="textSecondary">Selected places</Typography>
            <Box
                component="ul"
                display="flex"
                flexWrap="wrap"
                className={classes.chipContainer}
            >
                {preSelectedPlaces.map(place => (
                    <Tooltip
                        key={place.place_id}
                        title={place.formatted_address}
                        aria-label={place.formatted_address}
                        placement="top"
                    >
                        <Chip
                            className={classes.chip}
                            component="li"
                            avatar={<Avatar alt={place.name} src={place.icon} />}
                            label={<Typography color="textPrimary">
                                <Ellipsis mobileViewOnly >
                                    {place.name}
                                </Ellipsis>
                            </Typography>}
                            onClick={() => openMapHandler(place.place_id)}
                            onDelete={() => removePreSelectedPlace(place.place_id)}
                            variant="outlined"
                        />
                    </Tooltip>
                ))}
            </Box>
            <Dialog
                onClose={() => { }}
                aria-labelledby="aria-label-dialog-title"
                open={openMapDialog}
                {...(isMobile ? {
                    fullWidth: true
                } : {})}
            >
                <DialogTitle id="aria-label-dialog-title" disableTypography>
                    <Typography variant="h6">
                        <Ellipsis mobileViewOnly >
                            {mapDisplayPlace[0] &&
                                mapDisplayPlace[0].name}
                        </Ellipsis>
                    </Typography>
                    <IconButton aria-label="close" className={classes.closeBtn} onClick={closeMapDisplayHandler}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={classes.mapDialogContent}>
                    <MapSnippet places={mapDisplayPlace} />
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default SelectedPlaces