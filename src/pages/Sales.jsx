import React from 'react';

const Sales = () => {
    return (
        <div className="py-12 bg-stone-50 min-h-screen animate-fade-in-up flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-serif font-bold text-dark-green mb-6">Försäljning</h1>
                    <p className="text-xl text-stone-600">Inga hästar till salu för tillfället.</p>
                </div>
            </div>
        </div>
    );
};

export default Sales;
