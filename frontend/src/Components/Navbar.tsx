import { ChevronDown, Eraser, Menu, Palette, RefreshCw, Scissors, X, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useContext, useState } from "react"
import { SignedIn, SignedOut, useClerk, UserButton, useUser } from "@clerk/clerk-react"
import { AppContext } from "@/context/AppContext"

const Navbar = () => {

    const { openSignIn, openSignUp } = useClerk();
    const { user } = useUser();
    // const { getToken } = useAuth();

    const { setEditImage, nitro } = useContext(AppContext) || {}

    // const printToken = async () => {
    //     const token = await getToken();
    //     console.log("User Token: ", token);
    // }

    const openLogedIn = () => {
        setIsMenuOpen(false);
        openSignIn({});
    }

    const openReginter = () => {
        setIsMenuOpen(true);
        openSignUp({})
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAiToolsOpen, setIsAiToolsOpen] = useState(false);

    const aiTools = [
        { name: "Remove Background", icon: Scissors, href: "/remove-bg" },
        { name: "Change Background", icon: Palette, href: "/change-background" },
        { name: "Enhance Resolution", icon: Zap, href: "/image-upscale" },
        { name: "Remove Text", icon: Eraser, href: "/remove-text" },
        { name: "Convert Format", icon: RefreshCw, href: "/convert-formate" },
    ]
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur bg-background/95">
            <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-9xl">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                        <img src="/logo1.png" alt="" className="text-white" />
                    </div>
                    <span className="font-heading text-xl font-bold text-glow">ClariPix</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsAiToolsOpen(true)}
                        onMouseLeave={() => setIsAiToolsOpen(false)}
                    >
                        <button className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                            <span>AI Tools</span>
                            <ChevronDown className="h-3 w-3" />
                        </button>

                        {isAiToolsOpen && (
                            <div className="absolute top-full left-[-10px] mt-[3px] w-64 bg-background border border-border rounded-lg shadow-lg p-2">
                                {aiTools.map((tool, index) => {
                                    const Icon = tool.icon
                                    return (
                                        <Link
                                            key={index}
                                            to={tool.href}
                                            className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted transition-colors"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                                <Icon className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-sm font-medium hover:text-primary">{tool.name}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <Link onClick={() => setEditImage?.(null)} to="/editor" className="text-sm font-medium hover:text-primary transition-colors">
                        Editor
                    </Link>
                    <Link to="/ai_image" className="text-sm font-medium hover:text-primary transition-colors">
                        AI Image
                    </Link>
                    <SignedIn>
                        <Link to="/history" className="text-sm font-medium hover:text-primary transition-colors">
                            History
                        </Link>
                    </SignedIn>
                    <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
                        Pricing
                    </Link>
                    {/* <Button onClick={printToken} variant="link" size="sm" className="text-sm font-medium hover:text-primary transition-colors">
                        get token
                    </Button> */}
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                    <SignedOut>
                        <Button variant="ghost" size="sm" onClick={openLogedIn}>
                            Login
                        </Button>
                        <Button size="sm" className="gradient-primary text-white border-0" onClick={openReginter}>
                            Get Started
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <div className="flex gap-4 items-center">
                            {
                                nitro && <span className="inline-flex items-center px-5 py-1 rounded-2xl
    bg-gradient-to-r from-green-500 via-black to-green-600 font-semibold shadow-lg hover:shadow-xl 
    hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer text-white text-sm">
                                    🌟 {nitro} Nitro left
                                </span>
                            }
                            <UserButton />
                        </div>
                    </SignedIn>
                </div>

                {/* Mobile Menu Button */}
                <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
                    <div className="container px-6 py-4 space-y-3">
                        <div className="flex gap-3 items-center py-4">
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                            <p className="font-bold ">
                                {user?.fullName}
                            </p>
                            <span className="inline-flex items-center px-5 py-1 rounded-2xl 
    bg-gradient-to-r from-green-500 via-black to-green-600 font-semibold shadow-lg hover:shadow-xl 
    hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer text-white text-sm">
                                🌟 {nitro} Nitro left
                            </span>
                        </div>
                        <div className="space-y-2">
                            <span className="block text-sm font-medium text-muted-foreground">AI Tools</span>
                            {aiTools.map((tool, index) => {
                                const Icon = tool.icon
                                return (
                                    <Link
                                        key={index}
                                        to={tool.href}
                                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-colors ml-4"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                            <Icon className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm">{tool.name}</span>
                                    </Link>
                                )
                            })}
                        </div>
                        <Link
                            to="/editor"
                            className="block text-sm font-medium hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Editor
                        </Link>
                        <Link
                            to="/ai_image"
                            className="block text-sm font-medium hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            AI Image
                        </Link>
                        <Link
                            to="/history"
                            className="block text-sm font-medium hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            History
                        </Link>
                        <Link
                            to="/pricing"
                            className="block text-sm font-medium hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <div className="flex flex-col space-y-2 pt-3 border-t border-border/40">
                            <SignedOut>
                                <Button variant="ghost" size="sm" onClick={openLogedIn}>
                                    Login
                                </Button>
                                <Button size="sm" className="gradient-primary text-white border-0" onClick={openReginter}>
                                    Get Started
                                </Button>
                            </SignedOut>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar