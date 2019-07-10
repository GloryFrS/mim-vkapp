import React   from 'react';
import Review from "./__review/__review";
import Slider from "../slider/slider";

import './reviews.css';

class Reviews extends React.Component {

    render() {
        // если отзывы есть
        if (
            this.props.reviews &&

            this.props.reviews.hasOwnProperty('number') &&
            typeof this.props.reviews.number === 'number'  &&
            this.props.reviews.number > 0                  &&

            this.props.reviews.hasOwnProperty("reviewers") &&
            Array.isArray(this.props.reviews.reviewers)       &&
            this.props.reviews.reviewers.length > 0
        ) {
            // то формируем слайды их

            let slides = (
                this.props.reviews.reviewers.map( ( item, i ) =>
                    <Review
                        key={i}
                        review={item}
                    />
                )
            );

            return (
                <div className="reviews">
                    <div className=" reviews__header">
                        <div className="">
                            <span>Отзывы</span>
                        </div>
                    </div>

                    <Slider
                        slidesArray = {slides}
                    />
                </div>
            );

        } else {
            return (
                <div className="container reviews">
                    <div className="row reviews__header reviews__header_no-reviews">
                        <div className="col">
                            <span>Отзывов пока нет</span>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default Reviews;