import { FC, useEffect, useRef } from 'react'
import { Map, Marker } from 'google-maps-react'

export interface MapSinppetProps {
    places: any[]
}

const MapSnippet: FC<MapSinppetProps> = ({ places }) => {
    const mapRef = useRef<any | null>(null);

    useEffect(() => {
        if (mapRef && mapRef.current)
            mapRef?.current?.map.setCenter(places[0].geometry.location)
    }, [])

    return (
        <Map
            ref={mapRef}
            google={window.google}
            // className={"map"}
            zoom={4}
            initialCenter={places[0]}
        >
            {places.map((place, i) => {
                return <Marker key={i} position={place.geometry.location} />;
            })}
        </Map>
    )
}

export default MapSnippet