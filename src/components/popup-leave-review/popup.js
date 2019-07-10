import React from 'react';
import {Alert, PopoutWrapper} from '@vkontakte/vkui';
import Button from "../button/button";

import './popup.css';
import API from "../../API/API";
import CustomSelect from "../custom-select/custom-select";
import customerArraysPrepare from "../../functions/customerArraysPrepare";
import Stars from "../stars/stars";


class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popout: null,
            stars_number: 1,
            select: null,
        };

        this.openDefault = this.openDefault.bind(this);
        this.closePopout = this.closePopout.bind(this);
    }

    setStars  = (starsNumber) => this.setState({ stars_number: starsNumber });
    setSelect = (select) => {
        console.log(select)
        this.setState({ select: select });
    }

    /*


<PopoutWrapper v="center" h="center">
  Some content
</PopoutWrapper>
*/
    openDefault ( a, e) {
        console.log(a, e)
        let select = this.state.select;

        if (select && this.props.customerTypes.selected_option.id) {
            select.options = select.options
            .filter(item => item.customer_types_id === this.props.customerTypes.selected_option.id);
        }

        this.setState({ popout:
                <PopoutWrapper v="center" h="center">

                    <div className="popup">
                        <button type="button" className="close" onClick={this.closePopout}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        
                        <div className="popup__header">
                            <div><span>Отзыв о мастере</span></div>
                            <div><span>“{this.props.master[0].full_name}”</span></div>
                        </div>

                        <div className="popup__body">

                            <div className="">
                                    {
                                        select &&
                                        <CustomSelect
                                            select={select}
                                            callbackUpdateSelect={this.setSelect}
                                            disabled={select.options.length === 1}
                                            popout={true}
                                        />
                                    }
                            </div>

                            <div>
                                <div className="popup__header_stars">
                                        <span>Кол-во звёзд</span>
                                </div>
                                <div className="popup__block_stars">
                                        <Stars
                                            starsNumber={ this.state.stars_number }
                                            starOnclick={ this.setStars }
                                        />
                                </div>
                            </div>

                            <div className="popup__block_textarea">
                                    <textarea
                                        id={"review"}
                                        className="popup__textarea"
                                        placeholder="Напишите что-нибудь..."
                                    />
                            </div>

                        </div>

                        <div className="popup__footer">
                            <Button
                                buttonText='Оставить отзыв'
                                isActive={ true }
                                onClick={this.send}
                            />
                        </div>
                    </div>
                </PopoutWrapper>
        });


        window.onclick = (e) => {
          if (e.target.hasAttribute('class')) {
              const value = e.target.getAttribute('class');

              if (value === 'PopoutWrapper__container' || value === 'popout__button close') {
                  this.setState({ popout: null });
                  window.onclick = null;
              }
          }
        }


    }

    closePopout () {
        this.setState({ popout: null });
    }

    send = () => {
        let review = document.querySelector('#review');

        // alert( this.state.select)
        // alert( this.props.customerServices)
        API.review.add(
            this.props.fetchedUser.id,
            this.props.master[0].vk_id,
            this.state.select.selected_option.customer_types_id,
            this.state.select.selected_option.customer_services_id,
            this.state.stars_number,
            review.value,
            this.props.setMaster,
            this.props.setMasters,
            this.props.fetchedUser,
            this.props.customerServices.selected_option.id,
            this.props.setPopout
        );

        review.value = '';
        this.closePopout();
    };

    render() {
        if (this.props.master) {
            // if (this.state.stars_number === 1) {
            //     this.setState({stars_number: 1});
            //     this.setStars (this.props.master[0].stars_number);
            // }

            if (!this.state.select && this.props.master.hasOwnProperty('masterServices') && Array.isArray (this.props.master.masterServices)) {
                console.log(customerArraysPrepare(this.props.master.masterServices))
                this.setSelect (customerArraysPrepare(this.props.master.masterServices))
            }
        }

        return (
            <div>
                <Button
                    buttonText='Оставить отзыв'
                    onClick={this.openDefault}
                    isActive={ true }
                />
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.popout !== prevState.popout) {
            this.props.setPopout(this.state.popout);
        }

        // if (prevState.select && this.state.select !== prevState.select) {
        //     // this.closePopout();
        //     // setTimeout(this.openDefault)

        //     let select   = document.querySelector('.custom-select');

        //     if (select) {
        //         // Напрямую меняем выбранную опцию:
        //         let selectedOption = select.firstChild;
        //         let dropDownList = select.lastChild.childNodes;

        //         selectedOption.innerHTML = this.state.select.selected_option.customer_services_label;

        //         // Далее надо напрямую изменить подцветку
        //         for (let i = 0; i < dropDownList.length; i++) {

        //             if (dropDownList[i].hasAttribute('style')) {
        //                 let value = dropDownList[i].getAttribute('style');
        //                 dropDownList[i].removeAttribute('style');

        //                 for (let j = 0; j < dropDownList.length; j++) {

        //                     if (dropDownList[j].innerHTML === selectedOption.innerHTML) {
        //                         dropDownList[j].setAttribute('style', value);
        //                         break;
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }

}

export default Popup
