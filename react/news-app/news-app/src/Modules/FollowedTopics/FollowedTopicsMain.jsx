import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Input, Card, Button} from 'antd';
import service from "./../../services/service"
import "./../TopHeadlines/TopHeadlines.scss";
import { updateFavKeywords, getUserDocument} from "../../firebase"

import { List, Avatar, Space, Tooltip, AutoComplete, Empty, message} from 'antd';
const { Search } = Input;
function FollowedTopicsMain(){
    const user = useContext(UserContext);
      
      const [tableData, SettableData] = useState([]);
      const [timer, Settimer] = useState([]);
      const [searchkeyword,setsearchkeyword] = useState("")
      const [following,setfollowing] = useState([])
      const [userData,setuserData] = useState(null)
      const DateFormatter = (date) => {
        const newdate = new Date(date);
        return newdate.toLocaleDateString("en-US");
      };


      useEffect(() => {
          if(user){
        async function fetchMyAPI() {
          const response = await getUserDocument(user.uid)
          setuserData(response)
        }
    
        fetchMyAPI()
    }
      }, [user])

     useEffect(() => {
       
       if(userData && userData.favourites){
           setfollowing(userData.favourites)
       }
    }, [userData]);
    //    const getData = () =>{
    //     var data = getUserDocument(user.uid)
    //     if(data.favourites){
    //   setfollowing(data.favourites)
    //     }
    //    }
      useEffect(() => {
        const timer = setTimeout(() => {
            if(searchkeyword === ""){
                SettableData([])
            }else{
                getTopHeadlines(`q=${searchkeyword}`)
            }
        }, 60000);
        return () => clearTimeout(timer);
      }, [timer]);
      const getTopHeadlines = (query) => {
        service.getNewsData(`/everything?${query}`, isSuccess, isError);
        var today = new Date(),
        time = today.toLocaleString();
        Settimer(time)
      };
      const isSuccess = (response) => {
       
        SettableData(response.data.articles)
      };
      const isError = (error) => {
        message.error(error.message);
      };
   
   
    const options = [];
for (let i = 0; i < following.length; i++) {
    options.push({
        value:  following[i]
  });
}
    

    const onSelect = value => {
        setsearchkeyword(value)
       
        if(value === ""){
            SettableData([])
        }else{
            if(user.favourites && following.length < 1){
                setfollowing(user.favourites)
              }
            getTopHeadlines(`q=${value}`)
        }
     
    };
    const unfollowKeyord = () =>{
        if(user){
            var arr = following
            arr = arr.filter(item => item !== searchkeyword)
          updateFavKeywords(user.uid,[...arr])
          setfollowing(arr)
          SettableData([])
          setsearchkeyword("")
      }
      }
      const locale = {
        emptyText: (
          <Empty
            className="my-5"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <>
                <span className="inter-headline1-bold mb-2 text-center">
                  No Topic Selected
                </span>
              </>
            }
          ></Empty>
        ),
      };
    return following.length < 1 ? <div style={{marginTop:72}}> <Empty
    className="mt-5"
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description={
      <>
        <span className="inter-headline1-bold mb-2 text-center">
          Followed Topics List Empty
        </span>
        <br />
        <span className="inter-placeholder" style={{ maxWidth: 510 }}>
          Follow Topics via Search in  <span className="inter-body2-medium"> Top Headlines</span>
        </span>
      </>
    }
  ></Empty></div>  : (
<div style={{marginTop:72}}>
<Card
            title={<>
            <p> <small class="text-muted">Refreshed at: {timer}</small></p>
            <h2>Followed Topics</h2>
            {searchkeyword && (<p> Showing Results for {searchkeyword} <Tooltip title="Unfollow here to remove this keyword to favourites"><Button type="primary" shape="round" onClick={unfollowKeyord} size={"small"}>
          Unfollow
        </Button></Tooltip></p>)}</>}
            extra={
                <AutoComplete
                style={{ width: 200 }}
                options={options}
                placeholder="Select Topic"
                onSelect={onSelect}
                size="large"
                defaultOpen={true}
              />
            }
          >
               <List
    itemLayout="vertical"
    size="large"
    className="col-10 mx-auto"
    pagination={{
      onChange: page => {
      },
      pageSize: 10,
    }}
    locale={locale}
    dataSource={tableData}
    
    // }
    renderItem={item => (
      <List.Item
        key={item.title}
       
        extra={
          <img
            width={272}
            alt="logo"
            src={item.urlToImage ? item.urlToImage : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" }
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar size={40} style={{ backgroundColor: "#5A4992" }}>
             
          {item.source.name  && item.source.name[0]?.toUpperCase()}
          {item.source.name  && item.source.name[1]?.toUpperCase()}
        </Avatar>}
          title={<a href={item.url}>{item.title}</a>}
          description={<><p>Published On: {item.publishedAt ? DateFormatter(item.publishedAt) : "NA"}</p>
          {item.description}</>}
        />
        {item.content}
      </List.Item>
    )}
  />
              </Card>
</div>
    );
}
export default FollowedTopicsMain;