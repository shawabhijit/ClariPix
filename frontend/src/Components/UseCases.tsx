import { Check } from "lucide-react";

interface SampleImage {
    url: string;
    label: string;
    description: string;
}

const UseCases = ({sampleImages , useCases} : {sampleImages: SampleImage[] , useCases : string[]}) => {

    return (
        <div className="bg-primary/10 hover:bg-primary/15 rounded-2xl mb-24 p-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h3 className="text-2xl font-bold mb-6">What Can You Remove?</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {useCases.map((useCase, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-sm text-muted-foreground/70">{useCase}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                        {sampleImages.slice(0, 4).map((sample, index) => (
                            <div key={index} className="relative group overflow-hidden rounded-lg">
                                <img
                                    src={sample.url}
                                    alt={sample.label}
                                    className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-80" />
                                <div className="absolute bottom-2 left-2 right-2">
                                    <p className="text-xs font-semibold text-white">{sample.label}</p>
                                    <p className="text-xs text-muted-foreground/70">{sample.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UseCases