import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";

class LoadImg extends React.Component {
  dataImg = [];
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };

    this.uploadImage = this.uploadImage.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
  }

  async uploadImage(event) {
    // let body = new FormData();
    // if (event.target.files && event.target.files[0]) {
    //   let img = event.target.files[0];

    //   body.set("key", "41bc11716a6f3eb2a7183ea82b214b33");
    //   body.append("image", img);
    // }

    if (event.target.files.length >= 1) {
      let body = new FormData();
      body.set("key", "87fbdbb2d807cd975b8bc16ad3e5cc6f");
      for (let i = 0; i < event.target.files.length; i++) {
        let img = event.target.files[i];
        body.append("image", img);
        await axios({
          method: "post",
          url: "https://api.imgbb.com/1/upload",
          data: body,
        }).then((res) => {
          this.dataImg[i] = {
            name: res.data.data.title,
            url_display: res.data.data.display_url,
            url_delete: res.data.data.delete_url,
          };
          console.log(this.dataImg[i]);

          // this.setState({
          //     image: res.data.data.delete_url
          //   });
        });
      }
    }

    return this.checkLoad();
  }

  checkLoad = () => {
    console.log(this.dataImg.length);
  };

  render() {
    return (
      <div>
        <img src={this.state.image} />
        <h1>Select Image</h1>
        <input
          type="file"
          name="myImage"
          accept="image/*"
          onChange={this.uploadImage}
          multiple
        />
      </div>
    );
  }
}

export default LoadImg;
