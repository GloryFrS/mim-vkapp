
/**
 * Преобразуем полученные данные в готовый объект
 */

function customerArraysPrepare (array) {
    if (Array.isArray(array) && array[0]) {
        if (array[0].hasOwnProperty('customer_services_id') && array[0].hasOwnProperty('customer_services_label')) {
            for (let i = 0; i < array.length; i++) {
                array[i].id = array[i].customer_services_id;
                array[i].label = array[i].customer_services_label;
            }
        }
    }

    return {
        // name: "customer-types",
        selected_option: array[0],
        options: array,
        show_drop_downList: false,
    };
}

export default customerArraysPrepare