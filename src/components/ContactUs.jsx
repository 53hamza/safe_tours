import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    enquiry: "",
    bookingType: "enquiry",
  });

  const [errors, setErrors] = useState({});

  // 🔹 Validation (reused from modal)
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = "Name is required.";
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Phone number must be 10 digits.";
    }

    if (!formData.enquiry) {
      newErrors.enquiry = "Enquiry is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Handle Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    try {
      const res = await axios.post("/api/booking", formData);

      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
          enquiry: "",
          bookingType: "enquiry",
        });
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to send enquiry");
      console.error(err);
    }
  };

  return (
    <section className="section-padding side-space" id="contact-us">
      <div className="row g-3">
        {/* Left: Google Map */}
        <div className="col-md-6">
          {/* <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!..." 
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "400px", borderRadius: "8px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe> */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.731883644051!2d73.89638047343699!3d18.450478782629528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb3e4f86a7ed%3A0x2c1f5209b3cb285f!2sSamruddha%20Jeevan%20Sankul%20Co%20Op%20Housing%20Society!5e0!3m2!1sen!2sin!4v1755800895550!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{border:0, minHeight: "400px", borderRadius: "8px"}}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Right: Contact Form */}
        <div className="col-md-6 contact-us-form">
          <h2 className="section-heading">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="custom-input mb-2"
              name="fullName"
              placeholder="Your Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && (
              <div className="text-danger">{errors.fullName}</div>
            )}

            <input
              className="custom-input mb-2"
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}

            <input
              className="custom-input mb-2"
              name="mobile"
              placeholder="Your Phone Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              maxLength="10"
            />
            {errors.mobile && (
              <div className="text-danger">{errors.mobile}</div>
            )}

            <textarea
              className="custom-input mb-2"
              name="enquiry"
              placeholder="Your Enquiry"
              value={formData.enquiry}
              onChange={handleChange}
            ></textarea>
            {errors.enquiry && (
              <div className="text-danger">{errors.enquiry}</div>
            )}

            <div className="text-end">
              <button type="submit" className="primary-button">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
