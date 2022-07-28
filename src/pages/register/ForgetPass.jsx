import "./Login.css";
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [emailExist, setEmailExist] = React.useState(false);
  const [emailCheck, setEmailCheck] = React.useState(false);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/Register`;
    navigate(path);
  };

  const onSubmit = async (data) => {
    let response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    let result = await response.json();

    result.message === "Такой пользователь уже существует"
      ? setEmailExist(true)
      : setEmailExist(false);
    result.message === "пользователь создан"
      ? setEmailCheck(true)
      : setEmailCheck(false);

    console.log(result.message);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className=""> Вход в учетную запись</label>
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
            ссылке для окнчания регистрации. Если письма нету проверьте спам или
            вкладку рассылки
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
        {errors.password ? (
          <label className="labelred">Заполните поле минимум 6 символов</label>
        ) : (
          <br />
        )}
        <br />
        <input type="submit" title="sdf" value="Вход в аккаунт" />

        <button type="button" onClick={routeChange}>
        
          я не зарегистрирован и у меня нету аккаунта
        </button>

        <button type="button" onClick={routeChange}>
          я забыл пароль
        </button>
      </form>
    </div>
  );
}

export default Login;
