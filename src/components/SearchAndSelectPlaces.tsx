import { makeStyles } from "@material-ui/core/styles"
import { FC, useState, useRef } from 'react'
import PlacesAutocomplete from "react-places-autocomplete"
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    TextField,
    LinearProgress,
    Chip,
    Tooltip,
    Typography,
    Theme
} from '@material-ui/core'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';

export interface SearchPlacesProps {
    newPlaces: any[]
    addNewPlace: (place: any) => void
    newPlaceDelete: (place_id: string) => void
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
    container: {
        height: '100%'
    },
    placesList: {
        overflow: 'auto'
    },
    chip: {
        margin: spacing(0, 1)
    },
    chipContainer: {
        paddingBottom: spacing(1),
        overflow: 'auto'
    }
}));

// Custom Autocomplete for places by Material-UI was also available tho!
const SearchPlaces: FC<SearchPlacesProps> = ({ newPlaces, addNewPlace, newPlaceDelete }) => {
    const classes = useStyles();
    const [location, setLocation] = useState('');
    const placesServiceRef = useRef(new window.google.maps.places.PlacesService(
        document.createElement("div")
    ));

    const handleChange = (location: string) => setLocation(location);

    const handleSelect = (location: string, placeId: string) => {
        console.log(location, placeId)
        setLocation(location)
        const request = {
            placeId,
            fields: ["place_id", "formatted_address", "name", "icon", "geometry"]
        };
        placesServiceRef.current.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                addNewPlace(place);
                console.log(place.geometry, place?.geometry?.location?.lat());
            }
        });
    };

    return (
        <PlacesAutocomplete
            value={location}
            onChange={handleChange}
            onSelect={handleSelect}
            debounce={300}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <Box display="flex" flexDirection="column" className={classes.container}>
                    <Box>
                        <TextField
                            {...getInputProps({
                                placeholder: "Search Places ...",
                                label: "Search places...",
                                variant: "outlined",
                                fullWidth: true
                            })}
                        />
                    </Box>
                    <Box flexGrow={1} className={classes.placesList}>
                        <List>
                            {loading && <LinearProgress />}
                            {!loading && suggestions.map(suggestion => {
                                return (
                                    <ListItem
                                        {...getSuggestionItemProps(suggestion)}
                                        button
                                        component="li"
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <RoomOutlinedIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={suggestion.formattedSuggestion.mainText}
                                            secondary={suggestion.formattedSuggestion.secondaryText}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="textSecondary">Selected Places</Typography>
                    </Box>
                    <Box display="flex" flexShrink={0} className={classes.chipContainer}>
                        {console.log(newPlaces)}
                        {newPlaces.map(newPlace => (
                            <Tooltip
                                title={newPlace.formatted_address}
                                aria-label={newPlace.formatted_address}
                                placement="top"
                            >
                                <Chip
                                    className={classes.chip}
                                    avatar={<Avatar alt={newPlace.name} src={newPlace.icon} />}
                                    label={
                                        <Typography color="textPrimary">
                                            {newPlace.name}
                                        </Typography>
                                    }
                                    onDelete={() => newPlaceDelete(newPlace.place_id)}
                                    variant="outlined"
                                />
                            </Tooltip>
                        ))}
                    </Box>
                </Box>
            )}
        </PlacesAutocomplete>
    );
}

export default SearchPlaces;