# Podcast Application

This podcast application is designed to provide a seamless experience for users to explore, listen to, and manage their favorite podcasts.

## Features

### Show Details

- Browse through an extensive collection of shows with their associated details.
- View show previews, season counts, last updated date, and genres.
- Access detailed breakdowns of shows by season and individual episode details.
- Toggle between different seasons of a specific show.

### Favorites & Sorting

- Mark episodes as favorites for easy access.
- View and manage all favorite episodes including show and season details.
- Sort shows by title (A-Z, Z-A) or date updated (ascending, descending).
- Filter shows by title or genre for a tailored browsing experience.

### Player & Listening

- Utilize an intuitive audio player displaying progress and episode length timestamps.
- Persistent player view for continuous listening while browsing the app.
- Confirmation prompt when closing the page with active audio.
- Remembering and tracking listening history, including progress timestamps.

### User Authentication & Database

- Log in securely through Supabase authentication.
- Store user favorites in the Supabase database.
- Automatic synchronization of favorite episodes across logged-in devices.
- Option to share favorite episodes using publicly accessible URLs.

### Additional Functionalities

- Landing page carousel showcasing potential shows of interest.
- Resetting listening progress for user convenience.

## Deployment

- The application is deployed on a custom Netlify URL and optimized for mobile devices, particularly the "iPhone SE."
- Favicon and metatags are set for an enhanced user experience.
- Show data is fetched from `https://podcast-api.netlify.app/shows`.

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application using `npm start`.

## Usage

1. Browse through available shows, explore details, and play episodes.
2. Mark favorite episodes and manage them via the favorites section.
3. Utilize sorting, filtering, and genre-based browsing for a tailored experience.

## Contributing

Contributions are welcome! If you have any suggestions, enhancements, or bug fixes, feel free to submit a pull request.


