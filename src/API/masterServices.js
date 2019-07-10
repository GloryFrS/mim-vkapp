/**
 * /masterServices.add
 */
import axios from "axios";


/**
 * тут все также как и в предыдущих, неченго комментировать
 /masterServices.get
    {
       id: 142115052
    }
 ||
 {
        [
            {
                customer_types_id: 1,
                customer_services_id: 1,
                customer_types_label: "для девушек",
                customer_services_label: "Брови",
                price: 400
            }
        ]
    }
 */

const get = (id, setMasterServices) => {
    let validate = true;

    if (typeof id !== 'number') validate = false;

    if (validate) {
        const params = new URLSearchParams();

        params.append('id', id);

        axios.post(
            'https://vk.masterimodel.com/node/masterServices.get', params,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'PARAM_HEADER': "eyJ0eXAiOiJKV1QiLC"}})

            .then(function (response) {

                if (Array.isArray(response.data)) {
                    console.log("setMasterServices", response.data);
                    setMasterServices (response.data);
                }

            })

            .catch(function (error) {
                console.log(error);
            });
    }
};


export default {
   
    get
}