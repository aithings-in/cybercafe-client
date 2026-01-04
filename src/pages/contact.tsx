"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import PageHero from "@/components/page-hero";
import Button from "@/components/button";
import { useTranslation } from "@/hooks/useTranslation";

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      {/* Page Hero Banner */}
      <PageHero
        title={t("contact.title")}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("contact.title") },
        ]}
      />

      {/* Contact Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Contact Information Panel */}
            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-500"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {t("contact.contactInformation")}
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                      {t("contact.address")}
                    </h3>
                    <p className="text-base text-gray-700">
                      {t("contact.addressValue")}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                      {t("contact.phone")}
                    </h3>
                    <p className="text-base text-gray-700">
                      {t("contact.phone1")}
                    </p>
                    <p className="text-base text-gray-700">
                      {t("contact.phone2")}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                      {t("contact.email")}
                    </h3>
                    <p className="text-base text-gray-700">
                      {t("contact.email1")}
                    </p>
                    <p className="text-base text-gray-700">
                      {t("contact.email2")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              className="bg-white rounded-lg shadow-lg p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {t("contact.sendUsMessage")}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Two Column Grid for First 4 Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Your Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("contact.yourName")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contact.yourName")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Your Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("contact.yourEmail")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact.yourEmail")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Your Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("contact.yourPhone")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("contact.yourPhone")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Your Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("contact.yourSubject")}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t("contact.yourSubject")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("contact.yourMessage")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.yourMessage")}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full md:w-auto px-8 py-3 rounded-lg"
                >
                  {t("common.sendMessage")}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[500px] md:h-[600px] relative">
        <iframe
          src="https://www.google.com/maps/place/MAAN+CYBER+WORLD+%26+COMPUTER+INSTITUTE/@27.5941466,78.0457275,19z/data=!3m1!4b1!4m6!3m5!1s0x39749bae9e5910e7:0xd69922178ff379b6!8m2!3d27.5941466!4d78.0463712!16s%2Fg%2F11ytg63hpc?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
          title="Contact Location Map"
        />
        {/* Fallback if iframe doesn't load */}
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <p className="text-gray-600 mb-2">Map Loading...</p>
            <p className="text-sm text-gray-500">
              If the map doesn't load, please check your internet connection.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
