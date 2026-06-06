'use client';

import {
    APIProvider,
    InfoWindow,
    Map,
    Pin,
} from '@vis.gl/react-google-maps';
import {
    useCallback,
    useState,
} from "react";
import {Circle} from "@/app/components/circle";
import {pinTypes} from "@/app/components/pin-types";
import {AdvancedMarkerWithRef} from "@/app/components/AdvancedMarkerWithRef";

import {detachments} from "@/app/markers/detachments";
import {schools} from "@/app/markers/schools";

export default function Home() {

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const [selectedMarkerDetails, setSelectedMarkerDetails] = useState<MarkerDetails|null>(null);
    const [catchmentRadius, setCatchmentRadius] = useState<number>(3);
    const [includeSchools, setIncludeSchools] = useState<boolean>(false);

    console.log(catchmentRadius);

    const onMarkerClick = useCallback(
        (id: string | null, marker?: google.maps.marker.AdvancedMarkerElement) => {
            setSelectedId(id);

            if (marker) {
                setSelectedMarker(marker);
            }

            if(selectedId)
            {
                setSelectedMarkerDetails(markers[parseInt(id)]);
            }

            if (id !== selectedId) {
                setInfoWindowShown(true);
            } else {
                setInfoWindowShown(isShown => !isShown);
            }
        },
        [selectedId]
    );

    const onMapClick = useCallback(() => {
        setSelectedId(null);
        setSelectedMarker(null);
        setInfoWindowShown(false);
    }, []);

    //Centre on Blackpool
    const mapCentre = {
        lat: 53.816759659667646,
        lng: -3.0363965259921217,
    }

    type Position = {
        lat: number,
        lng: number,
    }

    type MarkerDetails = {
        title: string,
        position: Position,
        type: pinTypes,
        color: {
            background: string,
            border: string,
            glyph: string,
        },
    }

    const circleDefinition = {
        strokeColor: "#040303",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#4bc103",
        fillOpacity: 0.15,
    }


    let markers = detachments;

    if(includeSchools)
    {
        markers = [
            ...detachments,
            ...schools,
        ];
    }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-(family-name:--font-geist-sans)">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"
              style={{width: "100vh", height: "100vh"}}>

            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Detachment
                catchment area</h1>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Radius in miles:
                <input
                    type="number"
                    step="0.1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name={String(catchmentRadius)} value={catchmentRadius}
                    onChange={e => setCatchmentRadius(Math.max(parseFloat(e.target.value), 0.5))}
                />
            </label>


            <div id="filter-wrapper" className="grid gap-6 md:grid-cols-2">

                <div
                    className="flex items-center ps-4 bg-neutral-primary-soft border border-default rounded-base shadow-2xs">
                    <input id="show-schools" type="checkbox" value="shools" name="bordered-checkbox"
                           className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                           checked={includeSchools}
                           onChange={(e) => setIncludeSchools(e.target.checked)}
                    />
                    <label htmlFor="show-schools"
                           className="select-none w-full py-4 ms-2 text-sm font-medium text-heading">Schools</label>
                </div>

            </div>

            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            >
                <Map
                    defaultCenter={mapCentre}
                    defaultZoom={10}
                    mapId="DEMO_MAP_ID"
                    onClick={onMapClick}
                >
                    {markers.map((marker, index) => (
                        <div key={index}>
                            <AdvancedMarkerWithRef
                                onMarkerClick={(
                                    marker: google.maps.marker.AdvancedMarkerElement
                                ) => onMarkerClick(String(index), marker)}
                                key={String(index)}
                                position={marker.position}
                            >
                                <Pin
                                    background={marker.color.background}
                                    borderColor={marker.color.border}
                                    glyphColor={marker.color.glyph}
                                />
                            </AdvancedMarkerWithRef>

                            {marker.type === pinTypes.detachment && (
                                <Circle
                                    radius={catchmentRadius * 1609.34}
                                    center={marker.position}
                                    strokeColor={circleDefinition.strokeColor}
                                    strokeOpacity={circleDefinition.strokeOpacity}
                                    fillColor={circleDefinition.fillColor}
                                    fillOpacity={circleDefinition.fillOpacity}
                                >

                                </Circle>
                            )}

                        </div>
                    ))}

                    {infoWindowShown && selectedMarkerDetails && (
                        <InfoWindow
                            anchor={selectedMarker}
                            onCloseClick={() => setInfoWindowShown(false)}
                        >
                            <div>
                                <h1>{selectedMarkerDetails.title}</h1>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>

        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

        </footer>
    </div>
  );
}
