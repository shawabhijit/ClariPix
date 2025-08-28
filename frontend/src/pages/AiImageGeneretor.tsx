"use client"

import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Badge } from "@/Components/ui/badge"
import { Wand2, Download, Heart, Share2, Zap, Palette, Camera, Brush, Stars } from "lucide-react"

export default function AIGeneratorPage() {
    const [prompt, setPrompt] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedImages, setGeneratedImages] = useState<string[]>([])

    const handleGenerate = async () => {
        if (!prompt.trim()) return

        setIsGenerating(true)
        // Simulate API call
        setTimeout(() => {
            setGeneratedImages([
                "/fantasy-mountains.png",
                "/futuristic-city-skyline.png",
                "/digital-portrait.png",
                "/abstract-colorful-swirls.png",
            ])
            setIsGenerating(false)
        }, 3000)
    }

    const exampleImages = [
        {
            src: "/fantasy-dragon-landscape.png",
            caption: "Fantasy Landscape",
            prompt: "Mystical forest with glowing trees and magical creatures",
        },
        {
            src: "/futuristic-cyberpunk-city.png",
            caption: "Futuristic City",
            prompt: "Neon-lit cyberpunk cityscape with flying cars",
        },
        {
            src: "/digital-portrait-woman.png",
            caption: "Digital Portrait",
            prompt: "Beautiful woman with flowing hair, digital art style",
        },
        {
            src: "/abstract-geometric-art.png",
            caption: "Abstract Art",
            prompt: "Colorful geometric shapes with gradient backgrounds",
        },
        {
            src: "/space-nebula-stars.png",
            caption: "Space Scene",
            prompt: "Cosmic nebula with bright stars and planets",
        },
        {
            src: "/vintage-car-illustration.png",
            caption: "Vintage Style",
            prompt: "Classic car in retro illustration style",
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-16 md:py-18 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />

                <div className="container mx-auto px-4 text-center relative">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="space-y-4">
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                <Stars className="w-3 h-3 mr-1" />
                                Powered by Advanced AI
                            </Badge>
                            <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
                                Turn Your Imagination Into{" "}
                                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Stunning Images</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Type your idea, and let AI bring it to life instantly. Create professional-quality images from simple
                                text descriptions in seconds.
                            </p>
                        </div>

                        {/* Input Section */}
                        <div className="max-w-2xl mx-auto">
                            <Card className="border-0 shadow-2xl bg-background backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1">
                                            <Input
                                                placeholder="Describe your dream image..."
                                                value={prompt}
                                                onChange={(e:any) => setPrompt(e.target.value)}
                                                className="h-12 text-white border-1 border-dashed border-gray-700 text-base focus-none transition-colors"
                                                onKeyDown={(e:any) => e.key === "Enter" && handleGenerate()}
                                            />
                                        </div>
                                        <Button
                                            onClick={handleGenerate}
                                            disabled={!prompt.trim() || isGenerating}
                                            className="h-12 px-8 gradient-accent text-white border-0 font-semibold"
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    <Wand2 className="w-4 h-4 mr-2" />
                                                    Generate
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    {/* Quick Prompts */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="text-sm text-muted-foreground">Try:</span>
                                        {["Sunset over mountains", "Cyberpunk robot", "Watercolor flowers", "Space exploration"].map(
                                            (suggestion) => (
                                                <Button
                                                    key={suggestion}
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-7 text-xs text-white bg-transparent"
                                                    onClick={() => setPrompt(suggestion)}
                                                >
                                                    {suggestion}
                                                </Button>
                                            ),
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Generated Results */}
                        {generatedImages.length > 0 && (
                            <div className="max-w-4xl mx-auto">
                                <h3 className="font-heading font-semibold text-xl mb-6">Your Generated Images</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {generatedImages.map((image, index) => (
                                        <Card
                                            key={index}
                                            className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                                        >
                                            <CardContent className="p-0 relative">
                                                <img
                                                    src={image || "/placeholder.svg"}
                                                    alt={`Generated image ${index + 1}`}
                                                    className="w-full aspect-square object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <Button size="sm" variant="secondary" className="bg-white/90 text-black hover:bg-white">
                                                        <Download className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="secondary" className="bg-white/90 text-black hover:bg-white">
                                                        <Heart className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="secondary" className="bg-white/90 text-black hover:bg-white">
                                                        <Share2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Example Gallery */}
            <section className="py-16 md:pb-54 ">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl">
                            Explore Creative <span className="gradient-hero bg-clip-text text-transparent">Possibilities</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Get inspired by these AI-generated masterpieces. Click on any image to use its prompt as a starting point.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {exampleImages.map((example, index) => (
                            <Card
                                key={index}
                                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                onClick={() => setPrompt(example.prompt)}
                            >
                                <CardContent className="p-0">
                                    <div className="relative">
                                        <img
                                            src={example.src || "/placeholder.svg"}
                                            alt={example.caption}
                                            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="font-heading font-semibold text-white text-lg mb-1">{example.caption}</h3>
                                            <p className="text-white/80 text-sm line-clamp-2">{example.prompt}</p>
                                        </div>
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button size="sm" className="gradient-button text-white border-0">
                                                <Brush className="w-4 h-4 mr-1" />
                                                Use Prompt
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
