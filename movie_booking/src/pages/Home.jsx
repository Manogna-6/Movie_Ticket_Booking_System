
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import BeamsBackground from "../components/ui/beams-background";

const movies = [
  {
    title: "Avengers: Endgame",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500",
  },
  {
    title: "Spider-Man",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500",
  },
  {
    title: "Batman",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500",
  },
  {
    title: "Interstellar",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-950 text-white">
      {/* Hero Section with Animated Beams Background */}
      <BeamsBackground className="min-h-[85vh]">
        <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-5 py-16">
          {/* Cinematic background image */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600')",
            }}
          />

          {/* Dark gradient overlay */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-slate-950/30 to-black/70" />

          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-widest text-cyan-200 sm:text-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                YOUR NEXT MOVIE NIGHT STARTS HERE
              </span>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Every Seat.
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Every Story.
                </span>
                <br />
                One Click Away.
              </h1>

              <p className="mx-auto mb-9 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Discover movies, explore theatres, choose your favourite
                seats, and turn your next movie night into an unforgettable
                experience with MovieBook.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => navigate("/movies")}
                  className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 font-bold text-slate-950 shadow-lg shadow-blue-500/25 transition duration-300 hover:-translate-y-1 hover:shadow-blue-500/40"
                >
                  Explore Movies <span aria-hidden="true">→</span>
                </button>

                <button
                  onClick={() => navigate("/movies")}
                  className="rounded-xl border border-white/25 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-white/10"
                >
                  🎟 Book Tickets
                </button>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-300">
                <span>✦ Discover movies</span>
                <span>✦ Choose your seats</span>
                <span>✦ Book with ease</span>
              </div>
            </motion.div>
          </div>
        </section>
      </BeamsBackground>

      {/* Featured Movies */}
      <section className="bg-gray-100 px-6 py-16 text-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
              Find your next favourite
            </p>

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              🎬 Now Showing
            </h2>

            <p className="mt-3 text-gray-600">
              Pick a movie and get ready for the big screen.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {movies.map((movie, index) => (
              <motion.div
                key={movie.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    loading="lazy"
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                  <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    MOVIEBOOK PICK
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold">{movie.title}</h3>

                  <button
                    onClick={() => navigate("/movies")}
                    className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Book Ticket →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("/movies")}
              className="rounded-lg border-2 border-blue-600 px-7 py-3 font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white"
            >
              View All Movies
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose MovieBook */}
      <section className="bg-white px-6 py-16 text-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
              Your movie experience, simplified
            </p>

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Why Choose MovieBook?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "🎟️",
                title: "Easy Booking",
                description:
                  "Book your favourite movie in just a few clicks.",
              },
              {
                icon: "🍿",
                title: "Better Experience",
                description:
                  "Discover theatres and find the right show for you.",
              },
              {
                icon: "💳",
                title: "Payment Options",
                description:
                  "Enjoy a simple booking flow with convenient payment choices.",
              },
              {
                icon: "🎬",
                title: "More Choices",
                description:
                  "Explore movies and plan your next cinema visit.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 text-5xl">{feature.icon}</div>

                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>

                <p className="leading-7 text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-violet-950 px-6 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Your next movie adventure awaits.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Find a movie, pick your seats, and make it a movie night to remember.
        </p>

        <button
          onClick={() => navigate("/movies")}
          className="mt-8 rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          Start Booking Now →
        </button>
      </section>
    </div>
  );
};

export default Home;
