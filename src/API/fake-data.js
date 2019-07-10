// Все данные ниже - для разработки
/**
 * Шаблон ответа от ВК при запросе данных пользователя:
 */

const fetchedUserOk = { 
    "type": "VKWebAppGetUserInfoResult", 
    "data": { 
      "id": 2314852, 
      "first_name": "Ирина", 
      "last_name": "Денежкина", 
      "sex": 1, 
      "city": { 
        "id": 2, 
        "title": "Санкт-Петербург" 
      }, 
      "country": { 
        "id": 1, 
        "title": "Россия" 
      }, 
      "bdate": "10.4.1990", 
      "photo_100": "https://pp.userapi.com/c836333/v836333553/5b138/2eWBOuj5A4g.jpg",
      "photo_200": "https://pp.userapi.com/c836333/v836333553/5b137/tEJNQNigU80.jpg",
      "timezone": 3 
    } 
  };


/**
 * Перехватить данные местоположения:
 */

// const coordinatesOk = {
//     "type":"VKWebAppGeodataResult",
//     "data": {
//         "available": 1,
//         "lat": "55.043801106859036",
//         "long": "82.95130920829251"
//     }
// };

// /**
//  * Перехватить данные местоположения - не удалось:
//  */

// const coordinatesError = {
//     "type": "VKWebAppGeodataFailed",
//     "data": {
//         "error_type": "...",
//         "error_data": {
//             error: 'Error!'
//         }
//     }
// };


export default {
    fetchedUserOk,
    // coordinatesOk,
    // coordinatesError
}