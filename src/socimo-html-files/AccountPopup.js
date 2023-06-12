import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/popup.css";
import {useSelector} from "react-redux"
import { useForm } from "react-hook-form";
import { render } from "@testing-library/react";
import {useDispatch} from "react-redux"
import {newUser} from "../redux/actions/userInfo"
function AccountPopup(props) {
  const initialState = {
    search: "",
    phone: "",
    address: "",
    bio: "",
    img: "",
    schoolId: "",
    email: "",
    password: "",
    yearId:"",
    name :"",
  };
   const jwtDecode = require("jwt-decode").default;
   const userInfo = useSelector(state => state.userReducer.user)
  const token =   useSelector(state => state.userReducer.token)
  const [alumiId,setAluniId] = useState(9);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState(initialState);
  const [searchList, setSearchList] = useState([]);
  const [schoolName, setSchoolName] = useState("");
  const [schoolYear, setSchoolYear] = useState([]);
  const [yearOfOneSchool,setYearOfOneSchool] = useState([]);
  const SearchList = () => {
    return searchList.map((search) => {
      return (     
           <p
            key={search.name}
            id={search.id}
            onClick={() => {
              fetchSchool(search);
              fetchScoolYear();
              setYearOfOneSchool(findSchoolYear(search.id));
            }}
            className={`item-search ${formData?.schoolId === search?.id ? 'active' : ''}`}
          >
            {search.name}
          </p>
      );
    });
  };

  async function featchGroups(shoolYearId) {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/schoolyears/${shoolYearId}/groups`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
        
      );
      console.log(shoolYearId)
       console.log(response.data)
      // for (let i = 0; i <response.data.length; i++) {
      //   let data = {
      //     classId: response.data[i].id,
      //     alumniId: userInfo.Id
      //   }
      //   await saveAlumiToGroup(data);
      // }
      const listGroups = response.data;
      
      return listGroups;
      
    } catch (error) {
      console.log(error);
    }
  }
  
  async function saveAlumiToGroup(data) {
    try {
      const response = await axios.post(
        `https://truongxuaapp.online/api/v1/alumniingroup`, data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if(response.status === 200){
        console.log("thanh cong " + response.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  const findSchoolYear = (schoolId) => {
    let listYears = [];
    schoolYear.forEach(element => {
      if(element.schoolId === schoolId) {
        listYears.push(element);
      }
    });
    return listYears;
  }

  const renderSchoolYear = () =>{
    return yearOfOneSchool.map((year) =>{
      return(
        <>
        <option key={year.id.toString()} value={year.id}>{formatDate(year.startDate)} - {formatDate(year.endDate)}</option>
        </>
      )
    })
  }

  const fetchSchool = (school) => {
    // try {
    //   const response = await axios.get(
    //     `http://20.188.111.70:12348/api/v1/schools/${school.id}`
    //   );
    //   setFormData({ ...formData, schoolId: response.data.id });
    // } catch (error) {
    //   console.log(error);
    // }
    setFormData({ ...formData, schoolId: school.id});
  };

  const fetchScoolYear = async () =>{
    try {
      const response = await axios.get('https://truongxuaapp.online/api/v1/schools/schoolyears?pageNumber=0&pageSize=0',
      {
        headers: {"Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,}
      });
      setSchoolYear(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const formatDate = (date) => {
    const myArr = date.split("T");
      const day = myArr[0].split("-").reverse();
       return day.join("/");
  }

  const onChange = (e) => {
    const { name, value, type } = e.target;
    // if (name === "search") {
    //   setSchoolName(value);
    // }

    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    console.log(name + ':' + value);
  };

  const saveImgInImgBB = async () => {
    let dataImgSave = {};
    if (formData.img != "") {
      let body = new FormData();
      body.set("key", "801bd3a925ecfac0e693d493198af86c");
     
          body.append("image", formData.img);
          try {
            const response = await axios({
              method: "POST",
              url: "https://api.imgbb.com/1/upload",
              data: body,
            });
            if (response.status == 200) {
              dataImgSave = {
                name: response.data.data.title,
                url_display: response.data.data.display_url,
              };
              // setFormData({...formData, img: response.data.data.display_url});
          
            }
          } catch (err) {
            console.error(err);
          }
       
    }
    return dataImgSave.url_display;
  }
  
    // console.log(data);

  const updateProfile =  async () => {
   const urlBB = await saveImgInImgBB();
     const data = {
      phone: formData.phone,
    bio: formData.bio,
    // img: formData.img,
    img:urlBB,
    schoolId: formData.schoolId,
    schoolYearId: formData.yearId,
    name :formData.name,
    email : formData.email,
    password : formData.password,
    address : formData.address,
    };
    
  try{
    const response  = await axios.put(`https://truongxuaapp.online/api/v1/alumni?id=${userInfo.Id}`,
    data,{
        headers: {"Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,}
      }
    )
    if(response.status === 200){
    const listGroup = await featchGroups(formData.yearId);
    for (let i = 0; i <listGroup.length; i++) {
        let data = {
          classId: listGroup[i].id,
          alumniId: userInfo.Id
        };
        console.log(data)
        await saveAlumiToGroup(data);
      }
    encodeToDecode(token);
	setTrigger(false);
 }
  }
  catch(err){
    console.log(err)
  }
  };
 
  const [trigger,setTrigger]= useState(true);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/alumni/${userInfo.Id}`,
        {
        headers: {"Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,}
      }
  
      );
      initialState.name = response.data.name;
      initialState.email = response.data.email;
      initialState.address = response.data.address;
      initialState.bio = response.data.bio;
      initialState.phone = response.data.phone;
      initialState.password = response.data.password;
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchSearchData() {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/schools/name?searchName=${formData.search}&pageNumber=1&pageSize=4`,{
        headers: {"Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,}
      }
      );
      setSearchList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const encodeToDecode = async (tokenUser) => {
    const data = {
      idToken: tokenUser,
    }
    try {
      const response = await axios.post(
        `https://truongxuaapp.online/api/users/log-in`,data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status == 200) {
        let decoded = jwtDecode(response.data);

        decoded.author = response.data;

        const infoDe = await findUserById(decoded.Id, response.data);

        decoded.infoDetail = infoDe;
        if (decoded.SchoolId === "") {
          decoded.infoSchool = "";
        } else {
          const schoolDe = await findSchoolById(
            decoded.SchoolId,
            response.data
          );
          decoded.infoSchool = schoolDe;
        }

       const action = newUser(decoded);
        dispatch(action);
        console.log("update" + userInfo)
      }
    } catch (err) {
      console.error(err);
    }
  };

  const findUserById = async (id, token) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/alumni/${id}`,
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  };

 const findSchoolById = async (id, token) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/schools/${id}`,
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  };


 

  useEffect(() => {
    fetchSearchData();
  }, [formData.search]);

  useEffect(() => {

    getProfile();

    fetchScoolYear();
  }, []);

  return trigger ? (
    <div
      className="popup-wrap"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000000bf",
        position: "fixed",
        zIndex: 1000,
      }}
    >
      <div
        className="popup"
      >
        <div className="popup-inner" style={{}}>
          <div className="search-school" style={{ marginLeft: 0 }}>
            <form
              style={{ borderBottom: "1px solid black", paddingBottom: 20 }}
            >
              <h6 className="label-of-field" style={{ marginBottom: 10 }}>
                Tìm trường
              </h6>
              <div className="search-field">
                <input
                  type="text"
                  onChange={onChange}
                  name="search"
                  placeholder="Search..."
                />
              </div>
              <div className="list-search">
                <SearchList />
              </div>
            </form>

            <form method="post" name="form-info">
              <div className="select-wrap">

            <select  {...register("yearId", {
    required: 'Tìm trường và chọn niên khóa của một trường' 
  })} className="select-year" id="" name='yearId'
            onChange={onChange}
            value={formData.yearId}>
              <option className="selected-year" value="">Chọn niên khóa </option>
              {renderSchoolYear()}
            </select>
             {errors.yearId && <p className="error">{errors.yearId.message}</p>}
              </div>

              <p style={{ marginBottom: 10, marginTop: 20 }}>
                Nhập Số điện thoại
              </p>
              <input
                type="text"
                {...register("phone", {
                  required: "Nhập số điện thoại ",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Số điện thoại không chứa kí tự đặc biệt hoặc chữ",
                  },
                })}
                onChange={onChange}
                value={formData.phone}
                name="phone"
                placeholder="Phone..."
              />
              {errors.phone && <p className="error">{errors.phone.message}</p>}
              <p style={{ marginBottom: 10, marginTop: 20 }}>
                Giới thiệu bản thân
              </p>
              <textarea
                {...register("bio", {
                  required: "Nhập tiểu sử ",
                })}
                onChange={onChange}
                name="bio"
                value={formData.bio}
                placeholder="Giới thiệu..."
              ></textarea>
                {errors.bio && <p className="error">{errors.bio.message}</p>}
              <p style={{ marginBottom: 10, marginTop: 20 }}>Chọn ảnh</p>
              <input type="file" onChange={onChange} name="img" />

              <button
                type="submit"
                style={{
                  position: "unset",
                  backgroundColor: "#71cff9",
                  color: "black",
                  margin: "20px auto",
                  width: "max-content",
                  display: "block",
                  padding: "10px 40px",
                  borderRadius: 10,
                  border:"none",
                  fontWeight:"bold"
                }}
                onClick={handleSubmit(updateProfile)}
              >
                Hoàn tất
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AccountPopup;