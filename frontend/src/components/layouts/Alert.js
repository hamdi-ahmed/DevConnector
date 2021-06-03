import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
    const alert = useSelector(state => state.alert)
    //const { alertStatus: { msg, alertType } } = alert
    return (
        <Fragment>
            {alert.length > 0 && alert !== null && alert.map((alert) => (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
            ))}
        </Fragment>
    )
}



export default Alert
