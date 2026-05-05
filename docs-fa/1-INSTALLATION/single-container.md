# نصب کانتینر (منسوخ شده)

> **اخطار منسوخ شدن:** تصویر تک کانتینر ('v1-latest-single') **منسوخ شده** است و در نسخه 2 حذف خواهد شد. لطفاً به [Docker Compose] (docker-compose.md)، که روش نصب توصیه شده برای همه کاربران است، مهاجرت کنید. تصویر تک کانتینر تا زمانی که نسخه 2 منتشر شود به‌روزرسانی‌ها را دریافت می‌کند، اما هیچ ویژگی یا سند جدیدی آن را هدف قرار نخواهد داد.

راه اندازی کانتینر همه در یک **ساده تر از Docker Compose، اما کمتر انعطاف پذیر است.**

**بهترین برای:** PikaPods، راه آهن، میزبانی مشترک، حداقل تنظیمات

> **رجیستری جایگزین:** تصاویر موجود در Docker Hub (`lfnovo/open_notebook:v1-latest-single`) و رجیستری کانتینر GitHub (`ghcr.io/lfnovo/open-notebook:v1-latest-single`).

## پیش نیاز

- داکر نصب شده (برای آزمایش محلی)
- کلید API از OpenAI، Anthropic، یا ارائه دهنده دیگر
- 5 دقیقه

## راه اندازی سریع

### برای تست محلی (Docker)

`` یامل
# docker-compose.yml
خدمات:
  open_notebook:
    تصویر: lfnovo/open_notebook:v1-latest-single
    pull_policy: همیشه
    پورت ها:
      - "8502:8502" # رابط کاربری وب (React frontend)
      - "5055:5055" # API
    محیط زیست:
      - OPEN_NOTEBOOK_ENCRYPTION_KEY=تغییر-me-to-a-secret-string
      - SURREAL_URL=ws://localhost:8000/rpc
      - SURREAL_USER = ریشه
      - SURREAL_PASSWORD = ریشه
      - SURREAL_NAMESPACE=open_notebook
      - SURREAL_DATABASE=نوت بوک باز
    حجم ها:
      - ./data:/app/data
    راه اندازی مجدد: همیشه
```

اجرا کنید:
``باش
docker آهنگسازی -d
```

دسترسی: "http://localhost:8502".

سپس ارائه دهنده هوش مصنوعی خود را پیکربندی کنید:
1. به **تنظیمات** → **کلیدهای API** بروید
2. روی **Add Credential** → Select your provider → Paste API key کلیک کنید
3. روی **ذخیره** و سپس روی **Test Connection** کلیک کنید.
4. روی **Discover Models** → **Register Models** کلیک کنید

### برای پلتفرم های ابری

**PikaPods:**
1. روی «برنامه جدید» کلیک کنید
2. «Open Notebook» را جستجو کنید
3. متغیرهای محیط را تنظیم کنید (حداقل: «OPEN_NOTEBOOK_ENCRYPTION_KEY»)
4. روی "استقرار" کلیک کنید
5. برنامه را باز کنید → برای پیکربندی ارائه دهنده هوش مصنوعی خود به **تنظیمات → کلیدهای API** بروید

**راه آهن:**
1. ایجاد پروژه جدید
2. «lfnovo/open_notebook:v1-latest-single» را اضافه کنید
3. متغیرهای محیط را تنظیم کنید (حداقل: «OPEN_NOTEBOOK_ENCRYPTION_KEY»)
4. مستقر کنید
5. برنامه را باز کنید → برای پیکربندی ارائه دهنده هوش مصنوعی خود به **تنظیمات → کلیدهای API** بروید

**رندر:**
1. وب سرویس جدید ایجاد کنید
2. از تصویر داکر استفاده کنید: `lfnovo/open_notebook:v1-latest-single`
3. متغیرهای محیط را در داشبورد تنظیم کنید (حداقل: «OPEN_NOTEBOOK_ENCRYPTION_KEY»)
4. دیسک پایدار را برای «/app/data» و «/mydata» پیکربندی کنید

**پلتفرم اپلیکیشن DigitalOcean:**
1. برنامه جدید از Docker Hub ایجاد کنید
2. از تصویر استفاده کنید: `lfnovo/open_notebook:v1-latest-single`
3. پورت را روی 8502 تنظیم کنید
4. متغیرهای محیط را اضافه کنید (حداقل: «OPEN_NOTEBOOK_ENCRYPTION_KEY»)
5. ذخیره سازی دائمی را پیکربندی کنید

**هروکو:**
``باش
# با استفاده از heroku.yml
ظرف هرکو: وب فشاری
herku container:release web
پیکربندی heroku:تنظیم OPEN_NOTEBOOK_ENCRYPTION_KEY=کلید مخفی شما
```

**خنک کردن:**
1. افزودن سرویس جدید → Docker Image
2. تصویر: `lfnovo/open_notebook:v1-latest-single`
3. بندر: 8502
4. متغیرهای محیط را اضافه کنید (حداقل: «OPEN_NOTEBOOK_ENCRYPTION_KEY»)
5. حجم های ماندگار را فعال کنید
6. Coolify به طور خودکار HTTPS را کنترل می کند

---

## متغیرهای محیطی

| متغیر | هدف | مثال |
|----------|---------|---------|
| «OPEN_NOTEBOOK_ENCRYPTION_KEY» | کلید رمزگذاری برای اعتبارنامه ها (الزامی) | «کلید مخفی من» |
| "SURREAL_URL" | پایگاه داده | `ws://localhost:8000/rpc` |
| "SURREAL_USER" | کاربر DB | "ریشه" |
| "SURREAL_PASSWORD" | رمز DB | "ریشه" |
| "SURREAL_NAMESPACE" | فضای نام DB | "نوت بوک_باز" |
| "SURREAL_DATABASE" | نام DB | "نوت بوک_باز" |
| "API_URL" | URL خارجی (برای دسترسی از راه دور) | "https://myapp.example.com" |

کلیدهای API ارائه‌دهنده هوش مصنوعی از طریق رابط کاربری **تنظیمات → کلیدهای API** پس از استقرار پیکربندی می‌شوند.

---

## محدودیت ها در مقابل Docker Compose

| ویژگی | ظرف تکی | Docker Compose |
|---------|-----------------|-----------------|
| زمان راه اندازی | 2 دقیقه | 5 دقیقه |
| پیچیدگی | حداقل | متوسط ​​|
| خدمات | همه همراه | جدا شده |
| مقیاس پذیری | محدود | عالی |
| استفاده از حافظه | ~800 مگابایت | ~1.2 گیگابایت |

---

## مراحل بعدی

مانند راه‌اندازی Docker Compose - فقط از طریق «http://localhost:8502» (محلی) یا URL پلتفرم خود (ابر) دسترسی داشته باشید.

1. برای افزودن اعتبار ارائه دهنده هوش مصنوعی خود به **تنظیمات → کلیدهای API** بروید
2. **تست اتصال** و **کشف مدل**

برای راهنمای کامل پس از نصب، به [Docker Compose](docker-compose.md) مراجعه کنید.