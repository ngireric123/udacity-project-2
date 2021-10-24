import { connect } from 'react-redux';
import './App.css';
import Home from './Home';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom'
import Id from './questions/[id]';
import CreateQuestion from './createQuestion';
import { useEffect } from 'react';
import { getquestions, getUsers } from './Redux/Action';
import LeaderBoard from './LeaderBoard';
import NotFound from './NotFound';


const App = ({ getUsers, getquestions, auth}) => {
  useEffect(() => {
    getUsers()
    getquestions()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(useParams())

  return (
    <Router>

      <div className="App">
        {
          auth === false ? (
            <Route render={() => (
              <Login />
            )}
            />
          ) :
            (

              <Switch>
                <Route exact path='/' render={() => (
                  <Login />
                )}
                />
                <Route path='/home' render={() => (
                  <Home />
                )}
                />
                <Route path='/questions/:id' render={() => (
                  <Id />
                )}
                />
                
                <Route path='/add' render={() => (
                  <CreateQuestion />
                )}
                />
                <Route path='/leaderboard' render={() => (
                  <LeaderBoard />
                )}
                />
                <Route>
                  <NotFound />
                </Route>
              </Switch>

            )
        }
      </div>

    </Router>

  );
}
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => { dispatch(getUsers()) },
    getquestions: () => { dispatch(getquestions()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
