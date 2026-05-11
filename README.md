# Philoo landing page

A multilingual Next.js App Router implementation of the supplied Philoo landing page mockup.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

## Routes

- `/` detects the saved or browser language in the client and redirects to `/nl` or `/en`.
- `/nl` renders the Dutch page.
- `/en` renders the English page.

Manual language choices are stored in `localStorage` with the key `philoo-language`.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
```
