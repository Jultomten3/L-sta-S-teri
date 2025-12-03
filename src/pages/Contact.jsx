import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="py-12 bg-stone-50 min-h-screen animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Kontakta Oss</h1>
                    <p className="text-stone-600 max-w-2xl mx-auto">
                        Har du frågor om vår verksamhet eller vill du boka tid? Tveka inte att höra av dig.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-md border border-stone-100">
                            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Kontaktuppgifter</h3>
                            <div className="space-y-6">
                                <a href="mailto:info@lastasateri.se" className="flex items-start group">
                                    <div className="bg-khaki/20 p-3 rounded-full group-hover:bg-khaki/40 transition-colors">
                                        <Mail className="text-raw-umber" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-stone-500 uppercase tracking-wide">E-post</p>
                                        <p className="text-lg text-stone-900 font-medium group-hover:text-hunter-green transition-colors">info@lastasateri.se</p>
                                    </div>
                                </a>

                                <a href="tel:+46700000000" className="flex items-start group">
                                    <div className="bg-khaki/20 p-3 rounded-full group-hover:bg-khaki/40 transition-colors">
                                        <Phone className="text-raw-umber" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-stone-500 uppercase tracking-wide">Telefon</p>
                                        <p className="text-lg text-stone-900 font-medium group-hover:text-hunter-green transition-colors">070-000 00 00</p>
                                    </div>
                                </a>

                                <div className="flex items-start">
                                    <div className="bg-khaki/20 p-3 rounded-full">
                                        <MapPin className="text-raw-umber" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-stone-500 uppercase tracking-wide">Adress</p>
                                        <p className="text-lg text-stone-900 font-medium">Låsta Säteri</p>
                                        <p className="text-stone-600">645 91 Strängnäs</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-stone-200 h-64 rounded-xl overflow-hidden shadow-inner">
                            <iframe
                                title="Karta över Låsta Säteri"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src="https://maps.google.com/maps?q=59.33911304687921,17.090714655802916&z=14&t=k&output=embed"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100">
                        <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Skicka ett meddelande</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Namn</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="block w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-hunter-green focus:border-hunter-green transition-shadow bg-stone-50"
                                        placeholder="Ditt namn"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">E-post</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="block w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-hunter-green focus:border-hunter-green transition-shadow bg-stone-50"
                                        placeholder="din@email.se"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1">Ämne</label>
                                <select
                                    id="subject"
                                    className="block w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-hunter-green focus:border-hunter-green transition-shadow bg-stone-50"
                                >
                                    <option>Allmän förfrågan</option>
                                    <option>Bokning av träning</option>
                                    <option>Intresseanmälan häst</option>
                                    <option>Inridning/Utbildning</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Meddelande</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="block w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-hunter-green focus:border-hunter-green transition-shadow bg-stone-50"
                                    placeholder="Skriv ditt meddelande här..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-hunter-green hover:bg-dark-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hunter-green transition-colors shadow-md hover:shadow-lg"
                            >
                                Skicka meddelande <Send size={18} className="ml-2" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
