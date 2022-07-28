import "./userHomePage.css";
import React from "react";

import { connect } from "react-redux";
import AddOrder from "./AddOrder";
import { useNavigate } from "react-router-dom";

function UserHomePage({ email, confirmed }) {
  let navigate = useNavigate();

  const routeChange = () => {
    navigate(`/AddOrder`);
  };


  return (
    <div>

      <button type="button" onClick={routeChange}> Создать заказ</button>
      <button>
        {" "}
        {email || null}
        {confirmed
          ? null
          : "    Пожалуйста проверьте вашу почту и перейдите по ссылке для окнчания регистрации. Если письма нету проверьте спам или вкладку рассылки"}
      </button>

    
    </div>
  );
}

function mapStateToProps(state) {
  const { email, confirmed } = state;
  console.log(state, confirmed);
  return { email, confirmed };
  //return { todoList: todos.allIds }
}

export default connect(mapStateToProps, null)(UserHomePage);
