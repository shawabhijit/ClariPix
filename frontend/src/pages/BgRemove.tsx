import { ImageUpload } from "@/Components/ImageUpload";
import { AppContext } from "@/context/AppContext";
import { Shield, Sparkles, Zap } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ImageBgRemover: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);

    const location = useLocation();
    

    const features = [
        {
            icon: Sparkles,
            title: "AI-Powered Precision",
            description: "Advanced AI algorithms detect and remove backgrounds with pixel-perfect accuracy"
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Process images in seconds, not minutes. Get professional results instantly"
        },
        {
            icon: Shield,
            title: "Privacy First",
            description: "Your images are processed securely and never stored on our servers"
        }
    ];

    const navigate = useNavigate();

    const { removeBg , setImage} = useContext<any>(AppContext);

    // Handle file select
    const handleImageChange = (file: File) => {
        setSelectedImage(file);
        setProcessedImage(null); // reset
    };

    useEffect(() => {
        if (selectedImage && location.pathname === "/remove-bg") {
            removeBg(selectedImage);
        }
        else if (location.pathname === "/change-background" && selectedImage) {
            setImage(null);
            setImage(selectedImage);
            navigate("/ai/result");
        }
    }, [selectedImage , location]);

    return (
        <div className="min-h-screen relative pattern-bg">
            <div className="container mx-auto px-4">
                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto mt-30">
                    {/* Left Side - Content */}
                    <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="space-y-4">
                            {
                                location.pathname === "/remove-bg" && (
                                    <>
                                        <h2 className="text-4xl bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent md:text-5xl font-bold leading-tight">
                                            Remove backgrounds instantly with AI
                                        </h2>
                                        <p className="text-lg text-muted-foreground">
                                            Transform your images with our AI-powered background removal tool.
                                            Perfect for e-commerce, social media, and professional photography.
                                        </p>
                                    </>
                                )
                            }
                            {
                                location.pathname === "/change-background" && (
                                    <>
                                        <h2 className="text-4xl bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent md:text-5xl font-bold leading-tight">
                                            Change Background Online Free with AI
                                        </h2>
                                        <p className="text-lg text-muted-foreground">
                                            Easily change the background of any image and add custom background photos. Need a quick white background remover? Or want to change the background color of the image to bold, clean colors? With ClariPix background changer, it only takes seconds.
                                        </p>
                                    </>
                                )
                            }
                        </div>

                        {/* Features List */}
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="flex items-start space-x-4 p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                                >
                                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                                        <feature.icon className="w-5 h-5 text-white " />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Upload */}
                    <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        <ImageUpload
                            onImageSelect={handleImageChange}
                            selectedImage={selectedImage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageBgRemover;
