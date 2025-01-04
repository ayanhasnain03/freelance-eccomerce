import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useCreateContactMutation } from "../redux/api/userApi";

interface FormData {
  name: string;
  email: string;
  phoneNo: string;
  message: string;
}

const Contact: React.FC = () => {
  const [createContact, { isLoading }] = useCreateContactMutation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNo: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { name, email, phoneNo, message } = formData;

    if (!name || !email || !phoneNo || !message) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      const response = await createContact({ name, email, phoneNo, message }).unwrap();
      toast.success(response?.message || "Message sent successfully!");
      setFormData({ name: "", email: "", phoneNo: "", message: "" });
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-center mb-6 text-[#fc0000] text-3xl font-bold">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#fc0000] focus:border-[#fc0000]"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#fc0000] focus:border-[#fc0000]"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#fc0000] focus:border-[#fc0000]"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#fc0000] focus:border-[#fc0000]"
            placeholder="Write your message here"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg font-bold text-white transition ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#fc0000] hover:bg-[#e50000]"
          }`}
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
