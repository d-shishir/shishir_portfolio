"use client";

import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="py-8 px-12 flex flex-col md:flex-row justify-between items-start md:items-center text-sm  text-white bg-[#030303]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="font-semibold text-lg mb-6 md:mb-0 text-center md:text-left">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-2xl"
        >
          Folio:01
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-medium text-white/70"
          >
            Availability:
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            March 2025
          </motion.p>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-medium text-white/70"
          >
            Contact:
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            dshishir13@gmail.com
          </motion.p>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-medium text-white/70"
          >
            Current location:
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Kathmandu
          </motion.p>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-medium text-white/70"
          >
            Copyright:
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            ©2025 Shishir Lamichhane
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
