import React from "react";

const bookings = [
  {
    id: 1,
    movie: "Avengers: Endgame",
    theatre: "PVR Cinemas",
    date: "20 July 2026",
    time: "7:00 PM",
    seats: "A1, A2",
    amount: "₹600",
  },
  {
    id: 2,
    movie: "Spider-Man",
    theatre: "INOX",
    date: "22 July 2026",
    time: "4:30 PM",
    seats: "C5, C6",
    amount: "₹500",
  },
  {
    id: 3,
    movie: "Interstellar",
    theatre: "AMB Cinemas",
    date: "25 July 2026",
    time: "9:00 PM",
    seats: "B3, B4",
    amount: "₹700",
  },
];

const Bookings = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600">
          🎟️ My Bookings
        </h1>

        <p className="text-gray-600 mt-2">
          View all your movie ticket bookings.
        </p>
      </div>

      {/* Booking Cards */}
      <div className="max-w-6xl mx-auto space-y-6 px-6">

        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition"
          >
            <div className="flex justify-between items-center">

              <div>
                <h2 className="text-2xl font-bold text-blue-500">
                  {booking.movie}
                </h2>

                <p className="mt-2">
                  🎭 <strong>Theatre:</strong> {booking.theatre}
                </p>

                <p>
                  📅 <strong>Date:</strong> {booking.date}
                </p>

                <p>
                  🕒 <strong>Time:</strong> {booking.time}
                </p>

                <p>
                  💺 <strong>Seats:</strong> {booking.seats}
                </p>

                <p className="text-green-600 font-bold mt-2">
                  💰 {booking.amount}
                </p>
              </div>

              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg">
                Cancel
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Bookings;