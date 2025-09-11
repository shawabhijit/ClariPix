import SpecificFeatureSection from "@/Components/SpecificFeatureSection";
import TipsSection from "@/Components/TipsSection";
import { Button } from "@/Components/ui/button"
import UseCases from "@/Components/UseCases";
import { AppContext } from "@/context/AppContext";
import { base64ToFile, uploadToCloudninary } from "@/util/Cloudinary";
import { ArrowLeft, Check, Download, Edit3, ImageIcon, Save, Shield, Sparkles, Star, Type, Upload, Zap } from "lucide-react"
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Commet } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";


const RemoveText = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const appContext = useContext(AppContext);

    const sampleImages = [
        {
            url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&crop=center',
            label: 'Business Card',
            description: 'Remove company logos and text'
        },
        {
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
            label: 'Social Media Post',
            description: 'Clean up watermarks and captions'
        },
        {
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center',
            label: 'Marketing Material',
            description: 'Remove unwanted text overlays'
        },
        {
            url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
            label: 'Product Photo',
            description: 'Clean product images'
        },
    ];

    const useCases = [
        "Remove watermarks from stock photos",
        "Clean up social media screenshots",
        "Eliminate unwanted text from product images",
        "Remove signatures from documents",
        "Clean up memes and viral images",
        "Delete timestamps from photos"
    ];

    const features = [
        {
            icon: Sparkles,
            title: "AI-Powered Detection",
            description: "Advanced machine learning algorithms automatically detect and locate text, watermarks, and logos in your images with pixel-perfect precision."
        },
        {
            icon: Zap,
            title: "Lightning Fast Processing",
            description: "Get professional results in seconds, not minutes. Our optimized AI processes images up to 10x faster than traditional tools."
        },
        {
            icon: Shield,
            title: "Privacy & Security First",
            description: "Your images are processed locally and securely. We never store your files, ensuring complete privacy and data protection."
        },
        {
            icon: Type,
            title: "Smart Content Reconstruction",
            description: "Our AI intelligently fills removed text areas with contextually appropriate background, maintaining natural image flow."
        }
    ];


    const handleFiles = (files: File[]) => {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            appContext?.setResultImage?.(false);
        } else {
            toast.error("Please upload a valid image file.");
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        console.log("Extension:", files[0].name.split('.').pop()?.toLowerCase());
        const extension = files[0].name.split('.').pop()?.toLowerCase();
        if (extension && !['jpg', 'jpeg', 'png'].includes(extension)) {
            toast.error("Unsupported file format. Please upload JPG, PNG images.");
            return;
        }
        setSelectedImage(null);
        if (files.length > 0) {
            handleFiles(files);
        }
    };

    const handleRemoveText = () => {
        if (!selectedImage) {
            toast.error("Please upload an image first.");
            return;
        }
        appContext?.removeText?.(selectedImage);
    }

    const handleSampleImageClick = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const image = new File([blob], "sample-image.jpg", { type: "image/jpeg" });
        setSelectedImage(image);
        //console.log("Sample image clicked:", url);
    }

    const handleDownload = () => {
        if (appContext?.resultImage) {
            // Create download link
            const link = document.createElement('a');
            link.href = appContext?.resultImage as string;
            link.download = 'text-removed-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success("Image downloaded successfully!");
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFiles(files);
        }
    };

    const handleSave = async () => {
        if (!appContext?.resultImage || !appContext) return;
        const file = base64ToFile(appContext?.resultImage as string, "text-removed.png");
        if (!file) {
            return toast.error("Failed to convert image for saving.");
        }
        const url = await uploadToCloudninary(file);
        if (!url) {
            return toast.error("Failed to upload image. Please try again.");
        }
        appContext?.saveUserHistory?.({ image: url, sorceType: "bg-remove" });
    };

    const handleEdit = () => {
        if (!appContext?.resultImage || !appContext) return;

        appContext?.setEditImage?.(null);
        if (appContext?.resultImage) {
            appContext.setEditImage?.(appContext?.resultImage as string);
            navigate("/editor");
        }
        toast("Opening editor...", { icon: "🖌️" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/5 relative">
            {/* Navigation */}
            <nav className="absolute left-[14%] top-0 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/')}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
                {/* Header */}
                <div className="text-center">
                    <div className="h-10"></div>
                    <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight ">
                        Instantly Remove Text From
                        <span className="ml-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Images
                        </span>
                    </h1>
                    <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Transform your photos by removing unwanted text, watermarks, and captions with our advanced AI-powered text removal tool
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        <div className="flex items-center bg-gradient-primary/10 px-4 py-2 rounded-full">
                            <Star className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm font-medium">Free Forever</span>
                        </div>
                        <div className="flex items-center bg-gradient-secondary/10 px-4 py-2 rounded-full">
                            <Check className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm font-medium">No Signup Required</span>
                        </div>
                        <div className="flex items-center bg-gradient-primary/10 px-4 py-2 rounded-full">
                            <Shield className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm font-medium">100% Private</span>
                        </div>
                    </div>
                </div>

                {/* Main Upload and Processing Area */}
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Upload Area - Left Column */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-primary/10 hover:bg-primary/15 p-6 rounded-2xl">
                            <h3 className="text-xl font-semibold mb-4 text-center">Upload Your Image</h3>
                            {/* Upload Zone */}
                            <div
                                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${dragActive
                                    ? 'border-primary bg-primary/10 scale-105'
                                    : 'border-primary/30 hover:border-primary hover:bg-primary/5'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileInput}
                                />

                                <div className="space-y-3">
                                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                                        <Upload className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">Click, paste, or drop files here</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            JPG, PNG up to 20MB
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Sample Images */}
                            <div className="mt-6">
                                <div className="flex items-center mb-3">
                                    <div className="flex-1 border-t border-border"></div>
                                    <span className="px-3 text-sm text-muted-foreground bg-background">or try samples</span>
                                    <div className="flex-1 border-t border-border"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {sampleImages.map((sample, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSampleImageClick(sample.url)}
                                            className="relative group overflow-hidden rounded-lg border border-border hover:border-primary transition-all duration-300"
                                            title={sample.description}
                                        >
                                            <img
                                                src={sample.url}
                                                alt={sample.label}
                                                className="w-full h-20 object-cover transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <p className="text-xs font-medium text-white truncate">{sample.label}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Area - Right Columns */}
                    <div className="lg:col-span-2 space-y-6 h-full">
                        {selectedImage ? (
                            <div className="bg-primary/10 hover:bg-primary/15 p-6 rounded-2xl h-full flex flex-col justify-between relative">
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    {/* Original Image */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-foreground">Original</p>
                                            <span className="text-xs bg-muted font-semibold px-2 py-1 rounded-full">WITH TEXT</span>
                                        </div>
                                        <div className="relative w-full h-80 overflow-hidden rounded-xl border-2 border-border">
                                            <img
                                                src={selectedImage && URL.createObjectURL(selectedImage)}
                                                alt="Original with text"
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>

                                    {/* Processed Image */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-foreground">AI Processed</p>
                                            <span className="text-xs bg-primary/20 text-white font-semibold px-2 py-1 rounded-full">TEXT FREE</span>
                                        </div>
                                        <div className="relative w-full h-80 group overflow-hidden rounded-xl border-2 border-border">
                                            {appContext?.resultImage ? (
                                                <>
                                                    <img
                                                        src={appContext?.resultImage as string}
                                                        alt="Text removed"
                                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </>
                                            ) : (
                                                <div className="w-full h-80 bg-muted/20 border-2 border-dashed border-muted-foreground/20 rounded-xl flex items-center justify-center">
                                                    {appContext?.isGenerating ? (
                                                        <div className="absolute inset-0 backdrop-blur-sm p-2 cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-sm text-white font-medium">
                                                            <Commet color={["#093a09", "#106610", "#179217", "#1ebe1e"]} />
                                                        </div>
                                                    ) : (
                                                        <div className="text-center space-y-2">
                                                            <Sparkles className="h-8 w-8 text-muted-foreground mx-auto" />
                                                            <p className="text-sm text-muted-foreground">Processed image will appear here</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="text-center">
                                    {
                                        !appContext?.resultImage ? (
                                            <Button
                                                onClick={handleRemoveText}
                                                disabled={appContext?.isGenerating}
                                                variant="secondary"
                                                size="lg"
                                                className="px-8 py-3 text-lg font-semibold"
                                            >
                                                {appContext?.isGenerating ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                                                        Processing Magic...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles className="h-5 w-5 mr-3" />
                                                        Remove Text with AI
                                                    </>
                                                )}
                                            </Button>
                                        ) :
                                            (
                                                <div className="flex flex-wrap justify-center gap-4">
                                                    <Button
                                                        variant="secondary"
                                                        size="lg"
                                                        onClick={handleSave}
                                                        className=""
                                                    >
                                                        <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                                        Save
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        size="lg"
                                                        onClick={handleEdit}
                                                        className=""
                                                    >
                                                        <Edit3 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        size="lg"
                                                        onClick={handleDownload}
                                                        className=""
                                                    >
                                                        <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                                        Download
                                                    </Button>
                                                </div>
                                            )
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="glass-card p-12 rounded-2xl text-center">
                                <div className="w-24 h-24 bg-gradient-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <ImageIcon className="h-12 w-12 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Ready to Remove Text?</h3>
                                <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
                                    Upload an image or select a sample to see our AI text removal in action
                                </p>
                                <Button
                                    onClick={() => fileInputRef.current?.click()}
                                    variant="secondary"
                                    size="lg"
                                    className="px-8"
                                >
                                    <Upload className="h-5 w-5 mr-2" />
                                    Choose Image
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                {/* Features Section */}
                <SpecificFeatureSection features={features} />
                {/* Use Cases Section */}
                <UseCases sampleImages={sampleImages} useCases={useCases}/>
                {/* Tips Section */}
                <TipsSection />
            </div>
        </div>
    )
}

export default RemoveText