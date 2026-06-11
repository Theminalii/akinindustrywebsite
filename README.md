# Akin Industry Website

Next.js 16 layihəsi. Sayt production hostinq üçün hazırlanıb və həm Vercel, həm də Docker/Nginx tipli serverlərdə deploy oluna bilər.

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- App Router

## Local Run

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm start
```

## Required Environment Variables

`.env.example` faylını kopyalayın:

```bash
cp .env.example .env.production
```

Ən azı bunu doldurun:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=strong-random-password
```

Bu dəyişən aşağıdakılar üçün istifadə olunur:

- SEO `metadataBase`
- `robots.txt`
- `sitemap.xml`
- Open Graph canonical URL
- `/admin` və `/api/admin` üçün basic auth qoruması

## Deploy Options

## 1. Vercel

1. Repo-nu Vercel-ə bağlayın
2. Build command: `npm run build`
3. Output command: avtomatik
4. Environment variable əlavə edin:
   - `NEXT_PUBLIC_SITE_URL=https://your-domain.com`

## 2. Docker

Build:

```bash
docker build -t akin-industry .
```

Run:

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  akin-industry
```

## Hosting Readiness

Layihədə artıq bunlar hazırdır:

- production build yoxlanıb
- `standalone` output aktivdir
- `Dockerfile` əlavə olunub
- `robots.txt` metadata route ilə yaradılır
- `sitemap.xml` metadata route ilə yaradılır
- `metadataBase` və canonical host dəstəyi əlavə olunub
- `poweredByHeader` deaktiv edilib

## Important Note About Admin Panel

Hazırkı admin panel məlumatları serverdə və databazada deyil, brauzerin `localStorage` hissəsində saxlayır.

Bu o deməkdir:

- admin paneldə etdiyiniz dəyişikliklər yalnız həmin brauzerdə görünəcək
- başqa kompüterdə və ya başqa brauzerdə həmin dəyişikliklər görünməyəcək
- hostinqə deploy etmək local admin məlumatlarını avtomatik shared CMS etmir

Əgər production-da admin panel məlumatlarının bütün istifadəçilər üçün qalıcı olmasını istəyirsinizsə, növbəti addım olaraq backend/database inteqrasiyası edilməlidir.

## Pre-Deploy Checklist

- `NEXT_PUBLIC_SITE_URL` düzgün domain ilə verilib
- şəkillər `public/` daxilindədir
- `npm run build` uğurla keçir
- `ADMIN_USERNAME` və `ADMIN_PASSWORD` production üçün dəyişdirilib
- əgər shared admin lazımdırsa, localStorage yerinə database əlavə olunub
# akinindustrywebsite
