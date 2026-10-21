// OneClick Brandbook v3 — frames fijos, posición absoluta, SIN Auto Layout.
// Uso: abrir la página donde están los logos y ejecutar el plugin.
// Para otro cliente: cambiar solo el bloque BRAND.

const BRAND = {
  name: '',                       // se escribe en el panel
  year: String(new Date().getFullYear()),
  // true: si el archivo tiene Color styles / Text styles propios, se usan esos
  useFileStyles: true,
  // true: si no hay Color styles, los colores se sacan del propio logo (si no, BRAND.colors)
  colorsFromLogo: true,
  // Paleta de respaldo (solo si no hay estilos ni colores en el logo).
  // pantone: opcional; también se lee de la descripción del Color style (p. ej. «Pantone 368 C»).
  colors: [
    { name: 'Основной', hex: '#E93F3F', share: 50, group: 'Primary Colors', pantone: '' },
    { name: 'Тёмный', hex: '#1F1F1F', share: 30, group: 'Neutral Colors', pantone: '' },
    { name: 'Белый', hex: '#FFFFFF', share: 20, group: 'Neutral Colors', pantone: '' }
  ],
  // Fuentes de respaldo (solo si el archivo no tiene Text styles Headings/… y Paragraph/…)
  fontHead: { family: 'Nunito Sans', style: 'Bold' },
  fontBody: { family: 'Noto Sans', style: 'Regular' },
  // Nombres de capas del logo. Se insertan como instancias: si cambias el componente, el brandbook se actualiza.
  logos: {
    square: 'Logo-Square', squareBlack: 'Logo-Square_black', squareGrid: 'Logo-Square_Grid', squareSafe: 'Logo-Square_Safe',
    horiz: 'Logo-Horizontal', horizBlack: 'Logo-Horizontal_black', horizGrid: 'Logo-Horizontal_Grid', horizSafe: 'Logo-Horizontal_Safe',
    symbol: 'symbol', stamp1: 'stamp1', stamp2: 'stamp2'
  },
  // Textos del cliente: se escriben en el panel. Vacíos = marcadores en el idioma del brandbook.
  txt: { purpose: '', company: '', idea: '', tone: '', posts: [], sample: '' }
};

// ---------- Idioma del brandbook (RU / EN / ES) ----------
// Las claves son el texto ruso; si falta una traducción se queda el ruso.
let LANG = 'ru';
const BB = {
  en: {
    'Обложка': 'Cover', 'Назначение документа': 'Purpose', 'О компании': 'About the company', 'Идея визуальной идентичности': 'Identity idea',
    'Фирменный знак': 'Brand symbol', 'Логотип: основная версия': 'Logo: primary version', 'Горизонтальная версия': 'Horizontal version',
    'Монохромное использование': 'Monochrome use', 'Охранное поле': 'Clear space', 'Минимальный размер': 'Minimum size',
    'Логотип на фонах': 'Logo on backgrounds', 'Недопустимое использование': 'Incorrect use', 'Цвета': 'Colors', 'Иконография': 'Iconography',
    'Типографика: шрифты': 'Typography: fonts', 'Типографика: иерархия': 'Typography: hierarchy', 'Типографика: заголовки': 'Typography: headings',
    'Типографика: текст': 'Typography: body text', 'Паттерн': 'Pattern', 'сетка': 'grid', 'шахматка': 'checker', 'диагональ': 'diagonal',
    'Применение: соцсети': 'Application: social media', 'Тон коммуникации': 'Tone of voice', 'Финал': 'Closing',
    'Назначение|документа': ['Purpose', 'of this guide'], 'О компании|': ['About the company', ''], 'Идея|визуальной идентичности': ['Idea', 'behind the identity'],
    'Фирменный|знак': ['Brand', 'symbol'], 'Логотип|основная версия': ['Logo', 'primary version'], 'Горизонтальная|версия логотипа': ['Horizontal', 'logo version'],
    'Монохромное|использование': ['Monochrome', 'use'], 'Охранное|поле логотипа': ['Clear space', 'around the logo'], 'Минимальный|размер': ['Minimum', 'size'],
    'Использование|на фонах': ['Use', 'on backgrounds'], 'Недопустимое|использование': ['Incorrect', 'use'], 'Цвета|бренда': ['Brand', 'colors'],
    'Цвета|бренда (продолжение)': ['Brand', 'colors (continued)'], 'Иконография|': ['Iconography', ''], 'Типографика|': ['Typography', ''],
    'Иерархия|текста': ['Text', 'hierarchy'], 'Типографика|заголовки': ['Typography', 'headings'], 'Типографика|основной текст': ['Typography', 'body text'],
    'Паттерн|сетка': ['Pattern', 'grid'], 'Паттерн|шахматка': ['Pattern', 'checker'], 'Паттерн|диагональ': ['Pattern', 'diagonal'],
    'Применение|социальные сети': ['Application', 'social media'], 'Тон|коммуникации': ['Tone', 'of voice'],
    'cover': ['Brand', 'guidelines'],
    'Знак используется самостоятельно: иконка приложения, аватар в соцсетях, малые форматы.': 'The symbol works on its own: app icon, social media avatar, small formats.',
    'Основная версия — вертикальная композиция знака и названия. Используется по умолчанию.': 'The primary version stacks the symbol and the name. Use it by default.',
    'Основная версия логотипа. Используется по умолчанию во всех носителях.': 'The primary logo version. Use it by default on every medium.',
    'Для вытянутых форматов: шапка сайта, вывеска, упаковка с ограниченной высотой.': 'For wide formats: website header, signage, packaging with limited height.',
    'Одноцветные версии — для печати в один цвет, тиснения, гравировки и документов.': 'One-color versions for single-color print, embossing, engraving and documents.',
    'Свободное поле вокруг логотипа равно модулю, показанному на схеме. В этой зоне не размещаются текст и графика.': 'The free space around the logo equals the module shown in the diagram. Keep text and graphics out of this zone.',
    'Минимальная ширина: основная версия — 20 мм / 80 px': 'Minimum width: primary version — 20 mm / 80 px', '; горизонтальная — 30 мм / 120 px': '; horizontal — 30 mm / 120 px', '; знак — 8 мм / 32 px': '; symbol — 8 mm / 32 px',
    'Допустимые фоны: белый, светло-серый, фирменный цвет (белая версия) и тёмный (белая версия).': 'Allowed backgrounds: white, light grey, brand color (white version) and dark (white version).',
    'Искажать пропорции': 'Distort proportions', 'Поворачивать': 'Rotate', 'Менять цвета': 'Change colors', 'Снижать контраст': 'Reduce contrast', 'Пёстрый фон': 'Busy background', 'Нарушать охранное поле': 'Invade the clear space', 'Текст вплотную': 'Text too close',
    'Значения для экрана (HEX, RGB) и печати (CMYK': 'Values for screen (HEX, RGB) and print (CMYK', 'Оттенки (доля цвета)': 'Tints (share of color)', 'Пропорции использования': 'Proportions of use',
    'Иконки строятся на той же сетке и толщине линии, что и знак.': 'Icons follow the same grid and stroke weight as the symbol.',
    'Заголовки — {h}. Основной текст — {b}, интерлиньяж 150 %. Минимальный кегль — {min} px.': 'Headings — {h}. Body text — {b}, line height 150%. Minimum size — {min} px.',
    'Текст L': 'Body L', 'Текст M': 'Body M', 'Текст S': 'Body S',
    'Паттерн строится из фирменных элементов. Раппорт {t} × {t} px повторяется без швов.': 'The pattern is built from brand elements. The {t} × {t} px tile repeats seamlessly.',
    'Подробнее': 'Learn more',
    'Логотип — в верхней трети или по центру, один главный акцент на макет, текст не меньше {min} px.': 'Logo in the upper third or centered, one main accent per layout, text no smaller than {min} px.',
    'Pattern Kit — поместите свой элемент внутрь компонента «Pattern/Element 1, 2 или 3»: все паттерны обновятся сами.': 'Pattern Kit — put your own element inside “Pattern/Element 1, 2 or 3”: every pattern updates by itself.',
    'Элемент ': 'Element ', 'Раппорт ': 'Tile ',
    'Основной': 'Primary', 'Дополнительный ': 'Secondary ', 'Тёмный': 'Dark', 'Белый': 'White',
    'Название бренда': 'Brand name', 'Заголовок публикации': 'Post headline', 'Пример основного текста: здесь будет текст о компании.': 'Sample body text: your company text goes here.',
    '[Текст: назначение документа — для кого руководство и как им пользоваться]': '[Text: purpose of the guide — who it is for and how to use it]',
    '[Текст: о компании — чем занимается, для кого, чем отличается]': '[Text: about the company — what it does, for whom, what makes it different]',
    '[Текст: идея визуальной идентичности — что означает знак]': '[Text: idea behind the identity — what the symbol means]',
    '[Текст: тон коммуникации — 3–4 принципа и примеры фраз]': '[Text: tone of voice — 3–4 principles and sample phrases]',
    "Полная версия": "Full version",
    "Полная|версия": ["Full", "version"],
    "В полной версии OneClick Brandbook Pro к брендбуку добавляются:": "OneClick Brandbook Pro adds to your brandbook:",
    "Построение логотипа": "Logo construction",
    "Визитная карточка 95 × 55 мм": "Business card 95 × 55 mm",
    "Фирменный бланк A4": "A4 letterhead",
    "Конверт DL": "DL envelope",
    "Карусель для соцсетей": "Social media carousel",
    "Stories с безопасной зоной": "Stories with safe area",
    "Носители — в натуральную величину, готовы к печати.": "Print materials at actual size, ready for print.",
    "Эту страницу можно удалить.": "You can delete this page."
  },
  es: {
    'Обложка': 'Portada', 'Назначение документа': 'Propósito', 'О компании': 'Sobre la empresa', 'Идея визуальной идентичности': 'Idea de la identidad',
    'Фирменный знак': 'Símbolo de marca', 'Логотип: основная версия': 'Logotipo: versión principal', 'Горизонтальная версия': 'Versión horizontal',
    'Монохромное использование': 'Uso monocromo', 'Охранное поле': 'Área de protección', 'Минимальный размер': 'Tamaño mínimo',
    'Логотип на фонах': 'Logotipo sobre fondos', 'Недопустимое использование': 'Uso incorrecto', 'Цвета': 'Colores', 'Иконография': 'Iconografía',
    'Типографика: шрифты': 'Tipografía: fuentes', 'Типографика: иерархия': 'Tipografía: jerarquía', 'Типографика: заголовки': 'Tipografía: títulos',
    'Типографика: текст': 'Tipografía: texto', 'Паттерн': 'Patrón', 'сетка': 'retícula', 'шахматка': 'damero', 'диагональ': 'diagonal',
    'Применение: соцсети': 'Aplicación: redes sociales', 'Тон коммуникации': 'Tono de comunicación', 'Финал': 'Cierre',
    'Назначение|документа': ['Propósito', 'del manual'], 'О компании|': ['Sobre la empresa', ''], 'Идея|визуальной идентичности': ['Idea', 'de la identidad visual'],
    'Фирменный|знак': ['Símbolo', 'de marca'], 'Логотип|основная версия': ['Logotipo', 'versión principal'], 'Горизонтальная|версия логотипа': ['Versión', 'horizontal'],
    'Монохромное|использование': ['Uso', 'monocromo'], 'Охранное|поле логотипа': ['Área', 'de protección'], 'Минимальный|размер': ['Tamaño', 'mínimo'],
    'Использование|на фонах': ['Uso', 'sobre fondos'], 'Недопустимое|использование': ['Uso', 'incorrecto'], 'Цвета|бренда': ['Colores', 'de marca'],
    'Цвета|бренда (продолжение)': ['Colores', 'de marca (continuación)'], 'Иконография|': ['Iconografía', ''], 'Типографика|': ['Tipografía', ''],
    'Иерархия|текста': ['Jerarquía', 'del texto'], 'Типографика|заголовки': ['Tipografía', 'títulos'], 'Типографика|основной текст': ['Tipografía', 'texto'],
    'Паттерн|сетка': ['Patrón', 'retícula'], 'Паттерн|шахматка': ['Patrón', 'damero'], 'Паттерн|диагональ': ['Patrón', 'diagonal'],
    'Применение|социальные сети': ['Aplicación', 'redes sociales'], 'Тон|коммуникации': ['Tono', 'de comunicación'],
    'cover': ['Manual', 'de identidad\nde marca'],
    'Знак используется самостоятельно: иконка приложения, аватар в соцсетях, малые форматы.': 'El símbolo funciona solo: ícono de app, avatar en redes, formatos pequeños.',
    'Основная версия — вертикальная композиция знака и названия. Используется по умолчанию.': 'La versión principal combina símbolo y nombre en vertical. Se usa por defecto.',
    'Основная версия логотипа. Используется по умолчанию во всех носителях.': 'Versión principal del logotipo. Se usa por defecto en todos los soportes.',
    'Для вытянутых форматов: шапка сайта, вывеска, упаковка с ограниченной высотой.': 'Para formatos alargados: cabecera web, rótulos, envases de poca altura.',
    'Одноцветные версии — для печати в один цвет, тиснения, гравировки и документов.': 'Versiones de un color para impresión a una tinta, relieve, grabado y documentos.',
    'Свободное поле вокруг логотипа равно модулю, показанному на схеме. В этой зоне не размещаются текст и графика.': 'El espacio libre alrededor del logotipo equivale al módulo del esquema. En esta zona no se colocan textos ni gráficos.',
    'Минимальная ширина: основная версия — 20 мм / 80 px': 'Ancho mínimo: versión principal — 20 mm / 80 px', '; горизонтальная — 30 мм / 120 px': '; horizontal — 30 mm / 120 px', '; знак — 8 мм / 32 px': '; símbolo — 8 mm / 32 px',
    'Допустимые фоны: белый, светло-серый, фирменный цвет (белая версия) и тёмный (белая версия).': 'Fondos permitidos: blanco, gris claro, color de marca (versión blanca) y oscuro (versión blanca).',
    'Искажать пропорции': 'Deformar proporciones', 'Поворачивать': 'Rotar', 'Менять цвета': 'Cambiar colores', 'Снижать контраст': 'Reducir el contraste', 'Пёстрый фон': 'Fondo recargado', 'Нарушать охранное поле': 'Invadir el área de protección', 'Текст вплотную': 'Texto pegado',
    'Значения для экрана (HEX, RGB) и печати (CMYK': 'Valores para pantalla (HEX, RGB) e impresión (CMYK', 'Оттенки (доля цвета)': 'Tintes (proporción de color)', 'Пропорции использования': 'Proporciones de uso',
    'Иконки строятся на той же сетке и толщине линии, что и знак.': 'Los íconos siguen la misma retícula y grosor de línea que el símbolo.',
    'Заголовки — {h}. Основной текст — {b}, интерлиньяж 150 %. Минимальный кегль — {min} px.': 'Títulos — {h}. Texto — {b}, interlineado 150 %. Tamaño mínimo — {min} px.',
    'Текст L': 'Texto L', 'Текст M': 'Texto M', 'Текст S': 'Texto S',
    'Паттерн строится из фирменных элементов. Раппорт {t} × {t} px повторяется без швов.': 'El patrón se construye con elementos de marca. El módulo de {t} × {t} px se repite sin costuras.',
    'Подробнее': 'Saber más',
    'Логотип — в верхней трети или по центру, один главный акцент на макет, текст не меньше {min} px.': 'Logotipo en el tercio superior o centrado, un solo acento principal por pieza, texto de al menos {min} px.',
    'Pattern Kit — поместите свой элемент внутрь компонента «Pattern/Element 1, 2 или 3»: все паттерны обновятся сами.': 'Pattern Kit — coloca tu elemento dentro de «Pattern/Element 1, 2 o 3»: todos los patrones se actualizan solos.',
    'Элемент ': 'Elemento ', 'Раппорт ': 'Módulo ',
    'Основной': 'Principal', 'Дополнительный ': 'Secundario ', 'Тёмный': 'Oscuro', 'Белый': 'Blanco',
    'Название бренда': 'Nombre de la marca', 'Заголовок публикации': 'Titular de la publicación', 'Пример основного текста: здесь будет текст о компании.': 'Texto de ejemplo: aquí va el texto sobre la empresa.',
    '[Текст: назначение документа — для кого руководство и как им пользоваться]': '[Texto: propósito del manual — para quién es y cómo usarlo]',
    '[Текст: о компании — чем занимается, для кого, чем отличается]': '[Texto: sobre la empresa — qué hace, para quién y en qué se diferencia]',
    '[Текст: идея визуальной идентичности — что означает знак]': '[Texto: idea de la identidad visual — qué significa el símbolo]',
    '[Текст: тон коммуникации — 3–4 принципа и примеры фраз]': '[Texto: tono de comunicación — 3–4 principios y frases de ejemplo]',
    "Полная версия": "Versión completa",
    "Полная|версия": ["Versión", "completa"],
    "В полной версии OneClick Brandbook Pro к брендбуку добавляются:": "OneClick Brandbook Pro añade a tu brandbook:",
    "Построение логотипа": "Construcción del logo",
    "Визитная карточка 95 × 55 мм": "Tarjeta de presentación 95 × 55 mm",
    "Фирменный бланк A4": "Hoja membretada A4",
    "Конверт DL": "Sobre DL",
    "Карусель для соцсетей": "Carrusel para redes",
    "Stories с безопасной зоной": "Stories con zona segura",
    "Носители — в натуральную величину, готовы к печати.": "Piezas a tamaño real, listas para imprimir.",
    "Эту страницу можно удалить.": "Puedes borrar esta página."
  }
};
BB.ru = { cover: ['Руководство', 'по фирменному\nстилю'] };
function tr(s, vars) {
  let out = (BB[LANG] && typeof BB[LANG][s] === 'string') ? BB[LANG][s] : s;
  if (vars) Object.keys(vars).forEach(k => { out = out.split('{' + k + '}').join(vars[k]); });
  return out;
}
function trPair(a, b) { const v = BB[LANG] && BB[LANG][a + '|' + (b || '')]; return Array.isArray(v) ? v : [a, b]; }
const ALPHABET = {
  ru: 'АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя\nAaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz',
  en: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz',
  es: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnÑñOoPpQqRrSsTtUuVvWwXxYyZz\nÁáÉéÍíÓóÚúÜü ¿? ¡!'
};
// Titulares de posts y texto de muestra: frases reales del texto «О компании»; si no hay, marcadores
function textSamples(company) {
  const sentences = ((company || '').replace(/\s+/g, ' ').match(/[^.!?]+[.!?]*/g) || []).map(x => x.replace(/[.!?]+$/, '').trim()).filter(x => x.length >= 8);
  const short = x => { if (x.length <= 48) return x; const cut = x.slice(0, 48); return cut.slice(0, cut.lastIndexOf(' ')) || cut; };
  const posts = sentences.slice(0, 3).map(short);
  while (posts.length < 3) posts.push(tr('Заголовок публикации'));
  const sample = sentences.find(x => x.length > 30 && x.length <= 140) || tr('Пример основного текста: здесь будет текст о компании.');
  return { posts, sample: /[.!?]$/.test(sample) ? sample : sample + '.' };
}

// ---------- Maquetación fija (ADN Espinoza, formato vertical) ----------
const W = 1080, H = 1920, M = 96, GAP = 120, T = 270; // T = раппорт del patrón
const SIZE = { title: 56, sub: 48, body: 32, small: 24, min: 20 };
const RED = '#E53935', LIGHT = '#F2F2F2', GREY = '#5A5A5A', LINE = '#E6E6E6';

const hex = h => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
const toHex = c => '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
const solid = (h, op) => [op === undefined ? { type: 'SOLID', color: hex(h) } : { type: 'SOLID', color: hex(h), opacity: op }];
const lum = c => 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
const isLightHex = h => lum(hex(h)) > 0.85;
const isLight = f => f.type === 'SOLID' && lum(f.color) > 0.95;
// Degradado de marca: color principal → 30 % más oscuro, de arriba a abajo
const gradientOf = h => { const c = hex(h); return [{ type: 'GRADIENT_LINEAR', gradientTransform: [[0, 1, 0], [-1, 0, 1]],
  gradientStops: [{ position: 0, color: { r: c.r, g: c.g, b: c.b, a: 1 } }, { position: 1, color: { r: c.r * 0.7, g: c.g * 0.7, b: c.b * 0.7, a: 1 } }] }]; };
let PRI = BRAND.colors[0].hex, DARK = BRAND.colors[1].hex, GRADIENT = gradientOf(PRI);

// Recorre nodos sin entrar en instancias (lo de dentro pertenece al componente)
function walk(n, out) { out.push(n); if (n.type !== 'INSTANCE' && 'children' in n) for (const c of n.children) walk(c, out); return out; }

async function tryFont(f) { try { await figma.loadFontAsync(f); return f; } catch (e) { return null; } }
async function loadFont(f) { return (await tryFont(f)) || (await tryFont({ family: 'Inter', style: f.style === 'Regular' ? 'Regular' : 'Bold' })); }

async function main() {
  const src = figma.currentPage;
  const report = [];

  // ---------- Fuentes: Text styles del archivo o BRAND ----------
  const lts = BRAND.useFileStyles ? await figma.getLocalTextStylesAsync() : [];
  const hS = lts.find(x => /^headings\//i.test(x.name)), pS = lts.find(x => /^paragraph\//i.test(x.name));
  const fH = await loadFont(hS ? hS.fontName : BRAND.fontHead);
  const fB = await loadFont(pS ? { family: pS.fontName.family, style: 'Regular' } : BRAND.fontBody);
  const fBBold = await loadFont({ family: fB.family, style: 'Bold' });
  const fHReg = await tryFont({ family: fH.family, style: 'Regular' });
  const fBlack = await tryFont({ family: fH.family, style: 'Black' });
  // Anchos de la misma familia (Expanded / Condensed), si están disponibles en Figma
  const avail = await figma.listAvailableFontsAsync();
  function pickWidth(re) {
    const fam = fH.family.toLowerCase();
    const rank = fn => { const s = fn.family + ' ' + fn.style;
      const w = /black|heavy/i.test(s) ? 0 : /extra ?bold/i.test(s) ? 1 : (/bold/i.test(s) && !/semi ?bold/i.test(s)) ? 2 : 6;
      return w + (/semi|ultra|extra/i.test(s.replace(/extra ?bold/ig, '').replace(/semi ?bold/ig, '')) ? 10 : 0); };
    const c = avail.map(a => a.fontName).filter(fn => fn.family.toLowerCase().indexOf(fam) === 0 && re.test(fn.family + ' ' + fn.style) && !/italic/i.test(fn.style));
    return c.sort((a, b) => rank(a) - rank(b))[0] || null;
  }
  const wN = pickWidth(/expanded|extended|wide/i), cN = pickWidth(/condensed|narrow|compressed/i);
  const fWide = wN ? await tryFont(wN) : null, fCond = cN ? await tryFont(cN) : null;
  const fDisp = fWide || fBlack || fH;   // titulares grandes: lo más ancho/pesado disponible
  const fSide = fCond || fB;             // etiquetas laterales
  report.push('ширины: Expanded ' + (fWide ? '✓' : '✗') + ', Condensed ' + (fCond ? '✓' : '✗'));

  // ---------- Colores: Color styles del archivo o BRAND ----------
  const pantoneOf = d => { const m = /pantone[^\n;,]*/i.exec(d || ''); return m ? m[0].trim() : ''; };
  const groups = {};
  if (BRAND.useFileStyles) for (const st of await figma.getLocalPaintStylesAsync()) {
    const p = st.paints[0]; if (!p || p.type !== 'SOLID' || /^gradients\//i.test(st.name)) continue;
    const parts = st.name.split('/'), g = parts.length > 1 ? parts[0].trim() : 'Colors';
    (groups[g] = groups[g] || []).push({ name: parts[parts.length - 1].trim(), hex: toHex(p.color), pantone: pantoneOf(st.description) });
  }
  const order = n => /primary|основн/i.test(n) ? 0 : /secondary|дополн/i.test(n) ? 1 : 2;
  const fromFile = Object.keys(groups).length > 0;
  // Colores elegidos en el panel («Цвета бренда»): muestras sueltas del lienzo, en el orden de selección
  const picked = fromFile ? [] : await pickedColors();
  const fromLogo = !fromFile && !picked.length && BRAND.colorsFromLogo ? logoColors(src) : null;
  const fromPicked = picked.length ? (() => {
    const lg = logoColors(src);
    const dark = (lg && lg[1] && lg[1].items[0].hex) || '#1F1F1F';
    return [
      { name: 'Primary Colors', items: picked.map((h, i) => ({ name: i ? tr('Дополнительный ') + i : tr('Основной'), hex: h })) },
      { name: 'Neutral Colors', items: [{ name: tr('Тёмный'), hex: dark }, { name: tr('Белый'), hex: '#FFFFFF' }] }
    ];
  })() : null;
  const colorGroups = fromFile
    ? Object.keys(groups).sort((a, b) => order(a) - order(b)).map(k => ({ name: k, items: groups[k] }))
    : fromPicked || fromLogo || [{ name: 'Brand', items: BRAND.colors }];
  if (fromFile || fromPicked || fromLogo) {
    PRI = colorGroups[0].items[0].hex;
    const every = [].concat.apply([], colorGroups.map(g => g.items));
    const darkest = every.slice().sort((a, b) => lum(hex(a.hex)) - lum(hex(b.hex)))[0];
    if (darkest && lum(hex(darkest.hex)) < 0.25) DARK = darkest.hex;
    GRADIENT = gradientOf(PRI);
  }
  report.push('цвета: ' + (fromFile ? 'из стилей файла' : fromPicked ? 'выбранные (' + picked.length + ')' : fromLogo ? 'из логотипа' : 'из BRAND'));
  const PS = await ensurePaintStyles(colorGroups);
  // Logo: primero el maestro, luego sus versiones negra/blanca (se vuelven a teñir y se vinculan)
  const logoBase = Object.values(BRAND.logos).filter(n => !/[_-](grid|safe|black|white)$/i.test(n));
  const logoComps = src.findAll(n => n.type === 'COMPONENT' && logoBase.some(b => n.name === b || n.name === b + '-clean' || n.name.indexOf(b + '_') === 0));
  for (const c of logoComps) if (!c.findOne(k => k.type === 'INSTANCE')) await bindFills(c, PS.paintId);
  for (const c of logoComps) {
    if (!/_(black|white)$/.test(c.name) || c.children.length !== 1 || c.children[0].type !== 'INSTANCE') continue;
    const inner = c.children[0];
    let base = null; try { base = await inner.getMainComponentAsync(); } catch (e) {}
    tintLike(inner, base, /_white$/.test(c.name) ? '#FFFFFF' : DARK);
    await bindFills(c, PS.paintId);
  }

  // ---------- Búsqueda de logos ----------
  // Si varias capas se llaman igual (p. ej. 'symbol' limpio y con grid), 'clean' elige la que no tiene líneas grises
  const isGrey = c => Math.abs(c.r - c.g) < 0.03 && Math.abs(c.g - c.b) < 0.03 && c.r > 0.35 && c.r < 0.95;
  // Nodos visibles (se saltan capas ocultas y su contenido)
  const visibleNodes = n => {
    const out = [];
    const walkV = k => { if (k.visible === false) return; out.push(k); if ('children' in k) k.children.forEach(walkV); };
    walkV(n);
    return out;
  };
  // Cuántos elementos «de construcción» se ven: líneas, trazos finos, círculos solo con contorno, rellenos grises
  const gridScore = n => visibleNodes(n).reduce((acc, x) => {
    if (x === n) return acc;
    const fills = Array.isArray(x.fills) ? x.fills.filter(p => p.visible !== false) : [];
    const strokes = Array.isArray(x.strokes) ? x.strokes.filter(p => p.visible !== false) : [];
    const thin = 'width' in x && Math.min(x.width, x.height) <= 1.5 && Math.max(x.width, x.height) >= 12;
    const outlineOnly = (x.type === 'ELLIPSE' || x.type === 'RECTANGLE') && !fills.length && strokes.length;
    const grey = fills.concat(strokes).some(p => p.type === 'SOLID' && isGrey(p.color));
    return acc + (x.type === 'LINE' || thin || outlineOnly || grey ? 1 : 0);
  }, 0);
  const insideComp = n => { let p = n.parent; while (p && p.type !== 'PAGE') { if (p.type === 'COMPONENT' || p.type === 'COMPONENT_SET' || p.type === 'INSTANCE') return true; p = p.parent; } return false; };
  const memo = {};
  // Si existe una capa «<nombre>-clean» (p. ej. symbol-clean) se usa esa; si no, se elige la versión limpia
  function find(name, mode) {
    const key = name + '|' + (mode || 'clean'); if (key in memo) return memo[key];
    if (mode !== 'grid') {
      const forced = src.findOne(n => n.name === name + '-clean' && !insideComp(n));
      if (forced) return (memo[key] = forced);
    }
    let c = src.findAll(n => n.name === name && !insideComp(n));
    if (!c.length) c = src.findAll(n => n.name === name);
    const size = n => visibleNodes(n).length;
    c.sort((a, b) => mode === 'grid' ? gridScore(b) - gridScore(a) : (gridScore(a) - gridScore(b)) || (size(a) - size(b)));
    return (memo[key] = c[0] || null);
  }
  // Instancia enlazada al componente (o copia si la capa no es componente)
  const unlinked = new Set();
  function instOf(s) {
    if (s.type === 'COMPONENT') return s.createInstance();
    if (s.type === 'COMPONENT_SET') return s.defaultVariant.createInstance();
    if (s.type !== 'INSTANCE') unlinked.add(s.name);
    return s.clone();
  }
  // Quita cajas de fondo claras del logo insertado
  function stripBg(n) { [n].concat(n.findAll ? n.findAll() : []).forEach(k => { if (k.type !== 'TEXT' && 'fills' in k && Array.isArray(k.fills) && k.fills.length && k.fills.every(isLight) && (k === n || k.type === 'RECTANGLE' || k.type === 'FRAME')) k.fills = []; }); }
  // Versión monocroma: partes claras → transparentes, resto → color
  function recolor(n, h) { [n].concat(n.findAll ? n.findAll() : []).forEach(k => { if ('fills' in k && Array.isArray(k.fills) && k.fills.length) k.fills = k.fills.every(isLight) ? [] : solid(h); }); }
  const missing = Object.values(BRAND.logos).filter(n => !find(n) && !/[_-](grid|safe|black)$/i.test(n));

  // ---------- Primitivas de maquetación ----------
  const tBottom = {}, frameBg = {};
  function text(p, s, x, y, size, col, font, w) {
    const t = figma.createText();
    t.fontName = font; t.characters = s; t.fontSize = Math.max(size, SIZE.min);
    t.fills = typeof col === 'string' ? solid(col) : col;
    const bodyFont = font === fB || font === fBBold;
    t.lineHeight = { unit: 'PERCENT', value: bodyFont ? (size >= 60 ? 120 : 150) : (size >= 60 ? 100 : 130) };
    if (w) { t.textAutoResize = 'HEIGHT'; t.resize(w, t.height); }
    p.appendChild(t); t.x = x; t.y = y; return t;
  }
  // Título en dos tonos: palabra clave en color de marca
  function title(p, key, rest, onDark) {
    [key, rest] = trPair(key, rest);
    const s = rest ? key + ' ' + rest : key;
    const t = text(p, s, M, M, SIZE.title, onDark ? '#FFFFFF' : DARK, fH, W - 2 * M);
    t.setRangeFills(0, key.length, solid(onDark ? '#FFFFFF' : PRI));
    if (onDark && rest) t.setRangeFills(key.length, s.length, solid('#FFFFFF', 0.7));
    tBottom[p.id] = t.y + t.height; return t;
  }
  function body(p, s, y, col, w) {
    const t = text(p, tr(s), M, Math.max(y, (tBottom[p.id] || 0) + 40), SIZE.body, col || GREY, fB, w || W - 2 * M);
    tBottom[p.id] = Math.max(tBottom[p.id] || 0, t.y + t.height); return t;
  }
  function rect(p, x, y, w, h, col, r) { const n = figma.createRectangle(); n.resize(w, h); n.cornerRadius = r || 0; n.fills = solid(col); p.appendChild(n); n.x = x; n.y = y; return n; }
  function box(p, x, y, w, h, fills, r, name) { const b = figma.createFrame(); b.name = name || 'Box'; b.layoutMode = 'NONE'; b.resize(w, h); b.fills = fills; b.cornerRadius = r || 0; b.clipsContent = true; p.appendChild(b); b.x = x; b.y = y; return b; }
  // Inserta un logo (instancia) centrado en una caja; si el texto es largo, baja para no encimarse
  // Si falta una versión (_Grid, _Safe, _black) se usa el logo base; _black se pinta en oscuro
  function place(p, name, x, y, bw, bh, opt) {
    opt = opt || {};
    let s = find(name, opt.mode), fallbackDark = false;
    if (!s) {
      const base = name.replace(/[_-](grid|safe|black)$/i, '');
      if (base !== name) { s = find(base); fallbackDark = /black$/i.test(name); }
      // logo de solo texto / sin alguna versión: se usa la que exista
      if (!s) for (const a of (LOGO_ALIAS[base] || [])) { s = find(a); if (s) { fallbackDark = /black$/i.test(name); break; } }
    }
    if (!s) return null;
    const tb = tBottom[p.id] || 0;
    if (y < tb + 64 && y < H / 2) { const ny = tb + 64; bh = Math.max(80, bh - (ny - y)); y = ny; }
    const n = instOf(s); p.appendChild(n); stripBg(n);
    n.rescale(Math.min(bw / n.width, bh / n.height));
    n.x = opt.align === 'left' ? x : x + (bw - n.width) / 2; n.y = y + (bh - n.height) / 2;
    if (fallbackDark) recolor(n, DARK);
    return n;
  }
  // Campo de protección dibujado por el plugin (cuando el archivo no trae la versión _Safe):
  // logo limpio + marco discontinuo a una distancia x = 25 % de la altura del logo, con cotas «x»
  function drawSafe(p, name, x, y, bw, bh) {
    const probe = find(name) || (LOGO_ALIAS[name] || []).map(a => find(a)).find(Boolean); if (!probe) return null;
    const ratio = probe.width / probe.height;
    let lh = Math.min(bh / 1.5, (bw / 1.5) / ratio * 1.0);
    lh = Math.min(lh, bh / (1 + 0.5));
    const lw = lh * ratio, gx = lh * 0.25;
    const total = { w: lw + gx * 2, h: lh + gx * 2 };
    const ox = x + (bw - total.w) / 2, oy = y + (bh - total.h) / 2;
    const zone = figma.createRectangle(); zone.resize(total.w, total.h); zone.fills = solid(PRI, 0.06);
    zone.strokes = solid(PRI); zone.dashPattern = [10, 8]; zone.strokeWeight = 1.5; p.appendChild(zone); zone.x = ox; zone.y = oy;
    const n = place(p, name, ox + gx, oy + gx, lw, lh);
    const mark = (tx, ty) => { const t = text(p, 'x', tx, ty, SIZE.min, PRI, fB); return t; };
    // cotas: arriba, izquierda, derecha, abajo
    [[ox + total.w / 2 - 6, oy + gx / 2 - 14], [ox + gx / 2 - 6, oy + total.h / 2 - 14], [ox + total.w - gx / 2 - 6, oy + total.h / 2 - 14], [ox + total.w / 2 - 6, oy + total.h - gx / 2 - 14]].forEach(([a, b]) => mark(a, b));
    return n;
  }
  function whiteLogo(p, black, normal, x, y, w, h) { const n = place(p, black, x, y, w, h) || place(p, normal, x, y, w, h); if (n) recolor(n, '#FFFFFF'); return n; }
  function cmyk(h) { const c = hex(h); const k = 1 - Math.max(c.r, c.g, c.b); if (k >= 1) return '0 0 0 100'; return [c.r, c.g, c.b].map(v => Math.round((1 - v - k) / (1 - k) * 100)).join(' ') + ' ' + Math.round(k * 100); }
  function rgb(h) { const c = hex(h); return [c.r, c.g, c.b].map(v => Math.round(v * 255)).join(' '); }
  const tint = (h, t) => { const c = hex(h); return toHex({ r: c.r + (1 - c.r) * (1 - t), g: c.g + (1 - c.g) * (1 - t), b: c.b + (1 - c.b) * (1 - t) }); };
  const info = c => 'RGB ' + rgb(c.hex) + '\nCMYK ' + cmyk(c.hex) + (c.pantone ? '\n' + c.pantone : '');

  // ---------- Pattern Kit: componentes editables en la página de logos ----------
  // Elemento con máscara alfa: el patrón usa la silueta del elemento y se colorea desde fuera
  function motif(parent, el, cx, cy, s, rot) {
    const inst = el.createInstance(); parent.appendChild(inst);
    inst.rescale(s / Math.max(inst.width, inst.height));
    const ink = figma.createRectangle(); ink.name = 'ink'; ink.resize(inst.width, inst.height); ink.fills = solid(PRI);
    parent.appendChild(ink); inst.x = 0; inst.y = 0; ink.x = 0; ink.y = 0;
    const g = figma.group([inst, ink], parent); g.name = 'motif';
    inst.isMask = true; try { inst.maskType = 'ALPHA'; } catch (e) { }
    const w = g.width, h = g.height;
    if (rot) {
      try {
        const a = rot * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a);
        g.relativeTransform = [[c, sn, cx - c * w / 2 - sn * h / 2], [-sn, c, cy + sn * w / 2 - c * h / 2]];
        return g;
      } catch (e) { /* sin rotación */ }
    }
    g.x = cx - w / 2; g.y = cy - h / 2; return g;
  }
  function defaultMotif(c, k) {
    let m = null;
    if (k === 0) { const s = find(BRAND.logos.symbol); if (s) { m = instOf(s); c.appendChild(m); stripBg(m); recolor(m, PRI); m.rescale(200 / Math.max(m.width, m.height)); } }
    if (!m && k < 2) { m = figma.createEllipse(); m.resize(k === 0 ? 200 : 96, k === 0 ? 200 : 96); m.fills = solid(PRI); c.appendChild(m); }
    if (!m) { m = figma.createRectangle(); m.resize(168, 48); m.cornerRadius = 24; m.fills = solid(PRI); c.appendChild(m); }
    m.x = (240 - m.width) / 2; m.y = (240 - m.height) / 2;
  }
  // 3 modelos de раппорт; [elemento, x, y (fracción del tile), tamaño, giro]. Lo que cruza el borde se repite al otro lado → sin costuras
  const MODELS = [
    { name: 'Pattern/Tile 1 — Grid', items: [[0, .5, .5, 150, 0], [2, 0, 0, 80, 0], [2, 1, 0, 80, 0], [2, 0, 1, 80, 0], [2, 1, 1, 80, 0]] },
    { name: 'Pattern/Tile 2 — Checker', items: [[0, .25, .25, 100, 0], [0, .75, .75, 100, 0], [1, .75, .25, 48, 0], [1, .25, .75, 48, 0]] },
    { name: 'Pattern/Tile 3 — Diagonal', items: [[0, .5, .5, 130, -20], [2, 0, 0, 110, 45], [2, 1, 0, 110, 45], [2, 0, 1, 110, 45], [2, 1, 1, 110, 45],
      [1, .5, 0, 40, 0], [1, .5, 1, 40, 0], [1, 0, .5, 40, 0], [1, 1, .5, 40, 0]] }
  ];
  const kit = (function () {
    const comp = name => src.findOne(n => n.type === 'COMPONENT' && (n.name === name || n.name.split(' — ')[0] === name.split(' — ')[0]));
    let holder = src.findOne(n => n.type === 'FRAME' && n.name === 'Pattern Kit'), created = false;
    if (!holder) {
      created = true;
      let maxX = 0, minY = Infinity;
      src.children.forEach(n => { maxX = Math.max(maxX, n.x + n.width); minY = Math.min(minY, n.y); });
      holder = figma.createFrame(); holder.name = 'Pattern Kit'; holder.layoutMode = 'NONE';
      holder.resize(1290, 980); holder.fills = solid(LIGHT); holder.cornerRadius = 24;
      src.appendChild(holder); holder.x = maxX + 400; holder.y = isFinite(minY) ? minY : 0;
      text(holder, tr('Pattern Kit — поместите свой элемент внутрь компонента «Pattern/Element 1, 2 или 3»: все паттерны обновятся сами.'), 60, 40, SIZE.min, GREY, fB, 1170);
    }
    const elements = [0, 1, 2].map(k => {
      const name = 'Pattern/Element ' + (k + 1);
      let c = comp(name);
      if (!c) {
        created = true;
        c = figma.createComponent(); c.name = name; c.resize(240, 240); c.fills = []; c.clipsContent = true;
        holder.appendChild(c); c.x = 60 + k * 390; c.y = 160;
        text(holder, tr('Элемент ') + (k + 1), c.x, 120, SIZE.min, GREY, fB);
        defaultMotif(c, k);
      }
      return c;
    });
    const tiles = MODELS.map((md, k) => {
      let t = comp(md.name);
      if (!t) {
        created = true;
        t = figma.createComponent(); t.name = md.name; t.resize(T, T); t.fills = []; t.clipsContent = true;
        holder.appendChild(t); t.x = 60 + k * 390; t.y = 560;
        text(holder, tr('Раппорт ') + (k + 1) + ' · ' + T + '×' + T, t.x, 520, SIZE.min, GREY, fB);
        md.items.forEach(it => motif(t, elements[it[0]], it[1] * T, it[2] * T, it[3], it[4]));
      }
      return t;
    });
    report.push('Pattern Kit: ' + (created ? 'создан' : 'найден'));
    return { elements, tiles };
  })();
  for (const c of kit.elements) await bindFills(c, PS.paintId);
  for (const t of kit.tiles) await bindFills(t, PS.paintId);
  function inkAll(n, h, op) { n.findAll(x => x.name === 'ink' && x.type === 'RECTANGLE').forEach(r => { r.fills = solid(h, op); }); }
  function patternField(p, tile, x, y, w, h, inkHex, op, scale) {
    const fld = box(p, x, y, w, h, [], 0, 'Pattern'); const sc = scale || 1, step = T * sc;
    for (let yy = 0; yy < h; yy += step) for (let xx = 0; xx < w; xx += step) {
      const ti = tile.createInstance(); fld.appendChild(ti); if (sc !== 1) ti.rescale(sc);
      ti.x = xx; ti.y = yy; inkAll(ti, inkHex, op);
    }
    return fld;
  }

  // ---------- Página del brandbook ----------
  const page = figma.createPage();
  page.name = 'Brandbook — ' + BRAND.name;
  await figma.setCurrentPageAsync(page);

  let idx = 0;
  function frame(name, bg) {
    const f = figma.createFrame();
    f.name = String(idx + 1).padStart(2, '0') + ' ' + tr(name);
    f.layoutMode = 'NONE'; f.resize(W, H);
    f.fills = bg === PRI ? GRADIENT : solid(bg); f.clipsContent = true;
    page.appendChild(f); f.x = idx * (W + GAP); f.y = 0;
    frameBg[f.id] = bg; idx++; return f;
  }
  function opener(name, key, rest, txt) {
    const f = frame(name, PRI); title(f, key, rest, true);
    if (txt) { const t = text(f, tr(txt), M, (tBottom[f.id] || 0) + 40, SIZE.body, '#FFFFFF', fB, W - 2 * M); tBottom[f.id] = t.y + t.height; }
    return f;
  }

  let f;
  const HAS = { square: !!find(BRAND.logos.square), horiz: !!find(BRAND.logos.horiz), symbol: !!find(BRAND.logos.symbol) };
  const BOTH = HAS.square && HAS.horiz;
  // 01 Portada — fondo blanco, signo dominante a sangre
  f = frame('Обложка', '#FFFFFF');
  if (HAS.symbol) {
    place(f, BRAND.logos.horiz, M, M, 300, 100, { align: 'left' });
    place(f, BRAND.logos.symbol, 330, 300, 1100, 1100);
  } else place(f, BRAND.logos.square, M, 360, W - 2 * M, 760); // sin símbolo: el logo protagonista
  const cv = BB[LANG].cover || BB.ru.cover;
  const ct = text(f, cv[0] + '\n' + cv[1], M, 0, 90, DARK, fDisp, W - 2 * M);
  ct.setRangeFills(0, cv[0].length, solid(PRI));
  ct.y = H - M - 72 - ct.height;
  text(f, BRAND.name + ' · ' + BRAND.year, M, H - M - 30, SIZE.small, GREY, fB);

  // 02 Propósito
  f = frame('Назначение документа', '#FFFFFF'); title(f, 'Назначение', 'документа');
  body(f, BRAND.txt.purpose, 260);
  place(f, BRAND.logos.square, M + 60, 900, W - 2 * M - 120, 860);

  // 03 Empresa
  f = opener('О компании', 'О компании', '', BRAND.txt.company);
  const sy = HAS.symbol && place(f, BRAND.logos.symbol, 440, 1180, 900, 900); if (sy) { recolor(sy, '#FFFFFF'); sy.opacity = 0.18; }

  // 04 Idea visual — símbolo limpio (las versiones con grid quedan para la página de construcción)
  f = frame('Идея визуальной идентичности', '#FFFFFF'); title(f, 'Идея', 'визуальной идентичности');
  body(f, BRAND.txt.idea, 330);
  place(f, BRAND.logos.symbol, M + 60, 800, W - 2 * M - 120, 900);

  // 05 Signo — blanco sobre degradado, sin contenedor
  if (HAS.symbol) {
    f = opener('Фирменный знак', 'Фирменный', 'знак', 'Знак используется самостоятельно: иконка приложения, аватар в соцсетях, малые форматы.');
    const s5 = place(f, BRAND.logos.symbol, M + 40, 640, W - 2 * M - 80, 1000); if (s5) recolor(s5, '#FFFFFF');
  }

  // 06 Logo principal
  f = frame('Логотип: основная версия', '#FFFFFF'); title(f, 'Логотип', 'основная версия');
  body(f, BOTH ? 'Основная версия — вертикальная композиция знака и названия. Используется по умолчанию.' : 'Основная версия логотипа. Используется по умолчанию во всех носителях.', 330);
  place(f, BRAND.logos.square, M + 80, 700, W - 2 * M - 160, 900);

  // 07 Horizontal
  if (BOTH) {
    f = frame('Горизонтальная версия', '#FFFFFF'); title(f, 'Горизонтальная', 'версия логотипа');
    body(f, 'Для вытянутых форматов: шапка сайта, вывеска, упаковка с ограниченной высотой.', 330);
    place(f, BRAND.logos.horiz, M, 820, W - 2 * M, 400);
    place(f, BRAND.logos.horizGrid, M, 1340, W - 2 * M, 400);
  }

  // 08 Monocromo
  f = frame('Монохромное использование', '#FFFFFF'); title(f, 'Монохромное', 'использование');
  body(f, 'Одноцветные версии — для печати в один цвет, тиснения, гравировки и документов.', 330);
  if (BOTH) {
    place(f, BRAND.logos.squareBlack, 140, 620, 360, 560);
    place(f, BRAND.logos.horizBlack, 540, 760, 440, 280);
    rect(f, 0, 1240, W, 680, DARK);
    whiteLogo(f, BRAND.logos.squareBlack, BRAND.logos.square, 140, 1300, 360, 560);
    whiteLogo(f, BRAND.logos.horizBlack, BRAND.logos.horiz, 540, 1440, 440, 280);
  } else {
    place(f, BRAND.logos.squareBlack, M + 60, 640, W - 2 * M - 120, 480);
    rect(f, 0, 1240, W, 680, DARK);
    whiteLogo(f, BRAND.logos.squareBlack, BRAND.logos.square, M + 60, 1340, W - 2 * M - 120, 480);
  }

  // 09 Zona de respeto (versiones _Safe del archivo)
  f = frame('Охранное поле', '#FFFFFF'); title(f, 'Охранное', 'поле логотипа');
  body(f, 'Свободное поле вокруг логотипа равно модулю, показанному на схеме. В этой зоне не размещаются текст и графика.', 330);
  if (find(BRAND.logos.squareSafe)) place(f, BRAND.logos.squareSafe, M + 60, 620, W - 2 * M - 120, 640);
  else drawSafe(f, BRAND.logos.square, M + 60, 620, W - 2 * M - 120, 640);
  if (BOTH && find(BRAND.logos.horizSafe)) place(f, BRAND.logos.horizSafe, M, 1380, W - 2 * M, 380);
  else if (BOTH) drawSafe(f, BRAND.logos.horiz, M, 1380, W - 2 * M, 380);

  // 10 Tamaño mínimo
  f = frame('Минимальный размер', '#FFFFFF'); title(f, 'Минимальный', 'размер');
  body(f, tr('Минимальная ширина: основная версия — 20 мм / 80 px') + (BOTH ? tr('; горизонтальная — 30 мм / 120 px') : '') + (HAS.symbol ? tr('; знак — 8 мм / 32 px') : '') + '.', 330);
  [[BRAND.logos.square, 240, 240], [BRAND.logos.square, 120, 120]].concat(BOTH ? [[BRAND.logos.horiz, 360, 130], [BRAND.logos.horiz, 120, 44]] : [], HAS.symbol ? [[BRAND.logos.symbol, 64, 64], [BRAND.logos.symbol, 32, 32]] : []).forEach((s, i) => {
    const y = 700 + Math.floor(i / 2) * 360, x = M + (i % 2) * 460;
    place(f, s[0], x, y, s[1], s[2]);
    text(f, s[1] + ' px', x, y + s[2] + 16, SIZE.min, GREY, fB);
  });

  // 11 Logo sobre fondos
  f = frame('Логотип на фонах', '#FFFFFF'); title(f, 'Использование', 'на фонах');
  body(f, 'Допустимые фоны: белый, светло-серый, фирменный цвет (белая версия) и тёмный (белая версия).', 330);
  [['#FFFFFF', false], [LIGHT, false], [PRI, true], [DARK, true]].forEach((b, i) => {
    const x = M + (i % 2) * 452, y = 620 + Math.floor(i / 2) * 620;
    const r = rect(f, x, y, 436, 580, b[0], 24); if (b[0] === '#FFFFFF') r.strokes = solid(LINE);
    if (b[1]) whiteLogo(f, BRAND.logos.squareBlack, BRAND.logos.square, x + 60, y + 60, 316, 460);
    else place(f, BRAND.logos.square, x + 60, y + 60, 316, 460);
  });

  // 12 Usos incorrectos
  f = frame('Недопустимое использование', DARK); title(f, 'Недопустимое', 'использование', true);
  ['Искажать пропорции', 'Поворачивать', 'Менять цвета', 'Снижать контраст', 'Пёстрый фон', 'Нарушать охранное поле'].map(x => tr(x)).forEach((lab, i) => {
    const x = M + (i % 2) * 452, y = 360 + Math.floor(i / 2) * 500;
    rect(f, x, y, 436, 400, '#FFFFFF', 24);
    if (i === 4) for (let s = 0; s < 8; s++) rect(f, x + s * 54, y, 27, 400, s % 2 ? '#F7C948' : '#F06292');
    const n = place(f, BRAND.logos.square, x + 98, y + 60, 240, 280);
    if (n) {
      if (i === 0) { n.resize(n.width * 1.5, n.height * 0.7); n.x = x + 38; n.y = y + 100; }
      if (i === 1) n.rotation = 25;
      if (i === 2) recolor(n, '#7E57C2');
      if (i === 3) n.opacity = 0.25;
      if (i === 5) text(f, tr('Текст вплотную'), x + 40, y + 300, 28, DARK, fBBold);
    }
    const c = figma.createEllipse(); c.resize(48, 48); c.fills = solid(RED); f.appendChild(c); c.x = x + 372; c.y = y + 16;
    text(f, '✕', x + 385, y + 22, 24, '#FFFFFF', fBBold);
    text(f, lab, x, y + 412, SIZE.small, '#FFFFFF', fB, 436);
  });

  // 13 Color — franjas a todo el ancho que se reparten la altura de la página (siempre llena).
  // Orden: grupos de Color styles (Primary → Secondary → Neutral); máx. 6 franjas por página.
  const allColors = [];
  colorGroups.forEach((g, gi) => g.items.forEach((c) => allColors.push(Object.assign({ group: gi === 0 && g.name === 'Brand' ? (c.group || '') : g.name }, c))));
  const hasShares = allColors.every(c => c.share);
  const PER_PAGE = 6;
  for (let k = 0; k < allColors.length; k += PER_PAGE) {
    const chunk = allColors.slice(k, k + PER_PAGE);
    const first = k === 0;
    f = frame(tr('Цвета') + (first ? '' : ' ' + (k / PER_PAGE + 1)), '#FFFFFF');
    title(f, first ? 'Цвета' : 'Цвета', first ? 'бренда' : 'бренда (продолжение)');
    if (first) body(f, tr('Значения для экрана (HEX, RGB) и печати (CMYK') + (allColors.some(c => c.pantone) ? ', Pantone' : '') + ').', 200);
    const top = (tBottom[f.id] || 200) + 48;
    const bottom = H - M - (first && hasShares ? 120 : 0);
    const gap = 16;
    const bandH = Math.floor((bottom - top - gap * (chunk.length - 1)) / chunk.length);
    const big = bandH >= 300;
    chunk.forEach((c, i) => {
      const y = top + i * (bandH + gap);
      const light = isLightHex(c.hex);
      const tc = light ? DARK : '#FFFFFF';
      const band = box(f, M, y, W - 2 * M, bandH, solid(c.hex), 24, c.name);
      if (light) band.strokes = solid(LINE);
      const pad = big ? 40 : 28;
      if (c.group) text(band, String(c.group).toUpperCase(), pad, pad, SIZE.min, tc, fB);
      text(band, c.name, pad, pad + (c.group ? 34 : 0), big ? SIZE.sub : 32, tc, fH, 520);
      const hexT = text(band, c.hex, pad, 0, big ? 72 : 48, tc, fH);
      hexT.y = bandH - pad - hexT.height;
      const inf = text(band, info(c), 0, 0, SIZE.min, tc, fB, 260);
      inf.x = W - 2 * M - pad - 260; inf.y = bandH - pad - inf.height;
      // escala de tintes (no en colores muy claros)
      // Оттенки: el color mezclado con blanco; cada cuadro indica qué parte es color (80 % = 80 % color + 20 % blanco)
      if (!light && bandH >= 220) {
        const sw = big ? 48 : 38, gapT = 10, sx = W - 2 * M - pad - 4 * sw - 3 * gapT;
        text(band, tr('Оттенки (доля цвета)'), sx, pad, SIZE.min, tc, fB);
        [0.8, 0.6, 0.4, 0.2].forEach((t, j) => {
          rect(band, sx + j * (sw + gapT), pad + 34, sw, sw, tint(c.hex, t), 10);
          const lab = text(band, Math.round(t * 100) + '%', sx + j * (sw + gapT), pad + 34 + sw + 8, SIZE.min, tc, fB);
          lab.textAutoResize = 'NONE'; lab.resize(sw, lab.height); lab.textAlignHorizontal = 'CENTER';
        });
      }
    });
    if (first && hasShares) {
      const tot = allColors.reduce((a2, c) => a2 + c.share, 0);
      text(f, tr('Пропорции использования'), M, bottom + 28, SIZE.min, GREY, fB);
      // Barra redondeada como las tarjetas: los segmentos se recortan dentro de un marco con esquinas
      const bar = box(f, M, bottom + 62, W - 2 * M, 32, [], 16, 'Пропорции');
      bar.strokes = solid(LINE);
      let sx2 = 0;
      allColors.forEach(c => { const w = (W - 2 * M) * c.share / tot; rect(bar, sx2, 0, w, 32, c.hex, 0); text(f, c.share + '%', M + sx2, bottom + 104, SIZE.min, GREY, fB); sx2 += w; });
    }
  }

  // 14 Iconografía — hijos del frame/sección «Icons» (como instancias si son componentes)
  const iconBox = src.findOne(n => /^(icons|иконки|iconography|иконография)$/i.test(n.name) && 'children' in n);
  if (iconBox && iconBox.children.length) {
    f = frame('Иконография', '#FFFFFF'); title(f, 'Иконография');
    body(f, 'Иконки строятся на той же сетке и толщине линии, что и знак.', 330);
    const cell = (W - 2 * M) / 5;
    iconBox.children.slice(0, 30).forEach((ic, i) => {
      const x = M + (i % 5) * cell, y = 520 + Math.floor(i / 5) * cell;
      rect(f, x + 8, y + 8, cell - 16, cell - 16, LIGHT, 16);
      const n = instOf(ic); f.appendChild(n);
      n.rescale(Math.min((cell - 64) / n.width, (cell - 64) / n.height));
      n.x = x + (cell - n.width) / 2; n.y = y + (cell - n.height) / 2;
    });
  } else missing.push('Icons (frame)');

  // 15 Tipografía — familias y anchos
  f = frame('Типографика: шрифты', '#FFFFFF'); title(f, 'Типографика');
  text(f, fH.family, M, 300, 130, PRI, fDisp, W - 2 * M);
  let variants = [[fCond, 'Condensed'], [fH, fH.style], [fWide, 'Expanded']].filter(v => v[0]);
  if (variants.length < 2) variants = [[fHReg, 'Regular'], [fH, fH.style], [fBlack, 'Black']].filter(v => v[0]);
  const vw = (W - 2 * M) / variants.length;
  variants.forEach((v, i) => { text(f, 'Aa', M + i * vw, 640, 180, DARK, v[0]); text(f, v[1], M + i * vw, 900, SIZE.min, GREY, fB); });
  rect(f, M, 1000, W - 2 * M, 2, LINE, 0);
  text(f, fB.family, M, 1060, 96, DARK, fB, W - 2 * M);
  body(f, tr('Заголовки — {h}. Основной текст — {b}, интерлиньяж 150 %. Минимальный кегль — {min} px.', { h: fH.family, b: fB.family, min: SIZE.min }), 1260, DARK);

  // 16 Tipografía — jerarquía
  f = frame('Типографика: иерархия', '#FFFFFF'); title(f, 'Иерархия', 'текста');
  let ry = 320;
  [['Display', fDisp, 72], ['H1', fH, 56], ['H2', fH, 48], ['H3', fH, 32], ['Текст L', fB, 32], ['Текст M', fB, 24], ['Текст S', fB, 20]].forEach(r => {
    text(f, tr(r[0]) + '\n' + r[2] + ' px', M, ry + 6, SIZE.min, GREY, fB, 160);
    const isBody = r[1] === fB;
    const t = text(f, isBody ? BRAND.txt.sample : BRAND.txt.posts[0], M + 190, ry, r[2], isBody ? GREY : DARK, r[1], W - 2 * M - 190);
    ry = Math.max(ry + 64, t.y + t.height) + 44;
    rect(f, M, ry - 22, W - 2 * M, 1, LINE, 0);
  });

  // 17 Tipografía — alfabeto de titulares
  f = frame('Типографика: заголовки', PRI); title(f, 'Типографика', 'заголовки', true);
  const big = text(f, 'Aa', 380, 160, 640, '#FFFFFF', fDisp); big.opacity = 0.14;
  text(f, fH.family + '\n' + fH.style, M, 340, 110, '#FFFFFF', fH, W - 2 * M);
  text(f, ALPHABET[LANG] + '\n0123456789 .,:;!?«»()—', M, 900, 48, '#FFFFFF', fH, W - 2 * M);

  // 18 Tipografía — texto corrido
  f = frame('Типографика: текст', '#FFFFFF'); title(f, 'Типографика', 'основной текст');
  const aa = text(f, 'Aa', 480, 200, 520, PRI, fB); aa.opacity = 0.08;
  text(f, fB.family, M, 420, 96, DARK, fB, W - 2 * M);
  text(f, ALPHABET[LANG] + '\n0123456789', M, 760, 32, DARK, fB, W - 2 * M);

  // 19–21 Patrón — 3 раппорта de los componentes Pattern/Tile (se actualizan solos)
  [['сетка', PRI, '#FFFFFF', 0.24], ['шахматка', '#FFFFFF', PRI, 1], ['диагональ', DARK, PRI, 1]].forEach((pt, i) => {
    f = frame(tr('Паттерн') + ' ' + (i + 1) + ': ' + tr(pt[0]), pt[1]);
    const dark = !isLightHex(pt[1]);
    title(f, 'Паттерн', pt[0], dark);
    text(f, tr('Паттерн строится из фирменных элементов. Раппорт {t} × {t} px повторяется без швов.', { t: T }), M, 260, SIZE.body, dark ? '#FFFFFF' : GREY, fB, W - 2 * M);
    const fy = 560;
    patternField(f, kit.tiles[i], 0, fy, W, H - fy, pt[2], pt[3]);
    const rep = figma.createRectangle(); rep.resize(T, T); rep.fills = []; rep.strokes = solid(dark ? '#FFFFFF' : DARK); rep.strokeWeight = 2; rep.dashPattern = [12, 8];
    f.appendChild(rep); rep.x = T; rep.y = fy + T;
  });

  // 22 Aplicaciones — redes sociales (4:5)
  f = frame('Применение: соцсети', '#FFFFFF'); title(f, 'Применение', 'социальные сети');
  const cw = (W - 2 * M - 24) / 2, chh = Math.round(cw * 1.25), P = BRAND.txt.posts;
  const pos = i => [M + (i % 2) * (cw + 24), 300 + Math.floor(i / 2) * (chh + 24)];
  let c, xy;
  // Titular de post: 36px, interlineado compacto (108 %); se coloca abajo, sin pisar el logo
  const postTitle = (card, str, color) => {
    const t = text(card, str, 32, 0, 36, color, fH, cw - 64);
    t.lineHeight = { unit: 'PERCENT', value: 108 };
    t.y = chh - 40 - t.height;
    return t;
  };
  // Post 1: degradado, logo arriba, signo grande y tenue en la esquina superior derecha, titular abajo
  xy = pos(0); c = box(f, xy[0], xy[1], cw, chh, GRADIENT, 24, 'Post 1');
  const p1 = HAS.symbol && place(c, BRAND.logos.symbol, cw - 250, -70, 340, 340); if (p1) { recolor(p1, '#FFFFFF'); p1.opacity = 0.16; }
  whiteLogo(c, BRAND.logos.horizBlack, BRAND.logos.horiz, 32, 32, 170, 60);
  postTitle(c, P[0], '#FFFFFF');
  // Post 2: blanco, círculo de marca a sangre, signo arriba, titular y botón abajo
  xy = pos(1); c = box(f, xy[0], xy[1], cw, chh, solid('#FFFFFF'), 24, 'Post 2'); c.strokes = solid(LINE);
  const blob = figma.createEllipse(); blob.resize(300, 300); blob.fills = solid(PRI); c.appendChild(blob); blob.x = cw - 170; blob.y = -130;
  if (HAS.symbol) place(c, BRAND.logos.symbol, 32, 32, 72, 72, { align: 'left' }); else place(c, BRAND.logos.horiz, 32, 32, 170, 60, { align: 'left' });
  const t2 = postTitle(c, P[1], DARK);
  t2.y = chh - 40 - 56 - 24 - t2.height;
  rect(c, 32, chh - 40 - 56, 196, 56, PRI, 28);
  // Texto del botón centrado en su caja (sigue centrado aunque cambie el estilo o la fuente)
  const btnLabel = text(c, tr('Подробнее'), 32, chh - 40 - 56, SIZE.small, '#FFFFFF', fBBold);
  btnLabel.textAutoResize = 'NONE';
  btnLabel.resize(196, 56);
  btnLabel.textAlignHorizontal = 'CENTER';
  btnLabel.textAlignVertical = 'CENTER';
  // Post 3: oscuro con brillo de marca, logo pequeño arriba, titular abajo
  xy = pos(2); c = box(f, xy[0], xy[1], cw, chh, solid(DARK), 24, 'Post 3');
  const glow = figma.createEllipse(); glow.resize(560, 560); const pc = hex(PRI);
  glow.fills = [{ type: 'GRADIENT_RADIAL', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [{ position: 0, color: { r: pc.r, g: pc.g, b: pc.b, a: 0.8 } }, { position: 1, color: { r: pc.r, g: pc.g, b: pc.b, a: 0 } }] }];
  c.appendChild(glow); glow.x = cw - 340; glow.y = -280;
  whiteLogo(c, BRAND.logos.horizBlack, BRAND.logos.horiz, 32, 32, 170, 60);
  postTitle(c, P[2], '#FFFFFF');
  // Post 4: patrón + sello
  xy = pos(3); c = box(f, xy[0], xy[1], cw, chh, GRADIENT, 24, 'Post 4');
  patternField(c, kit.tiles[1], 0, 0, cw, chh, '#FFFFFF', 0.18, 0.6);
  place(c, BRAND.logos.stamp1, (cw - 280) / 2, (chh - 280) / 2, 280, 280);
  body(f, tr('Логотип — в верхней трети или по центру, один главный акцент на макет, текст не меньше {min} px.', { min: SIZE.min }), 300 + 2 * chh + 24 + 56);

  // 23 Tono de voz
  f = frame('Тон коммуникации', '#FFFFFF'); title(f, 'Тон', 'коммуникации');
  body(f, BRAND.txt.tone, 330, DARK);
  place(f, BRAND.logos.horiz, M, 1540, 480, 200, { align: 'left' });

  // 24 Cierre — todo en color de marca, logo blanco, sin contenedor
  f = frame('Финал', PRI);
  whiteLogo(f, BRAND.logos.squareBlack, BRAND.logos.square, 240, 520, W - 480, 700);
  const gt = text(f, 'Gracias', M, 0, 110, '#FFFFFF', fH); gt.y = H - M - 72 - gt.height;
  text(f, BRAND.name + ' · ' + BRAND.year, M, H - M - 30, SIZE.small, '#FFFFFF', fB);

  // Última hoja (solo versión gratuita): qué añade la versión completa y dónde conseguirla. Se puede borrar.
  {
    const proUrl = 'https://denis.espinoza.ru/' + (LANG === 'ru' ? '' : LANG + '/') + 'oneclick-brandbook/';
    f = frame('Полная версия', DARK); title(f, 'Полная', 'версия', true);
    const list = text(f, tr('В полной версии OneClick Brandbook Pro к брендбуку добавляются:') + '\n\n' + [
      'Построение логотипа', 'Визитная карточка 95 × 55 мм', 'Фирменный бланк A4', 'Конверт DL', 'Карусель для соцсетей', 'Stories с безопасной зоной'
    ].map(x => '—  ' + tr(x)).join('\n') + '\n\n' + tr('Носители — в натуральную величину, готовы к печати.'), M, 330, SIZE.body, '#FFFFFF', fB, W - 2 * M);
    const link = text(f, proUrl.replace('https://', ''), M, list.y + list.height + 80, 40, PRI, fH, W - 2 * M);
    try { link.hyperlink = { type: 'URL', value: proUrl }; } catch (e) { /* sin enlaces en este entorno */ }
    text(f, tr('Эту страницу можно удалить.'), M, H - M - 30, SIZE.small, '#FFFFFF', fB).opacity = 0.5;
  }

  // Etiqueta lateral en cada página (ancho condensado si existe)
  for (const fr of page.children.slice()) {
    const light = isLightHex(frameBg[fr.id] || '#FFFFFF');
    const t = figma.createText(); t.fontName = fSide;
    t.characters = (BRAND.name + '  ·  ' + fr.name.slice(3) + '  ·  ' + fr.name.slice(0, 2)).toUpperCase();
    t.fontSize = SIZE.min; t.letterSpacing = { unit: 'PERCENT', value: 8 };
    t.fills = light ? solid('#9A9A9A') : solid('#FFFFFF', 0.7);
    fr.appendChild(t); t.rotation = 90; t.x = W - 40 - t.height; t.y = H - M;
  }

  const st = await applyStyles(page, fH, fB, PS);
  const auto = page.children.reduce((a, fr) => a + walk(fr, []).filter(n => 'layoutMode' in n && n.layoutMode !== 'NONE').length, 0);
  figma.viewport.scrollAndZoomIntoView(page.children);
  const msg = ['Готово: ' + idx + ' стр.', 'Auto Layout: ' + auto, 'стили: цвет ' + st.paint + ', текст ' + st.text, 'шрифты: ' + fH.family + ' / ' + fB.family].concat(report);
  if (unlinked.size) msg.push('не компоненты: ' + Array.from(unlinked).join(', '));
  if (missing.length) msg.push('не найдены: ' + missing.join(', '));
  figma.closePlugin(msg.join(' · '));
}

// Crea (o reutiliza por nombre) Color styles y Text styles y los aplica.
// No toca el interior de las instancias: así siguen dependiendo de sus componentes.
// Crea (o reutiliza) los Color styles y el degradado. Se llama ANTES de maquetar:
// si un componente maestro se vincula a un estilo después de que sus instancias tengan colores cambiados,
// Figma devuelve esas instancias al color del maestro.
async function ensurePaintStyles(colorGroups) {
  const lp = await figma.getLocalPaintStylesAsync();
  const paintId = {};
  const solidStyles = lp.filter(x => x.paints[0] && x.paints[0].type === 'SOLID');
  if (solidStyles.length) solidStyles.forEach(x => { const k = toHex(x.paints[0].color); paintId[k] = paintId[k] || x.id; });
  else for (const g of (colorGroups || [{ name: 'Brand', items: BRAND.colors }])) for (const c of g.items) {
    const k = c.hex.toUpperCase(); if (paintId[k]) continue;
    const st = figma.createPaintStyle(); st.name = (g.name === 'Brand' ? (c.group || 'Brand') : g.name) + '/' + c.name; st.paints = solid(c.hex);
    if (c.pantone) st.description = c.pantone;
    paintId[k] = st.id;
  }
  const gName = 'Gradients/Brand';
  let gs = lp.find(x => x.name === gName);
  if (!gs) { gs = figma.createPaintStyle(); gs.name = gName; gs.paints = GRADIENT; }
  return { paintId, gs };
}
// Un color sólido que coincide con un Color style queda vinculado: cambias el estilo y cambia todo
async function bindFills(root, paintId) {
  let n = 0;
  for (const k of [root].concat(root.findAll ? root.findAll() : [])) {
    if (!('fills' in k) || !Array.isArray(k.fills) || k.fills.length !== 1) continue;
    const p = k.fills[0];
    if (p.type !== 'SOLID' || (p.opacity !== undefined && p.opacity !== 1)) continue;
    const id = paintId[toHex(p.color)];
    if (id && k.fillStyleId !== id) { try { await k.setFillStyleIdAsync(id); n++; } catch (e) {} }
  }
  return n;
}

async function applyStyles(page, fH, fB, PS) {
  const paintId = PS.paintId, gs = PS.gs;
  const defs = [
    [fH, 130, 'Special Headings/Display 4', 130], [fH, 110, 'Special Headings/Display 5', 110],
    [fH, 90, 'Special Headings/Display 6', 90], [fH, 72, 'Special Headings/Display 7', 72],
    [fH, 56, 'Headings/Size 1', 62], [fH, 48, 'Headings/Size 2', 54], [fH, 32, 'Headings/Size 3', 40],
    [fB, 32, 'Paragraph/Large', 48], [fB, 24, 'Paragraph/Medium', 36], [fB, 20, 'Paragraph/Small', 30]
  ];
  const lt = await figma.getLocalTextStylesAsync();
  const textId = {};
  for (const d of defs) {
    let st = lt.find(x => x.name === d[2]);
    if (!st) { st = figma.createTextStyle(); st.name = d[2]; st.fontName = d[0]; st.fontSize = d[1]; st.lineHeight = { unit: 'PIXELS', value: d[3] }; }
    else await figma.loadFontAsync(st.fontName);
    textId[d[0].family + '|' + d[0].style + '|' + d[1]] = st.id;
  }
  let np = 0, nt = 0;
  // los maestros (logo, versiones, Pattern Kit) ya se vincularon antes de maquetar; aquí, lo de la página
  for (const fr of page.children) np += await bindFills(fr, paintId);
  for (const n of page.children.reduce((a, fr) => walk(fr, a), [])) {
    if (n.type === 'TEXT' && n.fontName !== figma.mixed && n.fontSize !== figma.mixed) {
      const key = n.fontName.family + '|' + n.fontName.style + '|' + n.fontSize;
      // Ningún texto sin estilo: si la combinación no está en la lista, se crea un estilo con sus valores exactos
      if (!textId[key]) {
        const body = n.fontName.family === fB.family;
        const group = body ? 'Paragraph' : (n.fontSize >= 60 ? 'Special Headings' : 'Headings');
        const name = group + '/' + (body ? '' : n.fontName.style + ' ') + Math.round(n.fontSize);
        let st = lt.find(x => x.name === name);
        if (!st) {
          st = figma.createTextStyle(); st.name = name; st.fontName = n.fontName; st.fontSize = n.fontSize;
          if (n.lineHeight !== figma.mixed) st.lineHeight = n.lineHeight;
          if (n.letterSpacing !== figma.mixed) st.letterSpacing = n.letterSpacing;
          lt.push(st);
        } else await figma.loadFontAsync(st.fontName);
        textId[key] = st.id;
      }
      await n.setTextStyleIdAsync(textId[key]); nt++;
    }
    if (!('fills' in n) || !Array.isArray(n.fills) || n.fills.length !== 1) continue;
    const p = n.fills[0];
    if (p.type === 'GRADIENT_LINEAR') { await n.setFillStyleIdAsync(gs.id); np++; }
  }
  return { paint: np, text: nt };
}

// ================= Colores del logo (cuando el archivo no tiene Color styles) =================
function logoColors(page) {
  const names = [BRAND.logos.square, BRAND.logos.horiz, BRAND.logos.symbol];
  const node = names.map(n => page.findOne(x => x.name === n)).find(Boolean);
  if (!node) return null;
  const count = {};
  const walkC = (k) => {
    if (k.visible === false) return;
    if (Array.isArray(k.fills)) k.fills.forEach(p => {
      if (p.type !== 'SOLID' || p.visible === false) return;
      const h = toHex(p.color); count[h] = (count[h] || 0) + 1;
    });
    if ('children' in k) k.children.forEach(walkC);
  };
  walkC(node);
  const colors = Object.keys(count);
  const sat = h => { const c = hex(h); return Math.max(c.r, c.g, c.b) - Math.min(c.r, c.g, c.b); };
  const brand = colors.filter(h => sat(h) > 0.15).sort((a, b) => count[b] - count[a]);
  const darks = colors.filter(h => lum(hex(h)) < 0.2).sort((a, b) => lum(hex(a)) - lum(hex(b)));
  if (!brand.length && !darks.length) return null;
  // logo monocromo (sin color saturado): el oscuro del logo es el principal
  const primary = brand.length
    ? [{ name: tr('Основной'), hex: brand[0] }].concat(brand.slice(1, 3).map((h, i) => ({ name: tr('Дополнительный ') + (i + 1), hex: h })))
    : [{ name: tr('Основной'), hex: darks[0] }];
  const neutral = [{ name: tr('Тёмный'), hex: darks[0] || '#1F1F1F' }, { name: tr('Белый'), hex: '#FFFFFF' }];
  return [{ name: 'Primary Colors', items: primary }, { name: 'Neutral Colors', items: neutral }];
}

// ================= Paso 1: preparar el logo =================
// A partir de las versiones que el diseñador marca (selección), crea en la página «Logo System»:
// componentes Logo-Square / Logo-Horizontal / symbol y sus versiones _black, _white, _Safe y _Grid.
// Si falta una versión del logo, cuál usar en su lugar (logo de solo texto, sin símbolo, etc.)
const LOGO_ALIAS = { 'Logo-Square': ['Logo-Horizontal'], 'Logo-Horizontal': ['Logo-Square'], 'symbol': ['Logo-Square', 'Logo-Horizontal'] };
const ROLE_KEYS = { square: 'Logo-Square', horiz: 'Logo-Horizontal', symbol: 'symbol' };
const GRID_GREY = '#BBBBBB';

// Colores marcados en el panel: el primer relleno sólido de cada muestra seleccionada
async function pickedColors() {
  let ids = [];
  try { ids = JSON.parse(figma.root.getPluginData('obb-colors') || '[]'); } catch (e) { ids = []; }
  const out = [];
  for (const id of ids) {
    const n = await figma.getNodeByIdAsync(id); if (!n) continue;
    const nodes = [n].concat(n.findAll ? n.findAll(k => 'fills' in k) : []);
    for (const k of nodes) {
      const p = Array.isArray(k.fills) && k.fills.find(f => f.type === 'SOLID' && f.visible !== false);
      if (p) { const h = toHex(p.color); if (out.indexOf(h) < 0) out.push(h); break; }
    }
  }
  return out;
}

function loadRoles() {
  try { return JSON.parse(figma.root.getPluginData('obb-roles') || '{}'); } catch (e) { return {}; }
}
function saveRoles(roles) { figma.root.setPluginData('obb-roles', JSON.stringify(roles)); }

function recolorAll(n, h) {
  [n].concat(n.findAll ? n.findAll() : []).forEach(k => {
    if ('fills' in k && Array.isArray(k.fills) && k.fills.length) k.fills = k.fills.every(isLight) ? [] : solid(h);
    if ('strokes' in k && Array.isArray(k.strokes) && k.strokes.length) k.strokes = solid(h);
  });
}

// Tiñe una instancia mirando el maestro: lo claro del logo queda hueco, lo demás toma el color h.
// Así se puede repetir sin que la versión blanca desaparezca.
function tintLike(inst, base, h) {
  const a = [inst].concat(inst.findAll()), b = base ? [base].concat(base.findAll()) : [];
  if (a.length !== b.length) return recolorAll(inst, h);
  a.forEach((k, i) => {
    const o = b[i];
    if ('fills' in k && Array.isArray(o.fills) && o.fills.length) k.fills = o.fills.every(isLight) ? [] : solid(h);
    if ('strokes' in k && Array.isArray(o.strokes) && o.strokes.length) k.strokes = solid(h);
  });
}

function makeComponent(name, w, h) {
  const c = figma.createComponent();
  c.name = name; c.resize(Math.max(1, w), Math.max(1, h)); c.fills = []; c.clipsContent = false;
  return c;
}

function line(parent, x1, y1, x2, y2, color, weight) {
  const l = figma.createLine();
  const len = Math.hypot(x2 - x1, y2 - y1);
  l.resize(Math.max(len, 0.01), 0);
  l.strokes = solid(color); l.strokeWeight = weight || 1;
  parent.appendChild(l);
  l.x = x1; l.y = y1;
  l.rotation = -Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  return l;
}

// ¿Es un elemento de construcción (grid, guía, safe area) y no parte del logo?
const CONSTRUCTION_NAME = /grid|guide|safe|construct|helper|сетк|направл|охран|построен/i;
function isConstruction(k, strict) {
  if (k.visible === false) return true;
  if (CONSTRUCTION_NAME.test(k.name)) return true;
  if (k.type === 'LINE') return true;
  const fills = Array.isArray(k.fills) ? k.fills.filter(p => p.visible !== false) : [];
  const strokes = Array.isArray(k.strokes) ? k.strokes.filter(p => p.visible !== false) : [];
  if ('width' in k && Math.min(k.width, k.height) <= 1.5 && Math.max(k.width, k.height) >= 12) return true;
  if (strokes.length && Array.isArray(k.dashPattern) && k.dashPattern.length) return true;           // contorno discontinuo
  if (k.type !== 'FRAME' && k.type !== 'GROUP' && fills.length && fills.every(p => (p.opacity !== undefined ? p.opacity : 1) < 0.3)) return true; // velo semitransparente
  if (!strict) return false;
  const isGreyC = c => Math.abs(c.r - c.g) < 0.03 && Math.abs(c.g - c.b) < 0.03 && c.r > 0.35 && c.r < 0.95;
  if ((k.type === 'ELLIPSE' || k.type === 'RECTANGLE') && !fills.length && strokes.length) return true; // círculo/caja solo contorno
  if (fills.concat(strokes).some(p => p.type === 'SOLID' && isGreyC(p.color)) && !fills.concat(strokes).some(p => p.type === 'SOLID' && !isGreyC(p.color))) return true;
  return false;
}
// Quita (en una copia) todo lo de construcción; devuelve cuántos elementos quitó
function stripConstruction(root, strict) {
  let removed = 0;
  const visit = n => {
    if (!('children' in n) || n.type === 'INSTANCE') return;
    for (const c of n.children.slice()) {
      if (isConstruction(c, strict)) { c.remove(); removed++; }
      else visit(c);
    }
  };
  visit(root);
  return removed;
}
// Caja que ocupan las formas visibles (sin el marco que las contiene)
function contentBox(root) {
  const leaves = 'findAll' in root ? root.findAll(k => !('children' in k) || k.type === 'INSTANCE') : [];
  const boxes = (leaves.length ? leaves : [root]).map(k => k.absoluteBoundingBox).filter(b => b && b.width > 0 && b.height > 0);
  if (!boxes.length) return null;
  const x1 = Math.min(...boxes.map(b => b.x)), y1 = Math.min(...boxes.map(b => b.y));
  const x2 = Math.max(...boxes.map(b => b.x + b.width)), y2 = Math.max(...boxes.map(b => b.y + b.height));
  return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
}

async function prepareLogo(opts) {
  const autoGrid = !opts || opts.autoGrid !== false;
  const roles = loadRoles();
  if (!roles.square && !roles.horiz) throw Object.assign(new Error('Сначала выберите основной логотип'), { code: 'needMain' });
  const page = figma.root.children.find(p => p.name === 'Logo System') || figma.createPage();
  page.name = 'Logo System';
  const notes = [];
  const created = [];
  let col = 0;
  const X0 = 100, ROW = 0;
  for (const role of ['square', 'horiz', 'symbol']) {
    if (!roles[role]) continue;
    const srcNode = await figma.getNodeByIdAsync(roles[role]);
    if (!srcNode) continue;
    const base = ROLE_KEYS[role];
    const ob = srcNode.absoluteBoundingBox;
    // versión limpia: copia sin grids/guías/safe area (primero estricto; si no queda nada, solo lo evidente)
    let clean = srcNode.clone(), removed = stripConstruction(clean, true);
    let cb = contentBox(clean);
    if (!cb) { clean.remove(); clean = srcNode.clone(); removed = stripConstruction(clean, false); cb = contentBox(clean); }
    if (!cb) { clean.remove(); clean = srcNode.clone(); removed = 0; cb = clean.absoluteBoundingBox; }
    const hasOwnGrid = removed > 0;
    // fondos claros dentro del logo (p. ej. un rectángulo blanco detrás del texto) no son parte del logo
    clean.findAll(k => (k.type === 'RECTANGLE' || k.type === 'FRAME') && Array.isArray(k.fills) && k.fills.length && k.fills.every(isLight)
      && (k.type === 'FRAME' || (k.parent && k.parent.children.length > 1 && k.parent.children[0] === k))).forEach(k => { k.fills = []; }); // solo si está debajo de todo (fondo)
    if (Array.isArray(clean.fills) && clean.fills.length && clean.fills.every(isLight)) clean.fills = [];
    // ¿el logo ya venía con aire alrededor (safe area propia)? → ese margen es el módulo x
    const margins = ob && cb ? [cb.x - ob.x, cb.y - ob.y, ob.x + ob.width - cb.x - cb.width, ob.y + ob.height - cb.y - cb.height] : [0];
    const ownSafe = Math.min(...margins);
    let w = cb.width, h = cb.height;
    let x = ownSafe > Math.min(w, h) * 0.05 ? Math.round(ownSafe) : Math.round(Math.min(w, h) * 0.25);
    // El símbolo se prepara como avatar: cuadrado de 96 px con el signo centrado (60 % del lado);
    // su área de protección y su grid van DENTRO del cuadrado
    const AV = 96, isAvatar = role === 'symbol';

    await figma.setCurrentPageAsync(page);
    // quitar versiones anteriores del mismo logo (se regeneran)
    page.findAll(n => n.type === 'COMPONENT' && (n.name === base || n.name.indexOf(base + '_') === 0)).forEach(n => n.remove());
    // componente principal: solo el logo, recortado a su forma
    const cloneBox = clean.absoluteBoundingBox;
    let main;
    if (isAvatar) {
      const k = (AV * 0.6) / Math.max(w, h);
      main = makeComponent(base, AV, AV);
      main.appendChild(clean); clean.rescale(k);
      clean.x = (AV - w * k) / 2 + (cloneBox.x - cb.x) * k; clean.y = (AV - h * k) / 2 + (cloneBox.y - cb.y) * k;
      x = Math.round((AV - Math.max(w, h) * k) / 2); // módulo = el aire del avatar
      w = AV; h = AV;
    } else {
      main = makeComponent(base, w, h);
      main.appendChild(clean); clean.x = cloneBox.x - cb.x; clean.y = cloneBox.y - cb.y;
    }
    const inset = isAvatar ? 0 : x;            // dónde va el logo dentro de _Safe / _Grid
    const outW = isAvatar ? AV : w + 2 * x, outH = isAvatar ? AV : h + 2 * x;
    page.appendChild(main);
    const slotW = w + 2 * x + 160;
    const left = X0 + col; col += slotW;
    main.x = left + x; main.y = ROW + x;
    created.push(base);
    if (opts && opts.minimal) { notes.push({ role, minimal: true }); continue; }
    // versiones monocromas
    const darkOfLogo = (() => {
      const fills = [];
      main.findAll(k => Array.isArray(k.fills)).forEach(k => k.fills.forEach(p => { if (p.type === 'SOLID' && p.visible !== false) fills.push(toHex(p.color)); }));
      return fills.filter(h => lum(hex(h)) < 0.2).sort((a, b) => lum(hex(a)) - lum(hex(b)))[0] || '#1F1F1F';
    })();
    [['_black', darkOfLogo], ['_white', '#FFFFFF']].forEach(([suf, color], i) => {
      const c = makeComponent(base + suf, w, h);
      const inst = main.createInstance(); c.appendChild(inst); inst.x = 0; inst.y = 0; recolorAll(inst, color);
      page.appendChild(c); c.x = left + x; c.y = ROW + (h + 2 * x + 120) * (i + 1);
      created.push(base + suf);
    });
    // campo de protección (_Safe)
    const safe = makeComponent(base + '_Safe', outW, outH);
    const zone = figma.createRectangle(); zone.fills = solid('#E93F3F', 0.06);
    zone.strokes = solid('#E93F3F'); zone.dashPattern = [4, 3]; zone.strokeWeight = 0.5;
    if (isAvatar) { zone.resize(AV - 2 * x, AV - 2 * x); safe.appendChild(zone); zone.x = x; zone.y = x; }
    else { zone.resize(outW, outH); safe.appendChild(zone); }
    const si = main.createInstance(); safe.appendChild(si); si.x = inset; si.y = inset;
    if (isAvatar) safe.insertChild(0, si); // el área por encima del símbolo
    page.appendChild(safe); safe.x = left; safe.y = ROW + (h + 2 * x + 120) * 3;
    created.push(base + '_Safe');
    // grid de construcción (_Grid): el del diseñador, o automático solo si se pidió
    const grid = (hasOwnGrid || autoGrid) ? makeComponent(base + '_Grid', outW, outH) : null;
    if (!grid) {} else if (hasOwnGrid) {
      // el grid del diseñador se respeta tal cual
      const own = srcNode.clone(); grid.appendChild(own);
      own.x = inset + (ob.x - cb.x); own.y = inset + (ob.y - cb.y);
    } else {
      // grid automático: caja, módulos x, ejes y círculos de las formas redondas
      // líneas de 0,5 px
      const gi = main.createInstance(); grid.appendChild(gi); gi.x = inset; gi.y = inset;
      const bw = isAvatar ? AV - 2 * x : w, bh = isAvatar ? AV - 2 * x : h;
      const gr = figma.createRectangle(); gr.resize(bw, bh); gr.fills = []; gr.strokes = solid(GRID_GREY); gr.strokeWeight = 0.5; grid.appendChild(gr); gr.x = x; gr.y = x;
      for (let gx = 0; gx <= outW + 0.5; gx += x) line(grid, gx, 0, gx, outH, GRID_GREY, 0.5);
      for (let gy = 0; gy <= outH + 0.5; gy += x) line(grid, 0, gy, outW, gy, GRID_GREY, 0.5);
      line(grid, outW / 2, 0, outW / 2, outH, '#E93F3F', 0.5);
      line(grid, 0, outH / 2, outW, outH / 2, '#E93F3F', 0.5);
      const shapes = main.findAll(k => k.visible !== false && 'absoluteBoundingBox' in k && k.absoluteBoundingBox);
      const mb = main.absoluteBoundingBox;
      let circles = 0;
      shapes.forEach(k => {
        const b = k.absoluteBoundingBox; if (!b || !mb) return;
        const ratio = b.width / b.height;
        if (ratio < 0.85 || ratio > 1.15 || b.width < Math.min(w, h) * 0.2 || circles >= 6) return;
        const e = figma.createEllipse(); e.resize(b.width, b.height); e.fills = []; e.strokes = solid(GRID_GREY); e.strokeWeight = 0.5;
        grid.appendChild(e); e.x = inset + (b.x - mb.x); e.y = inset + (b.y - mb.y); circles++;
      });
    }
    if (grid) { page.appendChild(grid); grid.x = left; grid.y = ROW + (h + 2 * x + 120) * 4; created.push(base + '_Grid'); }
    // el panel traduce estas notas a su idioma
    notes.push({ role, grid: hasOwnGrid ? 'own' : autoGrid ? 'auto' : 'none', safe: ownSafe > Math.min(w, h) * 0.05 ? 'layout' : 'quarter' });
  }
  figma.viewport.scrollAndZoomIntoView(page.children);
  return { created, notes };
}

// ================= Panel =================
async function startUI() {
  figma.showUI(__html__, { width: 360, height: 640, themeColors: true });
  const fonts = await figma.listAvailableFontsAsync();
  const families = Array.from(new Set(fonts.map(f => f.fontName.family))).sort();
  // Cada apertura empieza desde cero: sin logos elegidos ni campos rellenados de antes
  saveRoles({});
  figma.root.setPluginData('obb-colors', '[]');
  figma.root.setPluginData('obb-options', '');
  const lang = await figma.clientStorage.getAsync('obb-lang');
  figma.ui.postMessage({ type: 'init', lang, families, roles: {}, options: {} });

  const sendSelection = () => {
    const sel = figma.currentPage.selection;
    figma.ui.postMessage({ type: 'selection', count: sel.length, name: sel.length === 1 ? sel[0].name : '' });
  };
  figma.on('selectionchange', sendSelection);
  sendSelection();

  figma.ui.onmessage = async (msg) => {
    try {
      if (msg.type === 'lang') { await figma.clientStorage.setAsync('obb-lang', msg.lang); return; }
      if (msg.type === 'assign' && msg.role === 'colors') {
        // varias muestras a la vez: en el orden en que están en el lienzo (de arriba abajo, de izquierda a derecha)
        const sel = figma.currentPage.selection.slice().sort((a, b) => (a.absoluteBoundingBox.y - b.absoluteBoundingBox.y) || (a.absoluteBoundingBox.x - b.absoluteBoundingBox.x));
        if (!sel.length) { figma.ui.postMessage({ type: 'error', code: 'selectColors' }); return; }
        figma.root.setPluginData('obb-colors', JSON.stringify(sel.map(n => n.id)));
        const hexes = await pickedColors();
        figma.ui.postMessage({ type: 'assigned', role: 'colors', name: hexes.join(' · ') || sel.length });
        return;
      }
      if (msg.type === 'assign') {
        const sel = figma.currentPage.selection;
        if (sel.length !== 1) { figma.ui.postMessage({ type: 'error', code: 'selectOne' }); return; }
        const r = loadRoles(); r[msg.role] = sel[0].id; saveRoles(r);
        figma.ui.postMessage({ type: 'assigned', role: msg.role, name: sel[0].name });
      }
      if (msg.type === 'prepare') {
        const r = await prepareLogo(msg);
        figma.ui.postMessage({ type: 'prepared', count: r.created.length, notes: r.notes });
      }
      if (msg.type === 'generate') {
        const o = msg.options || {};
        figma.root.setPluginData('obb-options', JSON.stringify(o));
        LANG = ['ru', 'en', 'es'].indexOf(o.bbLang) >= 0 ? o.bbLang : 'ru';
        BRAND.name = o.name || tr('Название бренда');
        if (o.fontHead) BRAND.fontHead = { family: o.fontHead, style: 'Bold' };
        if (o.fontBody) BRAND.fontBody = { family: o.fontBody, style: 'Regular' };
        const ph = {
          purpose: '[Текст: назначение документа — для кого руководство и как им пользоваться]', company: '[Текст: о компании — чем занимается, для кого, чем отличается]',
          idea: '[Текст: идея визуальной идентичности — что означает знак]', tone: '[Текст: тон коммуникации — 3–4 принципа и примеры фраз]'
        };
        ['company', 'idea', 'tone', 'purpose'].forEach(k => { BRAND.txt[k] = o[k] || tr(ph[k]); });
        const smp = textSamples(o.company);
        BRAND.txt.posts = smp.posts; BRAND.txt.sample = smp.sample;
        BRAND.useFileStyles = !o.ignoreStyles;
        const isLogo = n => n.name === BRAND.logos.square || n.name === BRAND.logos.horiz;
        let lsp = figma.root.children.find(p => p.name === 'Logo System');
        if (lsp) await lsp.loadAsync();
        if (!figma.currentPage.findOne(isLogo) && !(lsp && lsp.findOne(isLogo))) {
          // sin paso 1: el logo igualmente se convierte en componente (solo la versión limpia)
          const r = loadRoles();
          if (!r.square && !r.horiz) {
            const sel = figma.currentPage.selection;
            if (sel.length !== 1) { figma.ui.postMessage({ type: 'error', code: 'selectLogo' }); return; }
            r.square = sel[0].id; saveRoles(r);
            figma.ui.postMessage({ type: 'assigned', role: 'square', name: sel[0].name });
          }
          await prepareLogo({ autoGrid: false, minimal: true });
          lsp = figma.root.children.find(p => p.name === 'Logo System');
        }
        if (lsp && !figma.currentPage.findOne(isLogo)) await figma.setCurrentPageAsync(lsp);
        await main();
      }
    } catch (e) {
      figma.ui.postMessage({ type: 'error', code: e.code, text: e.message });
    }
  };
}

startUI().catch(e => figma.closePlugin('Ошибка: ' + e.message));
