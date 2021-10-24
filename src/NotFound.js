import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import { onhome } from './Redux/Action'


const NotFound =({ onhome, onhomeA}) =>{

    useEffect(()=>{
        !onhome && onhomeA()
    })
    return (
        <div>
            <Nav/>
            PAGE NOT FOUND, ERROR 404
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        onhome: state.onhome
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onhomeA: () => {dispatch(onhome())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NotFound)
