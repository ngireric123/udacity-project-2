import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getquestions, handlesubmitanswer, onhome } from './Redux/Action'
import templ from '../src/questions/logo512.png'


const Questionpage = ({ loggedInUser, questions, users, handlesubmitanswer, onhome, onhomeA, id }) => {

    const [selectedOption, setSelectedOption] = useState("")
    const [selectedOption1, setSelectedOption1] = useState("")
    const [optionOnevote, setOptionOnevote] = useState(questions[id].optionOne.votes.length)
    const [optionTwovote, setOptionTwovote] = useState(questions[id].optionTwo.votes.length)
    const [totalVotes, setTotalVotes] = useState(questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length)

    const onclickOne = () => {
        setOptionOnevote((prevState) => prevState + 1)
        setTotalVotes((prevState) => prevState + 1)
    }

    const onclickTwo = () => {
        setOptionTwovote((prevState) => prevState + 1)
        setTotalVotes((prevState) => prevState + 1)
    }

    let cardclassname1 = "card"
    let cardclassname2 = "card"
    let anscardclassname1 = "card"
    let anscardclassname2 = "card"


    if (questions[id].optionOne.votes.includes(loggedInUser)) {
        anscardclassname1 = "selectedcard"
    }

    else if (questions[id].optionTwo.votes.includes(loggedInUser)) {
        anscardclassname2 = "selectedcard"
    }

    let percent1 = Math.round(optionOnevote / totalVotes * 100)
    let percent2 = Math.round(optionTwovote / totalVotes * 100)

    const containerStyles = {
        height: 30,
        width: '80%',
        backgroundColor: "grey",
        borderRadius: 5,
        marginTop: 20,
        margin: 'auto'
    }

    const fillerStyles1 = {
        height: '100%',
        width: `${percent1}%`,
        backgroundColor: "green",
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const fillerStyles2 = {
        height: '100%',
        width: `${percent2}%`,
        backgroundColor: "green",
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }


    let a = ""
    const onvalueChange = (e) => {
        a = e.target.value
        setSelectedOption1(a)
    }


    const setOption = () => {
        setTimeout(() => {
            if (selectedOption1 === questions[id].optionOne.text) {
                onclickOne()
                setSelectedOption('optionOne')

            } else if (selectedOption1 === questions[id].optionTwo.text) {
                onclickTwo()
                setSelectedOption('optionTwo')

            }
        }, 1000)

    }

    let answer
    const submitans = () => {

        if (selectedOption1 === questions[id].optionOne.text) {
            answer = 'optionOne'
        }
        else if (selectedOption1 === questions[id].optionTwo.text) {
            answer = 'optionTwo'
        }

        handlesubmitanswer(id, answer)

    }

    return (
        <>
            <div>
                {
                    questions[id].optionOne.votes.includes(loggedInUser) || questions[id].optionTwo.votes.includes(loggedInUser)
                        ?

                        <div>
                            <div className="id-cards-select">
                                <div style=
                                    {{
                                        textAlign: "left",
                                        backgroundColor: "whitesmoke",
                                        borderBottom: "1px solid rgb(216, 212, 212)",
                                        height: "40px",
                                        padding: "10px",
                                        boxSizing: "border-box"
                                    }}><b>{users[questions[id].author].name} ask:</b></div>
                                <div style={{ display: "flex" }}>
                                    <div style={{ borderRight: "1px solid rgb(216, 212, 212)", marginRight: "10px", height: "390px", display: "flex", alignItems: "center" }}>
                                        <img alt="img" src={templ} style={{ height: "100px", margin: "10px" }} />
                                    </div>
                                    <div>
                                        <div style={{ marginBottom: "30px" }}><b>Results:</b></div>
                                        <div className={anscardclassname1}>
                                            <div style={{ margin: "10px 10px 30px 10px" }}>
                                                <h4>
                                                    {questions[id].optionOne.text}
                                                </h4>
                                            </div>

                                            <div style={containerStyles}>
                                                <div style={fillerStyles1}>
                                                    <span style={labelStyles}>{`${percent1}%`}</span>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: "center" }}><b>{optionOnevote} out of {totalVotes} votes</b></div>
                                        </div>
                                        <div className={anscardclassname2}>
                                            <div style={{ margin: "10px 10px 30px 10px" }}>
                                                <h4>
                                                    {questions[id].optionTwo.text}
                                                </h4>
                                            </div>
                                            <div style={containerStyles}>
                                                <div style={fillerStyles2}>
                                                    <span style={labelStyles}>{`${percent2}%`}</span>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: "center" }}><b>{optionTwovote} out of {totalVotes} votes</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        :
                        !selectedOption ?
                            <div className="id-cards">
                                <div style=
                                    {{
                                        textAlign: "left",
                                        backgroundColor: "whitesmoke",
                                        borderBottom: "1px solid rgb(216, 212, 212)",
                                        height: "40px"
                                    }}>{users[questions[id].author].name} ask:</div>
                                <div style={{ display: "flex" }}>
                                    <div style={{ borderRight: "1px solid rgb(216, 212, 212)", marginRight: "10px", height: "160px" }}>
                                        <img alt="img" src={templ} style={{ height: "100px", margin: "10px" }} />
                                    </div>
                                    <div>
                                        <div style={{ marginBottom: "30px" }}><b>Would You Rather...</b></div>
                                        <div onChange={(e) => onvalueChange(e)}>
                                            <ul style={{ listStyle: "none", paddingLeft: "10px" }}>
                                                <li><input type="radio" value={questions[id].optionOne.text} name="gender" style={{ outline: "none" }} />{questions[id].optionOne.text}</li>
                                                <li><input type="radio" value={questions[id].optionTwo.text} name="gender" style={{ outline: "none" }} />{questions[id].optionTwo.text}</li>
                                            </ul>
                                        </div>
                                        <button className="button-id"
                                            disabled={!selectedOption1}
                                            type="submit"
                                            onClick={() => { setOption(); submitans() }}
                                        >Submit</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="id-cards-select">
                                    <div style=
                                        {{
                                            textAlign: "left",
                                            backgroundColor: "whitesmoke",
                                            borderBottom: "1px solid rgb(216, 212, 212)",
                                            height: "40px",
                                            padding: "10px",
                                            boxSizing: "border-box"
                                        }}><b>{users[questions[id].author].name} ask:</b></div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ borderRight: "1px solid rgb(216, 212, 212)", marginRight: "10px", height: "390px", display: "flex", alignItems: "center" }}>
                                            <img alt="img" src={templ} style={{ height: "100px", margin: "10px" }} />
                                        </div>
                                        <div>
                                            <div style={{ marginBottom: "30px" }}><b>Results:</b></div>
                                            <div className={cardclassname1}>
                                                <div style={{ margin: "10px 10px 30px 10px" }}>
                                                    <h4>
                                                        {questions[id].optionOne.text}
                                                    </h4>
                                                </div>

                                                <div style={containerStyles}>
                                                    <div style={fillerStyles1}>
                                                        <span style={labelStyles}>{`${percent1}%`}</span>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: "center" }}><b>{optionOnevote} out of {totalVotes} votes</b></div>
                                            </div>
                                            <div className={cardclassname2}>
                                                <div style={{ margin: "10px 10px 30px 10px" }}>
                                                    <h4>
                                                        {questions[id].optionTwo.text}
                                                    </h4>
                                                </div>
                                                <div style={containerStyles}>
                                                    <div style={fillerStyles2}>
                                                        <span style={labelStyles}>{`${percent2}%`}</span>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: "center" }}><b>{optionTwovote} out of {totalVotes} votes</b></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                }
            </div >
        </>
    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        loggedInUser: state.loggedInUser,
        questions: state.questions,
        users: state.users,
        unansweredquestions: state.unanswered_questions,
        answeredquestions: state.answered_questions,
        auth: state.auth,
        onhome: state.onhome,
        id: ownProps.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getquestions: () => { dispatch(getquestions()) },
        handlesubmitanswer: (id, answer) => { dispatch(handlesubmitanswer(id, answer)) },
        onhomeA: () => { dispatch(onhome()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questionpage)
