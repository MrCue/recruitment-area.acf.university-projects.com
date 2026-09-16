import {Pin} from '@vis.gl/react-google-maps';
import {OtherYouthOrganisationMarkerDetails} from "@/app/types/types";
import {pinColors} from "@/app/components/pin-colors";
import {AdvancedMarkerWithRef} from "@/app/components/AdvancedMarkerWithRef";

export default function OtherYouthOrganisationMarkers(
    props: {
        otherYouthOrganisations: OtherYouthOrganisationMarkerDetails[],
        onMarkerClick: (school: OtherYouthOrganisationMarkerDetails, marker: google.maps.marker.AdvancedMarkerElement) => void,
    }
) {

    const markers = props.otherYouthOrganisations;

    return (
        <>
            {markers.map((marker, index) => (
                <OtherYouthOrganisationMarker key={index} otherYouthOrganisation={marker} onMarkerClick={props.onMarkerClick} />
            ))}
        </>
    )
}

function OtherYouthOrganisationMarker(
    props: {
        otherYouthOrganisation: OtherYouthOrganisationMarkerDetails,
        onMarkerClick: (school: OtherYouthOrganisationMarkerDetails, marker: google.maps.marker.AdvancedMarkerElement) => void,
    }
) {

    const otherYouthOrganisation = props.otherYouthOrganisation;
    const markerStyle = pinColors.school;

    return (
        <AdvancedMarkerWithRef
            onMarkerClick={(
                marker: google.maps.marker.AdvancedMarkerElement
            ) => props.onMarkerClick(otherYouthOrganisation, marker)}
            position={otherYouthOrganisation.geoLocation}
        >
            <Pin
                background={markerStyle.background}
                borderColor={markerStyle.border}
                glyphColor={markerStyle.glyph}
            />
        </AdvancedMarkerWithRef>
    );

}