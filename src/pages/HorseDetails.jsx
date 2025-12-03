import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Ruler, Award, Activity } from 'lucide-react';
import { horses } from '../data/horses';

const HorseDetails = () => {
    const { slug } = useParams();
    const horse = horses.find(h => h.slug === slug);

    if (!horse) {
        return <Navigate to="/vara-hastar" replace />;
    }

    return (
        <div className="py-12 bg-stone-50 min-h-screen animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/vara-hastar" className="inline-flex items-center text-hunter-green hover:text-dark-green mb-8 transition-colors">
                    <ArrowLeft className="mr-2" size={20} />
                    Tillbaka till alla hästar
                </Link>

                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="h-96 lg:h-auto relative">
                            <img
                                src={horse.image}
                                alt={horse.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-8 lg:p-12">
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <h1 className="text-4xl font-serif font-bold text-dark-green">{horse.name}</h1>
                                <span className="bg-khaki/20 text-hunter-green px-3 py-1 rounded-full text-sm font-semibold">
                                    {horse.age}
                                </span>
                                <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-sm font-semibold">
                                    {horse.breed}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center text-stone-600">
                                    <Ruler className="mr-2 text-raw-umber" size={20} />
                                    <span>{horse.height}</span>
                                </div>
                                <div className="flex items-center text-stone-600">
                                    <Activity className="mr-2 text-raw-umber" size={20} />
                                    <span>{horse.gender}</span>
                                </div>
                                <div className="flex items-center text-stone-600 col-span-2">
                                    <Award className="mr-2 text-raw-umber" size={20} />
                                    <span>{horse.category}</span>
                                </div>
                            </div>

                            <div className="prose prose-stone max-w-none">
                                <h3 className="text-xl font-serif font-bold text-dark-green mb-3">Om {horse.name}</h3>
                                <p className="text-stone-600 leading-relaxed mb-6">
                                    {horse.longDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorseDetails;
