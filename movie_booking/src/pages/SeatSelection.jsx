
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SHOW_TIMES = [
  "12:15 PM",
  "04:00 PM",
  "07:00 PM",
  "10:30 PM",
];

const SEAT_CATEGORIES = [
  {
    name: "RECLINER",
    price: 550,
    rows: ["K"],
    columns: 12,
  },
  {
    name: "PREMIUM XL",
    price: 280,
    rows: ["J"],
    columns: 16,
  },
  {
    name: "PREMIUM",
    price: 260,
    rows: ["I", "H", "G", "F"],
    columns: 16,
  },
  {
    name: "EXECUTIVE",
    price: 240,
    rows: ["E", "D", "C", "B"],
    columns: 16,
  },
  {
    name: "NORMAL",
    price: 200,
    rows: ["A"],
    columns: 12,
  },
];

// Fixed unavailable seats for this frontend demonstration.
const OCCUPIED_SEATS = new Set([
  "I-1",
  "I-2",
  "H-3",
  "G-4",
  "F-7",
  "E-6",
  "E-7",
  "D-5",
  "C-8",
  "B-10",
  "A-3",
  "A-8",
]);

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    movie: passedMovie,
    theatre: passedTheatre,
    show: passedShow,
    date: passedDate,
  } = location.state || {};

  // Demo defaults prevent a blank page when /seats is opened directly.
  const movie = passedMovie || {
    id: 1,
    title: "Udaa Teer",
    genre: "Drama",
    duration: "2h 15m",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600",
  };

  const theatre = passedTheatre || {
    id: 1,
    name: "Cinepolis Grand View",
    area: "Hyderabad",
    address: "Hyderabad, Telangana",
  };

  const initialShowTime =
    typeof passedShow === "string"
      ? passedShow
      : passedShow?.time || SHOW_TIMES[0];

  const [activeShow, setActiveShow] = useState(initialShowTime);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBestSeats, setShowBestSeats] = useState(true);

  const [activeDate] = useState(
    passedDate || "Today"
  );

  const selectedShow = useMemo(
    () => ({
      ...(typeof passedShow === "object" && passedShow
        ? passedShow
        : {}),
      time: activeShow,
    }),
    [passedShow, activeShow]
  );

  const selectedSeatDetails = useMemo(() => {
    return selectedSeats.map((seatId) => {
      const [row] = seatId.split("-");

      const category = SEAT_CATEGORIES.find((section) =>
        section.rows.includes(row)
      );

      return {
        id: seatId,
        price: category?.price || 200,
        category: category?.name || "NORMAL",
      };
    });
  }, [selectedSeats]);

  const total = selectedSeatDetails.reduce(
    (sum, seat) => sum + seat.price,
    0
  );

  const toggleSeat = (seatId) => {
    if (OCCUPIED_SEATS.has(seatId)) {
      return;
    }

    setSelectedSeats((previous) =>
      previous.includes(seatId)
        ? previous.filter((id) => id !== seatId)
        : [...previous, seatId]
    );
  };

  const continueBooking = () => {
    if (selectedSeatDetails.length === 0) {
      return;
    }

    navigate("/booking-summary", {
      state: {
        movie,
        theatre,
        show: selectedShow,
        date: activeDate,
        seats: selectedSeatDetails,
        total,
      },
    });
  };

  const formatDate = (value) => {
    if (!value) return "Selected date";

    if (typeof value === "string") return value;

    if (value.label) return value.label;
    if (value.date) return value.date;

    return [
      value.day,
      value.month,
      value.year,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const getSeatStyle = (seatId) => {
    if (OCCUPIED_SEATS.has(seatId)) {
      return "border-gray-200 bg-gray-200 text-gray-400 cursor-not-allowed";
    }

    if (selectedSeats.includes(seatId)) {
      return "border-violet-600 bg-violet-600 text-white shadow-sm";
    }

    return "border-blue-400 bg-blue-50 text-gray-800 hover:bg-blue-100";
  };

  const renderSeat = (row, number, category) => {
    const seatId = `${row}-${number}`;
    const occupied = OCCUPIED_SEATS.has(seatId);
    const selected = selectedSeats.includes(seatId);

    return (
      <button
        key={seatId}
        type="button"
        disabled={occupied}
        onClick={() => toggleSeat(seatId)}
        title={`${seatId} · ${category} · ₹${SEAT_CATEGORIES.find(
          (section) => section.name === category
        )?.price}`}
        aria-label={`Seat ${seatId}${
          occupied ? ", occupied" : selected ? ", selected" : ", available"
        }`}
        aria-pressed={selected}
        className={`flex h-6 w-7 shrink-0 items-center justify-center rounded-md border text-[9px] font-medium transition sm:h-7 sm:w-8 sm:text-[10px] ${getSeatStyle(
          seatId
        )}`}
      >
        {number}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-white pb-24 text-gray-900">
      {/* Theatre and movie details */}
      <header className="border-b border-gray-200 px-4 py-3 text-center">
        <h1 className="text-base font-bold">
          {theatre.name || theatre.title || "Selected Theatre"}
        </h1>

        <p className="mt-1 text-xs text-gray-500">
          {theatre.address ||
            theatre.area ||
            "Hyderabad, Telangana"}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {movie.title}
        </p>
      </header>

      <main className="mx-auto max-w-5xl px-3 py-5 sm:px-6">
        {/* Date and showtime selector */}
        <section className="mb-6 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
          <div className="mr-2 min-w-14 text-center text-xs">
            <p className="font-semibold">
              {formatDate(activeDate)}
            </p>
            <p className="mt-1 text-gray-500">Select show</p>
          </div>

          {SHOW_TIMES.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => {
                setActiveShow(time);
                setSelectedSeats([]);
              }}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                activeShow === time
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white hover:border-violet-500"
              }`}
            >
              {time}
            </button>
          ))}
        </section>

        {/* Seat availability legend */}
        <div className="mb-8 flex flex-wrap justify-center gap-4 text-xs text-gray-600">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm border border-blue-400 bg-blue-50" />
            Available
          </span>

          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-gray-200" />
            Occupied
          </span>

          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-violet-600" />
            Selected
          </span>
        </div>

        {/* Seat map */}
        <div className="mx-auto max-w-4xl space-y-9 overflow-x-auto pb-5">
          {SEAT_CATEGORIES.map((section) => (
            <section key={section.name} className="min-w-[330px]">
              <h2 className="mb-5 text-center text-xs font-bold tracking-wide">
                {section.name} : ₹{section.price}
              </h2>

              <div className="space-y-3">
                {section.rows.map((row) => {
                  const seats = Array.from(
                    { length: section.columns },
                    (_, index) => index + 1
                  );

                  return (
                    <div
                      key={row}
                      className="flex items-center justify-center gap-2 sm:gap-4"
                    >
                      <span className="w-4 shrink-0 text-xs font-semibold text-gray-600">
                        {row}
                      </span>

                      <div className="flex min-w-0 flex-wrap justify-center gap-1.5 sm:gap-2">
                        {seats.map((number) =>
                          renderSeat(
                            row,
                            number,
                            section.name
                          )
                        )}
                      </div>

                      <span className="w-4 shrink-0 text-xs font-semibold text-gray-600">
                        {row}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Cinema screen */}
        <div className="mx-auto mt-8 max-w-lg px-4">
          <div className="mb-3 text-center text-xs font-semibold tracking-[0.25em] text-gray-400">
            SCREEN THIS WAY
          </div>

          <svg
            viewBox="0 0 500 70"
            role="img"
            aria-label="Cinema screen"
            className="w-full"
          >
            <path
              d="M35 12 Q250 38 465 12 L490 43 Q250 67 10 43 Z"
              fill="#c4b5fd"
              stroke="#a78bfa"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M10 48 Q250 70 490 48"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Seat price summary */}
        <div className="mx-auto mt-8 max-w-lg rounded-xl border border-gray-200 p-4">
          <h2 className="font-bold">Your selection</h2>

          {selectedSeatDetails.length === 0 ? (
            <p className="mt-2 text-sm text-gray-500">
              Select one or more available seats to continue.
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm text-gray-600">
                Seats:{" "}
                {selectedSeatDetails
                  .map((seat) => seat.id)
                  .join(", ")}
              </p>

              <div className="mt-3 space-y-2">
                {selectedSeatDetails.map((seat) => (
                  <div
                    key={seat.id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {seat.id} · {seat.category}
                    </span>
                    <span>₹{seat.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-between border-t pt-3 font-bold">
                <span>Total ({selectedSeats.length} seats)</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Fixed booking bar */}
      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white shadow-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-xs text-gray-500">
              {selectedSeats.length}{" "}
              {selectedSeats.length === 1 ? "Seat" : "Seats"} selected
            </p>

            <p className="mt-1 font-bold">
              ₹{total.toFixed(2)}
            </p>
          </div>

          <button
            type="button"
            onClick={continueBooking}
            disabled={selectedSeats.length === 0}
            className="rounded-lg bg-gray-950 px-8 py-3 text-sm font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Continue
          </button>
        </div>
      </footer>

      {/* Best Seats introduction popup */}
      {showBestSeats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="best-seats-title"
            className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white p-6 shadow-2xl sm:p-10"
          >
            <button
              type="button"
              onClick={() => setShowBestSeats(false)}
              aria-label="Close Best Seats popup"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xl hover:bg-gray-200"
            >
              ×
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-48 w-full items-center justify-center">
                <div className="relative flex h-36 w-44 items-center justify-center">
                  <div className="absolute bottom-0 h-20 w-40 rounded-full bg-blue-200/70 blur-xl" />

                  <div className="relative flex h-24 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-300 via-blue-500 to-blue-700 shadow-xl">
                    <div className="absolute -top-12 h-20 w-20 rounded-t-2xl rounded-b-md border border-blue-300 bg-gradient-to-br from-sky-300 to-blue-600 shadow-lg" />

                    <div className="absolute -left-4 top-4 h-16 w-8 rounded-xl bg-blue-600 shadow-md" />

                    <div className="absolute -right-4 top-4 h-16 w-8 rounded-xl bg-blue-600 shadow-md" />

                    <div className="absolute bottom-0 h-5 w-24 rounded-b-xl bg-sky-300" />
                  </div>
                </div>
              </div>

              <h2
                id="best-seats-title"
                className="mt-4 text-2xl font-bold"
              >
                Introducing Best Seats
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                Choose your favourite seats and enjoy the best
                view and sound for your movie experience.
              </p>

              <button
                type="button"
                onClick={() => setShowBestSeats(false)}
                className="mt-8 w-full rounded-xl bg-gray-950 py-4 font-bold text-white transition hover:bg-gray-800"
              >
                Continue booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
