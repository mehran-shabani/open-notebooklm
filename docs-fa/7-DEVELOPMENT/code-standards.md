# استانداردهای کد

این سند استانداردهای کدنویسی و بهترین شیوه ها را برای مشارکت های Open Notebook نشان می دهد. همه کدها باید از این دستورالعمل ها پیروی کنند تا از سازگاری، خوانایی و قابلیت نگهداری اطمینان حاصل شود.

## استانداردهای پایتون

### قالب بندی کد

ما **PEP 8** را با چند دستورالعمل خاص دنبال می کنیم:

- از **Ruff** برای پرده زدن و قالب بندی استفاده کنید
- حداکثر طول خط: **88 کاراکتر**
- از **کوتیشن های دوگانه** برای رشته ها استفاده کنید
- از **کاماهای دنباله دار** در ساختارهای چند خطی استفاده کنید

### نکات را تایپ کنید

همیشه برای پارامترهای تابع و مقادیر برگردانده از نوع نکات استفاده کنید:

``پایتون
از تایپ import List، Optional، Dict، Any
از pydantic import BaseModel

async def process_content(
    محتوا: خیابان،
    گزینه ها: اختیاری[Dict[str, Any]] = هیچکدام
) -> محتوای پردازش شده:
    """ پردازش محتوا با پیکربندی اختیاری."""
    #پیاده سازی
```

### الگوهای ناهمگام/انتظار

از async/wait به طور مداوم در کل پایگاه کد استفاده کنید:

``پایتون
#خوب
async def fetch_data(url: str) -> Dict[str, Any]:
    async با aiohttp.ClientSession() به عنوان جلسه:
        async با session.get(url) به عنوان پاسخ:
            بازگشت await answer.json()

# بد - همگام سازی و همگام سازی مخلوط
def fetch_data(url: str) -> Dict[str, Any]:
    حلقه = asyncio.get_event_loop()
    بازگشت loop.run_until_complete(async_fetch(url))
```

### رسیدگی به خطا

از مدیریت خطای ساختاریافته با استثناهای سفارشی استفاده کنید:

``پایتون
از open_notebook.exceptions import DatabaseOperationError، InvalidInputError

async def create_notebook(نام: str، توضیحات: str) -> Notebook:
    """یک نوت بوک جدید با اعتبارسنجی ایجاد کنید."""
    اگر نه name.strip():
        افزایش InvalidInputError ("نام نوت بوک نمی تواند خالی باشد")

    سعی کنید:
        دفترچه یادداشت = دفترچه یادداشت (نام = نام، توضیحات = توضیحات)
        منتظر notebook.save()
        نوت بوک برگشتی
    به جز استثنا به عنوان e:
        raise DatabaseOperationError(f"notebook ایجاد نشد: {str(e)}")
```

### مستندات (به سبک Google Docstrings)

از رشته‌های اسنادی به سبک Google برای همه توابع، کلاس‌ها و ماژول‌ها استفاده کنید:

``پایتون
async def vector_search(
    پرس و جو: خیابان،
    حد: int = 10،
    حداقل_امتیاز: شناور = 0.2
) -> فهرست [نتایج جستجو]:
    """جستجوی برداری را در محتوای جاسازی شده انجام دهید.

    ارگ:
        query: رشته پرس و جو را جستجو کنید
        محدودیت: حداکثر تعداد نتایج برای بازگشت
        minimal_score: حداقل امتیاز شباهت برای نتایج

    برمی‌گرداند:
        فهرستی از نتایج جستجو که بر اساس امتیاز مربوطه مرتب شده اند

    افزایش می دهد:InvalidInputError: اگر پرس و جو خالی باشد یا محدودیت نامعتبر باشد
        DatabaseOperationError: اگر عملیات جستجو با شکست مواجه شود
    """
    #پیاده سازی
```

#### ماژول Docstrings
``پایتون
"""
مدل دامنه نوت بوک و عملیات.

این ماژول شامل کلاس Notebook اصلی و عملیات مربوط به آن است
مدیریت نوت بوک های تحقیقاتی در سیستم نوت بوک باز.
"""
```

#### کلاس Docstrings
``پایتون
نوت بوک کلاس (BaseModel):
    """یادداشت پژوهشی حاوی منابع، یادداشت ها و جلسات گفتگو.

    نوت بوک ها واحد سازمانی اولیه در دفترچه یادداشت باز هستند که اجازه می دهند
    کاربران برای گروه بندی مواد تحقیقاتی مرتبط و حفظ زمینه های جداگانه
    برای پروژه های مختلف

    ویژگی ها:
        name: نام نمایشی نوت بوک
        توضیحات: شرح اختیاری هدف نوت بوک
        بایگانی شده: آیا نوت بوک بایگانی شده است (پیش‌فرض: نادرست)
        ایجاد شده: مهر زمانی خلقت
        به روز شد: مهر زمانی آخرین به روز رسانی
    """
```

#### تابع Docstrings
``پایتون
async def create_notebook(
    نام: خیابان،
    توضیحات: str = ""،
    user_id: اختیاری[str] = هیچ
) -> دفترچه یادداشت:
    """یک نوت بوک جدید با اعتبارسنجی ایجاد کنید.

    ارگ:
        نام: نام دفترچه (الزامی، غیر خالی)
        توضیحات: توضیحات دفترچه یادداشت اختیاری
        user_id: شناسه کاربری اختیاری برای استقرار چند کاربره

    برمی‌گرداند:
        نمونه نوت بوک ایجاد شده

    افزایش می دهد:
        InvalidInputError: اگر نام خالی یا نامعتبر باشد
        DatabaseOperationError: اگر ایجاد نشد

    مثال:
        ``پایتون
        notebook = await create_notebook(
            نام "تحقیقات هوش مصنوعی"،
            توضیحات "تحقیق در مورد برنامه های کاربردی هوش مصنوعی"
        )
        ```
    """
```

## استانداردهای FastAPI

### سازمان روتر

سازماندهی نقاط پایانی بر اساس دامنه:

``پایتون
# api/routers/notebooks.py
از fastapi import APIRouter، HTTPException، Query
از تایپ فهرست واردات، اختیاری

روتر = APIRouter()

@router.get("/notebooks", answer_model=List[NotebookResponse])
async def get_notebooks(
    archived: Optional[bool] = Query (هیچ‌کدام، توضیحات = "فیلتر بر اساس وضعیت بایگانی")،
    order_by: str = Query("updated desc", description="ترتیب بر اساس فیلد و جهت")
):
    """همه نوت بوک ها را با فیلتر و سفارش اختیاری دریافت کنید."""
    #پیاده سازی
```

### مدل های درخواست/پاسخ

از مدل های Pydantic برای اعتبارسنجی استفاده کنید:

``پایتون
از pydantic import BaseModel, Field
از تایپ import Optional

کلاس NotebookCreate (BaseModel):name: str = فیلد(..., description="Name of the notebook", min_length=1)
    توضیحات: str = فیلد(پیش‌فرض ="، توضیحات "توضیحات دفترچه یادداشت")

کلاس NotebookResponse (BaseModel):
    شناسه: خ
    نام: خ
    توضیحات: خ
    بایگانی شده: bool
    ایجاد شده: خ
    به روز شده: خ
```

### رسیدگی به خطا

از پاسخ های خطای ثابت استفاده کنید:

``پایتون
از fastapi واردات HTTPException
از loguru import logger

سعی کنید:
    result = await some_operation()
    نتیجه بازگشت
به جز InvalidInputError به عنوان e:
    افزایش HTTPException(status_code=400, detail=str(e))
به جز DatabaseOperationError به صورت e:
    logger.error(f"خطای پایگاه داده: {str(e)}")
    افزایش HTTPException(status_code=500, detail="خطای سرور داخلی")
```

### اسناد API

از ویژگی های اسناد خودکار FastAPI استفاده کنید:

``پایتون
@router.post(
    "/نوت بوک"،
    answer_model=Response Notebook،
    summary="ایجاد یک نوت بوک جدید"،
    description="ایجاد یک نوت بوک جدید با نام و توضیحات مشخص شده.",
    پاسخ ها={
        201: {"description": "Notebook با موفقیت ایجاد شد"},
        400: {"description": "Input data Invalid"},
        500: {"description": "خطای سرور داخلی"}
    }
)
async def create_notebook(notebook: NotebookCreate):
    """یک نوت بوک جدید ایجاد کنید."""
    #پیاده سازی
```

## استانداردهای پایگاه داده

### الگوهای SurrealDB

از الگوی مخزن به طور مداوم استفاده کنید:

``پایتون
از open_notebook.database.repository import repo_create, repo_query, repo_update

# سوابق ایجاد کنید
async def create_notebook(داده: Dict[str, Any]) -> Dict[str, Any]:
    """یک رکورد نوت بوک جدید ایجاد کنید."""
    بازگشت در انتظار repo_create ("نوت بوک"، داده)

# پرس و جو با پارامترها
async def find_notebooks_by_user(user_id: str) -> List[Dict[str, Any]]:
    """یافتن نوت بوک برای یک کاربر خاص."""
    بازگشت در انتظار repo_query(
        "SELECT * FROM notebook WHERE user_id = $user_id"
        {"user_id": user_id}
    )

# سوابق را به روز کنید
async def update_notebook(notebook_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    """به روز رسانی رکورد نوت بوک."""
    بازگشت در انتظار repo_update ("notebook", notebook_id, data)
```

### مدیریت طرحواره

از مهاجرت برای تغییرات طرحواره استفاده کنید:

``سوررئال
-- migrations/8.surrealql
اگر وجود ندارد، جدول را تعریف کنید new_feature SCHEMAFULL.
تعریف فیلد اگر نام در جدول وجود ندارد new_feature رشته TYPE.
DEFINE FIELD IF NOT EXISTS توضیحات ON TABLE new_feature TYPE گزینه<string>;DEFINE FIELD IF NOT EXISTS ایجاد شده در TABLE new_feature TYPE datetime time DEFAULT::now();
DEFINE FIELD IF NOT EXISTS به روز شده در TABLE new_feature TYPE datetime زمان پیش فرض::now();
```

## استانداردهای TypeScript

### دستورالعمل های اساسی

بهترین شیوه های TypeScript را دنبال کنید:

- از حالت سخت فعال در `tsconfig.json` استفاده کنید
- از یادداشت های نوع مناسب برای همه متغیرها و توابع استفاده کنید
- از استفاده از «هر نوع» خودداری کنید مگر اینکه کاملاً ضروری باشد
- از «رابط» برای اشکال شی، «نوع» برای اتحادیه ها و دیگر انواع پیشرفته استفاده کنید

### ساختار مؤلفه

- از قطعات کاربردی با قلاب استفاده کنید
- اجزای سازنده را متمرکز و تک مسئولیت نگه دارید
- منطق قابل استفاده مجدد را به قلاب های سفارشی استخراج کنید
- از انواع TypeScript مناسب برای props استفاده کنید

### رسیدگی به خطا

- اشتباهات را به صراحت مدیریت کنید
- ارائه پیام های خطای معنی دار
- خطاها را به طور مناسب ثبت کنید
- خطاها را بی سر و صدا سرکوب نکنید

## ابزارهای کیفیت کد

ما از این ابزارها برای حفظ کیفیت کد استفاده می کنیم:

- **Ruff**: لینتینگ و قالب بندی کد
  - اجرا با: `uv run ruff check . --رفع`
  - فرمت با: `uv run ruff format .`

- **MyPy**: بررسی نوع استاتیک
  - اجرا با: `uv run python -m mypy .`

- **Pytest**: چارچوب تست
  - اجرا با: `uv run pytest`

## الگوهای رایج

### عملیات پایگاه داده Async

``پایتون
async def get_notebook_with_sources(notebook_id: str) -> Notebook:
    """بازیابی نوت بوک با همه منابع مرتبط."""
    notebook_data = await repo_query(
        "SELECT * FROM notebook WHERE id = $id"،
        {"id": notebook_id}
    )
    اگر notebook_data نیست:
        raise InvalidInputError(f"Notebook {notebook_id} یافت نشد")

    sources_data = await repo_query(
        "انتخاب * از منبع WHERE notebook_id = $notebook_id"،
        {"notebook_id": notebook_id}
    )

    نوت بوک برگشت (
        **داده های نوت بوک[0]،
        sources=[Source(**s) for s in sources_data]
    )
```

### اعتبارسنجی مدل

``پایتون
از pydantic import BaseModel، اعتباردهنده

کلاس NotebookInput (BaseModel):
    نام: خ
    توضیحات: str = ""

    @validator('name')
    def name_not_empty(cls, v):
        اگر نه v.strip():
            raise ValueError ('نام نمی تواند خالی باشد')
        بازگشت v.strip()
```

## چک لیست مرور کد

قبل از ارسال کد برای بررسی، اطمینان حاصل کنید:

- [ ] کد از بهترین شیوه های PEP 8 / TypeScript پیروی می کند
- [ ] نکات نوع برای همه عملکردها وجود دارد
- [ ] Docstrings کامل و دقیق هستند
- [ ] رسیدگی به خطا مناسب است
- [ ] آزمون ها گنجانده شده است و قبولی- [ ] هیچ کد اشکال زدایی (console.logs، بیانیه های چاپی) باقی نمانده است
- [ ] پیام های تعهد واضح هستند و از قراردادها پیروی می کنند
- [ ] اسناد در صورت نیاز به روز می شوند

---

**همچنین ببینید:**
- [راهنمای تست] (testing.md) - نحوه نوشتن تست
- [راهنمای مشارکت] (contributing.md) - گردش کار مشارکت کلی