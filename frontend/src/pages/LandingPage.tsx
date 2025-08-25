import Features from '@/Components/Features'
import HeroSections from '@/Components/HeroSections'

const LandingPage = () => {
    return (
        <div className='min-h-screen bg-background'> 
            <HeroSections />
            <Features />
        </div>
    )
}

export default LandingPage