# 🚀 Next Steps & Deployment Guide (MaaJanki Blog)

यह गाइड MaaJanki Web Tech के Next.js Blog Frontend (`blog-frontend`) के लिए तैयार की गई है। इसमें आगे किए जाने वाले कार्यों (Next Steps) और वेबसाइट को लाइव करने की पूरी प्रक्रिया (Live Deployment Guide) को विस्तार से समझाया गया है।

---

## 🛠️ भाग 1: आगे किए जाने वाले कार्य (Next Steps)

यद्यपि ब्लॉग का मुख्य कनेक्शन और संरचना तैयार है, लाइव करने से पहले और बाद में निम्नलिखित कस्टमाइज़ेशन किए जा सकते हैं:

### 1. लोकल टेस्टिंग (Local Verification)
सबसे पहले, सुनिश्चित करें कि प्रोजेक्ट आपके लोकल कंप्यूटर पर सही ढंग से चल रहा है:
```bash
# blog-frontend डायरेक्टरी में जाएं
cd "F:\MJ WT\blog-frontend"

# डेवलपमेंट सर्वर चालू करें
npm run dev
```
ब्राउज़र में `http://localhost:3000` खोलें और देखें:
- [ ] क्या होमपेज पर सारे ब्लॉग्स और कैटेगरीज लोड हो रही हैं?
- [ ] किसी भी ब्लॉग कार्ड पर क्लिक करने पर क्या सिंगल पोस्ट सही स्टाइल के साथ खुल रही है?
- [ ] क्या कैटेगरी फ़िल्टर सही ढंग से काम कर रहा है?

### 2. Search फ़ंक्शनलिटी (Add Search Feature)
ब्लॉग में सर्च बार जोड़ने के लिए:
- `src/app/page.tsx` में एक इनपुट फ़ील्ड जोड़ें।
- यूजर जब सर्च करे, तो URL में `?search=query` पास करें।
- `getPosts({ search: query })` का उपयोग करके WordPress REST API से सर्च रिजल्ट्स फ़ेच करें।

### 3. Pagination या Load More (Handling Large Content)
यदि ब्लॉग पर बहुत सारी पोस्ट्स हैं, तो:
- होमपेज पर `getPosts({ page: 2, perPage: 12 })` का उपयोग करके अगले पेजों का डेटा लोड करें।
- "Next/Previous" बटन या "Load More" बटन जोड़ें ताकि यूजर सभी पुराने आर्टिकल्स पढ़ सकें।

### 4. अतिरिक्त पेजेज (Additional Pages)
मुख्य वेबसाइट से लिंक करने के लिए निम्नलिखित पेजेज जोड़ें:
- **About Us Page:** `src/app/about/page.tsx`
- **Contact Page:** `src/app/contact/page.tsx`
- **Custom 404 Page:** `src/app/not-found.tsx` (एक प्रीमियम डिज़ाइनर नॉट-फाउंड पेज)

### 5. SEO & Sitemap Generation
ब्लॉग के Google इंडेक्सिंग को बेहतर बनाने के लिए Next.js में डायनामिक सैंडबॉक्स सैटअप करें:
- `src/app/sitemap.ts` फ़ाइल बनाएं जो WordPress API से सभी पोस्ट्स की लिस्ट फ़ेच करे और डायनामिक XML सैंडबॉक्स जनरेट करे।
- robots.txt फ़ाइल (`src/app/robots.ts`) में सैंडबॉक्स का पाथ कॉन्फ़िगर करें।

---

## 🌐 भाग 2: लाइव कैसे करें? (Deployment & Go Live Guide)

Next.js (App Router) को लाइव करने के तीन प्रमुख तरीके हैं। आप अपनी सुविधा अनुसार कोई भी विकल्प चुन सकते हैं:

### विकल्प A: Vercel पर होस्ट करना (सबसे आसान और रेकमेंडेड 🌟)
चूंकि Next.js को Vercel ने ही बनाया है, इसलिए Vercel पर होस्टिंग सबसे तेज़, सुरक्षित और ऑटोमैटिक होती है।

1. **Git Repository बनाएं:**
   - अपने कोड को GitHub / GitLab / Bitbucket पर पुश करें।
2. **Vercel पर लॉगिन करें:**
   - [vercel.com](https://vercel.com) पर जाएं और अपने GitHub अकाउंट से साइन-अप/लॉगिन करें।
3. **प्रोजेक्ट इम्पोर्ट करें:**
   - "Add New Project" पर क्लिक करें और अपने ब्लॉग रिपोजिटरी (`blog-frontend`) को सिलेक्ट करें।
4. **Environment Variables सेट करें:**
   - **Environment Variables** सेक्शन में निम्न वेरिएबल जोड़ें:
     - `NEXT_PUBLIC_WORDPRESS_API_URL` = `https://blog.maajankiwebtech.com/wp-json/wp/v2`
5. **Deploy:**
   - "Deploy" पर क्लिक करें। 2 मिनट में आपकी वेबसाइट लाइव हो जाएगी और आपको एक टेस्टिंग डोमेन (उदा. `my-blog.vercel.app`) मिल जाएगा।
6. **कस्टम डोमेन कनेक्ट करें:**
   - Vercel Project Settings > Domains में जाकर अपना डोमेन (जैसे `blog.maajankiwebtech.com`) जोड़ें।
   - Vercel द्वारा दिए गए DNS Records (CNAME और A रिकॉर्ड) को अपने DNS प्रोवाइडर (Hostinger/Cloudflare) में अपडेट करें।

---

### विकल्प B: Hostinger VPS या CPanel Node.js (यदि आप Hostinger का उपयोग कर रहे हैं)
चूंकि आपका मुख्य डोमेन Hostinger पर है, आप Hostinger के **Node.js VPS Hosting** या **hPanel Node.js App support** का उपयोग कर सकते हैं:

1. **प्रोजेक्ट का प्रोडक्शन बिल्ड लें:**
   लोकल में या सर्वर पर प्रोजेक्ट बिल्ड करें:
   ```bash
   npm run build
   ```
2. **सर्वर पर फाइल्स ट्रांसफर करें:**
   - `.next`, `public`, `src`, `package.json`, `package-lock.json`, `.env.local` फ़ोल्डर्स को FTP या SSH के ज़रिए सर्वर पर अपलोड करें (`node_modules` को अपलोड न करें, सर्वर पर इंस्टॉल करें)।
3. **Hostinger Panel में सेटअप:**
   - hPanel में **Node.js Configuration** सेक्शन पर जाएं।
   - **Application Entry File:** `.next/standalone/server.js` या `node_modules/next/dist/bin/next` (या standard startup script)।
   - **Environment Variables:** `NEXT_PUBLIC_WORDPRESS_API_URL=https://blog.maajankiwebtech.com/wp-json/wp/v2` सेट करें।
   - **Run npm install:** सर्वर कंसोल/पैनल से `npm install` चलाएं ताकि प्रोडक्शन डिपेंडेंसीज इंस्टॉल हो सकें।
   - **App Start:** Node.js एप्लीकेशन को स्टार्ट/रीस्टार्ट करें।

---

### विकल्प C: Static HTML Export (यदि आप पूरी तरह स्टैटिक रखना चाहते हैं)
यदि आप चाहते हैं कि आपका ब्लॉग बिना किसी सर्वर (Node.js) के चले और सीधे एक साधारण HTML वेबसाइट की तरह Hostinger Shared Hosting पर होस्ट हो जाए:

1. **Next.js Config अपडेट करें:**
   - `next.config.ts` फ़ाइल में `output: 'export'` जोड़ें:
     ```typescript
     import type { NextConfig } from "next";

     const nextConfig: NextConfig = {
       output: 'export', // स्टैटिक HTML एक्सपोर्ट के लिए
       images: {
         unoptimized: true, // स्टैटिक एक्सपोर्ट में इमेज ऑप्टिमाइजेशन डिसेबल करना होता है
       }
     };

     export default nextConfig;
     ```
2. **बिल्ड रन करें:**
   ```bash
   npm run build
   ```
   यह कमांड आपके पूरे ब्लॉग को `out/` फ़ोल्डर में स्टैटिक HTML, CSS, और JS फाइल्स के रूप में एक्सपोर्ट कर देगी।
3. **Hostinger File Manager में अपलोड करें:**
   - `out/` फ़ोल्डर के अंदर की सभी फाइल्स को सीधे Hostinger के `public_html` (या उप-डोमेन फ़ोल्डर) में अपलोड कर दें।
   - *नोट:* स्टैटिक एक्सपोर्ट करने पर, जब भी आप WordPress पर नया ब्लॉग डालेंगे, आपको दोबारा `npm run build` करके फाइल्स अपलोड करनी होंगी (या Webhook ऑटोमेशन सेटअप करना होगा)।

---

## 📌 वर्डप्रेस बैकएंड के लिए महत्वपूर्ण सलाह (WordPress Best Practices)
जब आप Next.js को लाइव डोमेन पर कनेक्ट कर देंगे, तो वर्डप्रेस को केवल CMS (डेटा स्रोत) की तरह इस्तेमाल किया जाएगा। सुरक्षा और स्पीड के लिए निम्न काम ज़रूर करें:
1. **REST API Cache Plugin:** वर्डप्रेस में **WP REST Cache** प्लगइन इंस्टॉल करें ताकि Next.js द्वारा बार-बार रिक्वेस्ट करने पर वर्डप्रेस सर्वर पर लोड न पड़े।
2. **Security:** वर्डप्रेस के एडमिन यूआरएल (`/wp-admin`) को सुरक्षित रखें और केवल ऑथर्स के लिए ही एक्सेसिबल रखें।
3. **Headless Domain Architecture (Domain mapping & Redirection):**
   चूंकि `blog.maajankiwebtech.com` वर्तमान में लाइव है और उस पर आपका वर्डप्रेस पहले से चल रहा है, इसलिए इसे हेडलेस सेटअप में बदलने की प्रक्रिया निम्नलिखित होगी:
   
   * **महत्वपूर्ण:** वर्डप्रेस को **डिलीट नहीं करना है**। अगर आप वर्डप्रेस डिलीट करेंगे, तो आपका एडमिन पैनल, डेटाबेस और कंटेंट सब खत्म हो जाएगा।
   * **नया सब-डोमेन सेटअप करें (उदाहरण के लिए: `cms.maajankiwebtech.com`):**
     * Hostinger पैनल में एक नया सब-डोमेन बनाएं, जैसे `cms.maajankiwebtech.com` या `admin-blog.maajankiwebtech.com`।
     * अपने वर्डप्रेस वेबसाइट की फाइलों और डेटाबेस को `blog.maajankiwebtech.com` से इस नए `cms.maajankiwebtech.com` पर ट्रांसफर/माइग्रेट करें (Hostinger पैनल में डोमेन/डायरेक्टरी पाथ बदलना बहुत आसान है, या आप 'All in One WP Migration' प्लगइन का उपयोग कर सकते हैं)।
     * अब आप वर्डप्रेस में नया ब्लॉग पोस्ट लिखने या एडिट करने के लिए `cms.maajankiwebtech.com/wp-admin` पर लॉगिन करेंगे।
   * **Next.js में URL अपडेट करें:**
     * `.env.local` फ़ाइल में `NEXT_PUBLIC_WORDPRESS_API_URL` को बदलकर `https://cms.maajankiwebtech.com/wp-json/wp/v2` कर दें।
   * **Next.js फ़्रंटएंड को लाइव डोमेन पर कनेक्ट करें:**
     * अब जब आपका वर्डप्रेस नए `cms.maajankiwebtech.com` पर शिफ्ट हो गया है, तो मुख्य डोमेन `blog.maajankiwebtech.com` खाली हो जाएगा।
     * इस `blog.maajankiwebtech.com` डोमेन को अपने Next.js प्रोजेक्ट (जैसे Vercel या Hostinger Node app) से कनेक्ट कर दें।
     * अब जब भी कोई यूजर `blog.maajankiwebtech.com` खोलेगा, उसे आपका सुपर-फास्ट Next.js ब्लॉग दिखेगा, जो पीछे बैकग्राउंड में `cms.maajankiwebtech.com` से डेटा फेच करेगा।

