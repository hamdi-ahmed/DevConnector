import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { USER_LOGOUT } from '../../constants/userConstants'
const Navbar = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const login = useSelector(state => state.login)
    const { success } = login
    const logout = () => {
        dispatch({ type: USER_LOGOUT })
        localStorage.removeItem('User')
        history.push('/')
    }
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {
                !success ? (
                    <ul>
                        <li><a href="profiles.html">Developers</a></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                ) : (
                    <ul>
                        <li><Link to="/developers">Developers</Link></li>
                        <li><Link to="/posts">Posts</Link></li>
                        <li><Link to="/dashboard"><i className="fas fa-user"></i> dashboard</Link></li>
                        <li><span style={{ cursor: 'pointer' }} onClick={logout} to="/logout"><i className="fas fa-sign-out-alt"></i> Logout</span></li>
                    </ul>
                )
            }
        </nav>
    )
}

export default Navbar
