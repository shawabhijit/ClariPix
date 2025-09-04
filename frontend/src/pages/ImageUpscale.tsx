import { ImageUpload } from "@/Components/ImageUpload";
import { Shield, Sparkles, Zap } from "lucide-react";
import { useState } from "react";



const ImageUpscale = () => {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (file: File) => {
        setSelectedImage(file);
    }

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

    return (
        <div className="min-h-screen relative">
            <div className="container mx-auto px-4">
                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto mt-30">
                    {/* Left Side - Content */}
                    <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="space-y-4">
                            <h2 className="text-4xl bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent md:text-5xl font-bold leading-tight">
                                Next-Gen Image Quality with AI
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Upscale images up to 4× with AI while keeping textures, colors, and details natural and sharp.
                            </p>
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
    )
}

export default ImageUpscale