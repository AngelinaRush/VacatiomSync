import { Component } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import withMenuHOC from './hoc/withMenu'
import AddNewTeamPage from './pages/AddNewTeamPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import VacationsPage from './pages/VacationsPage'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

type AppProps = {}
type AppState = {}

class App extends Component<AppProps, AppState> {
  render() {
    return (
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/team/:teamId' element={withMenuHOC(<VacationsPage />)}></Route>
          <Route path='/teams/add_team' element={withMenuHOC(<AddNewTeamPage />)}></Route>
          <Route Component={NotFoundPage} />
        </Routes>
      </Router>
    )
  }
}

export default App
