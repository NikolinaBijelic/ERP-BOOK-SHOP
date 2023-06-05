import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/ProfilePage";
import BoardUser from "./pages/UserPage";
import BooksPage from "./pages/BooksPage";
import AddBooks from "./components/AddBooks";
import EditBook from "./components/EditBook";
import OrderPage from "./pages/OrderPage";
import AddOrder from "./components/AddOrder";
import EditOrder from "./components/EditOrder";
import Book from "./components/Book";

/*import BoardModerator from "./components/board-moderator.component";*/
import BoardAdmin from "./pages/AdminPage";
import { logout } from "./store/actions/Auth";


import LogoutIcon from "@mui/icons-material/Logout";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
    // history.listen((location) => {
    //   props.dispatch(clearMessage()); // clear message when changing location
    // });
  }

  componentDidMount() {
    const user = this.props.user;
   
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
  
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">
              <Link to={"/"} className="navbar-brand">
                BOOK WEB SHOP
              </Link>

              <div className="navbar-nav mr-auto float-right">
                <li className="nav-item ">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>

                {showModeratorBoard && (
                  <li className="nav-item">
                    <Link to="/mod" className="nav-link">
                      Moderator Board
                    </Link>
                  </li>
                )}
                {showAdminBoard && (
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link">
                      Admin Board
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link to="/user" className="nav-link">
                      User
                    </Link>
                  </li>
                )}
              </div>
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/user-profile" className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      <LogoutIcon />
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </div>
          </nav>
          <div className="container mt-3">
            <Routes>
              {["/", "/home"].map((path) => (
                <Route path={path} element={<HomePage />} />
              ))}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/user" element={<BoardUser />} />
              {/* <Route path="/mod" component={BoardModerator} /> */}
              <Route path="/admin" element={<BoardAdmin />} />
              <Route path="/api/book" element={<BooksPage />} />
              <Route
                path="/api/create-book"
                element={<AddBooks />}
              />
              <Route path="/book/:id" element={<EditBook />} />
              <Route path="/api/order" element={<OrderPage />} />
              <Route
                path="/api/create-order"
                element={<AddOrder/>}
              />
              <Route path="/order/:id" element={<EditOrder/>} />
           <Route
                path="/book-payment/:id"
                element={<Book />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(App);
