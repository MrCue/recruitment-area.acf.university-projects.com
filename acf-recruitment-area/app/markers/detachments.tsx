import {pinTypes} from "@/app/components/pin-types";
import {pinColors} from "@/app/components/pin-colors";
import {pinStates} from "@/app/components/pin-states";
export const detachments = [

    //North
    {
        title: "Carnforth",
        position: {
            lat: 54.127364055812244,
            lng: -2.7688421636312484,
        },
        type: pinTypes.detachment,
        color: pinColors.closedDetachment,
        state: pinStates.closed,
    },
    {
        title: "Lancaster",
        position: {
            lat: 54.057120315512556,
            lng: -2.7923832583261134,
        },
        type: pinTypes.detachment,
        color: pinColors.openDetachment,
        state: pinStates.open,
    },
    {
        title: "Morecambe",
        position: {
            lat: 54.06938355048906,
            lng: -2.8553074156602967,
        },
        type: pinTypes.detachment,
        color: pinColors.openDetachment,
        state: pinStates.open,
    },

    //South
    {
        title: "Blackpool",
        position: {
            lat: 53.7979865456234,
            lng: -3.047038566489743,
        },
        type: pinTypes.detachment,
        color: pinColors.openDetachment,
        state: pinStates.open,
    },
    {
        title: "Bispham",
        position: {
            lat: 53.84968760905054,
            lng: -3.0400631453601523,
        },
        type: pinTypes.detachment,
        color: pinColors.potentialDetachment,
        state: pinStates.potential,
    },
    {
        title: "Chindit",
        position: {
            lat: 53.82887542136183,
            lng: -3.0174906294164723,
        },
        type: pinTypes.detachment,
        color: pinColors.openDetachment,
        state: pinStates.open,
    },
    {
        title: "Fleetwood",
        position: {
            lat: 53.921290783266166,
            lng: -3.011911566599637,
        },
        type: pinTypes.detachment,
        color: pinColors.openDetachment,
        state: pinStates.open,
    },
    {
        title: "Kirkham",
        position: {
            lat: 53.781469460991396,
            lng: -2.8889502169844605
        },
        type: pinTypes.detachment,
        color: pinColors.potentialDetachment,
        state: pinStates.potential,
    },
    {
        title: "Kirkham & Weeton",
        position: {
            lat: 53.81876851344139,
            lng: -2.933610695212161,
        },
        type: pinTypes.detachment,
        color: pinColors.openDetachment,
        state: pinStates.open,
    },
    {
        title: "Lytham St. Annes",
        position: {
            lat: 53.74086283610583,
            lng: -3.0078317833507913,
        },
        type: pinTypes.detachment,
        color: pinColors.closedDetachment,
        state: pinStates.closed,
    },
    {
        title: "Poulton",
        position: {
            lat: 53.84731118272192,
            lng: -2.99105424875504,
        },
        type: pinTypes.detachment,
        color: pinColors.potentialDetachment,
        state: pinStates.potential,
    },
    {
        title: "Thornton",
        position: {
            lat: 53.88510482325372,
            lng: -3.005454971413963,
        },
        type: pinTypes.detachment,
        color: pinColors.openDetachment,
        state: pinStates.open,
    },
    {
        title: "Warton",
        position: {
            lat: 53.75252949809238,
            lng: -2.886864496805578,
        },
        type: pinTypes.detachment,
        color: pinColors.potentialDetachment,
        state: pinStates.potential,
    },
]