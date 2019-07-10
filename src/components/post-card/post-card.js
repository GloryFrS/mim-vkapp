import React from 'react';
import './post-card.css';
import MasterAvatar from "../master-avatar/master-avatar";
import Stars from "../stars/stars";

export default class PostCard extends React.Component {

    render() {
        return (
            <div className="post-card">

                <div className="row">

                    <div className="col-auto post-card__master-avatar">
                        <MasterAvatar
                            url={this.props.avatar_url}
                            size={this.props.size}
                            is_approved={this.props.is_approved === 1}
                        />
                    </div>

                    <div className="col-auto post-card__master-data">

                        <div className="row post-card__master-fullName">
                            <div className="col-auto">
                                <span>{ this.props.fullName }</span>
                            </div>
                        </div>

                        <div className="row post-card__stars-number">
                            <div className="col-auto">
                                <Stars starsNumber={this.props.starsNumber} />
                            </div>
                        </div>

                        <div className=" row post-card__props">
                            <div className="">
                                {this.props.label}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}