import React, { useEffect } from "react";
import quizLogo from "../assets/quiz_logo.png";
import logo from "../assets/satyalok_logo.png";

function Closed() {
    // countdown timer
    useEffect(() => {
        const countDownDate = new Date("June 8, 2024 17:00:00").getTime();

        const x = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days;
            document.getElementById("hours").innerText = hours;
            document.getElementById("minutes").innerText = minutes;
            document.getElementById("seconds").innerText = seconds;

            if (distance < 0) {
                clearInterval(x);
                document.getElementById("days").innerText = 0;
                document.getElementById("hours").innerText = 0;
                document.getElementById("minutes").innerText = 0;
                document.getElementById("seconds").innerText = 0;
            }
        }, 1000);

        return () => clearInterval(x);
    }, []);

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-800 via-purple-700 to-pink-500 text-white p-4">
            <img src={logo} alt="Satyalok logo" className="h-16 sm:h-20" />

            <p className="text-center text-lg mb-4">Presents</p>
            <img
                src={quizLogo}
                alt="Quiz Champ 2024 logo"
                className="h-24 sm:h-32"
            />

            <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-6 drop-shadow-lg animate-pulse">
                Quiz Champ 2024
            </h1>
            <p className="text-center sm:text-xl md:text-2xl sm:mb-8 shadow-lg bg-black/30 p-4 rounded-lg">
                Oops! Registration for Quiz Champ 2024 is now closed.
            </p>

            {/* Event counter */}
            <div className="flex justify-center items-center mt-4 gap-2 sm:space-y-0 sm:space-x-4 bg-black/30 p-6 rounded-lg shadow-xl">
                <div className="flex flex-col items-center">
                    <span className="text-lg sm:text-6xl font-bold drop-shadow-xl">
                        <span id="days">00</span>
                        <span className="text-lg sm:hidden">d</span>
                    </span>
                    <span className="text-lg hidden sm:inline">Days</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-lg sm:text-6xl font-bold drop-shadow-xl">
                        <span id="hours">00</span>
                        <span className="text-lg sm:hidden">h</span>
                    </span>
                    <span className="text-lg hidden sm:inline">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-lg sm:text-6xl font-bold drop-shadow-xl">
                        <span id="minutes">00</span>
                        <span className="text-lg sm:hidden">m</span>
                    </span>
                    <span className="text-lg hidden sm:inline">Minutes</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-lg sm:text-6xl font-bold drop-shadow-xl">
                        <span id="seconds">00</span>
                        <span className="text-lg sm:hidden">s</span>
                    </span>
                    <span className="text-lg hidden sm:inline">Seconds</span>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center space-y-4">
                <p className="text-center text-xs sm:text-lg">
                    Already enrolled? Check your pass status
                </p>

                <a
                    href="/check"
                    className="px-2 py-1 bg-green-500 rounded-lg whitespace-nowrap my-2 text-sm"
                >
                    Check Pass Status
                </a>
                <p className="text-center text-xs sm:text-lg mb-4">
                    Contact us on WhatsApp
                    <a
                        href="https://wa.me/+916204743523"
                        className="text-green-300 underline ml-2"
                    >
                        +91 6204 743 523
                    </a>
                </p>
                <p className="text-center text-xs sm:text-lg mb-4 max-w-md">
                    Don't sweat it! The next round of Quiz Champ is just around
                    the corner. Get ready to flex those brain muscles and claim
                    your crown!
                </p>
            </div>
        </div>
    );
}

export default Closed;
