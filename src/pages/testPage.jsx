import React, { useState } from "react";

import mediaUpload from "../utils/mediaUpload";

export default function TestPage() {
    const [image, setImage] = useState(null);

    function fileUpload() {
        mediaUpload(image)
            .then((res) => {
                console.log("File uploaded successfully: ", res);
            })
            .catch((res) => {
                console.log("Error uploading file: ", res);
            });
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                onChange={(e) => {
                    setImage(e.target.files[0]); // Set the selected file to state
                    console.log("File selected: ", e.target.files[0]);
                }}
            />
            <button
                onClick={fileUpload}
                className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
            >
                Upload
            </button>
        </div>
    );
}
