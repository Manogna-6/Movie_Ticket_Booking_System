
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Sample Hyderabad theatre and showtime data.
// Replace sample showtimes and prices with actual booking data.

const theatres = [
  {
    id: 1,
    name: "Prasads Multiplex",
    area: "Necklace Road, Khairatabad",
    rating: "4.0",
    formats: ["2D", "3D", "IMAX"],
    shows: [
      { time: "10:30 AM", price: 180 },
      { time: "01:30 PM", price: 220 },
      { time: "04:30 PM", price: 220 },
      { time: "07:30 PM", price: 250 },
      { time: "10:30 PM", price: 200 },
    ],
  },
  {
    id: 2,
    name: "AMB Cinemas",
    area: "Sarath City Capital Mall, Kondapur",
    rating: "4.3",
    formats: ["2D", "3D", "Dolby Atmos"],
    shows: [
      { time: "10:00 AM", price: 200 },
      { time: "12:45 PM", price: 250 },
      { time: "03:45 PM", price: 250 },
      { time: "06:45 PM", price: 300 },
      { time: "09:45 PM", price: 280 },
    ],
  },
  {
    id: 3,
    name: "AAA Cinemas",
    area: "Ameerpet",
    rating: "4.4",
    formats: ["2D", "3D", "Dolby Atmos"],
    shows: [
      { time: "10:15 AM", price: 180 },
      { time: "01:15 PM", price: 200 },
      { time: "04:15 PM", price: 220 },
      { time: "07:15 PM", price: 250 },
      { time: "10:15 PM", price: 220 },
    ],
  },
  {
    id: 4,
    name: "PVR Next Galleria",
    area: "Panjagutta",
    rating: "4.3",
    formats: ["2D", "3D"],
    shows: [
      { time: "11:00 AM", price: 180 },
      { time: "02:00 PM", price: 220 },
      { time: "05:00 PM", price: 220 },
      { time: "08:00 PM", price: 250 },
    ],
  },
  {
    id: 5,
    name: "Allu Cinemas",
    area: "Kokapet - Narsingi",
    rating: "4.4",
    formats: ["2D", "Dolby Cinema"],
    shows: [
      { time: "10:30 AM", price: 250 },
      { time: "01:30 PM", price: 300 },
      { time: "04:30 PM", price: 300 },
      { time: "07:30 PM", price: 350 },
      { time: "10:30 PM", price: 300 },
    ],
  },
  {
    id: 6,
    name: "PVR RK Cineplex",
    area: "Banjara Hills",
    rating: "4.2",
    formats: ["2D", "3D"],
    shows: [
      { time: "10:45 AM", price: 160 },
      { time: "01:45 PM", price: 180 },
      { time: "04:45 PM", price: 200 },
      { time: "07:45 PM", price: 220 },
    ],
  },
];

const Theatres = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const movie = location.state?.movie;

  const [selectedDate, setSelectedDate] = useState(0);
  const [areaFilter, setAreaFilter] = useState("All");
  const [formatFilter, setFormatFilter] = useState("All");

  // Build dates locally to avoid UTC date shifts.
  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    return {
      label: date.toLocaleDateString("en-IN", {
        weekday: "short",
      }),
      day: date.getDate(),
      month: date.toLocaleDateString("en-IN", {
        month: "short",
      }),
      fullDate: date.toLocaleDateString("en-CA"),
    };
  });

  const areas = [
    "All",
    ...new Set(theatres.map((theatre) => theatre.area)),
  ];

  const filteredTheatres = theatres.filter((theatre) => {
    const matchesArea =
      areaFilter === "All" || theatre.area === areaFilter;

    const matchesFormat =
      formatFilter === "All" ||
      theatre.formats.includes(formatFilter);

    return matchesArea && matchesFormat;
  });

  if (!movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
        <h2 className="text-2xl font-bold">
          No movie selected
        </h2>
        <p className="mt-2 text-gray-600">
          Please select a movie before choosing a theatre.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Browse Movies
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Movie header */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-5">
          <img
            src={movie.image}
            alt={movie.title}
            className="h-28 w-20 rounded-lg object-cover shadow"
          />

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {movie.title}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {movie.genre} · {movie.duration} · ⭐ {movie.rating}
            </p>
            <p className="mt-2 text-sm font-medium text-blue-600">
              📍 Hyderabad, Telangana
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="ml-auto rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
          >
            ← Back
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Date selector */}
        <div className="mb-5 flex gap-2 overflow-x-auto rounded-xl bg-white p-3 shadow-sm">
          {dates.map((date, index) => (
            <button
              key={date.fullDate}
              onClick={() => setSelectedDate(index)}
              className={`min-w-20 rounded-lg border px-4 py-3 text-center ${
                selectedDate === index
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className="block text-xs">{date.label}</span>
              <span className="block text-lg font-bold">
                {date.day}
              </span>
              <span className="block text-xs">{date.month}</span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
          <label className="text-sm font-semibold">
            Area:
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="ml-2 max-w-48 rounded-lg border p-2 font-normal"
            >
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold">
            Format:
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="ml-2 rounded-lg border p-2 font-normal"
            >
              {["All", "2D", "3D", "IMAX", "Dolby Atmos", "Dolby Cinema"].map(
                (format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                )
              )}
            </select>
          </label>

          <span className="ml-auto text-sm text-gray-500">
            {filteredTheatres.length} theatres
          </span>
        </div>

        {/* Theatre listings */}
        <div className="space-y-4">
          {filteredTheatres.map((theatre) => (
            <article
              key={theatre.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold text-gray-900">
                    {theatre.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    📍 {theatre.area}
                  </p>

                  <p className="mt-2 text-sm text-yellow-600">
                    ⭐ {theatre.rating}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {theatre.formats.map((format) => (
                      <span
                        key={format}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:max-w-xl md:grid-cols-3">
                  {theatre.shows.map((show) => (
                    <button
                      key={show.time}
                     onClick={() =>
  navigate("/seats", {
    state: {
      movie,
      theatre,
      show,
      date: dates[selectedDate],
    },
  })
}
                      className="rounded-lg border border-gray-300 px-4 py-3 text-center transition hover:border-blue-600 hover:bg-blue-50"
                    >
                      <span className="block whitespace-nowrap text-sm font-semibold text-green-700">
                        {show.time}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        ₹{show.price} onwards
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {filteredTheatres.length === 0 && (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No theatres match your selected filters.
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Demo data: showtimes, prices and formats are illustrative,
          not live availability.
        </p>
      </main>
    </div>
  );
};

export default Theatres;
