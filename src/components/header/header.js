import React from 'react';
import './header.css';

export default class Header extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            height: 0
        }
    }

    componentDidMount() {
        // получаем высоту хедера
        let height = document.querySelector('.View__header');
        // если она получена то установить ее
        if (height) {
            this.setState({height: height.clientHeight})
        }
    }

    render() {
        return (
            <div className="header" >
                <div className='header__header-ellipse'/>
            </div>
        );
    }
}