import React, { useEffect } from "react";
import useForm from "../../forms/hooks/useForm";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import signupSchema from "../models/Joi/signupSchema";
import useHandleUsers from "../hooks/useHandleUsers";
import { useUser } from "../providers/UserProvider";
import { useNavigate, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container } from "@mui/material";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { useParams } from "react-router-dom";
import mapUserToModel from "../helpers/normalization/mapUserToModel";
import normalizeEditUser from "../helpers/normalization/normalizeEditUser";
import normalizeUser from "../helpers/normalization/normalizeUser";
import editUserSchema from "../models/Joi/editUserSchema";
import UserForm from "../components/UserForm";
import UserEditForm from "../components/UserEditForm";

const EditAccountPage = () => {
  const { handleUpdateUser, handleGetUser } = useHandleUsers();
  const { user } = useUser();
  const { userId } = useParams();

  const navigate = useNavigate();

  const { value, ...rest } = useForm(
    initialSignupForm,
    editUserSchema,
    handleUpdateUser
  );

  const { data, errors } = value;
  const { handleInputChange, handleReset, onSubmit, setData, validateForm } =
    rest;

  useEffect(() => {
    if (userId)
      handleGetUser(userId).then((userFromServer) => {
        if (user?._id !== userFromServer!._id) return navigate(ROUTES.ROOT);
        const modeleduser = mapUserToModel(userFromServer!);
        setData(modeleduser);
      });
  }, []);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserEditForm
        setData={setData}
        title="edit Account"
        onSubmit={onSubmit}
        onReset={handleReset}
        errors={errors}
        onFormChange={validateForm}
        onInputChange={handleInputChange}
        data={data}
      />
    </Container>
  );
};

export default EditAccountPage;
