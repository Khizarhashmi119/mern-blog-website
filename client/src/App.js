import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/header/Header";
import HomePage from "./pages/home-page/Home-page";
import BlogDetailPage from "./pages/blog-detail-page/blog-detail-page";
import LoginPage from "./pages/Login-page/Login-page";
import SignupPage from "./pages/signup-page/Signup-page";
import AddPostPage from "./pages/add-post-page/Add-post-page";
import EditPostPage from "./pages/edit-blog-page/edit-blog-page";
import Footer from "./components/footer/Footer";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/blogs/:blogId" component={BlogDetailPage}></Route>
          <Route exact path="/signup" component={SignupPage}></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/add-blog" component={AddPostPage}></Route>
          <Route exact path="/edit-blog" component={EditPostPage}></Route>
        </Switch>
        <Footer />
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
