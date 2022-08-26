import { Link } from 'react-router-dom'

import RandditLogo from '../../Assets/randditLogo.png'
import SearchBar from '../SearchBar/SearchBar'

import './AppBar.css'

export const AppBar = () => {
  return (
    <div className="AppBar">
      <Link
        style={{ textDecoration: 'none' }}
        to={{ pathname: `/homepage` }}
      >
        <div className="Logo">
          <img
            alt='Randdit Logo'
            src={RandditLogo} />
          <h2>randdit</h2>
        </div>
      </Link>
      <SearchBar />
    </div>
  )
}