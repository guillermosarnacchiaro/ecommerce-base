import { Heart, Plus } from 'lucide-react'
import { formatPrice } from '../data/store'

function ProductCard({ product, favorite, onFavorite, onOpen, onQuickAdd }) {
  return (
    <article className="product-card">
      <div className="product-media">
        <button className="product-image-button" type="button" onClick={() => onOpen(product)} aria-label={`Ver ${product.name}`}>
          <img src={product.images[0]} alt={`${product.name} en color ${product.colors[0]}`} loading="lazy" />
        </button>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={`icon-button favorite ${favorite ? 'is-active' : ''}`} type="button" onClick={() => onFavorite(product.id)} aria-label={favorite ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}>
          <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
        </button>
        <button className="quick-add" type="button" onClick={() => onQuickAdd(product)} disabled={!product.available}>
          <Plus size={17} /> {product.available ? 'Agregar' : 'Sin stock'}
        </button>
      </div>
      <button className="product-copy" type="button" onClick={() => onOpen(product)}>
        <span>{product.type}</span>
        <h3>{product.name}</h3>
        <div className="price-line">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
        </div>
      </button>
    </article>
  )
}

export default ProductCard
