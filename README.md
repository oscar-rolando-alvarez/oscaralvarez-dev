# oscar-alvarez.dev

Sitio personal de **Oscar Rolando Alvarez Cardenas** — Principal AI Systems Architect.
Bilingüe (Español / English), con efectos visuales modernos y desplegable en Vercel.

> Personal website for Oscar Rolando Alvarez Cardenas — Principal AI Systems Architect.
> Bilingual (Spanish / English) with modern visual effects, deployable to Vercel.

---

## ✨ Stack

- **Next.js 15** (App Router, React 19)
- **TypeScript** estricto
- **Tailwind CSS** + sistema de diseño con tokens HSL
- **Framer Motion** — animaciones, scroll, parallax y tilt 3D
- **next-intl** — i18n con rutas `/es` y `/en`
- **Lucide React** — iconografía
- Optimizado para **Vercel Edge** (sin estado, sin DB)

## 🌐 Idiomas

| Locale | Ruta |
|--------|------|
| Español (default) | `/es` |
| English | `/en` |

El switcher de idioma vive en el navbar y conserva la sección actual.

## 🎨 Efectos visuales

- Mesh gradient animado + grid pattern + cursor glow.
- Hero con scroll parallax + texto con gradient shifting.
- Tarjetas de productos con tilt 3D reactivo al cursor.
- Botones con shimmer y magnetic hover.
- Marquee de keywords y barra de progreso de scroll.
- Modo oscuro por defecto con toggle a claro.

## 📦 Estructura

```
app/
  [locale]/
    layout.tsx     # NextIntlProvider, Theme, Navbar, Footer, ScrollProgress
    page.tsx       # Hero · Stats · Marquee · About · Experience · Stack · Products · Education · Contact
  globals.css
components/        # Hero, Products, Experience, ... + UI primitives
i18n/request.ts    # next-intl config (es default + en)
lib/
  data.ts          # CV (experiencias, stats, core competencies, contacto)
  products.ts      # Catálogo Arkis Group
messages/
  es.json
  en.json
```

## 🚀 Desarrollo local

```bash
npm install
npm run dev
# http://localhost:3000  →  redirige a /es
```

## ☁️ Deploy en Vercel

1. **Importar repo:** Vercel → New Project → importar `oscar-rolando-alvarez/oscaralvarez-dev`.
2. Framework: **Next.js** (auto-detectado).
3. Build command: `npm run build` · Output: `.next` (defaults).
4. Variables de entorno: **ninguna requerida**.
5. Click **Deploy**.

CLI alternativo:

```bash
npm i -g vercel
vercel link
vercel --prod
```

## 📝 Licencia

MIT — el código es libre. El contenido (textos del CV, productos, marca personal) pertenece a Oscar Rolando Alvarez.

---

**Contacto:** [oralvarez@gmail.com](mailto:oralvarez@gmail.com) · [arkisgroup.co](https://arkisgroup.co) · Bogotá, Colombia
