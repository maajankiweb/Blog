# Hostinger Deployment Guide for Maajanki WebTech Next.js App

Aapke Next.js project ko Hostinger par deploy karne ke 2 sabse aasan tarike hain:

---

## 🚀 Option 1: Hostinger Node.js Application Manager (Recommended)

1. **Hostinger hPanel me Login karein**:
   - `Websites` -> `Manage` -> **Node.js Web Applications** (jaayein).

2. **Create Application Configuration**:
   - **Node.js Version**: Select `20.x` ya `18.x`
   - **Application Root**: `public_html` (ya aapke domain ka root folder)
   - **Application URL**: Select your domain (`https://blog.maajankiwebtech.com`)
   - **Application Startup File**: `server.js` (jo humne create kar diya hai)

3. **Files Upload & Installation**:
   - Git repository connect karein ya saare project files ko `public_html` me upload karein.
   - Hostinger Terminal / SSH me run karein:
     ```bash
     npm install
     npm run build
     ```
   - hPanel me **Restart Application** par click karein.

---

## ⚡ Option 2: Static Export Deployment (Zero Server Maintenance)

Gar aap pure Client-Side static hosting chahte hain:
1. Terminal me `npm run build` execute karein.
2. Output `.next` / `out` folder ke saare content ko `public_html` folder me drag-and-drop karein.

---

## ⚙️ Created Connector Files:
- [server.js](file:///f:/MJ%20WT/blog-frontend/server.js) — Node.js HTTP Server entry point for Hostinger Node App Manager.
- [public/.htaccess](file:///f:/MJ%20WT/blog-frontend/public/.htaccess) — Apache reverse proxy & security headers rules.
