# LUMA — ecommerce de indumentaria

Tienda editorial construida con React 19 y Vite. Incluye inicio, catálogo con filtros,
detalle de producto, favoritos y carrito persistente.

## Iniciar el proyecto

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Personalización

- `src/data/store.js`: nombre, anuncio, textos, imagen principal, moneda, envío,
  categorías, beneficios, navegación, footer y redes.
- `src/data/products.js`: catálogo, precios, descuentos, stock, talles, colores e imágenes.
- `src/index.css`: tipografías y variables globales de color.
- `src/assets/luma-hero.png`: fotografía principal de campaña.

Las imágenes de producto de demostración utilizan URLs externas. Para una tienda real,
se recomienda descargarlas o reemplazarlas por fotografías propias dentro de `src/assets`.
