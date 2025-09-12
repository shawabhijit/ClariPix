import { Crown, Palette, Shield, Sparkles, Type, Zap } from "lucide-react";

export const features = [
    {
        icon: Sparkles,
        title: "AI-Powered Precision",
        description: "Advanced AI algorithms detect and remove backgrounds with pixel-perfect accuracy."
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Process images in seconds, not minutes. Get professional results instantly."
    },
    {
        icon: Shield,
        title: "Privacy First",
        description: "Your images are processed securely and never stored on our servers."
    },
    {
        icon: Palette,
        title: "Seamless Editing",
        description: "Easily change, replace, or customize backgrounds with just a click."
    }
];

export const removeTextfeatures = [
    {
        icon: Sparkles,
        title: "AI-Powered Detection",
        description: "Advanced machine learning algorithms automatically detect and locate text, watermarks, and logos in your images with pixel-perfect precision."
    },
    {
        icon: Zap,
        title: "Lightning Fast Processing",
        description: "Get professional results in seconds, not minutes. Our optimized AI processes images up to 10x faster than traditional tools."
    },
    {
        icon: Shield,
        title: "Privacy & Security First",
        description: "Your images are processed locally and securely. We never store your files, ensuring complete privacy and data protection."
    },
    {
        icon: Type,
        title: "Smart Content Reconstruction",
        description: "Our AI intelligently fills removed text areas with contextually appropriate background, maintaining natural image flow."
    }
];

export const removeBgUseCases = [
    "Remove cluttered or messy backgrounds from product photos",
    "Isolate subjects for clean transparent backgrounds",
    "Create professional ID, passport, or visa photos",
    "Prepare product listings for Amazon, Flipkart, or Shopify",
    "Make portraits look studio-quality without editing",
    "Clean images for social media posts and ads"
];

export const changeBgUseCases = [
    "Replace plain backgrounds with creative themes",
    "Add custom brand colors or logos behind products",
    "Stage real estate or interior photos with new settings",
    "Create eye-catching marketing banners and ads",
    "Swap boring backdrops with scenic locations",
    "Personalize profile pictures with unique backgrounds"
];

export const removeBgSamples = [
    {
        url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
        label: "Product Photo",
        description: "Remove cluttered backgrounds for e-commerce listings"
    },
    {
        url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
        label: "Portrait",
        description: "Get a clean transparent or plain background"
    },
    {
        url: "https://static.fotor.com/app/features/img/step_new/features/3-Car-origin.png",
        label: "Pet Photo",
        description: "Isolate pets from busy outdoor scenes"
    },
    {
        url: "https://static.fotor.com/app/features/img/step_new/features/1-Protrait-origin.png",
        label: "Food Photography",
        description: "Highlight dishes without table clutter"
    }
];

export const changeBgSamples = [
    {
        url: "https://imgs.search.brave.com/jMxv5T5TozJjRRSPB3spigXXodjdSCBdKmggsnek9No/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXRv/dWNoZXIub25saW5l/L19uZXh0L2ltYWdl/P3VybD1odHRwczov/L3N0YXRpYy5yZXRv/dWNoZXIub25saW5l/L2ltZy9iYWNrZ3Jv/dW5kLWNoYW5nZXIv/d2VsY29tZS1zbGlk/ZXIvc2xpZGUxLnBu/ZyZ3PTEwODAmcT03/NQ",
        label: "Studio Portrait",
        description: "Swap plain walls with creative backdrops"
    },
    {
        url: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
        label: "Travel Photo",
        description: "Replace background with dream destinations"
    },
    {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        label: "Marketing Banner",
        description: "Add branded or themed backgrounds"
    },
    {
        url: "https://imgs.search.brave.com/GQ-TVHCdEu8NIyXA2qDUbeFSs78tXF0GfJXIeO0mhM8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/LnBpeGVsY3V0LmFw/cC83LzgvYmFja2dy/b3VuZF9yZW1vdmVy/XzVfMzZjZTRkMzFl/Zl83ZmRjZDdmNzM2/LmpwZw",
        label: "Product Display",
        description: "Place items in styled environments"
    }
];

export const removeTextSampleImages = [
    {
        url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&crop=center',
        label: 'Business Card',
        description: 'Remove company logos and text'
    },
    {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
        label: 'Social Media Post',
        description: 'Clean up watermarks and captions'
    },
    {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center',
        label: 'Marketing Material',
        description: 'Remove unwanted text overlays'
    },
    {
        url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
        label: 'Product Photo',
        description: 'Clean product images'
    },
];

export const pricingFaqs = [
    {
        question: "What are credits and how do they work?",
        answer:
            "Credits are used for AI-powered operations like background removal, upscaling, and advanced editing. Each operation consumes a certain number of credits based on complexity. Free users get 5 credits to start, Premium users get 100 credits monthly, and Ultimate users have unlimited credits.",
    },
    {
        question: "Can I switch plans anytime?",
        answer:
            "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at your next billing cycle, and you'll retain access to premium features until then.",
    },
    {
        question: "Do unused credits roll over?",
        answer:
            "Credits reset monthly for Premium users. However, any unused credits from the current month will carry over to the next month, up to a maximum of 200 credits total. Ultimate users have unlimited credits, so this doesn't apply.",
    },
    {
        question: "What payment methods are supported?",
        answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through Stripe with enterprise-grade encryption.",
    },
    {
        question: "Is there a free trial for premium features?",
        answer:
            "Yes! New users get 5 free credits to try our AI-powered features. You can also start with our Free plan and upgrade anytime. We occasionally offer extended trial periods for Premium and Ultimate plans.",
    },
    {
        question: "What happens to my projects if I downgrade?",
        answer:
            "Your projects and edited photos remain accessible regardless of your plan. However, you may lose access to certain premium features and your storage limit may be reduced. We'll notify you before any changes take effect.",
    },
]

export const PricingPlans = [
    {
        id:"Free",
        name: "Free",
        highlight: "5 Free Credits",
        price: "$0",
        inInr: "0",
        period: "forever",
        description: "Perfect for getting started",
        features: [
            "Free format changing",
            "Limited photo editing tools",
            "Limited resolution for background change & upscale",
            "512MB storage",
        ],
        buttonText: "Start Free",
        buttonVariant: "outline" as const,
        icon: Sparkles,
        popular: false,
        upComming: false,
    },
    {   
        id:"Premium",
        name: "Premium",
        highlight: "100 Credits",
        price: "$9.99",
        inInr: "899",
        period: "per month",
        description: "Most popular choice for creators",
        features: [
            "High-resolution background change & upscale",
            "Remove text & watermarks",
            "All advanced photo editing tools",
            "2GB storage",
        ],
        buttonText: "Upgrade Now",
        buttonVariant: "default" as const,
        icon: Zap,
        popular: true,
        upComming: false,
    },
    {
        id:"Ultimate",
        name: "Ultimate",
        highlight: "Unlimited Creativity",
        price: "$24.99",
        inInr: "2207",
        period: "per month",
        description: "For professionals and teams",
        features: [
            "Unlimited credits",
            "Ultra-high-resolution exports (8K support)",
            "Priority AI processing speed",
            "Team collaboration tools",
            "10GB storage",
        ],
        buttonText: "Go Ultimate",
        buttonVariant: "default" as const,
        icon: Crown,
        popular: false,
        upComming: true,
    },
]