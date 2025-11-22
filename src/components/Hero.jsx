import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const pauseTimeoutRef = React.useRef(null);

    // Placeholder images - replace with real ones later
    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1534056877439-dff92a1e931c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            title: 'Välkommen till Låsta Säteri',
            subtitle: 'Professionell hästverksamhet i harmonisk miljö'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
            title: 'Utbildning & Inridning',
            subtitle: 'Vi tar hand om din hästs utbildning med tålamod och kunskap'
        },
        {
            id: 3,
            image: 'jazz1.jpg',
            title: 'Hästar till salu',
            subtitle: 'Hitta din nästa stjärna hos oss'
        }
    ];

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length, isPaused]);

    const handleManualInteraction = () => {
        setIsPaused(true);
        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
        }
        pauseTimeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 10000); // Pause for 10 seconds
    };

    const nextSlide = () => {
        handleManualInteraction();
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        handleManualInteraction();
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        handleManualInteraction();
        setCurrentSlide(index);
    };

    return (
        <div className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-stone-900">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay */}
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg animate-fade-in-up">
                            {slide.title}
                        </h1>
                        <p className="text-lg md:text-2xl font-light max-w-2xl drop-shadow-md animate-fade-in-up delay-100">
                            {slide.subtitle}
                        </p>
                    </div>
                </div>
            ))}

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors backdrop-blur-sm"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors backdrop-blur-sm"
            >
                <ChevronRight size={32} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
