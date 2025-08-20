import React from "react";
import { FaWhatsapp } from "react-icons/fa";
// import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const phoneNumber = "+919156205253"; 
  const message = "Hey I want to book";

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <button className="whatsapp-button" onClick={handleClick}>
      <FaWhatsapp size={28} />
    </button>
  );
};

export default WhatsAppButton;
