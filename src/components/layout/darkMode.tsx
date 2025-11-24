// "use client";
// import { useEffect, useState } from "react";
// import { Moon, Sun } from "lucide-react";

// export default function ThemeToggle() {
//     const [dark, setDark] = useState(false);

//     useEffect(() => {
//         if (dark) {
//             document.documentElement.classList.add("dark");
//         } else {
//             document.documentElement.classList.remove("dark");
//         }
//     }, [dark]);

//     return (
//         <button
//             onClick={() => setDark(!dark)}
//             className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
//         >
//             {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
//         </button>
//     );
// }
"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // 🟢 اقرأ الحالة من localStorage أول ما الموقع يفتح
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  // 🟣 لما المستخدم يغيّر الثيم
  const toggleTheme = () => {
    const newTheme = !dark ? "dark" : "light";
    setDark(!dark);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300"
    >
      {dark ? (
        <Sun className="text-yellow-400" />
      ) : (
        <Moon className="text-gray-800" />
      )}
    </button>
  );
}
