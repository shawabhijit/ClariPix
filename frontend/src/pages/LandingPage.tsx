import CommingFeatures from '@/Components/CommingFeatures'
import CtaSection from '@/Components/CtaSection'
import Features from '@/Components/Features'
import Footer from '@/Components/Footer'
import HeroSections from '@/Components/HeroSections'
import Reviews from '@/Components/Reviews'

const LandingPage = () => {
    return (
        <div className='min-h-screen bg-background'> 
            <HeroSections />
            <Features />
            <Reviews />
            <CommingFeatures />
            <CtaSection />
            <Footer />
        </div>
    )
}

export default LandingPage