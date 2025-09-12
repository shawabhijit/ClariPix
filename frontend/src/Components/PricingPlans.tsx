import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Check } from "lucide-react"
import { PricingPlans as PricingPlansData } from "@/util/Data"


export default function PricingPlans({handelOrder} : {handelOrder : (planId : string) => void}) {
    return (
        <div className="mb-20">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {PricingPlansData.map((plan) => {
                    const Icon = plan.icon
                    return (
                        <Card
                            key={plan.name}
                            className={`relative bg-background rounded-2xl text-white overflow-hidden transition-all duration-300 hover-glow ${plan.popular ? "border-glow glow-green-strong scale-105" : "border-border/50 hover:border-accent/50"
                                }`}
                        >
                            {plan.popular && (
                                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground glow-green">
                                    Most Popular
                                </Badge>
                            )}

                            <CardHeader className="text-center pb-4">
                                <div className="flex justify-center mb-4">
                                    <div className={`p-3 rounded-full ${plan.popular ? "bg-accent/20 glow-green" : "bg-muted/20"}`}>
                                        <Icon className={`w-8 h-8 ${plan.popular ? "text-accent" : "text-muted-foreground"}`} />
                                    </div>
                                </div>

                                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                <div
                                    className={`text-sm font-medium ${plan.popular ? "text-accent text-glow" : "text-muted-foreground"}`}
                                >
                                    {plan.highlight}
                                </div>

                                <div className="mt-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                                </div>

                                <CardDescription className="mt-2">{plan.description}</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {plan.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </CardContent>

                            <CardFooter>
                                <Button
                                    variant={plan.buttonVariant}
                                    className={`w-full font-semibold cursor-pointer ${plan.popular
                                            ? "bg-accent text-accent-foreground hover:bg-accent/90 glow-green"
                                            : plan.name === "Ultimate"
                                                ? "bg-gradient-to-r from-accent to-primary text-primary-foreground hover:opacity-90 glow-green-strong"
                                            : "border-accent/50 text-primary hover:text-white hover:bg-accent/10"
                                        }`}
                                    size="lg"
                                    disabled={plan.upComming}
                                    onClick={() => handelOrder(plan.id)}
                                >
                                    {plan.upComming ? "Comming Soon" : plan.buttonText}
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
