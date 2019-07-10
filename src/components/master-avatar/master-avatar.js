import React from 'react';
import './master-avatar.css';

class MasterAvatar extends React.Component {
    render() {
        return (
            <div
                className="master-avatar "
                style={{
                    backgroundImage: `url(${this.props.url })`,
                    height: `${this.props.size}px`,
                    width:  `${this.props.size}px`,
                    backgroundPosition: '50% 50%',
                }}
            >
                {
                    this.props.is_approved &&
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12.5" cy="12.5" r="12.5" fill="#F7CFCF"/>
                        <path d="M12.3372 17.7428C11.7025 18.3776 10.6726 18.3776 10.0382 17.7428L6.47605 14.1807C5.84132 13.5462 5.84132 12.5163 6.47605 11.8818C7.11048 11.2471 8.14039 11.2471 8.77513 11.8818L10.8974 14.0039C11.0577 14.1638 11.3177 14.1638 11.4783 14.0039L17.2249 8.25715C17.8593 7.6224 18.8892 7.6224 19.5239 8.25715C19.8288 8.56196 20 8.97553 20 9.40656C20 9.83759 19.8288 10.2512 19.5239 10.556L12.3372 17.7428Z" fill="white"/>
                    </svg>
                }


            </div>
        );
    }
}

export default MasterAvatar;