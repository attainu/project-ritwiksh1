import React, { Fragment } from 'react'
import {Spinner} from 'react-bootstrap'
const Loader = () => {
    return (
        <Fragment>
        <Spinner animation="border" variant="primary" style={{width:'200px',height:'200px',margin:'auto',display:'block'}}/>
        </Fragment>
    )
}

export default Loader
