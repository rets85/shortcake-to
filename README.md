# shortcake.to — URL Shortener SaaS

A modern, fast URL shortener with unlimited links, click tracking, and a beautiful dashboard.

**Live:** https://shortcake.to

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js v5 (email/password + Google OAuth)
- **Payments:** Stripe (subscriptions, webhooks)
- **Styling:** Tailwind CSS + `tailwindcss-animate`
- **Deployment:** Railway

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL (local or via Railway)

### Installation

1. Clone the repo:
```bash
git clone https://github.com/rets85/shortcake-to.git
cd shortcake-to
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and fill in your credentials:
```bash
cp .env.example .env
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Run the dev server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Yes | Random 32+ char string for JWT signing |
| `NEXTAUTH_URL` | Yes | Base URL (http://localhost:3000 locally) |
| `GOOGLE_CLIENT_ID` | Yes | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Yes | Google OAuth client secret |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret API key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook signing secret |
| `STRIPE_PRICE_ID` | Yes | Stripe price ID for $9/month plan |
| `NEXT_PUBLIC_APP_URL` | Yes | Public app URL (used in emails, links) |

## Features

### Landing Page
- Hero section with CTA
- Feature cards
- Pricing breakdown
- Static mini demo widget

### Auth
- Email/password registration & login
- Google OAuth
- NextAuth.js v5 session management

### Dashboard
- Create short links with custom slugs (auto-generated if blank)
- View all links with click counts
- Edit destination, slug, enabled/disabled status
- Delete links with confirmation
- Real-time click tracking
- Copy short link to clipboard

### Billing
- Stripe Checkout integration ($9/month subscription)
- Customer Portal for payment management
- Webhook handling for subscription events
- Subscription status tracking

### Redirect Handler
- Edge-friendly lookup and 301 redirect
- Click counting (fire-and-forget, non-blocking)
- Disabled link handling (404 redirect)

## Project Structure

```
src/
├── app/
│   ├── (marketing)/        # Landing, privacy, terms
│   ├── (auth)/             # Login, signup pages
│   ├── (app)/              # Dashboard, billing (protected)
│   ├── api/
│   │   ├── auth/           # NextAuth routes, signup
│   │   ├── links/          # Link CRUD
│   │   └── stripe/         # Stripe webhooks, checkout
│   ├── [slug]/             # Redirect handler
│   └── 404/                # 404 page
├── components/
│   ├── layout/             # Nav, sidebar, top bar
│   └── ui/                 # Logo, icons, toast
├── lib/
│   ├── auth.ts             # NextAuth config
│   ├── prisma.ts           # Prisma client singleton
│   └── stripe.ts           # Stripe client
├── types/                  # TypeScript declarations
└── middleware.ts           # Auth & subscription checks
```

## Database Schema

See `prisma/schema.prisma` for the full schema. Key models:

- **User** — Auth + Stripe subscription data
- **Link** — Short links with slug, destination, clicks
- **Account, Session, VerificationToken** — NextAuth models

## API Routes

### Auth
- `POST /api/auth/signup` — Register with email/password
- `POST /api/auth/[...nextauth]` — NextAuth callbacks

### Links (all require auth + active subscription)
- `GET /api/links` — Fetch all user links
- `POST /api/links` — Create new link
- `PATCH /api/links/[id]` — Update link
- `DELETE /api/links/[id]` — Delete link

### Stripe
- `POST /api/stripe/checkout` — Create checkout session
- `POST /api/stripe/portal` — Create billing portal session
- `POST /api/stripe/webhook` — Handle webhook events

### Public
- `GET /[slug]` — Redirect handler

## Development

### Run Tests
```bash
npm run test
```

### Lint & Format
```bash
npm run lint
npm run format
```

### Build
```bash
npm run build
npm run start
```

## Deployment to Railway

1. Link to Railway:
```bash
railway link
```

2. Add Postgres service to the project

3. Set environment variables via Railway dashboard

4. Deploy:
```bash
railway up --detach
```

## Features in Roadmap

- [ ] Link analytics dashboard (charts, trends)
- [ ] Custom domains
- [ ] QR codes
- [ ] Team billing
- [ ] API for programmatic link creation

## Contributing

Not open for contributions yet, but feel free to report issues.

## License

Proprietary — © 2026 shortcake.to

## Support

For issues, email support@shortcake.to or open an issue on GitHub.
