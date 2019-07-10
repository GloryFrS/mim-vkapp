/**
 *  так ну тут просто обычные фильтры которые селекты открываются
 * @type {{show_drop_downList: boolean, options: *[], selected_option: {id: number, label: string, radius: number}}}
 */

const radius = {
    selected_option:
        {id: 6, radius: 99999999999999999999999999999999999999999999999999, label: "Вся карта"},

    options: [
        {id: 0, radius: 1000,   label: "1 км"},
        {id: 1, radius: 3000,   label: "3 км"},
        {id: 2, radius: 5000,   label: "5 км"},
        {id: 3, radius: 10000,  label: "10 км"},
        {id: 4, radius: 50000,  label: "50 км"},
        {id: 5, radius: 100000, label: "100 км"},
        {id: 6, radius: 99999999999999999999999999999999999999999999999999, label: "Вся карта"},
    ],

    show_drop_downList: false,
};

const sortType = {
    selected_option:
        {id: 0, sort: "stars", label: "Рейтингу"},

    options: [
        {id: 0, sort: "stars", label: "Рейтингу"},
        {id: 1, sort: "price", label: "Цене"},
        {id: 2, sort: "coordinates", label: "Удаленности"},
    ],

    show_drop_downList: false,
};

const sortType2 = {
    selected_option:
        {id: 0, sort: "stars", label: "Рейтингу"},

    options: [
        {id: 0, sort: "stars", label: "Рейтингу"},
        {id: 1, sort: "price", label: "Цене"},
    ],

    show_drop_downList: false,
};

export default {
    radius,
    sortType,
    sortType2,
};
