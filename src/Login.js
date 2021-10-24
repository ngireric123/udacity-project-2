import React from 'react'
import { connect } from 'react-redux'
import { setloggedinuser, onhome } from './Redux/Action'
import { Link } from 'react-router-dom'
import Nav from './Nav'


const Login = ({users, loggedInUser, setloggedinuser, onhome }) => {

    let path = "/"
    if (loggedInUser) {
        path = "/home"
    }


    const handleemptylogin = () => {
        if (path === "/") {
            alert("please select a user")
        }
    }
    const allusers = Object.keys(users)
    console.log(allusers)
    return (
        <>
        <Nav />
        <div className="login-box">
            <div style=
                {{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "60px",
                    backgroundColor: "whitesmoke",
                    borderBottom: "1px solid rgb(216, 212, 212)"
                }}>
                <div>
                    <div><h4 style={{ margin: "0" }}>Welcome to the Would You Rather App!</h4></div>
                    <div style={{ textAlign: "center" }}>Please sign in to continue</div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <img alt="" src="logo512.png" style={{ height: "100px" }} />
            </div>
            <div>
                <span style={{ color: "rgb(51, 172, 56)" }}>
                    <h3 style={{ marginTop: "40px" }}>Sign In</h3>
                </span>
                <select value={loggedInUser} style={{ width: "80%", height: "40px", cursor: "pointer" }} onChange={(e) => setloggedinuser(e.target.value)}>
                    <option value="" disabled >Select user</option>
                    {

                        allusers.map(user => (
                            <option value={user} key={user}>{user}</option>
                        ))

                    }
                </select>

            </div>
            <Link to={path}>
                <button disabled={!loggedInUser} className="button" type="submit" onClick={() =>{handleemptylogin(); onhome()}}>
                    Sign in
                </button>
            </Link>
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
        users: state.users,
        questions: state.questions,
        answeredquestions: state.answered_questions,
        unansweredquestions: state.unanswered_questions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setloggedinuser: (user) => { dispatch(setloggedinuser(user)) },
        onhome: () => { dispatch(onhome()) },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
