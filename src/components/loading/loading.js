import React from 'react';
import {Spinner} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './loading.css';

const loading = (text) => {
    return (
        <div className="loading">
            <Spinner size="large" />

            {text}
        </div>
    )
};

export default loading