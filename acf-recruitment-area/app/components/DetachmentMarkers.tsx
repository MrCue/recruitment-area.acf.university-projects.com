import {Pin} from '@vis.gl/react-google-maps';
import {AdvancedMarkerWithRef} from "@/app/components/AdvancedMarkerWithRef";
import {Circle} from "@/app/components/circle";
import {MarkerDetails} from "@/app/types/types";
import {pinColors} from "@/app/components/pin-colors";
import {pinStates} from "@/app/components/pin-states";

export default function DetachmentMarkers(
    props: {
        detachments: MarkerDetails[],
        catchmentRadius: number,
        onMarkerClick: any,
    }
) {

    let markers = props.detachments;

    return (
        <>
            {markers.map((marker, index) =>
                <DetachmentMarker key={index} detachment={marker} catchmentRadius={props.catchmentRadius} onMarkerClick={props.onMarkerClick} />
            )}
        </>
    );
};

function DetachmentMarker(
    props: {
        detachment: MarkerDetails,
        catchmentRadius: number,
        onMarkerClick: any
    }
) {
    const detachment = props.detachment;

    const circleDefinition = {
        strokeColor: "#040303",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#4bc103",
        fillOpacity: 0.15,
    }

    const markerStyleFromTypeAndStatus = (type: string, status: string): {
        background?: string;
        border?: string;
        glyph?: string;
    } => {

        switch (status) {
            case pinStates.open:
                return pinColors.openDetachment;
            case pinStates.potential:
                return pinColors.potentialDetachment;
            case pinStates.closed:
                return pinColors.closedDetachment;
        }
        return {};
    }

    const markerStyle = markerStyleFromTypeAndStatus(detachment.type, detachment.status);

    return (

        <>
            <AdvancedMarkerWithRef
                onMarkerClick={(
                    marker: google.maps.marker.AdvancedMarkerElement
                ) => props.onMarkerClick(detachment, marker)}
                position={detachment.geoLocation}
            >
                <Pin
                    background={markerStyle.background}
                    borderColor={markerStyle.border}
                    glyphColor={markerStyle.glyph}
                />
            </AdvancedMarkerWithRef>

            <Circle
                radius={props.catchmentRadius * 1609.34}
                center={detachment.geoLocation}
                strokeColor={circleDefinition.strokeColor}
                strokeOpacity={circleDefinition.strokeOpacity}
                fillColor={circleDefinition.fillColor}
                fillOpacity={circleDefinition.fillOpacity}
            >

            </Circle>
        </>

    );
}