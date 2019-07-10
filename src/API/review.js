import React from 'react';
import axios from "axios";
import API from "./API";
import Alert from "../components/popup-leave-review/alert";
var md5 = require('md5');
/**
     полсыоаем -> получаем

     master_vk_id: 1
     customer_type_id: 1
     customer_vk_id: 2
     customer_service_id: 2
     stars_number: 3.5
     review:       "какой то текстаманаа"
        ||
    status: 'ok',
    status: 'error',
 */

// добавить отзыв
const add = (
    customer_vk_id,
    master_vk_id,
    customer_type_id,
    customer_service_id,
    stars_number, review,
    setMaster,
    setMasters,
    fetchedUser,
    current_customer_service_id,
    setPopout
) => {
    let validate = true;

    // на всякий случай приводим его к сроке
    review = review.toString();
    
    // проверяем на длину
    if (review.length > 1000) {
        validate = false;

        // попапы показать если перебор по длине, и затем удалить их 
        setTimeout( () => {
            setPopout(
                <Alert 
                    setPopout={setPopout} 
                    text={"Нельзя отправить больше 1000 символов."}
                />)
            setTimeout(()=>{
                if (document.querySelector ('.alert')) {
                    setPopout(null)
                }
            }, 5000);
        }, 0);
        // setPopout(null);
    }
    
    // тут пытаемся закодировать и раскодировать, если выдается ошибка то обработать - попап
    try {

        review = API.encoding.encoding(review);

        review = API.encoding.decoding(review)
      
    } catch (err) {
        // обработка ошибки
        console.log('Ошибка ' + err.name + ":" + err.message + "\n" + err.stack); // (3) <--

        validate = false;

       
        setTimeout( () => {
            setPopout(
                <Alert 
                    setPopout={setPopout} 
                    text={"Нельзя отправить больше 1000 символов."}
                />)
                setTimeout(()=>{
                    if (document.querySelector ('.alert')) {
                        setPopout(null)
                    }
                }, 5000);
        }, 0);
        // setPopout(null);
    }

    console.log("review", review)
    console.log("review длина не закодированного", review.length)


    // вот эта дичь от димы (максима) ему захотелось так сделать проверку его за это спрашивайте
    if (validate) {

        var _0x610c = ["\x68\x72\x67\x72", "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64", "\x6D\x6F\x64\x65\x6C", "\x73\x68\x69\x66\x74", "\x30\x78\x30", "\x30\x78\x31", "\x6D\x61\x73\x74\x65\x72", "\x30\x78\x32", "\x70\x75\x73\x68", "\x67\x65\x74\x5F\x68\x61\x73\x68\x65\x72", "\x30\x78\x33", "\x30\x78\x34", "\x30\x78\x35", "\x30\x78\x36", "\x30\x78\x37", "\x72\x6B", "\x72", "\x3A"];
        var _0x3654 = [_0x610c[0], _0x610c[1], _0x610c[2], _0x610c[3], _0x610c[4], _0x610c[5], _0x610c[6], _0x610c[7], _0x610c[8], _0x610c[9], _0x610c[10], _0x610c[11], _0x610c[12], _0x610c[13], _0x610c[14], _0x610c[15], _0x610c[16], _0x610c[17]];
        var _0x3a26 = [_0x3654[0], _0x3654[1], _0x3654[2], _0x3654[3], _0x3654[4], _0x3654[5], _0x3654[6], _0x3654[7]];
        (function (_0xb567x3, _0xb567x4) {
            var _0xb567x5 = function (_0xb567x6) {
                while (--_0xb567x6) {
                    _0xb567x3[_0x3654[8]](_0xb567x3[_0x3654[3]]())
                }
            };
            _0xb567x5(++_0xb567x4)
        }(_0x3a26, 0x81));
        var _0x441b = function (_0xb567x8, _0xb567x9) {
            _0xb567x8 = _0xb567x8 - 0x0;
            var _0xb567xa = _0x3a26[_0xb567x8];
            return _0xb567xa
        };
        var _0x9645 = [_0x441b(_0x3654[4]), _0x441b(_0x3654[5]), _0x3654[9], _0x441b(_0x3654[7]), _0x3654[8], _0x441b(_0x3654[10]), _0x441b(_0x3654[11]), _0x441b(_0x3654[12]), _0x441b(_0x3654[13]), _0x441b(_0x3654[14]), _0x3654[15], _0x3654[16], _0x3654[17]];
        var _0x4c59 = [_0x9645[0x0], _0x9645[0x1], _0x9645[0x2]];
        (function (_0xb567xd, _0xb567xe) {
            var _0xb567xf = function (_0xb567x10) {
                while (--_0xb567x10) {
                    _0xb567xd[_0x9645[0x4]](_0xb567xd[_0x9645[0x3]]())
                }
            };
            _0xb567xf(++_0xb567xe)
        }(_0x4c59, 0x14c));
        var _0x46ec = function (_0xb567x12, _0xb567x13) {
            _0xb567x12 = _0xb567x12 - 0x0;
            var _0xb567x14 = _0x4c59[_0xb567x12];
            return _0xb567x14
        };
        var _0xb4b8 = [_0x46ec(_0x9645[0x5]), _0x46ec(_0x9645[0x6]), _0x9645[0x7], _0x46ec(_0x9645[0x8]), _0x9645[0x9], _0x9645[0xa], _0x9645[0xb], _0x9645[0xc]];
        var _0x2109 = ['342f34f', 'd23d'];
        (function (_0x208092, _0x4938bc) {
            var _0x5803cd = function (_0x232ff5) {
                while (--_0x232ff5) {
                    _0x208092['push'](_0x208092['shift']());
                }
            };
            _0x5803cd(++_0x4938bc);
        }(_0x2109, 0x111));
        var _0xd0db = function (_0x1e311a, _0x480f74) {
            _0x1e311a = _0x1e311a - 0x0;
            var _0x1bf01e = _0x2109[_0x1e311a];
            return _0x1bf01e;
        };
        var fruits = ['1', _0xd0db('0x0'), _0xd0db('0x1')];
        var container = document[_0xb4b8[0x1]](_0xb4b8[0x0]);
        var hashContainer = container || container;
        var arr = [0x1, _0xb4b8[0x2], { "\x6E\x61\x6D\x65": _0xb4b8[0x3] }, !![]];
        let numericalCount = 0xea;
        let abcd = _0xb4b8[0x4];
        let numericalCount2 = 0x312f8a;
        let abcd2 = _0xb4b8[0x5];
        let numericalCount3 = 0x156;
        let abcd3 = _0xb4b8[0x6];
    
    
        var _0x456f = ['master', '0x2', 'push', 'get_hasher', '0x5', '0x6', '0x7', 'hrgr', 'getElementById', 'model', 'shift', '0x1'];
        (function (_0xfc42d6, _0x1ac05a) {
            var _0x34cc70 = function (_0x501b1d) {
                while (--_0x501b1d) {
                    _0xfc42d6['push'](_0xfc42d6['shift']());
                }
            };
            _0x34cc70(++_0x1ac05a);
        }(_0x456f, 0x1db));
        var _0x53c3 = function (_0x2ee96d, _0xa230cd) {
            _0x2ee96d = _0x2ee96d - 0x0;
            var _0x5a072e = _0x456f[_0x2ee96d];
            return _0x5a072e;
        };
        var _0x610c = [_0x53c3('0x0'), _0x53c3('0x1'), _0x53c3('0x2'), _0x53c3('0x3'), '0x0', _0x53c3('0x4'), _0x53c3('0x5'), _0x53c3('0x6'), _0x53c3('0x7'), _0x53c3('0x8'), '0x3', '0x4', _0x53c3('0x9'), _0x53c3('0xa'), _0x53c3('0xb'), 'rk', 'r', ':'];
        var _0x3654 = [_0x610c[0x0], _0x610c[0x1], _0x610c[0x2], _0x610c[0x3], _0x610c[0x4], _0x610c[0x5], _0x610c[0x6], _0x610c[0x7], _0x610c[0x8], _0x610c[0x9], _0x610c[0xa], _0x610c[0xb], _0x610c[0xc], _0x610c[0xd], _0x610c[0xe], _0x610c[0xf], _0x610c[0x10], _0x610c[0x11]];
        var _0x3a26 = [_0x3654[0x0], _0x3654[0x1], _0x3654[0x2], _0x3654[0x3], _0x3654[0x4], _0x3654[0x5], _0x3654[0x6], _0x3654[0x7]];
        let key = abcd + numericalCount2 + abcd2 + numericalCount3 + abcd3;
        (function (_0xf0e4bc, _0x5151ed) {
            var _0x5bdda9 = function (_0x3ae191) {
                while (--_0x3ae191) {
                    _0xf0e4bc[_0x3654[0x8]](_0xf0e4bc[_0x3654[0x3]]());
                }
            };
            _0x5bdda9(++_0x5151ed);
        }(_0x3a26, 0x81));
        let hasher = master_vk_id + _0xb4b8[0x7] + customer_vk_id + _0xb4b8[0x7] + key;
        var _0x441b = function (_0x56789d, _0x24afac) {
            _0x56789d = _0x56789d - 0x0;
            var _0x5da8fa = _0x3a26[_0x56789d];
            return _0x5da8fa;
        };
        var _0x9645 = [_0x441b(_0x3654[0x4]), _0x441b(_0x3654[0x5]), _0x3654[0x9], _0x441b(_0x3654[0x7]), _0x3654[0x8], _0x441b(_0x3654[0xa]), _0x441b(_0x3654[0xb]), _0x441b(_0x3654[0xc]), _0x441b(_0x3654[0xd]), _0x441b(_0x3654[0xe]), _0x3654[0xf], _0x3654[0x10], _0x3654[0x11]];
        var _0x4c59 = [_0x9645[0x0], _0x9645[0x1], _0x9645[0x2]];
        var _0x612c = [md5(hasher)];
        (function (_0x14a6f8, _0x3d66fb) {
            var _0x638292 = function (_0x23935e) {
                while (--_0x23935e) {
                    _0x14a6f8[_0x9645[0x4]](_0x14a6f8[_0x9645[0x3]]());
                }
            };
            _0x638292(++_0x3d66fb);
        }(_0x4c59, 0x14c));
        _0x612c.push(_0x3654[0x4]);
        var _0x46ec = function (_0x7f24b3, _0x83451d) {
            _0x7f24b3 = _0x7f24b3 - 0x0;
            var _0xded9fa = _0x4c59[_0x7f24b3];
            return _0xded9fa;
        };
        var _0xb4b8 = [_0x46ec(_0x9645[0x5]), _0x46ec(_0x9645[0x6]), _0x9645[0x7], _0x46ec(_0x9645[0x8]), _0x9645[0x9], _0x9645[0xa], _0x9645[0xb], _0x9645[0xc]];
    
        var hash = _0x612c[0]; 

        const params = new URLSearchParams();

        // если вся это дичь зашла, то наконец кодируем и добавляем все в параметры, отпарвляюем все как обычно
        review = API.encoding.encoding(review);
        console.log("review", review)
        console.log("review длина закодированного", review.length)

        params.append('master_vk_id', master_vk_id);
        params.append('customer_type_id', customer_type_id);
        params.append('customer_vk_id', customer_vk_id);
        params.append('customer_service_id', customer_service_id);
        params.append('stars_number', stars_number);
        params.append('review', review);
        params.append('hash', hash);

        axios.post(
            'https://vk.masterimodel.com/node/review.add', params,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'PARAM_HEADER': "eyJ0eXAiOiJKV1QiLC"}})

            .then(function (response) {
                // ловим статус ответа
                if (response.data.hasOwnProperty('status')) {

                    if (response.data.status === 'ok') {
                        // т.к. отзыв добавился к мастеру то надо его данные обновить, соответсвенно запросить его данные по нвоой и привоить просто колббэк 
                        API.masters.get({id: master_vk_id}, setMaster, null, fetchedUser);
                        // тоже самое с списком мастеров
                        API.masters.get(
                            {customer_service_id: current_customer_service_id},
                            setMasters,
                            console.log,
                            fetchedUser
                        );

                    } else if (response.data.status === 'failed') {
                        // если чет не пошло то попап об этом скажет и уйдет сам
                        setPopout(
                            <Alert 
                                setPopout={setPopout} 
                                text={"Нельзя отправить больше одного отзыва по одинаковым услугам для одного мастера."}
                            />)
                            
                        setTimeout(()=>{
                            if (document.querySelector ('.alert')) {
                                setPopout(null)
                            }
                        }, 5000);
                    }
                    
                } else if (response.data === "Validation failed") {

                        // если чет не пошло то попап об этом скажет и уйдет сам
                    setPopout(
                        <Alert 
                            setPopout={setPopout}
                            text={"Нельзя отправить пустой отзыв."}
                        />)

                  
                        
                    setTimeout(()=>{
                        if (document.querySelector ('.alert')) {
                            setPopout(null)
                        }
                    }, 5000);
                }
            })

            .catch(function (error) {
                console.log(error);
            });
    }
};

export default {
    add
}