import { Eraser, Palette, RefreshCw, Scissors, Zap } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { Badge } from './ui/badge'

const Features = () => {

    const features = [
        {
            id: "remove-bg",
            icon: Scissors,
            title: "Remove Background",
            description: "ClariPix Background Remover lets you erase image backgrounds in seconds with pixel-perfect AI precision. Whether it’s product photography, portraits, or social media content, our tool handles even the trickiest details like hair and transparent edges. Save hours of manual editing while keeping professional-grade quality.",
            gradient: "from-emerald-500 to-teal-600",
            demo: "https://res.cloudinary.com/dvkvr88db/video/upload/v1756131444/remove-background-demo_gjvwxs.mp4",
            details: [
                "99% accuracy even on complex backgrounds",
                "Preserves fine edges like hair & fur",
                "Supports transparent PNG output",
                "Instant, one-click processing",
            ],
        },
        {
            id: "Photo Editor",
            icon: Zap,
            title: "Free Online Photo Editor for Everyone",
            description: "ClariPix Photo Editor is a complete toolkit that goes beyond basic cropping and resizing. Adjust brightness, contrast, saturation, or sharpness with ease. Add stickers, custom text, filters, and layout templates to create stunning visuals in minutes. With 75+ AI-powered effects, anyone can produce professional-looking photos without needing advanced skills.",
            gradient: "from-teal-500 to-emerald-600",
            demo: "",
            image: "https://imgs.search.brave.com/kbjlVMkfkO3C21c3zrMCvfbtHgROp-XUwma1Sd4YGx4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL3NpZGUv/c3RlcC0yLWVkaXQt/YW5kLWVuaGFuY2Ut/cGhvdG8tb25saW5l/LnBuZw",
            result: "/abstract-geometric-shapes.png",
            details: [
                "Crop, rotate, and resize instantly",
                "Adjust brightness, contrast, and saturation",
                "75+ AI filters for social media creatives",
                "Add stickers, shapes, and stylish text",
            ],
        },
        {
            id: "change-bg",
            icon: Palette,
            title: "Change Background",
            description: "Transform your photos by replacing dull backgrounds with creative presets or your own uploads. Our AI automatically adjusts lighting and shadows to ensure seamless blending. Whether it’s for professional product shots, portraits, or creative projects, changing backgrounds has never been this quick and natural.",
            gradient: "from-emerald-600 to-green-700",
            demo: "https://res.cloudinary.com/dvkvr88db/video/upload/v1756133025/replace-background_xlxwod.mp4",
            details: [
                "Choose from 1000+ preset backgrounds",
                "Upload your own images for custom scenes",
                "AI-powered lighting and shadow adjustment",
                "Seamless blending without visible edges",
            ],
        },
        {
            id: "enhance-resolution",
            icon: Zap,
            title: "Enhance Resolution",
            description: "ClariPix AI Upscaler lets you increase image resolution up to 4× without losing quality. Turn blurry 720p shots into crisp 1080p or higher while preserving textures and details. Ideal for e-commerce, printing, or restoring old photographs — our AI sharpens every pixel for professional results.",
            gradient: "from-teal-500 to-emerald-600",
            demo: "https://res.cloudinary.com/dvkvr88db/video/upload/v1756133157/super-resolution-demo_cacceq.mp4",
            result: "/abstract-geometric-shapes.png",
            details: [
                "Upscale up to 4× with AI precision",
                "Restores sharpness in blurry photos",
                "Preserves facial details and textures",
                "Perfect for print and digital use",
            ],
        },
        {
            id: "convert-format",
            icon: RefreshCw,
            title: "Convert Format",
            description: "Easily convert images between JPG, PNG, WebP, and other popular formats in seconds. Maintain maximum quality while optimizing file sizes for faster web performance. With batch conversion support, ClariPix helps you save time while preparing images for websites, social media, or professional use.",
            gradient: "from-emerald-500 to-green-600",
            demo: "",
            image: "https://imgs.search.brave.com/aPzo5cWxaVkTHx2wA3GQTrj6MI2Gtmm3R3wA53UdHoE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL3NpZGUv/Y29udmVydC1hbi1p/bWFnZS1maWxlLWZv/cm1hdC1mcm9tLWpw/Zy10by10cmFuc3Bh/cmVudC1iYWNrZ3Jv/dW5kLXBuZy11c2lu/Zy1Gb3RvcnMtaW1h/Z2UtY29udmVydGVy/LmpwZw",
            details: [
                "Supports JPG, PNG, WebP, and more",
                "Batch convert multiple files together",
                "Optimized for web performance",
                "No loss of image quality",
            ],
        },
        {
            id: "remove-objects",
            icon: Eraser,
            title: "Remove Objects",
            description: "Effortlessly erase unwanted objects, people, text, or blemishes from your photos. ClariPix uses AI-powered content-aware fill to reconstruct the missing area naturally, leaving no traces behind. Whether it’s for real estate photos, product shots, or personal edits, your images will look clean and professional.",
            gradient: "from-green-500 to-emerald-600",
            demo: "https://res.cloudinary.com/dvkvr88db/video/upload/v1756131443/cleanup-demo_a9exu0.mp4",
            details: [
                "Remove people, objects, and watermarks",
                "AI fills background naturally",
                "Works on text, logos, or blemishes",
                "Smooth, professional results",
            ],
        }
    ]

    return (
        <section className="py-24 bg-background">
            <div className="container px-4 mx-auto max-w-7xl ">
                <div className="text-center space-y-4 mb-16">
                    <Badge variant="secondary" className="w-fit mx-auto">
                        <Zap className="w-3 h-3 mr-1" />
                        Powerful Features
                    </Badge>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold">
                        Everything You Need to{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Create Magic
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Professional-grade AI tools that make complex photo editing simple and accessible to everyone.
                    </p>
                </div>

                <div className="space-y-24">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        const isEven = index % 2 === 0

                        return (
                            <div
                                key={feature.id}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${!isEven ? "lg:grid-flow-col-dense" : ""}`}
                            >
                                {/* Demo Section */}
                                <div className={`${!isEven ? "lg:col-start-2" : ""}`}>
                                    <Card className="border-0 shadow-2xl overflow-hidden p-0">
                                        <CardContent className="p-0">
                                            <div className="grid h-96 sm:h-[450px]">
                                                <div className="relative flex flex-col">
                                                    {
                                                        feature.demo.endsWith(".mp4") ? (
                                                            <video
                                                                src={feature.demo}
                                                                autoPlay
                                                                loop
                                                                muted
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={feature.image}
                                                                alt={feature.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>


                                {/* Details Section */}
                                <div className={`space-y-6 ${!isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                                    <div className="space-y-4">
                                        <div
                                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                                        >
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">{feature.title}</h3>
                                            <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {feature.details.map((detail, detailIndex) => (
                                            <div key={detailIndex} className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                <span className="text-sm font-medium">{detail}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button className="gradient-primary text-white border-0" asChild>
                                            {/* <Link to="/editor">Try Now</Link> */} Try now
                                        </Button>
                                        <Button variant="outline">Learn More</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Features