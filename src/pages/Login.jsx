import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error: signInError } = await signIn(formData.email, formData.password);

        if (signInError) {
            setError('Fel email eller lösenord. Försök igen.');
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-stone-100">
                    <div className="bg-hunter-green px-8 py-6 text-center">
                        <LogIn className="mx-auto text-white mb-2" size={48} />
                        <h1 className="text-2xl font-serif font-bold text-white">Admin Login</h1>
                        <p className="text-green-100 text-sm mt-2">Logga in för att komma åt admin-panelen</p>
                    </div>

                    <div className="p-8">
                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 flex items-start">
                                <AlertCircle className="text-red-500 mr-3 mt-0.5" size={20} />
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                                    Email
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
                                        placeholder="admin@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1">
                                    Lösenord
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-stone-400" />
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        required
                                        className="focus:ring-hunter-green focus:border-hunter-green block w-full pl-10 sm:text-sm border-stone-300 rounded-md py-3"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-hunter-green hover:bg-dark-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hunter-green transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Loggar in...' : 'Logga in'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
