import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Nav from './Nav'
import { handleaddquestion, onhome } from './Redux/Action'


const CreateQuestion = ({ handleaddquestion, onhomeA, onhome }) => {
    useEffect(()=>{
        !onhome && onhomeA()
    })

    const [optionOneText, setOptionOneText] = useState("")
    const [optionTwoText, setOptionTwoText] = useState("")

    let history = useHistory()
    const onSubmitQuestion = () => {
        if (optionTwoText && optionOneText) {
            handleaddquestion(optionOneText, optionTwoText)
        }

        setTimeout(() => {
            if (optionTwoText && optionOneText) {
                history.push('/home')
            }
        }, 1000)
    }

    return (
        <>
        <Nav />
        <div className="create-box">
            <div style=
                {{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "40px",
                    borderBottom: "1px solid rgb(216, 212, 212)"
                }}>
                <div>
                    <div><h4 style={{ margin: "0" }}>CREATE NEW QUESTION</h4></div>
                </div>
            </div>
            <div style={{ marginTop: "20px" }}>
                Complete the question:
            </div>
            <div>
                <h3 style={{ marginTop: "10px" }}>Would You Rather...</h3>
            </div>
            <div>
                <input
                    placeholder="Enter Option One Text Here"
                    style={{ width: "90%", marginLeft: "13px" }}
                    onChange={(e) => setOptionOneText(e.target.value)} />
            </div>
            <div style={{ textAlign: "center", margin: "10px" }}><b>OR</b></div>
            <div>
                <input
                    placeholder="Enter Option Two Text Here"
                    style={{ width: "90%", marginLeft: "13px" }}
                    onChange={(e) => setOptionTwoText(e.target.value)} />
            </div>

            <button
                onClick={onSubmitQuestion}
                style={{ cursor: "pointer", width: "92%", margin: "13px", backgroundColor: "green", height: "30px", borderRadius: "5px", color: "white" }}><b>Submit</b></button>

        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
        auth: state.auth,
        onhome: state.onhome
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleaddquestion: (option1, option2) => { dispatch(handleaddquestion(option1, option2)) },
        onhomeA: () => {dispatch(onhome())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion)
