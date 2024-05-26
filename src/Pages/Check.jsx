import React from "react";
import Navbar from "../Components/Navbar";
import { appwriteClient } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";

function Check() {
    const [searchBy, setSearchBy] = React.useState("mobile");
    const [mobile, setMobile] = React.useState("");
    const [passId, setPassId] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const navigate = useNavigate();

    const handleForm = async (e) => {
        if (searchBy === "mobile" && mobile.length !== 10) {
            handleError("Mobile number should be 10 digits");
            return;
        } else if (passId.length === 0 && searchBy === "passId") {
            handleError("Pass ID is required");
            return;
        }
        e.preventDefault();
        if (searchBy === "mobile" && mobile.length === 10) {
            setLoading(true);
            try {
                const detail = await appwriteClient.searchDocumnetbyMobile(
                    mobile
                );
                const pass = detail.documents[0].$id;
                navigate(`/success/pass/${pass}`);
                setLoading(false);
            } catch (error) {
                console.error(error);
                handleError("Mobile number not found");
                setLoading(false);
            }
        } else if (searchBy === "passId" && passId.length > 0) {
            try {
                navigate(`/success/pass/${passId}`);
                setLoading(false);
            } catch (error) {
                console.error(error);
                handleError("Pass ID not found");
                setLoading(false);
            }
        }
    };

    const removeError = () => {
        setError("");
    };

    const handleError = (error) => {
        if (typeof error === "string") {
            setError(error);
        } else {
            setError(error.message);
        }
        setLoading(false);

        setTimeout(() => {
            setError(null);
        }, 5000);
    };

    return (
        <div className="max-w-7xl m-auto bg-white h-dvh overflow-auto">
            <Navbar />
            <div className="pt-16 px-4 h-full w-full flex items-center justify-center flex-col">
                <h1 className="text-2xl font-bold mb-4">Check Status</h1>
                <form onSubmit={handleForm}>
                    {/* radio to choose passid, mobile */}
                    <div className="flex gap-4 items-center justify-center">
                        <div className="flex gap-2">
                            <span className="font-semibold">Search By:</span>
                            <div>
                                <input
                                    type="radio"
                                    name="searchBy"
                                    value="mobile"
                                    onChange={(e) =>
                                        setSearchBy(e.target.value)
                                    }
                                    className="mr-1"
                                    id="mobile"
                                    defaultChecked
                                ></input>
                                <label htmlFor="mobile">Mobile Number</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="searchBy"
                                    value="passId"
                                    onChange={(e) =>
                                        setSearchBy(e.target.value)
                                    }
                                    className="mr-1"
                                    id="passId"
                                ></input>
                                <label htmlFor="passId">Pass ID</label>
                            </div>
                        </div>
                    </div>
                    {searchBy === "mobile" ? (
                        <input
                            type="number"
                            placeholder="Mobile Number"
                            value={mobile}
                            onChange={(e) => {
                                setMobile((prev) => {
                                    if (e.target.value.length <= 10) {
                                        return e.target.value;
                                    }
                                    return prev;
                                });
                            }}
                            className="border-b-2 border-gray-400 p-2 w-full mt-4"
                        ></input>
                    ) : (
                        <input
                            type="text"
                            placeholder="Pass ID"
                            className="border-b-2 border-gray-400 p-2 w-full mt-4"
                            value={passId}
                            onChange={(e) => setPassId(e.target.value)}
                            required
                        ></input>
                    )}
                    {error && (
                        <div className="fixed bottom-10 w-full md:px-10 transform -translate-x-1/2 left-1/2 transition-all duration-300 ease-in-out">
                            <div
                                role="alert"
                                className="max-w-3xl w-[80%] flex md:ml-auto md:mr-0 m-auto items-center justify-between bg-red-500 text-white p-4 rounded-md shadow-md gap-4"
                            >
                                <span>{error}</span>
                                <button onClick={removeError}>
                                    <i className="fa fa-close"></i>
                                </button>
                            </div>
                        </div>
                    )}
                    {!loading && (
                        <input
                            type="submit"
                            value="Check Status"
                            className="bg-blue-500 text-white p-2 rounded-lg w-full mt-4"
                            required
                        ></input>
                    )}
                    {loading && (
                        <div className="w-full h-10 flex justify-center items-center">
                            <div className="loading loading">
                                Checking Status
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Check;
