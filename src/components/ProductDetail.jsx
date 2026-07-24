import { ChevronLeft, Heart, Minus, Plus, Ruler, ShieldCheck, Truck } from 'lucide-react'
import { useState } from 'react'
import { formatPrice } from '../data/store'
import ProductCard from './ProductCard'

function ProductDetail({ product, products, favorite, favorites, onFavorite, onBack, onAdd, onOpen }) {
  const [image, setImage] = useState(0)
  const [color, setColor] = useState(product.colors[0])
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')

  const add = () => {
    if (!product.noSize && !size) { setError('Elegí un talle antes de agregar la prenda.'); return }
    onAdd(product, { color, size: size || 'Único', quantity })
  }

  return (
    <main className="product-page">
      <button className="back-link" type="button" onClick={onBack}><ChevronLeft size={18} /> Volver a la colección</button>
      <div className="product-detail">
        <div className="gallery">
          <div className="thumbnails">{product.images.map((src, index) => <button className={index === image ? 'is-active' : ''} key={src} type="button" onClick={() => setImage(index)}><img src={src} alt={`Vista ${index + 1} de ${product.name}`} /></button>)}</div>
          <img className="main-product-image" src={product.images[image]} alt={`${product.name}, vista ${image + 1}`} />
        </div>
        <section className="product-details-copy">
          <span className="eyebrow">{product.category} · {product.type}</span>
          <div className="detail-title"><h1>{product.name}</h1><button className={`icon-button ${favorite ? 'is-active' : ''}`} type="button" onClick={() => onFavorite(product.id)} aria-label="Agregar a favoritos"><Heart fill={favorite ? 'currentColor' : 'none'} /></button></div>
          <div className="detail-price"><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div>
          <p className="detail-description">{product.description}</p>
          <fieldset><legend>Color: <strong>{color}</strong></legend><div className="swatches">{product.colors.map((name, index) => <button className={name === color ? 'is-active' : ''} style={{ '--swatch': product.colorHex[index] }} key={name} type="button" onClick={() => setColor(name)} aria-label={`Color ${name}`} />)}</div></fieldset>
          {!product.noSize && <fieldset><div className="size-heading"><legend>Talle</legend><button className="text-link" type="button" onClick={() => window.alert('Guía de talles: XS 34 · S 36 · M 38/40 · L 42 · XL 44')}><Ruler size={16} /> Guía de talles</button></div><div className="sizes">{product.sizes.map((value) => <button className={value === size ? 'is-active' : ''} key={value} type="button" onClick={() => { setSize(value); setError('') }}>{value}</button>)}</div></fieldset>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="buy-row"><div className="quantity-control large"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Restar cantidad"><Minus /></button><span>{quantity}</span><button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Sumar cantidad"><Plus /></button></div><button className="button primary full" type="button" onClick={add} disabled={!product.available}>{product.available ? 'Agregar al carrito' : 'Producto sin stock'}</button></div>
          <div className="purchase-info"><p><Truck /> Envíos a todo el país</p><p><ShieldCheck /> Cambios simples dentro de los 30 días</p></div>
        </section>
      </div>
      <section className="section related"><div className="section-heading"><span className="eyebrow">También puede gustarte</span><h2>Productos relacionados</h2></div><div className="product-grid">{products.filter((p) => p.id !== product.id && (p.category === product.category || p.type === product.type)).slice(0, 4).map((item) => <ProductCard key={item.id} product={item} favorite={favorites.includes(item.id)} onFavorite={onFavorite} onOpen={onOpen} onQuickAdd={(p) => onAdd(p)} />)}</div></section>
    </main>
  )
}

export default ProductDetail
