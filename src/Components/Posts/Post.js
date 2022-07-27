import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import './Post.css'
import Moment from 'react-moment';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { votePost } from './PostsSlice';
import { AuthContext } from '../../utils/Authorization';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

const style = {
    height: '20px',
    color: 'white'
}

const styleUpVoted = {
    height: '20px',
    color: 'rgb(160, 212, 160)'
}

const styleDownVoted = {
    height: '20px',
    color: 'rgb(237, 167, 167)'
}

export const Post = (props) => {
    const auth = useContext(AuthContext);
    const dispatch = useDispatch();
    const post = props.post;
    const [voted, setVoted] = useState(0)
    const link = post.subreddit_name_prefixed.replace('r/', '')
    return (
        <div className="PostBox">
            <div className="LeftSide">
            <IconButton
                    onClick={() => {
                        setVoted(voted === 1 ? 0 : 1)
                        dispatch(votePost({ auth: auth, postId: post.name, direction: 1 }))
                    }}
                >
                        <ArrowCircleUpIcon style={voted === 1 ? styleUpVoted : style} />
                </IconButton>
                {post.ups + voted}
                <IconButton
                    onClick={() => {
                        setVoted(voted === -1 ? 0 : -1)
                        dispatch(votePost({ auth: auth, postId: post.name, direction: -1 }))
                    }}
                >
                    <ArrowCircleDownIcon style={voted === -1 ? styleDownVoted : style} />
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