import { makeStyles } from "@material-ui/core/styles"
import { FC, useState, useRef } from 'react'
import PlacesAutocomplete, { Suggestion } from "react-places-autocomplete"
import Autocomplete from '@material-ui/lab/Autocomplete'
import {
    Box,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    TextField
} from '@material-ui/core'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'

type Writeable<T> = { -readonly [P in keyof T]: T[P] }
export interface SearchPlacesProps {
    newPlaces: google.maps.places.PlaceResult[]
    addNewPlace: (place: google.maps.places.PlaceResult) => void
    setNewPlacesLoading: (loading: boolean) => void
}

const useStyles = makeStyles(() => ({
    container: {
        // flex: 1
    }
}))

const SearchPlaces: FC<SearchPlacesProps> = ({ newPlaces, addNewPlace, setNewPlacesLoading }) => {
    const classes = useStyles()
    const [location, setLocation] = useState('')
    const placesServiceRef = useRef(new window.google.maps.places.PlacesService(
        document.createElement("div")
    ))

    const handleChange = (location: string) => setLocation(location)

    const handleSelect = (location: string, placeId: string) => {
        setLocation(location)
        setNewPlacesLoading(true)
        const request = {
            placeId,
            fields: ["place_id", "formatted_address", "name", "icon", "geometry"]
        }
        placesServiceRef.current.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                setNewPlacesLoading(false)
                addNewPlace(place)
            }
        })
    }

    return (
        <PlacesAutocomplete
            value={location}
            onChange={handleChange}
            onSelect={handleSelect}
            debounce={300}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <Box display="flex" flexDirection="column" className={classes.container}>
                    <Autocomplete
                        options={suggestions as Writeable<Suggestion[]>}
                        getOptionLabel={option => option.formattedSuggestion.mainText}
                        fullWidth
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                {...getInputProps({
                                    placeholder: "Search Places ...",
                                    label: "Search places...",
                                    variant: "outlined",
                                    fullWidth: true,
                                    autoFocus: true
                                })}
                            />)}
                        renderOption={(option) => (
                            <ListItem
                                {...getSuggestionItemProps(option)}
                                button
                                component="li"
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <RoomOutlinedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={option.formattedSuggestion.mainText}
                                    secondary={option.formattedSuggestion.secondaryText}
                                />
                            </ListItem>
                        )}
                    />
                </Box>
            )}
        </PlacesAutocomplete>
    )
}

export default SearchPlaces