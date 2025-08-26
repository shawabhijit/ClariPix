import { Rocket } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"


const CommingFeatures = () => {

    const roadmapItems = [
        {
            quarter: "Q2 2025",
            title: "Advanced AI Models",
            description: "Next-generation AI models for even better results",
            status: "in-progress",
        },
        {
            quarter: "Q3 2025",
            title: "Batch Processing",
            description: "Process multiple images simultaneously",
            status: "planned",
        },
        {
            quarter: "Q4 2026",
            title: "API Access",
            description: "Developer API for integration with third-party apps",
            status: "planned",
        },
        {
            quarter: "Q1 2027",
            title: "Mobile Apps",
            description: "Native iOS and Android applications",
            status: "planned",
        },
    ]

    return (
        <section className="pb-24">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="text-center space-y-4 mb-16">
                    <Badge variant="secondary" className="w-fit mx-auto">
                        <Rocket className="w-3 h-3 mr-1" />
                        Product Roadmap
                    </Badge>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold">
                        What's{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Coming Next
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We're constantly innovating and adding new features to make your image editing experience even better.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto ">
                    <div className="space-y-6">
                        {roadmapItems.map((item, index) => (
                            <Card key={index} className="border-0 shadow-lg bg-primary/10">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <Badge
                                                variant={item.status === "in-progress" ? "default" : "secondary"}
                                                className={item.status === "in-progress" ? "gradient-primary text-white border-0" : ""}
                                            >
                                                {item.quarter}
                                            </Badge>
                                            <div className="space-y-1 text-white">
                                                <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                                                <p className="text-muted-foreground">{item.description}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="capitalize">
                                            {item.status === "in-progress" ? "In Progress" : "Planned"}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CommingFeatures