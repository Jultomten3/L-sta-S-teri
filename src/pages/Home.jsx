import React from 'react';
import Hero from '../components/Hero';
import SectionCard from '../components/SectionCard';
import { Trophy, Heart, DollarSign, Calendar, Image } from 'lucide-react';

const Home = () => {
    const sections = [
        {
            title: 'Inridning av häst',
            description: 'Professionell inridning och vidareutbildning med hästens välmående i fokus.',
            image: 'jazz1.jpg',
            link: '/inridning',
            icon: Heart
        },
        {
            title: 'Träningar / Ridlektioner',
            description: 'Utveckla din ridning genom våra träningar och lektioner. Boka din tid här.',
            image: 'cute.jpg',
            link: '/traningar',
            icon: Calendar
        },
        {
            title: 'Försäljning av häst',
            description: 'Hitta din nästa tävlingskamrat eller bästa vän bland våra saluhästar.',
            image: 'mal1.jpg',
            link: '/forsaljning',
            icon: DollarSign
        },
        {
            title: 'Våra hästar',
            description: 'Möt våra fantastiska hästar. Både unghästar, läromästare och tävlingshästar.',
            image: 'horse.jpg',
            link: '/vara-hastar',
            icon: Image
        },
        {
            title: 'Tävlingar',
            description: 'Se våra hästars prestationer och resultat från tävlingsbanorna.',
            image: 'tavling.jpg',
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
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-green mb-4">
                            Vår Verksamhet
                        </h2>
                        <div className="w-24 h-1 bg-raw-umber mx-auto rounded-full" />
                        <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
                            På Låsta Säteri bedriver vi en bred verksamhet med fokus på kvalitet och hästens välbefinnande.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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
