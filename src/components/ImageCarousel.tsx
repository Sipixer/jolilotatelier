import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image1 from "@/assets/images/carousel/image1.jpg";
import Image2 from "@/assets/images/carousel/image2.jpg";
import Image3 from "@/assets/images/carousel/image3.jpg";
import Image4 from "@/assets/images/carousel/image4.jpg";
import Image5 from "@/assets/images/carousel/image5.jpg";
import Image6 from "@/assets/images/carousel/image6.jpg";
import Image7 from "@/assets/images/carousel/image7.jpg";
import Image8 from "@/assets/images/carousel/image8.jpg";
import Image9 from "@/assets/images/carousel/image9.jpg";
import Image10 from "@/assets/images/carousel/image10.jpg";

const imagesCarousel = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
];

export function ImageCarousel() {
  return (
    <div className="w-full">
      <Carousel
        opts={{
          loop: true,
          align: "start",
          dragFree: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent className="ml-1">
          {imagesCarousel.map((image, index) => (
            <CarouselItem key={index} className="xl:basis-1/5 basis-1/3 pl-0 ">
              <img
                src={image.src}
                alt={`Carousel Image ${index + 1}`}
                className="border-destructive border-2"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
