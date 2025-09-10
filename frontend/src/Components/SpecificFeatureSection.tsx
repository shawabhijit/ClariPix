
interface SampleFeatures {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

const SpecificFeatureSection = ({features} : {features : SampleFeatures[]}) => {
    return (
        <div className="space-y-12 mt-20">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Remove Text From Picture <span className="bg-primary bg-clip-text text-transparent">Effortlessly</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Do you have problems with texts that interfere with your favorite pictures? We have developed sophisticated software to remove text from images without damaging the background.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={feature.title}
                        className="bg-primary/10 p-6 rounded-2xl text-center group hover:bg-primary/15 transition-all duration-300"
                    >
                        <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <feature.icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SpecificFeatureSection