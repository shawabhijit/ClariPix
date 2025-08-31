import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Save, Edit3, ArrowLeft, Sparkles, Plus } from "lucide-react";
import { Button } from "@/Components/ui/button";
import toast from "react-hot-toast";
import { AppContext } from "@/context/AppContext";
import { base64ToFile, uploadToCloudninary } from "@/util/Cloudinary";

export const ResultPage = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBackground, setSelectedBackground] = useState<string>("transparent");
    const [bgChanged, setBgChanged] = useState(false);


    const appContext = useContext(AppContext);
    const resultImage = appContext?.resultImage;

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
        { id: "gradient1", bg: "linear-gradient(135deg, hsl(45, 93%, 47%), hsl(25, 95%, 53%))", label: "Warm Gradient" },
        { id: "gradient2", bg: "linear-gradient(135deg, hsl(280, 65%, 75%), hsl(320, 70%, 70%))", label: "Pink Gradient" },
        { id: "pattern1", bg: "radial-gradient(circle, hsl(var(--muted)) 1px, transparent 1px)", bgSize: "20px 20px", label: "Dots" },
        { id: "pattern2", bg: "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%)", bgSize: "20px 20px", label: "Stripes" },
        { id: "pattern1", bg: "radial-gradient(circle, hsl(var(--muted)) 1px, transparent 1px)", bgSize: "20px 20px", label: "Dots" },
        { id: "pattern2", bg: "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%)", bgSize: "20px 20px", label: "Stripes" },
        { id: "pattern1", bg: "radial-gradient(circle, hsl(var(--muted)) 1px, transparent 1px)", bgSize: "20px 20px", label: "Dots" },
        { id: "pattern2", bg: "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%)", bgSize: "20px 20px", label: "Stripes" },
    ];

    useEffect(() => {
        if (resultImage) {
            setIsLoading(false);
        }
    }, [navigate, resultImage]);


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
        appContext?.saveUserHistory?.({ image: url , sorceType: "bg-remove" });
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
                <div className="max-w-6xl mx-auto">
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
                        <div className="flex flex-col lg:flex-row gap-6 border">
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
                                            imageBackgrounds.find(bg => bg.id === selectedBackground)?.bg ||
                                            "transparent",
                                        backgroundSize: selectedBackground === "transparent"
                                            ? "20px 20px"
                                            : imageBackgrounds.find(bg => bg.id === selectedBackground)?.bgSize || "cover",
                                        backgroundPosition: selectedBackground === "transparent"
                                            ? "0 0, 0 10px, 10px -10px, -10px 0px"
                                            : "center"
                                    }}
                                >
                                    <img
                                        src={resultImage as string}
                                        alt="Processed result"
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Sidebar with Background Options */}
                            <div className="w-full lg:w-80 space-y-6 relative">
                                {/* Color Background Section */}
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

                                {/* Image Background Section */}
                                {
                                    bgChanged && (
                                            <div className="glass-card p-6 rounded-xl relative scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/50 scrollbar-track-transparent max-h-96 overflow-y-auto">
                                                <h3 className="text-lg font-semibold mb-4">Image background</h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {/* Add New Background Button */}
                                                    <button className="w-full h-20 border-2 border-dashed border-border rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-glass-hover transition-all group">
                                                        <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                                                    </button>

                                                    {imageBackgrounds.map((bg) => (
                                                        <button
                                                            key={bg.id}
                                                            onClick={() => setSelectedBackground(bg.id)}
                                                            className={`w-full h-20 rounded-lg border-2 transition-all hover:scale-105 ${selectedBackground === bg.id
                                                                ? "border-primary shadow-glow"
                                                                : "border-border hover:border-primary/50"
                                                                }`}
                                                            style={{
                                                                background: bg.bg,
                                                                backgroundSize: bg.bgSize || "cover"
                                                            }}
                                                            title={bg.label}
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
                                        Download All
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