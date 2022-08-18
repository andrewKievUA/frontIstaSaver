import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

let ccc = false;

function OrderDetails({ name }) {
  let navigate = useNavigate();
  let ddd = useParams();

  let zzz1 = ddd.id.slice(3).split(":");
  console.log(zzz1);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [link1, setlink1] = React.useState("");
  const [link2, setlink2] = React.useState("");
  const [linkGoods1, setlinkGoods1] = React.useState("");
  const [linkGoods2, setlinkGoods2] = React.useState("");
  const [linkGoods3, setlinkGoods3] = React.useState("");

  const [showOtherLinks, setshowOtherLinks] = React.useState(false);
  const [showOtherLinks1, setshowOtherLinks1] = React.useState(false);
  const [cartNumber, setcartNumber] = React.useState("");
  const [nameTrader, setnameTrader] = React.useState("");
  const [traderPermit, setTraderPermit] = React.useState(false);

  const [payed, setpayed] = React.useState(false);
  const [arrived, setarrived] = React.useState(false);

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
      const r = result.message;
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
      setValue("instaLinkGoods1", r.instaLinkGoods1);
      setValue("instaLinkGoods2", r.instaLinkGoods2);
      setValue("instaLinkGoods3", r.instaLinkGoods3);
      if (r.instaLinkGoods1 !== "") {
        setshowOtherLinks(true);
      }
      setValue("price", r.price);
      setlink1(r.instaLinkGoods);
      setlink2(r.instaLinkCustomer);
      setlinkGoods1(r.instaLinkGoods1);
      setlinkGoods2(r.instaLinkGoods2);
      setlinkGoods3(r.instaLinkGoods3);
      setpayed(r.payed);
      setarrived(r.arrived);
      
    };

    const detailUser = async () => {
      let response = await fetch("http://localhost:5000/api/detailUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ _id: zzz1[0], userId: zzz1[1] }),
      });
      let result = await response.json();
      console.log(result);
      if (result.cartNumber && result.name) {
        setcartNumber(result.cartNumber);
        setnameTrader(result.name);
        if (name === result.name) {
          setTraderPermit(true);
        }
      }
    };
    detailUser();
    detailOrder();
  }, []);

  const onSubmit = async (data) => {
    let response = await fetch("http://localhost:5000/api/updateOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ...data, _id: zzz1[0], userId: zzz1[1] }),
    });

    console.log({ ...data });
    let result = await response.json();
    console.log(result.message);
    navigate(-1)
  };

  const updateOrderField = async (inp) => {
    let response = await fetch("http://localhost:5000/api/updateOrderField", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ payload: inp, _id: zzz1[0], userId: zzz1[1] }),
    });
    let r = await response.json();
    console.log(r);

    setpayed(r.payed);
    setarrived(r.arrived);
  };

  console.log(payed);

  return (
    <div>
      <div className="containerButton">
        <button type="button3" onClick={() => navigate(-1)}>
          Назад
        </button>

        {traderPermit === true ? (
          <>
            <button
              type="button4"
              onClick={() => {
                setshowOtherLinks1(!showOtherLinks1);
              }}
            >
              {showOtherLinks1 ? " Убрать три товара " : "Добавить три товара"}
            </button>

            <button
              type="button3"
              style={payed ? { backgroundColor: "blue" } : null}
              onClick={() => {
                updateOrderField({ payed: !payed, payload: "payed" });
              }}
            >
              Оплачен
            </button>

            <button
              type="button3"
              style={arrived ? { backgroundColor: "blue" } : null}
              onClick={() => {
                updateOrderField({ arrived: !arrived, payload: "arrived" });
              }}
            >
              Доставлен
            </button>

            <button
              type="button3"
              onClick={() => {
                updateOrderField({ delete: true, payload: "delete" });
                navigate(-1)
              }}
            >
              Удалить заказ
            </button>
          </>
        ) : null}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {traderPermit ? (
          <>
            <a href={link2}>
              <label>ссылка на пользователя Click</label>
            </a>
            <input
              type="text"
              {...register("instaLinkCustomer", { required: true })}
            />
          </>
        ) : null}
        <a href={link1}>
          <label>ссылка на товар Click</label>{" "}
        </a>
        <input
          type="text"
          {...register("instaLinkGoods", { required: true })}
        />

        {showOtherLinks || showOtherLinks1 ? (
          <>
            <a href={linkGoods1}>
              <label>ссылка на товар №2 Click</label>{" "}
            </a>
            <input type="text" {...register("instaLinkGoods1")} />
            <a href={linkGoods2}>
              <label>ссылка на товар №3 Click</label>{" "}
            </a>

            <input type="text" {...register("instaLinkGoods2")} />
            <a href={linkGoods3}>
              <label>ссылка на товар №4 Click</label>{" "}
            </a>

            <input type="text" {...register("instaLinkGoods3")} />
          </>
        ) : null}
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
        
        <label>Телефон</label>
        <input
          type="phone"
          {...register("telephone", {
            maxLength: 99,
          })}
        />
        <label>Цена</label>
        <input
          type="text"
          {...register("price", {
            maxLength: 99,
          })}
        />
        <label className="center">Реквизиты для оплаты {cartNumber} </label>
        <label className="center"> на имя {nameTrader} </label>
        <label className="center">
          Пожалуйста после оплаты не забудьте проинформировать
        </label>
        <input type="submit" title="sdf" value="Редактировать " />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state);
  const { cartNumber, name, userId } = state;

  return { cartNumber, name, userId };
}

export default connect(mapStateToProps, null)(OrderDetails);
