# Repository guide for coding agents

## Start here

- Work from this directory: the repository root is the folder containing this file and `package.json`. Do not run project commands from its parent directory.
- Read the relevant component and its existing styles before editing. Check `git status` first and preserve unrelated user changes; do not clean, reset, or overwrite files to make setup easier.
- This is a pnpm project. Install from the root with `pnpm install`; use `pnpm dev` to start the Vite development server. Vite is configured for port 3000 and may select another port if that one is busy; use the URL printed by the dev server rather than assuming a port.
- `pnpm build` creates the production bundle. `pnpm lint` runs TypeScript checking (`tsc --noEmit`); it is not an ESLint command.

## Environment and services

- `.env.example` lists the supported environment variables. Copy the needed entries into a local `.env.local`; `.env*` files are ignored by Git except `.env.example`.
- Supabase auth uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. See [`resources/SUPABASE_AUTH_SETUP.md`](resources/SUPABASE_AUTH_SETUP.md) for provider and callback setup. Restart Vite after changing env values.
- Vite exposes `VITE_*` values in browser code. Use only a Supabase publishable/anon key there; never put a service-role key in a `VITE_*` variable or commit secrets.
- The AI support endpoint needs `GEMINI_API_KEY` on the server. Keep it server-side; do not rename it to a `VITE_*` variable. The Vite dev plugin serves `/api/chat`, and `server.ts` serves the built app and the same endpoint in production.
- Without Supabase credentials, the app can still load, but real authentication is unavailable. Do not report OTP, email, or Google auth as verified unless the corresponding Supabase providers and OAuth/SMS settings are configured.

## UI conventions

- The desktop and mobile navigation are separate in `src/components/Navigation.tsx`. `NAV_ITEMS` supplies the labels and icons to both. Keep requested desktop-only changes in `DesktopNav`; do not unintentionally redesign `MobileBottomNav`.
- Keep changes scoped to the requested part of the interface. In particular, changes to navigation should not alter the logo, theme switch, login button, or unrelated page content unless explicitly requested.
- The visual theme is shared across light and dark modes. Check both when changing colors, focus states, or animation. Respect the existing reduced-motion handling.
- Tailwind CSS v4 is loaded through `@tailwindcss/vite` and `src/index.css`; keep project-wide CSS there and use the existing Tailwind conventions in components.
- Keep the product copy concise and use plain, recognizable labels. Navigation labels should describe the destination without requiring users to decode internal abbreviations.

## Before handing work back

- Review the diff and make sure only intended files changed. Run `git diff --check` after edits.
- When UI work is requested, use the running preview if available and the actual URL shown by Vite. Do not start duplicate dev servers unnecessarily.
- Do not commit or push unless the user asks. Never include local environment files, API keys, or generated build output in a commit.
