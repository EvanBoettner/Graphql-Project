import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";
import MainNavigation from "./components/Navigation/MainNavigation";
import AuthContext from "./context/auth-context";
import { Component } from "react";

class App extends Component {
  state = {
    token: null,
    userId: null,
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Routes>
                {!this.state.token && (
                  <Route path="/auth" element={<AuthPage />} />
                )}
                {!this.state.token && (
                  <Route path="/" element={<Navigate replace to="/auth" />} />
                )}
                {!this.state.token && (
                  <Route
                    path="/bookings"
                    element={<Navigate replace to="/auth" />}
                  />
                )}
                {this.state.token && (
                  <Route path="/" element={<Navigate replace to="/events" />} />
                )}
                {this.state.token && (
                  <Route
                    path="/auth"
                    element={<Navigate replace to="/events" />}
                  />
                )}
                <Route path="/events" element={<EventsPage />} />
                {this.state.token && (
                  <Route path="/bookings" element={<BookingsPage />} />
                )}
              </Routes>
            </main>
          </AuthContext.Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
