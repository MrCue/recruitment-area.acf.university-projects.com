import {pinTypes} from "@/app/components/pin-types";
import {pinStates} from "@/app/components/pin-states";

export type GeoLocation = {
    lat: number,
    lng: number,
}

export type LocalAuthority = {
    id: number,
    name: string,
}

export type MarkerDetails = {
    id: number,
    name: string,
    localAuthority: LocalAuthority,
    geoLocation: GeoLocation,
    status: pinStates,
    type: pinTypes,
}