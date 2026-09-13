import {Pin} from '@vis.gl/react-google-maps';
import {MarkerDetails} from "@/app/types/types";
import {pinColors} from "@/app/components/pin-colors";
import {AdvancedMarkerWithRef} from "@/app/components/AdvancedMarkerWithRef";

export default function SchoolMarkers(
    props: {
        schools: MarkerDetails[],
        onMarkerClick: any,
    }
) {

    let markers = props.schools;

    return (
        <>
            {markers.map((marker, index) => (
                <SchoolMarker key={index} school={marker} onMarkerClick={props.onMarkerClick} />
            ))}
        </>
    )
}

function SchoolMarker(
    props: {
        school: MarkerDetails,
        onMarkerClick: any
    }
) {

    const school = props.school;
    const markerStyle = pinColors.school;

    return (
        <AdvancedMarkerWithRef
            onMarkerClick={(
                marker: google.maps.marker.AdvancedMarkerElement
            ) => props.onMarkerClick(school, marker)}
            position={school.geoLocation}
        >
            <Pin
                background={markerStyle.background}
                borderColor={markerStyle.border}
                glyphColor={markerStyle.glyph}
            />
        </AdvancedMarkerWithRef>
    );

}