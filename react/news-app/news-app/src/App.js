
import "./App.scss";
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from "react";
import UserProvider from "./providers/UserProvider";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import HeaderMenu from "./Modules/Utilities/HeaderMenu"
import TopHeadlinesMain from "./Modules/TopHeadlines/Components/TopHeadlinesMain"
import FollowedTopicsMain from "./Modules/FollowedTopics/FollowedTopicsMain"
import Layout from "antd/lib/layout/layout";
import AuthMain from "./Modules/Authentication/AuthMain"
function App() {
  return (
    <Layout className='mainLayout'>
       <UserProvider>
<HeaderMenu></HeaderMenu>
      <Switch>
      <Route path="/" exact component={TopHeadlinesMain}></Route>
                  <Route path="/top-headlines" exact component={TopHeadlinesMain}></Route>
                  <Route path="/followed-topics" exact component={FollowedTopicsMain}></Route>
                  <Route path="/login" exact component={AuthMain}></Route>
                  </Switch>
                  </UserProvider>
 </Layout>
  );
}

export default App;
