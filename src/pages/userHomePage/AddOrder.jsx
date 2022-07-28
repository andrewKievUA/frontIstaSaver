import "./AddOrder.css";
import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Alert from "@mui/material/Alert";

function AddOrder({ cartNumber, name }) {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/Login`;
    navigate(path);
  };

  const [copi, setCopi] = React.useState({
    value: "",
    copied: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [emailExist, setEmailExist] = React.useState(false);
  const [emailCheck, setEmailCheck] = React.useState(false);

  const onSubmit = async (data) => {
    let response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ...data }),
    });
    let result = await response.json();
    console.log(result.message);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>ссылка на товар</label>
        <input type="email" {...register("text", { required: true })} />

        <label>Фамилия</label>
        <input
          type="name"
          {...register("text", {
            required: true,
            minLength: 6,
            maxLength: 99,
          })}
        />
        
        <label> Имя</label>
        <input
          type="name"
          {...register("text", {
            required: true,
            minLength: 6,
            maxLength: 99,
          })}
        />

        <label>Город</label>
        <input
          type="text"
          {...register("cartNumber", {
            minLength: 6,
            maxLength: 99,
          })}
        />

        <label>Отделение Новой Почты</label>
        <input
          type="text"
          {...register("name", {
            minLength: 6,
            maxLength: 99,
          })}
        />
        {errors.password ? (
          <label className="labelred">Заполните поле минимум 6 символов</label>
        ) : (
          <></>
        )}

        <label>Телефон</label>
        <input
          type="phone"
          
          {...register("cartNumber", {
            
            minLength: 6,
            maxLength: 99,
          })}
        />

        <label className="center">Реквизиты для оплаты {cartNumber} </label>

        <label className="center" > на имя {name} </label>
        <label className="center"> не забудьте проинформировать после оплаты </label>
        <input type="submit" title="sdf" value="Создать  заказ" />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  const { cartNumber, name } = state;

  return { cartNumber, name };
  //return { todoList: todos.allIds }
}

export default connect(mapStateToProps, null)(AddOrder);
