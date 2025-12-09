// Vercel Serverless Function
export default async function handler(req, res) {
     // CORS sozlamalari
     res.setHeader('Access-Control-Allow-Credentials', true);
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
     res.setHeader(
       'Access-Control-Allow-Headers',
       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
     );
   
     // Agar OPTIONS bo'lsa (preflight)
     if (req.method === 'OPTIONS') {
       res.status(200).end();
       return;
     }
   
     // Faqat POST method qabul qilamiz
     if (req.method !== 'POST') {
       return res.status(405).json({ 
         error: 'Method not allowed',
         status: 'error' 
       });
     }
   
     try {
       const { name, email, message } = req.body;
   
       // Validatsiya
       if (!name || !email || !message) {
         return res.status(400).json({
           status: 'error',
           message: 'Barcha maydonlarni to\'ldiring'
         });
       }
   
       // Email validatsiyasi
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(email)) {
         return res.status(400).json({
           status: 'error',
           message: 'Noto\'g\'ri email formati'
         });
       }
   
       console.log("📨 Qabul qilindi:", { name, email, message });
   
       // Bu yerda haqiqiy email yuborish logikasi bo'lishi kerak
       // Masalan: SendGrid, EmailJS yoki boshqa email service
       
       // Test uchun faylga saqlash (Vercel'da ishlamaydi, lekin log'da ko'rinadi)
       console.log(`Yangi xabar:
         Ism: ${name}
         Email: ${email}
         Xabar: ${message}
         Vaqt: ${new Date().toISOString()}
       `);
   
       // Muvaffaqiyatli javob
       return res.status(200).json({
         status: 'success',
         message: 'Xabar muvaffaqiyatli yuborildi! Tez orada sizga javob beraman.',
         data: {
           name,
           email,
           timestamp: new Date().toISOString()
         }
       });
   
     } catch (error) {
       console.error('❌ Xatolik:', error);
       
       return res.status(500).json({
         status: 'error',
         message: 'Server xatosi. Iltimos, keyinroq urinib ko\'ring.'
       });
     }
   }