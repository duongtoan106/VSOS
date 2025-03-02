import { useEffect, useState, useCallback } from "react";
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
    align: "start",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const autoplayInterval = 10000;
  let autoplayTimer;

  const updateState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", updateState);
    emblaApi.on("init", updateState);
    updateState();

    const startAutoplay = () => {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(
        () => emblaApi.scrollNext(),
        autoplayInterval
      );
    };

    startAutoplay();
    return () => clearInterval(autoplayTimer);
  }, [emblaApi, updateState]);

  return (
    <div className="w-full bg-white">
      <div className="relative w-full mx-auto">
        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden w-full">
          <div className="flex transition-transform duration-500 ease-in-out">
            {images.map((src, index) => (
              <div key={index} className="flex-[0_0_100%] relative">
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[500px] object-contain"
                />
                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white p-2 md:p-4 rounded-full shadow-lg hover:bg-gray-200 transition-all opacity-50"
        >
          <ChevronLeft size={20} className="md:size-30" />
        </button>

        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white p-2 md:p-4 rounded-full shadow-lg hover:bg-gray-200 transition-all opacity-50"
        >
          <ChevronRight size={20} className="md:size-30" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
