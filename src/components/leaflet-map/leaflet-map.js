import React from "react";
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import './leaflet-map.css';




import LeafletAPI from './leaflet-api';
import API        from "../../API/API";


class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null,
            zoom: this.props.zoom,
        };
    }

     masterOnClick = (master) => {
         if (this.props.setMaster) {
             API.masters.get({id: master.vk_id}, this.props.setMaster, null, this.props.fetchedUser);
            this.props.go(0,`/master?id${master.vk_id}`)
         }
     };

    componentDidMount() {
        if (this.props.fetchedUser) {
            // let zoom = 0;

            this.map = LeafletAPI.createMap(this.props.fetchedUser.coordinates, this.state.zoom );
            
            let that = this;
            this.map.on('zoom', function() {
                let zoom = that.map.getZoom();
                // that.props.setZoom(zoom);
                that.updateMastersMarkers(zoom);

                console.log(zoom);
            });
            
            let southWest = L.latLng(-(89.98155760646617), -180),
                northEast = L.latLng((89.99346179538875), 180);
            let bounds = L.latLngBounds(southWest, northEast);

            this.map.setMaxBounds(bounds);
            this.map.on('drag', function() {
                that.map.panInsideBounds(bounds, { animate: false });
            });

           
            this.layerFetchedUserMarker = L.layerGroup().addTo(this.map);
            this.layerCircle = L.layerGroup().addTo(this.map);
            
            this.layerMasterMarkers = L.markerClusterGroup().addTo(this.map);
            this.markers = L.markerClusterGroup();

            this.updateFetchedUserMarker ()
            this.updateCircle()
            this.updateMastersMarkers(that.map.getZoom());
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        // check if position has changed
        if (
            this.props.fetchedUser
            && this.props.fetchedUser.coordinates
            && this.props.fetchedUser.coordinates !== prevProps.fetchedUser.coordinates
        ) {
            this.updateFetchedUserMarker();
            this.map.setView(this.props.fetchedUser.coordinates, 15);
            this.updateCircle();
        }

        // check if data has changed
        if (this.props.masters !== prevProps.masters) {
            this.updateMastersMarkers(this.map.getZoom());
        }

        if (this.props.radius !== prevProps.radius) {
            this.updateCircle()
        }
    }

    updateFetchedUserMarker () {
        this.layerFetchedUserMarker.clearLayers();
        
         /** Если Данные пользователя подгружены => можно занести его на карту */
         if ( this.props.fetchedUser && this.props.fetchedUser.coordinates ) {

            this.fetchedUser = LeafletAPI
                .fetchedUserMarker(this.props.fetchedUser)
                .addTo(this.layerFetchedUserMarker);
        }
    }

    updateCircle () {
        console.log(this.props.zoom )
        this.layerCircle.clearLayers();
        this.fetchedUserCircle = LeafletAPI.fetchedUserCircle(this.props.fetchedUser, this.props.radius * 1000)

        if (this.fetchedUserCircle) {
            this.fetchedUserCircle.addTo(this.layerCircle)
        }
    }

    updateMastersMarkers(zoom) {
        if (zoom === 0) zoom = 1;
        
        this.layerMasterMarkers.clearLayers();
        if (Array.isArray(this.props.masters)) {
            let coefficient =  zoom  / 19;

            if (zoom < 14) {
                for (let masterCount = 0; masterCount < this.props.masters.length; masterCount++) {
                    LeafletAPI.masterMarkerDefault(this.props.masters[masterCount], [62.14 * coefficient, 80 * coefficient], this.props.go)
                        .addTo(this.layerMasterMarkers)
                        .on('click', () => this.masterOnClick(this.props.masters[masterCount]));
                }
            } else {
                for (let masterCount = 0; masterCount < this.props.masters.length; masterCount++) {
                    LeafletAPI.masterMarker(this.props.masters[masterCount], [62.14 * coefficient, 80 * coefficient], this.props.go)
                        .addTo(this.layerMasterMarkers)
                        .on('click', () => this.masterOnClick(this.props.masters[masterCount]));
                }
            }
        }
    }

    mapOnClick = (e) => {
        this.props.screenThree.scrollTo({ top: window.outerHeight, behavior: 'smooth' });
    }

    render() {
    
        return <div id="map" onClick={this.mapOnClick} className={this.props.osname === 'ios' ? 'ios' : ''}>{
            this.props.fetchedUser && !this.props.fetchedUser.coordinates &&
            <div className="get-location" onClick={()=>API.fetchUserCoordinates(this.props.setCoordinates)}/>
        }</div>;
    }
}

export default Map;
