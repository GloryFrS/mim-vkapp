import React from 'react';

import './portfolio.css';

import Slider from "../slider/slider";
import PortfolioPhoto from "./__portfolio-photo/__portfolio-photo";

class Portfolio extends React.Component {

    render() {
        // формируем слайды
        let slides = [];
        if (Array.isArray(this.props.portfolio) && this.props.portfolio.length > 0) {
            slides = (
                this.props.portfolio.map( ( item, i ) =>
                    <PortfolioPhoto
                        key={i + item}
                        url={item}
                        setPopout={this.props.setPopout}
                    />
                )
            );
        }


        // если соайдов нет то информируем
        if (slides.length <= 0) return (
            <div className="container portfolio">
                <div className="container portfolio__header font-size-24 line-height-36 font-weight-500">
                    <div className="row">
                        <div className="col">
                            <span>Портфолио пока пусто</span>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="container portfolio">
                <div className="container portfolio__header font-size-24 line-height-36 font-weight-500">
                    <div className="row">
                        <div className="col">
                            <span>Портфолио</span>
                        </div>
                    </div>
                </div>

                <Slider
                    slidesArray = {slides}
                />
            </div>
        );
    }
}
export default Portfolio;