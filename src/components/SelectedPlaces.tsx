import { FC } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import {
    Box,
    Tooltip,
    Chip,
    Avatar,
    Typography,
    Theme
} from '@material-ui/core'
import MapSnippet from '../components/MapSnippet'

export interface SelectedPlacesProps {
    places: any[]
    newPlaceDelete: (place_id: string) => void
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
    container: {
        flex: 1,
        paddingTop: spacing(1),
        // overflow: 'hidden'

    },
    chipContainer: {
        paddingTop: spacing(1),
        overflow: 'auto'
    },
    chip: {
        margin: spacing(1)
    }
}));

const SelectedPlaces: FC<SelectedPlacesProps> = ({ places, newPlaceDelete }) => {
    const classes = useStyles()

    return (
        <Box className={classes.container}>
            <Typography variant="caption" color="textSecondary">Selected Places</Typography>
            <Box display="flex" flexWrap="wrap" className={classes.chipContainer}>
                {console.log(places)}
                {places.map(place => (
                    <Tooltip
                        title={place.formatted_address}
                        aria-label={place.formatted_address}
                        placement="top"
                    >
                        <Chip
                            className={classes.chip}
                            avatar={<Avatar alt={place.name} src={place.icon} />}
                            label={
                                <Typography color="textPrimary">
                                    {place.name}
                                </Typography>
                            }
                            onDelete={() => newPlaceDelete(place.place_id)}
                            variant="outlined"
                        />
                    </Tooltip>
                ))}
            </Box>
        </Box>
    )

}

export default SelectedPlaces