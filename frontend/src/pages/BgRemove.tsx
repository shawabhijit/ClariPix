import axios from "axios";
import React, { useContext, useState } from "react";
// import { AppContext } from "../context/AppContext";

const ImageBgRemover: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);

    // const {image , resultImage} = useContext<any>(AppContext);

    // Handle file select
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setProcessedImage(null); // reset
        }
    };

    // Mock function for background removal
    const handleRemoveBackground = async () => {
        if (!selectedImage) return;
        const formData = new FormData();
        selectedImage && formData.append("file", selectedImage);

        const { data: base64Image } = await axios.post("http://localhost:8080/api/v1/remove-background", formData);
        setProcessedImage(`data:image/png;base64,${base64Image}`);
    };

    // Download processed image
    const handleDownloadImage = () => {
        if (!processedImage) return;
        const link = document.createElement('a');
        link.href = processedImage;
        link.download = 'background-removed.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen flex gap-10 items-center justify-center bg-gray-900 text-white p-6">
            <div>
                <h1 className="text-3xl font-bold mb-6">ClariPix - Background Remover</h1>

                {/* File Input */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4 text-sm"
                />

                {/* Selected Image Preview */}
                {selectedImage && (
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Original Image</h2>
                        <div className="w-[600px] h-[400px] border-2 border-green-500 rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                className="w-full h-full object-contain bg-white"
                            />
                        </div>
                    </div>
                )}

                {/* Remove Background Button */}
                {selectedImage && (
                    <button
                        onClick={handleRemoveBackground}
                        className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-semibold shadow-md transition-all duration-300"
                    >
                        Remove Background
                    </button>
                )}
            </div>

            {/* Processed Image Preview */}
            {processedImage && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Background Removed</h2>
                    <div className="w-[600px] h-[400px] border-2 border-blue-500 rounded-lg overflow-hidden shadow-lg">
                        <img
                            src={processedImage}
                            alt="Processed"
                            className="w-full h-full object-contain bg-white"
                        />
                    </div>
                    <button
                        onClick={handleDownloadImage}
                        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold shadow-md transition-all duration-300"
                    >
                        Download Image
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageBgRemover;
