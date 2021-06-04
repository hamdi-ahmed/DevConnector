import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logIn } from '../../actions/userActions'

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const login = useSelector(state => state.login)
    const { success } = login
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(logIn({ email, password }))
    }
    useEffect(() => {
        if (success) {
            history.push('/dashboard')
        }
    }, [history, success])
    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form onSubmit={handleSubmit} className="form" action="dashboard.html">
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => onChange(e)}
                        name="password"
                        autoComplete="off"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

export default Login
