import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SectionCard = ({ title, description, image, link, icon: Icon }) => {
    return (
        <Link
            to={link}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white flex flex-col h-full"
        >
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-dark-green/10 group-hover:bg-dark-green/0 transition-colors z-10" />
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-serif font-bold text-dark-green group-hover:text-hunter-green transition-colors">
                        {title}
                    </h3>
                    {Icon && <Icon className="text-raw-umber" size={24} />}
                </div>
                <p className="text-stone-600 mb-6 text-sm leading-relaxed flex-grow">
                    {description}
                </p>
                <div className="flex items-center text-hunter-green font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                    Läs mer <ArrowRight size={16} className="ml-2" />
                </div>
            </div>
        </Link>
    );
};

export default SectionCard;
