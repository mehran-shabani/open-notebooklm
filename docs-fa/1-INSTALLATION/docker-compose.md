# نصب Docker Compose (توصیه می شود)

راه اندازی چند کانتینر با خدمات جداگانه. **بهترین برای اکثر کاربران.**

> **رجیستری جایگزین:** همه تصاویر هم در Docker Hub ('lfnovo/open_notebook') و هم در GitHub Container Registry ('ghcr.io/lfnovo/open-notebook') در دسترس هستند. اگر Docker Hub مسدود است یا گردش‌های کاری Native GitHub را ترجیح می‌دهید از GHCR استفاده کنید.

## پیش نیاز

- **Docker Desktop** نصب شده ([دانلود](https://www.docker.com/products/docker-desktop/))
- **5-10 دقیقه** از وقت شما
- **کلید API** برای حداقل یک ارائه دهنده هوش مصنوعی (OpenAI برای مبتدیان توصیه می شود)

## مرحله 1: دریافت docker-compose.yml (1 دقیقه)

**گزینه A: دانلود از مخزن**
``باش
curl -o docker-compose.yml https://raw.githubusercontent.com/lfnovo/open-notebook/main/docker-compose.yml
```

**گزینه B: از فایل رسمی مخزن استفاده کنید**

«docker-compose.yml» رسمی در ریشه مخزن ما است: [مشاهده در GitHub](https://github.com/lfnovo/open-notebook/blob/main/docker-compose.yml)

آن فایل را در پوشه پروژه خود کپی کنید.

**گزینه ج: ایجاد دستی**

فایلی به نام «docker-compose.yml» با این محتوا ایجاد کنید:

`` یامل
خدمات:
  surrealdb:
    تصویر: surrealdb/surrealdb:v2
    دستور: start --log info --user root --pass root rocksdb:/mydata/mydatabase.db
    user: root # مورد نیاز برای باند mount در لینوکس
    پورت ها:
      - "8000:8000"
    حجم ها:
      - ./سوررئال_داده:/mydata
    محیط زیست:
      - SURREAL_EXPERIMENTAL_GRAPHQL=درست است
    راه اندازی مجدد: همیشه
    pull_policy: همیشه

open_notebook:
    تصویر: lfnovo/open_notebook:v1-latest
    پورت ها:
      - "8502:8502" # رابط کاربری وب
      - "5055:5055" # REST API
    محیط زیست:
      # مورد نیاز: این را به رشته مخفی خود تغییر دهید
      - OPEN_NOTEBOOK_ENCRYPTION_KEY=تغییر-me-to-a-secret-string

# اتصال پایگاه داده (مقادیر پیش فرض - بدون نیاز به تغییر)
      - SURREAL_URL=ws://surrealdb:8000/rpc
      - SURREAL_USER = ریشه
      - SURREAL_PASSWORD = ریشه
      - SURREAL_NAMESPACE=open_notebook
      - SURREAL_DATABASE=نوت بوک باز
    حجم ها:
      - ./notebook_data:/app/data
    بستگی_به:
      - surrealdb
    راه اندازی مجدد: همیشه
    pull_policy: همیشه
```

**ویرایش فایل:**
- «رشته تغییر من به یک مخفی» را با راز خود جایگزین کنید (هر رشته‌ای کار می‌کند، به عنوان مثال، «کلید من فوق‌العاده مخفی-123»)

---

## مرحله 2: شروع خدمات (2 دقیقه)

ترمینال را در پوشه «open-notebook» باز کنید:

``باش
docker آهنگسازی -d
```

15-20 ثانیه صبر کنید تا همه سرویس ها شروع شوند:
```
✅ Surrealdb در حال اجرا بر روی :8000
✅ open_notebook در حال اجرا بر روی :8502 (UI) و :5055 (API)
```

بررسی وضعیت:
``باش
docker compose ps
```

---

## مرحله 3: تأیید نصب (1 دقیقه)

**API Health:**
``باش
حلقه http://localhost:5055/health
# باید بازگشت: {"وضعیت": "سالم"}
```

**دسترسی پیشانی:**
باز کردن مرورگر به:
```
http://localhost:8502
```

باید رابط Open Notebook را ببینید!

---

## مرحله 4: ارائه دهنده هوش مصنوعی را پیکربندی کنید (2 دقیقه)

1. به **تنظیمات** → **کلیدهای API** بروید
2. روی **افزودن اعتبار** کلیک کنید
3. ارائه دهنده خود را انتخاب کنید (به عنوان مثال OpenAI، Anthropic، Google)
4. نامی به آن بدهید، کلید API خود را بچسبانید
5. روی **ذخیره** کلیک کنید
6. روی **Test Connection** کلیک کنید - باید موفقیت را نشان دهد
7. روی **Discover Models** → **Register Models** کلیک کنید

مدل های شما اکنون در دسترس هستند!

> **به یک کلید API نیاز دارید؟** یکی را از ارائه دهنده انتخابی خود دریافت کنید:
> - **OpenAI**: https://platform.openai.com/api-keys
> - **Anthropic**: https://console.anthropic.com/
> - **Google**: https://aistudio.google.com/
> - **Groq**: https://console.groq.com/

---

## مرحله 5: اولین نوت بوک (2 دقیقه)

1. روی **New Notebook** کلیک کنید
2. نام: "تحقیق من"
3. توضیحات: "شروع به کار"
4. روی **Create** کلیک کنید

انجام شد! اکنون یک نمونه Open Notebook کاملاً کارآمد دارید.

---

## پیکربندی

### افزودن اوللاما (مدل‌های محلی رایگان)

به جای ویرایش دستی، از مثال آماده ما استفاده کنید:

``باش
# مثال اولاما را دانلود کنید
curl -o docker-compose.yml https://raw.githubusercontent.com/lfnovo/open-notebook/main/examples/docker-compose-ollama.yml

# یا از مخزن کپی کنید
نمونه‌های cp/docker-compose-ollama.yml docker-compose.yml
```

برای تنظیم کامل به [examples/docker-compose-ollama.yml](../../examples/docker-compose-ollama.yml) مراجعه کنید.

**تنظیم دستی:** این را به "docker-compose.yml" موجود خود اضافه کنید:

`` یامل
  اولاما:
    تصویر: olama/olama:جدیدترین
    پورت ها:
      - "11434:11434"
    حجم ها:
      - olama_models:/root/.ollama
    راه اندازی مجدد: همیشه

حجم ها:
  olama_models:
```

سپس راه اندازی مجدد کنید و یک مدل را بکشید:
``باش
docker compose راه اندازی مجدد
docker exec open-notebook-local-ollama-1 ollama pull mistral
```

Ollama را در تنظیمات UI پیکربندی کنید:
1. به **تنظیمات** → **کلیدهای API** بروید
2. روی **Add Credential** → Select **Ollama** کلیک کنید
3. URL پایه را وارد کنید: «http://ollama:11434».
4. روی **ذخیره** و سپس روی **Test Connection** کلیک کنید.
5. روی **Discover Models** → **Register Models** کلیک کنید

---

## مرجع متغیرهای محیطی

| متغیر | هدف | مثال |
|----------|---------|---------|
| «OPEN_NOTEBOOK_ENCRYPTION_KEY» | کلید رمزگذاری برای اعتبارنامه ها | «کلید مخفی من» |
| "SURREAL_URL" | اتصال به پایگاه داده | `ws://surrealdb:8000/rpc` |
| "SURREAL_USER" | کاربر پایگاه داده | "ریشه" |
| "SURREAL_PASSWORD" | رمز پایگاه داده | "ریشه" |
| "SURREAL_NAMESPACE" | فضای نام پایگاه داده | "نوت بوک_باز" |
| "SURREAL_DATABASE" | نام پایگاه داده | "نوت بوک_باز" |
| "API_URL" | URL خارجی API | `http://localhost:5055` |
| «OPEN_NOTEBOOK_EMBEDDING_BATCH_SIZE» | نادیده گرفتن اندازه دسته جاسازی برای ارائه دهندگان سختگیرتر/محلی (توصیه می شود: `8` برای تنظیمات محلی فقط CPU) | `50` |

برای فهرست کامل به [مرجع محیط زیست] (../5-CONFIGURATION/environment-reference.md) مراجعه کنید.

---

## وظایف مشترک

### خدمات را متوقف کنید
``باش
docker آهنگسازی
```

### مشاهده گزارش‌ها
``باش
# کلیه خدمات
docker نوشتن سیاهههای مربوط -f

#خدمات خاص
docker compose logs -f api
```

### خدمات را مجددا راه اندازی کنید
``باش
docker compose راه اندازی مجدد
```

### به آخرین نسخه به روز رسانی کنید
``باش
docker آهنگسازی
docker compose pull
docker آهنگسازی -d
```

### همه داده ها را حذف کنید
``باش
docker compose down -v
```

---

## عیب یابی

### خطای "نمی توان به API متصل شد".

1. Check if Docker is running:
```bash
docker ps
```

2. بررسی کنید که آیا خدمات در حال اجرا هستند:
``باش
docker compose ps
```

3. گزارش های API را بررسی کنید:
``باش
docker compose logs api
```

4. بیشتر صبر کنید - شروع خدمات در اولین اجرا ممکن است 20 تا 30 ثانیه طول بکشد

---

### پورت از قبل در حال استفاده است

اگر "پورت 8502 از قبل در حال استفاده است" دریافت کردید، پورت را تغییر دهید:

`` یامل
پورت ها:
  - "8503:8502" # به جای آن از 8503 استفاده کنید
  - "5055:5055" # پورت API را یکسان نگه دارید
```

سپس به «http://localhost:8503» دسترسی پیدا کنید

---

### مسائل مربوط به اعتبار

1. به **تنظیمات** → **کلیدهای API** بروید
2. روی **Test Connection** روی اعتبار کلیک کنید
3. اگر ناموفق بود، کلید را در وب سایت ارائه دهنده تأیید کنید
4. بررسی کنید که اعتباری در حساب خود دارید
5. در صورت نیاز اعتبارنامه را حذف و دوباره ایجاد کنید

---

### مشکلات اتصال پایگاه داده

بررسی کنید که SurrealDB در حال اجرا است:
``باش
docker compose logs surrealdb
```

بازنشانی پایگاه داده:
``باش
docker compose down -v
docker آهنگسازی -d
```

### مجوز پایگاه داده رد شد (لینوکس)

اگر «مجوز رد شد» یا «ساخت دایرکتوری RocksDB ناموفق بود» را در گزارش‌های SurrealDB مشاهده کردید:

``باش
docker compose logs surrealdb | اجازه grep -i
```

این اتفاق می افتد زیرا SurrealDB به عنوان یک کاربر غیر ریشه اجرا می شود اما Docker دایرکتوری های bind mount را به عنوان root ایجاد می کند. «user: root» را به سرویس surrealdb اضافه کنید:

`` یامل
surrealdb:
  تصویر: surrealdb/surrealdb:v2
  کاربر: root # Fix for Linux bind mount permissions
  # ... بقیه تنظیمات
```

سپس راه اندازی مجدد:
``باش
docker compose down -v
docker آهنگسازی -d
```

---

## تنظیمات جایگزین

به دنبال پیکربندی های مختلف هستید؟ پوشه [examples/](../../examples/) ما را بررسی کنید:

- **[Ollama Setup](../../examples/docker-compose-ollama.yml)** - اجرای مدل های محلی هوش مصنوعی (رایگان، خصوصی)
- **[Single Container](../../examples/docker-compose-single.yml)** - محفظه همه کاره (منسوخ شده، در نسخه ۲ حذف خواهد شد)
- **[توسعه](../../examples/docker-compose-dev.yml)** - برای مشارکت کنندگان و توسعه دهندگان

هر مثال شامل نظرات دقیق و دستورالعمل های استفاده است.

---

## مراحل بعدی

1. **افزودن محتوا **: منابع، نوت بوک، اسناد
2. **پیکربندی مدل ها**: تنظیمات → مدل ها (ترجیحات خود را انتخاب کنید)
3. **کاوش ویژگی**: چت، جستجو، تحولات
4. **راهنمای خواندن**: [راهنمای کاربر](../3-USER-GUIDE/index.md)

---

## استقرار تولید

برای استفاده در تولید، نگاه کنید به:
- [سخت شدن امنیتی] (../5-CONFIGURATION/security.md)
- [پروکسی معکوس](../5-CONFIGURATION/reverse-proxy.md)

---

## دریافت کمک

- **Discord**: [پشتیبانی انجمن](https://discord.gg/37XJPXfz2w)
- **مشکلات**: [مشکلات GitHub](https://github.com/lfnovo/open-notebook/issues)
- **اسناد**: [مستندات کامل] (../index.md)