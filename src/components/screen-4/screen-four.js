import React, { Component } from 'react';
// import {Redirect} from 'react-router-dom';

import './screen-four.css';
import '../post/post.css';

import Header from "../header/header";
import HeaderNavigation from "../header-navigation/header-navigation";

import PostCard from "../post-card/post-card";
import Portfolio from "../portfolio/portfolio";
import Reviews from "../reviews/reviews";
import MenuBottom from "../menu-bottom/menu-bottom";
import PopupLeaveReview from "../popup-leave-review/popup-leave-review";
import API from "../../API/API";
import loading from "../loading/loading";

import {HeaderButton, PanelHeader} from "@vkontakte/vkui";
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import {Link} from "react-router-dom";
import Example from "../popup-leave-review/popout";
import Popup from "../popup-leave-review/popup";


class ScreenFour extends Component {

    componentDidMount() {
        document.querySelector('.App').scrollTo(0,0);
        // Меняем внешний вид статус бара
        API.setViewSettings();

        if (this.props.search) {
            // так тут мы добавляем url если переходили по ссылке на стандартынй адрес в приложении
            window.history.pushState({ foo: "/master" }, "/master", `/master${this.props.search}/#`);
            // alert(`componentDidMount ${this.props.search}`)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // 
        if (this.props.master && prevProps.master !== this.props.master && !this.props.search) {
            // так тут мы заменяем url если переходили по ссылке на стандартынй адрес в приложении
            window.history.replaceState(
                {master: this.props.master[0].vk_id},
                "master",
                `?id${this.props.master[0].vk_id}`
            );
        }
    }


    render() {
        if (!this.props.master) {
            return loading();
        }

        return (
            <div className="screen-four fixed-up">

                <Header/>

                <PanelHeader left={
                    <HeaderButton onClick={()=>{  window.history.back(); }}>
                        <Icon28ChevronBack/>
                    </HeaderButton>
                }>
                    <span>{this.props.master[0].full_name}</span>
                </PanelHeader>

                <div className="container screen-four__master-card">
                    <PostCard
                        avatar_url={this.props.master.avatar_url}
                        size={75}
                        is_approved={false}
                        fullName={this.props.master[0].full_name}
                        starsNumber={this.props.master[0].stars_number}
                        label={this.props.master[0].distance && `в ${this.props.master[0].distance} км от Вас`}
                    />
                    <div className="container screen-four__text">
                        <p>
                            {this.props.master[0].about_master}
                        </p>
                    </div>
                </div>

                <Portfolio
                    portfolio={this.props.master.portfolio}
                    setPopout={this.props.setPopout}
                />

                <Reviews
                    reviews={this.props.master.reviews}
                />

                <div className="container screen-four_button-review">
                    <div className="row">
                        <div className="col">
                            <Popup
                                master={this.props.master}
                                setMaster={this.props.setMaster}
                                setMasters = {this.props.setMasters}
                                fetchedUser={this.props.fetchedUser}
                                
                                customerTypes    = {this.props.customerTypes}
                                customerServices = {this.props.customerServices}
                                setPopout={this.props.setPopout}
                            />
                        </div>
                    </div>
                </div>

                <MenuBottom
                    phoneNumber={this.props.master[0].phone_number}
                    idMaster={this.props.master[0].vk_id}
                    idFetchedUser={this.props.fetchedUser.id}
                />

            </div>
        );
    }
}

export default ScreenFour;