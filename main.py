from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from datetime import datetime
import json
import os

app = FastAPI()

# CORS sozlamalari
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BOT_TOKEN = "8583763032:AAFaFFhKEBdPpFeKMaR-uqT3_TierLHegoE"
CHAT_ID = None

# CHAT_ID ni olish
def get_chat_id():
    # Environment dan
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    if chat_id:
        print(f"✅ CHAT_ID environment dan: {chat_id}")
        return chat_id
    
    # chat_id.txt faylidan
    try:
        if os.path.exists("chat_id.txt"):
            with open("chat_id.txt", "r") as f:
                chat_id = f.read().strip()
                if chat_id:
                    print(f"✅ CHAT_ID fayldan: {chat_id}")
                    return chat_id
    except:
        pass
    
    return None

# Pydantic model
class ContactForm(BaseModel):
    name: str
    email: str
    message: str

async def send_telegram_message(name: str, email: str, message: str) -> dict:
    global CHAT_ID
    
    if not CHAT_ID:
        CHAT_ID = get_chat_id()
    
    if not CHAT_ID:
        return {"sent": False, "error": "CHAT_ID topilmadi"}
    
    try:
        text = f"""📬 *YANGI XABAR KELDI!*

👤 *Ism:* {name}
📧 *Email:* {email}
💬 *Xabar:* {message}

🕒 *Vaqt:* {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
✅ *Manba:* Xayrullohon Portfolioni"""

        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
        
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(url, data={
                "chat_id": CHAT_ID,
                "text": text,
                "parse_mode": "Markdown"
            })
            
            if response.status_code == 200:
                return {"sent": True, "chat_id": CHAT_ID}
            else:
                return {"sent": False, "error": "Telegram API xatosi"}
                
    except Exception as e:
        print(f"❌ Telegram xatosi: {e}")
        return {"sent": False, "error": str(e)}

@app.post("/send-message")
async def send_message(form: ContactForm):
    try:
        print(f"✅ YANGI XABAR: {form.name}, {form.email}")
        
        # Telegramga xabar yuborish
        telegram_result = await send_telegram_message(form.name, form.email, form.message)
        
        # Log fayliga saqlash
        with open("messages.log", "a", encoding="utf-8") as f:
            log_entry = {
                "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                "name": form.name,
                "email": form.email,
                "message": form.message,
                "telegram": telegram_result
            }
            f.write(json.dumps(log_entry, ensure_ascii=False) + "\n")
        
        if telegram_result.get("sent"):
            return {
                "status": "success",
                "message": "✅ Xabar muvaffaqiyatli yuborildi!",
                "chat_id": telegram_result['chat_id']
            }
        else:
            return {
                "status": "partial",
                "message": "✅ Xabar saqlandi (Telegram xatosi)",
            }
            
    except Exception as e:
        return {
            "status": "error",
            "message": f"Server xatosi: {str(e)}"
        }

@app.get("/")
async def root():
    return {
        "status": "active", 
        "message": "Backend server ishlayapti!",
        "bot_token": BOT_TOKEN[:10] + "...",
        "chat_id_configured": bool(get_chat_id()),
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy", 
        "timestamp": datetime.now().isoformat(),
        "service": "Xayrullohon Contact API"
    }

if __name__ == "__main__":
    CHAT_ID = get_chat_id()
    
    import uvicorn
    
    print("=" * 50)
    print("🚀 SERVER ISHGA TUSHMOQDA...")
    print("=" * 50)
    print(f"🤖 Bot: @xayrulloxon_portfolio_bot")
    print(f"🔑 Token: {BOT_TOKEN[:15]}...")
    print(f"💬 CHAT_ID: {CHAT_ID or 'TOPILMADI'}")
    print("=" * 50)
    
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))