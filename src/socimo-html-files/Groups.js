import React, { useState, useEffect } from "react";
import "../css/group.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"

function Groups(props) {
  const [listGroups, setListGroups] = useState([]);
  const userInfo = useSelector(state => state.userReducer.user)
  async function featchGroups() {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/groups?pageNumber=0&pageSize=0`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if(response.status === 200){
        const listGroups = [];
        const listIdGroups = [];
        const listAlumniIngroups = await fetchAlumiIngroup();
       
          for(let j = 0; j < listAlumniIngroups.length;j++){
            if(listAlumniIngroups[j].alumniId === userInfo.infoDetail.id){
              listIdGroups.push(listAlumniIngroups[j].classId);
            }
          }

          for(let i = 0; i < response.data.length; i++){
            for(let j = 0; j < listIdGroups.length;j++){
              if(listIdGroups[j] == response.data[i].id){
               listGroups.push(response.data[i]); 
              }
            }
          }
        
      setListGroups(listGroups);
   
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAlumiIngroup = async () =>{
    try {
      const response = await axios.get('https://truongxuaapp.online/api/v1/alumniingroup?pageNumber=0&pageSize=0',
      {headers: {
        "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
      }})
      const listAlumniIngroups = response.data
      return listAlumniIngroups
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    featchGroups();
  }, []);

  const renderGroup = () => {
    return listGroups.map((group) => {
      return (
        <div className="group-wrap ">
          <div className="group-item">
            <a href="#">
              <h5 className="group-name">{group.name}</h5>
            </a>

            <p className="creator">(Trưởng nhóm) </p>
          </div>
          <div className="body">
            <img className="group-img" src={group.avataImg} />
            <p
              style={{
                color: "black",
                fontSize: 12,
                marginBottom: 0,
              }}
            >
              {group.description}
            </p>
          </div>

          <div className="bottom">
            <Link to={`groupDetails?idGroup=${group.id}`}>
              <p className="join">Tham gia</p>
            </Link>
          </div>
        </div>
      );
    });
  };

  return <div className="group-grid">{renderGroup()}</div>;
}

export default Groups;
