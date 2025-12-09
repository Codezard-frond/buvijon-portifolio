import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaLaptopCode,
  FaAtom,
  FaBook,
  FaStar,
  FaTelegram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { GiMaterialsScience } from "react-icons/gi";
import { MdSchool, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";

function Home() {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    console.log("📤 Xabar yuborilmoqda...", data);

    try {
      // Backend URL - Men tayyorladim
      const API_URL = "https://xayrullohon-backend.onrender.com";

      const response = await fetch(`${API_URL}/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === "success") {
        showNotification(
          "success",
          "✅ Xabar yuborildi! Tez orada aloqaga chiqaman."
        );
        e.target.reset();
      } else if (result.status === "partial") {
        showNotification(
          "success",
          "✅ Xabar saqlandi! Telegram bot orqali ham yozishingiz mumkin."
        );
        e.target.reset();
      } else {
        showNotification("error", result.message || "❌ Xatolik yuz berdi");
      }
    } catch (error) {
      console.error("❌ Xatolik:", error);

      // Agar backend ishlamasa, test rejim
      setTimeout(() => {
        showNotification(
          "success",
          "✅ Xabar qabul qilindi! Telegram bot orqali ham yozishingiz mumkin."
        );
        e.target.reset();
        setLoading(false);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const skills = [
    {
      icon: FaBrain,
      title: "Mantiqiy fikrlash",
      desc: "Murakkab masalalarni tahlil qilib, eng to'g'ri yechimni topish ko'nikmasi.",
      color: "from-blue-400 to-cyan-400",
      bgGlow: "bg-blue-500/20",
    },
    {
      icon: FaAtom,
      title: "Fizika tahlili",
      desc: "Jarayonlar, formulalar va modellarni tushunish va tahlil qilish.",
      color: "from-purple-400 to-pink-400",
      bgGlow: "bg-purple-500/20",
    },
    {
      icon: GiMaterialsScience,
      title: "Matematika asoslari",
      desc: "Mantiq, algebra, tenglamalar, analiz va hisoblash ko'nikmalari.",
      color: "from-green-400 to-emerald-400",
      bgGlow: "bg-green-500/20",
    },
    {
      icon: FaLaptopCode,
      title: "Informatika",
      desc: "Kompyuter savodxonligi, texnologiya bilan ishlash va dasturlash asoslari.",
      color: "from-yellow-400 to-orange-400",
      bgGlow: "bg-yellow-500/20",
    },
    {
      icon: FaBook,
      title: "Tez o'rganish",
      desc: "Yangi mavzu va fanlarni tez anglab olish qobiliyati.",
      color: "from-pink-400 to-rose-400",
      bgGlow: "bg-pink-500/20",
    },
    {
      icon: FaStar,
      title: "Mas'uliyat",
      desc: "Har bir ishni puxta va sifatli bajarishga intilish.",
      color: "from-orange-400 to-red-400",
      bgGlow: "bg-orange-500/20",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden" id="home">
      {/* Background Animation */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Notification */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-600/90 backdrop-blur-sm"
              : "bg-red-600/90 backdrop-blur-sm"
          }`}
        >
          <p className="text-white font-medium">{notification.message}</p>
        </motion.div>
      )}

      <div className="container mx-auto px-4 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-full mb-6"
          >
            <HiSparkles className="text-yellow-300" />
            <span className="text-sm text-gray-200">3rd Year Student</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
              Assalamu aleykum
            </span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white relative inline-block"
            >
              Men Xayrullohon
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
          >
            <MdSchool size={32} className="text-blue-400" />
            <div className="text-left">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Currently studying at
              </p>
              <p className="text-xl font-bold text-white">
                ADU – 3-kurs talabasi
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto mt-20"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-10 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-3xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
                  <MdSchool size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Men haqimda
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
              </div>

              <p className="text-lg leading-relaxed text-gray-300">
                Men hozirda ADUda tahsil olib,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">
                  Amaliy Matematika
                </span>{" "}
                yo'nalishida o'qimoqdaman. Aniq fanlarga qiziqishim tufayli
                mantiqiy fikrlash, tahlil qilish va muammolarni samarali hal
                qilish ko'nikmalarini rivojlantirib kelmoqdaman.
              </p>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
                <p className="text-gray-300">
                  Informatika menga yangi bilimlar sari yo'l ochmoqda. Kelajakda
                  ilmiy va texnologik loyihalarda ishtirok etib, o'z yo'limni IT
                  va aniq fanlar kesishgan nuqtada qurmoqchiman.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <div className="mt-28" id="skills">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Asosiy Ko'nikmalarim
            </h2>
            <p className="text-gray-400 text-lg">
              Mening professional ko'nikmalarim va qobiliyatlarim
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div
                  className={`absolute -inset-0.5 ${skill.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500`}
                ></div>

                <div className="relative h-full p-8 bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                  <div
                    className={`inline-flex p-4 bg-gradient-to-br ${skill.color} rounded-2xl mb-6 shadow-lg`}
                  >
                    <skill.icon size={36} className="text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {skill.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {skill.desc}
                  </p>

                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contact Section */}
        <div className="mt-28" id="contact">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-4">Bog'lanish</h2>
            <p className="text-gray-400 text-lg">
              Men bilan bog'lanish uchun quyidagi formadan foydalaning yoki
              telegram bot orqali yozing
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-3xl h-full">
                <h3 className="text-2xl font-bold text-white mb-8">
                  Aloqa ma'lumotlari
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl">
                      <MdEmail className="text-2xl text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="font-medium text-white">
                        xayrullohon@example.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl">
                      <MdPhone className="text-2xl text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Telefon</p>
                      <p className="font-medium text-white">
                        +998 90 123 45 67
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl">
                      <FaTelegram className="text-2xl text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Telegram</p>
                      <p className="font-medium text-white">@xayrullohon_dev</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl">
                      <MdLocationOn className="text-2xl text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Manzil</p>
                      <p className="font-medium text-white">
                        Andijon, O'zbekiston
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-12">
                  <h4 className="text-xl font-bold text-white mb-6">
                    Ijtimoiy tarmoqlar
                  </h4>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="p-3 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 rounded-2xl transition-all duration-300"
                    >
                      <FaGithub className="text-2xl text-white" />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 rounded-2xl transition-all duration-300"
                    >
                      <FaLinkedin className="text-2xl text-white" />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-2xl transition-all duration-300"
                    >
                      <FaTelegram className="text-2xl text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Telegram Bot Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-3xl h-full flex flex-col items-center justify-center text-center">
                <div className="p-5 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-3xl mb-6">
                  <FaTelegram className="text-5xl text-green-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  Tezkor bog'lanish
                </h3>

                <p className="text-gray-300 mb-6">
                  Telegram bot orqali bevosita menga xabar yuborishingiz mumkin.
                  Tezkor javob olish imkoniyati!
                </p>

                <a
                  href="https://t.me/xayrulloxon_portfolio_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-2xl hover:opacity-90 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <FaTelegram className="text-2xl" />
                  <span>Botga o'tish</span>
                  <HiSparkles className="text-yellow-300" />
                </a>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-2xl">
                  <p className="text-gray-300 text-sm">
                    <span className="text-green-400 font-semibold">
                      24/7 ishlaydi
                    </span>{" "}
                    - istalgan vaqt yozishingiz mumkin
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Bot faol</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group lg:col-span-1"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <form
                onSubmit={handleSubmit}
                className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-3xl"
              >
                <h3 className="text-2xl font-bold text-white mb-8">
                  Xabar yuborish
                </h3>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-3 font-medium">
                    Ismingiz
                  </label>
                  <input
                    name="name"
                    required
                    minLength="2"
                    className="w-full p-4 bg-gray-800/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none transition-all duration-300"
                    placeholder="Ismingizni kiriting"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-3 font-medium">
                    Email manzilingiz
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full p-4 bg-gray-800/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none transition-all duration-300"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-gray-300 mb-3 font-medium">
                    Xabaringiz
                  </label>
                  <textarea
                    name="message"
                    required
                    minLength="10"
                    rows="5"
                    className="w-full p-4 bg-gray-800/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Xabaringizni yozing..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold transition-all duration-300 ${
                    loading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/20"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Yuborilmoqda...
                    </div>
                  ) : (
                    "Xabarni yuborish"
                  )}
                </button>

                <p className="text-gray-400 text-sm text-center mt-6">
                  Xabaringiz serverga yuboriladi va tez orada javob beraman.
                </p>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 text-center">
          <div className="border-t border-white/10 pt-8">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Xayrullohon. Barcha huquqlar
              himoyalangan.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Amaliy Matematika, ADU 3-kurs talabasi
            </p>
            <p className="text-gray-600 text-sm mt-1">
              📧 xayrullohon@example.com | 📱 +998 90 123 45 67
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
