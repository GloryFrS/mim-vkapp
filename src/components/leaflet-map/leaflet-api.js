import L from 'leaflet';
import './leaflet-map.css';


  
const tileLayerDefault = [
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }),
];



const fetchedUserMarker = (fetchedUser) => {
    return L.marker(
        fetchedUser.coordinates,
        { icon:
                L.divIcon({
                    className: 'fetchedUserMarker',
                    iconSize: [25, 36],
                    iconUrl:   './markers/default.svg',
                })
        });
};

const fetchedUserCircle = (fetchedUser, radius) => {

    if (fetchedUser.hasOwnProperty('coordinates')) {
        return L.circle(fetchedUser.coordinates, {
            color: 'background: rgba(245, 144, 142, 0.1)',
            fillColor: 'red',
            fillOpacity: 0.05,
            radius: radius
        })
    }
};


/**
 * Master Card
 */
const masterMarkerDefault = (master, iconSize, go) => {

    return L.marker(
        master.coordinates,
        { icon:
                L.divIcon({
                    className: master.is_immediately ? 'pinkMarker' : 'whiteMarker',
                    iconSize: iconSize,
                    html: 
                        `
                        <div
                            class="marker-constructor"
                            style="background-image: url(${master.avatar_url})"
                         ></div>
                        ${master.is_approved ? '<div class="master__label-approved"></div>' : ''}
                        ${master.is_immediately ? '<div class="alert-notification"></div>' : ''}`
                })
        });
};

const masterMarker = ( master, iconSize, go) => {
    const spaceIndex = master.full_name.indexOf(" ");
    const firstName  = master.full_name.substring(0, spaceIndex);
    const lastName   = master.full_name.substring(spaceIndex + 1, master.full_name.length);

    return L.marker(
        master.coordinates,
        { icon:
                L.divIcon({
                    className: master.is_immediately ? 'pinkMarker' : 'whiteMarker',
                    iconSize: iconSize,
                    html:
                        `<div
                            class="marker-constructor"
                            style="background-image: url(${master.avatar_url})"
                         >
                            <div class='master__block-name'>
                                <div><span>${firstName}</span></div>
                                <div><span>${lastName}</span></div>
                            </div>
                            ${master.is_immediately ? '<div class = "master__block-immediately" ><span>Срочно</span></div>' : ''}
                            <div class='master__block-service-price'>
                                <span>от ${master.price} руб.</span>
                            </div>
                        </div>
                        ${master.is_approved ? '<div class="master__label-approved"/>' : ''}`
                })
        });
};

/**
href="http:/screen-4"
target="_self"
rel="noopener noreferrer"
 */

function createMap ( coordinates, zoom ) {
    let coordinatesN = coordinates;
    let zm = zoom;
    if (!coordinates) {
        coordinatesN = {
            "lat": "55.75",
            "lng": "37.6167"
        };
        zm = 1;
    }

    
    
    return L.map("map", {
        center: [
            coordinatesN.lat,
            coordinatesN.lng
        ],
        zoom: zm,
        layers: [
            // tileLayerCARTO[0],
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19
            })
        ]
    });
}
 // L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            //     attribution:
            //         '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // }),
const tileLayerCARTO = [
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    })
];

export default {

    fetchedUserMarker,

    fetchedUserCircle,

    masterMarker,
    masterMarkerDefault,

    createMap,

    tileLayerDefault,
    tileLayerCARTO,
}