import * as React from "react";
import {  useContext } from "react";
import {  Card, Space, Button,Tabs } from 'antd';
import { Redirect } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { signInWithGoogle } from "./../../firebase";
import { LoginOutlined ,GoogleCircleFilled, GoogleSquareFilled} from '@ant-design/icons';
import logo from './../../assets/logo.svg'
import "./AuthMain.scss"
const { TabPane } = Tabs;
function AuthMain(){


    const user = useContext(UserContext);

    return user ? (
        <Redirect to='/top-headlines' />
      ) : (
        <Space direction="vertical" align="center" className="login" style={{marginTop:"30vh"}}>
        <Card
          className="mx-auto"
          title={<div className="d-flex flex-column text-center" >
             <p className="h2 "> <LoginOutlined /></p>
          </div>}
        // //   extra={<a href="#">More</a>}
        //   tabList={tabList}
        //   activeTabKey={tabkey}
        //   onTabChange={key => {
        //     onTabChange(key);
        //   }}
        >
         <div className="card-container">
    <Tabs type="card">
      <TabPane tab="Log In" key="1">
      <div align="center">
        <Button type="primary" className='inter-body2-medium mb-2' size="large" onClick={() => {
            try {
              signInWithGoogle();
            } catch (error) {
              console.error("Error signing in with Google", error);
            }
          }}   >
        <GoogleCircleFilled  className="icon"  />
       LOG IN WITH GOOGLE
      </Button>
      </div>
      </TabPane>
      <TabPane tab="Sign Up" key="2">
      <div align="center">
        <Button type="primary"  className='inter-body2-medium mb-2'  size="large" onClick={() => {
            try {
              signInWithGoogle();
            } catch (error) {
              console.error("Error signing in with Google", error);
            }
          }}   >
        <GoogleSquareFilled className="icon" />
       SIGN UP WITH GOOGLE
      </Button>
      </div>
      </TabPane>
    </Tabs>
  </div>
  <div align="center">
  <img src={logo} alt='logo' style={{width:64}} />
  </div>
        </Card>

</Space>
    );

}
export default AuthMain;