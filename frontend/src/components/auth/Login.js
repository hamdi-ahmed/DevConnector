import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    const handleSubmit = e => {
        e.preventDefault()
        console.log('success');
    }
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
