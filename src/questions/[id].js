import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Nav from '../Nav'
import NotFound from '../NotFound'
import Questionpage from '../Questionpage'
import { getquestions, handlesubmitanswer, onhome } from '../Redux/Action'

const AnsweredQuestions = ({ loggedInUser, questions, users, handlesubmitanswer, onhome, onhomeA }) => {

    useEffect(() => {
        !onhome && onhomeA()
    })

    const { id } = useParams()
    console.log(id)
    if (!Object.keys(questions).includes(id)) {
        return <NotFound />
    }

    else {
        return (
            <div>
                <Nav/>
                <Questionpage id = {id}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
        questions: state.questions,
        users: state.users,
        unansweredquestions: state.unanswered_questions,
        answeredquestions: state.answered_questions,
        auth: state.auth,
        onhome: state.onhome
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getquestions: () => { dispatch(getquestions()) },
        handlesubmitanswer: (id, answer) => { dispatch(handlesubmitanswer(id, answer)) },
        onhomeA: () => { dispatch(onhome()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnsweredQuestions)

