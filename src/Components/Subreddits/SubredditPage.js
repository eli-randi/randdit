import React, { useEffect, useState } from "react";
import { AuthContext } from "../../utils/Authorization";
import { useContext } from "react";
import { AppBar } from "../AppBar/AppBar";
import './Subreddit.css'
import { Posts } from "../Posts/Posts";
import { useParams } from 'react-router-dom'
import { getCurrentSubreddit, getSubredditsFollowed } from "./SubredditSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentSubreddit, selectSubredditsFollowed } from "./SubredditSlice";
import SubredditHeaderDefault from './header_default.jpg'
import SubredditIconDefault from './Subreddit_default.png'
import { followSubreddit, unfollowSubreddit } from "./SubredditSlice";
import Moment from "react-moment";
import { decodeStringFromReddit } from "../../utils/DecodeReddit";

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

export function SubredditPage() {
    const auth = useContext(AuthContext);
    const { subredditId } = useParams();
    const dispatch = useDispatch();
    const path = `/r/${subredditId}`;

    useEffect(() => {
        dispatch(getCurrentSubreddit({ auth: auth, path: path }));
    }, [subredditId])

    useEffect(() => {
        dispatch(getSubredditsFollowed(auth))
    }, [])

    

    const SubredditHeader = () => {
        const subredditData = useSelector(selectCurrentSubreddit);
        const subredditsFollowed = useSelector(selectSubredditsFollowed);
        console.log(subredditData)

        const followUnfollowSubreddit = () => {
            if (subredditsFollowed.includes(subredditData.id)) {
                dispatch(unfollowSubreddit({ id: subredditData.id, auth: auth }));
            } else {
                dispatch(followSubreddit({ id: subredditData.id, auth: auth }))
            }
        }

        return (
            <div className="SubredditPageHeader">
                <div className="HeaderBanner">
                    <img src={subredditData && subredditData.banner_background_image ? decodeStringFromReddit(subredditData.banner_background_image) : SubredditHeaderDefault} />
                </div>
                <div className="HeaderDetails">
                    <div className="HeaderIcon">
                        <img src={subredditData && subredditData.icon_img ? subredditData.icon_img : SubredditIconDefault} />
                    </div>
                    <div className="HeaderTitle">
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

        return (
            <div className="AboutSR">
                <div className="AboutSRHeader">
                    <h3>About community</h3>
                </div>
                <div className="AboutSRDetails">
                    <p>{subredditData && subredditData.public_description}</p>
                    <hr />
                    <div className="AboutSRSubscribers">
                    <h5>{subredditData && kFormatter(subredditData.subscribers)} <br />Members</h5>
                    <h5>{subredditData && kFormatter(subredditData.accounts_active)} <br />Online</h5>
                    </div>
                    <hr />
                    <p>Created {subredditData && <Moment fromNow>{subredditData.created * 1000}</Moment>}</p>
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