import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnsweredQuestions from './AnsweredQuestions'
import Nav from './Nav'
import { onhome, questionstodisplay } from './Redux/Action'
import UnansweredQuestions from './UnansweredQuestions'


const Home = ({questions, loggedInUser, users, questionstodisplay, questions_to_display, onhomeA, onhome}) => {

    useEffect(()=>{
        !onhome && onhomeA()
    })

    let unans, ans

    if(questionstodisplay ==="answered"){
        ans = "design"
    }
    else if(questionstodisplay ==="unanswered"){
        unans = "design"
    }

    return (
        <>
        <Nav />
        <div className="home-box">
            <div style=
                {{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "40px",
                    backgroundColor: "whitesmoke",
                    borderBottom: "1px solid rgb(216, 212, 212)"
                }}>
                <div style=
                    {{
                        display: "flex",
                        justifyContent: "space-between",
                        position: "relative"
                    }}>
                    <div style=
                        {{
                            paddingRight: "20px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            borderRight: "1px solid rgb(216, 212, 212)",
                            cursor: "pointer"
                        }}><b onClick={() =>questions_to_display("unanswered")} className={unans}>Unanswered Questions</b></div>
                    <div style=
                        {{
                            paddingLeft: "20px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            cursor: 'pointer'
                        }}><b onClick={() =>questions_to_display("answered")} className={ans}>Answered Questions</b></div>
                </div>
            </div>
            <div>
                {
                    questionstodisplay === "unanswered" ? <UnansweredQuestions/> : <AnsweredQuestions/>
                }
            </div>
        </div>
        </>
    )
}

const mapStateToProps=(state)=>{
    return{
        loggedInUser: state.loggedInUser,
        users: state.users,
        questionstodisplay: state.questionstodisplay,
        questions: state.questions,
        auth: state.auth,
        onhome: state.onhome
        
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        questions_to_display: (value) =>{ dispatch(questionstodisplay(value))},
        onhomeA: () => {dispatch(onhome())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
