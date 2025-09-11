import { Badge } from './ui/badge'
import { ArrowRight, Eraser, Palette, Play, RefreshCw, Scissors, Sparkles, Star, Zap } from 'lucide-react'
import { Button } from './ui/button'
// import { Link } from 'react-router-dom'
import { Card, CardContent } from './ui/card'
import { Link, useNavigate } from 'react-router-dom'
import LaptopMockup from './LaptopMockup'
import { motion } from "framer-motion"


const HeroSections = () => {

    const tools = [
        {
            icon: Scissors,
            name: "Remove Background",
            description: "AI-powered background removal",
            gradient: "from-emerald-500 to-teal-600",
            navigate:"/remove-bg"
        },
        {
            icon: Palette,
            name: "Change Background",
            description: "Replace with stunning presets",
            gradient: "from-emerald-600 to-green-700",
            navigate: "/change-background"
        },
        {
            icon: Zap,
            name: "Enhance Resolution",
            description: "Upscale images up to 4x",
            gradient: "from-teal-500 to-emerald-600",
            navigate: "/image-upscale"
        },
        {
            icon: Eraser,
            name: "Remove Text",
            description: "Seamlessly erase unwanted text",
            gradient: "from-green-500 to-emerald-600",
            navigate: "/remove-text"
        },
        {
            icon: RefreshCw,
            name: "Convert Format",
            description: "Convert between formats",
            gradient: "from-emerald-500 to-green-600",
            navigate: "/convert-formate"
        },
    ]

    const navigate = useNavigate();

    return (
        <section className="relative overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-gradient-to-bl from-green-500/10 via-background to-emerald-500/20"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
            />
            <motion.div
                className="absolute top-10 left-30 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-transparent rounded-full blur-3xl"
                animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-40 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-transparent rounded-full blur-3xl"
                animate={{ x: [0, 30, -30, 0], y: [0, -20, 30, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-50 right-5 w-96 h-96 bg-gradient-to-tl from-teal-400/30 to-transparent rounded-full blur-3xl"
                animate={{ x: [0, -25, 20, 0], y: [0, 20, -15, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="container relative px-4 py-24 md:py-32 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-12 items-center justify-center">
                    <div className="space-y-8 text-center lg:text-left flex flex-col items-center justify-center mb-0 md:mb-15">
                        <div className="space-y-4 flex flex-col items-center justify-center">
                            <Badge variant="secondary" className="w-fit mx-auto lg:mx-0">
                                <Sparkles className="w-3 h-3 mr-1" />
                                AI-Powered Editing
                            </Badge>
                            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
                                Transform Your Images with{" "}
                                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    AI Magic
                                </span>
                            </h1>
                            <p className="text-xl text-center text-muted-foreground max-w-lg mx-auto lg:mx-0">
                                Professional photo editing made simple. Remove backgrounds, enhance resolution, and create stunning
                                visuals in seconds with our AI-powered tools.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="gradient-primary text-white border-0 group">
                                <Link to="/editor" className="flex items-center">
                                    Start Editing Now
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            {/* <Button size="lg" variant="outline" className="group bg-transparent">
                                <Link to="#demo" className="flex items-center">
                                    <Play className="mr-2 h-4 w-4" />
                                    Watch Demo
                                </Link>
                            </Button> */}
                        </div>

                        <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-background"
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">10,000+ happy users</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="text-sm text-muted-foreground ml-1">4.9/5 rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Demo Animation Card */}
                    <div className="relative flex justify-center lg:justify-end">
                        <LaptopMockup imageSrc="./Hero.png" alt="Hero image displayed on laptop" />
                    </div>
                </div>
                <div className="mx-auto max-w-7xl pt-20">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 bg-primary/10 relative rounded-2xl">
                        {tools.map((tool, index) => {
                            const Icon = tool.icon
                            return (
                                <Card
                                    key={index}
                                    onClick={() => navigate(tool.navigate)}
                                    className="group border-0 bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                                >
                                    <CardContent className="p-2 text-center space-y-2">
                                        <div
                                            className={`w-10 h-10 mx-auto rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <Icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-white text-sm md:text-base leading-tight">{tool.name}</h3>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSections