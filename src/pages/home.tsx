import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BarChart3, Check, CirclePlay, Cloud, FileText, Gauge, Globe2, Menu, Network, Quote, ShieldCheck, Target, Users, X, Zap, LogOut } from "lucide-react";
import { asset, LIVE_CRM, tourSlides, featureTabs, pricingPlans } from "../data/crm-data";
import { Brand, Button, DemoModal, Reveal } from "../components/crm-helpers";
import { ProductTour } from "../components/product-tour";
import { Chatbot, playUISound } from "../components/chatbot";
import { signOut } from "../lib/supabase-auth";
function AppHome() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [demoOpen, setDemoOpen] =
    useState(false);

  const [tourOpen, setTourOpen] =
    useState(false);

  const [tourIndex, setTourIndex] =
    useState(0);

  const [activeTab, setActiveTab] =
    useState("Dashboard");

  const [faq, setFaq] =
    useState(0);

  const [robotOn, setRobotOn] =
    useState(true);

  const [robotStarted, setRobotStarted] =
    useState(false);

  const robotTimer =
    useRef<number | null>(null);

  const activeFeature = useMemo(
    () =>
      featureTabs.find(
        (item) => item.name === activeTab
      ) ?? featureTabs[0],
    [activeTab]
  );

  /* -------------------------------------------------------
     TOUR
     ------------------------------------------------------- */

  const openTour = (index = 0) => {
    setTourIndex(index);
    setTourOpen(true);
  };

  /* -------------------------------------------------------
     ROBOT TOUR
     ------------------------------------------------------- */

  useEffect(() => {
    if (!robotOn || !robotStarted || !tourOpen) return;
    robotTimer.current = window.setInterval(() => {
      setTourIndex((current) => {
        const next = (current + 1) % tourSlides.length;
        playUISound("robot");
        return next;
      });
    }, 3600);
    return () => {
      if (robotTimer.current) {
        window.clearInterval(robotTimer.current);
        robotTimer.current = null;
      }
    };
  }, [robotOn, robotStarted, tourOpen]);

  useEffect(() => {
    if (!tourOpen && robotTimer.current) {
      window.clearInterval(robotTimer.current);
      robotTimer.current = null;
    }
  }, [tourOpen]);

  /* -------------------------------------------------------
     FAQ
     ------------------------------------------------------- */

  const faqs = [
    [
      "What is CRM Suite?",
      "CRM Suite is a cloud-based Customer Relationship Management platform for leads, customers, sales activities, follow-ups, quotations, invoices and business reports from a centralized system.",
    ],

    [
      "Can teams collaborate in CRM Suite?",
      "Yes. The brochure highlights task and team collaboration, multi-user support, team-level visibility and granular user/role management.",
    ],

    [
      "Does CRM Suite support recruitment?",
      "Yes. The live interface includes an ATS Candidate Pool, and ATS synchronization is listed as an Enterprise capability.",
    ],

    [
      "Can CRM Suite be customized?",
      "The brochure describes CRM Suite as a fully customizable solution that can adapt workflows to a business model.",
    ],

    [
      "How do I see the product?",
      "Use the product tour on this page or open the live CRM experience. You can also request a demo through the contact form.",
    ],
  ];

  /* -------------------------------------------------------
     NAVIGATION
     ------------------------------------------------------- */

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div
      id="top"
      className="site"
    >
      {/* ===================================================
          HEADER
          =================================================== */}

      <header className="site-header">
        <div className="header-inner">
          <Brand />

          <nav className="desktop-nav">
            <a href="#product">
              Product
            </a>

            <a href="#workflow">
              How it works
            </a>

            <a href="#outcomes">
              Outcomes
            </a>

            <a href="#pricing">
              Pricing
            </a>

            <a href="#faqs">
              FAQs
            </a>
          </nav>

          <div className="header-actions">
            <Link className="sign-in" href="/login">Sign in</Link>

            <button type="button" className="sign-out-button" onClick={() => void signOut()}><LogOut size={15} /> Sign out</button>
          </div>

          <button
            type="button"
            className="menu-button"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {[
              "product",
              "workflow",
              "outcomes",
              "pricing",
              "faqs",
            ].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={closeMobileMenu}
              >
                <span>
                  {item === "workflow"
                    ? "How it works"
                    : item
                        .charAt(0)
                        .toUpperCase() +
                      item.slice(1)}
                </span>

                <ArrowRight size={15} />
              </a>
            ))}

            <div className="mobile-actions">
              <Link href="/login">Sign in</Link>

              <button type="button" className="mobile-primary" onClick={() => void signOut()}>Sign out</button>
            </div>
          </div>
        )}
      </header>

      {/* ===================================================
          MAIN
          =================================================== */}

      <main>
        {/* =================================================
            HERO
            ================================================= */}

        <section className="hero-section">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="hero-grid" />

          <div className="container hero-grid-layout">
            <div className="hero-copy">
              <Reveal>
                <span className="pill">
                  <span />
                  Cloud-based CRM Suite ·
                  Powered by InventModel
                </span>
              </Reveal>

              <Reveal className="delay-1">
                <h1>
                  Manage leads.{" "}
                  <span>
                    Boost sales.
                  </span>{" "}
                  Grow faster.
                </h1>
              </Reveal>

              <Reveal className="delay-2">
                <p>
                  A connected CRM workspace
                  for leads, customers, sales
                  activities, follow-ups,
                  quotations, invoices, teams
                  and business reporting —
                  all in one place.
                </p>
              </Reveal>

              <Reveal className="delay-3">
                <div className="hero-actions">
                  <Button
                    onClick={() => {
                      setRobotStarted(true);
                      openTour(0);
                    }}
                  >
                    Explore CRM Suite
                    <CirclePlay size={16} />
                  </Button>

                  <Button
                    href="#product"
                    outline
                  >
                    See capabilities
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </Reveal>

              <Reveal className="delay-3">
                <div className="trust-row">
                  <span className="avatar a1">
                    IM
                  </span>

                  <span className="avatar a2">
                    SA
                  </span>

                  <span className="avatar a3">
                    BD
                  </span>

                  <span className="avatar a4">
                    TM
                  </span>

                  <span>
                    Built for sales,
                    operations and
                    customer teams.
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal className="delay-2">
              <div className="hero-visual">
                <div className="glow-card" />

                <div className="browser">
                  <div className="browser-bar">
                    <span />
                    <span />
                    <span />

                    <small>
                      inventmodel-hirepro.replit.app
                      {" / crm"}
                    </small>
                  </div>

                  <img
                    src={asset(
                      "crm/live/dashboard.png"
                    )}
                    alt="CRM Suite live dashboard"
                  />
                </div>

                <div className="float-card card-top">
                  <Gauge size={16} />

                  <div>
                    <strong>
                      Live visibility
                    </strong>

                    <small>
                      Leads · Pipeline · Teams
                    </small>
                  </div>
                </div>

                <div className="float-card card-bottom">
                  <Zap size={16} />

                  <div>
                    <strong>
                      Less manual work
                    </strong>

                    <small>
                      Automate daily operations
                    </small>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =================================================
            STATS
            ================================================= */}

        <section
          className="stats-ribbon"
          aria-label="CRM Suite highlights"
        >
          <div className="container stats-grid">
            <div className="stat-card">
              <span className="stat-icon blue">
                <Users size={18} />
              </span>

              <div>
                <strong>
                  1,908
                </strong>

                <small>
                  Leads in the live view
                </small>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon green">
                <Target size={18} />
              </span>

              <div>
                <strong>
                  188
                </strong>

                <small>
                  Converted leads
                </small>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon purple">
                <BarChart3 size={18} />
              </span>

              <div>
                <strong>
                  10.0%
                </strong>

                <small>
                  Conversion rate
                </small>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon orange">
                <Zap size={18} />
              </span>

              <div>
                <strong>
                  8
                </strong>

                <small>
                  Live product screens
                </small>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            PRODUCT CAPABILITIES
            ================================================= */}

        <section
          id="product"
          className="section section-light"
        >
          <div className="container">
            <Reveal>
              <div className="section-heading">
                <span className="eyebrow">
                  PRODUCT CAPABILITIES
                </span>

                <h2>
                  Everything your customer
                  journey needs.
                </h2>

                <p>
                  CRM Suite brings the core
                  sales and operational
                  workflows together in a
                  single centralized system.
                </p>
              </div>
            </Reveal>

            <div className="feature-grid">
              {[
                [
                  Gauge,
                  "Interactive Dashboard",
                  "Business analytics at a glance",
                ],

                [
                  Target,
                  "Lead Management",
                  "Capture, track and convert leads",
                ],

                [
                  Users,
                  "Customer & Contact Management",
                  "Complete relationship records",
                ],

                [
                  Network,
                  "Sales Pipeline Tracking",
                  "Visualize every deal stage",
                ],

                [
                  Zap,
                  "Follow-up & Activity Management",
                  "Never miss an opportunity",
                ],

                [
                  Users,
                  "Task & Team Collaboration",
                  "Coordinate across the whole team",
                ],

                [
                  FileText,
                  "Quotation Management",
                  "Create and send quotes fast",
                ],

                [
                  BarChart3,
                  "Invoice & Payment Tracking",
                  "Track revenue with precision",
                ],

                [
                  BarChart3,
                  "Reports & Analytics",
                  "Deep insights for better decisions",
                ],

                [
                  ShieldCheck,
                  "User & Role Management",
                  "Granular access controls",
                ],

                [
                  Cloud,
                  "Secure Cloud-Based Access",
                  "Always available, always protected",
                ],

                [
                  Globe2,
                  "Multi-User Support",
                  "Scale with your entire organization",
                ],
              ].map(
                ([Icon, title, copy], index) => {
                  const IconComponent =
                    Icon as typeof Gauge;

                  return (
                    <Reveal
                      key={String(title)}
                      className={`delay-${
                        (index % 3) + 1
                      }`}
                    >
                      <div className="feature-card">
                        <div className="feature-icon">
                          <IconComponent
                            size={21}
                          />
                        </div>

                        <h3>
                          {String(title)}
                        </h3>

                        <p>
                          {String(copy)}
                        </p>
                      </div>
                    </Reveal>
                  );
                }
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            LIVE WORKFLOW
            ================================================= */}

        <section
          id="workflow"
          className="section interactive-section"
        >
          <div className="container">
            <Reveal>
              <div className="section-heading centered">
                <span className="eyebrow">
                  LIVE INTERFACE
                </span>

                <h2>
                  See CRM Suite{" "}
                  <span>in action.</span>
                </h2>

                <p>
                  Switch between the real
                  CRM Suite screens you
                  provided and explore the
                  product workflow.
                </p>
              </div>
            </Reveal>

            <Reveal className="delay-1">
              <div className="interactive-shell">
                <div className="tab-list">
                  {featureTabs.map((tab) => {
                    const Icon = tab.icon;

                    return (
                      <button
                        type="button"
                        key={tab.name}
                        className={
                          activeTab === tab.name
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setActiveTab(tab.name)
                        }
                      >
                        <Icon size={17} />
                        <span>
                          {tab.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="interactive-content">
                  <div className="interactive-copy">
                    <span className="eyebrow">
                      {activeFeature.name.toUpperCase()}
                    </span>

                    <h3>
                      {activeFeature.copy}
                    </h3>

                    <ul>
                      <li>
                        <Check size={15} />
                        Centralized customer data
                      </li>

                      <li>
                        <Check size={15} />
                        Clear ownership and status
                      </li>

                      <li>
                        <Check size={15} />
                        Faster team decisions
                      </li>
                    </ul>

                    <Button
                      onClick={() =>
                        openTour(
                          featureTabs.findIndex(
                            (item) =>
                              item.name ===
                              activeFeature.name
                          )
                        )
                      }
                    >
                      Open full tour
                      <ArrowRight size={15} />
                    </Button>
                  </div>

                  <div className="interactive-image">
                    <img
                      src={asset(
                        `crm/${activeFeature.image}`
                      )}
                      alt={activeFeature.name}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =================================================
            TOUR CTA
            ================================================= */}

        <section className="tour-cta">
          <div className="container tour-cta-inner">
            <div>
              <span className="eyebrow">
                PRODUCT TOUR
              </span>

              <h2>
                Walk through the complete
                CRM Suite.
              </h2>

              <p>
                Explore the real CRM
                screens, team management,
                bulk uploads and ATS
                integration in one guided
                experience.
              </p>
            </div>

            <div className="tour-cta-actions">
              <Button
                onClick={() => {
                  setRobotStarted(true);
                  openTour(0);
                }}
              >
                Start product tour
                <CirclePlay size={16} />
              </Button>

              <button
                type="button"
                className={`robot-toggle ${
                  robotOn ? "on" : ""
                }`}
                onClick={() => {
                  setRobotOn(
                    (value) => !value
                  );
                  setRobotStarted(true);
                }}
              >
                <Zap size={15} />

                Robot{" "}
                {robotOn ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            OUTCOMES
            ================================================= */}

        <section
          id="outcomes"
          className="section outcomes-section"
        >
          <div className="container">
            <div className="outcome-layout">
              <Reveal>
                <div className="section-heading left">
                  <span className="eyebrow">
                    VALUE DELIVERED
                  </span>

                  <h2>
                    Benefits that show up
                    across the operation.
                  </h2>

                  <p>
                    CRM Suite is positioned
                    to deliver measurable
                    impact across sales and
                    customer success
                    operations.
                  </p>
                </div>
              </Reveal>

              <div className="benefit-grid">
                {[
                  "Increase Sales Productivity",
                  "Improve Customer Relationships",
                  "Reduce Manual Work",
                  "Automate Daily Operations",
                  "Improve Team Collaboration",
                  "Better Business Decisions",
                  "Access Data Anytime, Anywhere",
                  "Increase Customer Satisfaction",
                ].map((item, index) => (
                  <Reveal
                    key={item}
                    className={`delay-${
                      (index % 3) + 1
                    }`}
                  >
                    <div className="benefit-card">
                      <span>
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <strong>
                        {item}
                      </strong>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            WHY CRM SUITE
            ================================================= */}

        <section className="section why-section">
          <div className="container">
            <Reveal>
              <div className="section-heading centered">
                <span className="eyebrow">
                  DIFFERENTIATION
                </span>

                <h2>
                  Why choose{" "}
                  <span>
                    CRM Suite?
                  </span>
                </h2>

                <p>
                  Designed for fast
                  adoption, secure growth
                  and the flexibility to fit
                  different business models.
                </p>
              </div>
            </Reveal>

            <div className="why-grid">
              {[
                [
                  "User-Friendly Interface",
                  "Designed for quick adoption without training overhead",
                ],

                [
                  "Secure & Scalable Architecture",
                  "Built to grow alongside your business",
                ],

                [
                  "Fully Customizable Solution",
                  "Adapt workflows to your business model",
                ],

                [
                  "Real-Time Reporting",
                  "Live analytics and instant business insights",
                ],

                [
                  "Cloud-Based Access",
                  "Work from anywhere, any device",
                ],

                [
                  "Multi-User Support",
                  "Teams of all sizes work together",
                ],

                [
                  "Dedicated Technical Support",
                  "Expert assistance when you need it",
                ],

                [
                  "Trusted Across Industries",
                  "Schools · Startups · SMEs · Enterprises · Recruitment",
                ],
              ].map(
                ([title, copy], index) => (
                  <Reveal
                    key={title}
                    className={`delay-${
                      (index % 4) + 1
                    }`}
                  >
                    <div
                      className={`why-card ${
                        index === 7
                          ? "highlight"
                          : ""
                      }`}
                    >
                      <h3>
                        {title}
                      </h3>

                      <p>
                        {copy}
                      </p>
                    </div>
                  </Reveal>
                )
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            PRICING
            ================================================= */}

        <section
          id="pricing"
          className="section pricing-section"
        >
          <div className="container">
            <Reveal>
              <div className="section-heading centered">
                <span className="eyebrow">
                  PRICING PLANS
                </span>

                <h2>
                  Simple, transparent{" "}
                  <span>
                    pricing.
                  </span>
                </h2>

                <p>
                  Choose the operating level
                  that matches your team
                  today and scale when you
                  need more.
                </p>
              </div>
            </Reveal>

            <div className="pricing-grid">
              {pricingPlans.map(
                (
                  {
                    name,
                    copy,
                    items,
                  },
                  index
                ) => (
                  <Reveal
                    key={name}
                    className={`delay-${
                      index + 1
                    }`}
                  >
                    <div
                      className={`price-card ${
                        index === 1
                          ? "popular"
                          : ""
                      }`}
                    >
                      {index === 1 && (
                        <span className="popular-tag">
                          MOST POPULAR
                        </span>
                      )}

                      <h3>
                        {name}
                      </h3>

                      <p>
                        {copy}
                      </p>

                      <div className="price-line" />

                      {items.map((item) => (
                        <div
                          className="price-item"
                          key={item}
                        >
                          <span>
                            <Check size={13} />
                          </span>

                          {item}
                        </div>
                      ))}

                      <Button
                        onClick={() =>
                          setDemoOpen(true)
                        }
                        outline={index !== 1}
                      >
                        {index === 2
                          ? "Contact us"
                          : "Explore plan"}

                        <ArrowRight size={15} />
                      </Button>
                    </div>
                  </Reveal>
                )
              )}
            </div>

            <p className="pricing-note">
              Contact InventModel for
              custom pricing —{" "}
              <a href="mailto:support@inventmodel.com">
                support@inventmodel.com
              </a>
            </p>
          </div>
        </section>

        {/* =================================================
            FAQ
            ================================================= */}

        <section
          id="faqs"
          className="section faq-section"
        >
          <div className="container faq-layout">
            <Reveal>
              <div className="section-heading left">
                <span className="eyebrow">
                  QUESTIONS
                </span>

                <h2>
                  What teams usually ask.
                </h2>

                <p>
                  Clear answers about the
                  CRM Suite product
                  experience.
                </p>
              </div>
            </Reveal>

            <div className="faq-list">
              {faqs.map(
                ([question, answer], index) => (
                  <Reveal
                    key={question}
                    className={`delay-${
                      (index % 3) + 1
                    }`}
                  >
                    <div
                      className={`faq-item ${
                        faq === index
                          ? "open"
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setFaq(
                            faq === index
                              ? -1
                              : index
                          )
                        }
                      >
                        <span>
                          {question}
                        </span>

                        <span>
                          {faq === index
                            ? "−"
                            : "+"}
                        </span>
                      </button>

                      {faq === index && (
                        <p>
                          {answer}
                        </p>
                      )}
                    </div>
                  </Reveal>
                )
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            FINAL CTA
            ================================================= */}

        <section
          id="contact"
          className="final-section"
        >
          <div className="container final-inner">
            <Reveal>
              <div>
                <span className="eyebrow">
                  GET IN TOUCH
                </span>

                <h2>
                  Start your{" "}
                  <span>
                    free demo.
                  </span>
                </h2>

                <p>
                  Explore CRM Suite with
                  your own sales,
                  operations or customer
                  workflow.
                </p>

                <div className="final-actions">
                  <Button
                    onClick={() =>
                      setDemoOpen(true)
                    }
                  >
                    Request a demo
                    <ArrowRight size={16} />
                  </Button>

                  <a
                    className="button button-outline"
                    href={LIVE_CRM}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open live CRM
                    <Globe2 size={16} />
                  </a>
                </div>

                <div className="contact-details">
                  <a
                    href="https://inventmodel.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    inventmodel.com
                  </a>

                  <a href="mailto:support@inventmodel.com">
                    support@inventmodel.com
                  </a>

                  <span>
                    +91 98219-31210
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal className="delay-2">
              <div className="final-card">
                <div className="final-logo">
                  <img
                    src={asset(
                      "inventmodel-logo.jpeg"
                    )}
                    alt="InventModel"
                  />
                </div>

                <div className="final-card-brand">
                  InventModel

                  <small>
                    Technology Solution
                  </small>
                </div>

                <Quote size={25} />

                <h3>
                  CRM{" "}
                  <span>
                    Suite
                  </span>
                </h3>

                <p>
                  Manage Leads. Boost
                  Sales. Grow Faster.
                </p>

                <img
                  src={asset(
                    "crm/live/dashboard.png"
                  )}
                  alt="CRM Suite live dashboard"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ===================================================
          FOOTER
          =================================================== */}

      <footer>
        <div className="container footer-inner">
          <div className="footer-brand">
            <Brand />

            <span>
              Cloud-based CRM solution
              powered by InventModel
              Technology Solution.
            </span>
          </div>

          <div className="footer-links">
            <a href="#product">
              Product
            </a>

            <a href="#pricing">
              Pricing
            </a>

            <a href="#faqs">
              FAQs
            </a>

            <a
              href={LIVE_CRM}
              target="_blank"
              rel="noreferrer"
            >
              Live CRM
            </a>
          </div>

          <span>
            © {new Date().getFullYear()}{" "}
            InventModel
          </span>
        </div>
      </footer>

      {/* ===================================================
          MODALS + CHATBOT
          =================================================== */}

      <DemoModal
        open={demoOpen}
        onClose={() =>
          setDemoOpen(false)
        }
      />

      <ProductTour
        open={tourOpen}
        onClose={() =>
          setTourOpen(false)
        }
        initial={tourIndex}
      />

      <Chatbot
        onDemo={() =>
          setDemoOpen(true)
        }
      />
    </div>
  );
}

export default AppHome;
