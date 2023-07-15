import React from "react";
import AddressInterface from "../models/interfaces/AddressInterface";

type Props = {
  address: AddressInterface;
};

const BizLocationMap: React.FC<Props> = ({ address }) => {
  const { houseNumber, street, city, country } = address;

  const url = encodeURIComponent(`${houseNumber} ${street} ${city} ${country}`);
  const mapUrl = `https://maps.google.com/maps?q=${url}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  return (
    <div>
      <iframe
        title="Location"
        width="180"
        height="180"
        allowFullScreen
        src={mapUrl}
      ></iframe>
    </div>
  );
};

export default BizLocationMap;
