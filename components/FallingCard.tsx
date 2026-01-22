'use client'

import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

interface FallingCardProps {
    children: ReactNode
    delay?: number
    index?: number
}

export default function FallingCard({ children, delay = 0, index = 0 }: FallingCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={{
                y: -500,
                opacity: 0,
                scale: 0.8,
            }}
            animate={{
                y: 0,
                opacity: 1,
                scale: 1,
            }}
            transition={{
                type: 'spring',
                damping: 15,
                stiffness: 100,
                delay: delay,
                duration: 1,
            }}
            whileHover={{
                scale: 1.05,
                zIndex: 50,
                transition: { duration: 0.2 }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative"
        >
            <motion.div
                className="glass-strong rounded-3xl p-6 shadow-2xl border border-gray-700/50 backdrop-blur-xl cursor-pointer h-full"
                animate={{
                    borderColor: isHovered ? 'rgba(217, 70, 239, 0.5)' : 'rgba(107, 114, 128, 0.5)',
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}
