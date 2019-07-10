import axios from "axios";
import customerArraysPrepare from "../functions/customerArraysPrepare";

const get = (callback) => {
    axios.get('https://vk.masterimodel.com/node/customerTypes.get')

        .then(function (response) {

            // Если пришел ответ и это массив и не пустой
            if ( Array.isArray( response.data ) && response.data.length > 0 ) {
                // вызываем коллбэк в который кладем результат функции customerArraysPrepare
                callback(customerArraysPrepare(response.data));
            }

        })
        .catch(function (error) {
            console.log(error);
        });
};



export default {
    get,
}