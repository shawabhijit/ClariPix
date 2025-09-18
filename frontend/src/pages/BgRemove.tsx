import SpecificFeatureSection from "@/Components/SpecificFeatureSection";
import TipsSection from "@/Components/TipsSection";
import { Button } from "@/Components/ui/button";
import UseCases from "@/Components/UseCases";
import { AppContext } from "@/context/AppContext";
import { ArrowLeft, Check, ImageIcon, Shield, Star, Upload} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { features , removeBgUseCases , changeBgUseCases , removeBgSamples , changeBgSamples } from "@/util/Data";

const BgRemover: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const appContext = useContext(AppContext);

    const { removeBg, setImage, setBgChanged } = appContext || {};

    // Handle file select
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            handleFiles(files);
        }
    };

    const handleFiles = (files: File[]) => {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            appContext?.setResultImage?.(false);
        } else {
            toast.error("Please upload a valid image file.");
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

    const handleSampleImageClick = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const image = new File([blob], "sample-image.jpg", { type: "image/jpeg" });
        setSelectedImage(image);
    }

    // Auto process depending on page
    useEffect(() => {
        if (selectedImage && location.pathname === "/remove-bg") {
            removeBg?.(selectedImage);
            setBgChanged?.(false);
        } else if (selectedImage && location.pathname === "/change-background") {
            setImage?.(selectedImage);
            setBgChanged?.(true);
            navigate("/ai/result");
        }
    }, [selectedImage, location]);

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
                        {location.pathname === "/remove-bg" ? (
                            <>Remove Backgrounds <span className="ml-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent text-glow"> Instantly</span></>
                        ) : (
                            <>Change Backgrounds <span className="ml-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent text-glow">Online</span></>
                        )}
                    </h1>
                    <p className="text-2xl text-muted-foreground/70 max-w-3xl mx-auto leading-relaxed">
                        {location.pathname === "/remove-bg"
                            ? "Transform your images with our AI-powered background remover. Perfect for e-commerce, social media, and professional photography."
                            : "Easily change the background of any image with AI. Add white, colored, or custom backgrounds in seconds."}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        <div className="flex items-center gradient-accent px-4 py-2 rounded-full">
                            <Star className="h-4 w-4 text-white mr-2" />
                            <span className="text-sm font-medium">Free Forever</span>
                        </div>
                        <div className="flex items-center gradient-accent px-4 py-2 rounded-full">
                            <Check className="h-4 w-4 text-white mr-2" />
                            <span className="text-sm font-medium">No Signup Required</span>
                        </div>
                        <div className="flex items-center gradient-accent px-4 py-2 rounded-full">
                            <Shield className="h-4 w-4 text-white mr-2" />
                            <span className="text-sm font-medium">100% Private</span>
                        </div>
                    </div>
                </div>

                {/* Main Upload and Processing Area */}
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Upload Area */}
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
                                    {location.pathname === "/remove-bg" && removeBgSamples.map((sample, index) => (
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
                                    {location.pathname === "/change-background" && changeBgSamples.map((sample, index) => (
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

                    <div className="lg:col-span-2 space-y-6 h-full">
                        <div className="bg-primary/10 hover:bg-primary/15 p-12 rounded-2xl text-center">
                            <div className="w-24 h-24 bg-gradient-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <ImageIcon className="h-12 w-12 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Ready to Start?</h3>
                            <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
                                Upload an image to remove or change its background instantly with AI
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
                    </div>
                </div>

                {/* Features Section */}
                <SpecificFeatureSection features={features} />
                {
                    location.pathname === "/remove-bg" ? (
                        <UseCases sampleImages={removeBgSamples} useCases={removeBgUseCases} />
                    ) : (
                        <UseCases sampleImages={changeBgSamples} useCases={changeBgUseCases} />
                    )
                }
                {/* Tips Section */}
                <TipsSection />
            </div>
        </div>
    );
};

export default BgRemover;
