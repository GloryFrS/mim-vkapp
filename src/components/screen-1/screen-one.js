import React, { Component } from 'react';
import {Link}   from "react-router-dom";
import {PanelHeader} from "@vkontakte/vkui";

import './screen-one.css';

import CustomSelect from "../custom-select/custom-select";
import Button from "../button/button";
import API from "../../API/API";
import loading from "../loading/loading";


class ScreenOne extends Component {

    componentDidMount() {
        console.log("history", window.history);

        // Меняем внешний вид статус бара
        API.setViewSettings();

    }

    render() {
        if (!(this.props.customerTypes &&  this.props.fetchedUser)) return loading();

        return (
            <div className="container-fluid screen-one fixed-up">
                <div className="screen-one-background"/>

                <PanelHeader className="header-background" />

                <div className="row screen-one__block-fetched-user-full-name">
                    <div className="col">
                        <span>{ this.props.fetchedUser.first_name + ' ' + this.props.fetchedUser.last_name }</span>
                    </div>
                </div>

                <div className="row screen-one__block-greenting">
                    <div className="col">
                        <span>Добро пожаловать</span>
                    </div>
                </div>

                <div className="row screen-one__block-greenting">
                    <div className="col">
                        <span>в “Мастер и Модель”</span>
                    </div>
                </div>

                <div className="row screen-one__block-find-master">
                    <div className="col">
                        <span>Найдите мастера рядом</span>
                    </div>
                </div>

                <div className="row screen-one__block-customer-type">
                    <div className="col">
                        <span>Для кого ищете мастера?</span>
                    </div>
                </div>

                <div className="row screen-one__block-select">
                    <div className="col">
                        <CustomSelect
                            select={this.props.customerTypes}
                            callbackUpdateSelect={this.props.setCustomerTypes}
                        />
                    </div>
                </div>


                <div className="row screen-one__button">
                    <div className="col-auto">
                        <Link
                            to={`/screen-2`}

                            onClick={this.props.go}
                            data-to="/screen-2"
                        >
                            <div
                                onClick={() => {
                                    window.history.replaceState(
                                        {type: this.props.customerTypes.selected_option.id},
                                        "customerTypes",
                                        `?type=${this.props.customerTypes.selected_option.id}`);
                                }}
                            >
                                <Button
                                    buttonText='Далее'
                                    isActive={ true }
                                />
                            </div>
                        </Link>
                    </div>
                </div>


                <a
                    className="Screen-one-link"
                    href="https://vk.com/write-160192690"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="screen-one__master">
                        <div className="row screen-one__master_block-first">
                            <div className="col">
                                <span>Я мастер и хочу</span>
                            </div>
                        </div>

                        <div className="row screen-one__master_block-second">
                            <div className="col">
                                <span>зарегистрироваться</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}

export default ScreenOne;

/*

<a
    className="Screen-one-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
>
    Learn React
</a>

 */
