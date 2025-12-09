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
    """CHAT_ID ni fayldan yoki environment dan olish"""
    # 1. Environment dan
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    if chat_id:
        print(f"✅ CHAT_ID environment dan: {chat_id}")
        return chat_id
    
    # 2. chat_id.txt faylidan
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
    """Telegramga xabar yuborish"""
    global CHAT_ID
    
    # Agar CHAT_ID bo'lmasa, yangilash
    if not CHAT_ID:
        CHAT_ID = get_chat_id()
    
    if not CHAT_ID:
        # Avtomatik ravishda chat id qidirish
        print("🔄 CHAT_ID topilmadi, qidirilmoqda...")
        chat_id = await find_chat_id_auto()
        if chat_id:
            CHAT_ID = chat_id
            print(f"✅ CHAT_ID topildi: {CHAT_ID}")
        else:
            return {"sent": False, "error": "CHAT_ID topilmadi", "instructions": "Botga xabar yuboring va /get-chat-id endpointini chaqiring"}
    
    try:
        # Telegram xabar tayyorlash
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
                error_data = response.json()
                return {"sent": False, "error": error_data.get("description", "Noma'lum xato")}
                
    except Exception as e:
        print(f"❌ Telegram yuborishda xato: {e}")
        return {"sent": False, "error": str(e)}

async def find_chat_id_auto():
    """Avtomatik ravishda chat id qidirish"""
    try:
        url = f"https://api.telegram.org/bot{BOT_TOKEN}/getUpdates"
        
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(url)
            data = response.json()
            
            if data.get("ok") and data.get("result"):
                for update in data["result"]:
                    if "message" in update:
                        chat_id = str(update["message"]["chat"]["id"])
                        
                        # Faylga saqlash
                        with open("chat_id.txt", "w") as f:
                            f.write(chat_id)
                        
                        return chat_id
            
            return None
            
    except Exception as e:
        print(f"❌ Chat ID qidirishda xato: {e}")
        return None

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
                "message": f"✅ Xabar Telegramga jo'natildi!",
                "chat_id": telegram_result['chat_id']
            }
        else:
            return {
                "status": "partial",
                "message": f"⚠️ Xabaringiz saqlandi, lekin Telegramga yuborilmadi",
                "error": telegram_result.get("error", ""),
                "instructions": telegram_result.get("instructions", "")
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
        "endpoints": {
            "home": "GET /",
            "send_message": "POST /send-message",
            "health": "GET /health",
            "check_bot": "GET /check-bot",
            "get_chat_id": "GET /get-chat-id",
            "set_chat_id": "POST /set-chat-id/{chat_id}"
        }
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy", 
        "timestamp": datetime.now().isoformat(),
        "service": "Xayrullohon Contact API"
    }

@app.get("/check-bot")
async def check_bot():
    """Bot token tekshirish"""
    try:
        url = f"https://api.telegram.org/bot{BOT_TOKEN}/getMe"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            data = response.json()
            
            if data.get("ok"):
                return {
                    "status": "success",
                    "bot_info": data.get("result"),
                    "message": "✅ Bot token to'g'ri"
                }
            else:
                return {
                    "status": "error",
                    "message": f"❌ Bot token xatosi: {data.get('description', 'Noma\'lum xato')}"
                }
    except Exception as e:
        return {
            "status": "error",
            "message": f"❌ Bot tekshirishda xato: {str(e)}"
        }

@app.get("/get-chat-id")
async def get_chat_id_endpoint():
    """Chat ID olish uchun yordamchi endpoint"""
    try:
        chat_id = await find_chat_id_auto()
        
        if chat_id:
            global CHAT_ID
            CHAT_ID = chat_id
            
            return {
                "status": "success",
                "chat_id": chat_id,
                "message": f"✅ CHAT_ID topildi: {chat_id}"
            }
        else:
            return {
                "status": "info",
                "message": "❌ Hech qanday chat topilmadi",
                "instructions": "1. Telegramda @xayrulloxon_portfolio_bot ga xabar yuboring\n2. Ushbu sahifani yangilang",
                "bot_url": "https://t.me/xayrulloxon_portfolio_bot"
            }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Chat ID olishda xato: {str(e)}"
        }

@app.post("/set-chat-id/{chat_id}")
async def set_chat_id(chat_id: str):
    """CHAT_ID ni qo'lda sozlash"""
    try:
        with open("chat_id.txt", "w") as f:
            f.write(chat_id)
        
        global CHAT_ID
        CHAT_ID = chat_id
        
        return {
            "status": "success",
            "message": f"✅ CHAT_ID sozlandi: {chat_id}"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"CHAT_ID sozlashda xato: {str(e)}"
        }

if __name__ == "__main__":
    # Dastur boshlanishida CHAT_ID ni o'qish
    CHAT_ID = get_chat_id()
    
    import uvicorn
    
    print("=" * 50)
    print("🚀 SERVER ISHGA TUSHMOQDA...")
    print("=" * 50)
    print(f"🤖 Bot: @xayrulloxon_portfolio_bot")
    print(f"🔑 Token: {BOT_TOKEN[:15]}...")
    print(f"💬 CHAT_ID: {CHAT_ID or 'TOPILMADI'}")
    print("=" * 50)
    
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=False)