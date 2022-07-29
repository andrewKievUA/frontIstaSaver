import "./AddOrder.css";
import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddOrder({ cartNumber, name,userId }) {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/Login`;
    navigate(path);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const onSubmit = async (data) => {
    let response = await fetch("http://localhost:5000/api/AddOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ...data,userId }),
    });

    console.log({ ...data });
    let result = await response.json();
    console.log(result.message);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>ссылка на товар</label>
        <input
          type="text"
          {...register("instaLinkGoods", { required: true })}
        />

        <label> Имя</label>
        <input
          type="text"
          {...register("firstName", {
            maxLength: 99,
          })}
        />



            <label>Фамилия</label>
        <input
          type="text"
          {...register("lastName", {
            maxLength: 99,
          })}
        />

        <label>Город</label>
        <input
          type="text"
          {...register("city", {
            maxLength: 99,
          })}
        />

        <label>Отделение Новой Почты</label>
        <input
          type="text"
          {...register("postNumer", {
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
          {...register("telephone", {
         
            maxLength: 99,
          })}
        />

        <label className="center">Реквизиты для оплаты {cartNumber} </label>

        <label className="center"> на имя {name} </label>
        <label className="center">
          {" "}
          не забудьте проинформировать после оплаты{" "}
        </label>
        <input type="submit" title="sdf" value="Создать  заказ" />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state);
  const { cartNumber, name, userId } = state;

  return { cartNumber, name,userId };
  //return { todoList: todos.allIds }
}

export default connect(mapStateToProps, null)(AddOrder);
