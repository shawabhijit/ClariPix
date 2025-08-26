import { Link } from "react-router-dom"
import { Button } from "./ui/button"


const CtaSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-green-500/15" />
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-emerald-500/8 to-teal-500/12" />
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-emerald-400/25 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-teal-400/25 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-2xl" />

            <div className="container relative px-4 text-center mx-auto max-w-7xl">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="font-heading text-3xl md:text-5xl font-bold">Ready to Transform Your Images?</h2>
                    <p className="text-xl text-muted-foreground">
                        Join thousands of creators, marketers, and professionals who trust our AI-powered tools for their image
                        editing needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="gradient-primary text-white border-0" asChild>
                            <Link to="/register">Get Started Free</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link to="/contact">Contact Sales</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CtaSection