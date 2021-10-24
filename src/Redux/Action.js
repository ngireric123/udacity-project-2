import {
    LOGOUT,
    SET_LOGGEDIN_USER,
    SET_ALL_USERS,
    GET_ALL_QUESTIONS,
    QUESTIONS_TO_DISPLAY,
    ON_HOME,
    NEW_QUESTION_ID,
    GET_QUESTIONS_REQUEST,
    ADD_NEW_ANSWER,
    ADD_NEW_QUESTION
} from './Types'
import * as API from '../_DATA'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const setloggedinuser = (user) => {
    return {
        type: SET_LOGGEDIN_USER,
        payload: user
    }
}
export const logout = () => {
    return {
        type: LOGOUT
    }
}
export const setAllUsers = (users) => {
    return {
        type: SET_ALL_USERS,
        payload: users
    }
}
export const onhome = () => {
    return {
        type: ON_HOME
    }
}

export const getallquestions = (users) => {
    return {
        type: GET_ALL_QUESTIONS,
        payload: users
    }
}
export const getquestionsrequest =() =>{
    return{
        type: GET_QUESTIONS_REQUEST
    }
}

export const questionstodisplay = (value) => {
    return {
        type: QUESTIONS_TO_DISPLAY,
        payload: value
    }
}
export const getUsers = () => {
    return (dispatch) => {
        return API._getUsers()
            .then(response => {
                dispatch(setAllUsers(response))
            })
    }
}

export const getquestions = () => {
    return (dispatch) => {
        dispatch(getquestionsrequest())
        return API._getQuestions()
            .then(response => {
                dispatch(getallquestions(response))
            })
    }
}

export const new_question_id=(value)=>{
    return {
        type: NEW_QUESTION_ID,
        payload: value
    }
}

export const add_new_answer =(id, answer, loggedInUser)=>{
    return{
        type: ADD_NEW_ANSWER,
        id,
        answer,
        loggedInUser
    }
}

export const handlesubmitanswer=(id, answer)=>{
    return(dispatch, getState) =>{
        const { loggedInUser } = getState()

        dispatch(showLoading())
        return API._saveQuestionAnswer({
            authedUser: loggedInUser,
            qid: id,
            answer
        })
        .then(() => dispatch(add_new_answer(id, answer, loggedInUser)))
        .then(() => dispatch(hideLoading()))
    }
}

export const add_new_question =(question, loggedInUser)=>{
    return{
        type: ADD_NEW_QUESTION,
        question,
        loggedInUser
    }
}

export const handleaddquestion=(option1, option2)=>{
    return(dispatch, getState) =>{
        const { loggedInUser } = getState()

        dispatch(showLoading())
        return API._saveQuestion({
            optionOneText: option1, 
            optionTwoText: option2, 
            author: loggedInUser
        })
        .then((question) => dispatch(add_new_question(question, loggedInUser)))
        .then(() => dispatch(hideLoading()))
    }
}