import React from 'react';
import {PopoutWrapper} from '@vkontakte/vkui';

import './popup.css';


const Alert = (props) => {

    return <PopoutWrapper v="center" h="center">

        <div className="alert">
            <button type="button" className="close" onClick={()=>props.setPopout(null)}>
                <span aria-hidden="true">&times;</span>
            </button>

            <div className="alert__header">
                <span>Отзыв не отправлен..</span>
            </div>

            <div className="alert__body">
                <p>{props.text}</p>
            </div>

            <div className="alert__footer">
                
            </div>
        </div>
    </PopoutWrapper>
}

export default Alert
