import React from 'react';
import './header-navigation.css';

export default class HeaderNavigation extends React.Component {

    onClick = () => {
        // нажать назад или вдйоной назад
        window.history.back();
        if (this.props.doubleClick) window.history.back();
    };

    render() {

        return (
            <div className="header-navigation">
                <div
                    className="header-navigation__button"
                    onClick={this.onClick}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0)">
                            <path d="M4.7098 9.0099L13.3095 0.410486C13.8565 -0.136822 14.7435 -0.136822 15.2903 0.410486C15.8371 0.95731 15.8371 1.8442 15.2903 2.39098L7.68085 10.0001L15.29 17.609C15.8369 18.1561 15.8369 19.0429 15.29 19.5897C14.7432 20.1368 13.8563 20.1368 13.3093 19.5897L4.70957 10.9902C4.43616 10.7166 4.29961 10.3585 4.29961 10.0002C4.29961 9.64171 4.43643 9.28331 4.7098 9.0099Z" fill="white"/>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="20" height="20" fill="white" transform="translate(20 20) rotate(180)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                <span className="header-navigation__text">{this.props.text}</span>
            </div>
        );
    }
}