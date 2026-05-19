import { getCollection } from 'astro:content'

const BASE = 'https://paulvanraak.github.io/bespaarcheck'

const STATIC_PAGES = [
  { url: '/',             priority: 1.0, changefreq: 'weekly'  },
  { url: '/check/',       priority: 0.9, changefreq: 'monthly' },
  { url: '/vergelijk/bankrekening/', priority: 0.8, changefreq: 'weekly' },
  { url: '/vergelijk/vpn-hosting/',  priority: 0.8, changefreq: 'weekly' },
  { url: '/blog/',        priority: 0.8, changefreq: 'daily'   },
  { url: '/methode/',     priority: 0.5, changefreq: 'monthly' },
  { url: '/privacy/',     priority: 0.3, changefreq: 'yearly'  },
  { url: '/voorwaarden/', priority: 0.3, changefreq: 'yearly'  },
]

export async function GET() {
  const posts = await getCollection('blog')
  const today = new Date().toISOString().split('T')[0]

  const blogUrls = posts.map(p => ({
    url: `/blog/${p.slug}/`,
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: p.data.pubDate.toISOString().split('T')[0],
  }))

  const allUrls = [...STATIC_PAGES, ...blogUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(p => `  <url>
    <loc>${BASE}${p.url}</loc>
    <lastmod>${p.lastmod ?? today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
