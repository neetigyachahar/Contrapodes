import { FC, useState, useEffect, useRef, useCallback } from 'react'
import MapPair from '../components/MapPair'
import MapSnippet from '../components/MapSnippet'
import getAntipode from 'antipodes'

export interface PlacesAntipodesListProps {
    places: google.maps.places.PlaceResult[]
}

export interface Antipode {
    org_place_id: string
    antipode: google.maps.places.PlaceResult
}

interface latlng {
    latitude: number
    longitude: number
}

const PlacesAntipodesList: FC<PlacesAntipodesListProps> = ({
    places
}) => {
    const placesServiceRef = useRef(new window.google.maps.places.PlacesService(
        document.createElement("div")
    ))

    const [antipodes, setAntipodes] = useState<Antipode[]>([])

    useEffect(() => {
        createAntipodes()
    }, [])

    const getAntipodesDetails = (place_id: string, latlng: latlng) =>
        new Promise<void>((resolve, reject) => {
            let request = {
                location: new google.maps.LatLng(latlng.latitude, latlng.longitude),
                radius: 25000,
                type: 'locality'
            }
            placesServiceRef.current.nearbySearch(request, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                    setAntipodes(antipodes =>
                        antipodes.concat([{
                            org_place_id: place_id,
                            antipode: place[0]
                        }])
                    )
                    resolve()
                } else {
                    setAntipodes(antipodes =>
                        antipodes.concat([{
                            org_place_id: place_id,
                            antipode: {
                                ...(places.filter(place => place.place_id === place_id)[0]),
                                name: 'Unknown place',
                                icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png',
                                formatted_address: undefined,
                                geometry: {
                                    location: new google.maps.LatLng(latlng.latitude, latlng.longitude)
                                }
                            }
                        }])
                    )
                    resolve()
                }
            })
        })

    const createAntipodes = async () => {
        for (let place of places) {
            // This condition with state acts as cache as for aleady fetched item,
            // The getAntipodes operation is ignored.
            if (antipodes.filter(antipodes => antipodes.org_place_id === place.place_id).length)
                continue
            await getAntipodesDetails(place.place_id ?? '', getAntipode({
                latitude: place.geometry?.location?.lat() ?? 0,
                longitude: place.geometry?.location?.lng() ?? 0
            }))
        }
    }

    return (
        <>{places.length === antipodes.length && (
            <MapSnippet
                places={places}
                antipodes={antipodes}
            />
        )
        }
            {places.length === antipodes.length && (
                places.map(place => (
                    <MapPair
                        place={place}
                        antipode={antipodes.filter(antipode =>
                            antipode.org_place_id === place.place_id
                        )[0].antipode}
                    />
                ))
            )
            }
        </>
    )
}

export default PlacesAntipodesList