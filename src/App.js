import React, { Component } from 'react';
import {Route, Redirect}  from 'react-router-dom';
import {platform, IOS, Root, View, Panel} from '@vkontakte/vkui';

/**
 *  Components:
 */

// Страница 1
import ScreenOne    from "./components/screen-1/screen-one";
// Страница 2
import ScreenTwo    from "./components/screen-2/screen-two";
// Страница 3
import ScreenThree  from "./components/screen-3/screen-three";
// Страница 4
import ScreenFour   from "./components/screen-4/screen-four";
// Страница Загрузки
import loading      from "./components/loading/loading";

import API from './API/API';
// Нужна для определения платформы
const osname = platform();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // для определения онлайн ли человек
            online:            true,

            // для определения текущей страницы
            activePanel:       '/',

            // данные пользователя Вк
            fetchedUser:       null,

            // тип селекта для 1 страницы
            customerTypes:     null,
            // тип селекта для 2 страницы
            customerServices:  null,

            // количество мастеров
            mastersCount:      0,
            // массив мастеров
            masters:           null,
            // данные мастера
            master:            null,


            searchFilterRadius:   API.searchFilters.radius,
            searchFilterSortType: API.searchFilters.sortType,
            searchFilterSortType2: API.searchFilters.sortType2,

            // карта или список
            currentTab:        1,
            // число скролла
            tab1scroll:        0,

            // для сервера
            regs:               true,

            // текущее вспл окно
            popout: null,

            // цена от
            priceFrom: null,
            // цена до
            priceTo:   null,
        };
    }

    // ниже просто сеттеры для изменения стэйта
    setPriceFrom = (value)    => this.setState({priceFrom: value});
    setPriceTo   = (value)    => this.setState({priceTo: value});

    setPopout = (popout) => {
        // alert("setPopout")
        this.setState({popout: popout});
    }
    toggleTabs = (newTab) => {
        // alert("toggleTabs")
        this.setState({currentTab: newTab});
    }
    setTab1scroll = (newTab) => {
        // alert("toggleTabs")
        this.setState({tab1scroll: newTab});
    }

    regs = () => {
        // alert("regs")
        this.setState({regs: false});
    }
    setFetchedUser      = (fetchedUserData) => {
        // alert("setFetchedUser")
        this.setState({fetchedUser: fetchedUserData});
    }

    setCoordinates = (coordinates) => {
        if (coordinates.hasOwnProperty('lat')) {
            // alert("setCoordinates")
            let user = {...this.state.fetchedUser};
            user.coordinates = {lat: coordinates.lat, lng: coordinates.long};
            this.setFetchedUser(user);

            API.masters.get(
                {customer_service_id: this.state.customerServices.selected_option.id},
                this.setMasters,
                this.setMastersCount,
                user
            );
        }
    };

    setCustomerTypes        = (preparedSelect) => {
        // alert("setCustomerTypes")
        this.setState({customerTypes:    preparedSelect});
        
        this.setMasters(null);
        this.setMastersCount(0);
        
        API.customerServices.get(
            preparedSelect.selected_option.id,
            this.setCustomerServices,
            null
        );
        console.log(preparedSelect)
    }

    setCustomerServices     = (preparedSelect) => {
        // alert("setCustomerServices")
        this.setState({customerServices: preparedSelect});

        API.masters.get(
            {customer_service_id: preparedSelect.selected_option.id},
            this.setMasters,
            this.setMastersCount,
            this.state.fetchedUser
        );

    }

    setSearchFilterRadius   = (preparedSelect) => {
        // alert("setSearchFilterRadius")
        this.setState({searchFilterRadius:   preparedSelect});
    }

    setSearchFilterSortType = (preparedSelect) => {
        // alert("setSearchFilterSortType")
        this.setState({searchFilterSortType: preparedSelect});
    }

    setSearchFilterSortType2 = (preparedSelect) => {
        // alert("setSearchFilterSortType2")
        this.setState({searchFilterSortType2: preparedSelect});
    }

    setMastersCount = (count)   => {
        // alert("setMastersCount")
        this.setState({mastersCount: count});
    }

    setMasters      = (masters) => {
        // alert("setMasters")
        this.setState({masters: masters});
    }

    setMaster       = (master)  => {
        // alert("setMaster")        
        this.setState({master: master});
    };

    setMasterServices = (masterServices) => {
        // alert("setMasterServices")
        let master = {...this.state.master};
        master.masterServices = masterServices;
        this.setMaster(master);
    };

    setOnline = (boolean) => {
        this.setState ({online: boolean});
    }
    componentDidMount() {
        // вещаем лисенеры для реагирвоания на отсутсвие инета
        window.addEventListener("offline", () => this.setOnline (false))
        window.addEventListener("online",  () => this.setOnline (true))   

        // сверяемся с адресом
        if (this.state.activePanel !== window.location.pathname) {
            this.setState({activePanel: window.location.pathname})
        }

        // Меняем внешний вид статус бара
        API.setViewSettings();

        /**
         * При входе в приложение нужно запросить
         * 1. Данные пользователя
         * 2. "Для кого пользователь ищет мастера"
         */

        API.fetchUser( this.setFetchedUser );
        API.customerTypes.get ( this.setCustomerTypes );

        // при нажатии "назад"
        window.onpopstate = () => {
            // подгоняем текущую стр под url
            this.setState({ activePanel: window.location.pathname });


            switch (window.location.pathname) {

                case '/screen-3':

                    if (this.state.currentTab === 1) {
                        // проматываем страницу до последнего запомненного положения
                        document.querySelector('.screen-three').scrollTo({ top: this.state.tab1scroll, behavior: 'instant' });
                    }
    
                    // обнуляем вспл окно и данные мастера
                    this.setPopout(null);
                    this.setMaster(null);

                    break;

                case '/screen-2':

                    if (this.state.customerTypes) {
                        // обновляем счетчик мастеров
                        this.setMastersCount (this.state.masters.length)
                    }

                    break;

                case '/master':

                    // Если this.search есть 
                    if (this.search) {
                        // обнуляем его, все обнуляем
                        this.search = null;
                        window.history.pushState({ foo: "/" }, "/", "/");
                        this.setState({ activePanel: "/" });
                        this.setPopout(null);
                        this.setMaster(null);
                    }

                    // определяем по ссылке ли был переход
                    if (window.location.search.includes("?id")) {
                        this.setPopout(null);
                    }


                    break;

                default:
                    break;

            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        // ниже по мере получения данных - запрашиваем следующие данные
        switch (window.location.pathname) {
            case '/':
                // alert (this.state.activePanel)
                if (!this.setFetchedUser) {
                    API.fetchUser( this.setFetchedUser );
                    API.customerTypes.get ( this.setCustomerTypes );
                }
                
                break;

            case '/screen-2':
                    // alert (this.state.activePanel)
                
                if (!this.setFetchedUser && !this.state.customerTypes) {
                    API.customerTypes.get ( this.setCustomerTypes );
                
                } else if (!this.state.customerServices && this.state.customerTypes) {
                    
                    API.customerServices.get(
                        this.state.customerTypes.selected_option.id,
                        this.setCustomerServices,
                        null);
                
                }

                if (this.state.currentTab === 2) {
                    this.setState({currentTab: 1});
                }

                break;

            case '/screen-3':
                    // alert (this.state.activePanel)
                
                if (this.state.fetchedUser && this.state.regs) {

                    API.reg(this.state.fetchedUser.id);
                    this.regs();
               
                } else if (!this.state.customerServices && this.state.customerTypes) {
                    
                    API.customerServices.get(
                        this.state.customerTypes.selected_option.id,
                        this.setCustomerServices,
                        null);
                
                } else if (this.state.customerTypes && this.state.customerServices && !this.state.masters) {

                    API.masters.get(
                        {customer_service_id: this.state.customerServices.selected_option.id},
                        this.setMasters,
                        this.setMastersCount,
                        this.state.fetchedUser
                    );
                }

                break;    

            case '/master':
                console.log (this.state.fetchedUser)
                
                if (!this.state.master && this.state.fetchedUser) {
                    
                    if (window.location.search.indexOf('id') !== -1) {

                        let id = parseInt(window.location.search.replace(/\D+/g,""));
                        console.log(id);
                        API.masters.get (
                            {id: +id},
                            this.setMaster,
                            null,
                            this.state.fetchedUser
                        );
        
                    }

                } else if (this.state.master && !this.state.master.hasOwnProperty('masterServices')) {
                
                    API.mastersServices.get(this.state.master[0].vk_id, this.setMasterServices);
                
                } else if (!this.state.customerServices && this.state.customerTypes) {
                    
                    API.customerServices.get(
                        this.state.customerTypes.selected_option.id,
                        this.setCustomerServices,
                        null);
                
                }

                break;
        
            default:
                break;
        }

    }

    // пере
    go = (e, href) => {
        if (e)    this.setState({ activePanel: e.currentTarget.dataset.to });
        if (href) {
            window.history.pushState({ foo: "/master" }, "/master", href);
            this.setState({ activePanel: "/master" });
        }
    }

    
    render() {
        // if ( !(this.state.fetchedUser && this.state.customerTypes) ) return loading();
        //window.location.href.substr(href + 1)}/>

        // вот тут мы определяем был ли переход по ссылке или нет
        let hrefIndex = window.location.href.indexOf('#master');
        let search = '';
        
        if (hrefIndex !== -1 && this.state.activePanel !== "/master") {
            search = window.location.href.substr(hrefIndex + 7);
            if (search.includes('%3F')) {
                search = search.replace('%3F', '?');
            }

            // запоминаем поиск
            this.search = search;
            this.setState({ activePanel: "/master" });
        }

        if (!this.state.online) {
            return loading ("disconnected");
        }

        // ниже просто вьюшик как в вкашной документации и роуты - маршруты
        return (
            <div className="App">

                <Root activeView="main">
                    <View id="main" activePanel={this.state.activePanel} popout={this.state.popout}>

                        <Panel id="/">
                            <Route exact path='/'
                                   render={ props => 
                                    hrefIndex && this.state.activePanel === "/master" ? 
                                   <Redirect
                                        to={{
                                            pathname: `/master`,
                                            search: search,
                                        }}
                                        search      = {this.search}

                                        /> :
                                       <ScreenOne
                                           go                  = {this.go}
                                           fetchedUser         = {this.state.fetchedUser}

                                           customerTypes       = {this.state.customerTypes}

                                           setCustomerTypes    = {this.setCustomerTypes}
                                           setCustomerServices = {this.setCustomerServices}
                                           setMastersCount     = {this.setMastersCount}
                                       />
                                   }
                            />
                        </Panel>

                        <Panel id="/screen-2">
                            <Route exact path='/screen-2'
                                   render={ props =>
                                       <ScreenTwo
                                           osname              = {osname}
                                           go                  = {this.go}

                                           fetchedUser         = {this.state.fetchedUser}

                                           mastersCount        = {this.state.mastersCount}

                                           customerTypes       = {this.state.customerTypes}
                                           customerServices    = {this.state.customerServices}

                                           setCustomerServices = {this.setCustomerServices}
                                           setMastersCount     = {this.setMastersCount}
                                           setMasters          = {this.setMasters}
                                       />
                                   }
                            />
                        </Panel>

                        <Panel id="/screen-3">
                            <Route exact path='/screen-3'
                                   render={ props =>
                                        this.state.activePanel === "/master" ? <Redirect to='/master'/> :
                                            <ScreenThree
                                                tab1scroll           = {this.state.tab1scroll}
                                                setTab1scroll        = {this.setTab1scroll}
                                                osname               = {osname}
                                                IOS                  = {osname === IOS}
                                                go                   = {this.go}

                                                fetchedUser          = {this.state.fetchedUser}

                                                customerTypes        = {this.state.customerTypes}
                                                customerServices     = {this.state.customerServices}

                                                setCustomerServices  = {this.setCustomerServices}

                                                masters              = {this.state.masters}
                                                mastersCount         = {this.state.mastersCount}

                                                setMaster            = {this.setMaster}
                                                setMasters           = {this.setMasters}
                                                setMastersCount      = {this.setMastersCount}

                                                searchFilterRadius      = {this.state.searchFilterRadius}
                                                searchFilterSortType    = {this.state.searchFilterSortType}
                                                searchFilterSortType2    = {this.state.searchFilterSortType2}

                                                priceFrom   = {this.state.priceFrom}
                                                priceTo     = {this.state.priceTo}
                                                setPriceFrom  = {this.setPriceFrom}
                                                setPriceTo    = {this.setPriceTo}

                                                setSearchFilterRadius   = {this.setSearchFilterRadius}
                                                setSearchFilterSortType = {this.setSearchFilterSortType}
                                                setSearchFilterSortType2 = {this.setSearchFilterSortType2}

                                                currentTab = {this.state.currentTab}
                                                toggleTabs = {this.toggleTabs}

                                                // regs  = {this.state.regs}
                                                // regsf = {this.regs}

                                                setCoordinates = {this.setCoordinates}
                                            />
                                   }
                            />
                        </Panel>

                        <Panel id="/master">
                            <Route exact path='/master'
                                   render={ props =>
                                        this.state.activePanel === "/" ? 
                                        <Redirect
                                            to={{pathname: `/`}}
                                        /> :
                                       <ScreenFour
                                           go          = {this.go}
                                           osname      = {osname}
                                           fetchedUser = { this.state.fetchedUser }

                                           customerTypes    = {this.state.customerTypes}
                                           customerServices = {this.state.customerServices}

                                           master      = {this.state.master}
                                           setMaster   = {this.setMaster}
                                           setMasters  = {this.setMasters}
                                           currentTab  = {this.state.currentTab}

                                           setPopout   = {this.setPopout}
                                       
                                           search      = {this.search}
                                       />
                                   }
                            />
                        </Panel>

                    </View>
                </Root>

                {/*<Switch location={this.props.location} >*/}
                {/*</Switch>*/}
            </div>
        );
    }

    // fetchedUserDataSet  = ( fetchedUserData ) => this.setState({ fetchedUser: fetchedUserData });
    //
    // customerTypesSet    = ( preparedArray ) => this.setState({ customerTypes: preparedArray });
    // customerServicesSet = ( preparedArray ) => this.setState({ customerServices: preparedArray });
    //
    // mastersCountSet     = ( count )         => this.setState({ mastersCount: count });
    // mastersSet          = ( preparedArray ) => this.setState({ masters: preparedArray });
    // masterSet           = ( masterObject )  => this.setState({ master: masterObject });
    //
    // searchFiltersRadiusSet   = ( searchFilters ) => this.setState({ searchFilterRadius: searchFilters });
    // searchFiltersSortTypeSet = ( searchFilters ) => this.setState({ searchFilterSortType: searchFilters });
    //
}

export default App;
