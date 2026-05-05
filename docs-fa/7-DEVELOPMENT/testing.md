# راهنمای تست

این سند دستورالعمل هایی را برای نوشتن تست ها در دفترچه یادداشت باز ارائه می دهد. تست برای حفظ کیفیت کد و جلوگیری از رگرسیون بسیار مهم است.

## فلسفه تست

### چه چیزی را تست کنیم

روی آزمایش چیزهایی که بیشترین اهمیت را دارند تمرکز کنید:

- ** منطق کسب و کار ** - مدل های دامنه اصلی و عملیات آنها
- ** قراردادهای API ** - رفتار نقطه پایانی HTTP و رسیدگی به خطا
- **جریان های کاری حیاتی** - جریان های سرتاسری که کاربران به آنها وابسته هستند
- **پایداری داده** - عملیات پایگاه داده و یکپارچگی داده ها
- **شرایط خطا** - سیستم چگونه با شکست ها به خوبی برخورد می کند

### چه چیزی را نباید تست کرد

زمان را برای آزمایش کد چارچوب تلف نکنید:

- عملکرد چارچوب (FastAPI، React و غیره)
- پیاده سازی کتابخانه شخص ثالث
- گیرنده/ تنظیم کننده ساده بدون منطق
- نمایش / نمایش لایه ارائه (مگر اینکه حاوی منطق باشد)

## ساختار تست

ما از **pytest** با پشتیبانی async برای تمام تست های پایتون استفاده می کنیم:

``پایتون
وارد کردن پای تست
از httpx import AsyncClient
از open_notebook.domain.notebook import Notebook

@pytest.mark.asyncio
async def test_create_notebook():
    """ایجاد دفترچه یادداشت آزمایشی."""
    notebook = notebook(name="Test Notebook", description="Test Description")
    منتظر notebook.save()

    assert notebook.id هیچکدام نیست
    assert notebook.name == "تست دفترچه"
    assert notebook.created هیچکدام نیست

@pytest.mark.asyncio
async def test_api_create_notebook():
    """تست ایجاد نوت بوک از طریق API."""
    async با AsyncClient (app=app, base_url="http://test") به عنوان مشتری:
        پاسخ = منتظر client.post(
            "/api/notebooks"،
            json={"name": "Test Notebook", "description": "Test Description"}
        )
        اظهار answer.status_code == 200
        data = answer.json()
        ادعای داده["name"] == "دفترچه یادداشت آزمایشی"
```

## دسته بندی تست

### 1. تست های واحد

توابع و روش های فردی را به صورت مجزا آزمایش کنید:

``پایتون
@pytest.mark.asyncio
async def test_notebook_validation():
    """تست که اعتبار نام نوت بوک کار می کند."""
    با pytest.raises (InvalidInputError):
        دفترچه یادداشت (نام = "، توضیحات "آزمون")

@pytest.mark.asyncio
async def test_notebook_archive():
    """آزمون بایگانی دفترچه یادداشت."""
    notebook = Notebook(name="Test", description="")
    notebook.archive()
    assert notebook.archived True است
```

**موقعیت مکانی**: `تست ها/واحد/`

### 2. تست های یکپارچه سازی

تست تعامل اجزا و عملیات پایگاه داده:

``پایتون
@pytest.mark.asyncio
async def test_create_notebook_with_sources():"""تست ایجاد یک دفترچه یادداشت و افزودن منابع.""
    notebook = await create_notebook(name="Research", description="")
    منبع = await add_source (notebook_id=notebook.id، url="https://example.com")

    بازیابی شده = منتظر get_notebook_with_sources (notebook.id)
    ادعای لن (بازیابی شده.منابع) == 1
    عنوان retrieved.sources[0].id == source.id
```

**موقعیت مکانی**: `تست/ادغام/`

### 3. تست های API

تست نقاط پایانی HTTP و پاسخ های خطا:

``پایتون
@pytest.mark.asyncio
async def test_get_notebooks_endpoint():
    """نقطه پایانی GET /notebooks را تست کنید."""
    async با AsyncClient (app=app, base_url="http://test") به عنوان مشتری:
        answer = await client.get ("/api/notebooks")
        اظهار answer.status_code == 200
        data = answer.json()
        عنوان مثال (داده ها، فهرست)

@pytest.mark.asyncio
async def test_create_notebook_validation():
    """آزمایش کنید که ورودی نامعتبر رد شده است."""
    async با AsyncClient (app=app, base_url="http://test") به عنوان مشتری:
        پاسخ = منتظر client.post(
            "/api/notebooks"،
            json={"name": ""، "description": ""}
        )
        اظهار answer.status_code == 400
```

**موقعیت مکانی**: `tests/api/`

### 4. تست های پایگاه داده

تست ماندگاری داده ها و صحت پرس و جو:

``پایتون
@pytest.mark.asyncio
async def test_save_and_retrieve_notebook():
    """آزمایش ذخیره و بازیابی یک نوت بوک از پایگاه داده."""
    notebook = notebook(name="Test", description="desc")
    منتظر notebook.save()

    بازیابی شده = منتظر Notebook.get(notebook.id)
    assert retrieved.name == "تست"
    assert retrieved.description == "نزولی"

@pytest.mark.asyncio
async def test_query_by_criteria():
    """یادداشت های پرس و جو را بر اساس معیارها تست کنید."""
    await create_notebook ("فعال"، "")
    await create_notebook ("بایگانی شده"، "")

    فعال = منتظر repo_query(
        "انتخاب * از دفترچه یادداشت WHERE بایگانی = نادرست"
    )
    اظهار لن (فعال) >= 1
```

**موقعیت مکانی**: `تست ها/پایگاه داده/`

## تست های در حال اجرا

### همه تست ها را اجرا کنید

``باش
uv run pytest
```

### فایل تست خاص را اجرا کنید

``باش
uv اجرای pytest tests/test_notebooks.py
```

### عملکرد تست خاص را اجرا کنید

``باش
uv اجرای pytest tests/test_notebooks.py::test_create_notebook
```

### اجرا با گزارش پوشش

``باش
uv run pytest --cov=open_notebook
```

### فقط تست های واحد را اجرا کنید

``باش
uv run pytest tests/unit/
```

### فقط تست های یکپارچه سازی را اجرا کنید

``باش
uv run pytest tests/integration/
```

### تست ها را در حالت کلامی اجرا کنید

``باش
uv اجرا pytest -v
```### تست ها را با خروجی اجرا کنید

``باش
uv run pytest -s
```

## تجهیزات تست

از فیکسچرهای pytest برای راه اندازی و حذف معمولی استفاده کنید:

``پایتون
وارد کردن پای تست

@pytest.fixture
async def test_notebook():
    """یادداشت دفترچه تست."""
    notebook = notebook(name="Test Notebook", description="Test Description")
    منتظر notebook.save()
    دفترچه بازده
    منتظر notebook.delete()

@pytest.fixture
async def api_client():
    """یک سرویس گیرنده تست API ایجاد کنید."""
    async با AsyncClient (app=app, base_url="http://test") به عنوان مشتری:
        مشتری بازده

@pytest.fixture
async def test_notebook_with_sources(test_notebook):
    """یادداشت دفترچه تست با منابع نمونه."""
    source1 = منبع (notebook_id=test_notebook.id، url="https://example.com")
    source2 = منبع (notebook_id=test_notebook.id، url="https://example.org")
    در انتظار source1.save()
    await source2.save()

    test_notebook.sources = [منبع1، منبع2]
    تست بازده_نوت بوک

    #پاکسازی
    در انتظار source1.delete()
    await source2.delete()
```

## بهترین شیوه ها

### 1. نام تست تشریحی را بنویسید

``پایتون
# خوب - به وضوح آنچه را در حال آزمایش است توصیف می کند
async def test_create_notebook_with_valid_name_succeeds():
    ...

# بد - مبهم در مورد آنچه در حال آزمایش است
async def test_notebook():
    ...
```

### 2. از Docstrings استفاده کنید

``پایتون
@pytest.mark.asyncio
async def test_vector_search_returns_sorted_results():
    """آزمایش کنید که نتایج جستجوی برداری بر اساس امتیاز مربوطه مرتب شوند."""
    #پیاده سازی
```

### 3. موارد لبه تست

``پایتون
@pytest.mark.asyncio
async def test_search_with_empty_query():
    """آزمایش کنید که پرس و جو خالی خطا ایجاد می کند."""
    با pytest.raises (InvalidInputError):
        await vector_search("")

@pytest.mark.asyncio
async def test_search_with_very_long_query():
    """تست کنید که پرس و جوی بسیار طولانی بررسی شده است."""
    long_query = "x" * 10000
    نتایج = await vector_search(long_query)
    ادعای نمونه (نتایج، فهرست)

@pytest.mark.asyncio
async def test_search_with_special_characters():
    """آزمایش کنید که کاراکترهای خاص مدیریت می شوند."""
    نتایج = await vector_search("@#$%^&*()")
    ادعای نمونه (نتایج، فهرست)
```

### 4. از اظهارات به طور موثر استفاده کنید

``پایتون
# خوب - ادعاهای خاص
assert notebook.name == "تست"
assert len (notebook.sources) == 3
assert notebook.created هیچکدام نیست

# کمتر خوب - خیلی گسترده
نوت بوک ادعایی هیچکدام نیست
ادعای نوت بوک # مبهم آنچه در حال آزمایش است
```

### 5. هر دو مورد موفقیت و شکست را آزمایش کنید

``پایتون@pytest.mark.asyncio
async def test_create_notebook_success():
    """آزمایش موفقیت آمیز ایجاد نوت بوک."""
    notebook = await create_notebook (نام = "تحقیق"، توضیحات "AI")
    assert notebook.id هیچکدام نیست
    assert notebook.name == "تحقیق"

@pytest.mark.asyncio
async def test_create_notebook_empty_name_fails():
    """تست کنید که نام خالی خطا ایجاد می کند."""
    با pytest.raises (InvalidInputError):
        await create_notebook(name=", description="")

@pytest.mark.asyncio
async def test_create_notebook_duplicate_fails():
    """آزمایش کنید که نام های تکراری مدیریت می شوند."""
    await create_notebook(name="تحقیق"، توضیحات="")
    با pytest.raises (DuplicateError):
        await create_notebook(name="تحقیق"، توضیحات="")
```

### 6. تست ها را مستقل نگه دارید

``پایتون
# خوب - آزمون مستقل است
@pytest.mark.asyncio
async def test_archive_notebook():
    notebook = Notebook(name="Test", description="")
    منتظر notebook.save()
    await notebook.archive()
    assert notebook.archived True است

# بد - به وضعیت آزمایش دیگری بستگی دارد
@pytest.mark.asyncio
async def test_archive_existing_notebook():
    # فرض بر این است که تست_ایجاد_نوت بوک ابتدا اجرا شد
    await notebook.archive() # notebook undefined
```

### 7. از Fixtures برای راه اندازی مجدد استفاده کنید

``پایتون
# به جای تکرار تنظیمات:
@pytest.fixture
async def client_with_auth(api_client، mock_auth):
    """مشتری با تنظیم احراز هویت."""
    api_client.headers.update({"Authorization": f"Bearer {mock_auth.token}"})
    بازده api_client

@pytest.mark.asyncio
async def test_protected_endpoint(client_with_auth):
    """نقطه پایانی محافظت شده را تست کنید."""
    answer = await client_with_auth.get("/api/protected")
    اظهار answer.status_code == 200
```

## اهداف پوشش

- پوشش کلی 70% را هدف قرار دهید
- 90٪ + پوشش برای منطق تجاری حیاتی
- بیش از 100٪ وسواس نداشته باشید - روی تست های معنی دار تمرکز کنید
- از پرچم «--cov» برای بررسی پوشش استفاده کنید: «uv run pytest --cov=open_notebook»

## الگوهای تست ناهمگام

### تست توابع Async

``پایتون
@pytest.mark.asyncio
async def test_async_operation():
    """آزمایش عملکرد ناهمگام."""
    result = await some_async_function()
    نتیجه ادعا هیچکدام نیست
```

### آزمایش عملیات همزمان

``پایتون
@pytest.mark.asyncio
async def test_concurrent_notebook_creation():
    """تست ایجاد چندین نوت بوک به صورت همزمان."""
    وظایف = [
        create_notebook(f"Notebook {i}"، "")
        برای من در محدوده (10)
    ]
    notebooks = await asyncio.gather(*tasks)assert len (نوت بوک) == 10
    اظهار همه (n.id برای n در نوت بوک)
```

## خطاهای رایج تست

### خطا: "حلقه رویداد بسته است"

راه حل: از فیکسچر async به درستی استفاده کنید:
``پایتون
@pytest.fixture
async def notebook(): # از فیکسچر async استفاده کنید
    notebook = Notebook(name="Test", description="")
    منتظر notebook.save()
    دفترچه بازده
    منتظر notebook.delete()
```

### خطا: "شیء قابل انتظار نیست"

راه حل: مطمئن شوید که از انتظار استفاده می کنید:
``پایتون
#اشتباه
result = create_notebook ("تست"، "")

#درست
result = await create_notebook("تست"، "")
```

---

**همچنین ببینید:**
- [استانداردهای کد] (code-standards.md) - قالب بندی و سبک کد
- [راهنمای مشارکت] (contributing.md) - گردش کار مشارکت کلی