import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import './Post.css'
import Moment from 'react-moment';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { votePost } from './PostsSlice';
import { AuthContext } from '../../utils/Authorization';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';



export const Post = (props) => {
    const auth = useContext(AuthContext)
    const post = props.post;
    const dispatch = useDispatch();
    const link = post.subreddit_name_prefixed.replace('r/', '')
    return (
        <div className="PostBox">
            <div className="LeftSide">
                <IconButton
                    onClick={() => {
                        dispatch(votePost({ auth: auth, postId: post.name, direction: 1 }))
                    }}
                >
                    <ArrowCircleUpIcon className="VoteButton"
                    />
                </IconButton>
                {post.ups}
                <IconButton
                    onClick={() => dispatch(votePost({ auth: auth, postId: post.name, direction: -1 }))}
                >
                    <ArrowCircleDownIcon className="VoteButton" />
                </IconButton>
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
                            width={'100%'}
                            height={500}
                            src={post.secure_media.reddit_video.fallback_url}
                        />}
                    {!post.is_video && post.is_reddit_media_domain &&
                        <img
                            onError={(e) => { e.target.onerror = null; e.target.src = '' }}
                            width={'100%'}
                            src={post.url}
                        />}
                </div>
            </div>
        </div>
    )
}