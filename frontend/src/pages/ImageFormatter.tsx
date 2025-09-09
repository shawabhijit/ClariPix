import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Settings, Image as ImageIcon, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Slider } from "@/Components/ui/slider";
import { toast } from "react-hot-toast";
import { ImageUpload } from "@/Components/ImageUpload";
import { Commet } from "react-loading-indicators";
import { AppContext } from "@/context/AppContext";

export const ImageFormatter = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | boolean>("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [ispreset, setIsPreset] = useState<string>("Original");
    const [formatSettings, setFormatSettings] = useState({
        format: "png",
        quality: [90],
        width: [1920],
        height: [1080],
        maintainAspectRatio: true
    });

    const appContext = useContext(AppContext);
    const imageConverter = appContext?.imageConverter;
    const resultImage = appContext?.resultImage;

    const formatOptions = [
        { value: "png", label: "PNG" },
        { value: "jpeg", label: "JPEG" },
        { value: "webp", label: "WebP" },
        { value: "gif", label: "GIF" }
    ];

    const presetSizes = [
        { label: "Original", width: 0, height: 0 },
        { label: "HD (1920x1080)", width: 1920, height: 1080 },
        { label: "Square (1080x1080)", width: 1080, height: 1080 },
        { label: "Mobile (750x1334)", width: 750, height: 1334 },
        { label: "Thumbnail (300x300)", width: 300, height: 300 }
    ];

    const handleImageSelect = (file: File) => {
        setSelectedImage(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const handlePresetSize = (preset: typeof presetSizes[0]) => {
        setIsPreset(preset.label);
        if (preset.width === 0 && preset.height === 0) {
            // Original size - would need to get actual image dimensions
            return;
        }
        setFormatSettings(prev => ({
            ...prev,
            width: [preset.width],
            height: [preset.height]
        }));
    };

    const handleFormat = async () => {
        if (!selectedImage) {
            toast.error("Please upload an image first.");
            return;
        }
        setIsProcessing(true);  
        try {
            imageConverter?.(selectedImage, formatSettings.format, formatSettings.quality[100], formatSettings.width[0], formatSettings.height[0])
        }
        catch (error) {
            console.error("Error formatting image:", error);
            toast.error("Failed to format image. Please try again.");
        }
    };

    const handleDownload = () => {
        if (!previewUrl || typeof previewUrl !== 'string') return;
        // Create download link
        const link = document.createElement('a');
        link.href = previewUrl;
        link.download = `claripix-formatted.${formatSettings.format}`;
        link.click();

        toast.success("Download started!");
    };

    useEffect(() => {
        if (resultImage) {
            setPreviewUrl(resultImage);
            setIsProcessing(false);
            toast.success("Image formatted successfully!");
        }
    } , [resultImage]);
    return (
        <div className="min-h-screen relative ">
            <div className="container mx-auto px-4 py-8 ">
                {/* Header */}
                <header className="mb-2">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/")}
                        className="mb-4 cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </header>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto ">
                    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in">
                        {/* Left Side - Upload & Preview */}
                        <div className="flex-1 space-y-6">
                            {/* Upload Section */}
                            {!selectedImage ? (
                                <Card className="p-8 bg-primary/20 hover:bg-primary/10 text-white rounded-2xl">
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
                                            <ImageIcon className="w-8 h-8" />
                                        </div>
                                        <h2 className="text-xl font-semibold mb-2">Upload Your Image</h2>
                                        <p className="text-muted-foreground">
                                            Select an image to format and optimize
                                        </p>
                                    </div>

                                    <ImageUpload
                                        onImageSelect={handleImageSelect}
                                        selectedImage={selectedImage}
                                    // isProcessing={isProcessing}
                                    />
                                </Card>
                            ) : (
                                /* Preview Section */
                                <Card className="glass-card p-6 bg-background text-white">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold">Preview</h3>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedImage(null);
                                                setPreviewUrl("");
                                            }}
                                            className="gradient-primary hover:text-primary cursor-pointer"
                                        >
                                            Change Image
                                        </Button>
                                    </div>

                                    <div className="relative bg-muted/10 rounded-lg overflow-hidden">
                                        <div className="">
                                            <img
                                                src={previewUrl as string}
                                                alt="Preview"
                                                className="object-contain rounded-2xl w-full h-full"
                                            />
                                        </div>
                                        
                                        {isProcessing && (
                                            <div className="absolute inset-0 backdrop-blur-sm p-2 cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-sm text-white font-medium">
                                                <Commet color={["#093a09", "#106610", "#179217", "#1ebe1e"]} />
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            )}
                        </div>

                        {/* Right Side - Format Settings */}
                        <div className="w-full xl:w-96 space-y-6 ">
                            {/* Format Settings */}
                            <Card className="glass-card p-6 bg-background text-white rounded-2xl">
                                <div className="flex items-center gap-2 mb-6">
                                    <Settings className="w-5 h-5 text-primary" />
                                    <h3 className="text-lg font-semibold">Format Settings</h3>
                                </div>

                                <div className="space-y-6">
                                    {/* Output Format */}
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Output Format</label>
                                        <Select value={formatSettings.format} onValueChange={(value) =>
                                            setFormatSettings(prev => ({ ...prev, format: value }))
                                        }>
                                            <SelectTrigger className="w-full border-0 bg-primary/10">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="gradient-primary text-white">
                                                {formatOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Quality Slider */}
                                    {(formatSettings.format === "jpg" || formatSettings.format === "webp") && (
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">
                                                Quality: {formatSettings.quality[0]}%
                                            </label>
                                            <Slider
                                                value={formatSettings.quality}
                                                onValueChange={(value) =>
                                                    setFormatSettings(prev => ({ ...prev, quality: value }))
                                                }
                                                max={100}
                                                min={10}
                                                step={5}
                                                className="mt-2"
                                            />
                                        </div>
                                    )}

                                    {/* Preset Sizes */}
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Preset Sizes</label>
                                        <div className="grid grid-cols-1 gap-2">
                                            {presetSizes.map((preset) => (
                                                <Button
                                                    key={preset.label}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handlePresetSize(preset)}
                                                    className={`justify-start glass-card ${ispreset == preset.label ? "bg-primary" : ""}`}
                                                >
                                                    {preset.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Action Buttons */}
                            <div className="space-y-4">
                                <Button
                                    onClick={handleFormat}
                                    disabled={!selectedImage || isProcessing}
                                    size="lg"
                                    className="w-full group"
                                >
                                    <Sparkles className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                    {isProcessing ? "Formatting..." : "Format Image"}
                                </Button>

                                <Button
                                    onClick={handleDownload}
                                    disabled={!selectedImage}
                                    size="lg"
                                    className="w-full group"
                                >
                                    <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                    Download Formatted
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageFormatter;