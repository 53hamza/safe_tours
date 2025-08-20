import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import axios from "axios";
import fleets from "@/data/fleets";
// import "./BookingForm.css"; // custom styles

const BookingForm = () => {
  const [activeTab, setActiveTab] = useState("oneway");
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    from: "",
    to: "",
    departureDate: null,
    departureTime: "",
    returnDate: null,
    pickupTime: "",
    estimateDistance: "80km/8hr",
    carType: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid 10-digit mobile number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter valid email address";
    }
    if (!formData.from.trim()) newErrors.from = "From location is required";
    if (activeTab !== "local" && !formData.to.trim())
      newErrors.to = "To location is required";
    if (!formData.carType) newErrors.carType = "Please select a car";

    if (activeTab === "oneway") {
      if (!formData.departureDate)
        newErrors.departureDate = "Departure date is required";
      if (!formData.departureTime)
        newErrors.departureTime = "Departure time is required";
    }

    if (activeTab === "outstation") {
      if (!formData.departureDate)
        newErrors.departureDate = "Departure date is required";
      if (!formData.pickupTime)
        newErrors.pickupTime = "Pickup time is required";
    }

    if (activeTab === "local") {
      if (!formData.departureDate)
        newErrors.departureDate = "Departure date is required";
      if (!formData.pickupTime)
        newErrors.pickupTime = "Pickup time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const payload = { ...formData, bookingType: activeTab };

        const res = await axios.post("/api/booking", payload);

        if (res.data.success) {
          toast.success(res.data.message);
          setFormData({
            fullName: "",
            mobile: "",
            email: "",
            from: "",
            to: "",
            departureDate: null,
            departureTime: "",
            returnDate: null,
            pickupTime: "",
            estimateDistance: "80km/8hr",
            carType: "",
          });
        } else {
          toast.error(res.data.message || "Something went wrong");
        }
      } catch (error) {
        toast.error("Failed to submit booking");
        console.error(error);
      }
    }
  };

  return (
    <section className="side-space section-space">
      <div className="booking-form-container services-inner side-space section-space">
        <h2 className="section-heading text-center">Need To Rent A Car?</h2>
        <div className="form-tabs">
          <button
            className={`tab-btn ${activeTab === "oneway" ? "active" : ""}`}
            onClick={() => setActiveTab("oneway")}
          >
            One Way
          </button>
          <button
            className={`tab-btn ${activeTab === "outstation" ? "active" : ""}`}
            onClick={() => setActiveTab("outstation")}
          >
            Outstation
          </button>
          <button
            className={`tab-btn ${activeTab === "local" ? "active" : ""}`}
            onClick={() => setActiveTab("local")}
          >
            Local
          </button>
        </div>

        <form onSubmit={handleSubmit} className="row g-3 booking-form">
          {/* Common Fields */}
          <div className="col-md-4">
            <input
              type="text"
              name="fullName"
              className={`custom-input ${errors.fullName && "is-invalid"}`}
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.fullName}</div>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="mobile"
              className={`custom-input ${errors.mobile && "is-invalid"}`}
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.mobile}</div>
          </div>
          <div className="col-md-4">
            <input
              type="email"
              name="email"
              className={`custom-input ${errors.email && "is-invalid"}`}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>

          {/* Select Car */}
          <div className="col-md-6">
            <select
              name="carType"
              className={`custom-select ${errors.carType && "is-invalid"}`}
              value={formData.carType}
              onChange={handleChange}
            >
              <option value="">Select Car</option>
              {fleets.map((fleet) => (
                <option key={fleet.id} value={fleet.name}>
                  {fleet.name}
                  {/* {fleet.name} {fleet.rate ? `- ${fleet.rate}` : ""} */}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.carType}</div>
          </div>

          {/* Tab-specific fields */}
          {activeTab === "oneway" && (
            <>
              <div className="col-md-6">
                <input
                  type="text"
                  name="from"
                  className={`custom-input ${errors.from && "is-invalid"}`}
                  placeholder="From"
                  value={formData.from}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.from}</div>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="to"
                  className={`custom-input ${errors.to && "is-invalid"}`}
                  placeholder="To"
                  value={formData.to}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.to}</div>
              </div>
              <div className="col-md-6">
                <label className="text-muted">Pickup Date</label>
                <input
                  type="date"
                  name="departureDate"
                  className={`custom-input ${
                    errors.departureDate && "is-invalid"
                  }`}
                  value={formData.departureDate}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.departureDate}</div>
              </div>
              <div className="col-md-6">
                <label className="text-muted">Pickup Time</label>
                <input
                  type="time"
                  name="departureTime"
                  className={`custom-input ${
                    errors.departureTime && "is-invalid"
                  }`}
                  value={formData.departureTime}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.departureTime}</div>
              </div>
            </>
          )}

          {activeTab === "outstation" && (
            <>
              <div className="col-md-6">
                <input
                  type="text"
                  name="from"
                  className={`custom-input ${errors.from && "is-invalid"}`}
                  placeholder="From"
                  value={formData.from}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.from}</div>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="to"
                  className={`custom-input ${errors.to && "is-invalid"}`}
                  placeholder="To"
                  value={formData.to}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.to}</div>
              </div>
              <div className="col-md-6">
                <label className="text-muted">Pickup Date</label>
                <input
                  type="date"
                  name="departureDate"
                  className={`custom-input ${
                    errors.departureDate && "is-invalid"
                  }`}
                  value={formData.departureDate}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.departureDate}</div>
              </div>
              <div className="col-md-6">
                <label className="text-muted">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  className={`custom-input ${
                    errors.returnDate && "is-invalid"
                  }`}
                  value={formData.returnDate}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.returnDate}</div>
              </div>
              <div className="col-md-6">
                <label className="text-muted">Pickup Time</label>
                <input
                  type="time"
                  name="pickupTime"
                  className={`custom-input ${
                    errors.pickupTime && "is-invalid"
                  }`}
                  value={formData.pickupTime}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.pickupTime}</div>
              </div>
            </>
          )}

          {activeTab === "local" && (
            <>
              <div className="col-md-6">
                <input
                  type="text"
                  name="from"
                  className={`custom-input ${errors.from && "is-invalid"}`}
                  placeholder="From"
                  value={formData.from}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.from}</div>
              </div>
              <div className="col-md-6">
                <select
                  name="estimateDistance"
                  className="custom-input"
                  value={formData.estimateDistance}
                  onChange={handleChange}
                >
                  <option value="80km/8hr">80km / 8hr</option>
                  <option value="120km/12hr">120km / 12hr</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="text-muted">Pickup Date</label>
                <input
                  type="date"
                  name="departureDate"
                  className={`custom-input ${
                    errors.departureDate && "is-invalid"
                  }`}
                  value={formData.departureDate}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.departureDate}</div>
              </div>
              <div className="col-md-6">
                <label className="text-muted">Pickup Time</label>
                <input
                  type="time"
                  name="pickupTime"
                  className={`custom-input ${
                    errors.pickupTime && "is-invalid"
                  }`}
                  value={formData.pickupTime}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.pickupTime}</div>
              </div>
            </>
          )}

          <div className="text-end">
            <button type="submit" className="primary-button">
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
