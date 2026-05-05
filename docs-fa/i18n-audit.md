# i18n / حسابرسی RTL (آمادگی فارسی)

## دامنه و پوشش
دامنه حسابرسی سطوح اصلی جلویی را تحت «frontend/src/app» و UI/components مشترک در «frontend/src/components» و «frontend/src/lib» را پوشش می‌دهد.

**صفحات اصلی ممیزی شده**
- صفحه اصلی داشبورد: `frontend/src/app/(dashboard)/page.tsx`
- جستجو/پرسش: `frontend/src/app/(dashboard)/search/page.tsx`
- نوت بوک ها (فهرست/جزئیات): `frontend/src/app/(dashboard)/notebooks/page.tsx`، `frontend/src/app/(dashboard)/notebooks/[id]/page.tsx`
- منابع (لیست/جزئیات): `frontend/src/app/(dashboard)/sources/page.tsx`، `frontend/src/app/(dashboard)/sources/[id]/page.tsx`
- پادکست ها: "frontend/src/app/(dashboard)/podcasts/page.tsx"
- تبدیل‌ها: "frontend/src/app/(dashboard)/transformations/page.tsx"
- تنظیمات (+ کلیدهای API): `frontend/src/app/(dashboard)/settings/page.tsx`، `frontend/src/app/(dashboard)/settings/api-keys/page.tsx`
- پیشرفته: `frontend/src/app/(dashboard)/advanced/page.tsx`
- Auth/Login: `frontend/src/app/(auth)/login/page.tsx`

---

## 1) موجودی متنی رابط کاربری رمزگذاری شده (نیاز به استخراج دارد)

| مسیر فایل | متن/رشته فعلی | جزء/صفحه | نوع موضوع | اولویت |
|---|---|---|---|---|
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | "این اعتبار دارای {credential.model_count} مدل(های) پیوند شده است" | DeleteCredentialDialog (modal/alert) | ترجمه | انتقادی |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | `مدل ها را به:` | DeleteCredentialDialog (برچسب) | ترجمه | بالا |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | 'انتخاب اعتبار' | DeleteCredentialDialog (انتخاب مکان نگهدار) | ترجمه | بالا |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | 'مهاجرت و حذف' | DeleteCredentialDialog (دکمه) | ترجمه | انتقادی |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | 'حذف با مدل ها' | DeleteCredentialDialog (دکمه) | ترجمه | انتقادی |
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | "تست" | CredentialItem (برچسب دکمه در ردیف مدل) | ترجمه | متوسط ​​|
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | 'مدل ها' | CredentialItem (برچسب دکمه در ردیف مدل) | ترجمه | متوسط ​​|
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | `my-gcp-project` | ایجاد/ویرایش فرم اعتبارنامه (جایگاه) | ترجمه | متوسط ​​|
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | "us-central1" | ایجاد/ویرایش فرم اعتبارنامه (جایگاه) | ترجمه | متوسط ​​|
| `frontend/src/app/(dashboard)/settings/api-keys/page.tsx` | `/path/to/service-account.json` | ایجاد/ویرایش فرم اعتبارنامه (جایگاه) | ترجمه | متوسط ​​|
| `frontend/src/components/common/ContextIndicator.tsx` | "زمینه:" | ContextIndicator | ترجمه | متوسط ​​|
| `frontend/src/components/layout/AppSidebar.tsx` | 'Ctrl+' | راهنمایی میانبر صفحه کلید نوار کناری | ترجمه | کم |
| `frontend/src/app/not-found یا سطح فراداده` (`frontend/src/app/layout.tsx`) | "نوت بوک باز" | عنوان ابرداده HTML | ترجمه | کم |
| `frontend/src/app/not-found یا سطح فراداده` (`frontend/src/app/layout.tsx`) | "تحقیق و مدیریت دانش با محوریت حریم خصوصی" | توضیحات فراداده HTML | ترجمه | کم |

> توجه: بسیاری از رشته ها قبلاً از طریق "t('...')" محلی سازی شده اند. رشته های رمزگذاری شده باقیمانده در تنظیمات/جریان کلیدهای API و چند مؤلفه مشترک رابط کاربری متمرکز هستند.

---

## 2) ممیزی اجزای حساس به RTL

| مسیر فایل | جزء/صفحه | نگرانی rtl | نوع موضوع | اولویت |
|---|---|---|---|---|
| `frontend/src/components/layout/AppSidebar.tsx` | نوار کناری / ناوبری | تراز آیکون+متن، جهت جمع کردن، ترتیب اشاره صفحه کلید («Ctrl+K»)، شورون | rtl | انتقادی |
| `frontend/src/components/layout/AppShell.tsx` | پوسته برنامه (نوار کناری/ترکیب محتوا) | لنگر انداختن نوار کناری (چپ در مقابل راست)، بالشتک محتوا/حاشیه بر اساس جهت | rtl | انتقادی |
| `frontend/src/components/ui/dialog.tsx` + موارد استفاده | مدال | تله فوکوس + قرارگیری دکمه بستن + جهت بالشتک | rtl / a11y | بالا |
| `frontend/src/components/ui/dropdown-menu.tsx` | منوها | تراز منو («شروع/پایان») در زیر RTL | rtl | بالا |
| `frontend/src/components/ui/select.tsx` | انتخاب ورودی ها | تراز ماشه/محتوا، جهت کارت، برش ارزش | rtl | بالا |
| `frontend/src/components/ui/command.tsx` | پالت فرمان | نماد جستجو/جهت ورودی + تراز مورد نتیجه | rtl | بالا |
| `frontend/src/components/ui/checkbox-list.tsx` | چک لیست های فرم | چک باکس/موقعیت کنترل باید در RTL | rtl | بالا |
| `frontend/src/components/common/InlineEdit.tsx` | کنترل های فرم درون خطی | نمادهای اکشن و تراز متن ورودی | rtl | متوسط ​​|
| `frontend/src/app/(dashboard)/search/page.tsx` | صفحه جستجو | فیلترهای افقی، نشان‌ها، کلاس‌های فاصله بین نمادها (`mr-*`) | rtl | بالا |
| `frontend/src/app/(dashboard)/notebooks/components/NotebookList.tsx` | لیست/کارت های شبکه | قرار دادن اکشن کارت، جهت برش برای اسکریپت ترکیبی | rtl | متوسط ​​|
| `frontend/src/components/source/ChatPanel.tsx` | پنل جریانی شبیه چت | تراز پیام + جهت علامت گذاری در محتوای ترکیبی LTR/RTL | rtl | انتقادی |
| `frontend/src/components/search/StreamingResponse.tsx` | نمایش پاسخ جریانی | تراشه های استنادی، کد درون خطی، نقطه گذاری پیرامون متن فارسی | rtl | انتقادی |
| `frontend/src/components/podcasts/EpisodesTab.tsx` | ردیف های جدول/فهرست مانند + اقدامات | ترتیب ستون/عمل، تراز نشان وضعیت | rtl | متوسط ​​|
| استفاده از "frontend/src/components/ui/pagination" (در صورت اضافه شدن در آینده) | الگوی صفحه بندی | معنای بعدی/قبلی و جهت های پیکان در RTL | rtl | متوسط ​​|
| `frontend/src/components/ui/sonner.tsx` + استفاده از نان تست در هوک | اطلاعیه نان تست | قرار دادن نان تست و تنظیم بسته/عمل در RTL | rtl | بالا |

---

## 3) تاریخ/عدد و شکاف های قالب بندی محلی

| مسیر فایل | متن/رشته فعلی | جزء/صفحه | نوع موضوع | اولویت |
|---|---|---|---|---|
| «frontend/src/lib/utils/date-locale.ts» و همه سایت‌های تماس رندر تاریخ | منطق قالب بندی محلی وجود دارد اما زبان فارسی تایید نشده است | رندر تاریخ متقابل برنامه | تاریخ-شماره | بالا |
| `frontend/src/components/podcasts/EpisodeCard.tsx` | نمایش مدت/زمان/تاریخ (برچسب های UI) | کارت قسمت | تاریخ-شماره | متوسط ​​|
| `frontend/src/components/source/SourceDetailContent.tsx` | آمار فایل/متادیتا تاریخ | جزئیات منبع | تاریخ-شماره | متوسط ​​|

---

## 4) ایست های بازرسی اعتبارسنجی / حالت خالی / مودال / نان تست

| مسیر فایل | متن/رشته فعلی | جزء/صفحه | نوع موضوع | اولویت |
|---|---|---|---|---|
| `frontend/src/lib/hooks/use-sources.ts` | عنوان نان تست / رشته شرح (جریان موفقیت / خطا) | منابع نان تست CRUD | ترجمه | بالا |
| `frontend/src/lib/hooks/use-notebooks.ts` | عنوان نان تست / رشته شرح | نان تست CRUD نوت بوک | ترجمه | بالا |
| "frontend/src/lib/hooks/use-notes.ts" | عنوان نان تست / رشته شرح | توجه نان تست CRUD | ترجمه | بالا |
| `frontend/src/lib/hooks/use-credentials.ts` | رشته های نان تست + منطق الحاق (قطعات جمله) | جریان اعتبارنامه | ترجمه | انتقادی |
| `frontend/src/lib/hooks/use-models.ts` | عنوان نان تست / رشته شرح | جریان های مدل | ترجمه | بالا |
| `frontend/src/lib/hooks/use-transformations.ts` | عنوان نان تست / رشته شرح | جریان های دگرگونی | ترجمه | بالا |
| `frontend/src/components/common/EmptyState.tsx` | برچسب‌ها/توضیحات حالت خالی عمومی | حالت های خالی مشترک | ترجمه / a11y | بالا |

---

## 5) دستور اجرای توصیه شده

1. ** استخراج ترجمه حیاتی**: تنظیمات/کلیدهای api با کد سخت مودال/رشته‌های دکمه + همه پیام‌های نان تست در سطح قلاب.
2. **بنیاد RTL**: مدیریت جهانی "dir" در پوسته برنامه + انعکاس نوار کناری + گفتگو/منو/تراز انتخابی.
3. **محلی سازی تاریخ/تعداد**: از قالب بندی فارسی ('fa-IR') برای تاریخ ها و اعداد، از جمله خط مشی اعداد اطمینان حاصل کنید.
4. **بررسی A11y در RTL**: تأیید ترتیب برگه ها، حرکت حلقه فوکوس، برچسب های صفحه خوان برای طرح بندی های آینه ای.

