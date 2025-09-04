import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Commet } from "react-loading-indicators";

const UpscaleResult = () => {
    const [clickedImage, setSelectedImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(true);

    

    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-7xl border-2 border-dashed border-gray-800 p-10 rounded-3xl shadow-lg">
                <div className="grid lg:grid-cols-2 gap-10 mx-auto px-4">
                    <div
                        className="rounded-xl overflow-hidden relative cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"
                        onClick={() => setSelectedImage("https://imgs.search.brave.com/qp1YJQcONkgVj5oMRPOGn3wrzhooLzTkaPapqIjo720/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aW1ndXBzY2FsZXIu/YWkvdXNlcnNwYWNl/L2ltZ3Vwc2NhbGVy/L2ltYWdlL2ZlYXR1/cmVfdW5ibHVyXzVf/bmV3LndlYnA")}
                    >
                        <span className="absolute top-4 left-4 bg-primary/30 px-3 font-semibold py-1 rounded-2xl border border-primary text-primary">
                            Before
                        </span>
                        <img
                            src="https://imgs.search.brave.com/qp1YJQcONkgVj5oMRPOGn3wrzhooLzTkaPapqIjo720/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aW1ndXBzY2FsZXIu/YWkvdXNlcnNwYWNl/L2ltZ3Vwc2NhbGVy/L2ltYWdlL2ZlYXR1/cmVfdW5ibHVyXzVf/bmV3LndlYnA"
                            alt="Before image"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div
                        className="rounded-xl overflow-hidden relative cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"
                        onClick={() => setSelectedImage("https://imgs.search.brave.com/_UhaJiU3drUCekFNIylxRhs6LlNeA2BEnZ52bLZsQHI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aW1ndXBzY2FsZXIu/YWkvdXNlcnNwYWNl/L2ltZ3Vwc2NhbGVy/L2ltYWdlL2ZlYXR1/cmVfYmx1cl81Lndl/YnA")}
                    >
                        <span className="absolute top-4 left-4 bg-primary/30 px-3 font-semibold py-1 rounded-2xl border border-primary text-primary">
                            After
                        </span>
                        <img
                            src="https://imgs.search.brave.com/_UhaJiU3drUCekFNIylxRhs6LlNeA2BEnZ52bLZsQHI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aW1ndXBzY2FsZXIu/YWkvdXNlcnNwYWNl/L2ltZ3Vwc2NhbGVy/L2ltYWdlL2ZlYXR1/cmVfYmx1cl81Lndl/YnA"
                            alt="After image"
                            className="w-full h-full object-cover"
                        />
                        {
                            isGenerating && (
                                <div className="absolute inset-0 backdrop-blur-sm p-2 cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-sm text-white font-medium">
                                    <Commet color={["#093a09", "#106610", "#179217", "#1ebe1e"]} />
                                </div>
                            )
                        }
                    </div>

                </div>

                {/* Buttons */}
                <div className="text-center flex flex-col lg:flex-row gap-5 justify-center items-center mt-12">
                    {["Download Image", "Save to History", "Edit Image"].map((title, i) => (
                        <Button key={i} variant="secondary" className="cursor-pointer px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                            {title}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Popover / Modal */}
            <AnimatePresence>
                {clickedImage && (
                    <motion.div
                        className="fixed w-full h-full inset-0 bg-background bg-opacity-70 flex justify-center items-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            src={clickedImage}
                            alt="Popup"
                            className="rounded-xl max-w-[80vw] max-h-[80vh] shadow-2xl cursor-pointer"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UpscaleResult;
