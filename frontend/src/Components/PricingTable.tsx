import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

const plans = [
    {
        name: "Free",
        price: "₹0",
        tagline: "Perfect to get started",
        features: [
            "Background Removal (with watermark)",
            "Basic Editor: Crop, Rotate, Resize",
            "Format Conversion (JPEG ↔ PNG, low res)",
            "3 AI-enhanced images/month",
            "50 MB storage",
        ],
        highlight: false,
    },
    {
        name: "Pro",
        price: "₹499",
        tagline: "Best for professionals & freelancers",
        features: [
            "All Free plan features (no watermark)",
            "Background Replacement",
            "High-res Upscaling (up to 4K)",
            "Unlimited AI Enhancements",
            "Advanced Editing Tools",
            "Batch Editing Support",
            "10 GB Cloud Storage",
            "Priority Processing",
        ],
        highlight: true,
    },
    {
        name: "Business",
        price: "₹1999",
        tagline: "For agencies & teams",
        features: [
            "All Pro plan features",
            "Multi-user Team Accounts",
            "API Access",
            "Admin Dashboard",
            "White-label Option",
            "Premium AI Features",
            "100 GB Cloud Storage",
            "Priority SLA Support",
            "Custom Integrations",
        ],
        highlight: false,
    },
];

export default function PricingTable() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="bg-gradient-to-b from-black via-gray-950 to-black min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">

            {/* Floating Background Icons */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                <motion.div
                    animate={{ y: [0, 40, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-20 left-1/4 text-6xl text-green-500/20"
                >
                    🎨
                </motion.div>
                <motion.div
                    animate={{ y: [0, -30, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute bottom-20 right-1/3 text-6xl text-emerald-400/20"
                >
                    🖼️
                </motion.div>
                <motion.div
                    animate={{ y: [0, 50, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute top-1/3 right-20 text-6xl text-teal-300/20"
                >
                    ✨
                </motion.div>
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16 relative z-10"
            >
                <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    Flexible Plans, Infinite Creativity
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Unlock the power of AI-enhanced images with plans designed for everyone.
                </p>
            </motion.div>

            {/* Pricing Grid */}
            <div className="grid md:grid-cols-3 gap-10 max-w-7xl w-full relative z-10">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        onHoverStart={() => setHovered(index)}
                        onHoverEnd={() => setHovered(null)}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{
                            scale: hovered === index ? 1.05 : 1,
                            rotateX: hovered === index ? 6 : 0,
                            rotateY: hovered === index ? -6 : 0,
                            opacity: 1,
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className={`relative rounded-3xl p-8 backdrop-blur-xl border shadow-xl cursor-pointer overflow-hidden
              ${plan.highlight
                                ? "border-green-500 bg-gradient-to-br from-green-900/30 to-green-700/10"
                                : "border-gray-800 bg-gradient-to-br from-gray-900/60 to-gray-800/20"
                            }`}
                    >
                        {/* Animated Gradient Border */}
                        <div className="absolute -inset-[2px] bg-[linear-gradient(90deg,#22c55e,#06b6d4,#a855f7)] rounded-3xl opacity-0 group-hover:opacity-100 blur-md animate-gradient-x"></div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                            <p className="text-gray-400 mb-6">{plan.tagline}</p>
                            <p className="text-4xl font-extrabold text-green-400 mb-8">
                                {plan.price}
                                <span className="text-lg text-gray-400 font-medium"> /month</span>
                            </p>

                            <ul className="space-y-4 mb-10">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start text-gray-200">
                                        <Check className="h-5 w-5 text-green-400 mr-3 mt-1" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button with Glow Trail */}
                            <motion.button
                                whileHover={{
                                    boxShadow: "0px 0px 25px rgba(34,197,94,0.6)",
                                    scale: 1.05,
                                }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-full py-4 rounded-2xl font-semibold text-lg transition relative cursor-pointer
                  ${plan.highlight
                                        ? "bg-green-500 text-black hover:bg-green-400"
                                        : "bg-gray-800 text-white hover:bg-gray-700"
                                    }`}
                            >
                                {plan.highlight ? "Start Pro" : `Choose ${plan.name}`}
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
