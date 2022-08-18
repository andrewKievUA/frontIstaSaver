import "./AddOrder.css";
import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

function AddOrder({ cartNumber, name, userId }) {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });

  const [showLinks, setshowLInks] = React.useState(false);

  const onSubmit = async (data) => {
    console.log(data, userId);
    let response = await fetch("http://localhost:5000/api/AddOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ...data, userId }),
    });

    console.log({ ...data });
    let result = await response.json();
    console.log(result.message);
    navigate(-1);
  };

  return (
    <>
      <div>
        <button
          type="button3"
          onClick={() => {
            setshowLInks(true);
          }}
        >
          {"Добавить три товара "}
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>ссылка на пользователя ...заполняет Продавец</label>
          <input
            type="text"
            {...register("instaLinkCustomer", { required: true })}
          />

          <label>ссылка на товар ...заполняет Продавец</label>
          <input
            
            {...register("instaLinkGoods", { required: true })}
          />

          {showLinks && (
            <>
              <label>Товар #2 </label>
              <input type="text" {...register("instaLinkGoods1")} />
              <label>Товар #3 </label>
              <input type="text" {...register("instaLinkGoods2")} />
              <label>Товар #4 </label>
              <input type="text" {...register("instaLinkGoods3")} />
            </>
          )}

          <label>Цена ...заполняет Продавец </label>
          <input
            
            {...register("price", {
              maxLength: 99,
            })}
          />

          <br />
          <br />
          <label> Имя ...заполняет клиент</label>
          <input
            type="text"
            {...register("firstName", {
              maxLength: 99,
              setValueAs: "",
              required: false,
            })}
          />

          <label>Фамилия ...заполняет клиент</label>
          <input
            
            {...register("lastName", {
              maxLength: 99,
              setValueAs: "",
              required: false,
            })}
          />

          <label>Город ...заполняет клиент</label>
          <input
            
            {...register("city", {
              maxLength: 99,
            })}
          />

          <label>Отделение Новой Почты ...заполняет клиент</label>
          <input
            type="text"
            {...register("postNumer", {
              maxLength: 99,
            })}
          />

          <label>Телефон ...заполняет клиент</label>
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
      <button onClick={() => navigate(-1)}>Назад</button>
      <ErrorMessage errors={errors} name="singleErrorInput" />
    </>
  );
}

function mapStateToProps(state) {
  console.log(state);
  const { cartNumber, name, userId } = state;

  return { cartNumber, name, userId };
  //return { todoList: todos.allIds }
}

export default connect(mapStateToProps, null)(AddOrder);
