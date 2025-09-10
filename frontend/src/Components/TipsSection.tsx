import { ImageIcon, Shield, Type, Zap } from "lucide-react"


const TipsSection = () => {
    return (
        <div className="bg-primary/10 hover:bg-primary/15 p-6 rounded-2xl mb-10">
            <h3 className="text-xl font-bold mb-6 text-center">Pro Tips for Perfect Results</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-primary/20 rounded-xl flex items-center justify-center mx-auto">
                        <ImageIcon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-semibold text-sm">High Resolution</p>
                    <p className="text-xs text-muted-foreground">Use high-resolution images for better accuracy</p>
                </div>
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-secondary/20 rounded-xl flex items-center justify-center mx-auto">
                        <Type className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-semibold text-sm">Clear Contrast</p>
                    <p className="text-xs text-muted-foreground">Better contrast improves text detection</p>
                </div>
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-primary/20 rounded-xl flex items-center justify-center mx-auto">
                        <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-semibold text-sm">Fast Processing</p>
                    <p className="text-xs text-muted-foreground">Results in 2-5 seconds typically</p>
                </div>
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-secondary/20 rounded-xl flex items-center justify-center mx-auto">
                        <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-semibold text-sm">Secure & Private</p>
                    <p className="text-xs text-muted-foreground">Images processed locally and securely</p>
                </div>
            </div>
        </div>
    )
}

export default TipsSection