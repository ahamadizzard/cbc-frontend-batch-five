import React, { useState } from 'react';
export default function TestPage() {
    const [count, setCount] = useState(0);
    // in this case, count is a state variable and 
    // setCount is a function to update the state variable count
    // useState is a hook that allows you to add state to 
    // functional components in React


    return (
        <div className="w-full h-screen  flex justify-center items-center">
            <div className="w-[450px] h-[250px] shadow-lg  flex justify-center items-center ">
                <button onClick={() => {
                    setCount(count - 1);
                    console.log("minus clicked", count);
                }}
                    className="bg-blue-500 w-[60px] h-[60px] rounded-2xl hover:bg-blue-400 cursor-pointer text-white p-2 ">-</button>
                <span className="mx-4 text-2xl">
                    {count}
                </span>
                <button onClick={() => {
                    setCount(count + 1);
                    console.log("plus clicked", count);
                }} className="bg-blue-500 w-[60px] h-[60px] rounded-2xl hover:bg-blue-400 cursor-pointer text-white p-2 ">+</button>
            </div>
        </div>
    );
}