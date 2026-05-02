<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  exclude-result-prefixes="atom">

  <xsl:output method="html" version="5" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="fr">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title><xsl:value-of select="/rss/channel/title"/></title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&amp;family=Lato:wght@400;600;700&amp;display=swap" rel="stylesheet"/>
        <style>
          :root {
            --blue-dark:   #2C5F7A;
            --blue-mid:    #4A8FA8;
            --blue-light:  #A8CBDA;
            --blue-pale:   #D9ECF4;
            --orange:      #D4883A;
            --orange-light:#F0C88A;
            --sand-pale:   #F7F0E6;
            --white:       #FDFAF6;
            --text-dark:   #2E3A45;
            --text-mid:    #4A5F6A;
            --font-serif:  'Playfair Display', Georgia, serif;
            --font-sans:   'Lato', 'Helvetica Neue', Arial, sans-serif;
            --radius:      0.75rem;
          }
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { font-size: 16px; }
          body {
            background: var(--sand-pale);
            color: var(--text-dark);
            font-family: var(--font-sans);
            line-height: 1.7;
          }
          a { color: var(--blue-mid); text-decoration: none; }
          a:hover { color: var(--blue-dark); text-decoration: underline; }

          /* ── En-tête ── */
          .rss-header {
            background: var(--blue-dark);
            color: var(--white);
            padding: 3rem 2rem 2.5rem;
            text-align: center;
          }
          .rss-header-inner { max-width: 680px; margin: 0 auto; }
          .rss-label {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            background: rgba(255,255,255,0.12);
            color: var(--orange-light);
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            padding: 0.3rem 0.75rem;
            border-radius: 999px;
            margin-bottom: 1.2rem;
          }
          .rss-label svg { width: 12px; height: 12px; flex-shrink: 0; }
          .rss-header h1 {
            font-family: var(--font-serif);
            font-size: 1.9rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            line-height: 1.2;
          }
          .rss-header p {
            color: var(--blue-pale);
            font-size: 0.95rem;
            opacity: 0.85;
            margin-bottom: 1.5rem;
          }
          .rss-back-link {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.55rem 1.3rem;
            background: var(--orange);
            color: var(--white);
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 700;
            text-decoration: none;
            transition: background 0.2s;
          }
          .rss-back-link:hover { background: var(--blue-mid); color: var(--white); text-decoration: none; }
          .rss-back-link svg { width: 14px; height: 14px; }

          /* ── Corps ── */
          .rss-main {
            max-width: 760px;
            margin: 0 auto;
            padding: 2.5rem 1.5rem 4rem;
          }
          .rss-intro {
            font-size: 0.82rem;
            color: var(--text-mid);
            margin-bottom: 2rem;
            opacity: 0.8;
          }

          /* ── Article ── */
          .rss-item {
            background: var(--white);
            border-radius: var(--radius);
            padding: 1.5rem 1.6rem;
            margin-bottom: 1.25rem;
            box-shadow: 0 2px 14px rgba(44,95,122,0.08);
            border-left: 4px solid var(--orange);
          }
          .rss-item h2 {
            font-family: var(--font-serif);
            font-size: 1.2rem;
            color: var(--blue-dark);
            margin-bottom: 0.3rem;
            line-height: 1.3;
          }
          .rss-item h2 a { color: inherit; text-decoration: none; }
          .rss-item h2 a:hover { color: var(--orange); text-decoration: underline; }
          .rss-item-date {
            font-size: 0.77rem;
            color: var(--blue-mid);
            margin-bottom: 0.9rem;
          }
          .rss-item-desc { font-size: 0.9rem; color: var(--text-dark); }
          .rss-item-desc p { margin-bottom: 0.5rem; }

          /* ── Pied de page ── */
          .rss-footer {
            text-align: center;
            padding: 2rem;
            font-size: 0.8rem;
            color: var(--text-mid);
            opacity: 0.7;
            border-top: 1px solid var(--blue-light);
          }

          @media (max-width: 600px) {
            .rss-header { padding: 2rem 1.2rem 1.8rem; }
            .rss-header h1 { font-size: 1.4rem; }
            .rss-main { padding: 1.5rem 1rem 3rem; }
          }
        </style>
      </head>
      <body>
        <header class="rss-header">
          <div class="rss-header-inner">
            <span class="rss-label">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="6.5" cy="17.5" r="2.5"/>
                <path d="M4 4a1 1 0 0 1 0 2C10.627 6 16 11.373 16 18a1 1 0 0 1-2 0C14 12.477 9.523 8 4 8a1 1 0 0 1 0-2z"/>
                <path d="M4 10a1 1 0 0 1 0 2c3.314 0 6 2.686 6 6a1 1 0 0 1-2 0c0-2.21-1.79-4-4-4a1 1 0 0 1 0-2z"/>
              </svg>
              Flux RSS
            </span>
            <h1><xsl:value-of select="/rss/channel/title"/></h1>
            <p><xsl:value-of select="/rss/channel/description"/></p>
            <a href="{/rss/channel/link}" class="rss-back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15,18 9,12 15,6"/></svg>
              Retour au site
            </a>
          </div>
        </header>
        <main class="rss-main">
          <p class="rss-intro">
            <xsl:value-of select="count(/rss/channel/item)"/> actualité(s) publiée(s) — abonnez-vous à ce flux dans votre lecteur RSS favori.
          </p>
          <xsl:for-each select="/rss/channel/item">
            <article class="rss-item">
              <h2>
                <a href="{link}"><xsl:value-of select="title"/></a>
              </h2>
              <p class="rss-item-date"><xsl:value-of select="pubDate"/></p>
              <div class="rss-item-desc">
                <xsl:value-of select="description" disable-output-escaping="yes"/>
              </div>
            </article>
          </xsl:for-each>
        </main>
        <footer class="rss-footer">
          <p>© Théo &amp; Léa Micro-crèche — Flux RSS 2.0</p>
        </footer>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
