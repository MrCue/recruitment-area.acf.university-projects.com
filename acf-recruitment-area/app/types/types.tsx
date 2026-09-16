import {pinStates} from "@/app/components/pin-states";

export type GeoLocation = {
    lat: number,
    lng: number,
}

export type LocalAuthority = {
    id: number,
    name: string,
}

export type DetachmentMarkerDetails = InfoDetails & {
    id: number,
    name: string,
    localAuthority: LocalAuthority,
    geoLocation: GeoLocation,
    status: pinStates,
}

export type OtherYouthOrganisationMarkerDetails = InfoDetails & {
    id: number,
    name: string,
    organisation: string,
    geoLocation: GeoLocation,
}

export type SchoolMarkerDetails = InfoDetails & {
    id: number,
    name: string,
    localAuthority: LocalAuthority,
    geoLocation: GeoLocation,
}

export interface InfoDetails {
    name: string,
}