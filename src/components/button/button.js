import React     from 'react';
import './button.css';

class Button extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            buttonText: this.props.buttonText,
        };
    }


    buttonOnClick = ( elementButton ) => {
        // запомнить текущий тэк
        let button = elementButton.target;

        // вернуть коллбэк если он есть
        if ( this.props.onClick ) {
            this.props.onClick( this.state.id, elementButton );
        }

        // если на кнгопку нажали 
        if (this.props.isActive) {
            // поменять ее стиль
            button.classList.add('button_theme_inactive');
            // и вернуть ее стиль через 150 мл сек
            setTimeout( function () {
                button.classList.remove('button_theme_inactive');
            }, 150);
        }

    };

    render() {
        return (
            <div
                className="button"
                onClick={this.buttonOnClick}
                style={ !this.props.isActive ? {background: '#FBCDCC'} : null }
            >
                { this.state.buttonText }
            </div>
        );
    }
}

export default Button;
