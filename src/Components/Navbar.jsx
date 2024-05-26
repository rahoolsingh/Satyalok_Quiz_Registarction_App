import React from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Registration Form",
        href: "/register",
    },
    {
        name: "Check Status",
        href: "/check",
    },
    {
        name: "Support",
        href: "https://wa.me/918210228101?text=I%20need%20help%20with%20my%20pass%20status%20on%20Quiz%20Champ%202024.",
    },
];

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="max-w-7xl w-full bg-white fixed shadow">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                <div className="inline-flex items-center space-x-2">
                    <span className="font-bold">
                        <span className="font-bold text-xl">
                            <span className="text-slate-900">Quiz Champ</span>
                        </span>{" "}
                        <span className="bg-orange-500 text-white px-1 text-xs">
                            2024
                        </span>
                    </span>
                </div>
                <div className="hidden lg:block">
                    <ul className="inline-flex space-x-8">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className="text-sm font-semibold text-gray-800 hover:text-gray-900 hover:underline underline-offset-4"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="">
                    <Link
                        to="/check"
                        type="button"
                        className="inline-flex text-xs items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm font-semibold text-white bg-green-500 hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Check Status
                    </Link>
                </div>

                <div className="lg:hidden">
                    <Menu
                        onClick={toggleMenu}
                        className="h-6 w-6 cursor-pointer"
                    />
                </div>
                {isMenuOpen && (
                    <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                        <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px-5 pb-6 pt-5">
                                <div className="flex items-center justify-between">
                                    <div className="inline-flex items-center space-x-2">
                                        <span className="font-bold">
                                            <span className="font-bold text-xl">
                                                <span className="text-slate-900">
                                                    Quiz Champ
                                                </span>
                                            </span>{" "}
                                            <span className="bg-orange-500 text-white px-1 text-xs">
                                                2024
                                            </span>
                                        </span>
                                    </div>
                                    <div className="-mr-2">
                                        <button
                                            type="button"
                                            onClick={toggleMenu}
                                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            <span className="sr-only">
                                                Close menu
                                            </span>
                                            <X
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-4">
                                        {menuItems.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                                            >
                                                <span className="ml-3 text-base font-medium text-gray-900">
                                                    {item.name}
                                                </span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
