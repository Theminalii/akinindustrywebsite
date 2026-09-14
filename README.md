# akin.akinindustry.com

## Local run

```bash
npm install
npm run dev
```

## Admin login

Admin giriş məlumatlarını repoya və ya README faylına yazmayın. Mövcud admin
hesabının şifrəsini admin paneldən dəyişin və yalnız təhlükəsiz şifrə
menecerində saxlayın.

Əgər brauzerdə ayrıca `Giriş Yap: domain.com:443` popup-u çıxırsa, bu tətbiqin
login-i deyil. Bu, hosting tərəfində açılmış `Basic Auth` qorumasıdır və
Hostinger panelindən idarə edilməlidir.

## Environment variables

Deploy üçün nümunə dəyişənlər [`.env.example`](./.env.example) faylındadır.

## CMS və MySQL

1. `.env.example` faylını `.env.local` kimi kopyalayın və `MYSQL_HOST`,
   `MYSQL_PORT`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD` dəyərlərini doldurun.
2. `ADMIN_SESSION_SECRET` üçün uzun təsadüfi dəyər, ilk giriş üçün
   `ADMIN_INITIAL_EMAIL` və güclü `ADMIN_INITIAL_PASSWORD` təyin edin.
3. Bazanı əvvəlcədən yaradın. Tətbiq istifadəçisinə cədvəl yaratmaq, oxumaq,
   əlavə etmək və yeniləmək hüquqları verin. İlk sorğuda `admin_state` və
   `admin_settings` cədvəlləri yaradılır, ilkin sayt məzmunu bazaya yazılır.
   Mövcud bazaya yalnız çatışmayan məzmun sahələri əlavə edilir; əvvəlki
   redaktələr və boşaldılmış siyahılar qorunur.
4. `npm run build` və `npm start` ilə işlədin. Bütün server instansiyaları
   **eyni MySQL bazasına** qoşulmalıdır.

`/admin/pages` bölməsində səhifə, bölmə və mətn axtarışı vasitəsilə sahələri
ayrılıqda redaktə edib saxlayın. Mətnlər, menyu keçidləri, slayder şəkilləri,
videoların ünvanları, forma etiketləri və SEO məlumatları buradadır.
Şəkillər fayldan yüklənib sıxılmış formada bazada saxlanıla bilər; videolar
üçün əlçatan fayl URL-i daxil edin. İngilis və Azərbaycan mətnləri ayrıca
sahələrdir. Layihə, xəbər, xidmət, vakansiya və digər siyahıların redaktə
bölmələrinə həmin səhifədən keçidlər var.

Məzmunun əsas mənbəyi MySQL-dir. CMS yalnız uğurlu DB yazısından sonra
saxlanmanı təsdiqləyir. Məzmun localStorage, sessionStorage və IndexedDB-yə
yazılmır. API cavabları və səhifələr `no-store` ilə verilir. Açıq və aktiv
ictimai səhifələr hər 5 saniyədə, həmçinin fokus bərpa ediləndə yenilənir.
Admin formalarının yazılmamış qaralamaları avtomatik yenilənmə ilə əvəz
edilmir. Eyni versiyaya paralel yazılardan biri `409` alır; redaktor
məlumatı yoxlayıb yenidən saxlamalıdır. DB bağlantısı itəndə ilkin demo
məlumatları əsl məzmun kimi göstərilmir.

## Yoxlama

```bash
npm run typecheck
npm run build
CMS_BASE_URL=http://localhost:3000 \
CMS_TEST_EMAIL=admin \
CMS_TEST_PASSWORD='test-bazasinin-admin-sifresi' \
node scripts/cms-database-test.mjs
```

Brauzer testini yalnız ayrıca test bazasında işlədin: test məzmunu
müvəqqəti dəyişir və sonda bərpa edir. `CHROME_PATH` ilə Chrome yolunu
əvəz etmək mümkündür. Test iki müstəqil brauzer sessiyasında saxlanma,
avtomatik yenilənmə, silinmə, cache/storage davranışı, giriş qoruması və
paralel yazı konfliktlərini yoxlayır.
