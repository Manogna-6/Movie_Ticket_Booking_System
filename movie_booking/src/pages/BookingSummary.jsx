
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const movie = state?.movie;
  const theatre = state?.theatre;
  const show = state?.show;
  const date = state?.date;
  const seats = state?.seats || [];
  const total = state?.total ?? seats.reduce(
    (sum, seat) => sum + Number(seat.price || 0), 0
  );

  const [stage, setStage] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI QR");
  const [bookingId] = useState(
    () => "MB" + Math.random().toString(36).slice(2, 8).toUpperCase()
  );

  const convenienceFee = Number((total * 0.1671667).toFixed(2));
  const payable = Number((total + convenienceFee).toFixed(2));

  if (!movie || !theatre || !show || seats.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold">Booking details not found</h1>
        <p className="mt-2 text-gray-500">
          Please select a movie, theatre, showtime and seats first.
        </p>
        <button
          onClick={() => navigate("/movies")}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Browse movies
        </button>
      </div>
    );
  }

  const dateLabel = date
    ? `${date.label || ""} ${date.day || ""} ${date.month || ""}`.trim()
    : new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });

  const verifyOtp = (event) => {
    event.preventDefault();

    // Demo-only OTP. A real app must verify OTP using a backend.
    if (otp === "123456") {
      setStage("review");
    } else {
      window.alert("Demo OTP is 123456. Please try again.");
    }
  };

  const confirmPayment = () => {
    // Demo only: no real payment is processed.
    setStage("success");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10 text-gray-900">
      {stage !== "phone" && stage !== "otp" && (
        <header className="border-b bg-white px-4 py-4 text-center">
          <h1 className="text-xl font-bold">Review your booking</h1>
          {stage === "review" && (
            <p className="mt-1 text-xs text-violet-600">
              Complete your booking to receive your ticket
            </p>
          )}
        </header>
      )}

      {/* Booking review */}
      {stage === "review" && (
        <main className="mx-auto grid max-w-4xl grid-cols-1 gap-5 p-4 sm:grid-cols-2 sm:p-8">
          <div>
            <section className="rounded-xl border bg-white p-5">
              <div className="flex gap-4">
                {movie.image && (
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="h-24 w-16 rounded-lg object-cover"
                  />
                )}

                <div className="min-w-0">
                  <h2 className="text-lg font-bold">{movie.title}</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {movie.genre} · {movie.duration}
                  </p>
                  <p className="mt-2 text-sm font-medium">
                    {theatre.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {theatre.area}
                  </p>
                </div>
              </div>

              <hr className="my-4" />

              <p className="text-sm">
                <span className="font-semibold">{dateLabel}</span>
                {" · "}
                {show.time}
              </p>

              <div className="mt-4 flex justify-between gap-3">
                <div>
                  <p className="font-semibold">
                    {seats.length} ticket(s)
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {seats.map((seat) => seat.id).join(", ")}
                  </p>
                </div>
                <p className="font-semibold">₹{total.toFixed(2)}</p>
              </div>

              <div className="mt-4 rounded-lg bg-gray-100 p-3 text-xs text-gray-600">
                Demo booking · No real ticket is issued
              </div>
            </section>

            <section className="mt-5 rounded-xl border bg-white p-4">
              <h3 className="font-bold">Your details</h3>
              <p className="mt-2 text-sm text-gray-600">+91 {phone}</p>
              <button
                onClick={() => setStage("phone")}
                className="mt-2 text-sm text-blue-600"
              >
                Edit mobile number
              </button>
            </section>
          </div>

          <div>
            <section className="rounded-xl border bg-white p-5">
              <h2 className="mb-4 font-bold">Payment summary</h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-gray-600">Ticket amount</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-600">Booking charge</span>
                  <span>₹{convenienceFee.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between gap-3 text-base font-bold">
                  <span>To be paid</span>
                  <span>₹{payable.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setStage("payment")}
                className="mt-6 w-full rounded-lg bg-[#131316] px-4 py-3 font-bold text-white hover:bg-black"
              >
                ₹{payable.toFixed(2)} · Pay now
              </button>

              <p className="mt-3 text-center text-xs text-gray-500">
                Demo payment only. No money will be charged.
              </p>
            </section>
          </div>
        </main>
      )}

      {/* Mobile number and OTP modal */}
      {(stage === "phone" || stage === "otp") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <section className="flex min-h-[520px] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="relative flex min-h-64 flex-col items-center justify-center bg-gradient-to-b from-fuchsia-500 to-violet-700 px-6 text-center text-white">
              <button
                onClick={() => navigate("/seats")}
                className="absolute right-4 top-3 text-xl"
                aria-label="Close"
              >
                ×
              </button>
              <div className="text-4xl font-black tracking-tight">
                MovieBook
              </div>
              <p className="mt-3 max-w-52 text-xs">
                Your movie tickets, all in one place.
              </p>
            </div>

            <div className="flex flex-1 flex-col px-6 py-6">
              {stage === "phone" ? (
                <>
                  <h2 className="text-center text-lg font-bold">
                    Enter your mobile number
                  </h2>
                  <p className="mt-1 text-center text-xs text-gray-500">
                    We'll use this for your booking details.
                  </p>

                  <form
                    className="mt-5"
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (!/^[6-9]\d{9}$/.test(phone)) {
                        window.alert("Enter a valid 10-digit Indian mobile number.");
                        return;
                      }
                      setStage("otp");
                    }}
                  >
                    <label className="mb-2 block text-xs text-gray-600">
                      Mobile number
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg border bg-gray-50 px-3 py-3 text-sm">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={phone}
                        onChange={(event) =>
                          setPhone(event.target.value.replace(/\D/g, ""))
                        }
                        placeholder="Enter mobile number"
                        className="min-w-0 flex-1 rounded-lg border px-3 py-3 text-sm outline-none focus:border-violet-500"
                        required
                      />
                    </div>

                    <button className="mt-4 w-full rounded-lg bg-[#131316] py-3 text-sm font-bold text-white">
                      Continue
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <h2 className="text-center text-lg font-bold">
                    Enter OTP
                  </h2>
                  <p className="mt-2 text-center text-xs text-gray-500">
                    Demo verification for +91 {phone}
                  </p>
                  <p className="mt-2 text-center text-xs text-violet-700">
                    Use demo OTP: 123456
                  </p>

                  <form onSubmit={verifyOtp} className="mt-5">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(event) =>
                        setOtp(event.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Enter 6-digit OTP"
                      className="w-full rounded-lg border px-3 py-3 text-center text-lg tracking-[0.4em] outline-none focus:border-violet-500"
                      required
                    />

                    <button className="mt-4 w-full rounded-lg bg-[#131316] py-3 text-sm font-bold text-white">
                      Verify OTP
                    </button>
                    <button
                      type="button"
                      onClick={() => setStage("phone")}
                      className="mt-3 w-full text-sm text-violet-700"
                    >
                      Change mobile number
                    </button>
                  </form>
                </>
              )}

              <p className="mt-auto pt-5 text-center text-[10px] text-gray-400">
                Demo interface · No SMS is sent
              </p>
            </div>
          </section>
        </div>
      )}

      {/* Payment modal */}
      {stage === "payment" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <section className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="font-bold">
                To pay: ₹{payable.toFixed(2)}
              </h2>
              <button
                onClick={() => setStage("review")}
                className="rounded-full border px-2 py-1 text-gray-500"
                aria-label="Close payment"
              >
                ×
              </button>
            </div>

            <div className="grid min-h-72 grid-cols-1 sm:grid-cols-[160px_1fr]">
              <div className="border-b bg-blue-50 p-3 sm:border-b-0 sm:border-r">
                {["UPI QR", "Credit / Debit Card", "Net Banking"].map(
                  (method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`mb-2 w-full rounded-lg px-3 py-3 text-left text-xs ${
                        paymentMethod === method
                          ? "bg-white font-bold text-violet-700 shadow-sm"
                          : "text-gray-600 hover:bg-white"
                      }`}
                    >
                      {method}
                    </button>
                  )
                )}
              </div>

              <div className="flex flex-col justify-center p-5">
                {paymentMethod === "UPI QR" ? (
                  <div className="rounded-xl border p-5 text-center">
                    <div className="mx-auto flex h-28 w-28 items-center justify-center border-4 border-dashed border-violet-300 bg-violet-50 text-center text-xs font-bold text-violet-700">
                      DEMO QR
                    </div>
                    <p className="mt-3 text-sm font-semibold">
                      Scan QR using any UPI app
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      This is a demonstration, not a real payment QR.
                    </p>
                  </div>
                ) : paymentMethod === "Credit / Debit Card" ? (
                  <div className="space-y-3">
                    <input
                      placeholder="Card number (demo)"
                      className="w-full rounded-lg border p-3 text-sm"
                    />
                    <div className="flex gap-3">
                      <input
                        placeholder="MM/YY"
                        className="w-1/2 rounded-lg border p-3 text-sm"
                      />
                      <input
                        placeholder="CVV"
                        className="w-1/2 rounded-lg border p-3 text-sm"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Do not enter real card details in this demo.
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Select your bank
                    </label>
                    <select className="w-full rounded-lg border p-3 text-sm">
                      <option>Choose a demo bank</option>
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}

                <button
                  onClick={confirmPayment}
                  className="mt-5 w-full rounded-lg bg-[#131316] py-3 font-bold text-white"
                >
                  Simulate payment success
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Confirmation */}
      {stage === "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <section className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
              ✓
            </div>
            <h2 className="mt-4 text-2xl font-bold">
              Demo booking confirmed!
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Your sample booking reference is
            </p>
            <p className="mt-2 text-xl font-bold tracking-wider">
              {bookingId}
            </p>
            <div className="mt-5 rounded-xl bg-gray-50 p-4 text-left text-sm">
              <p><strong>Movie:</strong> {movie.title}</p>
              <p className="mt-2"><strong>Theatre:</strong> {theatre.name}</p>
              <p className="mt-2"><strong>Show:</strong> {show.time}</p>
              <p className="mt-2"><strong>Seats:</strong> {seats.map((seat) => seat.id).join(", ")}</p>
              <p className="mt-2"><strong>Total:</strong> ₹{payable.toFixed(2)}</p>
            </div>
            <p className="mt-4 text-xs text-amber-700">
              This is a frontend demo. No payment was processed and no real ticket was issued.
            </p>
            <button
              onClick={() => navigate("/movies")}
              className="mt-5 w-full rounded-lg bg-violet-600 py-3 font-bold text-white"
            >
              Back to movies
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
