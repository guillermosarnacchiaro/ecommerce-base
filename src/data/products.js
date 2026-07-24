const products = [
  {
    id: 1, name: 'Blazer Aura', category: 'Mujer', type: 'Camperas', price: 118000,
    oldPrice: 147500, badge: '20% OFF', featured: true, newest: true, available: true,
    description: 'Blazer sastrero de calce relajado, confeccionado en twill con caída suave y forrería al tono.',
    colors: ['Taupe', 'Negro'], colorHex: ['#B8AB9D', '#171717'], sizes: ['XS', 'S', 'M', 'L'],
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=85', 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=85'],
  },
  {
    id: 2, name: 'Vestido Alba', category: 'Mujer', type: 'Vestidos', price: 89500,
    badge: 'Nuevo', featured: true, newest: true, available: true,
    description: 'Vestido midi de líneas puras y movimiento fluido, con escote delicado y terminaciones artesanales.',
    colors: ['Marfil', 'Negro'], colorHex: ['#E8E1D6', '#171717'], sizes: ['XS', 'S', 'M', 'L'],
    images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85'],
  },
  {
    id: 3, name: 'Camisa Nube', category: 'Mujer', type: 'Camisas', price: 62900,
    badge: 'Últimas unidades', featured: false, newest: true, available: true,
    description: 'Camisa amplia de poplín premium, hombro levemente caído y botones de nácar.',
    colors: ['Blanco', 'Celeste'], colorHex: ['#F5F5F2', '#B8C9D0'], sizes: ['S', 'M', 'L'],
    images: ['https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=1000&q=85', 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=85'],
  },
  {
    id: 4, name: 'Pantalón Sienna', category: 'Mujer', type: 'Pantalones', price: 74500,
    featured: true, newest: false, available: true,
    description: 'Pantalón de tiro alto y pierna recta, pensado para acompañar looks cotidianos y formales.',
    colors: ['Arena', 'Negro'], colorHex: ['#C6B7A4', '#171717'], sizes: ['36', '38', '40', '42', '44'],
    images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85', 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=85'],
  },
  {
    id: 5, name: 'Remera Esencial', category: 'Hombre', type: 'Remeras', price: 38900,
    badge: 'Nuevo', featured: true, newest: true, available: true,
    description: 'Remera de jersey de algodón peinado, corte regular y cuello reforzado.',
    colors: ['Marfil', 'Negro', 'Oliva'], colorHex: ['#EEE9DF', '#171717', '#656956'], sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85', 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=1000&q=85'],
  },
  {
    id: 6, name: 'Buzo Origen', category: 'Hombre', type: 'Buzos', price: 78200,
    featured: false, newest: false, available: true,
    description: 'Buzo de algodón pesado con interior suave, silueta relajada y detalles minimalistas.',
    colors: ['Gris', 'Negro'], colorHex: ['#A8A6A2', '#171717'], sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85', 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=85'],
  },
  {
    id: 7, name: 'Campera Norte', category: 'Hombre', type: 'Camperas', price: 135000,
    badge: 'Últimas unidades', featured: true, newest: false, available: true,
    description: 'Campera urbana liviana, resistente al viento, con bolsillos amplios y herrajes mate.',
    colors: ['Negro', 'Piedra'], colorHex: ['#171717', '#AAA49A'], sizes: ['M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85', 'https://images.unsplash.com/photo-1592878849122-facb97520f9e?auto=format&fit=crop&w=1000&q=85'],
  },
  {
    id: 8, name: 'Bolso Terracota', category: 'Accesorios', type: 'Accesorios', price: 68500,
    featured: true, newest: true, available: true, noSize: true,
    description: 'Bolso de formato estructurado con textura natural, correa regulable y cierre metálico.',
    colors: ['Suela', 'Negro'], colorHex: ['#9B6748', '#171717'], sizes: ['Único'],
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85', 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85'],
  },
  {
    id: 9, name: 'Cinturón Línea', category: 'Accesorios', type: 'Accesorios', price: 32900,
    oldPrice: 41100, badge: '20% OFF', featured: false, newest: false, available: true,
    description: 'Cinturón de cuero vacuno con hebilla geométrica de acabado níquel mate.',
    colors: ['Negro', 'Suela'], colorHex: ['#171717', '#9B6748'], sizes: ['80', '90', '100'],
    images: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=85', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85'],
  },
  {
    id: 10, name: 'Camisa Lino', category: 'Hombre', type: 'Camisas', price: 71900,
    featured: true, newest: true, available: false,
    description: 'Camisa de lino de corte clásico, fresca y liviana, con terminación suavizada.',
    colors: ['Natural', 'Negro'], colorHex: ['#D8CDBD', '#171717'], sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=85', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=85'],
  },
]

export default products
