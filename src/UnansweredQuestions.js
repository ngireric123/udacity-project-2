import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const UnansweredQuestions = ({ questions, users, loggedInUser }) => {

    let abouttosort, sorted, finalid

    const unansweredquestions_id = Object.keys(questions).filter(id => loggedInUser && !Object.keys(users[loggedInUser].answers).includes(id))
    
    console.log(unansweredquestions_id)
    abouttosort = unansweredquestions_id.map(eachId => questions[eachId])
    sorted = abouttosort.sort((a, b) => (b.timestamp - a.timestamp))
    finalid = sorted.map(each => (each.id))
    console.log(finalid)
    return (
        <div>
            {
                
                    finalid.map(answer => (
                        <div key={answer} className="home-cards">
                            <div style=
                                {{
                                    textAlign: "left",
                                    backgroundColor: "whitesmoke",
                                    borderBottom: "1px solid rgb(216, 212, 212)",
                                    height: "40px"
                                }}>{users[questions[answer].author].name} ask:</div>
                            <div style={{ display: "flex" }}>
                                <div style={{ borderRight: "1px solid rgb(216, 212, 212)", marginRight: "10px" }}>
                                    <img alt="" src="logo512.png" style={{ height: "100px", margin: "10px" }} />
                                </div>
                                <div>
                                    <div style={{ marginBottom: "30px" }}><b>Would you rather</b></div>

                                    <div> {questions[answer].optionOne.text} </div>


                                    <Link to={`/questions/${answer}`}>
                                        <button className="home-button" style={{ width: "190px" }}>View Poll</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                   
            }

        </div >
    )
}


const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
        questions: state.questions,
        users: state.users,
        answeredquestions: state.answered_questions,
        unansweredquestions: state.unanswered_questions,
        newquestionID: state.newquestionID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnansweredQuestions)

