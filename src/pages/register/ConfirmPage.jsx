import "./ConfirmPage.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function ConfirmPage() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/Home`;
    navigate(path);
  };

  const {register,handleSubmit, formState: { errors },} = useForm();
  const [emailExist, setEmailExist] = React.useState(false);


  const onSubmit = async (data) => {
    console.log(data);

  };

  return (
    <div>

        <button type="button" onClick={routeChange}>
          {" "}
          Подтвердить аккаунт{" "}
        </button>

    </div>
  );
}

export default ConfirmPage;
