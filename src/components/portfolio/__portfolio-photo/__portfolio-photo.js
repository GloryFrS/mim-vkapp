import React from 'react';
import { PopoutWrapper } from '@vkontakte/vkui';

import './__portfolio-photo.css';



class PortfolioPhoto extends React.Component {
   
    // открыть закрыть фото
    togglePhoto = () => {
            window.history.pushState(
                { foo: "/master" }, 
                window.location.pathname, 
                `${window.location.pathname}${window.location.search}#`
            );

            this.props.setPopout(
                <PopoutWrapper v="center" h="center">
                    {this.showBigPhoto}
                </PopoutWrapper>
            )
    }
    render() {
        this.showBigPhoto = (
            <div onClick={() => {
                this.props.setPopout(null);
                if (window.location.search.includes("?id")) {
                    window.history.back();
                }
            }}>
                <div className="showBigPhoto-fade"/>
                <div
                    className="showBigPhoto"
                    style={{
                        backgroundImage: `url(${decodeURI(this.props.url.toString())})`,
                        backgroundPosition: '50% 50%',
                    }}
                />
            </div>
        );

        return (
            <div
                onClick={this.togglePhoto}
                className="portfolio-photo"
                style={{
                    backgroundImage: `url(${this.props.url})`,
                    backgroundPosition: '50% 50%',
                    borderRadius: '13px',
                }}
            />
        );
    }
}

export default PortfolioPhoto;