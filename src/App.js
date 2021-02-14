import React from "react"
import Welcome from "./components/Welcome"
import Main from "./components/Main"
import './App.css';
import {AuthProvider} from "./context/authContext"
import ProtectedRoute from "./ProtectedRoute"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
    <AuthProvider>
    <ProtectedRoute exact path="/"  component={Main}/>
    <Route path="/login" component={Welcome}/>
    </AuthProvider>
    </Router>
  );
}

export default App;
