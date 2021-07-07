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
    chip: {
        margin: spacing(0, 1)
    },
    chipContainer: {
        paddingBottom: spacing(1),
        overflow: 'auto'
    }
}));

const SelectedPlaces: FC<SelectedPlacesProps> = ({ places, newPlaceDelete }) => {
    const classes = useStyles()

    return (
        <Box display="flex" flexShrink={0} className={classes.chipContainer}>
            <Typography variant="caption" color="textSecondary">Selected Places</Typography>
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
    )

}

export default SelectedPlaces