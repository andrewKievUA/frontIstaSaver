import "./userHomePage.css";
import React from "react";

import { connect } from "react-redux";
import AddOrder from "./AddOrder";
import AddOrderTable from "./AddOrderTable";

import { useNavigate } from "react-router-dom";

function UserHomePage({ email, confirmed, userId, password }) {
  let navigate = useNavigate();
  let [orders,setOrders]= React.useState([])

  const showOrder = async () => {
    let response = await fetch("http://localhost:5000/api/showOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ userId, email, confirmed, password }),
    });

    let result = await response.json();
    setOrders(result.message)
    console.log(result.message);
  };

  React.useEffect(() => {
    showOrder()
  },[]);

  return (
    <div>
      

      <button type="button2" onClick={()=>{navigate(`/AddOrder`)}}>
        {" "}
        Создать заказ
      </button>


      <AddOrderTable orders={orders || []}/>

      <button type="button2">
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
  // console.log(state)
  const { email, confirmed, userId, password } = state;

  return { email, confirmed, userId };
  //return { todoList: todos.allIds }
}

export default connect(mapStateToProps, null)(UserHomePage);
