import { Eraser, Palette, RefreshCw, Scissors, Zap } from 'lucide-react'
import React from 'react'

const Features = () => {

    const features = [
        {
            id: "remove-bg",
            icon: Scissors,
            title: "Remove Background",
            description: "Instantly remove backgrounds with AI precision. Perfect for product photos and portraits.",
            gradient: "from-emerald-500 to-teal-600",
            demo: "/busy-portrait.png",
            result: "/transparent-portrait.png",
            details: [
                "99% accuracy on most images",
                "Handles complex edges like hair",
                "Works with any subject type",
                "Instant processing",
            ],
        },
        {
            id: "change-bg",
            icon: Palette,
            title: "Change Background",
            description: "Replace backgrounds with stunning presets or upload your own custom backgrounds.",
            gradient: "from-emerald-600 to-green-700",
            demo: "/transparent-portrait.png",
            result: "/abstract-geometric-shapes.png",
            details: [
                "1000+ preset backgrounds",
                "Upload custom backgrounds",
                "Perfect lighting adjustment",
                "Seamless blending",
            ],
        },
        {
            id: "enhance-resolution",
            icon: Zap,
            title: "Enhance Resolution",
            description: "Upscale images up to 4x with AI. Transform 720p to 1080p and beyond.",
            gradient: "from-teal-500 to-emerald-600",
            demo: "/blurry-low-resolution.png",
            result: "/abstract-geometric-shapes.png",
            details: ["Up to 4x upscaling", "Preserves fine details", "Works on any image type", "No quality loss"],
        },
        {
            id: "remove-objects",
            icon: Eraser,
            title: "Remove Objects",
            description: "Seamlessly remove unwanted objects, people, or text from your images.",
            gradient: "from-green-500 to-emerald-600",
            demo: "/landscape-photo-edit.png",
            result: "/clean-landscape.png",
            details: [
                "Smart content-aware fill",
                "Remove people, objects, text",
                "Brush selection tool",
                "Natural-looking results",
            ],
        },
        {
            id: "convert-format",
            icon: RefreshCw,
            title: "Convert Format",
            description: "Convert between JPG, PNG, WebP, and more formats while maintaining quality.",
            gradient: "from-emerald-500 to-green-600",
            demo: "/professional-photo-editing-interface.png",
            result: "/professional-photo-editing-interface.png",
            details: [
                "All major formats supported",
                "Batch conversion available",
                "Quality preservation",
                "Optimized file sizes",
            ],
        },
    ]


    return (
        <div>Features</div>
    )
}

export default Features