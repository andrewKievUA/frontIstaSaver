import React from "react";
import { connect } from "react-redux";

import { useNavigate} from "react-router-dom";
import DropShipTable from "./DropShipTable";

function DropShip({ email, confirmed, userId, password }) {
  let navigate = useNavigate();

  return (
    <div>
      

      <button type="button2" onClick={()=>{navigate(`/DropShipCreate`)}}>
        {" "}
        Создать товар
      </button>
      <DropShipTable userId={userId || ""}   />

      <button type="button2">

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

export default connect(mapStateToProps, null)(DropShip);
