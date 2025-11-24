"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EmptyCart() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-inner"
        >
            <Link href="/products">

                <motion.div
                    initial={{ scale: 0.09}}
                    animate={{ scale: 1.7 }}
                    transition={{ type: "keyframes", stiffness: 120, delay: 0.09 }}
                    className="text-6xl mb-4 hover:scale-105 transition-transform duration-300"
                >
                    🛒
                </motion.div>
            </Link>

            <h2 className="text-2xl font-bold my-6 text-gray-800 dark:text-gray-100">
                سلتك فاضية!
            </h2>

            <p className="text-muted-foreground mb-6">
                أضف منتجاتك الآن واستمتع بتجربة التسوق 😉
            </p>

            <Link href="/products">
                <motion.button
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-blue-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                    أضف منتجاتك الآن
                </motion.button>
            </Link>
        </motion.div>
    );
}
