# Tariff Adapters

This directory is prepared for future API integrations.

## Migration path

When live tariff APIs become available:

1. Create `acm.js` — adapter for ACM (Autoriteit Consument & Markt) energy data
2. Create `tibber.js` — adapter for Tibber real-time energy prices  
3. Update `../index.js`: choose adapter based on `import.meta.env.VITE_TARIFF_ADAPTER`
4. Cache results in Supabase for performance

No UI changes needed — all components use the public API in `../index.js`.

## Available APIs (for later)

- ACM Consuwijzer: https://www.consuwijzer.nl/
- Tibber: https://developer.tibber.com/
- Independer data feed (via affiliate partnership)
