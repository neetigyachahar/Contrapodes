import { FC, useState, createContext } from 'react'

export interface PlacesContextProps {
    places: any[]
    updatePlaces: React.Dispatch<React.SetStateAction<any[]>>
}

export const PlacesContext = createContext({} as PlacesContextProps)

export const PlacesProvider: FC = ({ children }) => {
    const [places, updatePlaces] = useState<any[]>([])
    const value = { places, updatePlaces }

    return (
        <PlacesContext.Provider
            value={value}
        >
            {children}
        </PlacesContext.Provider>
    )
}