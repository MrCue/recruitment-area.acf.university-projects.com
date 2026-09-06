import {useMap} from "@vis.gl/react-google-maps";
import {useEffect} from "react";

import boundaryMap_Blackpool from "@/app/data/boundary-maps/blackpool.json";
import boundaryMap_Fylde from "@/app/data/boundary-maps/fylde.json";
import boundaryMap_Lancaster from "@/app/data/boundary-maps/lancaster.json";
import boundaryMap_Wyre from "@/app/data/boundary-maps/wyre.json";

export const Boundaries = (props: {includeBoundaries: boolean}) => {
    const map = useMap();

    useEffect(() => {

        if (!map) return;

        //First we have to remove any that are already on the map
        map.data.forEach(function(feature) {
            map.data.remove(feature);
        });

        //If we aren't including boundaries, then we don't need to do anything
        if(!props.includeBoundaries) {
            return;
        }

        //Now we can add the new ones, otherwise it gets very dark
        map.data.addGeoJson(boundaryMap_Blackpool);
        map.data.addGeoJson(boundaryMap_Fylde);
        map.data.addGeoJson(boundaryMap_Lancaster);
        map.data.addGeoJson(boundaryMap_Wyre);

        map.data.setStyle((feature) => {
            return {
                fillColor: feature.getProperty("fill"),
                strokeColor: feature.getProperty("stroke"),
                strokeWeight: feature.getProperty("stroke-width"),
            }
        });

    }, [map, props]);

    return <></>;
};