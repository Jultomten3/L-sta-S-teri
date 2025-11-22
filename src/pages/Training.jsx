import React from 'react';
import { CheckCircle } from 'lucide-react';

const Training = () => {
    const prices = [
        { service: 'Inridning (per månad)', price: '10000 kr', details: 'Inkl. uppstallning, foder och skötsel' },
    ];

    const features = [
        'Individuellt anpassat upplägg för varje häst',
        'Lugn och trygg miljö för bästa inlärning',
        'Varierad träning (bana, skog, tömkörning)',
        'Daglig utevistelse i stora hagar',
        'Regelbunden uppdatering till ägaren'
    ];

    return (
        <div className="py-12 bg-stone-50 min-h-screen animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-6">Inridning & Utbildning</h1>
                        <p className="text-lg text-stone-600 leading-relaxed">
                            Vi erbjuder professionell inridning och vidareutbildning av din häst.
                            Vår filosofi bygger på tålamod, långsiktighet och lyhördhet till hästen.
                            Målet är en hållbar, glad och samarbetsvillig häst.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <img
                                src="jazz1.jpg"
                                alt="Hästträning"
                                className="rounded-xl shadow-lg object-cover h-full w-full"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Vårt upplägg</h3>
                            <ul className="space-y-4">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="text-amber-600 mt-1 mr-3 flex-shrink-0" size={20} />
                                        <span className="text-stone-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-stone-100">
                        <div className="bg-stone-900 py-6 px-8">
                            <h3 className="text-2xl font-serif font-bold text-white text-center">Prislista</h3>
                        </div>
                        <div className="p-8">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <tbody className="divide-y divide-stone-100">
                                        {prices.map((item, index) => (
                                            <tr key={index} className="group hover:bg-stone-50 transition-colors">
                                                <td className="py-4 pr-4">
                                                    <div className="font-semibold text-stone-900">{item.service}</div>
                                                    <div className="text-sm text-stone-500 mt-1">{item.details}</div>
                                                </td>
                                                <td className="py-4 pl-4 text-right font-bold text-amber-700 text-lg whitespace-nowrap">
                                                    {item.price}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100 text-sm text-amber-900">
                                <p className="font-semibold mb-1">Notera:</p>
                                <p>Priserna är inklusive moms. Skoning tillkommer. Första månaden betalas i förskott.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Training;
