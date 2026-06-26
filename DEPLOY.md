# Deploy & Secrets — historische-schuhe.de

Repo: https://github.com/strkmrktnghdlbrg/historische-schuhe.de (privat)
Build: `npm run build` -> Output-Ordner `dist/` (statisch). Astro 5 + Tailwind 4.

---

## 1. Hosting: Cloudflare Pages (empfohlen, "Push = Deploy")

### Variante A — Git-Integration im Dashboard (am einfachsten, KEINE Secrets)
1. Cloudflare Dashboard -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
2. Repository **strkmrktnghdlbrg/historische-schuhe.de** auswaehlen.
3. Build-Einstellungen:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. **Save and Deploy**. Ab jetzt deployt jeder `git push` auf `main` automatisch.
5. **Custom Domain**: im Pages-Projekt -> **Custom domains** -> `historische-schuhe.de` und `www.historische-schuhe.de` hinzufuegen. Fuer **www -> non-www** eine Redirect-Rule anlegen (Rules -> Redirect Rules: `www.historische-schuhe.de/*` -> `https://historische-schuhe.de/$1`, 301).

> Die Datei `public/_redirects` (alte `/thema/`-Kategorien -> neue Hubs) wird von Cloudflare Pages automatisch angewandt.

### Variante B — Deploy ueber GitHub Actions (Token-basiert)
Workflow `.github/workflows/deploy-cloudflare.yml` ist vorbereitet. Dafuer:
1. In Cloudflare einen **API-Token** erstellen (Permissions: `Account > Cloudflare Pages > Edit`).
2. Account-ID aus dem Cloudflare-Dashboard kopieren.
3. Als Repo-Secrets setzen:
   ```bash
   gh secret set CLOUDFLARE_API_TOKEN  --body "<dein-token>"
   gh secret set CLOUDFLARE_ACCOUNT_ID --body "<deine-account-id>"
   ```
4. Im Workflow den `push:`-Trigger einkommentieren.

(Netlify ginge analog: `New site from Git`, Build `npm run build`, Publish `dist`.)

---

## 2. Amazon-Secrets fuer den woechentlichen Produkt-Refresh

Der Workflow `.github/workflows/amazon-refresh.yml` braucht 3 Repo-Secrets.
Die Werte liegen lokal in `.secrets/amazon-paapi-historische-schuhe.env`.

**Einmal ausfuehren** (liest die Keys aus der lokalen .secrets-Datei, du tippst nichts ab):
```bash
bash "Affiliate projects/historische-schuhe.de/scripts/set-github-secrets.sh"
```

Danach Test: `gh workflow run "Amazon-Produktdaten aktualisieren" -R strkmrktnghdlbrg/historische-schuhe.de`

---

## Sicherheit
- Keys liegen ausschliesslich in `.secrets/` (chmod 600, ausserhalb Git) und als verschluesselte GitHub/Cloudflare-Secrets.
- Es sind KEINE Keys im Repo (gepruft). `.gitignore` blockt `*.env` und `.secrets/`.
