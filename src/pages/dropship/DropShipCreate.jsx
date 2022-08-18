import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

function DropShipCreate({ email, confirmed, userId, password }) {
  let navigate = useNavigate();
  let [idLink, setidLink] = React.useState(0);

  const showOrder = async () => {
    let response = await fetch("http://localhost:5000/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ userId, email, confirmed, password }),
    });

    let result = await response.json();
    console.log(result.message);
  };



  const { register, handleSubmit, setValue } = useForm({
    shouldUseNativeValidation: true,
  });



  React.useEffect(() => {
    const detailOrder = async () => {
      let response = await fetch("http://localhost:5000/api/drop/showMaxId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({  userId }),
      });
      let result = await response.json();

      console.log(result.message);
      setidLink(result.message || 0)
     
    };
    detailOrder()
  }, []);

  





  const onSubmit = async (data) => {
    console.log(data,idLink);
    console.log(idLink);


    let response = await fetch("http://localhost:5000/api/drop/CreateLink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ...data,owner:userId,idLink }),
    });
    let result = await response.json();
    console.log(result);
    if (result.cartNumber && result.name) {

      if (  result.name) {
        ;
      }
    }
   // navigate(-1);
  };
  // пока висит айдишник номера товара а также получение  айди пользователя


  return (
    <div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Ссылка на товар в Istagram</label>
        <input
          {...register("instaLink", { required: true })} // custom message
        />

        <label>Ссылка на товар поставщика</label>
        <input
          {...register("instaSupplier", { required: true })} // custom message
        />

        <label>Цена закупки</label>
        <input
          {...register("priceBuy")} // custom message
        />

        <label>Цена Продажи</label>
        <input
          {...register("priceSell")} // custom message
        />

        <label>Цена доставки от курьера</label>
        <input
          {...register("courier")} // custom message
        />


        <input type="submit" value="Создать Товар" />
      </form>

      <button
        type="button2"
        onClick={() => {
          navigate(-1);
        }}
      >
        {"назад "}
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

export default connect(mapStateToProps, null)(DropShipCreate);
