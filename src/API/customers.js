import axios from "axios";
import API from "./API";

/**
    какие данные    
    id:12345
 */


const reg  = (id) => {

    // нужно чтобы в нее добавлять сразу все что нужно передать 
    const params = new URLSearchParams();

    // В данном случае это айди: слева наименование - справа значение
    params.append('id', id);

    // посылаем данные на url ниже, передаем наши параметры, указываем заголовки
    axios.post(
        'https://vk.masterimodel.com/node/customers.reg', params,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'PARAM_HEADER': "eyJ0eXAiOiJKV1QiLC"}})

        // В случае ответа сервера 
        .then(function (response) {

            // показать что пришло
            console.log('customers.reg', response)

            // Если пользователь не подписан на сообщество, то запросить чтобы подписался
            if (response.data.hasOwnProperty('isMember')) {
                if (response.data.isMember === 0) {
                    API.joinGroup();
                }
            }

            // Если уведомления запрещены, то запросить разрешение на получение уведомлений
            if (response.data.hasOwnProperty('isNotificationsAllowed')) {
                if (response.data.isNotificationsAllowed === 0) {
                    API.allowNotifications();
                }
            }

            // если ошибка и пришел статус ее
            if (response.data.hasOwnProperty('status')) {
                alert(response.data.status)
            }

        })

        // В случае ошибки показать ее
        .catch(function (error) {
            console.log(error);
        });

};

export default reg
