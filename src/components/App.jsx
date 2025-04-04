import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from 'react';
import runChat from "./Gemini";
import Markdown from "react-markdown";
import { tr } from "framer-motion/client";


function Chat() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [task, setTask] = useState("");
  const [price, setPrice] = useState("");
  const structuredPrompt = `From the data you were trained on give me the best GPU for ${task} in the price range of ${price} INR... take into consideration atleast 3 to 4 GPUS from the given price range and compare them on the basis of their "Median score" and their price. And give the output based on the following structured format:
  Sure! Here's the clean structured format without the specific GPU details:
  ---
  # **Best Recommendation:**  
  ## **<GPU Name>**  
  ### **Median Score:**  
  ### **Price:**  
  ### **Reason for Recommending (Pros and Cons):**  

  **Pros:**  
  -  
  -  
  -  

  **Cons:**  
  -  
  -  
  
  ---

  # **Alternatives:**  

  ## **<Option 1 - GPU Name>**  
  ### **Median Score:**  
  ### **Price:**  
  ### **Pros:**  
  -  
  -  
  -  
  ### **Cons:**  
  -  
  -  

---

## **<Option 2 - GPU Name>**  
### **Median Score:**  
### **Price:**  
### **Pros:**  
-  
-  
-  
### **Cons:**  
-  
-  

---

## **<Option 3 - GPU Name>**  
### **Median Score:**  
### **Price:**  
### **Pros:**  
-  
-  
-  
### **Cons:**  
-  
-  

---`;

  const sendMessage = async (e, prompt = "") => {
    e.preventDefault();
    console.log(setTask);
    console.log(setPrice);
    if (!prompt.trim()) return;

    const userMessage = { text: prompt, isBot: false };
    setMessages([...messages, userMessage]);
    const output = await runChat(userMessage.text);
    setInput("");
    console.log(output);

    setTimeout(() => {
      const botMessage = { text: output, isBot: true };
      setMessages([...messages, userMessage, botMessage]);
    }, 1000);
  };


  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
        <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>

        <aside id="default-sidebar" className="py-4 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-black" aria-label="Sidebar">
          <div className="h-full px-3 py-8 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-r-lg">
            <ul className="space-y-2 font-medium">
              <form onSubmit={(e) => sendMessage(e, structuredPrompt)}>
                <li>
                  <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Use Case</label>
                    <input autoComplete="off" type="text" id="first_name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none" placeholder="Enter Your Use Case" required value={task} onChange={(e) => setTask(e.target.value)}
                    />
                  </div>
                </li>
                <li>
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input autoComplete="off" type="number" id="phone" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none" placeholder="Enter The Price In INR" required value={price} onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </li>
                <li className="flex flex-col align-center">
                  <button type='submit' className="flex-col flex mt-4 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-blue-500  dark:bg-gray-700 group">
                    <span className="text-center whitespace-nowrap">Search</span>
                  </button>
                </li>
              </form>
            </ul>
          </div>
        </aside>

        <div className=" flex-col p-4 h-screen sm:ml-64 bg-black">
          <div className="flex flex-col h-full  p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center dark:text-gray-100 text-gray-800">GPU Recommender Chatbot</h1>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white dark:bg-slate-700 shadow-lg rounded-lg flex flex-col w-full h-full">
              {messages.length == 0 ? (
                <>
                  <h1 className="mt-70 ml-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><mark className="px-2 text-white bg-blue-600 rounded-sm dark:bg-blue-500">Hello User</mark></h1>
                  <h1 className="mt-4 ml-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Enter your choices in the Sidebar</h1>
                </>
              ) : (
                <div className="flex flex-col space-y-2 w-full h-full p-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      className={`p-3 rounded-lg max-w-xs text-sm ${msg.isBot ? "bg-gray-800 text-gray-400 self-start" : "bg-blue-500 text-white self-end ml-auto"}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Markdown>
                        {msg.text}
                      </Markdown>
                    </motion.div>
                  ))}
                </div>
              )}


            </div>
            <form onSubmit={(e) => sendMessage(e, input)}>
              <div className="flex items-center gap-2 mt-2 w-full p-4 bg-white dark:bg-slate-700 shadow-md rounded-lg">
                {messages.length == 0 ? (
                  <>
                    <input
                      disabled={false}
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about GPUs..."
                    />
                    <button
                      disabled={false}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                      type='submit'
                    >
                      <Send size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      disabled={false}
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about GPUs..."
                    />
                    <button
                      disabled={false}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                      type='submit'
                    >
                      <Send size={20} />
                    </button>
                  </>
                )}
                {/* <input
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about GPUs..."
                />
                <button
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  type='submit'
                >
                  <Send size={20} />
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
