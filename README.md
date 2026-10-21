# OneClick Brandbook

**A Figma plugin that turns one logo into a ready brandbook — in two steps, without AI.**
Free · works in free Figma · no sign-up · panel and brandbook in Russian, English and Spanish.

Landing page: [English](https://denis.espinoza.ru/en/oneclick-brandbook/) · [Русский](https://denis.espinoza.ru/oneclick-brandbook/) · [Español](https://denis.espinoza.ru/es/oneclick-brandbook/) · [Русская версия ниже](#по-русски)

## What it does

1. **Prepares your logo.** Click your logo on the canvas and press “This one”. The plugin creates a *Logo System* page with a clean component plus black, white, clear-space (`_Safe`) and grid (`_Grid`) versions. If your logo already has a grid or clear space, it uses yours and removes them from the clean version. The original is never touched.
2. **Builds the brandbook.** Pick a brandbook language, brand name and fonts, and press “Create brandbook”. You get 21–23+ vertical 1080 × 1920 pages:

| Section | Pages |
|---|---|
| Presentation | Cover, purpose, about the company, identity idea, brand symbol |
| Logo | Primary and horizontal versions, monochrome, clear space, minimum size, backgrounds, incorrect use |
| Color | Every color with HEX, RGB, CMYK (and Pantone if set), tints and proportions |
| Iconography | If the file has an `Icons` frame |
| Typography | Fonts, hierarchy, headings alphabet, body text |
| Pattern | Grid, checker and diagonal, built from three editable components |
| Application | Social media posts and tone of voice |
| Closing | Brand-color closing page |

Pages for the symbol or the horizontal version are skipped when your logo doesn’t have them.

**Everything stays editable and connected:**
- Fixed frames with absolute positioning, **zero Auto Layout**.
- Logos are **instances of components**: change the component and the whole brandbook updates.
- Colors and fonts come from your file’s **Color styles and Text styles**. Without styles, colors are taken from the logo itself and styles are created for you; solid fills are linked to them, so changing a style recolors everything.

## Install (development plugin)

1. Download this repository (**Code → Download ZIP**) and unzip it.
2. In **Figma Desktop**: *Plugins → Development → Import plugin from manifest…* and choose `manifest.json`.
3. Run it: *Plugins → Development → OneClick Brandbook*.

## Best results

- Logo in outlines: text converted to outlines, strokes to fills.
- Solid color fills. If the file has Color styles, the logo is linked to them.
- Nothing extra: remove hidden layers, backgrounds and helper objects.
- You can keep your grid and clear space — the plugin recognizes them (layers named Grid / Safe, thin lines, dashed outlines).

**Not supported yet:** image logos (PNG, JPG) can’t be recolored; gradients work but aren’t linked to styles; components with variants use the selected variant; colors of logos from external libraries aren’t linked.

The texts you type (about the company, idea, tone) are not translated — write them in the brandbook language.

## Support the project

The plugin is free. If it saves you time: [support it on CloudTips](https://pay.cloudtips.ru/p/945dde54).

Made by [Denis Espinoza](https://denis.espinoza.ru/en/) — brand designer. License: [MIT](LICENSE).

---

## По-русски

**Плагин для Figma: из одного логотипа — готовый брендбук за два шага, без ИИ.** Страница плагина: [denis.espinoza.ru/oneclick-brandbook](https://denis.espinoza.ru/oneclick-brandbook/). Бесплатно, работает в бесплатной Figma, без регистрации. Панель и брендбук — на русском, английском или испанском.

1. **Подготовка логотипа.** Кликните по логотипу на холсте и нажмите «Это он». Плагин создаст страницу *Logo System*: компонент, чёрную и белую версии, охранное поле и сетку. Если сетка или охранное поле уже есть в макете — возьмёт ваши. Оригинал не меняется.
2. **Брендбук.** Выберите язык, название и шрифты, нажмите «Создать брендбук» — 21–23+ страницы 1080 × 1920, без Auto Layout, логотип связан с компонентами, цвета — со стилями.

**Установка:** скачайте репозиторий (Code → Download ZIP), в Figma Desktop — *Plugins → Development → Import plugin from manifest…* → `manifest.json`.

**Как получить лучший результат:** логотип в кривых, сплошные заливки, без скрытых слоёв и подложек. Сетку и охранное поле можно оставить. Пока не поддерживаются логотипы-картинки (PNG, JPG); градиенты не привязываются к стилям.

Поддержать проект: [CloudTips](https://pay.cloudtips.ru/p/945dde54) · Автор — [Денис Эспиноза](https://denis.espinoza.ru).
