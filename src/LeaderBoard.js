import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import { onhome } from './Redux/Action'


const LeaderBoard = ({ users, onhome, onhomeA }) => {
    let sortedusers
    sortedusers = Object.keys(users).sort((a,b) => ((Object.keys(users[b].answers).length) + users[b].questions.length) - ((Object.keys(users[a].answers).length) + users[a].questions.length))

    useEffect(()=>{
        !onhome && onhomeA()
    })
    return (
        <>
        <Nav />
        <div className="leader-board">
            {sortedusers.map((user) => {
                return (
                    <div className="leader-board-cont" key={user}>
                        <div style={{ borderRight: "1px solid rgb(216, 212, 212)", marginRight: "10px", display:"flex", alignItems:"center" }}>
                            <img alt="" src="logo512.png" style={{ height: "100px", margin: "10px" }} />
                        </div>
                        <div style={{ borderRight: "1px solid rgb(216, 212, 212)", marginRight: "10px", width: "300px" }}>
                            <h2>
                                {users[user].name}
                            </h2>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop:"20px", marginBottom:"20px" }}>
                                <div><b>Answered Questions:</b></div>
                                <div style={{ marginRight: "5px" }}><b>{Object.keys(users[user].answers).length}</b></div>
                            </div>
                            <hr className="hr" />
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop:"20px" }}>
                                <div><b>Questions:</b></div>
                                <div style={{ marginRight: "5px" }}><b>{users[user].questions.length}</b></div>
                            </div>
                        </div>
                        <div>
                            <div style={{marginLeft:"10px"}}><h3>Score</h3></div>
                            <div style={{display:"flex", justifyContent:"center",color:"white", marginLeft:"0px", marginTop:"30px", backgroundColor:"green", borderRadius:"50%", width:"70px"}}>
                                <h2>
                                {
                                    users[user].questions.length + Object.keys(users[user].answers).length
                                }
                                </h2>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        loggedInUser: state.loggedInUser,
        auth: state.auth,
        onhome: state.onhome
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onhomeA: () => {dispatch(onhome())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard)

