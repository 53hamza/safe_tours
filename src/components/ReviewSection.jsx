// components/ReviewsMasonryAuto.js
"use client";

import React from "react";
import { FaStar } from "react-icons/fa";
const reviews = [
  {
    id: 1,
    rating: 5,
    text: "Very comfortable bus, the bus departed on time and reached the venue on the expected time too!",
    name: "Hamza Laxmidhar",
  },
  {
    id: 2,
    rating: 5,
    text: "We had a great experience using Safe tours and travels cab service for our trip to Dongaon! The driver arrived on time, drove safely, and was very professional. The car was clean and comfortable, making our journey pleasant and relaxing. Booking the cab was quick and easy, and the price was fair. Everything went smoothly from start to finish. We highly recommend their service and will definitely book with them again for our future travels!",
    name: "Saifuddin Travadi",
  },
  {
    id: 3,
    rating: 5,
    text: "I want to extend my heartfelt appreciation to Safe Tours and Travels for their outstanding service. From booking to drop-off, everything was smooth, professional, and hassle-free. The vehicle was in excellent condition, and the driver was courteous, punctual, and knowledgeable. Your commitment to customer satisfaction truly made our journey enjoyable. Thank you for going the extra mile—literally and figuratively! I’ll definitely be recommending your services to others",
    name: "Mehdi Polishwala",
  },
  {
    id: 4,
    rating: 5,
    text: "We had a smooth journey...... Going and coming to Airport both driver was also nice and helpful.the car was neat and clean.The pick up was on the time and the journey was good.Highly recommend safe tours and travels 👍",
    name: "Maryam Taher Kachwala",
  },
  {
    id: 5,
    rating: 5,
    text: "It was a very comfortable journey. Everything wad excellent including car and Driver. I recommend you to book your tours from this travels",
    name: "Mohammed Attar",
  },
  {
    id: 6,
    rating: 5,
    text: "This was my first time travelling with Safe Tours And Travels and I must say one of the best experience. Car condition was very neat, smooth and clean. Driver was very polite, cooperative and friendly. Service provided by ali Bhai was excellent, flexible with my preference and very professional.",
    name: "Fakhruddin Barodawala",
  },
  {
    id: 7,
    rating: 5,
    text: "Amazing service, have enjoyed ride, driver was very polite and listen to us whatever we asked him. Additionally car quality was mind-blowing",
    name: "Mustafa Taxi",
  },
  {
    id: 8,
    rating: 5,
    text: "Thank you for the safe and comfortable Mumbai airport drop! Your car was in excellent condition, and we appreciated the smooth ride and Punctuality. We'll definitely recommend your services to others!We booked Car from Pune to Mumbai Airport ..",
    name: "M Badami",
  },
  {
    id: 9,
    rating: 5,
    text: "Got on the spot booking on urgent basis for mumbai from Pune that too at a very reasonable price . Just called the owners Ali and Taher they immediately sent me ertiga car for my in laws. Car was in mint clean and crisp condition and driver was also very good and well behaved. Highly recommended for reasonable and safe travels. They deliver just like their Brand name Safe travels! ✅😊",
    name: "Hasan pardawala",
  },
  {
    id: 10,
    rating: 5,
    text: "Experienced driver, comfortable and clean vehicle, Punctual in their service and fulfilled the requirement as they had committed, Overall a very good and safe journey experience, I would highly recommend SAFE TOURS AND TRAVELS",
    name: "Mufaddal Bootwala",
  },
  {
    id: 11,
    rating: 5,
    text: "Thank you for excellent service experience. On time pickup and drop. Driver behaviour was good, overall i am very satisfied with your service.",
    name: "Zainab Ambabadberi",
  },
  {
    id: 12,
    rating: 5,
    text: "Peaceful journey Time discipline what is required in this Business Most Important Women safety was taken care at its best",
    name: "Hussain Tapia",
  },
  {
    id: 13,
    rating: 5,
    text: "Great traveling experience, decent drivers and best service.",
    name: "Husain Jawadwala",
  },
];

export default function ReviewsMasonryAuto() {
  return (
    <section id="reviews" className="reviews-masonry-section side-space section-space">
      <div className="services-inner side-space section-space">
        <h2 className="section-heading text-center">What Our Customers Say</h2>

        <div className="masonry">
          {reviews.map((r) => (
            <article key={r.id} className="card">
              <div className="stars" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < r.rating ? "star filled" : "star"}
                  />
                ))}
              </div>

              <p className="text">"{r.text}"</p>

              <p className="name">— {r.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
