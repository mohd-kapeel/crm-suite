import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { asset, tourSlides } from "../data/crm-data";
import { Button } from "./crm-helpers";

export function ProductTour({
  open,
  onClose,
  initial = 0,
}: {
  open: boolean;
  onClose: () => void;
  initial?: number;
}) {
  const [active, setActive] = useState(initial);

  useEffect(() => {
    if (open) {
      setActive(initial);
    }
  }, [open, initial]);

  useEffect(() => {
    if (!open) return;

    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowRight") {
        setActive(
          (value) =>
            (value + 1) % tourSlides.length
        );
      }

      if (e.key === "ArrowLeft") {
        setActive(
          (value) =>
            (value - 1 + tourSlides.length) %
            tourSlides.length
        );
      }
    };

    window.addEventListener("keydown", key);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const slide = tourSlides[active];

  const previousSlide = () => {
    setActive(
      (value) =>
        (value - 1 + tourSlides.length) %
        tourSlides.length
    );
  };

  const nextSlide = () => {
    setActive(
      (value) =>
        (value + 1) % tourSlides.length
    );
  };

  return (
    <div className="modal-backdrop tour-backdrop">
      <div className="tour-panel">
        <div className="tour-head">
          <div>
            <span className="eyebrow">
              PRODUCT TOUR ·{" "}
              {String(active + 1).padStart(2, "0")}
              {" / "}
              {tourSlides.length}
            </span>

            <h3>{slide.title}</h3>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        <div className="tour-layout">
          <div className="tour-image-wrap">
            <img
              src={asset(`crm/${slide.image}`)}
              alt={slide.name}
            />
          </div>

          <div className="tour-copy">
            <span className="tour-eyebrow">
              {slide.eyebrow}
            </span>

            <h4>{slide.title}</h4>

            <p>{slide.copy}</p>

            <div className="tour-actions">
              <button
                type="button"
                className="icon-button"
                onClick={previousSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft size={19} />
              </button>

              <button
                type="button"
                className="icon-button"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <ChevronRight size={19} />
              </button>

              <Button onClick={onClose}>
                Close tour
              </Button>
            </div>
          </div>
        </div>

        <div className="tour-thumbs">
          {tourSlides.map((item, index) => (
            <button
              type="button"
              key={item.image}
              className={
                index === active ? "active" : ""
              }
              onClick={() => setActive(index)}
            >
              <img
                src={asset(`crm/${item.image}`)}
                alt={item.name}
              />

              <span>
                {String(index + 1).padStart(2, "0")}
                {" · "}
                {item.shortName}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CHATBOT
   ========================================================= */


