
import React from "react";
import { useNavigate } from "react-router-dom";

const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    image: "https://plus.unsplash.com/premium_photo-1682124746623-23f28d0cb7b9?w=600&auto=format&fit=crop&q=60",
    genre: "Action",
    duration: "3h 2m",
    rating: "8.9",
  },
  {
    id: 2,
    title: "Spider-Man",
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=60",
    genre: "Action",
    duration: "2h 15m",
    rating: "8.5",
  },
  {
    id: 3,
    title: "Interstellar",
    image: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?w=600&auto=format&fit=crop&q=60",
    genre: "Sci-Fi",
    duration: "2h 49m",
    rating: "9.0",
  },
  {
    id: 4,
    title: "Batman",
    image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&auto=format&fit=crop&q=60",
    genre: "Action",
    duration: "2h 56m",
    rating: "8.7",
  },
  {
    id: 5,
    title: "Obession",
    image: "https://images.justwatch.com/poster/335829976/s718/obsession-2025.jpg",
    genre: "Drama",
    duration: "1h 45m",
    rating: "7.8",
  },
  {
    id: 6,
    title: "Kalki 2898 AD",
    image: "https://filmfare.wwmindia.com/content/2024/mar/kalki2898adprabhas11709900345.jpg",
    genre: "Sci-Fi",
    duration: "3h 1m",
    rating: "8.4",
  },
  {
    id: 7,
    title: "Evil Dead Burn",
    image: "https://www.flickeringmyth.com/movie-review-evil-dead-burn-2026/s_webp/www.flickeringmyth.com/wp-content/uploads/2026/04/Evil-Dead-Burn-poster-600x889.jpg",
    genre: "Horror",
    duration: "1h 40m",
    rating: "8.4",
  },
  {
    id: 8,
    title: "The Odyssey",
    image: "https://static1.cbrimages.com/wordpress/wp-content/uploads/sharedimages/2025/02/nolan-s-the-odyssey-placeholder-poster.jpg",
    genre: "Drama",
    duration: "2h 55m",
    rating: "8.4",
  },
];

const Movies = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10 text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          🎬 Now Showing
        </h1>
        <p className="mt-2 text-gray-600">
          Choose your favourite movie and book tickets instantly.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="overflow-hidden rounded-xl bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="h-80 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold">
                {movie.title}
              </h2>

              <p className="mt-2 text-gray-500">
                🎭 {movie.genre}
              </p>

              <p className="text-gray-500">
                🕒 {movie.duration}
              </p>

              <p className="font-semibold text-yellow-500">
                ⭐ {movie.rating}
              </p>

              <button
                onClick={() =>
                  navigate("/theatres", {
                    state: { movie },
                  })
                }
                className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
