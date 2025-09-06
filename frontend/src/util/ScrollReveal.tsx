// Components/ScrollReveal.tsx
"use client"

import { motion } from "framer-motion"
import { type ReactNode } from "react"
import { useInView } from "react-intersection-observer"

interface ScrollRevealProps {
    children: ReactNode
    delay?: number
}

const ScrollReveal = ({ children, delay = 0 }: ScrollRevealProps) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay }}
        >
            {children}
        </motion.div>
    )
}

export default ScrollReveal
