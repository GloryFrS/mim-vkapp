import React, { Component } from 'react';
import {Link}     from "react-router-dom";

import './screen-three.css';

// import HeaderNavigation from "../header-navigation/header-navigation";
import Button           from "../button/button";
import Header           from "../header/header";
import Filter           from "../filter/filter";
import Post             from "../post/post";
import Map              from "../leaflet-map/leaflet-map";
import API              from "../../API/API";
import getDistance      from "../../functions/getDistance";
import loading          from "../loading/loading";

import {PanelHeader, HeaderButton} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

class ScreenThree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentRadius: 1000,

            list:       1,
            map:        2,
            zoom:       14,

            posts: null,

            priceFrom: this.props.priceFrom,
            priceTo:   this.props.priceTo,
        };
    }

    setPriceFrom = (e)    => {
        this.setState({priceFrom: e.target.value});
        this.props.setPriceFrom(e.target.value);
    }
    setPriceTo   = (e)    => {
        this.setState({priceTo: e.target.value});
        this.props.setPriceTo(e.target.value);
    }
    setZoom   = (zoom)    => this.setState({zoom: zoom});

    price = (a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
    };

    stars = (a, b) => {
        if (a.stars_number < b.stars_number) return 1;
        if (a.stars_number > b.stars_number) return -1;
        return 0;
    };


    coordinates = (a, b) => {
        // let deltaLatA = this.props.fetchedUser.coordinates.lat - a.coordinates.lat;
        // let deltaLatB = this.props.fetchedUser.coordinates.lat - b.coordinates.lat;
        //
        // let deltaLngA = this.props.fetchedUser.coordinates.lng - a.coordinates.lng;
        // let deltaLngB = this.props.fetchedUser.coordinates.lng - b.coordinates.lng;

        let radiusA = getDistance(
            [this.props.fetchedUser.coordinates.lat, this.props.fetchedUser.coordinates.lng],
            [a.coordinates.lat, a.coordinates.lng]);

        let radiusB = getDistance(
            [this.props.fetchedUser.coordinates.lat, this.props.fetchedUser.coordinates.lng],
            [b.coordinates.lat, b.coordinates.lng]);

        if (radiusA < radiusB) return -1;
        if (radiusA > radiusB) return 1;

        // if (deltaLatA - deltaLngA < deltaLatB - deltaLngB) return 1;
        // if (deltaLatA - deltaLngA > deltaLatB - deltaLngB) return -1;
        return 0;
    };

    toggleScroll = () => {
        if (this.props.currentTab === 2) {

            if (this.screenThree.scrollTop < 100) {
                this.screenThree.scrollTo({ top: window.outerHeight, behavior: 'smooth' });
            } 
            
                else

            if (100 <= this.screenThree.scrollTop) {
                this.screenThree.scrollTo({ top: 0, behavior: 'smooth' });
            }

        }
    };

    componentDidMount() {
        
        this.screenThree = document.querySelector('.screen-three');

        if (this.props.customerServices) {
            window.history.replaceState(
                {
                    type: this.props.customerTypes.selected_option.id,
                    service: this.props.customerServices.selected_option.id
                },
                "masters",
                `?type=${this.props.customerTypes.selected_option.id}&service=${this.props.customerServices.selected_option.id}`
            );
        }

       
        API.setViewSettings();

      
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.screenThree = document.querySelector('.screen-three');
    }

    masterOnClick = (master) => {
        if (this.props.setMaster) {
            this.props.setTab1scroll(this.screenThree.scrollTop);
            API.masters.get({id: master.vk_id}, this.props.setMaster, null, this.props.fetchedUser);
        }
    };


    immediately = (a, b) => {
        if (a.is_immediately < b.is_immediately) return 1;
        if (a.is_immediately > b.is_immediately) return -1;
        return 0;
    };


    render() {

        if (!this.props.customerServices) {
         
            return loading();
        }

        if (this.props.customerServices && !this.props.masters) {
        

            return loading();
        }

        let masters =  this.props.masters;

        masters = masters.filter (master =>
            this.state.priceFrom <= master.price 
            && (+this.state.priceTo > 0 ? master.price <= this.state.priceTo : true)
            && (this.props.fetchedUser && !this.props.fetchedUser.coordinates ? true : master.distance <= this.props.searchFilterRadius.selected_option.radius / 1000)
        );

        if (this.props.masters && this.props.mastersCount !== masters.length) {
            this.props.setMastersCount(masters.length)
        }

        let foundedMasters = '';

        let mastersCount = this.props.mastersCount;
        if (mastersCount || mastersCount === 0) {


            // 1
            if (mastersCount % 10 === 1 && parseInt(mastersCount / 10) !== 1 && parseInt(mastersCount / 10) % 10 !== 1) {

                foundedMasters = `Найден ${mastersCount} мастер`
            }

            // 2-4
            if ((mastersCount < 10 || mastersCount > 20) && 2 <= mastersCount % 10 && mastersCount % 10 <= 4) {

                // alert("ра")
                foundedMasters = `Найдено ${mastersCount} мастера`
            }
             // 0, 5-10, 25-30< ...
             if (
                (5 <= mastersCount || mastersCount === 0)
                && (mastersCount % 10 >= 5 || mastersCount % 10 === 0)
                && mastersCount % 10 <= 10
            ) {
                foundedMasters = `Найдено ${mastersCount} мастеров`
            }

            // 12-19
            if (11 <= mastersCount % 100 && mastersCount % 100 <= 19) {
                foundedMasters = `Найдено ${mastersCount} мастеров`
            }
        }

        return (
            <div className="screen-three fixed-up">
                <Header />
                <PanelHeader left={
                    <HeaderButton onClick={()=>window.history.back()}>
                        <Icon28ChevronBack fill="#FFF"/>
                    </HeaderButton>
                }>
                    <span>{this.props.customerServices.selected_option.label}</span>
                </PanelHeader>

                <div className="container screen-three__button">
                    <div className="row">
                        <div className="col-6">
                            <Button
                                id={1}
                                buttonText="Список"
                                isActive={ this.props.currentTab === 1 }
                                onClick={ this.props.toggleTabs }
                            />
                        </div>
                        <div className="col-6">
                            <Button
                                id={2}
                                buttonText="Карта"
                                isActive={ this.props.currentTab === 2 }
                                onClick={ this.props.toggleTabs }
                            />
                        </div>
                    </div>
                </div>


                <Filter
                    bigFilter                = { this.props.currentTab === 1 }

                    priceFrom    = {this.state.priceFrom}
                    priceTo      = {this.state.priceTo}
                    setPriceFrom = {this.setPriceFrom}
                    setPriceTo   = {this.setPriceTo}

                    disabled       = {this.props.fetchedUser && this.props.fetchedUser.coordinates === undefined}
                    fetchedUser    = {this.props.fetchedUser}
                    setCoordinates = {this.props.setCoordinates}

                    searchFilterRadius      = { this.props.searchFilterRadius }
                    searchFilterSortType    = { this.props.searchFilterSortType }
                    searchFilterSortType2    = { this.props.searchFilterSortType2 }

                    priceFrom = {this.props.priceFrom}
                    priceTo   = {this.props.priceTo}

                    setSearchFilterRadius   = { this.props.setSearchFilterRadius   }
                    setSearchFilterSortType = { this.props.setSearchFilterSortType }
                    setSearchFilterSortType2 = { this.props.setSearchFilterSortType2 }
                />



                <div className={"container screen-three__founded-masters" + (
                    this.props.currentTab === 2 ? " screen-three__founded-masters_map" : "")}
                    // (this.props.IOS ? ' screen-three__founded-masters_margin-top' : '')}
                     onClick={this.toggleScroll}
                >
                    <div className="row">
                        <div className="col">
                            <span>{foundedMasters}</span>
                        </div>
                    </div>
                </div>

                {
                    this.props.currentTab === 1         &&
                    Array.isArray (this.props.masters)  &&
                    this.props.masters.length > 0       &&

                    <div className="masters-list">
                        {
                            masters
                            .sort(this[
                                this.props.fetchedUser && this.props.fetchedUser.coordinates ? 
                                this.props.searchFilterSortType.selected_option.sort : 
                                this.props.searchFilterSortType2.selected_option.sort])
                            .sort(this.immediately)
                            .map ( (item, index) =>
                                <Link
                                    key={index + item}
                                    to="/master"
    
                                    onClick={this.props.go}
                                    data-to="/master"
    
                                >
                                    <div onClick={()=>this.masterOnClick(item)}>
                                        <Post
                                            pink={ item.is_immediately }
                                            item = {item}
                                            is_approved={item.is_approved}
                                            fetchedUser={this.props.fetchedUser}
                                        />
                                    </div>
                                </Link>)
                        }
                    </div>
                    
                }

                {
                    this.props.currentTab === 2 &&
                    <div className="back"/>
                }
                {
                    this.props.currentTab === 2 &&
                    <Map
                        osname = {this.props.osname}
                        go = {this.props.go}
                        zoom={this.state.zoom}
                        setZoom={this.setZoom}

                        markerPosition = {this.state.markerPosition}
                        currentTab     = {this.props.currentTab}
                        masters      = {masters}
                        setMaster    = { this.props.setMaster }
                        setCoordinates = {this.props.setCoordinates}
                        fetchedUser  = { this.props.fetchedUser }

                        radius = { this.props.searchFilterRadius.selected_option.radius / 1000}
                        screenThree = {this.screenThree}
                    />
                }


            </div>
        );
    }
}

export default ScreenThree;
