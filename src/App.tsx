import { Component } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'

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
          <Route path='/*' element={<HomePage />} />
          <Route Component={NotFoundPage} />
        </Routes>
      </Router>
    )
  }
}

export default App
