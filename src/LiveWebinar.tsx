import { useState } from "react";
import webdev from './assets/images/web-dev.jpeg';

const LiveWebinar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleRegister = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="font-sans text-gray-900">
      {/* Hero Section */}
      <section className="bg-black text-white py-14 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Join Our <span className="text-yellow-300">1-Day Live Webinar</span> on Python + AI
        </h1>
        <p className="mb-6 text-lg md:text-xl">Learn how to use Artificial Intelligence to supercharge your Python skills in just one day!</p>
        <img
          src={webdev}
          alt="Python AI Webinar"
          className="rounded-xl shadow-lg mx-auto max-w-full w-[340px] md:w-[420px]"
        />
        <div className="mt-6">
          <button onClick={handleRegister} className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition">
            Register Now – ₹99 Only
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Live AI Demo Projects", "Real-Time Code Walkthroughs", "Industry Best Practices", "E-Certificate Included"].map((item, i) => (
              <div key={i} className="bg-blue-50 p-4 rounded-lg shadow-sm text-base md:text-lg font-medium">
                ✅ {item}
              </div>
            ))}
          </div>
          <p className="text-yellow-600 text-lg font-semibold">🚀 1000+ Attendees Expected</p>
        </div>
      </section>

      {/* Instructor */}
      <section className="bg-black text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Meet Your Expert Instructor</h2>
          <div className="flex justify-center">
            <InstructorCard name="Sovhan Sekhar" title="Python Developer" />
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Webinar Agenda – June 15, 2025</h2>
          <div className="space-y-6">
            {[
              { time: "10:00 AM", topic: "Introduction to AI & Python Applications" },
              { time: "11:00 AM", topic: "Live Coding: AI-Powered Chatbot" },
              { time: "12:00 PM", topic: "Q&A and Industry Insights" },
              { time: "12:30 PM", topic: "Free Resources + Certificate Instructions" },
            ].map(({ time, topic }, i) => (
              <div key={i} className="bg-indigo-50 p-5 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-1">{time}</h3>
                <p className="text-base md:text-lg">{topic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate */}
      <section className="bg-black text-white py-14 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Attend and Get Certified</h2>
        <p className="mb-6 text-lg">Receive a professional certificate of participation after attending the full webinar</p>
        <img
          src="https://aifortechies.in/wp-content/uploads/2024/04/certificate-sample.png"
          alt="Webinar Certificate"
          className="mx-auto max-w-full w-72 md:w-96 rounded-lg"
        />
      </section>

      {/* Call to Action */}
      <section className="bg-white text-black py-14 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Reserve Your Spot Now</h2>
        <p className="mb-6 text-lg">Limited seats available for the live webinar. Get instant access to resources and certificate.</p>
        <button onClick={handleRegister} className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition">
          Register Now – ₹99 Only
        </button>
        <div className="mt-6">
          <a
            href="https://wa.me/919999999999" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline text-lg"
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </section>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative">
            <button onClick={handleClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">✖</button>
            <h3 className="text-xl font-bold mb-4">Register for Webinar</h3>
            <form
              action="https://formspree.io/f/moqgdvya"
              method="POST"
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-md"
              />
              <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded-md w-full font-semibold">
                Submit & Pay ₹99
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InstructorCard = ({ name, title }) => (
  <div className="text-center bg-white p-5 rounded-lg shadow-md w-full max-w-xs">
    <div className="h-24 w-24 mx-auto rounded-full bg-gray-200 mb-3" />
    <h3 className="text-lg font-bold">{name}</h3>
    <p className="text-sm text-gray-600">{title}</p>
  </div>
);

export default LiveWebinar;
