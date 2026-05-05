# از نصب منبع

مخزن را کلون کنید و به صورت محلی اجرا کنید. **برای توسعه دهندگان و مشارکت کنندگان.**

## پیش نیاز

- ** Python 3.11+** - [دانلود] (https://www.python.org/)
- **Node.js 18+** - [دانلود](https://nodejs.org/)
- **Git** - [دانلود](https://git-scm.com/)
- **Docker** (برای SurrealDB) - [دانلود] (https://docker.com/)
- **uv** (مدیر بسته پایتون) - `curl -LsSf https://astral.sh/uv/install.sh | sh`
- کلید API از OpenAI یا مشابه (یا به صورت رایگان از Olama استفاده کنید)

## راه اندازی سریع (10 دقیقه)

### 1. مخزن کلون

``باش
کلون git https://github.com/lfnovo/open-notebook.git
سی دی باز نوت بوک

# اگر آن را چنگال کردید:
git clone https://github.com/YOUR_USERNAME/open-notebook.git
سی دی باز نوت بوک
git remote add upstream https://github.com/lfnovo/open-notebook.git
```

### 2. وابستگی های پایتون را نصب کنید

``باش
همگام سازی uv
uv pip نصب python-magic
```

#### 2.1 جایگزین: راه اندازی Conda (اختیاری)

اگر ترجیح می دهید از **Conda** برای مدیریت محیط های خود استفاده کنید، این مراحل را به جای استاندارد "uv sync" دنبال کنید:

``باش
# محیط را ایجاد و فعال کنید
conda create -n open-notebook python=3.11 -y
conda activate open-notebook

# uv را در داخل conda نصب کنید تا سازگاری با Makefile حفظ شود
conda install -c conda-forge uv nodejs -y

# وابستگی ها را همگام سازی کنید
همگام سازی uv
```

> **نکته**: نصب "uv" در محیط Conda تضمین می کند که دستوراتی مانند "make start-all" و "make api" به طور یکپارچه کار می کنند.

### 3. SurrealDB را شروع کنید

``باش
# ترمینال 1
ایجاد پایگاه داده
# یا: docker compose up surrealdb
```

### 4. متغیرهای محیط را تنظیم کنید

``باش
cp .env.example .env
# ویرایش env و تنظیم:
# OPEN_NOTEBOOK_ENCRYPTION_KEY=کلید مخفی من
```

پس از راه اندازی برنامه، ارائه دهندگان هوش مصنوعی را از طریق رابط کاربری **تنظیمات → کلیدهای API** در مرورگر پیکربندی کنید.

### 5. API را شروع کنید

``باش
# ترمینال 2
api درست کن
# یا: uv run --env-file .env uvicorn api.main:app --host 0.0.0.0 --port 5055
```

### 6. Frontend را شروع کنید

``باش
# ترمینال 3
cd frontend && npm install && npm run dev dev
```

### 7. دسترسی

- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:5055/docs
- **پایگاه داده**: http://localhost:8000

### 8. ارائه دهنده هوش مصنوعی را پیکربندی کنید

1. http://localhost:3000 را باز کنید
2. به **تنظیمات** → **کلیدهای API** بروید
3. روی **Add Credential** → Select your provider → Paste API key کلیک کنید
4. روی **ذخیره** و سپس روی **Test Connection** کلیک کنید.
5. روی **Discover Models** → **Register Models** کلیک کنید

---

## گردش کار توسعه

### کیفیت کد

``باش
# فرمت و پرز پایتون
روف درست کن
# یا: راف چک . -- رفع

# بررسی تایپ
پرز درست کن
# یا: uv run python -m mypy .
```

### تست ها را اجرا کنید

``باش
تست های پای تست uv run/
```

### دستورات رایج

``باش
# همه چیز را شروع کنید
همه چیز را شروع کنید

# اسناد API را مشاهده کنید
http://localhost:5055/docs را باز کنید

# مهاجرت های پایگاه داده را بررسی کنید
# (اجرای خودکار در راه اندازی API)

#پاکسازی
تمیز کردن
```

---

## عیب یابی

### نسخه پایتون خیلی قدیمی است

``باش
python --version # نسخه را بررسی کنید
uv sync --python 3.11 # از نسخه خاصی استفاده کنید
```

### npm: دستور پیدا نشد

Node.js را از https://nodejs.org/ نصب کنید

### خطاهای اتصال پایگاه داده

``باش
docker ps # اجرای SurrealDB را بررسی کنید
لاگ های docker surrealdb # مشاهده گزارش ها
```

### پورت 5055 در حال حاضر در حال استفاده است

``باش
# از پورت های مختلف استفاده کنید
uv run uvicorn api.main:app --port 5056
```

---

## مراحل بعدی

1. [راهنمای توسعه] را بخوانید (../7-DEVELOPMENT/quick-start.md)
2. به [نمایش کلی معماری] (../7-DEVELOPMENT/architecture.md) مراجعه کنید
3. [راهنمای مشارکت] (../7-DEVELOPMENT/contributing.md) را بررسی کنید

---

## دریافت کمک

- **Discord**: [Community](https://discord.gg/37XJPXfz2w)
- **مشکلات**: [مشکلات GitHub](https://github.com/lfnovo/open-notebook/issues)