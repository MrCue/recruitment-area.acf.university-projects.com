'use client';

import {APIProvider, InfoWindow, Map, Pin} from '@vis.gl/react-google-maps';
import {useCallback, useState,} from "react";
import {pinTypes} from "@/app/components/pin-types";
import detachments from "@/app/data/detachments.json";
import schools from "@/app/data/schools.json";
import {pinStates} from "@/app/components/pin-states";
import {Boundaries} from "@/app/components/Boundaries";
import DetachmentMarkers from "@/app/components/DetachmentMarkers";
import {MarkerDetails} from "@/app/types/types";
import SchoolMarkers from "@/app/components/SchoolMarkers";

export default function Home() {

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const [selectedMarkerDetails, setSelectedMarkerDetails] = useState<MarkerDetails | null>(null);
    const [catchmentRadius, setCatchmentRadius] = useState<number>(3);
    const [includeSchools, setIncludeSchools] = useState<boolean>(false);
    const [includeOpenDetachment, setIncludeOpenDetachment] = useState<boolean>(true);
    const [includeClosedDetachments, setIncludeClosedDetachments] = useState<boolean>(false);
    const [includePotentialDetachments, setIncludePotentialDetachments] = useState<boolean>(false);
    const [includeBoundaries, setIncludeBoundaries] = useState<boolean>(false);

    function handleDetachmentStateFilterChange(state: string, include: boolean) {
        switch (state) {
            case pinStates.closed:
                setIncludeClosedDetachments(include);
                break;
            case pinStates.open:
                setIncludeOpenDetachment(include);
                break;
            case pinStates.potential:
                setIncludePotentialDetachments(include);
                break;
        }
    }

    function getDetachmentStateFilterValue(state: string): boolean {
        let include = false;

        switch (state) {
            case pinStates.closed:
                include = includeClosedDetachments;
                break;
            case pinStates.open:
                include = includeOpenDetachment;
                break;
            case pinStates.potential:
                include = includePotentialDetachments;
                break;
        }

        return include;
    }

    const onMarkerClick = useCallback(
        (
            info: MarkerDetails | null,
            marker?: google.maps.marker.AdvancedMarkerElement
        ) => {
            let id= info?.name || null
            setSelectedId(id);

            if (marker) {
                setSelectedMarker(marker);
            }

            if (selectedId) {
                setSelectedMarkerDetails(info);
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

    const detachmentsList: MarkerDetails[] = detachments.map(detachment => {
        detachment.type = pinTypes.detachment;

        return detachment;
    });

    const schoolsList: MarkerDetails[] = schools.map(school => {
        school.status = pinStates.open;
        school.type = pinTypes.school;

        return school;
    });


    const filteredDetachments = detachmentsList.filter(detachment => {
        if (includeClosedDetachments && detachment.status === pinStates.closed) {
            return detachment;
        }

        if (includeOpenDetachment && detachment.status === pinStates.open) {
            return detachment;
        }

        if (includePotentialDetachments && detachment.status === pinStates.potential) {
            return detachment;
        }
        return false
    });

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-(family-name:--font-geist-sans)">
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


                <div id="detachment-state-filter-wrapper" className="grid gap-6 md:grid-cols-6 w-full">

                    <h3>Detachment status</h3>


                    {(Object.keys(pinStates) as Array<keyof typeof pinStates>).map((state, index) => (
                        <div
                            key={index}
                            className="flex items-center ps-4 bg-neutral-primary-soft border border-default rounded-base shadow-2xs">
                            <input id={state + "-detachments"} type="checkbox" value={state} name="bordered-checkbox"
                                   className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                                   checked={getDetachmentStateFilterValue(state)}
                                   onChange={(e) => handleDetachmentStateFilterChange(state, e.target.checked)}
                            />
                            <label htmlFor={state + "-detachments"}
                                   className="select-none w-full py-4 ms-2 text-sm font-medium text-heading">{state}</label>
                        </div>
                    ))}
                </div>

                <div id="schools-wrapper" className="grid gap-6 md:grid-cols-6 w-full">

                    <h3>Other filters</h3>

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

                    <div
                        className="flex items-center ps-4 bg-neutral-primary-soft border border-default rounded-base shadow-2xs">
                        <input id="show-boundaries" type="checkbox" value="boundaries" name="bordered-checkbox"
                               className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                               checked={includeBoundaries}
                               onChange={(e) => setIncludeBoundaries(e.target.checked)}
                        />
                        <label htmlFor="show-boundaries"
                               className="select-none w-full py-4 ms-2 text-sm font-medium text-heading">Boundaries</label>
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

                        <DetachmentMarkers detachments={filteredDetachments} catchmentRadius={catchmentRadius} onMarkerClick={onMarkerClick} />
                        <SchoolMarkers schools={includeSchools ? schoolsList : []} onMarkerClick={onMarkerClick} />

                        {infoWindowShown && selectedMarkerDetails && (
                            <InfoWindow
                                anchor={selectedMarker}
                                onCloseClick={() => setInfoWindowShown(false)}
                            >
                                <div>
                                    <h1>{selectedMarkerDetails.name}</h1>
                                </div>
                            </InfoWindow>
                        )}
                    </Map>

                    <Boundaries includeBoundaries={includeBoundaries} />
                </APIProvider>

            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}
