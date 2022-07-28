import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";

import {connect} from "react-redux";


function Home({login,LogOut}) {
 

  return (
    <div>
      HOMEPAGE

    <button onClick={login}>Login </button>
    
    <button onClick={LogOut}>Logout </button>

    </div>
  );
}

// const mapDispatchToProps = dispatch=>({
//   addItem:item=>{dispatch({payload: true, email: "wwwwLeningrad"}) }
// })

const mapDispatchToProps = (dispatch) => {

  return {
    // dispatching plain actions
    login: () => dispatch({type: 'login', auth: true, email: "wwwwLeningrad"}),
    LogOut: () => dispatch({ type: 'LogOut', auth: false, email: "" }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}

export default connect(null,mapDispatchToProps)(Home);
