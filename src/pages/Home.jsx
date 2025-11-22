import React from 'react';
import Hero from '../components/Hero';
import SectionCard from '../components/SectionCard';
import { Trophy, Heart, DollarSign, Calendar, Image } from 'lucide-react';

const Home = () => {
    const sections = [
        {
            title: 'Inridning av häst',
            description: 'Professionell inridning och vidareutbildning med hästens välmående i fokus.',
            image: 'https://images.unsplash.com/photo-1551884831-bbf3ddd36b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            link: '/inridning',
            icon: Heart
        },
        {
            title: 'Träningar / Ridlektioner',
            description: 'Utveckla din ridning genom våra träningar och lektioner. Boka din tid här.',
            image: 'https://images.unsplash.com/photo-1529521562626-389725781777?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            link: '/traningar',
            icon: Calendar
        },
        {
            title: 'Försäljning av häst',
            description: 'Hitta din nästa tävlingskamrat eller bästa vän bland våra saluhästar.',
            image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
            link: '/forsaljning',
            icon: DollarSign
        },
        {
            title: 'Våra hästar',
            description: 'Möt våra fantastiska hästar. Både unghästar, läromästare och tävlingshästar.',
            image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=2094&q=80',
            link: '/vara-hastar',
            icon: Image
        },
        {
            title: 'Tävlingar',
            description: 'Se våra hästars prestationer och resultat från tävlingsbanorna.',
            image: 'https://images.unsplash.com/photo-1535083252457-6080fe29be45?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80',
            link: '/tavlingar',
            icon: Trophy
        }
    ];

    return (
        <div className="animate-fade-in-up">
            <Hero />

            <section className="py-16 md:py-24 bg-stone-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
                            Vår Verksamhet
                        </h2>
                        <div className="w-24 h-1 bg-amber-700 mx-auto rounded-full" />
                        <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
                            På Låsta Säteri bedriver vi en bred verksamhet med fokus på kvalitet och hästens välbefinnande.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sections.map((section) => (
                            <SectionCard key={section.title} {...section} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
