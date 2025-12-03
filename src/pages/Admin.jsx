import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import { Calendar, Clock, DollarSign, Type, CheckCircle, AlertCircle, Users, LogOut, Trash2 } from 'lucide-react';

const Admin = () => {
    const navigate = useNavigate();
    const { signOut } = useAuth();
    const [formData, setFormData] = useState({
        title: 'Privatlektion',
        location: '',
        date: '',
        startTime: '',
        endTime: '',
        price: '500'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const getDayName = (dateStr) => {
        const date = new Date(dateStr);
        const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
        return days[date.getDay()];
    };

    const fetchBookings = async () => {
        try {
            setLoadingBookings(true);
            const { data, error } = await supabase
                .from('bookings')
                .select(`
                    *,
                    sessions (
                        id,
                        title,
                        day,
                        time,
                        start_datetime,
                        price
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBookings(data || []);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        } finally {
            setLoadingBookings(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const dayName = getDayName(formData.date);
            const timeString = `${formData.startTime} - ${formData.endTime}`;

            // Create datetime objects
            const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
            const endDateTime = new Date(`${formData.date}T${formData.endTime}`);

            const { error: insertError } = await supabase
                .from('sessions')
                .insert([
                    {
                        title: formData.title,
                        location: formData.location,
                        day: dayName,
                        time: timeString,
                        price: parseInt(formData.price),
                        spots: 1,
                        is_booked: false,
                        start_datetime: startDateTime.toISOString(),
                        end_datetime: endDateTime.toISOString()
                    }
                ]);

            if (insertError) throw insertError;

            setMessage('Passet har lagts till!');
            setFormData({
                ...formData,
                location: '',
                date: '',
                startTime: '',
                endTime: ''
            });
        } catch (err) {
            console.error('Error adding session:', err);
            setError('Kunde inte lägga till passet. Kontrollera att databasen är korrekt uppsatt.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    const handleDeleteBooking = async (bookingId, sessionId) => {
        if (!confirm('Är du säker på att du vill radera denna bokning? Detta tar även bort passet permanent från bokningssidan.')) {
            return;
        }

        try {
            console.log('Deleting booking:', bookingId, 'session:', sessionId);

            // Delete the booking
            const { data: deleteData, error: deleteError } = await supabase
                .from('bookings')
                .delete()
                .eq('id', bookingId);

            if (deleteError) {
                console.error('Delete error:', deleteError);
                throw deleteError;
            }

            console.log('Booking deleted successfully');

            // Delete the session completely
            const { data: sessionDeleteData, error: sessionDeleteError } = await supabase
                .from('sessions')
                .delete()
                .eq('id', sessionId);

            if (sessionDeleteError) {
                console.error('Delete session error:', sessionDeleteError);
                throw sessionDeleteError;
            }

            console.log('Session deleted successfully');

            // Refresh bookings list
            await fetchBookings();
            setMessage('Bokningen och passet har raderats permanent!');
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            console.error('Error deleting booking:', err);
            setError(`Kunde inte radera bokningen: ${err.message}`);
            setTimeout(() => setError(null), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Add Session Form */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-stone-100">
                    <div className="bg-hunter-green px-8 py-6 flex items-center justify-between">
                        <h1 className="text-2xl font-serif font-bold text-white">Admin - Lägg till pass</h1>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-md transition-colors"
                        >
                            <LogOut size={18} />
                            <span>Logga ut</span>
                        </button>
                    </div>

                    <div className="p-8">
                        {message && (
                            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 flex items-start">
                                <CheckCircle className="text-green-500 mr-3 mt-0.5" size={20} />
                                <p className="text-green-700 text-sm">{message}</p>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 flex items-start">
                                <AlertCircle className="text-red-500 mr-3 mt-0.5" size={20} />
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Titel</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Type className="h-5 w-5 text-stone-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="focus:ring-hunter-green focus:border-hunter-green block w-full pl-10 sm:text-sm border-stone-300 rounded-md py-3"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Plats</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Type className="h-5 w-5 text-stone-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="focus:ring-hunter-green focus:border-hunter-green block w-full pl-10 sm:text-sm border-stone-300 rounded-md py-3"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Datum</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-stone-400" />
                                    </div>
                                    <input
                                        type="date"
                                        required
                                        className="focus:ring-hunter-green focus:border-hunter-green block w-full pl-10 sm:text-sm border-stone-300 rounded-md py-3"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">Starttid</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Clock className="h-5 w-5 text-stone-400" />
                                        </div>
                                        <input
                                            type="time"
                                            required
                                            className="focus:ring-hunter-green focus:border-hunter-green block w-full pl-10 sm:text-sm border-stone-300 rounded-md py-3"
                                            value={formData.startTime}
                                            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">Sluttid</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Clock className="h-5 w-5 text-stone-400" />
                                        </div>
                                        <input
                                            type="time"
                                            required
                                            className="focus:ring-hunter-green focus:border-hunter-green block w-full pl-10 sm:text-sm border-stone-300 rounded-md py-3"
                                            value={formData.endTime}
                                            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Pris (kr)</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-5 w-5 text-stone-400" />
                                    </div>
                                    <input
                                        type="number"
                                        required
                                        className="focus:ring-hunter-green focus:border-hunter-green block w-full pl-10 sm:text-sm border-stone-300 rounded-md py-3"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-hunter-green hover:bg-dark-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hunter-green transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Sparar...' : 'Lägg till pass'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bookings List */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-stone-100">
                    <div className="bg-dark-green px-8 py-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-white">Bokade Pass</h2>
                            <p className="text-green-100 text-sm mt-1">Alla registrerade bokningar</p>
                        </div>
                        <Users className="text-white" size={32} />
                    </div>

                    <div className="p-8">
                        {loadingBookings ? (
                            <p className="text-center text-stone-500 py-8">Laddar bokningar...</p>
                        ) : bookings.length === 0 ? (
                            <p className="text-center text-stone-500 py-8">Inga bokningar ännu.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-stone-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase">Namn</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase">E-post</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase">Pass</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase">Dag & Tid</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase">Pris</th>
                                            <th className="px-6 py-3 text-right text-xs font-bold text-stone-500 uppercase">Åtgärd</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-100">
                                        {bookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-stone-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">
                                                    {booking.user_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">
                                                    {booking.user_email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">
                                                    {booking.sessions?.title || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{booking.sessions?.day || 'N/A'}</span>
                                                        <span className="text-xs text-stone-500">{booking.sessions?.time || 'N/A'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">
                                                    {booking.sessions?.price || 'N/A'} kr
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                    <button
                                                        onClick={() => handleDeleteBooking(booking.id, booking.session_id)}
                                                        className="inline-flex items-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                                        title="Radera bokning"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
