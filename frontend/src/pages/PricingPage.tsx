import PricingPlans  from "@/Components/PricingPlans"
import { Button } from "@/Components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion"
import { pricingFaqs } from "@/util/Data"
import { useAuth, useClerk } from "@clerk/clerk-react"
import { placeOrder } from "@/context/OrderService"
import { useContext } from "react"
import { AppContext } from "@/context/AppContext"

const PricingPage = () => {
    const auth  = useAuth();
    const isSignedIn = auth.isSignedIn;
    const getToken = auth.getToken;
    const {openSignIn} = useClerk();
    const appContext = useContext(AppContext);
    const getUserNitroCount = appContext?.getUserNitroCount;

    const handleOrder = (planId: string) => {
        if (!isSignedIn) {
            openSignIn();
        }
        placeOrder({planId , getToken , onSuccess : () => {
            getUserNitroCount?.();
        }});
    }

    return (
        <div className="min-h-screen gradient-bg">
            <div className="container mx-auto max-w-7xl px-4 py-16">
                <div className="text-center mb-20">
                    <div className="relative">
                        {/* Background decorative elements */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <div className="w-96 h-96 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 blur-3xl"></div>
                        </div>

                        <div className="relative z-10">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
                                <span className="text-glow">Choose Your Plan.</span>
                                <br />
                                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                                    Create Without Limits.
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
                                Unlock the full power of AI-powered photo editing with flexible plans for everyone.
                            </p>

                            <Button
                                size="lg"
                                className="bg-accent text-accent-foreground hover:bg-accent/90 glow-green hover-glow text-lg px-8 py-6 font-semibold"
                            >
                                Get Started Free
                            </Button>
                        </div>
                    </div>
                </div>
                <PricingPlans />
                {/* <PricingFAQ /> */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Frequently Asked <span className="text-accent text-glow">Questions</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Everything you need to know about ClariPix pricing and features.
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="space-y-4">
                        {pricingFaqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border border-border/50 rounded-lg px-6 hover:border-accent/30 transition-colors"
                            >
                                <AccordionTrigger className="text-left hover:text-accent transition-colors py-6">
                                    <span className="font-semibold">{faq.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default PricingPage