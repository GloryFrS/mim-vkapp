import React from 'react';
import './__star.css'

class Star extends React.Component {
    constructor ( props ) {
        super ( props );

        this.state = {
            color: this.props.color,
            id:    this.props.id
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // плменять цвет если пропсы изменились
        if ( prevProps.color !== this.props.color ) {
            this.setState({ color: this.props.color });
        }
    }

    // если коллбэк есть передать ему айди нажатой звезды
    starOnclick = () => {
        if (this.props.starOnclick)
            this.props.starOnclick ( +this.state.id )
    };

    render() {
        return (
            <div
                className="stars__star"
                onClick={ this.starOnclick }
            >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.83255 0.646214L8.23804 3.49412C8.33578 3.69219 8.52476 3.82944 8.74337 3.86116L11.8863 4.31787C12.4369 4.39793 12.6565 5.0743 12.2583 5.46239L9.98406 7.67916C9.82602 7.8333 9.75376 8.05555 9.79119 8.27312L10.328 11.4033C10.4221 11.9515 9.84656 12.3695 9.35423 12.1109L6.54323 10.6331C6.34776 10.5304 6.11407 10.5304 5.9186 10.6331L3.1076 12.1109C2.61528 12.3698 2.03977 11.9515 2.13387 11.4033L2.67064 8.27312C2.70807 8.05555 2.63581 7.8333 2.47777 7.67916L0.20355 5.46239C-0.194679 5.07404 0.0249706 4.39767 0.575524 4.31787L3.71846 3.86116C3.93707 3.82944 4.12605 3.69219 4.22379 3.49412L5.62928 0.646214C5.87519 0.147388 6.58638 0.147388 6.83255 0.646214Z"
                          fill={ this.state.color ? '#FCAF68' : '#EFEFEF' }
                    />
                </svg>
            </div>
        );
    }
}

export default Star;