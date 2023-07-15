import React from "react";
import { UserFromClientType } from "../../models/types/userType";

const normalizeEditUser = (user: UserFromClientType) => {
  return {
    _id: user._id,
    name: {
      first: user.first,
      middle: user.middle,
      last: user.last,
    },
    phone: user.phone,
    email: user.email,
    password: user.password,
    image: {
      url: user.url,
      alt: user.alt,
    },
    address: {
      country: user.country,
      state: user.state,
      city: user.city,
      street: user.street,
      houseNumber: +user.houseNumber,
      zip: +user.zip,
    },
    isBusiness: user.isBusiness,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  };
};

export default normalizeEditUser;
