import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


import { setAlert } from '../../actions/alertActions'
import Alert from '../layouts/Alert'

const Register = () => {
    const dispatch = useDispatch()
    // const alert = useSelector(state => state.alert)
    // const { alertStatus: { msg, alertType } } = alert
    // console.log(msg);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        e.preventDefault()
        if (password !== password2) {
            dispatch(setAlert("Password and confirm password doesn't match", 'danger'))
        } else {
            console.log(formData)
        }
    }

    return (
        <Fragment>
            <Alert />
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form
                className="form"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => onChange(e)}
                        name="name"
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={e => onChange(e)}
                        name="email"
                        autoComplete="off"
                    />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                      Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                        minLength="6"
                        autoComplete="off"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}


export default Register
