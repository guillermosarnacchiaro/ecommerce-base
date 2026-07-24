import { CreditCard, Mail, RefreshCw, Share2, ShieldCheck, Truck } from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'
import Cart from './components/Cart'
import Catalog from './components/Catalog'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import ProductDetail from './components/ProductDetail'
import products from './data/products'
import { benefits, categories, footerLinks, socialLinks, store } from './data/store'

const benefitIcons = { Truck, RefreshCw, ShieldCheck, CreditCard }

function readLocal(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

function App() {
  const [view, setView] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState(() => readLocal('luma-cart', []))
  const [favorites, setFavorites] = useState(() => readLocal('luma-favorites', []))
  const [newsletter, setNewsletter] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => localStorage.setItem('luma-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('luma-favorites', JSON.stringify(favorites)), [favorites])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [view, selectedProduct])

  const navigate = (nextView, nextCategory = '') => {
    if (nextView === 'cart') { setCartOpen(true); return }
    setCategory(nextCategory); setView(nextView); setSelectedProduct(null)
  }
  const openProduct = (product) => { setSelectedProduct(product); setView('product') }
  const toggleFavorite = (id) => setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  const addToCart = (product, selection = {}) => {
    const size = selection.size || (product.noSize ? 'Único' : product.sizes[0])
    const color = selection.color || product.colors[0]
    const quantity = selection.quantity || 1
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id && item.size === size && item.color === color)
      return existing
        ? items.map((item) => item === existing ? { ...item, quantity: item.quantity + quantity } : item)
        : [...items, { ...product, size, color, quantity }]
    })
    setCartOpen(true)
  }
  const updateQuantity = (target, amount) => setCart((items) => items.map((item) => item.id === target.id && item.size === target.size && item.color === target.color ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0))
  const removeItem = (target) => setCart((items) => items.filter((item) => !(item.id === target.id && item.size === target.size && item.color === target.color)))

  return (
    <>
      <Header cartCount={cart.reduce((n, item) => n + item.quantity, 0)} favoriteCount={favorites.length} menuOpen={menuOpen} setMenuOpen={setMenuOpen} onNavigate={navigate} onSearch={(value) => { setSearch(value); setView('catalog') }} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      {view === 'home' && <Home favorites={favorites} onFavorite={toggleFavorite} onOpen={openProduct} onAdd={addToCart} onNavigate={navigate} newsletter={newsletter} setNewsletter={setNewsletter} subscribed={subscribed} onSubscribe={(event) => { event.preventDefault(); setSubscribed(true) }} />}
      {view === 'catalog' && <Catalog products={products} search={search} initialCategory={category} favorites={favorites} onFavorite={toggleFavorite} onOpen={openProduct} onQuickAdd={addToCart} />}
      {view === 'product' && selectedProduct && <ProductDetail product={selectedProduct} products={products} favorite={favorites.includes(selectedProduct.id)} favorites={favorites} onFavorite={toggleFavorite} onBack={() => navigate('catalog')} onAdd={addToCart} onOpen={openProduct} />}
      <Footer onNavigate={navigate} />
      <Cart open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={removeItem} onQuantity={updateQuantity} onShop={() => { setCartOpen(false); navigate('catalog') }} />
    </>
  )
}

function Home({ favorites, onFavorite, onOpen, onAdd, onNavigate, newsletter, setNewsletter, subscribed, onSubscribe }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy"><span className="eyebrow">{store.hero.eyebrow}</span><h1>{store.hero.title}</h1><p>{store.hero.description}</p><div className="hero-actions"><button className="button primary" type="button" onClick={() => onNavigate('catalog')}>Ver colección</button><button className="text-link" type="button" onClick={() => onNavigate('catalog', 'Novedades')}>Descubrir novedades</button></div></div>
        <div className="hero-image"><img src={store.hero.image} alt="Modelo con blazer taupe y pantalón negro de la nueva colección LUMA" /><span>Edición<br />01—26</span></div>
      </section>
      <section className="section category-section"><div className="section-heading split"><div><span className="eyebrow">Explorá tu estilo</span><h2>Categorías destacadas</h2></div><button className="text-link" type="button" onClick={() => onNavigate('catalog')}>Ver todo</button></div><div className="category-grid">{categories.map((item) => <button className="category-card" type="button" key={item.name} onClick={() => onNavigate('catalog', item.name === 'Nueva colección' ? 'Novedades' : item.name)}><img src={item.image} alt="" /><span>{item.name}</span></button>)}</div></section>
      <ProductSection eyebrow="Recién llegados" title="Novedades" items={products.filter((p) => p.newest).slice(0, 4)} {...{ favorites, onFavorite, onOpen, onAdd }} onAll={() => onNavigate('catalog', 'Novedades')} />
      <section className="editorial-banner"><div><span className="eyebrow">Campaña invierno</span><h2>La forma de lo esencial</h2><p>Texturas nobles, siluetas precisas y una paleta que trasciende temporadas.</p><button className="button light" type="button" onClick={() => onNavigate('catalog')}>Descubrir colección</button></div></section>
      <ProductSection eyebrow="Favoritos de la comunidad" title="Más elegidos" items={products.filter((p) => p.featured).slice(0, 4)} {...{ favorites, onFavorite, onOpen, onAdd }} onAll={() => onNavigate('catalog')} />
      <section className="benefits">{benefits.map((item) => { const Icon = benefitIcons[item.icon]; return <article key={item.title}><Icon /><h3>{item.title}</h3><p>{item.text}</p></article> })}</section>
      <section className="newsletter"><div><span className="eyebrow">La carta de LUMA</span><h2>Historias, novedades y piezas elegidas.</h2><p>Suscribite para recibir lanzamientos y beneficios exclusivos.</p></div>{subscribed ? <p className="success-message">Gracias por sumarte. Pronto vas a recibir novedades.</p> : <form onSubmit={onSubscribe}><Mail size={19} /><input required type="email" value={newsletter} onChange={(e) => setNewsletter(e.target.value)} placeholder="Tu email" aria-label="Correo electrónico" /><button type="submit">Suscribirme</button></form>}</section>
    </main>
  )
}

function ProductSection({ eyebrow, title, items, favorites, onFavorite, onOpen, onAdd, onAll }) {
  return <section className="section"><div className="section-heading split"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><button className="text-link" type="button" onClick={onAll}>Ver todo</button></div><div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onFavorite={onFavorite} onOpen={onOpen} onQuickAdd={onAdd} />)}</div></section>
}

function Footer({ onNavigate }) {
  return <footer><div className="footer-main"><div className="footer-brand"><button className="logo" type="button" onClick={() => onNavigate('home')}>{store.name}</button><p>Indumentaria contemporánea pensada para durar más allá de una temporada.</p><div className="socials">{socialLinks.map((item) => <a key={item.name} href={item.url} target="_blank" rel="noreferrer" aria-label={item.name}><Share2 size={18} /></a>)}</div></div>{Object.entries(footerLinks).map(([heading, links]) => <div className="footer-column" key={heading}><h3>{heading}</h3>{links.map((link) => <button type="button" key={link} onClick={() => onNavigate('catalog')}>{link}</button>)}</div>)}</div><div className="footer-bottom"><span>© {new Date().getFullYear()} {store.name}. Todos los derechos reservados.</span><span>Visa · Mastercard · Mercado Pago</span></div></footer>
}

export default App
