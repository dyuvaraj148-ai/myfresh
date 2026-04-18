import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen flex  flex-col items-center justify-center p-6">
      <div className="grid md:grid-cols-2 max-w-5xl w-full bg-gray-40 shadow-xl rounded-2xl overflow-hidden">

        {/* Left */}
        <div className="bg-primary text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6 opacity-90">
            Feel free to contact us anytime.
          </p>

          <p>📧 myfresh@gmail.com</p>
          <p>📞 +91 9999944444</p>
          <p>📍 Mangalagiri, Andhra Pradesh</p>
        </div>

        {/* Right */}
        <div className="p-10 bg-gray">
          <h2 className="text-2xl font-bold mb-6 ">Contact Form</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 border rounded-lg"
              required
            />

            <button
              type="submit"
              className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary/75"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}