from fastapi import FastAPI, Request
from pydantic import BaseModel
import httpx
from datetime import datetime
import json
import os

app = FastAPI()

# CORS uchun middleware
@app.middleware("http")
async def add_cors_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

# Bot ma'lumotlari
BOT_TOKEN = "8583763032:AAFaFFhKEBdPpFeKMaR-uqT3_TierLHegoE"
CHAT_ID = "7185320560"

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@app.post("/send-message")
async def send_message(form: ContactForm):
    try:
        print(f"📨 YANGI XABAR: {form.name}, {form.email}")
        
        # 1. Log fayliga saqlash
        log_entry = {
            "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            "name": form.name,
            "email": form.email,
            "message": form.message
        }
        
        with open("messages.log", "a", encoding="utf-8") as f:
            f.write(json.dumps(log_entry, ensure_ascii=False) + "\n")
        
        # 2. Telegramga yuborish
        try:
            text = f"📬 YANGI XABAR!\n\n👤 Ism: {form.name}\n📧 Email: {form.email}\n💬 Xabar: {form.message}\n\n🕒 Vaqt: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            
            url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
            
            async with httpx.AsyncClient() as client:
                resp = await client.post(url, data={
                    "chat_id": CHAT_ID,
                    "text": text,
                    "parse_mode": "HTML"
                })
                
                if resp.status_code == 200:
                    return {
                        "status": "success",
                        "message": "✅ Xabar yuborildi! Tez orada aloqaga chiqaman.",
                        "timestamp": datetime.now().isoformat()
                    }
        
        except Exception as e:
            print(f"⚠️ Telegram xatosi: {e}")
        
        # 3. Agar Telegram ishlamasa ham, xabar saqlangan
        return {
            "status": "partial_success",
            "message": "✅ Xabar saqlandi. Keyinroq aloqaga chiqaman.",
            "timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": "Xatolik yuz berdi. Keyinroq urinib ko'ring.",
            "timestamp": datetime.now().isoformat()
        }

@app.get("/")
def root():
    return {"status": "active", "message": "Backend ishlayapti"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)