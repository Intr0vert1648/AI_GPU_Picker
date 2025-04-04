import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-800 p-4">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">AI Powered <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">GPU Picker</span></h1>
            <p className="text-lg text-center font-normal text-gray-500 lg:text-xl dark:text-gray-400">Chat with our bot to find the best GPU based on your budget and preferences.</p>
            {/* <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
                Chat with our bot to find the best GPU based on your budget and preferences.
            </p> */}
            <Link
                to="/chat"
                className="px-6 py-3 bg-cyan-700 text-white rounded-lg hover:bg-blue-600 transition duration-200 text-center mt-6 "
            >
                Start Chatting
            </Link>
        </div>
    );
}

export default Home;
