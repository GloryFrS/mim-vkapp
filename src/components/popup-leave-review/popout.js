import React from 'react';
import {ActionSheet, ActionSheetItem, CellButton} from '@vkontakte/vkui';


class Example extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popout: null
        }

        this.openSheet = this.openSheet.bind(this);
        this.periodItems = ['По дням', 'По неделям', 'По месяцам'];
    }

    componentDidMount() {
        this.openSheet()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.popout !== prevState.popout) {
            this.props.setPopout(this.state.popout)
        }
    }

    getPeriodItems() {
        return this.periodItems.map((name) => (
            <ActionSheetItem autoclose key={name}>{name}</ActionSheetItem>
        ));
    }

    openSheet () {
        let popup = (
            <ActionSheet
                onClose={() => this.setState({ popout: null })}
                title="Hi!"
                text="I am action sheet"
            >
                {this.getPeriodItems()}
                <ActionSheetItem autoclose theme="destructive">Деструктивный пункт</ActionSheetItem>
                {/*{osname === IOS && */}
                <ActionSheetItem autoclose theme="cancel">Cancel</ActionSheetItem>
                {/*}*/}
            </ActionSheet>
        );
        this.setState({ popout: popup});
    }

    render() {
        return (
            <CellButton onClick={this.openSheet}>Open Sheet</CellButton>
        )
    }
}

export default Example