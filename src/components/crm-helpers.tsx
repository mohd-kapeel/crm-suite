import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, X } from "lucide-react";
import { asset } from "../data/crm-data";

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    element.classList.add("is-visible");

    return () => {
      element.classList.remove("is-visible");
    };
  }, []);

  return ref;
}

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   BRAND
   ========================================================= */

export function Brand() {
  return (
    <a
      href="#top"
      className="brand"
      aria-label="InventModel CRM Suite home"
    >
      <span className="brand-mark">
        <img
          src={asset("inventmodel-logo.jpeg")}
          alt="InventModel"
        />
      </span>

      <span className="brand-name">
        CRM <span>Suite</span>
      </span>
    </a>
  );
}

/* =========================================================
   BUTTON
   ========================================================= */

export function Button({
  children,
  onClick,
  href,
  outline = false,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  outline?: boolean;
  className?: string;
}) {
  const classes = [
    "button",
    outline ? "button-outline" : "button-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    const internal = href.startsWith("/") && !href.startsWith("//");
    if (internal) {
      return (
        <Link className={classes} href={href}>
          {children}
        </Link>
      );
    }
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/* =========================================================
   DEMO MODAL
   ========================================================= */

export function DemoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  if (!open) return null;

  const submit = () => {
    const subject = encodeURIComponent(
      `CRM Suite demo request from ${name || email}`
    );

    const body = encodeURIComponent(
      `Name: ${name}
Company: ${company}
Email: ${email}
Notes: ${notes}`
    );

    window.location.href =
      `mailto:support@inventmodel.com?subject=${subject}&body=${body}`;
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="demo-form modal-panel">
        <div className="modal-head">
          <div>
            <span className="eyebrow">
              GET IN TOUCH
            </span>

            <h3>
              Request your CRM Suite demo
            </h3>
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

        <p className="modal-copy">
          Tell us a little about your team and
          we'll help you explore the CRM workflow.
        </p>

        <div className="form-grid">
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Your name"
          />

          <input
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
            placeholder="Company"
          />

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Email address"
            className="span-2"
            type="email"
          />

          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="What would you like to explore?"
            className="span-2"
          />
        </div>

        <div className="modal-actions">
          <Button
            outline
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button onClick={submit}>
            Request demo
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PRODUCT TOUR
   ========================================================= */
