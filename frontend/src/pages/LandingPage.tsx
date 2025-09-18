import CommingFeatures from '@/Components/CommingFeatures'
import CtaSection from '@/Components/CtaSection'
import Features from '@/Components/Features'
import HeroSections from '@/Components/HeroSections'
import Reviews from '@/Components/Reviews'
import ScrollReveal from '@/util/ScrollReveal'

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background space-y-24">
            <ScrollReveal>
                <HeroSections />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
                <Features />
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
                <CommingFeatures />
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
                <Reviews />
            </ScrollReveal>

            <ScrollReveal delay={0.8}>
                <CtaSection />
            </ScrollReveal>
        </div>
    )
}

export default LandingPage
