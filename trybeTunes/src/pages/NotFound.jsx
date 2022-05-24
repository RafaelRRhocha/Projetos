import React from "react";
import "../Css/PageNotFound.css";

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="div-error" >
        <div className="error" title="404">404</div> 
      </div>
    );
  }
}
