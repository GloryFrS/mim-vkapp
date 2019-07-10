import axios from "axios";
import customerArraysPrepare from "../functions/customerArraysPrepare";

/**
 * /customerServices
 */



/**
 * Отправляешь -> получаешь:
    customer_type_id: 1
    ||
     masters_сount: 145
     customer_services: [
         {id: 1, label: "Маникюр"},
         {id: 2, label: "Педикюр"},
         {id: 3, label: "Стрижки"},
     ]
 */

const get = (customer_type_id, setCustomerServices, setMastersCount) => {


    const params = new URLSearchParams();

    params.append('customer_type_id', customer_type_id);

    axios.post(
        'https://vk.masterimodel.com/node/customerServices.get', params,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'PARAM_HEADER': "eyJ0eXAiOiJKV1QiLC"}})

        .then(function (response) {

            console.log('3.1. customerServices', response);
            if (response.data.hasOwnProperty('customer_services')) {
                console.log('3. customer_services', response.data.customer_services);
                
                // вызываем коллбэк в который кладем результат функции customerArraysPrepare
                setCustomerServices(customerArraysPrepare(response.data.customer_services));
            }

            if (response.data.hasOwnProperty('masters_сount')) {
                
                // вызываем коллбэк 
                if (setMastersCount) {
                    setMastersCount(response.data.masters_сount);
                }
            }

        })
        .catch(function (error) {
            console.log(error);
        });
};



export default {
    get,
}