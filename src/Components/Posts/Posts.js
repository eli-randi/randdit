import { AuthContext } from "../../utils/Authorization";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, loadMorePosts } from "./PostsSlice";
import { selectPosts } from "./PostsSlice";
import { Post } from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import './Posts.css'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

const style = {
    height: '20px',
    color: '#4D487E'
}

export const Posts = (props) => {
    const auth = useContext(AuthContext);
    const dispatch = useDispatch();
    const basePath = props.path || ''
    const [pathSuffix, setPathSuffix] = useState(props.path ? '' : '/best')
    const path = basePath + pathSuffix


    useEffect(() => {
        dispatch(getPosts({auth: auth, path: path}))
    }, [path])

    
    const fetchMoreData = (lastPost) => {
        setTimeout(() => {
            const after = lastPost['name']
            dispatch(loadMorePosts({auth: auth, after: after, path: path}))
        }, 1000);
      };

    const PostsList = () => {
        const posts = useSelector(selectPosts);
        console.log(posts)
            return (
                <div>
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={() => fetchMoreData(posts.at(-1))}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        style={{'overflow': false}}
                    >
                        {posts.map((post, index) => (
                            <Post 
                            post = {post}
                            key = {index}
                            />
                        ))}
                    </InfiniteScroll>
                </div>
           )
    }

    return (
        <div className="PostsBox">
            <div className="PostsChooseBox">
                {!props.path ? <button onClick={() => setPathSuffix('/best')}><RocketLaunchIcon style={style}/> Best </button> : null}
                <button onClick={() => setPathSuffix('/hot')}><WhatshotIcon style={style}/> Hot </button>
                <button onClick={() => setPathSuffix('/new')}><AutoAwesomeOutlinedIcon style={style}/> New</button>
                <button onClick={() => setPathSuffix('/top')}><ArrowUpwardRoundedIcon style={style}/> Top</button>
            </div>
            <div className="PostsList">
                <PostsList />
            </div>
        </div>
    )
}
