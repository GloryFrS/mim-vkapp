import connect from '@vkontakte/vkui-connect';

// Заглушка
import getFakeData from './fake-data';

/**
 *  Подписка на ответы ВК
 */

function subscribe (callback, type, err) {
    // Заглушка ---------------------------------------------------------------------
    if (type === 'VKWebAppGetUserInfoResult')  {
        console.log('1. fetchedUser', getFakeData.fetchedUserOk.data);
         callback(getFakeData.fetchedUserOk.data);
    }

    if (err === 'VKWebAppGeodataFailed') {
        // callback(getFakeData.coordinatesOk.data);
         callback ({
            "lat": "55.75",
            "long": "37.6167"
            // "lat": "55.043801106859036",
            // "long": "82.95130920829251"
        })
    }
    // Заглушка ---------------------------------------------------------------------

    // тут я ловлю события и отправляю соответсвубщие коллбэки
    connect.subscribe((e) => {
        switch (e.detail.type) {

            case 'VKWebAppGetUserInfoResult':
                if (type === e.detail.type) callback (e.detail.data);
                break;

            case 'VKWebAppGetUserInfoFailed':
                if (err === e.detail.type) callback (e.detail.data);
                break;

            case 'VKWebAppGeodataResult':
                if (type === e.detail.type) callback (e.detail.data);
                break;

            case 'VKWebAppGeodataFailed':
                if (err === e.detail.type) callback (e.detail.data);
                break;

            case 'VKWebAppSetViewSettingsFailed':
                // alert ("VKWebAppSetViewSettingsFailed " + e.detail.data.error_data);
                console.log(e.detail.data.error_data);
                
                // if (err === e.detail.type) callback (e.detail.data);
                break;

            case 'VKWebAppShareResult':
                // if (type === e.detail.type) callback (e.detail.data);
                break;

            case 'VKWebAppShareFailed':
                // if (err === e.detail.type) callback (e.detail.data);
                break;

            case 'VKWebAppJoinGroupResult':
                // if (type === e.detail.type) API.reg(callback);
                break;

            case 'VKWebAppJoinGroupFailed':
                // if (err === e.detail.type)  API.reg(callback);
                break;

            default:
                console.log(e.detail.type);
        }
    });
}




/**
 * 1. Перехватить данные пользователя
 */

const fetchUser = (callback) => {
    // вызвать подписку, передать полуенный коллбэк и типы в случае результата и ошибки ниже суть такая же
    subscribe(callback, 'VKWebAppGetUserInfoResult', 'VKWebAppGetUserInfoFailed');
    connect.send('VKWebAppGetUserInfo', {});
};

/**
 * 2. Перехватить данные местоположения пользователя
 */

const fetchUserCoordinates = (callback) => {
    subscribe(callback, 'VKWebAppGeodataResult', 'VKWebAppGeodataFailed');
    connect.send("VKWebAppGetGeodata", {});
};

/**
 * 3. Установить статус бар в нужный цвет
 */

const setViewSettings = (callback) => {
    subscribe(callback, '', 'VKWebAppSetViewSettingsFailed');
    connect.send("VKWebAppSetViewSettings", {"status_bar_style": "light", "action_bar_color": "#F5908E"});
};

/**
 * 4. Установить статус бар в нужный цвет
 */

const share = (idMaster) => {
    subscribe(console.log, 'VKWebAppShareResult', 'VKWebAppShareFailed');
    connect.send("VKWebAppShare", {"link": `https://vk.com/app6967349#master?id${idMaster}`});
};


const joinGroup = () => {
    subscribe(console.log, 'VKWebAppJoinGroupResult', 'VKWebAppJoinGroupFailed');
    connect.send("VKWebAppJoinGroup", {"group_id": 160192690});
};


const allowNotifications = () => {
    connect.send("VKWebAppAllowNotifications", {});
};


export default {
    fetchUser,
    fetchUserCoordinates,
    setViewSettings,
    share,
    joinGroup,
    allowNotifications
}