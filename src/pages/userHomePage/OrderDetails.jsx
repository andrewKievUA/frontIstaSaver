import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

let ccc = false;

function OrderDetails({ cartNumber, name, userId }) {
  let navigate = useNavigate();
  let ddd = useParams();

  let zzz1= ddd.id.slice(3).split(":")
 console.log(zzz1);



  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();



  React.useEffect(() => {
    const detailOrder = async () => {
      let response = await fetch("http://localhost:5000/api/detailOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ _id: zzz1[0], userId: zzz1[1] }),
      });

      let result = await response.json();
      const r = result.message
      console.log(result.message);
      setValue("firstName", r.firstName);
      setValue("lastName", r.lastName);

      setValue("postNumer", r.postNumer);
      setValue("telephone", r.telephone);

      setValue("payed", r.payed);
      setValue("arrived", r.arrived);

      setValue("city", r.city);
      setValue("comment", r.comment);

      setValue("instaLinkCustomer", r.instaLinkCustomer);
      setValue("instaLinkGoods", r.instaLinkGoods);

    };

    detailOrder()
  }, []);




  const onSubmit = async (data) => {
    let response = await fetch("http://localhost:5000/api/updateOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ...data,  _id: zzz1[0], userId: zzz1[1] }),
    });

    console.log({ ...data });
    let result = await response.json();
    console.log(result.message);
  };

  return (
    <div>

      <button onClick={()=>navigate(-1)}>Назад</button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>ссылка на товар</label>
        <input
          // value = {defaultData.instaLinkGoods}
          type="text"
          {...register("instaLinkGoods", { required: true })}
        />

        <label>ссылка на пользователя</label>
        <input
          type="text"
          //  value = {defaultData.instaLinkCustomer}
          {...register("instaLinkCustomer", { required: true })}
        />

        <label> Имя</label>
        <input
          type="text"
          //  value = {defaultData.firstName}
          {...register("firstName", {
            maxLength: 99,
          })}
        />

        <label>Фамилия</label>
        <input
          type="text"
          //  value = {defaultData.lastName}
          {...register("lastName", {
            maxLength: 99,
          })}
        />

        <label>Город</label>
        <input
          type="text"
          //  value = {defaultData.city}
          {...register("city", {
            maxLength: 99,
          })}
        />

        <label>Отделение Новой Почты</label>
        <input
          type="text"
          // value = {defaultData.postNumer}
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
          //   value = {defaultData.telephone}
          {...register("telephone", {
            maxLength: 99,
          })}
        />

        <label className="center">Реквизиты для оплаты {cartNumber} </label>

        <label className="center"> на имя {name} </label>
        <label className="center"></label>
        <input type="submit" title="sdf" value="Редактировать " />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state);
  const { cartNumber, name, userId } = state;

  return { cartNumber, name, userId };
  //return { todoList: todos.allIds }
}

export default connect(mapStateToProps, null)(OrderDetails);
