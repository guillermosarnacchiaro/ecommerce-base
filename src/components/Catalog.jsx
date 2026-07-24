import { SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'

function Catalog({ products, search, initialCategory, favorites, onFavorite, onOpen, onQuickAdd }) {
  const [category, setCategory] = useState(initialCategory || 'Todos')
  const [size, setSize] = useState('Todos')
  const [color, setColor] = useState('Todos')
  const [price, setPrice] = useState('Todos')
  const [availability, setAvailability] = useState(false)
  const [sort, setSort] = useState('newest')
  const [visible, setVisible] = useState(8)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    setCategory(initialCategory || 'Todos')
    setVisible(8)
  }, [initialCategory])

  const options = (key) => ['Todos', ...new Set(products.flatMap((p) => Array.isArray(p[key]) ? p[key] : [p[key]]))]
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return products
      .filter((p) => !query || `${p.name} ${p.type} ${p.category}`.toLowerCase().includes(query))
      .filter((p) => category === 'Todos' || p.category === category || (category === 'Novedades' && p.newest) || (category === 'Sale' && p.oldPrice))
      .filter((p) => size === 'Todos' || p.sizes.includes(size))
      .filter((p) => color === 'Todos' || p.colors.includes(color))
      .filter((p) => price === 'Todos' || (price === 'Hasta $60.000' ? p.price <= 60000 : price === '$60.000 a $100.000' ? p.price > 60000 && p.price <= 100000 : p.price > 100000))
      .filter((p) => !availability || p.available)
      .sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : sort === 'featured' ? Number(b.featured) - Number(a.featured) : Number(b.newest) - Number(a.newest))
  }, [products, search, category, size, color, price, availability, sort])

  const clear = () => { setCategory('Todos'); setSize('Todos'); setColor('Todos'); setPrice('Todos'); setAvailability(false) }

  return (
    <main className="catalog-page">
      <div className="catalog-heading">
        <div><span className="eyebrow">Colección actual</span><h1>Vestir lo cotidiano</h1><p>Piezas esenciales con una mirada contemporánea.</p></div>
        <button className="button outline filter-toggle" type="button" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={17} /> Filtros</button>
      </div>
      <div className="catalog-layout">
        <aside className={`filters ${filtersOpen ? 'is-open' : ''}`}>
          <div className="filters-title"><h2>Filtrar por</h2><button className="icon-button filter-close" type="button" onClick={() => setFiltersOpen(false)} aria-label="Cerrar filtros"><X /></button></div>
          <Filter label="Categoría" value={category} onChange={setCategory} options={['Todos', 'Mujer', 'Hombre', 'Accesorios', 'Novedades', 'Sale']} />
          <Filter label="Talle" value={size} onChange={setSize} options={options('sizes')} />
          <Filter label="Color" value={color} onChange={setColor} options={options('colors')} />
          <Filter label="Precio" value={price} onChange={setPrice} options={['Todos', 'Hasta $60.000', '$60.000 a $100.000', 'Más de $100.000']} />
          <label className="check-row"><input type="checkbox" checked={availability} onChange={(e) => setAvailability(e.target.checked)} /> Solo disponibles</label>
          <button className="text-link" type="button" onClick={clear}>Limpiar filtros</button>
        </aside>
        <section className="catalog-results" aria-live="polite">
          <div className="results-toolbar"><span>{filtered.length} productos</span><label>Ordenar por <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Novedades</option><option value="featured">Destacados</option><option value="price-low">Menor precio</option><option value="price-high">Mayor precio</option></select></label></div>
          {filtered.length ? (
            <>
              <div className="product-grid">{filtered.slice(0, visible).map((product) => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onFavorite={onFavorite} onOpen={onOpen} onQuickAdd={onQuickAdd} />)}</div>
              {visible < filtered.length && <button className="button outline load-more" type="button" onClick={() => setVisible((n) => n + 4)}>Cargar más</button>}
            </>
          ) : <div className="no-results"><h2>No encontramos resultados</h2><p>Probá cambiando o limpiando los filtros.</p><button className="button primary" type="button" onClick={clear}>Limpiar filtros</button></div>}
        </section>
      </div>
    </main>
  )
}

function Filter({ label, value, onChange, options }) {
  return <label className="filter-field"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
}

export default Catalog
