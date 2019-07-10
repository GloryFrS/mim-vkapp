import React from 'react';
import Star from "./__star/__star";

class Stars extends React.Component {
    constructor ( props ) {
        super ( props );

        this.state = {
            starsNumber: this.props.starsNumber,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // если изменилось число звезд передаваемых сюда то перзеаписать их
        if (this.props.starsNumber !== prevProps.starsNumber) {
            this.setState({ starsNumber: this.props.starsNumber });
        }
    }

    // при кнажатии на звезду передать коллбэку в этот компонент и поменять состояние 
    starOnclick = ( id ) => {
        this.setState({ starsNumber: id });
        this.props.starOnclick ( id );
    };

    render() {
        let starsArray = [ 1, 2, 3, 4, 5 ];

        return (
            <div style={{ display: 'flex' }}>
                {
                    starsArray.map( ( item, i ) =>
                        <Star
                            key={ i + 1 }
                            id= { i + 1 }
                            color={ i < this.state.starsNumber }
                            starOnclick={ this.props.starOnclick ? this.starOnclick : null }
                        />
                    )
                }
            </div>
        );
    }
}

export default Stars;