import './Post.css'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';


export const Post = (props) => {
    const post = props.post;
    const link = post.subreddit_name_prefixed.replace('r/', '')
    return (
        <div className="PostBox">
            <div className="LeftSide">
                <h5>Upvotes:</h5>
                {post.ups}
            </div>
            <div className="RightSide">
                <div className="SubredditDetails">
                    <Link
                        to={{
                            pathname: `/subreddits/${link}`,
                        }}
                    >
                        {post.subreddit_name_prefixed}
                    </Link>
                    <div>
                        <p>Posted by {post.author} {<Moment fromNow>{post.created * 1000}</Moment>}</p>
                    </div>
                </div>
                <div className='Title'>
                    {post.title}
                </div>
                <div className="Media">
                    {post.is_video &&
                        <iframe
                            title={post.name}
                            width={'100%'}
                            height={500}
                            src={post.secure_media.reddit_video.fallback_url}
                        />}
                    {!post.is_video && post.is_reddit_media_domain &&
                        <img
                            alt="Reddit Post media"
                            onError={(e) => { e.target.onerror = null; e.target.src = '' }}
                            width={'100%'}
                            src={post.url}
                        />}
                </div>
            </div>
        </div>
    )
}