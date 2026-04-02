# polemil.dev

My personal portfolio — a colorful, animated, interactive website built to showcase who I am, what I do, and what I love.

**[polemil.dev](https://polemil.dev)**

## What's inside

The site is split into distinct, color-coded sections that you navigate through like pages of a book:

- **Profile** — a quick intro with an interactive profile card
- **Projects** — a carousel of things I've built, with live links and tech breakdowns
- **Timeline** — my professional journey from agency work to freelance
- **Stack** — technologies, know-how, and soft skills organized in filterable tabs
- **Hobbies** — a circular carousel of the things I enjoy outside of code (worldbuilding, writing, music, drawing, cooking...)
- **Contact** — a form to reach me directly

Every page has its own personality — background color, layout, and animations.

## Built with

- **Next.js 14** + **TypeScript** + **React 18**
- **Tailwind CSS** + **SCSS** for styling
- **Framer Motion** for page transitions and micro-interactions
- **Lottie** for playful illustrated animations
- **Apollo Client** + **GraphQL** to fetch content from a custom backend
- **i18next** for internationalization (FR / EN / RU) with localStorage caching (stale-while-revalidate)
- **React Slick** + **React Swipeable** for carousels and touch gestures

## Highlights

- Smooth page transitions with staggered animations
- Swipe navigation on mobile
- Hover effects everywhere — bubble bursts, tilt-shake, rotating borders, floating icons
- Fully responsive with a mobile-first approach
- Content served from a custom GraphQL API at `graphql.polemil.dev`

## i18n caching

Translations are fetched from the API and cached in the browser's localStorage via `i18next-chained-backend` + `i18next-localstorage-backend`. On subsequent visits, cached translations are served instantly while the app revalidates in the background after 24 hours.

To clear the cache manually, remove `i18next_res_*` keys from localStorage in DevTools.

## Running locally

```bash
pnpm install
pnpm dev
```

Then open [localhost:3000](http://localhost:3000).

## Author

**Polémil Moreau** — Front-end developer, freelance  
[polemil.dev](https://polemil.dev)
