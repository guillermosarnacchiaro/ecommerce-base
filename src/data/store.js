import heroImage from '../assets/luma-hero.png'

export const store = {
  name: 'LUMA',
  announcement: 'Envíos a todo el país · 3 cuotas sin interés',
  locale: 'es-AR',
  currency: 'ARS',
  freeShippingFrom: 120000,
  shippingCost: 8500,
  contactEmail: 'hola@luma.com.ar',
  hero: {
    eyebrow: 'Nueva colección',
    title: 'Prendas que hablan por vos',
    description:
      'Diseños contemporáneos, materiales seleccionados y una estética pensada para acompañarte todos los días.',
    image: heroImage,
  },
}

export const navigation = ['Mujer', 'Hombre', 'Novedades', 'Sale']

export const categories = [
  { name: 'Mujer', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85' },
  { name: 'Hombre', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85' },
  { name: 'Accesorios', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85' },
  { name: 'Nueva colección', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85' },
]

export const benefits = [
  { icon: 'Truck', title: 'Envíos a todo el país', text: 'Recibí tu compra estés donde estés.' },
  { icon: 'RefreshCw', title: 'Cambios simples', text: 'Tenés 30 días para realizar cambios.' },
  { icon: 'ShieldCheck', title: 'Pagos seguros', text: 'Tus datos siempre están protegidos.' },
  { icon: 'CreditCard', title: 'Cuotas sin interés', text: '3 cuotas sin interés con tarjetas.' },
]

export const footerLinks = {
  Navegación: ['Nueva colección', 'Mujer', 'Hombre', 'Accesorios', 'Sale'],
  Ayuda: ['Preguntas frecuentes', 'Envíos', 'Cambios y devoluciones', 'Guía de talles'],
  Legales: ['Términos y condiciones', 'Política de privacidad', 'Defensa del consumidor'],
}

export const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com' },
  { name: 'Pinterest', url: 'https://pinterest.com' },
  { name: 'TikTok', url: 'https://tiktok.com' },
]

export const formatPrice = (value) =>
  new Intl.NumberFormat(store.locale, {
    style: 'currency',
    currency: store.currency,
    maximumFractionDigits: 0,
  }).format(value)
