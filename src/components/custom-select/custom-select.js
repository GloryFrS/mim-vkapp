import React, { Component } from 'react';
import './custom-select.css';
import API from '../../API/API';


class CustomSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            select: this.props.select,
            small:  false
        };
    }

    componentDidMount () {
        if (window.outerWidth <= 365) {
            this.setState({small: true});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // если селект изменился
        if (
            prevProps.select && this.props.select  &&
            prevProps.select !== this.props.select &&
            prevProps.select.options.length  === 2 &&
            this.props.select.options.length === 3
        ) {
            this.setState({select:  this.props.select})
        }
    }

    render() {
        // если нету выбранной опции
        if (!(this.state.select && this.state.select.selected_option)) 
            return <div className="font-size-normal">Нет услуг, выберите другой тип..</div>;

            // выпадающий список форимируем 
        let dropDownList = this.state.select.options.map( (option, index) =>

                <li
                    key={index + option.label}
                    className="custom-select__option"
                    onClick={ (e) => this.selectOption ( option, e ) }
                    style={ this.state.select.selected_option.id === option.id ? {color: 'rgb(254, 144, 142)'} : {} }
                >
                    {option.label}
                </li>
            );

            // кнопочка выпадающего списка тут меняется ее стиль - поворот на 180
        let dropdownButton = (
            <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"
                 style={{transform: this.state.select.show_drop_downList ? "rotate(180deg)" : ''}}>
                <path d="M6.75743 8.46765L0.307868 2.01788C-0.102614 1.60759 -0.102613 0.94239 0.307868 0.532306C0.717984 0.122188 1.38315 0.122188 1.79324 0.532306L7.50011 6.23936L13.2068 0.532472C13.6171 0.122355 14.2822 0.122355 14.6923 0.532472C15.1026 0.94259 15.1026 1.60776 14.6923 2.01804L8.24263 8.46782C8.03747 8.67288 7.76887 8.77529 7.50014 8.77529C7.23128 8.77529 6.96248 8.67268 6.75743 8.46765Z"
                      fill={ 'rgb(254, 144, 142)' }
                />
            </svg>
        );

        return (
            <div className={this.props.disabled ? 'custom-select disabled-select' : 'custom-select'}
                 onClick={this.props.disabled ? ()=>{
                     if (!this.props.popout) {
                        API.fetchUserCoordinates(this.props.setCoordinates ? this.props.setCoordinates : null)} 
                     }
                     : 
                     this.toggleDropDownList}
            >
                <div className='custom-select__selected-option'>
                    {this.state.select.selected_option.label}
                </div>
                <div className="custom-select__drop-down-button">
                    {dropdownButton}
                </div>

                <ul
                    className="custom-select__drop-down-list"
                    style={{ 
                        display: ( this.state.select.show_drop_downList ? 'block' : 'none'),
                        maxHeight: this.state.small                                    ? 
                        `${26 * ((Math.floor(window.outerHeight / 2.5 / 36))) + 16}px` :
                        `${36 * ((Math.floor(window.outerHeight / 2.5 / 36))) + 18}px`
                    }}
                >
                    {dropDownList}
                </ul>

            </div>
        );
    }

    // открыть закрыть список
    toggleDropDownList = (e) => {
        if (e) e.stopPropagation();

        let select = {...this.state.select};
        select.show_drop_downList = !this.state.select.show_drop_downList;

        if (select.show_drop_downList) {
            window.document.addEventListener("click", this.compareClassName);
        }

        this.setState({ select: select });
    };

    // удалить солушателя и щакрыть выпадабющий списко
    compareClassName = (e) => {
        console.log(e.target.className)
        if (e) e.stopPropagation();

        if (e.target.className !== 'custom-select__selected-option' && e.target.className !== 'custom-select__option') {
            window.document.removeEventListener("click", this.compareClassName);
            this.toggleDropDownList();
        }
    };

    // выбрать опцию
    selectOption = ( selectedOption, e ) => {
        e.stopPropagation();
        // удалиьт список
        window.document.removeEventListener("click", this.compareClassName);

        const select = {
            selected_option: {...selectedOption},
            options: [...this.state.select.options.map( item => {
                 item = {...item};
                 return item;
                  })],
            show_drop_downList: false,
        };

        this.setState({ select: select });


        if ( this.props.callbackUpdateSelect )
            this.props.callbackUpdateSelect ( select );

    };
}

export default CustomSelect;
