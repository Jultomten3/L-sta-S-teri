import React, { useState } from 'react';
import { Search, Trophy, MapPin, Calendar } from 'lucide-react';

const Competitions = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data
    const horses = [
        {
            id: 1,
            name: 'Silver Star',
            discipline: 'Hoppning',
            description: 'Ett lovande sto med stor kapacitet och fin teknik.',
            results: [
                { date: '2023-10-15', location: 'Strömsholm', class: '1.20m', result: '2:a placering' },
                { date: '2023-09-02', location: 'Sundbyholm', class: '1.15m', result: 'Felfri' },
            ]
        },
        {
            id: 2,
            name: 'Golden Boy',
            discipline: 'Dressyr',
            description: 'Valack med fantastiska gångarter och stabilt temperament.',
            results: [
                { date: '2023-11-05', location: 'Enköping', class: 'Msv B:1', result: '68.5%' },
                { date: '2023-10-20', location: 'Uppsala', class: 'LA:3', result: 'Vinst' },
            ]
        },
        {
            id: 3,
            name: 'Midnight Dancer',
            discipline: 'Fälttävlan',
            description: 'Orädd och snabb, perfekt för den satsande ryttaren.',
            results: [
                { date: '2023-08-15', location: 'Segersjö', class: 'H100', result: '4:e placering' },
            ]
        }
    ];

    const filteredHorses = horses.filter(horse =>
        horse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        horse.discipline.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-12 bg-stone-50 min-h-screen animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Tävlingar</h1>
                    <p className="text-stone-600 max-w-2xl mx-auto">
                        Här kan du följa våra hästars framgångar på tävlingsbanorna.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-12 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-stone-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Sök efter häst eller disciplin..."
                        className="block w-full pl-10 pr-3 py-3 border border-stone-200 rounded-lg leading-5 bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm shadow-sm transition-shadow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Horse List */}
                <div className="space-y-8">
                    {filteredHorses.map((horse) => (
                        <div key={horse.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-stone-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                    <div>
                                        <h2 className="text-2xl font-serif font-bold text-stone-900">{horse.name}</h2>
                                        <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full uppercase tracking-wide">
                                            {horse.discipline}
                                        </span>
                                    </div>
                                    <p className="mt-4 md:mt-0 text-stone-600 italic max-w-md">
                                        "{horse.description}"
                                    </p>
                                </div>

                                <div className="bg-stone-50 rounded-lg p-4 md:p-6">
                                    <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center">
                                        <Trophy className="mr-2 text-amber-600" size={20} />
                                        Tävlingsresultat
                                    </h3>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-stone-200">
                                            <thead className="bg-stone-100">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Datum</th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Plats</th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Klass</th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Resultat</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-stone-200">
                                                {horse.results.map((result, idx) => (
                                                    <tr key={idx} className="hover:bg-stone-50 transition-colors">
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600 flex items-center">
                                                            <Calendar size={14} className="mr-2 text-stone-400" />
                                                            {result.date}
                                                        </td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600">
                                                            <div className="flex items-center">
                                                                <MapPin size={14} className="mr-2 text-stone-400" />
                                                                {result.location}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-900 font-medium">{result.class}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-amber-700">{result.result}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredHorses.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-stone-500 text-lg">Inga hästar hittades som matchar din sökning.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Competitions;
