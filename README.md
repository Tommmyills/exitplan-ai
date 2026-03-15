# 🌍 ExitPlan AI

> **Find the Best Country to Move to in 60 Seconds**  
> AI-powered relocation recommendations for Americans moving abroad.

Built with Next.js 14, Tailwind CSS, Claude AI (Anthropic), Stripe, and Supabase.

---

## ✨ Features

- **7-Question Relocation Quiz** — Budget, climate, remote work status, healthcare, language, region, lifestyle
- **AI Recommendation Engine** — Claude analyzes answers and returns top 3 countries with scores
- **Country Intelligence** — Visa options, cost of living, pros/cons, best cities, 90-day relocation plan
- **Premium Upgrade ($19)** — Full visa steps, housing sites, neighborhoods, tax info, healthcare setup
- **Stripe Payments** — Secure checkout via Stripe
- **Supabase Database** — Stores quiz responses, plans, and payment status
- **Country Data** — 8 curated countries: Portugal, Spain, Mexico, Thailand, Costa Rica, Germany, Georgia, Colombia

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/exitplan-ai.git
cd exitplan-ai
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Fill in your `.env.local`:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase-schema.sql`
3. Copy your project URL and anon key to `.env.local`

### 4. Set Up Stripe

1. Create an account at [stripe.com](https://stripe.com)
2. Get your test keys from the Stripe Dashboard
3. Add them to `.env.local`

### 5. Get Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an API key
3. Add it to `.env.local`

### 6. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
exitplan-ai/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── quiz/
│   │   │   └── page.tsx          # Multi-step quiz
│   │   ├── results/
│   │   │   └── page.tsx          # AI results dashboard
│   │   └── api/
│   │       ├── recommend/
│   │       │   └── route.ts      # Claude AI recommendation endpoint
│   │       └── stripe/
│   │           └── route.ts      # Stripe checkout endpoint
│   ├── lib/
│   │   ├── countryData.ts        # Country database (8 countries)
│   │   └── supabase.ts           # Supabase client & helpers
│   └── types/
│       └── index.ts              # TypeScript types
├── supabase-schema.sql           # Database schema
├── .env.example                  # Environment template
├── vercel.json                   # Vercel config
└── README.md
```

---

## 🌐 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/exitplan-ai)

### Manual Deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

When prompted, add your environment variables in the Vercel dashboard:
- `ANTHROPIC_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_BASE_URL` → set to your Vercel domain (e.g. `https://exitplan-ai.vercel.app`)

---

## 💳 Stripe Webhook (Optional — for production)

To reliably update premium status after payment:

1. In Stripe Dashboard → Webhooks → Add endpoint
2. URL: `https://yourdomain.com/api/stripe/webhook`
3. Events to listen for: `checkout.session.completed`

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| AI | Anthropic Claude (claude-opus-4-5) |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe Checkout |
| Fonts | Playfair Display + DM Sans + DM Mono |
| Icons | Lucide React |
| Deploy | Vercel |

---

## 🗺 Countries in Database

| Country | Region | Cost Range | Climate |
|---------|--------|------------|---------|
| 🇵🇹 Portugal | Europe | $1,800–$3,500/mo | Mild |
| 🇪🇸 Spain | Europe | $2,000–$4,000/mo | Warm |
| 🇲🇽 Mexico | Latin America | $1,200–$2,800/mo | Warm |
| 🇹🇭 Thailand | Asia | $1,000–$2,500/mo | Warm |
| 🇨🇷 Costa Rica | Latin America | $1,500–$3,200/mo | Warm |
| 🇩🇪 Germany | Europe | $2,500–$5,000/mo | Cold |
| 🇬🇪 Georgia | Europe | $800–$2,000/mo | Mild |
| 🇨🇴 Colombia | Latin America | $1,000–$2,500/mo | Mild |

---

## 💰 Monetization

- **Free tier:** Top 3 country recommendations + 90-day plan
- **Premium ($19 one-time):** Full visa steps, housing sites, neighborhoods, tax guide, healthcare setup, timeline checklist

---

## 📝 Legal Note

Always include a disclaimer that this is informational only and users should consult an immigration attorney. The app includes this by default.

---

## 🛠 Customization

### Add More Countries
Edit `src/lib/countryData.ts` — add a new entry following the same structure.

### Change the Price
Edit `src/app/api/stripe/route.ts` — change `unit_amount: 1900` (in cents).

### Modify AI Prompt
Edit `src/app/api/recommend/route.ts` — update the `prompt` variable to change what the AI generates.

---

Built by VibeCo 🚀
