import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const BookNowModal = ({ isOpen, onClose, carSelected }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    enquiry: "",
    bookingType: "enquiry",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    mobile: "",
    enquiry: "",
  });

  useEffect(() => {
    // Pre-fill carType in enquiry if carSelected changes
    if (carSelected) {
      setFormData((prev) => ({
        ...prev,
        enquiry: `Booking request for ${carSelected}`,
      }));
    }
  }, [carSelected]);

  const validate = () => {
    const newErrors = {};

    // Full Name Validation
    if (!formData.fullName) {
      newErrors.fullName = "Name is required.";
    }

    // Email Validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Mobile Number Validation
    if (!formData.mobile) {
      newErrors.mobile = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Phone number must be 10 digits.";
    }

    // Enquiry Validation
    if (!formData.enquiry) {
      newErrors.enquiry = "Enquiry is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      ...(carSelected ? { carType: carSelected } : {}),
    };

    try {
      const res = await axios.post("/api/booking", payload);

      if (res.data.success) {
        toast.success(res.data.message);

        // Clear form data after successful submission
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
          enquiry: "",
          bookingType: "enquiry",
        });

        onClose(); // Close the modal
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to submit booking");
      console.error(err);
    } finally {
      setIsSubmitting(false); // re-enable button
    }
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enquire Now</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
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
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}

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
                <button
                  type="submit"
                  className="primary-button me-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNowModal;
