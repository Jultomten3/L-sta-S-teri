import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import emailjs from '@emailjs/browser';

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const session = location.state?.session;

    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Redirect if no session data is present
    if (!session && !success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="text-center">
                    <h2 className="text-2xl font-serif text-dark-green mb-4">Ingen bokning vald</h2>
                    <button
                        onClick={() => navigate('/traningar')}
                        className="text-hunter-green hover:underline"
                    >
                        Gå tillbaka till träningar
                    </button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: bookingError } = await supabase
                .from('bookings')
                .insert([
                    {
                        session_id: session.id,
                        user_name: formData.name,
                        user_email: formData.email
                    }
                ]);

            if (bookingError) throw bookingError;

            // Mark the session as booked
            const { error: updateError } = await supabase
                .from('sessions')
                .update({ is_booked: true })
                .eq('id', session.id);

            if (updateError) throw updateError;

            // Send email notification to customer
            try {
                await emailjs.send(
                    "Låsta_säteri",
                    "template_l125jvn",
                    {
                        name: formData.name,
                        date: session.day,
                        time: session.time,
                        location: session.location || 'Ej angiven',
                        title: session.title,
                        price: session.price,
                        email: formData.email  // Send to customer's email
                    },
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                );
                console.log('Email sent to customer successfully!');
            } catch (emailError) {
                console.error('Failed to send email to customer:', emailError);
            }

            // Send email notification to admin
            try {
                await emailjs.send(
                    "Låsta_säteri",
                    "template_l125jvn",
                    {
                        name: formData.name,
                        customer_email: formData.email,
                        date: session.day,
                        time: session.time,
                        location: session.location || 'Ej angiven',
                        title: session.title,
                        price: session.price,
                        email: "lastasateri@gmail.com"  // Send to admin
                    },
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                );
                console.log('Email sent to admin successfully!');
            } catch (emailError) {
                console.error('Failed to send email:', emailError);
                // Don't fail the booking if email fails
            }

            setSuccess(true);
        } catch (err) {
            console.error('Booking error:', err);
            setError('Ett fel uppstod vid bokningen. Vänligen försök igen eller kontakta oss.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center animate-fade-in-up">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-dark-green mb-4">Tack för din bokning!</h2>
                    <p className="text-stone-600 mb-8">
                        Vi har mottagit din bokning för {session?.title} den {session?.day} kl {session?.time}.
                        En bekräftelse har skickats till din e-post.
                    </p>
                    <button
                        onClick={() => navigate('/traningar')}
                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-hunter-green hover:bg-dark-green transition-colors"
                    >
                        Tillbaka till träningar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate('/traningar')}
                    className="mb-8 text-stone-500 hover:text-hunter-green transition-colors flex items-center"
                >
                    ← Tillbaka
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-hunter-green px-8 py-6">
                        <h1 className="text-2xl font-serif font-bold text-white">Slutför din bokning</h1>
                        <p className="text-green-100 mt-2">Fyll i dina uppgifter för att bekräfta platsen.</p>
                    </div>

                    <div className="p-8">
                        <div className="bg-stone-50 rounded-lg p-6 mb-8 border border-stone-100">
                            <h3 className="font-bold text-dark-green mb-4 border-b border-stone-200 pb-2">Bokningsdetaljer</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-stone-500 uppercase tracking-wide">Aktivitet</p>
                                    <p className="font-medium text-stone-900">{session.title}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-stone-500 uppercase tracking-wide">Plats</p>
                                    <p className="font-medium text-stone-900">{session.location || 'Ej angiven'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-stone-500 uppercase tracking-wide">Pris</p>
                                    <p className="font-medium text-stone-900">{session.price} kr</p>
                                </div>
                                <div>
                                    <p className="text-xs text-stone-500 uppercase tracking-wide">Dag</p>
                                    <div className="flex items-center text-stone-900">
                                        <Calendar size={16} className="mr-2 text-raw-umber" />
                                        <span className="font-medium">{session.day}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-stone-500 uppercase tracking-wide">Tid</p>
                                    <div className="flex items-center text-stone-900">
                                        <Clock size={16} className="mr-2 text-raw-umber" />
                                        <span className="font-medium">{session.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 flex items-start">
                                <AlertCircle className="text-red-500 mr-3 mt-0.5" size={20} />
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                                    För- och efternamn
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-stone-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="focus:ring-hunter-green focus:border-hunter-green block w-full pl-10 sm:text-sm border-stone-300 rounded-md py-3"
                                        placeholder="Anna Andersson"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                                    E-postadress
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-stone-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="focus:ring-hunter-green focus:border-hunter-green block w-full pl-10 sm:text-sm border-stone-300 rounded-md py-3"
                                        placeholder="din.epost@exempel.se"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-hunter-green hover:bg-dark-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hunter-green transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Bearbetar...' : 'Bekräfta bokning'}
                                </button>
                                <p className="mt-4 text-xs text-center text-stone-500">
                                    Genom att boka godkänner du att vi sparar dina uppgifter för att kunna hantera din bokning.
                                    Betalning sker på plats.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
