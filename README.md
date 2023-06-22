

# Next-Spotify v2

<img src="https://images.unsplash.com/photo-1567535343163-9bba0f61bd09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="sample intro image" width="700" />

<small>Source: [Agê Barros](https://unsplash.com/photos/fK8n4RwGuEI)</small>

<br>
Next Spotify v2 is a Spotify clone built using Next.js and TailwindCSS. Users can log in with their Spotify account and view the playlists, artists, and albums followed by them.


Working demo for the project - [Link](https://next-spotify-smoky-v2.vercel.app)

<b>Note </b>: Currently users cannot log in to the demo link. The application would work in the local system.

## Table of contents

- [Technologies and Libraries used](#technologies)
- [Migration](#migration)
- [Features](#features)
- [To-do features](#todo)
- [Run locally](#run_locally)
- [Environment variables](#env)
- [Data flow](#data_flow)
- [API Reference](#api)
- [Screenshots](#screenshots)
- [Resources](#resources)


<section id="technologies" />

## Technologies and Libraries used

- [Next.JS 13](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Typescript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)


<section id="migration" />

## Migration from Next-Spotify v1 to Next-Spotify v2

- Migrating from pages directory to app directory
- Shifting from getServerSideProps to async calls in server components
- Uniformity in usage of colors than v1
- Updated UI
- Use of both server components and client components together
- Separate root layouts for different groups of pages

<section id="features"/>

## Features

- Spotify OAuth for authentication
- View user's top tracks and artists based on listening frequency
- Display user's top tracks of all time
- View recently played tracks
- See recommendations for a track based on Spotify API's audio analysis features
- View all the playlists created or followed by the user
- View liked songs playlist of the user
- View artists and albums followed by the user
- Display all the tracks in a playlist, an album, or of an artist
- Play a track with play/pause controller
- Search for any playlist, artist, album, or track
- Browse music based on categories (eg: Rock, Indie, Hip-Hop)
- Show latest releases

<section id="todo" />

## To-do features

- [ ] Infinite pagination
- [ ] Add colors to headers
- [ ] Improve track player
- [ ] Shuffle play or play all tracks in album or playlist

*Any other features can be suggested under the issues section of the repo*
<section id="run_locally"/>

## Run Locally

Clone the project

```bash
  git clone https://github.com/ankitk26/Next-Spotify-v2.git
```

Go to the project directory

```bash
  cd Next-spotify-v2
```

Install dependencies

```bash
  npm install
  # or
  yarn
```


Start the server

```bash
  npm run dev
  # or
  yarn dev
```


<section id="env"/>

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SPOTIFY_CLIENT_SECRET`

`SPOTIFY_CLIENT_ID`

`NEXTAUTH_URL`= http://localhost:3000

`NEXTAUTH_SECRET`

#### Spotify API credentials

- **Step 1**: Go to the [Spotify's developer dashboard](https://developer.spotify.com/dashboard/) and log in with your Spotify credentials
- **Step 2**: Click on **CREATE AN APP** button on the applications page. Enter the name and description for the application.
- **Step 3**: After creating the application, copy the **Client ID** and **Client Secret** and paste it into the .env file.
- **Step 4**: In the application page itself, click on **Edit Settings** button. Under the **Redirect URIs** section, add the redirect URL in the text field provided as follows:

  `http://localhost:3000/api/auth/callback/spotify`

  When the project is deployed, add another redirect URL as follows:

  `https://xyz.domain/api/auth/callback/spotify`
- **Step 5**: In the **Users and Access** page, add the email addresses for the accounts you want to test the application for. Your own account is enabled by default so no there's no need to add your own account's email.

#### NEXTAUTH_SECRET

To create a secret key, open your terminal, run the command below and copy the value generated to the .env file.

~~~bash
openssl rand -base64 32
~~~


<section id="data_flow"/>

## Data flow

<img src="https://cdn-images-1.medium.com/max/1000/1*wRT-57cGgmzJETq19SkVqA.png" alt="data flow" />

<section id="api"/>

## API Reference

The API endpoints and their response are listed in [https://developer.spotify.com/documentation/web-api](https://developer.spotify.com/documentation/web-api)

<section id="screenshots"/>

## Screenshots

**Home page**

![2023-06-20 18_46_00-](https://github.com/ankitk26/Next-Spotify-v2/assets/53444460/68dc7e35-54ae-4db1-b199-b0ec8988aa21)

<br><br>

**Browse categories**

![Screenshot 2023-06-20 184858](https://github.com/ankitk26/Next-Spotify-v2/assets/53444460/19f6f716-516d-44e4-8e7a-10bbbbfe6326)

<br><br>

**Search**

![Screenshot 2023-06-20 185206](https://github.com/ankitk26/Next-Spotify-v2/assets/53444460/4958fcae-a41c-40f2-a8b1-4978122c3419)


<br><br>

**View Artist**

![Screenshot 2023-06-20 185257](https://github.com/ankitk26/Next-Spotify-v2/assets/53444460/76c712a6-dfc0-4b15-8843-2bbd017dc956)

<br><br>

**View Playlist**

![Screenshot 2023-06-20 190642](https://github.com/ankitk26/Next-Spotify-v2/assets/53444460/43aa2d51-65ab-44e3-9a47-effcf75d3408)

<section id="resources"/>

## Resources

- [Spotify Web API documentation](https://developer.spotify.com/documentation/web-api)
- Font used - [Montserrat](https://fonts.google.com/specimen/Montserrat)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/example)
- [NextAuth.js Spotify Provider](https://next-auth.js.org/providers/spotify)
- Icons used - [Lucide Icons](https://lucide.dev/)
