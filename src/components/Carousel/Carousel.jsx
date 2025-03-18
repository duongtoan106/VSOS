import { useEffect, useState, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "../../assets/carousel1.png";
import img2 from "../../assets/carousel2.png";
import img3 from "../../assets/carousel3.png";
import img4 from "../../assets/carousel4.png";
import img5 from "../../assets/carousel5.png";

const images = [img1, img2, img3, img4, img5];

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayInterval = 5000;
  const autoplayTimer = useRef(null);

  const updateState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", updateState);
    emblaApi.on("init", updateState);
    updateState();

    const startAutoplay = () => {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = setInterval(() => {
        if (emblaApi) emblaApi.scrollNext();
      }, autoplayInterval);
    };

    startAutoplay();
    return () => clearInterval(autoplayTimer.current);
  }, [emblaApi, updateState]);

  return (
    <div className="w-full h-[80vh] bg-white relative">
      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden w-full h-full">
        <div className="flex h-full">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] relative h-full">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      selectedIndex === i ? "bg-gray-300 w-4" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => emblaApi && emblaApi.scrollPrev()}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition-all"
      >
        <ChevronLeft size={30} />
      </button>

      <button
        onClick={() => emblaApi && emblaApi.scrollNext()}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition-all"
      >
        <ChevronRight size={30} />
      </button>
    </div>
  );
};

export default Carousel;
