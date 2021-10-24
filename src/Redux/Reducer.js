import {
    SET_LOGGEDIN_USER,
    LOGOUT, SET_ALL_USERS,
    GET_ALL_QUESTIONS,
    QUESTIONS_TO_DISPLAY, 
    ON_HOME, GET_ANSWERED, 
    GET_UNANSWERED, 
    NEW_QUESTION_ID, 
    GET_QUESTIONS_REQUEST, 
    ADD_NEW_ANSWER,
    ADD_NEW_QUESTION
} from './Types'

import { loadingBarReducer } from 'react-redux-loading-bar'

const initialState = {
    loggedInUser: "",
    users: [],
    questions: [],
    questionstodisplay: "unanswered",
    onhome: false,
    unanswered_questions: "",
    answered_questions: "",
    newquestionID: "",
    loading:false,
    loadingBar: loadingBarReducer,
    auth: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGGEDIN_USER:
            return {
                ...state,
                loggedInUser: action.payload,
                auth: true
            }
        case LOGOUT:
            return {
                ...state,
                loggedInUser: "",
                onhome: false,
                addtoanswer: false,
                auth:false
            }
        case SET_ALL_USERS:
            return {
                ...state,
                users: action.payload
            }
        case GET_ALL_QUESTIONS:
            return {
                ...state,
                questions: action.payload,
                loading: false
            }
        case GET_QUESTIONS_REQUEST:
            return{
                ...state,
                loading: true
            }
        case QUESTIONS_TO_DISPLAY:
            return {
                ...state,
                questionstodisplay: action.payload
            }
        case ON_HOME:
            return {
                ...state,
                onhome: true,

            }
        case GET_ANSWERED:
            return {
                ...state,
                answered_questions: action.payload
            }
        case GET_UNANSWERED:
            return {
                ...state,
                unanswered_questions: action.payload
            }
        case NEW_QUESTION_ID:
            return {
                ...state,
                newquestionID: action.payload
            }
        case ADD_NEW_ANSWER:
            return{
                ...state,
                users:{
                    ...state.users,
                    [action.loggedInUser]:{
                        ...state.users[action.loggedInUser],
                        answers:{
                            ...state.users[action.loggedInUser].answers,
                            [action.id]: action.answer
                        }
                    }
                },
                questions:{
                    ...state.questions,
                    [action.id]:{
                        ...state.questions[action.id],
                        [action.answer]:{
                            ...state.questions[action.id][action.answer],
                            votes:state.questions[action.id][action.answer].votes.concat([action.loggedInUser])
                        }
                    }
                }

            }
        case ADD_NEW_QUESTION:
            return{
                ...state,
                questions: {
                    ...state.questions,
                    [action.question.id]: action.question
                },

                users:{
                    ...state.users,
                    [action.loggedInUser]:{
                        ...state.users[action.loggedInUser],
                        questions: state.users[action.loggedInUser].questions.concat([action.question.id])
                    }
                }
            }
        default: return state
    }
}