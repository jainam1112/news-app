import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import { Input, Card, Button} from 'antd';
import service from "./../../../services/service"
import "./../../TopHeadlines/TopHeadlines.scss";
import { updateFavKeywords } from "../../../firebase"
import { List, Avatar, Space, Tooltip,message} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const { Search } = Input;
function TopHeadlinesMain(){
    useEffect(() => {
        getTopHeadlines("country=in");
      }, []);
      
      const [tableData, SettableData] = useState([]);
      const [timer, Settimer] = useState([]);
      const [searchkeyword,setsearchkeyword] = useState("")
      const [following,setfollowing] = useState([])
      const DateFormatter = (date) => {
        const newdate = new Date(date);
        return newdate.toLocaleDateString("en-US");
      };
      const user = useContext(UserContext);

      useEffect(() => {
        const timer = setTimeout(() => {
            if(searchkeyword === ""){
                getTopHeadlines("country=in");
            }else{
                getTopHeadlines(`q=${searchkeyword}`)
            }
        }, 60000);
        return () => clearTimeout(timer);
      }, [timer]);


      const getTopHeadlines = (query) => {
        service.getNewsData(`/top-headlines?${query}`, isSuccess, isError);
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
    const followKeyord = () =>{
      if(user){
        if(following.includes(searchkeyword.toLowerCase())){
          message.success("Keyword already followed")
        }
        else{
        var array = [...following,searchkeyword.toLowerCase()]
        
        updateFavKeywords(user.uid,array)
        setfollowing(array)
        console.log(array);
    }
    }
  }
    const onSearch = value => {
        setsearchkeyword(value)
       
        if(value === ""){
            getTopHeadlines("country=in");
        }else{
            if(user.favourites && following.length < 1){
              setfollowing(user.favourites)
            }
            getTopHeadlines(`q=${value}`)
            
        }
     
    };

    return(
<div style={{marginTop:72}}>
<Card
            title={<>
            <p> <small class="text-muted">Refreshed at: {timer}</small></p>
            <h2>Top Headlines</h2>
            {searchkeyword && <p> Showing Results for {searchkeyword} {user && <Tooltip title="Follow here to add this keyword to favourites"><Button type="primary" shape="round" onClick={followKeyord} size={"small"}>
          Follow
        </Button></Tooltip>}</p>}</>}
            extra={
                <Search placeholder="Search" onSearch={onSearch} style={{ width: 200 }} allowClear  size="large"/>
            }
          >
               <List
    itemLayout="vertical"
    size="large"
    className="col-10 mx-auto"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 10,
    }}
    dataSource={tableData}

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
export default TopHeadlinesMain;