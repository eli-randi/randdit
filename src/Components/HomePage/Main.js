import React from "react";

import { Subreddit } from "../Subreddits/Subreddit";
import { AppBar } from "../AppBar/AppBar";
import { Posts } from "../Posts/Posts";

import './Main.css';

export function Main() {
  return (
    <div className="Homepage">
      <AppBar />
      <div className="Content">
        <Posts />
        <Subreddit />
      </div>
    </div>
  )
}

