"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
} from "lucide-react";
import Button from "@/components/button";
import { useTranslation } from "@/hooks/useTranslation";

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed:", email);
    setEmail("");
  };

  const services = (t("footer.services") || []) as string[];

  return (
    <footer className="bg-blue-900 text-white relative">
      {/* Top Section - Four Columns */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {/* Column 1: Company Information */}
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold">
              {t("footer.companyName")}
            </h3>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              {t("footer.description")}
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-blue-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-blue-900 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-blue-900 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-blue-900 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg md:text-xl font-bold">
              {t("footer.contactInfo")}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <p className="text-sm md:text-base text-gray-300">
                  {t("footer.address")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-sm md:text-base text-gray-300">
                  {t("footer.phone")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-sm md:text-base text-gray-300">
                  {t("footer.email")}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Our Services */}
          <div className="space-y-4">
            <h4 className="text-lg md:text-xl font-bold">
              {t("footer.ourServices")}
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm md:text-base text-gray-300 hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Subscribe Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg md:text-xl font-bold">
              {t("footer.subscribeNewsletter")}
            </h4>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder={t("footer.enterEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full rounded-lg"
              >
                {t("common.subscribeNow")}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Legal Links */}
      <div className="border-t border-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm md:text-base text-gray-300">
            <p>
              {t("footer.copyright", {
                year: new Date().getFullYear(),
              })}
            </p>
            <div className="flex gap-4">
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                {t("footer.terms")}
              </Link>
              <span>|</span>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                {t("footer.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
