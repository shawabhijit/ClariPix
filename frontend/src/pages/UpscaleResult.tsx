import { useContext, useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Commet } from "react-loading-indicators";
import { AppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ImagePopover from "@/Components/ImagePopover";

interface ImageDimensions {
    width: number;
    height: number;
}

const UpscaleResult = () => {
    const [clickedImage, setSelectedImage] = useState<string | null>(null);
    const [originalDimensions, setOriginalDimensions] = useState<ImageDimensions | null>(null);
    const [upscaledDimensions, setUpscaledDimensions] = useState<ImageDimensions | null>(null);
    const [showActualSize, setShowActualSize] = useState(false);

    const appContext = useContext(AppContext);
    const image = appContext?.image;
    const resultImage = appContext?.resultImage;
    const isGenerating = appContext?.isGenerating;
    const navigate = useNavigate();

    // Get image dimensions
    const getImageDimensions = (imageSrc: string | File): Promise<ImageDimensions> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.naturalWidth, height: img.naturalHeight });
            };
            img.onerror = reject;

            if (typeof imageSrc === 'string') {
                img.src = imageSrc;
            } else {
                img.src = URL.createObjectURL(imageSrc);
            }
        });
    };

    useEffect(() => {
        if (image) {
            getImageDimensions(image).then(setOriginalDimensions).catch(console.error);
        }
    }, [image]);

    useEffect(() => {
        if (resultImage && typeof resultImage === 'string') {
            getImageDimensions(resultImage).then(setUpscaledDimensions).catch(console.error);
        }
    }, [resultImage]);

    const handleSave = async () => {
        if (!resultImage || !appContext) {
            toast.error("No image to save.");
        }
        appContext?.saveUserHistory?.({ image: resultImage, sorceType: "Enhance Resolution" });
    };

    const handleEdit = () => {
        if (!resultImage || !appContext) return;
        appContext?.setEditImage?.(null);
        if (resultImage) {
            appContext.setEditImage?.(resultImage as string);
            navigate("/editor");
        }
        toast("Opening editor...", { icon: "🖌️" });
    };

    const handleDownloadImage = () => {
        if (!resultImage) return;
        const link = document.createElement("a");
        link.download = `upscaled-image-${upscaledDimensions?.width}x${upscaledDimensions?.height}.png`;
        link.href = resultImage as string;
        link.click();
    };

    useEffect(() => {
        if (!image) {
            window.location.href = "/image-upscale";
        }
    }, [image]);

    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-7xl border-2 border-dashed border-gray-800 p-10 rounded-3xl shadow-lg">
                <div className="grid lg:grid-cols-2 gap-10 mx-auto px-4">
                    <div
                        className="rounded-xl overflow-hidden relative cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"
                        onClick={() => setSelectedImage(URL.createObjectURL(image))}
                    >
                        <span className="absolute top-4 left-4 bg-green-500/80 px-3 font-semibold py-1 rounded-2xl text-white shadow-lg">
                            Before {originalDimensions && `(${originalDimensions.width}×${originalDimensions.height})`}
                        </span>
                        <img
                            src={image ? URL.createObjectURL(image) : undefined}
                            alt="Before image"
                            className="w-full h-full object-cover"
                            style={{
                                maxWidth: showActualSize ? 'none' : '100%',
                                height: showActualSize ? 'auto' : 'auto'
                            }}
                        />
                    </div>

                    <div
                        className="rounded-xl overflow-hidden relative cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md border-0"
                        onClick={() => resultImage && setSelectedImage(resultImage as string)}
                    >
                        <span className="absolute top-4 left-4 bg-blue-500/80 px-3 font-semibold py-1 rounded-2xl text-white shadow-lg">
                            After {upscaledDimensions && `(${upscaledDimensions.width}×${upscaledDimensions.height})`}
                        </span>
                        {resultImage && (
                            <img
                                src={resultImage as string}
                                className="w-full h-full object-cover"
                                style={{
                                    maxWidth: showActualSize ? 'none' : '100%',
                                    height: showActualSize ? 'auto' : 'auto'
                                }}
                            />
                        )}
                        {isGenerating && (
                            <div className="absolute inset-0 backdrop-blur-sm p-2 cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-sm text-white font-medium">
                                <Commet color={["#093a09", "#106610", "#179217", "#1ebe1e"]} />
                            </div>
                        )}
                    </div>
                </div>

                {showActualSize && (
                    <p className="text-center text-sm text-gray-600 mt-4 bg-yellow-100 p-3 rounded-lg">
                        <strong>Note:</strong> Images are now shown at their actual pixel dimensions. Scroll to see the full images.
                    </p>
                )}

                {/* Buttons */}
                {
                    resultImage && !isGenerating && (
                        <div className="text-center flex flex-wrap gap-5 justify-center items-center mt-12">
                            <Button onClick={() => handleSave()} variant="secondary" className="cursor-pointer px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                                Save to History
                            </Button>
                            <Button onClick={() => handleEdit()} variant="secondary" className="cursor-pointer px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                                Edit Image
                            </Button>
                            <Button onClick={() => handleDownloadImage()} variant="secondary" className="cursor-pointer px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                                Download Image
                            </Button>
                        </div>
                    )
                }
            </div>

            {/* Popover / Modal */}
            <ImagePopover clickedImage={clickedImage} setSelectedImage={setSelectedImage} isGenerating={!!isGenerating} />
        </div>
    );
};

export default UpscaleResult;