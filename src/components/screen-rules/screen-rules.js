import React, { Component } from 'react';
import {PanelHeader, HeaderButton} from '@vkontakte/vkui';
import Button from "../button/button";
import './screen-rules.css';

import API from "../../API/API";
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';



class ScreenRules extends Component {

    componentDidMount() {
        console.log("history", window.history);

        // Меняем внешний вид статус бара
        API.setViewSettings();

    }

    render() {
       

        return (
            <div className="container-fluid screen-one fixed-up">
                <div className="screen-one-background"/>

                <PanelHeader left={
                    <HeaderButton onClick={()=>window.history.back()}>
                        <Icon28ChevronBack/>
                    </HeaderButton>
                }>
                </PanelHeader>

                <div className="row screen-one__block-fetched-user-full-name">
                    <div className="col">
                        Правила сервиса <br/>
                        «Мастер и Модель»
                    </div>       
                </div>
                
                <div className="row screen-one__block-find-master">
                    <div className="col">
                        <span>Регистрация для всех бесплатна</span>
                    </div>
                </div>
                <div className="row screen-two__button">
                    <div className="col-auto">
                        <a className="button" target="_blank" rel="noopener noreferrer" href="https://vk.com/app5619682_-160192690#396197">Я Мастер</a><br/>
                        <a className="button" target="_blank" rel="noopener noreferrer" href="https://vk.com/app5619682_-160192690#396603">Я Модель</a>
                       
                    </div>
                </div>
                <div className="row screen-one__block-find-master">
                    <div className="col">
                        <span>Модерация</span>
                    </div>
                </div>
                
                <div className="row screen-one__block-customer-type">
                    <div className="col-auto">
                            Каждая анкета проходит модерацию от 1 суток до 1 недели.

                            После публикации вы получите ссылку на свою анкету Мастера в сообщения от имени нашей группы <a className="rules-link" href="https://vk.com/masterimodel" target="_blank"rel="noopener noreferrer" >https://vk.com/masterimodel</a> (для этого после заполнения анкеты разрешите присылать сообщения)
                       
                        <span></span>
                    </div>
                </div>

                <div className="row screen-two__button">
                    <div className="col-auto">
                        <br/>
                        <button className="button" onClick={()=>window.history.back()}>Назад</button>
                    </div>
                </div>


                

                
            </div>
        );
    }
}

export default ScreenRules;


