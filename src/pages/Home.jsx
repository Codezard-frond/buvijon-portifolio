import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaLaptopCode, FaAtom, FaBook, FaStar } from "react-icons/fa";
import { GiMaterialsScience } from "react-icons/gi";
import { MdSchool } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";

function Home() {

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

      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-20">

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

          <h1 className="text-6xl md:text-7xl font-black mb-4">
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
              <p className="text-xs text-gray-400 uppercase tracking-wider">Currently studying at</p>
              <p className="text-xl font-bold text-white">ADU – 3-kurs talabasi</p>
            </div>
          </motion.div>
        </motion.div>

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
                  <h2 className="text-3xl font-bold text-white mb-2">Men haqimda</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-300">
                Men hozirda ADUda tahsil olib,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">
                 Amaliy Matematika
                </span>{" "}
                yo'nalishida o'qimoqdaman. Aniq fanlarga qiziqishim tufayli mantiqiy fikrlash, tahlil qilish va muammolarni samarali hal qilish ko'nikmalarini rivojlantirib kelmoqdaman.
              </p>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
                <p className="text-gray-300">
                  Informatika menga yangi bilimlar sari yo'l ochmoqda. Kelajakda ilmiy va texnologik loyihalarda ishtirok etib, o'z yo'limni IT va aniq fanlar kesishgan nuqtada qurmoqchiman.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SKILLS SECTION */}
        <div className="mt-28" id="skills">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-white mb-4">
              Asosiy Ko'nikmalarim
            </h2>
            <p className="text-gray-400 text-lg">Mening professional ko'nikmalarim va qobiliyatlarim</p>
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
                {/* Glow effect */}
                <div className={`absolute -inset-0.5 ${skill.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500`}></div>
                
                {/* Card */}
                <div className="relative h-full p-8 bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                  {/* Icon with gradient background */}
                  <div className={`inline-flex p-4 bg-gradient-to-br ${skill.color} rounded-2xl mb-6 shadow-lg`}>
                    <skill.icon size={36} className="text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {skill.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {skill.desc}
                  </p>

                  {/* Decorative corner */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;