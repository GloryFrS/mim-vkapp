import React   from 'react';
import './slider.css';

class Slider extends React.Component {

    // показать переданный массив
    render() {
        return (
            <div className="slider">
                <div>
                    { this.props.slidesArray }
                </div>
            </div>
        );
    }
}

export default Slider;