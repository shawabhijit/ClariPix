import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Save, Edit3, ArrowLeft, Sparkles, Plus, Wand2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import toast from "react-hot-toast";
import { AppContext } from "@/context/AppContext";
import { base64ToFile, uploadToCloudninary } from "@/util/Cloudinary";
import { Input } from "@/Components/ui/input";

export const ResultPage = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBackground, setSelectedBackground] = useState<string>("transparent");
    const [bgChanged, setBgChanged] = useState(true);
    const [prompt, setPrompt] = useState("");


    const appContext = useContext(AppContext);
    const resultImage = appContext?.resultImage;
    const image = appContext?.image;
    const generateByPrompt = appContext?.bgChnageUsingPrompt
    const generateByBgImage = appContext?.bgChnageUsingImage;

    const handleBgChangeByImage = (selectedImage : any , bg_image : any , bg_image_url : any , bgId : any) => {
        setSelectedBackground(bgId);
        generateByBgImage?.(selectedImage , bg_image , bg_image_url);
    }


    //console.log("Result Image:", resultImage);

    // Background options
    const colorBackgrounds = [
        { id: "transparent", color: "transparent", label: "Transparent" },
        { id: "black", color: "hsl(0, 0%, 0%)", label: "Black" },
        { id: "red", color: "hsl(0, 84%, 60%)", label: "Red" },
        { id: "orange", color: "hsl(25, 95%, 53%)", label: "Orange" },
        { id: "yellow", color: "hsl(45, 93%, 47%)", label: "Yellow" },
        { id: "green", color: "hsl(120, 61%, 50%)", label: "Green" },
        { id: "blue", color: "hsl(217, 91%, 60%)", label: "Blue" },
        { id: "purple", color: "hsl(270, 75%, 60%)", label: "Purple" },
        { id: "gradient", color: "var(--primary)", label: "Gradient" },
    ];

    const imageBackgrounds = [
        { id: "gradient1", bg: "https://imgs.search.brave.com/eJG_J3Ir7QZp-sjCPZxM-Eafa7D-H9af0sTsDqUSuds/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE4/NjAxNTE2Ni9waG90/by9jaHJpc3RtYXMt/YmFja2dyb3VuZC53/ZWJwP2E9MSZiPTEm/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9NlVh/cXlrZHdrLVVIVXFM/bVRVOXlUMXRpOF9J/UWdoaGg3NGZmanpJ/S3Etcz0"},
        { id: "gradient2", bg: "https://imgs.search.brave.com/H-hA4Bt5MQIyFnmQX8qVi5loXi6kCTsEGXFfYnm0gZA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9icmlnaHQtYWJz/dHJhY3QtYmFja2dy/b3VuZC13aXRoLW9y/YW5nZS1yZWQtd2hp/dGUtc21vb3RoLWxp/bmVzXzQ3NjM2My01/NTUuanBnP3NlbXQ9/YWlzX2h5YnJpZCZ3/PTc0MA"},
        { id: "pattern1", bg: "https://imgs.search.brave.com/o3lP6Ni6279EPN60DdQrzBwZxRKeQU6ful6kLEpw78U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/YWJzdHJhY3QtYmFj/a2dyb3VuZC1vZi1m/b3VyLWNvbG9yZWQt/dHJpYW5nbGVzLmpw/Zz93aWR0aD0xMDAw/JmZvcm1hdD1wanBn/JmV4aWY9MCZpcHRj/PTA" },
        { id: "pattern2", bg: "https://imgs.search.brave.com/600Oxjm4KiEVrDSUPKHBVnotMan_DK-X_VSZsD1hz7U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8w/Ny8wNS8wMC8yOC9i/YWNrZ3JvdW5kLTE0/OTc4NzNfNjQwLmpw/Zw"},
        { id: "pattern1", bg: "https://imgs.search.brave.com/z-Nv8oBcJgkwsVsmLP20bCqq26qIFuWj0MqrPJKhzak/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTU4/NjkzNzQ0L3ZlY3Rv/ci9hYnN0cmFjdC1y/ZWQtbGlnaHQtdHJh/aWwtb24tYmx1ZS1i/YWNrZ3JvdW5kLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz16/YWtsQ2txS1pGaVpG/R2NPamFzR1pMb3B5/X2NncDdmeUExeVhs/dHhRR0RjPQ", },
        { id: "pattern2", bg: "https://imgs.search.brave.com/NMhEOnxjgUy4HmSNSmMz4IOXUhNfvHgE0LTDcDk_-fE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzU3LzgzLzA4/LzM2MF9GXzM1Nzgz/MDg5MF9PYTNCYW1Q/dkVNMXJqVko3MlpI/S3JPVEtZS2RWUElQ/ZC5qcGc"},
        { id: "pattern1", bg: "https://imgs.search.brave.com/QvxTcCZUuXwN3XQzRDeqg_2pWnqQhRakGzGNJfwtUGM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by93/YXRlcmNvbG9yLXRl/eHR1cmUtYmFja2dy/b3VuZF8yNDk3Mi05/NjIuanBnP3NlbXQ9/YWlzX2luY29taW5n/Jnc9NzQwJnE9ODA"},
        { id: "pattern2", bg: "https://imgs.search.brave.com/HUflPhr3vEEm3ZrQIrbg1FZgxjx8D5tujzYcs0GpJmM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2xhcmdlLXByZXZp/ZXdzL2RkNy9mbHVp/ZC1hYnN0cmFjdC1i/YWNrZ3JvdW5kLTA0/MTAtNTY5ODI5NC5q/cGc_Zm10"},
        { id: "pattern1", bg: "https://imgs.search.brave.com/8mtxRpUQgBjecSiI4n-qwS5Z2YraK_zsjxVXIPh3ArQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/d2hpdGUtYWJzdHJh/Y3QtYmFja2dyb3Vu/ZF8yMy0yMTQ4ODE3/NTcyLmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDAmcT04MA"},
        { id: "pattern2", bg: "https://imgs.search.brave.com/gm9QPxIf1mUwSPdWOukt16JFarUlUbhg35nPq7ive6w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2xhcmdlLXByZXZp/ZXdzLzczNi90ZXh0/dXJlZC1sZWF0aGVy/LWJhY2tncm91bmQt/MDQxMC01Njk4NzQ2/LmpwZz9mbXQ"},
    ];

    useEffect(() => {

        if (resultImage || image) {
            setIsLoading(false);
        }

    }, [navigate, resultImage, image]);


    const handleSave = async () => {
        if (!resultImage || !appContext) return;
        const file = base64ToFile(resultImage as string, "bg-removed.png");
        //console.log("Converted File:", file);
        if (!file) {
            return toast.error("Failed to convert image for saving.");
        }
        const url = await uploadToCloudninary(file);
        //console.log("Uploaded Image URL:", url);
        if (!url) {
            return toast.error("Failed to upload image. Please try again.");
        }
        appContext?.saveUserHistory?.({ image: url, sorceType: "bg-remove" });
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


    //Download processed image
    const handleDownloadImage = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = resultImage as string;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Fill background color
            ctx!.fillStyle = selectedBackground;
            ctx!.fillRect(0, 0, canvas.width, canvas.height);

            // Draw transparent image on top
            ctx!.drawImage(img, 0, 0);

            // Download
            const link = document.createElement("a");
            link.download = "background-changed.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        };
    };

    return (
        <div className="min-h-screen relative bg-primary/15">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <header className="animate-fade-in">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/remove-bg")}
                        className="mb-4 glass-card"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    {/* TODO: asked user with a popover is user realy want to cancel the processing */}
                </header>

                {/* Main Content */}
                <div className="md:max-w-6xl max-w-5xl mx-auto">
                    {isLoading ? (
                        <div className="text-center py-16 animate-fade-in">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center animate-glow-pulse">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Processing Your Image</h2>
                            <p className="text-muted-foreground">AI is working its magic...</p>
                        </div>
                    ) : (
                        /* New Layout: Large Preview + Sidebar */
                        <div className="flex flex-col lg:flex-row gap-6 h-[50%] md:h-full overflow-hidden border">
                            {/* Main Preview Area */}
                            <div className="flex-1 glass-card rounded-xl overflow-hidden">
                                <div
                                    className="relative w-full h-[600px] flex items-center justify-center"
                                    style={{
                                        background: selectedBackground === "transparent"
                                            ? `
                        linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%),
                        linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%),
                        linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)
                        `
                                            : colorBackgrounds.find(bg => bg.id === selectedBackground)?.color ||
                                            "transparent",
                                        backgroundSize: selectedBackground === "transparent"
                                            ? "20px 20px"
                                            : "cover",
                                        backgroundPosition: selectedBackground === "transparent"
                                            ? "0 0, 0 10px, 10px -10px, -10px 0px"
                                            : "center"
                                    }}
                                >
                                    <img
                                        src={resultImage ? resultImage as string : (image ? URL.createObjectURL(image) : "")}
                                        alt="Processed result"
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                                {
                                    bgChanged && (
                                        <div className="flex flex-col p-4  w-full">
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <div className="flex-1">
                                                    <Input
                                                        placeholder="Describe your desire background..."
                                                        value={prompt}
                                                        onChange={(e: any) => setPrompt(e.target.value)}
                                                        className="h-12 text-white border-1 border-dashed border-gray-700 text-base focus-none transition-colors"
                                                        onKeyDown={(e: any) => e.key === "Enter" && generateByPrompt?.(image, prompt)}
                                                    />
                                                </div>
                                                <Button
                                                    onClick={() => generateByPrompt?.(image, prompt)}
                                                    //disabled={!prompt.trim() || isGenerating}
                                                    className="h-12 px-8 gradient-accent text-white border-0 font-semibold"
                                                >
                                                    {/* {isGenerating ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                                        Generating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Wand2 className="w-4 h-4 mr-2" />
                                                        Generate
                                                    </>
                                                )} */} generate
                                                </Button>
                                                {/* <Button
                                            onClick={handleGetImages}
                                            className="h-12 px-8 bg-gray-800 text-white border-0 font-semibold"
                                        >
                                            Get Images
                                        </Button> */}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            {/* Sidebar with Background Options */}
                            <div className="w-full lg:w-80 space-y-4 relative bg-background">
                                {/* Color Background Section */}
                                {
                                    !bgChanged && (
                                        <div className="p-6 rounded-xl">
                                            <h3 className="text-lg font-semibold mb-4">Color background</h3>
                                            <div className="grid grid-cols-4 gap-3">
                                                {colorBackgrounds.map((bg) => (
                                                    <button
                                                        key={bg.id}
                                                        onClick={() => setSelectedBackground(bg.id)}
                                                        className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-105 ${selectedBackground === bg.id
                                                            ? "border-primary shadow-glow"
                                                            : "border-border hover:border-primary/50"
                                                            }`}
                                                        style={{
                                                            background: bg.id === "transparent"
                                                                ? `
                                linear-gradient(45deg, hsl(var(--accent2)) 25%, transparent 25%),
                                linear-gradient(-45deg, hsl(var(--accent2)) 25%, transparent 25%),
                                linear-gradient(45deg, transparent 75%, hsl(var(--accent2)) 75%),
                                linear-gradient(-45deg, transparent 75%, hsl(var(--accent2)) 75%)
                                `
                                                                : bg.color,
                                                            backgroundSize: bg.id === "transparent" ? "8px 8px" : "cover",
                                                            backgroundPosition: bg.id === "transparent" ? "0 0, 0 4px, 4px -4px, -4px 0px" : "center"
                                                        }}
                                                        title={bg.label}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }

                                {/* Image Background Section */}
                                {
                                    bgChanged && (
                                        <div className="p-6 h-full border rounded-xl">
                                            <h3 className="text-lg font-semibold mb-4">Image background</h3>
                                            <div className="grid grid-cols-2 max-h-64 md:max-h-[450px] gap-3 mb-20 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/50 scrollbar-track-transparent overflow-y-auto bg-background">
                                                {/* Add New Background Button */}
                                                <button className="w-full h-20 border-2 border-dashed border-border rounded-lg flex items-center justify-center hover:border-primary/50 transition-all group">
                                                    <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                                                </button>

                                                {imageBackgrounds.map((bg) => (
                                                    <img
                                                        key={bg.id}
                                                        onClick={() => handleBgChangeByImage(image , null , bg.bg , bg.id)}
                                                        className={`w-full h-20 rounded-lg p-1 transition-all hover:scale-105`}
                                                        src={bg.bg}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }

                                {/* Download Section */}
                                <div className="space-y-4 absolute bottom-0 left-0 w-full p-6 glass-card rounded-xl bg-background">
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        onClick={handleDownloadImage}
                                        className="w-full group"
                                    >
                                        <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                        Download
                                    </Button>

                                    {/* Additional Action Buttons */}
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleSave}
                                            className="flex-1 glass-card group"
                                        >
                                            <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                            Save
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleEdit}
                                            className="flex-1 glass-card group"
                                        >
                                            <Edit3 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                            Edit
                                        </Button>
                                    </div>

                                    <p className="text-xs text-muted-foreground text-center">
                                        Download Before Exit
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultPage;