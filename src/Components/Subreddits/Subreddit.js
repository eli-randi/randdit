import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Skeleton } from "@mui/material";

import { getSubreddits, getSubredditsFollowed, selectSubredditsLoading, selectSubreddits, selectSubredditsFollowed, followSubreddit, unfollowSubreddit } from "./SubredditSlice";
import { AuthContext } from "../../utils/Authorization";
import SubredditDefault from '../../Assets/Subreddit_default.png'

import './Subreddit.css'

export const Subreddit = () => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const subredditsFollowed = useSelector(selectSubredditsFollowed)
  const subredditsLoading = useSelector(selectSubredditsLoading)
  const subreddits = useSelector(selectSubreddits);

  useEffect(() => {
    dispatch(getSubreddits(auth));
    dispatch(getSubredditsFollowed(auth))
  }, [dispatch, auth])

  const followUnfollowSubreddit = (subreddit) => {
    if (subredditsFollowed.includes(subreddit.id)) {
      dispatch(unfollowSubreddit({ id: subreddit.id, auth: auth }));
    } else {
      dispatch(followSubreddit({ id: subreddit.id, auth: auth }))
    }
  }

  const renderSubredditsLoading = () => {
    return [...Array(5)].map((i, index) =>
      <div className="LoadingSubreddits" key={index}>
        <Skeleton variant='circular' animation="wave" width={50} height={50} />
        <Skeleton variant='text' animation="wave" width={250} height={50} />
      </div>
    )
  }

  const ShowTopSubreddits = () => {
    return (
      subreddits.map((subreddit, index) => {
        const link = subreddit.display_name_prefixed.replace('r/', '')
        return (
          <div key={index} className="SRItemList">
            <div className="SRItemDetails">
              <img
                src={subreddit.icon_img ? subreddit.icon_img : SubredditDefault}
                alt='Subreddit Icon'
              />
              <Link to={{pathname: `/subreddits/${link}`}} >
                {subreddit.display_name_prefixed}
              </Link>
            </div>
            <div className="SRItemButton">
              <button onClick={() => { followUnfollowSubreddit(subreddit) }}>{subredditsFollowed.includes(subreddit.id) ? 'Unfollow' : 'Follow'}</button>
            </div>
          </div>
        )
      }))

  }

  return (
    <div className="TopSRBox">
      <div className="TopSRHeader">
        <h3>
          Top Subreddits
        </h3>
      </div>
      <div className="TopSR">
        {subredditsLoading ? renderSubredditsLoading() : <ShowTopSubreddits />}
      </div>
    </div>

  )
}