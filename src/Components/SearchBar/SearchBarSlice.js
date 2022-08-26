import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { getFromApi } from "../../utils/APICalls";

export const getSearchResults = createAsyncThunk('search/getSearch',
    async ({ auth, searchTerm }) => {
        const params = {
            'limit': 5,
            'q': searchTerm,
            'sort': 'relevance',
            't': 'all',
            'type': 'sr'
        }
        const path = '/search';
        const response = await getFromApi(path, params, auth.bearerToken)
        return response.data.children.map((searchResult => searchResult.data));
    });

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchResults: [],
        isLoading: false,
        error: false
    },
    reducers: {},
    extraReducers: {
        [getSearchResults.pending]: (state, action) => {
            state.isLoading = true;
            state.error = false;
        },
        [getSearchResults.fulfilled]: (state, action) => {
            state.searchResults = action.payload;
            state.isLoading = false;
            state.error = false;
        },
        [getSearchResults.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = true;
        }
    }
})

export const selectSearch = (state) => state.search.searchResults;

export default searchSlice.reducer;