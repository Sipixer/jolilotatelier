import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { HalfMoonIcon } from "./icons/half-moon-icon";
import type { JSX } from "astro/jsx-runtime";
import { LeftChevron } from "./icons/left-chevron";
import { useEffect, useState } from "react";
import RightChevron from "./icons/right-chevron";
import { AnimatePresence, motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

const slidesData = [
  {
    title: (
      <p>
        une <strong>imagge de marque</strong> alignée et&nbsp;percutante.
      </p>
    ),
    subtitle: "IDENTITÉ VISUELLE · LOGO",
    description: "marquer votre identité.",
    href: "/services/identite-visuelle/",
    services: [
      {
        id: 1,
        type: "CONCEPTION",
        service: "Identité visuelle",
        formules: "3",
      },
      { id: 2, type: "REFONTE", service: "Identité visuelle", formules: "2" },
      { id: 3, type: "CONCEPTION", service: "Logotype", formules: "2" },
    ],
  },
  {
    title: (
      <p>
        des <strong>solutions visuelles</strong> pour tous vos&nbsp;objectifs.
      </p>
    ),
    subtitle: "SUPPORTS PRINT · PACKAGING",
    description: "Intégrer des supports percutants et adaptés à vos besoins.",
    href: "/services/supports-imprimes/",
    services: [
      { id: 1, type: "CONCEPTION", service: "Ligne d’étiquettes" },
      { id: 2, type: "CONCEPTION", service: "Packaging global" },
      { id: 3, type: "CONCEPTION", service: "Papeterie publicitaire" },
    ],
  },
  {
    title: (
      <p>
        une <strong>présence digitale</strong> et&nbsp;captivante.
      </p>
    ),
    subtitle: "SUPPORTS WEB · SITE INTERNET",
    description: "Renforcer votre communication en ligne.",
    href: "/services/supports-web/",
    services: [
      { id: 1, type: "CONCEPTION", service: "Site vitrine sur-mesure" },
      { id: 2, type: "CONCEPTION", service: "Boutique en ligne" },
      { id: 3, type: "REFONT", service: "Site internet existant" },
    ],
  },
  {
    title: (
      <p>
        des <strong>contenus digitaux</strong> percutants.
      </p>
    ),
    subtitle: "PACK MÉDIAS SOCIAUX · CONTENU",
    description: "développer votre image sur les réseaux sociaux.",
    href: "/services/pack-medias/",
    services: [
      {
        id: 1,
        type: "CONCEPTION",
        service: "Templates médias sociaux",
        formules: "3",
      },
      {
        id: 2,
        type: "RÉALISATION",
        service: "Banque contenus",
        formules: "2",
      },
    ],
  },
];

const ServiceSlide = ({
  data,
}: {
  data: {
    title: JSX.Element;
    subtitle: string;
    description: string;
    href: string;
    services: {
      id: number;
      type: string;
      service: string;
      formules?: string;
    }[];
  };
}) => (
  <div className="gap-y-4 flex flex-col px-6 py-2">
    <p className="uppercase text-xs">Jolilot | Agence créative lotoise</p>
    <p className="larken font-thin text-2xl md:text-4xl max-w-[350px]">
      {data.title}
    </p>

    <div className="flex justify-between items-center">
      <div>
        <p className="flex items-center gap-2 hover:text-accent transition-all">
          <HalfMoonIcon />
          <span className="text-xs md:text-base font-medium uppercase">
            {data.subtitle}
          </span>
        </p>
        <p className="text-xs">{data.description}</p>
      </div>
      <a href={data.href} className="hidden sm:block">
        <Button variant="secondary" className="flex items-center gap-2">
          <HalfMoonIcon size={4} />
          découvrir
        </Button>
      </a>
    </div>

    <div className=" px-4">
      <ul className="divide-y border-y border-black">
        {data.services.map((option) => (
          <li
            key={option.id}
            className="py-3 px-2 sm:px-6 flex items-center text-sm sm:text-base"
          >
            <span className=" w-8 text-center">{option.id}</span>
            <div className="flex-1 flex items-center ml-4 gap-x-1.5 flex-wrap sm:flex-nowrap">
              <HalfMoonIcon />
              <span className="text-foreground font-medium">{option.type}</span>
              <span>|</span>
              <span>{option.service}</span>
              {option.formules && (
                <>
                  <span>|</span>
                  <span className="italic">{option.formules} formules</span>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export function BrandCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <Carousel
        opts={{
          loop: true,
        }}
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <div
          className="border border-cyan-500 p-4 rounded-sm"
          style={{
            borderStyle: "dotted",
            borderWidth: "4px",
            borderRadius: "4px",
          }}
        >
          <CarouselContent>
            {slidesData.map((slide, index) => (
              <CarouselItem key={index}>
                <ServiceSlide data={slide} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <div className="flex items-center justify-between w-full px-8 mt-4">
          <button
            className="flex items-center gap-2 hover:text-accent transition-all"
            onClick={() => api?.scrollPrev()}
          >
            <div className="ml-auto w-6 h-6 flex items-center justify-center">
              <LeftChevron backgroundClassName="fill-current" />
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={current} // important : pour que framer détecte le changement
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.2 }}
                className="text-xs md:text-sm font-medium uppercase"
              >
                {slidesData[
                  (current - 2 + count) % count
                ]?.subtitle.toLowerCase()}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            className="flex items-center gap-2 hover:text-accent transition-all"
            onClick={() => api?.scrollNext()}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={current + 1}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.2 }}
                className="text-xs md:text-sm font-medium uppercase"
              >
                {slidesData[current % count]?.subtitle.toLowerCase()}
              </motion.span>
            </AnimatePresence>
            <div className="w-6 h-6 flex items-center justify-center">
              <RightChevron backgroundClassName="fill-current" />
            </div>
          </button>
        </div>
      </Carousel>
    </div>
  );
}
