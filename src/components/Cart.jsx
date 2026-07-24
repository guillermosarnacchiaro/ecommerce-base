import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { formatPrice, store } from '../data/store'

function Cart({ open, items, onClose, onRemove, onQuantity, onShop }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal === 0 || subtotal >= store.freeShippingFrom ? 0 : store.shippingCost

  return (
    <>
      <button className={`drawer-backdrop ${open ? 'is-open' : ''}`} type="button" onClick={onClose} aria-label="Cerrar carrito" tabIndex={open ? 0 : -1} />
      <aside className={`cart-drawer ${open ? 'is-open' : ''}`} aria-label="Carrito de compras" aria-hidden={!open}>
        <div className="drawer-header">
          <div><span className="eyebrow">Tu selección</span><h2>Carrito ({items.reduce((n, item) => n + item.quantity, 0)})</h2></div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Cerrar carrito"><X /></button>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={42} strokeWidth={1.2} />
            <h3>Tu carrito está vacío</h3>
            <p>Descubrí piezas pensadas para acompañarte todos los días.</p>
            <button className="button primary" type="button" onClick={onShop}>Ver colección</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={`${item.id}-${item.size}-${item.color}`}>
                  <img src={item.images[0]} alt="" />
                  <div className="cart-item-copy">
                    <div><h3>{item.name}</h3><p>{item.color} · Talle {item.size}</p></div>
                    <div className="cart-item-bottom">
                      <div className="quantity-control">
                        <button type="button" onClick={() => onQuantity(item, -1)} aria-label="Restar una unidad"><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => onQuantity(item, 1)} aria-label="Sumar una unidad"><Plus size={14} /></button>
                      </div>
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </div>
                  </div>
                  <button className="remove-item" type="button" onClick={() => onRemove(item)} aria-label={`Eliminar ${item.name}`}><Trash2 size={16} /></button>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div><span>Envío estimado</span><strong>{shipping ? formatPrice(shipping) : 'Gratis'}</strong></div>
              {subtotal < store.freeShippingFrom && <p>Te faltan {formatPrice(store.freeShippingFrom - subtotal)} para obtener envío gratis.</p>}
              <div className="cart-total"><span>Total</span><strong>{formatPrice(subtotal + shipping)}</strong></div>
              <button className="button primary full" type="button" onClick={() => window.alert('Checkout de demostración: conectá aquí tu pasarela de pago.')}>Iniciar compra</button>
              <button className="text-link centered" type="button" onClick={onClose}>Continuar comprando</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default Cart
