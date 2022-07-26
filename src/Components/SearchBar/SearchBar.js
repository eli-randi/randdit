import React, { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getSearchResults } from './SearchBarSlice';
import { selectSearch } from './SearchBarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../utils/Authorization';
import { Link } from 'react-router-dom';
import './SearchBar.css'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  let searchResults;

  useEffect(() => {
    dispatch(getSearchResults({ auth: auth, searchTerm: searchTerm }));
  }, [searchTerm, dispatch, auth])

  searchResults = useSelector(selectSearch)

  return (
    <Autocomplete
      id="search-bar"
      className='SearchBar'
      // sx={{ width: 300}}
      options={searchResults}
      autoHighlight
      getOptionLabel={(option) => option.display_name_prefixed}
      inputValue={searchTerm}
      onInputChange={(event, newInputValue) => { setSearchTerm(newInputValue); }}
      renderOption={(props, option) => (
        <Link
          to={{
            pathname: `/subreddits/${option.display_name}`,
          }}
        >
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={option.header_img}
              alt=""
            />
            <p>{option.display_name_prefixed}</p>

          </Box>
        </Link>

      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
          }}
        />
      )}
    />
  );
}
