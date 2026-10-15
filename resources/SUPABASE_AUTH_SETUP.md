# Supabase authentication setup

The login modal supports Student Mentee and Mentor accounts, email/password signup and login, and Google OAuth. To connect it to a Supabase project:

1. Create a Supabase project and copy its Project URL and publishable (or legacy anon) key into a local `.env.local` file:

   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
   ```

2. In Supabase **Authentication → Providers**, enable Email and Google. For Google, create a web OAuth client in Google Cloud and add the Supabase callback URL shown in the provider setup to its authorized redirect URIs.

3. In Supabase **Authentication → URL Configuration**, set the production site URL and add the local development URL (for example, `http://localhost:5173/`) and production URL to the redirect allow list.

4. Restart the Vite server after adding `.env.local`.

The selected account type is saved as `air_neetwork_role` in Supabase Auth user metadata. This is suitable for recording the user's selection, but it is not a trusted authorization boundary: mentor access should be approved and enforced by server-side policies before exposing privileged mentor data or tools.
