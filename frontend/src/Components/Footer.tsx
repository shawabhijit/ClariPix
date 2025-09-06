import { Github, Instagram, Sparkles, Twitter } from "lucide-react"
import { Link } from "react-router-dom"


const Footer = () => {
    return (
        <footer className="border-t relative border-border/40 pt-10">
            <div className="container px-4 py-12 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-heading text-xl font-bold">ClariPix</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Transform your images with professional AI-powered editing tools. Remove backgrounds, enhance resolution,
                            and more.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div className="space-y-4 pl-0 md:pl-20">
                        <h3 className="font-heading font-semibold">Product</h3>
                        <div className="space-y-2 text-sm">
                            <Link to="/editor" className="block hover:text-primary transition-colors">
                                Editor
                            </Link>
                            <Link to="/features" className="block hover:text-primary transition-colors">
                                Features
                            </Link>
                            <Link to="/pricing" className="block hover:text-primary transition-colors">
                                Pricing
                            </Link>
                            <Link to="/api" className="block hover:text-primary transition-colors">
                                API
                            </Link>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-4 md:pl-20">
                        <h3 className="font-heading font-semibold">Company</h3>
                        <div className="space-y-2 text-sm">
                            <Link to="/about" className="block hover:text-primary transition-colors">
                                About
                            </Link>
                            <Link to="/contact" className="block hover:text-primary transition-colors">
                                Contact
                            </Link>
                            <Link to="/careers" className="block hover:text-primary transition-colors">
                                Careers
                            </Link>
                            <Link to="/blog" className="block hover:text-primary transition-colors">
                                Blog
                            </Link>
                        </div>
                    </div>

                    {/* Legal & Social */}
                    <div className="space-y-4 md:pl-20">
                        <h3 className="font-heading font-semibold">Legal</h3>
                        <div className="space-y-2 text-sm">
                            <Link to="/privacy" className="block hover:text-primary transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="block hover:text-primary transition-colors">
                                Terms of Service
                            </Link>
                            <Link to="/cookies" className="block hover:text-primary transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                        <div className="flex space-x-4 pt-4">
                            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
                    <p>&copy; 2025 AI Image Enhancer. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer