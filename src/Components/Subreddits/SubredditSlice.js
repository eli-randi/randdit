import { createSlice } from "@reduxjs/toolkit";
import { getFromApi } from "../../utils/APICalls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postToApi } from "../../utils/APICalls";

export const getSubreddits = createAsyncThunk('subreddits/getSubreddits',
    async (auth) => {
        const params = {
            'limit': 5,

        }
        const path = '/subreddits/popular';
        const response = await getFromApi(path, params, auth.bearerToken)
        return response.data.children.map(subreddit => subreddit.data)
    });

export const getSubredditsFollowed = createAsyncThunk('subreddits/getSubredditsFollowed',
    async (auth) => {
        const response = await getFromApi('/subreddits/mine/subscriber', {}, auth.bearerToken);
        return response.data.children.map(subreddit => subreddit.data.id)
    }
);

export const getCurrentSubreddit = createAsyncThunk('subreddits/getCurrentSubreddit',
    async ({ auth, path }) => {
        const response = await getFromApi(`${path}/about`, {}, auth.bearerToken);
        return response.data;

    }
)

const subredditSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        subredditsFollowed: [],
        currentSubreddit: null,
        isLoadingSubreddits: false,
        subredditsError: false,
        isLoadingFollowed: false,
        followedError: false,
        isLoadingCurrent: false,
        currentError: false,
    },
    reducers: {
        followSubreddit: (state, action) => {
            const { id, auth } = action.payload;
            const params = {
                'action': 'sub',
                'skip_initial_defaults': false,
                'action_source': 'o',
                'sr': `t5_${id}`
            };
            const path = '/api/subscribe'
            postToApi(path, params, auth.bearerToken);
            state.subredditsFollowed = [...state.subredditsFollowed, id]
        },
        unfollowSubreddit: (state, action) => {
            const { id, auth } = action.payload;
            const params = {
                'action': 'unsub',
                'skip_initial_defaults': false,
                'sr': `t5_${id}`
            };
            const path = '/api/subscribe';
            postToApi(path, params, auth.bearerToken);
            state.subredditsFollowed = state.subredditsFollowed.filter((subredditFollowed) => { return subredditFollowed !== id })
        }
    },
    extraReducers: (builder) => (
        builder
            .addCase(getSubreddits.pending, (state, action) => {
                state.isLoadingSubreddits = true;
                state.subredditsError = false;
            })
            .addCase(getSubreddits.fulfilled, (state, action) => {
                state.subreddits = action.payload;
                state.isLoadingSubreddits = false;
                state.subredditsError = false;
            })
            .addCase(getSubreddits.rejected, (state, action) => {
                state.isLoadingSubreddits = false;
                state.subredditsError = true;
            })
            .addCase(getSubredditsFollowed.pending, (state, action) => {
                state.isLoadingFollowed = true;
                state.followedError = false;
            })
            .addCase(getSubredditsFollowed.fulfilled, (state, action) => {
                state.subredditsFollowed = action.payload;
                state.isLoadingFollowed = false;
                state.followedError = false;
            })
            .addCase(getSubredditsFollowed.rejected, (state, action) => {
                state.isLoadingFollowed = false;
                state.followedError = true;
            })
            .addCase(getCurrentSubreddit.pending, (state, action) => {
                state.currentSubreddit = null;
                state.isLoadingCurrent = true;
                state.currentError = false;
            })
            .addCase(getCurrentSubreddit.fulfilled, (state, action) => {
                state.currentSubreddit = action.payload;
                state.isLoadingCurrent = false;
                state.currentError = false;
            })
            .addCase(getCurrentSubreddit.rejected, (state, action) => {
                state.isLoadingCurrent = false;
                state.currentError = true;
            })

    )
})


export const {
    followSubreddit, unfollowSubreddit
} = subredditSlice.actions;


export const selectSubreddits = (state) => state.subreddits.subreddits;

export const selectSubredditsFollowed = (state) => state.subreddits.subredditsFollowed;

export const selectCurrentSubreddit = (state) => state.subreddits.currentSubreddit;

export const selectSubredditsLoading = (state) => state.subreddits.isLoadingSubreddits;

export const selectCurrentSubredditLoading = (state) => state.subreddits.isLoadingCurrent;

export default subredditSlice.reducer;