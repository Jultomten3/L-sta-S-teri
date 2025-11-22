import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, X, Check } from 'lucide-react';

const Lessons = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState('confirm'); // 'confirm' or 'success'

    const schedule = [
        { id: 1, day: 'Måndag', time: '17:00', type: 'Hoppning', level: 'Lätt/Msv', trainer: 'Anna Andersson', spots: 2 },
        { id: 2, day: 'Måndag', time: '18:30', type: 'Markarbete', level: 'Alla nivåer', trainer: 'Anna Andersson', spots: 4 },
        { id: 3, day: 'Tisdag', time: '17:30', type: 'Dressyr', level: 'Lätt A', trainer: 'Lars Larsson', spots: 1 },
        { id: 4, day: 'Onsdag', time: '18:00', type: 'Hoppning', level: 'Nybörjare', trainer: 'Anna Andersson', spots: 0 }, // Full
        { id: 5, day: 'Torsdag', time: '17:00', type: 'Dressyr', level: 'Msv B', trainer: 'Lars Larsson', spots: 3 },
    ];

    const handleBookClick = (slot) => {
        if (slot.spots > 0) {
            setSelectedSlot(slot);
            setBookingStep('confirm');
            setIsModalOpen(true);
        }
    };

    const confirmBooking = () => {
        setBookingStep('success');
        // In a real app, this would send an API request
    };

    return (
        <div className="py-12 bg-stone-50 min-h-screen animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Träningar & Lektioner</h1>
                    <p className="text-stone-600 max-w-2xl mx-auto">
                        Boka in dig på våra veckoträningar. Vi har grupper för alla nivåer.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-stone-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-stone-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Dag & Tid</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Pass</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Tränare</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Plats</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-stone-500 uppercase tracking-wider">Boka</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {schedule.map((slot) => (
                                    <tr key={slot.id} className="hover:bg-stone-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-stone-900">{slot.day}</span>
                                                <span className="text-sm text-stone-500 flex items-center mt-1">
                                                    <Clock size={14} className="mr-1" /> {slot.time}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-stone-900">{slot.type}</span>
                                                <span className="text-sm text-stone-500">{slot.level}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">
                                            {slot.trainer}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">
                                            Ridhus A
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            {slot.spots > 0 ? (
                                                <button
                                                    onClick={() => handleBookClick(slot)}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                                                >
                                                    Boka ({slot.spots} kvar)
                                                </button>
                                            ) : (
                                                <span className="inline-flex items-center px-4 py-2 border border-stone-200 text-sm font-medium rounded-md text-stone-400 bg-stone-50 cursor-not-allowed">
                                                    Fullbokat
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    {bookingStep === 'confirm' ? (
                                        <div className="w-full">
                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <Calendar className="h-6 w-6 text-amber-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                    Bekräfta bokning
                                                </h3>
                                                <div className="mt-4 bg-stone-50 p-4 rounded-md">
                                                    <p className="text-sm text-gray-500 mb-2">Du håller på att boka:</p>
                                                    <p className="font-bold text-stone-900">{selectedSlot?.type} - {selectedSlot?.level}</p>
                                                    <p className="text-stone-700">{selectedSlot?.day} kl {selectedSlot?.time}</p>
                                                    <p className="text-stone-600 text-sm mt-1">Tränare: {selectedSlot?.trainer}</p>
                                                </div>
                                                <p className="mt-4 text-sm text-gray-500">
                                                    Genom att klicka på "Bekräfta" godkänner du våra bokningsvillkor. Betalning sker på plats via Swish.
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full text-center">
                                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                                <Check className="h-6 w-6 text-green-600" />
                                            </div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Bokning bekräftad!</h3>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Tack för din bokning. En bekräftelse har skickats till din e-post.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                {bookingStep === 'confirm' ? (
                                    <>
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-700 text-base font-medium text-white hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={confirmBooking}
                                        >
                                            Bekräfta
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Avbryt
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Stäng
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lessons;
