import React from 'react';
import { Link } from 'react-router-dom';
import { horses } from '../data/horses';

const OurHorses = () => {
    return (
        <div className="py-12 bg-stone-50 min-h-screen animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-serif font-bold text-dark-green mb-6">Våra Hästar</h1>
                    <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {horses.map((horse) => (
                        <Link
                            key={horse.id}
                            to={`/vara-hastar/${horse.slug}`}
                            className="block group"
                        >
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={horse.image}
                                        alt={horse.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-serif font-bold text-dark-green group-hover:text-hunter-green transition-colors">{horse.name}</h3>
                                        <span className="bg-khaki/20 text-hunter-green text-xs font-semibold px-2.5 py-0.5 rounded">{horse.age}</span>
                                    </div>
                                    <p className="text-sm text-hunter-green font-medium mb-4">{horse.breed}</p>
                                    <p className="text-stone-600 leading-relaxed line-clamp-3">
                                        {horse.description}
                                    </p>
                                    <div className="mt-4 text-hunter-green font-medium text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        Läs mer &rarr;
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurHorses;
