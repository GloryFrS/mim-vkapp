import React       from 'react';
import PostCard from "../../post-card/post-card";
import './__review.css';

class Review extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    // this.props.review.reviewer_vk_id:
    render() {
        return (
            <div className="container review">

                <PostCard
                    avatar_url={this.props.review.customer_avatar_url}
                    size={53}
                    is_approved={false}
                    fullName={this.props.review.full_name}
                    starsNumber={this.props.review.stars_number}
                    label={this.props.review.label}

                />

                <div className="row review__post">
                    <div className="col">
                         <span>
                             {this.props.review.review}
                         </span>
                    </div>
                </div>

            </div>
        );
    }
}

export default Review;