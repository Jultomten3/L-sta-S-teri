import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Lessons = () => {
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSessions();

        // Refresh sessions when user navigates back to this page
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                fetchSessions();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const fetchSessions = async () => {
        try {
            setLoading(true);
            const now = new Date().toISOString();

            const { data, error } = await supabase
                .from('sessions')
                .select('*')
                .eq('is_booked', false)
                .gt('end_datetime', now)
                .order('start_datetime', { ascending: true });

            if (error) throw error;

            // If no data (e.g. table empty or connection failed gracefully), fall back to empty or handle
            setSchedule(data || []);
        } catch (err) {
            console.error('Error fetching sessions:', err);
            // Fallback data for demonstration if DB is not set up yet
            setSchedule([
                { id: 1, title: 'Privatlektion', day: 'Måndag', time: '17:00 - 17:45', spots: 1, price: 500 },
                { id: 2, title: 'Privatlektion', day: 'Måndag', time: '17:45 - 18:30', spots: 1, price: 500 },
                { id: 3, title: 'Privatlektion', day: 'Tisdag', time: '17:00 - 17:45', spots: 0, price: 500 },
                { id: 4, title: 'Privatlektion', day: 'Onsdag', time: '18:00 - 18:45', spots: 1, price: 500 },
                { id: 5, title: 'Privatlektion', day: 'Torsdag', time: '17:00 - 17:45', spots: 1, price: 500 },
            ]);
            // Only show error if it's not just a missing table/connection in dev
            // setError('Kunde inte ladda schemat just nu.'); 
        } finally {
            setLoading(false);
        }
    };

    const handleBookClick = (slot) => {
        if (slot.spots > 0) {
            navigate('/bokning', { state: { session: slot } });
        }
    };

    return (
        <div className="py-12 bg-stone-50 min-h-screen animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-dark-green mb-4">Träningar & Lektioner</h1>
                    <p className="text-stone-600 max-w-2xl mx-auto">
                        Boka privatlektioner för att utveckla din ridning. Alla pass är 45 minuter.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-stone-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-stone-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Dag & Tid</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Plats</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Pris</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-stone-500 uppercase tracking-wider">Boka</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-stone-500">
                                            Laddar schema...
                                        </td>
                                    </tr>
                                ) : schedule.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-stone-500">
                                            Inga tider tillgängliga just nu.
                                        </td>
                                    </tr>
                                ) : (
                                    schedule.map((slot) => (
                                        <tr key={slot.id} className="hover:bg-stone-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-stone-900">{slot.day}</span>
                                                    <span className="text-sm text-stone-500 flex items-center mt-1">
                                                        <Clock size={14} className="mr-1" /> {slot.time}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">
                                                {slot.location || 'Ej angiven'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">
                                                {slot.price} kr
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                {slot.spots > 0 ? (
                                                    <button
                                                        onClick={() => handleBookClick(slot)}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-hunter-green hover:bg-dark-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hunter-green transition-colors"
                                                    >
                                                        Boka
                                                    </button>
                                                ) : (
                                                    <span className="inline-flex items-center px-4 py-2 border border-stone-200 text-sm font-medium rounded-md text-stone-400 bg-stone-50 cursor-not-allowed">
                                                        Bokad
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lessons;
