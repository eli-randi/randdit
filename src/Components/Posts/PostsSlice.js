import { createSlice } from "@reduxjs/toolkit";
import { getFromApi, postToApi } from "../../utils/APICalls";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk('posts/getPosts',
    async ({auth, path}) => {
        let params = {
            'limit': 5,
            'show': 'all'
        }
        const response = await getFromApi(path, params, auth.bearerToken)
        return response.data.children.map(post => post.data)
    });

export const loadMorePosts = createAsyncThunk('posts/loadMorePosts',
    async ({auth, after, path}) => {
        let params = {
            'limit': 5,
            'show': 'all',
            'after': after,
        }
        const response = await getFromApi(path, params, auth.bearerToken)
        return response.data.children.map(post => post.data)
    });

export const votePost = createAsyncThunk('posts/votePost', 
    async({auth, postId, direction}) => {
        let params = {
            'dir': direction,
            'id': postId,
        };
        const response = await postToApi('/api/vote', params, auth.bearerToken);
        return {postId, direction}
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        postsVoted: [],
        isLoading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => (
        builder.addCase(getPosts.pending, (state, action) => {
            state.posts = [];
            state.isLoading = true;
            state.error = false;
        }),
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.isLoading = false;
            state.error = false;
        }),
        builder.addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
        }),
        builder.addCase(loadMorePosts.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
        }),
        builder.addCase(loadMorePosts.fulfilled, (state, action) => {
            state.posts = [...state.posts, ...action.payload];
            state.isLoading = false;
            state.error = false;
        }),
        builder.addCase(loadMorePosts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
        }),
        builder.addCase(votePost.fulfilled, (state, action) => {
            state.postsVoted = [...state.postsVoted, action.payload.postId]
        }),
        builder.addCase(votePost.pending, (state, action) => {
            console.log(state.posts);
            const copyPosts = state.posts
            const postVoted = copyPosts.filter((post) => {return post.name == action.payload.postId});
            postVoted.ups ++;
            console.log(postVoted.ups)
        })
    )
})



export const selectPosts = (state) => state.posts.posts;

export default postSlice.reducer;