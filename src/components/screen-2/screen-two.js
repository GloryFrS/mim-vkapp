import React, { Component } from 'react';
import {Link}   from "react-router-dom";

import './screen-two.css';

/**
 * For develop
 */

import CustomSelect from "../custom-select/custom-select";
import Button from "../button/button";
import API from "../../API/API";
// import HeaderNavigation from "../header-navigation/header-navigation";
import loading from "../loading/loading";

import {PanelHeader, HeaderButton} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
// import Icon24Back from '@vkontakte/icons/dist/24/back';

// import scr2 from '../screens/2.svg';

class ScreenTwo extends Component {

    componentDidMount() {
        // Выбран customerTypes id
        if (this.props.customerTypes && this.props.customerTypes.hasOwnProperty('selected_option')) {
            window.history.replaceState(
                {type: this.props.customerTypes.selected_option.id,},
                "customerTypes",
                `?type=${this.props.customerTypes.selected_option.id}`
            );
        }

        console.log(window.history)
        console.log(window.location)

        // Меняем внешний вид статус бара
        API.setViewSettings();
    }

    render() {
        if ( !this.props.customerServices ) {
            return loading();
        }

        // так ниже мы меняем окончание в зависимости от числа
        let foundedMasters = '';
        let founded = 'Найдено';

        let mastersCount = this.props.mastersCount;
        if (mastersCount || mastersCount === 0) {

            // 1
            if (mastersCount % 10 === 1 && parseInt(mastersCount / 10) !== 1 && parseInt(mastersCount / 10) % 10 !== 1) {

                // alert("р!")
                // alert(parseInt(mastersCount / 10) % 10)
                // alert(parseInt(mastersCount / 10))

                founded = 'Найден';
                foundedMasters = `Мастер`
            }


            // 2-4
            if ((mastersCount < 10 || mastersCount > 20) && 2 <= mastersCount % 10 && mastersCount % 10 <= 4) {

                // alert("ра")
                foundedMasters = `Мастера`

            }

            // 0, 5-10, 25-30< ...
            if (
                (5 <= mastersCount || mastersCount === 0)
                && (mastersCount % 10 >= 5 || mastersCount % 10 === 0)
                && mastersCount % 10 <= 10
            ) {

                // alert("ров")
                foundedMasters = `Мастеров`

            }

            // 12-19
            if (11 <= mastersCount % 100 && mastersCount % 100 <= 19) {

                // alert("ров")
                foundedMasters = `Мастеров`

            }
        }


        return (
            <div className="container-fluid screen-two fixed-up">
                <div className="screen-two-background"/>

                <PanelHeader left={
                    <HeaderButton onClick={()=>window.history.back()}>
                        <Icon28ChevronBack/>
                    </HeaderButton>
                }>
                </PanelHeader>

                <div className="row screen-two__block-founded">
                    <div className="col">
                        <span>{founded}</span>
                    </div>
                </div>

                <div className="row screen-two__block-counter">
                    <div className="col">
                        <span>{this.props.mastersCount}</span>
                    </div>
                </div>
                <div className="row screen-two__block-founded-masters">
                    <div className="col">
                        <span>{foundedMasters} {this.props.customerTypes.selected_option.label.toLowerCase()}</span>
                    </div>
                </div>

                <div className="row screen-two__block-customer-service">
                    <div className="col">
                        <span>Какая услуга</span>
                    </div>
                </div>
                <div className="row screen-two__block-customer-service">
                    <div className="col">
                        <span>Вам нужна? </span>
                    </div>
                </div>

                <div className="row screen-two__block-select">
                    <div className="col">
                        <CustomSelect
                            select={ this.props.customerServices }
                            callbackUpdateSelect={ this.props.setCustomerServices }
                        />
                    </div>
                </div>

                <div className="row screen-two__button">
                    <div className="col-auto">
                        {
                            typeof this.props.mastersCount === 'number'
                            && this.props.mastersCount > 0 
                            && this.props.setCustomerServices ?
                                <Link
                                    to={'/screen-3'}
                                    data-to="/screen-3"

                                    onClick={this.props.go}


                                >
                                    <div
                                        onClick={()=>{
                                        //    API.masters.get(
                                        //        {customer_service_id: this.props.customerServices.selected_option.id},
                                        //        this.props.setMasters,
                                        //        this.props.setMastersCount,
                                        //        this.props.fetchedUser
                                        //    );
                                            window.history.replaceState(
                                                {
                                                    type: this.props.customerTypes.selected_option.id,
                                                    service: this.props.customerServices.selected_option.id},
                                                "customerServices",
                                                `?type=${this.props.customerTypes.selected_option.id}, service=${this.props.customerServices.selected_option.id}`
                                            );
                                        }}
                                    >
                                        <Button
                                            buttonText='Далее'
                                            isActive={ true }
                                        />
                                    </div>
                                </Link>
                                :
                                <Button
                                    buttonText='Далее'
                                    isActive={ false }
                                />
                        }
                    </div>
                </div>

                {/* <img src={scr2} alt="Logo" /> */}
            </div>
        );
    }
}

export default ScreenTwo;

/*

<a
    className="Screen-two-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
>
    Learn React
</a>

 */
