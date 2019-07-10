import axios from "axios";
import getDistance from "../functions/getDistance";
import API from "./API";



/**
 * /masters.get
 */

/*
    отправляешь -> получаешь
    customer_service_id: 1,
    or
    id : 12345
 */

const get = (idObj, setMasters, setMastersCount, fetchedUser) => {
    let validate = false;

    const params = new URLSearchParams();

    // if (fetchedUser && fetchedUser.hasOwnProperty('coordinates')) {}

    // проверяем объект 
    if (typeof idObj === 'object') {
        // ли и есть ли в нем customer_service_id и тип у него число ? если да то валидация пройдена и добавляем его в параметры
        if (idObj.hasOwnProperty('customer_service_id') && typeof idObj.customer_service_id === 'number') {
            params.append('customer_service_id', idObj.customer_service_id);
            validate = true;
        }
        // ли и есть ли в нем id и тип у него число ? если да то валидация пройдена и добавляем его в параметры
        if (idObj.hasOwnProperty('id') && typeof idObj.id === 'number') {
            params.append('id', idObj.id);
            validate = true;
        }
    }

    console.log('validate', validate);

    if (validate) {

        axios.post(
            'https://vk.masterimodel.com/node/masters.get', params,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'PARAM_HEADER': "eyJ0eXAiOiJKV1QiLC"}})

            .then(function (response) {

                // так это нужно для проверки типа 
                let toString = {}.toString;
                if (toString.call(response.data) === '[object Array]') {
                    let masters = response.data;

                    // тут мы пробигаемся по массиву мастеров и 
                    for (let i = 0; i < masters.length; i++) {
                        // т.к. объекты мастеров содеражт вложэенные объекты то их надо распарсить иначе они останутся строкой
                        masters[i].coordinates = JSON.parse(masters[i].coordinates);

                        // если доступ к гео у текущего пользователя есть , то высчиать дистанцию от него до мастера
                        if (fetchedUser && typeof fetchedUser === 'object' && fetchedUser.hasOwnProperty('coordinates')) {
                            masters[i].distance = Math.ceil(getDistance(
                                [fetchedUser.coordinates.lat, fetchedUser.coordinates.lng],
                                [masters[i].coordinates.lat, masters[i].coordinates.lng]
                            ));

                            // по дездоку если большще 4 отзывов то мастер поддвержден
                            if (typeof masters[i].reviews_number === 'number' && masters[i].reviews_number >= 5) {
                                masters[i].is_approved = 1;
                            }
                        }
                    }

                    // коллбэки на присвоить мастеров и их длину
                    setMasters(masters);
                    setMastersCount(masters.length);
                }

                // если это один мастер а не массив
                if (toString.call(response.data) === "[object Object]") {

                    let master = response.data;
                    // также распарсиваем данные 
                    master[0].coordinates = JSON.parse(master[0].coordinates);

                    // воот а тут надо раскодировать то что мы кодировалаи когда посылали данные в БД (из админки, там тоже сначала кодировали потом отправляли)
                    master[0].about_master = API.encoding.decoding(master[0].about_master)

                    // если отзывы есть
                    if (Array.isArray(master.reviews.reviewers) && master.reviews.reviewers.length > 0) {
                        for (let i = 0; i < master.reviews.reviewers.length; i++) {
                            // то распарсить каждый отзыв
                            master.reviews.reviewers[i].review = API.encoding.decoding(master.reviews.reviewers[i].review);
                        }
                    }

                    // также высчитать дистанцию до мастера от пользователя
                    if (typeof fetchedUser === 'object' && fetchedUser.hasOwnProperty('coordinates')) {
                        master[0].distance = Math.ceil(getDistance(
                            [fetchedUser.coordinates.lat, fetchedUser.coordinates.lng],
                            [master[0].coordinates.lat, master[0].coordinates.lng]
                        ));
                    }
                    // запомнить мастера
                    setMasters(master);
                }

                // если портфолио запрашиваемого мастера пусто то это ошибка обработанная сервером
                if (response.data === 'portfolio directory not found') {
                    console.log("4. master.get", response.data);
                    alert('portfolio directory not found')
                }

                // тоже самое что и выше, тока тут вообще мастера нет запрашиваемого
                if (response.data === 'masters not found') {
                    console.log("4. master.get - masters not found", response.data);

                    // коллбэки нулевые
                    setMasters([]);
                    setMastersCount(0);
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