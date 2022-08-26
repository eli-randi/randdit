import React, { useEffect, useContext } from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../utils/Authorization";
import Moment from "react-moment";
import Skeleton from '@mui/material/Skeleton';

import SubredditHeaderDefault from '../../Assets/header_default.jpg';
import SubredditIconDefault from '../../Assets/Subreddit_default.png';
import { getCurrentSubreddit, getSubredditsFollowed, selectCurrentSubredditLoading, selectCurrentSubreddit, selectSubredditsFollowed, followSubreddit, unfollowSubreddit } from "./SubredditSlice";
import { AppBar } from "../AppBar/AppBar";
import { Posts } from "../Posts/Posts";
import { kFormatter } from "../../utils/Formatter";
import { decodeStringFromReddit } from "../../utils/DecodeReddit";

import './Subreddit.css'

export function SubredditPage() {
  const auth = useContext(AuthContext);
  const { subredditId } = useParams();
  const dispatch = useDispatch();
  const path = `/r/${subredditId}`;

  useEffect(() => {
    dispatch(getCurrentSubreddit({ auth: auth, path: path }));
  }, [subredditId, auth, path, dispatch])

  useEffect(() => {
    dispatch(getSubredditsFollowed(auth))
  }, [auth, dispatch])

  const SubredditHeader = () => {
    const subredditData = useSelector(selectCurrentSubreddit);
    const subredditsFollowed = useSelector(selectSubredditsFollowed);
    const subredditsLoading = useSelector(selectCurrentSubredditLoading)

    const followUnfollowSubreddit = () => {
      if (subredditsFollowed.includes(subredditData.id)) {
        dispatch(unfollowSubreddit({ id: subredditData.id, auth: auth }));
      } else {
        dispatch(followSubreddit({ id: subredditData.id, auth: auth }))
      }
    }
    return (
      <div className="SubredditPageHeader">
        <div
          style={{
            backgroundImage: `url(${subredditData && subredditData.banner_background_image ?
              decodeStringFromReddit(subredditData.banner_background_image) : SubredditHeaderDefault})`
          }}
          className="HeaderBanner">
        </div>
        <div className="HeaderDetails">
          <div className="HeaderIcon">
            <img src=
              {subredditData && subredditData.icon_img ? subredditData.icon_img : SubredditIconDefault}
              alt="Subreddit Icon"
            />
          </div>
          <div className="HeaderTitle">
            {subredditsLoading && <Skeleton variant="text" width={100} animation="wave" />}
            <h2>{subredditData && decodeStringFromReddit(subredditData.title)}</h2>
            <h5>{subredditData && subredditData.display_name_prefixed}</h5>
          </div>
          <div className="HeaderJoin">
            <div>
              <button onClick={() => { followUnfollowSubreddit() }}>{subredditsFollowed.includes(subredditData && subredditData.id) ? 'Joined' : 'Join'}</button>
            </div>
          </div>
        </div>
      </div>

    )
  }

  const AboutSubreddit = () => {
    const subredditData = useSelector(selectCurrentSubreddit);
    const subredditsLoading = useSelector(selectCurrentSubredditLoading)

    return (
      <div className="AboutSR">
        <div className="AboutSRHeader">
          <h3>About community</h3>
        </div>
        <div className="AboutSRDetails">
          {subredditsLoading && <Skeleton variant="text" width={200} animation="wave" />}
          <p>{subredditData && subredditData.public_description}</p>
          <hr />
          <div className="AboutSRSubscribers">
            <h5>{subredditData ?
              kFormatter(subredditData.subscribers) :
              <Skeleton variant="text" width={50} animation="wave" />} <br />Members</h5>
            <h5>{subredditData ?
              kFormatter(subredditData.accounts_active) :
              <Skeleton variant="text" width={50} animation="wave" />} <br />Online</h5>
          </div>
          <hr />
          <p>Created {subredditData ? <Moment fromNow>{subredditData.created * 1000}</Moment> : <Skeleton variant="text" width={200} animation="wave" />}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="Homepage">
      <AppBar />
      <SubredditHeader />
      <div className="Content">
        <Posts
          path={`/r/${subredditId}`}
        />
        <AboutSubreddit />
      </div>
    </div>
  )
}