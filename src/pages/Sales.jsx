import React from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sales = () => {
    const horses = [
        {
            id: 1,
            name: 'Diamond King',
            age: '7 år',
            breed: 'SWB',
            discipline: 'Hoppning',
            level: '130cm',
            price: '250 000 kr',
            image: 'https://images.unsplash.com/photo-1534056877439-dff92a1e931c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            description: 'En riktig tävlingsmaskin med hjärtat på rätt ställe. Startklar 130.'
        },
        {
            id: 2,
            name: 'Bella Luna',
            age: '5 år',
            breed: 'KWPN',
            discipline: 'Dressyr',
            level: 'LB',
            price: 'Pris på förfrågan',
            image: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            description: 'Talangfullt sto med tre mycket bra gångarter. Utvecklingsbar.'
        },
        {
            id: 3,
            name: 'Thunder',
            age: '10 år',
            breed: 'Connemara',
            discipline: 'Allround',
            level: 'LA/LA',
            price: '120 000 kr',
            image: 'https://images.unsplash.com/photo-1551884831-bbf3ddd36b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            description: 'Den perfekta läromästaren. Snäll i all hantering och ridning.'
        }
    ];

    return (
        <div className="py-12 bg-stone-50 min-h-screen animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-serif font-bold text-stone-900 mb-6">Hästar till salu</h1>
                    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                        <h3 className="text-lg font-semibold text-stone-800 mb-2 flex items-center justify-center">
                            <Info className="mr-2 text-amber-600" size={20} />
                            Försäljningsprocessen
                        </h3>
                        <p className="text-stone-600 text-sm">
                            Vi är måna om att hitta rätt hem till våra hästar. Provridning bokas via telefon.
                            Besiktning ingår alltid vid försäljning. Vi hjälper gärna till med transportlösningar.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {horses.map((horse) => (
                        <div key={horse.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={horse.image}
                                    alt={horse.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-900 shadow-sm">
                                    {horse.discipline}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h2 className="text-2xl font-serif font-bold text-stone-900">{horse.name}</h2>
                                    <span className="text-stone-500 text-sm">{horse.age}</span>
                                </div>

                                <div className="mb-4 text-sm text-stone-600 space-y-1">
                                    <p><span className="font-semibold">Ras:</span> {horse.breed}</p>
                                    <p><span className="font-semibold">Nivå:</span> {horse.level}</p>
                                </div>

                                <p className="text-stone-600 mb-6 text-sm line-clamp-3 flex-grow">
                                    {horse.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                                    <span className="font-bold text-amber-800 text-lg">{horse.price}</span>
                                    <button className="text-stone-900 hover:text-amber-700 font-medium text-sm flex items-center transition-colors">
                                        Läs mer <ArrowRight size={16} className="ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sales;
