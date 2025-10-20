"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname,useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
   const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.log("Pathname changed, showing loader:", pathname,isPending);
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);
  

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 left-0 right-0 h-1 bg-[#00B894] origin-left z-[999999] pointer-events-none"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999999, // ensures it's above everything
          }}
        />
      )}
    </AnimatePresence>
  );
}
