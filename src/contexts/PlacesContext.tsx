import { FC, useState, createContext } from 'react'

export interface PlacesContextProps {
    places: google.maps.places.PlaceResult[]
    updatePlaces: React.Dispatch<React.SetStateAction<google.maps.places.PlaceResult[]>>
}

export const PlacesContext = createContext({} as PlacesContextProps)

export const PlacesProvider: FC = ({ children }) => {
    const [places, updatePlaces] = useState<google.maps.places.PlaceResult[]>([])
    const value = { places, updatePlaces }

    return (
        <PlacesContext.Provider
            value={value}
        >
            {children}
        </PlacesContext.Provider>
    )
}