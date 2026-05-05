# شروع سریع - توسعه

Open Notebook را در 5 دقیقه به صورت محلی اجرا کنید.

## پیش نیاز

- ** Python 3.11+**
- **Git**
- **uv** (مدیر بسته) - نصب با `curl -LsSf https://astral.sh/uv/install.sh | sh`
- **Docker** (اختیاری، برای SurrealDB)

## 1. مخزن را کلون کنید (2 دقیقه)

``باش
# ابتدا مخزن را در GitHub فورک کنید، سپس فورک خود را شبیه سازی کنید
git clone https://github.com/YOUR_USERNAME/open-notebook.git
سی دی باز نوت بوک

# برای به‌روزرسانی، کنترل از راه دور بالادست اضافه کنید
git remote add upstream https://github.com/lfnovo/open-notebook.git
```

## 2. Dependencies را نصب کنید (2 دقیقه)

``باش
# وابستگی های پایتون را نصب کنید
همگام سازی uv

# بررسی کنید که uv کار می کند
uv --نسخه
```

## 3. شروع خدمات (1 دقیقه)

در پنجره های ترمینال جداگانه:

``باش
# ترمینال 1: شروع SurrealDB (پایگاه داده)
ایجاد پایگاه داده
# یا: docker run -d --name surrealdb -p 8000:8000 surrealdb/surrealdb:v2 start --user root --pass password --bind 0.0.0.0:8000 memory

# ترمینال 2: شروع API (پشتیبان در پورت 5055)
api درست کن
# یا: uv run --env-file .env uvicorn api.main:app --host 0.0.0.0 --port 5055

# ترمینال 3: شروع Frontend (UI در پورت 3000)
cd frontend && npm run dev
```

## 4. تأیید کنید همه چیز کار می کند (فوری)

- **API Health**: http://localhost:5055/health → باید "{"وضعیت": "ok"}" را برگرداند
- **API Docs**: http://localhost:5055/docs → اسناد API تعاملی
- **Frontend**: http://localhost:3000 → رابط کاربری Notebook را باز کنید

** هر سه نمایش داده می شوند؟ ** ✅ شما آماده توسعه هستید!

---

## مراحل بعدی

- **نخستین شماره؟** [نسخه اول خوب] را انتخاب کنید (https://github.com/lfnovo/open-notebook/issues?q=label%3A%22good+first+issue%22)
- **کد را می فهمید؟** [نمایش کلی معماری] (architecture.md) را بخوانید
- **تغییر ایجاد کنید؟** [راهنمای مشارکت] (contributing.md) را دنبال کنید
- **جزئیات راه اندازی؟** به [تنظیمات توسعه] (development-setup.md) مراجعه کنید

---

## عیب یابی

### "پورت 5055 در حال استفاده است"
``باش
# آنچه را که از پورت استفاده می کند پیدا کنید
lsof -i :5055

# از پورت دیگری استفاده کنید
uv run uvicorn api.main:app --port 5056
```

### "نمی توان به SurrealDB متصل شد"
``باش
# بررسی کنید که آیا SurrealDB در حال اجرا است
داکر ps | grep surrealdb

# آن را دوباره راه اندازی کنید
ایجاد پایگاه داده
```

### "نسخه پایتون خیلی قدیمی است"
``باش
# نسخه پایتون خود را بررسی کنید
python --نسخه # باید 3.11+ باشد

# به طور خاص از Python 3.11 استفاده کنید
uv sync --python 3.11
```

### "npm: دستور پیدا نشد"
``باش
# Node.js را از https://nodejs.org/ نصب کنید
# سپس وابستگی های frontend را نصب کنید
نصب cd frontend &&npm
```

---

## دستورات توسعه مشترک

``باش
# تست ها را اجرا کنید
uv run pytest# کد قالب
روف درست کن

# بررسی تایپ
پرز درست کن

# پشته کامل را اجرا کنید
همه چیز را شروع کنید

# مشاهده اسناد API
http://localhost:5055/docs را باز کنید
```

---

به کمک بیشتری نیاز دارید؟ برای جزئیات به [Development Setup](development-setup.md) مراجعه کنید یا به [Discord] ما بپیوندید (https://discord.gg/37XJPXfz2w).