/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect,useContext } from "react";
import { Header } from "antd/lib/layout/layout";
import { UserContext } from "../../providers/UserProvider";
import {  Button, Menu, Avatar } from "antd";
import logo from "./../../assets/logo.svg";
import { Link } from "react-router-dom";
import { DownOutlined, LoginOutlined } from "@ant-design/icons";
import {auth} from "./../../firebase";
import { useHistory } from "react-router-dom";
import "./Header.scss"
const { SubMenu } = Menu;
function HeaderMenu() {
    const [current, SetCurrent] = useState("topHeadlines");
    const user = useContext(UserContext);
    const handleClick = (e) => {
      console.log(e);
        SetCurrent(e.key);
      };
      let history = useHistory();
      useEffect(() => {
        console.log(history);
        switch (history.location.pathname) {
          case '/top-headlines':
            SetCurrent("topHeadlines");
            break;
            case '/followed-topics':
              SetCurrent("followedTopics");
              break;
          default:
            SetCurrent("topHeadlines");
            break;
        }
        
      }, [history.location.pathname]);
    return(
        <Header className='header'>
        <div className='logo'>
          <img src={logo} alt='logo' style={{width:64}} />
        </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div className='leftNavSection'>
        <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
         

 <Menu.Item key="topHeadlines" >
 <Link to='/top-headlines' className="inter-body2-medium"> Top Headlines <span className='mx-2'>&nbsp;</span></Link>
          </Menu.Item>

         

         
          {user &&  <Menu.Item key="followedTopics">
          <Link to='/followed-topics' className="inter-body2-medium">  Followed Topics <span className='mx-2'>&nbsp;</span>
          </Link>  </Menu.Item> }
        </Menu>
      </div>
      <div className='rightNavSection'>
           {user ?  <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
              <SubMenu
                key='Profile'
                title={
                  <div className='d-flex align-items-center Profile' style={{ fontFamily: "Inter" }}>
                    <div>
                      {user.photoURL ?  <Avatar size={40} src={user.photoURL} alt='' />: 
                      <Avatar size={40} style={{ backgroundColor: "#5A4992" }}>
                        {user.displayName[0]?.toUpperCase()}
                        {user.displayName[1]?.toUpperCase()}
                      </Avatar> }
                    </div>
                    <div className='d-flex justify-content-between w-100 ml-2'>
                      <div className='d-flex flex-column ml-2 align-self-center mr-1'>
                        <p className='inter-body2-medium mb-0' style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
                          &nbsp;{user.displayName}&nbsp;
                        </p>
                      </div>
                      <div className='ml-2'>
                        <DownOutlined className='mr-0' />
                      </div>
                    </div>{" "}
                  </div>
                }
                popupClassName='submenu'
              >
              
                  <Menu.Item key='Signout' onClick = {() => {auth.signOut()   
                  history.push({
      pathname: "/top-headlines",
    });}}>
                    Sign out
                  </Menu.Item>
                
              </SubMenu>
            </Menu> :   <Button className='add-button mr-2 obutton' size='large'  onClick = {() => {  
                  history.push({
      pathname: "/login",
    });}}>
                    <LoginOutlined /> Login
                  </Button> }
          </div>
      </div>

      </Header>
    )
}

export default HeaderMenu;