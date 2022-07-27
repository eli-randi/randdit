import { createSlice } from "@reduxjs/toolkit";
import { getFromApi, postToApi } from "../../utils/APICalls";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk('posts/getPosts',
    async ({ auth, path }) => {
        let params = {
            'limit': 5,
            'show': 'all'
        }
        const response = await getFromApi(path, params, auth.bearerToken)
        return response.data.children.map(post => post.data)
    });

export const loadMorePosts = createAsyncThunk('posts/loadMorePosts',
    async ({ auth, after, path }) => {
        let params = {
            'limit': 5,
            'show': 'all',
            'after': after,
        }
        const response = await getFromApi(path, params, auth.bearerToken)
        return response.data.children.map(post => post.data)
    });

export const votePost = createAsyncThunk('posts/votePost',
    async ({ auth, postId, direction }) => {
        let params = {
            'dir': direction,
            'id': postId,
        };
        await postToApi('/api/vote', params, auth.bearerToken);
        return { postId, direction }
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        postsVoted: [],
        isLoading: false,
        isLoadingMore: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => (
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.posts = [];
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.isLoading = false;
                state.error = false;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(loadMorePosts.pending, (state, action) => {
                state.isLoadingMore = true;
                state.error = false;
            })
            .addCase(loadMorePosts.fulfilled, (state, action) => {
                state.posts = [...state.posts, ...action.payload];
                state.isLoadingMore = false;
                state.error = false;
            })
            .addCase(loadMorePosts.rejected, (state, action) => {
                state.isLoadingMore = false;
                state.error = true;
            })
            .addCase(votePost.fulfilled, (state, action) => {
                state.postsVoted = [...state.postsVoted, action.payload.postId]
            })
    )
}
)

export const selectPosts = (state) => state.posts.posts;

export const selectPostsLoading = (state) => state.posts.isLoading;


export default postSlice.reducer;