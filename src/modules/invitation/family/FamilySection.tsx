import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig } from '@/common/hooks'

import flowers from '@/assets/images/icons/flores-inferiores.png'

const FLUID_EASE = [0.22, 1, 0.36, 1] as const

export const FamilySection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const familyConfig = sections.family

    if (familyConfig?.showFamily === false) {
        return null
    }

    const parents = (familyConfig?.parents as string[]) || [
        'Yesenia Ortega Ortiz',
        'Francisco Javier Nava Trinidad',
    ]

    const godparents = (familyConfig?.godparents as string[]) || [
        'Rosa Trinidad Carmona',
        'Rosa Ma. Ortiz Saucedo',
    ]

    return (
        <section id="family" className="family-section">
            <motion.div
                className="family-section__container"
                initial={{ opacity: 0, y: 35, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.1, ease: FLUID_EASE }}
            >
                <motion.div
                    className="family-section__decoration family-section__decoration--rotate family-section__decoration--1"
                    initial={{ opacity: 0, scale: 0.92, rotate: 180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 180 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.0, delay: 0.1, ease: FLUID_EASE }}
                >
                    <img src={flowers} alt="Flores" />
                </motion.div>

                <div className="family-section__body">
                    <motion.h2
                        className="family-section__blessing"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.0, delay: 0.25, ease: FLUID_EASE }}
                    >
                        Con la bendición de Dios y en compañía<br />
                        {parents.length === 1 ? 'de mi madre y padrinos' : 'de mis padres y padrinos'}
                    </motion.h2>

                    <div className="family-section__grid">
                        <motion.div
                            className="family-section__group"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 1.0, delay: 0.4, ease: FLUID_EASE }}
                        >
                            <h3 className="family-section__role">{parents.length === 1 ? 'Mi Madre' : 'Mis Padres'}</h3>
                            <div className="family-section__names">
                                {parents.map((name, index) => (
                                    <p key={index} className="family-section__name">{name}</p>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="family-section__group"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 1.0, delay: 0.55, ease: FLUID_EASE }}
                        >
                            <h3 className="family-section__role">Mis Padrinos</h3>
                            <div className="family-section__names">
                                {godparents.map((name, index) => (
                                    <p key={index} className="family-section__name">{name}</p>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    className="family-section__decoration family-section__decoration--2"
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.0, delay: 0.7, ease: FLUID_EASE }}
                >
                    <img src={flowers} alt="Flores" />
                </motion.div>
            </motion.div>
        </section>
    )
}
