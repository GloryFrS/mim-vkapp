import React from 'react';

import './post.css';

import PostCard from "../post-card/post-card";

export default class Post extends React.Component {

    render() {

        let commentsCounter = (
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.3086 0.617188H3.69141C1.65591 0.617188 0 2.2731 0 4.30859V10.0099C0 11.6341 1.06636 13.0488 2.61159 13.5015L4.39439 15.2845C4.49341 15.3834 4.62744 15.439 4.76738 15.439C4.90718 15.439 5.04135 15.3834 5.14023 15.2845L6.77568 13.6489H14.3086C16.3441 13.6489 18 11.993 18 9.95749V4.30859C18 2.2731 16.3441 0.617188 14.3086 0.617188ZM16.9453 9.95749C16.9453 11.4114 15.7625 12.5942 14.3086 12.5942H6.55733C6.41753 12.5942 6.28336 12.6498 6.18448 12.7487L4.76738 14.1658L3.25813 12.6566C3.19043 12.5889 3.10556 12.5408 3.01259 12.5177C1.85985 12.2308 1.05469 11.1996 1.05469 10.0099V4.30859C1.05469 2.85469 2.2375 1.67188 3.69141 1.67188H14.3086C15.7625 1.67188 16.9453 2.85469 16.9453 4.30859V9.95749Z"
                      fill="black"
                      stroke="#3F3F3F"
                      strokeWidth="0.5"
                />
            </svg>

        );

        return (
            <div
                className="post"
                style={ this.props.pink ? {background: '#FFF6F7'} : null }
            >
                <div className="row">

                    {
                        this.props.item.distance &&
                        <div className="post__master-radius">
                            <div className="row">
                                <div className="col">
                                    <span>{this.props.item.distance ? this.props.item.distance : -1}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <span>км</span>
                                </div>
                            </div>
                        </div>
                    }
                    

                    <PostCard
                        avatar_url={this.props.item.avatar_url}
                        size={75}
                        is_approved={this.props.is_approved}
                        fullName={this.props.item.full_name.split(" ")[0]}
                        starsNumber={this.props.item.stars_number}

                        label={
                            <div className="row post__reviews-number">
                                <div className="col-auto">
                                    { commentsCounter }
                                </div>
                                <div className="col-auto">
                                    <span>{ this.props.item.reviews_number }</span>
                                </div>
                            </div>
                        }
                    />

                </div>
            </div>
        );
    }
}