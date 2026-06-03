import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-navy">
      <Sidebar />
      <div className="min-h-screen md:pl-[240px]">
        <Header />
        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="pb-24 md:pb-8"
        >
          {children}
        </motion.main>
      </div>
      <MobileNav />
    </div>
  );
}
