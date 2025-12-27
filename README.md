# Next-Spotify v2

<img src="https://images.unsplash.com/photo-1567535343163-9bba0f61bd09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="sample intro image" width="700" />

<small>Source: [Agê Barros](https://unsplash.com/photos/fK8n4RwGuEI)</small>

<br>
Next Spotify v2 is a modern Spotify clone built using React 19 and Next.js 16. It leverages a robust backend stack with Drizzle ORM and Better Auth to provide a seamless music browsing experience.

Working demo for the project - [Link](https://next-spotify-smoky-v2.vercel.app)

<b>Note </b>: Currently, users cannot log in to the demo link due to Spotify's API Developer quota limits. The application is intended for local development and testing.

## Table of contents

- [Technologies and Libraries used](#technologies)
- [Features](#features)
- [To-do features](#todo)
- [Run locally](#run_locally)
- [Environment variables](#env)
- [API Reference](#api)
- [Resources](#resources)

<section id="technologies" />

## Technologies and Libraries used

- [Next.js 16 (App Router)](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Better Auth](https://www.better-auth.com/)
- [Drizzle ORM](https://orm.drizzle.team/) & [Postgres](https://postgresjs.org/)
- [TanStack Query v5](https://tanstack.com/query/latest)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Biome](https://biomejs.dev/) (Linting & Formatting)

<section id="features"/>

## Features

- Spotify OAuth for authentication via Better Auth
- Persistent user sessions and data storage with Postgres
- View user's top tracks and artists based on listening frequency
- Display user's top tracks of all time
- View recently played tracks
- Spotify API audio analysis recommendations for tracks
- View all playlists, liked songs, followed artists, and albums
- Play tracks with real-time play/pause controllers
- Search for any playlist, artist, album, or track
- Browse music based on categories (eg: Rock, Indie, Hip-Hop)
- Optimized performance and caching with TanStack Query

<section id="todo" />

## To-do features

- [ ] Add dynamic colors to headers based on album art
- [ ] Implement robust error boundaries for API rate limiting

<section id="run_locally"/>

## Run Locally

Clone the project

```bash
git clone https://github.com/ankitk26/Next-Spotify-v2.git
cd Next-spotify-v2
```

Install dependencies

```bash
npm install
```

Push database schema

```bash
npx drizzle-kit push
```

Start the development server

```bash
npm run dev
```

<section id="env"/>

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

`DATABASE_URL` (Postgres Connection String)

`SPOTIFY_CLIENT_SECRET`

`SPOTIFY_CLIENT_ID`

`BETTER_AUTH_SECRET`

`BETTER_AUTH_URL`=http://localhost:3000

#### Spotify API credentials

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
2. Create an App and copy the **Client ID** and **Client Secret**.
3. Set the Redirect URI to:
   `http://localhost:3000/api/auth/callback/spotify`

<section id="api"/>

## API Reference

The API endpoints and their response are listed in [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api).

<section id="resources"/>

## Resources

- [Better Auth Docs](https://www.better-auth.com/docs/introduction)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [TanStack Query Docs](https://tanstack.com/query/v5/docs/framework/react/overview)
- [Montserrat Font](https://fonts.google.com/specimen/Montserrat)
- Icons: [Lucide Icons](https://lucide.dev/)
