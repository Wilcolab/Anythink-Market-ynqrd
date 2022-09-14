import React from "react";
import logo from "../../imgs/logo.png";

const Banner = (props) => {
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span id="get-part">A place to get</span>
          <span> the cool stuff.</span>
        </div>
        <div className="flex-row">
          <h3 className="mr-2 grow-0">A Place to get</h3>
          <input
            id="search-box"
            className="max-w-2"
            name="search"
            type="text"
            placeholder="What is it that you truly desire?"
            value={props.query}
            onChange={props.handleChange}
          />
          <h3 className="mr-2 grow-0">the cool stuff</h3>
        </div>
      </div>
    </div>
  );
};

export default Banner;
