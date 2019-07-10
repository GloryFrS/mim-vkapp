import React, {Component} from 'react';
import Button from "../button/button";
import $      from "jquery";

import './popup-leave-review.css';

import CustomSelect from "../custom-select/custom-select";
import Stars from "../stars/stars";
import API from "../../API/API";
import customerArraysPrepare from "../../functions/customerArraysPrepare";
import { PopoutWrapper } from '@vkontakte/vkui';

class PopupLeaveReview extends Component {
    constructor ( props ) {
        super ( props );

        this.state = {
            stars_number: -1,
            select: null,
            /**
             master_vk_id: 1
             customer_type_id: 1
             customer_vk_id: 2
             customer_service_id: 2
             stars_number: 3.5
             review:       "какой то текстаманаа"
             */

        }
    }

    setStars = (starsNumber) => {
        this.setState({ stars_number: starsNumber });
    };

    setSelect = (select) => this.setState({ select: select });

    foo = () => {
        $('#exampleModal').modal('toggle');
        // this.props.setPopout(
        //
        // )
    };

    send = () => {
        let review = document.querySelector('#review');

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
            this.props.customerServices.selected_option.id
        );

        review.value = '';
        this.foo();
    };

    render() {
        if (this.props.master) {
            if (this.state.stars_number === -1) {
                this.setStars (this.props.master[0].stars_number);
            }

            if (!this.state.select && this.props.master.hasOwnProperty('masterServices') && Array.isArray (this.props.master.masterServices)) {
                this.setSelect (customerArraysPrepare(this.props.master.masterServices))
            }
        }

        let popup = (
            <div className="modal modal-open" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">

                            <div className="modal-title text-center" id="exampleModalLabel">
                                    <span
                                        className="modal-title popup-leave-review__title_header"
                                        id="exampleModalLabel"
                                    > Отзыв о мастере </span>
                                <span
                                    className="modal-title popup-leave-review__title_name"
                                >
                                        “{ this.props.master[0].full_name }”
                                    </span>
                            </div>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="row">
                                <div className="col">
                                    {
                                        this.state.select &&
                                        <CustomSelect
                                            select={this.state.select}
                                            callbackUpdateSelect={this.setSelect}
                                        />
                                    }
                                </div>
                            </div>

                                <div className="container ">
                                    <div className="row popup-leave-review__header_stars">
                                        <div className="col">
                                            <span>Кол-во звёзд</span>
                                        </div>
                                    </div>
                                    <div className="row popup-leave-review__block_stars">
                                        <div className="col">
                                            <Stars
                                                starsNumber={ this.state.stars_number }
                                                starOnclick={ this.setStars }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="popup-leave-review__block_textarea">
                                        <textarea
                                            id={"review"}
                                            className="popup-leave-review__textarea"
                                            placeholder="Напишите что-нибудь..."
                                        />
                                </div>


                            </div>
                        <div className="modal-footer">
                            <Button
                                buttonText='Оставить отзыв'
                                isActive={ true }
                                onClick={this.send}
                            />
                        </div>
                    </div>
                </div>
            </div>

        );

        return (
            <div className="popup-leave-review">
                <Button
                    buttonText='Оставить отзыв'
                    onClick={this.foo}
                    isActive={ true }
                />

                {popup}
            </div>
        );
    }
}
export default PopupLeaveReview;