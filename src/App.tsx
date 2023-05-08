import React from 'react'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from './context/AuthContext'

import withMenuHOC from './hoc/withMenu'
import AddNewTeamPage from './pages/AddNewTeamPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import TeamPage from './pages/TeamPage'
import TeamsPage from './pages/TeamsPage'
import VacationsPage from './pages/VacationsPage'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

type AppProps = {}

const App: React.FC<AppProps> = () => {
  const { currentUser } = useAuth()

  const withHandleUser = (element: React.ReactNode) => (currentUser ? element : <Navigate to='/login' replace />)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/vacations' replace />} />
        <Route path='/login' element={<LoginPage />} />

        <Route path='/vacations' element={withHandleUser(withMenuHOC(<VacationsPage />))} />
        <Route path='/teams' element={withHandleUser(withMenuHOC(<TeamsPage />, { needBoard: true }))}></Route>
        <Route path='/team/:teamId' element={withHandleUser(withMenuHOC(<TeamPage />, { needBoard: true }))}></Route>
        <Route
          path='/teams/add_team'
          element={withHandleUser(withMenuHOC(<AddNewTeamPage />, { needBoard: true }))}
        ></Route>
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
