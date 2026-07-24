import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { navigation, store } from '../data/store'

function Header({ cartCount, favoriteCount, menuOpen, setMenuOpen, onNavigate, onSearch, searchOpen, setSearchOpen }) {
  return (
    <>
      <div className="announcement">{store.announcement}</div>
      <header className="site-header">
        <button className="icon-button mobile-only" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <button className="logo" type="button" onClick={() => onNavigate('home')}>{store.name}</button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegación principal">
          {navigation.map((item) => <button type="button" key={item} onClick={() => { onNavigate('catalog', item); setMenuOpen(false) }}>{item}</button>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" onClick={() => setSearchOpen(!searchOpen)} aria-label="Buscar"><Search /></button>
          <button className="icon-button desktop-icon" type="button" onClick={() => window.alert('Acceso a cuenta disponible próximamente.')} aria-label="Mi cuenta"><UserRound /></button>
          <button className="icon-button desktop-icon counter-button" type="button" onClick={() => onNavigate('catalog')} aria-label={`${favoriteCount} favoritos`}><Heart /><span>{favoriteCount}</span></button>
          <button className="icon-button counter-button" type="button" onClick={() => onNavigate('cart')} aria-label={`Abrir carrito con ${cartCount} productos`}><ShoppingBag /><span>{cartCount}</span></button>
        </div>
        <div className={`header-search ${searchOpen ? 'is-open' : ''}`}>
          <Search size={18} />
          <input autoFocus={searchOpen} type="search" placeholder="¿Qué estás buscando?" aria-label="Buscar productos" onChange={(event) => onSearch(event.target.value)} />
          <button className="icon-button" type="button" onClick={() => setSearchOpen(false)} aria-label="Cerrar buscador"><X /></button>
        </div>
      </header>
    </>
  )
}

export default Header
