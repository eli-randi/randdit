import { configureStore } from "@reduxjs/toolkit";
import SubredditSlice from "./Components/Subreddits/SubredditSlice";
import SearchBarSlice from "./Components/SearchBar/SearchBarSlice";
import PostsSlice from "./Components/Posts/PostsSlice";

export default configureStore({
    reducer: {
      subreddits: SubredditSlice,
      search: SearchBarSlice,
      posts: PostsSlice
    }
})

