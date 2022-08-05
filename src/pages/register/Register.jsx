import "./Register.css";
import React from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";

function Register() {
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

    result.message === "Такой пользователь уже существует"
      ? setEmailExist(true)
      : setEmailExist(false);
    result.message === "пользователь создан"
      ? setEmailCheck(true)
      : setEmailCheck(false);

    setTimeout(() => {
      navigate(`/Login`);
    }, 10000);

    console.log(result.message);
  };

  return (
    <div>
      Регистрация
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email ? (
          <label className="labelred">Заполните поле</label>
        ) : (
          <></>
        )}
        {emailExist && (
          <Alert severity="error">
            Пользователь с таким Email уже существует
          </Alert>
        )}
        {emailCheck && (
          <Alert severity="success">
            Пользователь Создан. Пожалуйста проверьте вашу почту и перейдите по
            ссылке для окончания регистрации. Если письма нету проверьте спам
            или вкладку рассылки
          </Alert>
        )}

        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 99,
          })}
        />

        <label>Номер банковской Карты (необходим для оплаты клиентами)</label>
        <input
          type="text"
          {...register("cartNumber", {
            minLength: 6,
            maxLength: 99,
          })}
        />



        <label>Фамилия И.О (от карты необходима для оплаты)</label>
        <input
          type="text"
          {...register("name", {
            minLength: 6,
            maxLength: 99,
          })}
        />



        <label>Номер Телефона</label>
        <input
          type="text"
          {...register("phone", {
            minLength: 6,
            maxLength: 99,
          })}
        />

        <input type="submit" title="sdf" value="Регистрация" />
        <button type="button" onClick={routeChange}>
          {" "}
          я уже зарегистрирован и у меня есть аккаунт{" "}
        </button>
      </form>
    </div>
  );
}

export default Register;
