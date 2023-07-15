import UserInterface from "../../models/interfaces/UserInterface";
import { UserFromClientType, UserFullType } from "../../models/types/userType";

import React from "react";

const mapUserToModel = (user: UserFullType): UserFromClientType => {
  return {
    _id: user._id,
    first: user.name.first,
    middle: user.name.middle!,
    last: user.name.last,
    phone: user.phone,
    email: user.email,
    password: user.password,
    url: user.image.url!,
    alt: user.image.alt!,
    country: user.address.country,
    state: user.address.state!,
    city: user.address.city,
    street: user.address.street,
    houseNumber: String(user.address.houseNumber),
    zip: String(user.address.zip),
    isBusiness: user.isBusiness,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  };
};

export default mapUserToModel;
