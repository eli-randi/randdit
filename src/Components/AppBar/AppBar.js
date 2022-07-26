import RandditLogo from './randditLogo.png'
import './AppBar.css'
import SearchBar from '../SearchBar/SearchBar'
import { Link } from 'react-router-dom'

export const AppBar = () => {
    return (
        <div className="AppBar">
            <Link style={{textDecoration: 'none'}}
                to={{
                    pathname: `/`,
                }}
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