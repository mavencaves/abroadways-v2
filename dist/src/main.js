import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  Compass,
  FileCheck2,
  GraduationCap,
  Image as ImageIcon,
  Landmark,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Newspaper,
  Phone,
  Plane,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";

const h = React.createElement;

const routes = {
  home: "/",
  login: "/login",
  studyAbroad: "/study-abroad",
  services: "/services",
  planner: "/pathway-planner",
  blog: "/blog",
  about: "/about-us",
  contact: "/contact",
};

const contactInfo = {
  address: "260 Sareng Tower, Malibag, Dhaka-1217, Bangladesh",
  phones: ["01898801960", "01898801961", "01898801962"],
  facebook: "https://www.facebook.com/abroadways",
  instagram: "https://instagram.com/abroadwaysbd",
};

const destinations = [
  {
    name: "New Zealand",
    chip: "New Zealand",
    slug: "new-zealand",
    image: "/images/destination-new-zealand.png",
    short: "Calm campuses, practical pathways, and careful visa planning.",
    overview: "A focused destination for students who want high-quality education, practical support, and a calm study environment.",
    benefits: ["Student-friendly campuses", "Practical study pathways", "Clear documentation planning"],
    studyAreas: ["Business", "Information Technology", "Health Sciences", "Hospitality", "Engineering"],
    intakes: "Common intakes include February and July, with selected programmes offering additional starts.",
    costGuide: "Budget planning should include tuition, living costs, insurance, accommodation, and visa documentation funds.",
    requirements: ["Academic transcripts", "English readiness", "Statement of purpose", "Financial documents", "Passport"],
    visaNotes: "Abroadways helps students prepare a consistent file, organise evidence, and understand visa documentation steps.",
    faqs: [
      ["Can I apply after HSC?", "Yes, suitable pathway options depend on your academic profile and chosen programme."],
      ["Does Abroadways help with documents?", "Yes, we guide application and visa documentation preparation."],
    ],
  },
  {
    name: "United Kingdom",
    chip: "UK",
    slug: "united-kingdom",
    legacySlug: "uk",
    image: "/images/destination-uk.png",
    short: "Focused applications for globally respected UK study options.",
    overview: "The United Kingdom offers wide course choice, strong academic reputation, and structured application timelines.",
    benefits: ["Wide course choice", "Recognised universities", "Strong application timelines"],
    studyAreas: ["Business", "Computer Science", "Law", "Engineering", "Public Health"],
    intakes: "September is the main intake. January and selected spring intakes are also available at many institutions.",
    costGuide: "Plan for tuition, living expenses, health surcharge, visa fees, accommodation, and initial settlement costs.",
    requirements: ["Academic documents", "English evidence", "Personal statement", "CAS requirements", "Financial evidence"],
    visaNotes: "We support students with document organisation, university follow-up, and visa-readiness checks.",
    faqs: [
      ["Which intake is best?", "September usually offers the widest choice, but January can work well for many students."],
      ["Can Abroadways help shortlist universities?", "Yes, we shortlist based on profile, course goals, budget, and intake."],
    ],
  },
  {
    name: "Australia",
    chip: "Australia",
    slug: "australia",
    image: "/images/destination-australia.png",
    short: "Modern campuses with course planning built around your profile.",
    overview: "Australia is a popular choice for students seeking modern campuses, diverse programmes, and structured planning.",
    benefits: ["Modern learning environment", "Diverse programmes", "Profile-led course selection"],
    studyAreas: ["Business", "IT", "Engineering", "Nursing", "Accounting"],
    intakes: "February and July are common intakes. Some institutions also offer trimester or rolling options.",
    costGuide: "Students should plan tuition, living costs, health cover, travel, accommodation, and visa documentation funds.",
    requirements: ["Academic transcripts", "English readiness", "Genuine study plan", "Financial documents", "Passport"],
    visaNotes: "Abroadways helps students prepare documents, review consistency, and plan the visa preparation timeline.",
    faqs: [
      ["Do I need a clear study plan?", "Yes, your course choice should connect with your academic background and future goals."],
      ["Can I compare budgets?", "Yes, budget guidance is part of the counselling process."],
    ],
  },
  {
    name: "Canada",
    chip: "Canada",
    slug: "canada",
    image: "/images/destination-canada.png",
    short: "Structured planning for competitive study applications.",
    overview: "Canada requires careful planning around programme fit, budget, documentation, and application timing.",
    benefits: ["Competitive study options", "Profile-based planning", "Clear document strategy"],
    studyAreas: ["Business", "Computer Science", "Health", "Engineering", "Applied Sciences"],
    intakes: "Fall is the major intake. Winter and selected spring/summer intakes vary by institution and programme.",
    costGuide: "Plan tuition, living costs, proof of funds, travel, accommodation, and settlement expenses.",
    requirements: ["Academic records", "English readiness", "Study plan", "Financial evidence", "Passport"],
    visaNotes: "We help students organise documents and understand how to present a complete study plan.",
    faqs: [
      ["Is Canada competitive?", "Yes, strong planning and document consistency matter."],
      ["Does Abroadways support scholarship guidance?", "Yes, we help identify realistic budget and scholarship possibilities."],
    ],
  },
  {
    name: "Malaysia",
    chip: "Malaysia",
    slug: "malaysia",
    image: "/images/destination-malaysia.png",
    short: "Accessible international education options with clear guidance.",
    overview: "Malaysia offers accessible study options for students seeking international education close to home.",
    benefits: ["Accessible destination", "Practical budgets", "Fast planning options"],
    studyAreas: ["Business", "IT", "Hospitality", "Engineering", "Health Sciences"],
    intakes: "Multiple intakes are available depending on institution and programme, often with flexible start dates.",
    costGuide: "Plan tuition, living expenses, accommodation, medical insurance, travel, and documentation costs.",
    requirements: ["Academic documents", "Passport", "Application forms", "Financial planning", "Health documentation"],
    visaNotes: "Abroadways guides students through application and visa documentation preparation.",
    faqs: [
      ["Is Malaysia budget-friendly?", "It can be accessible compared with many destinations, depending on programme and lifestyle."],
      ["Can I apply quickly?", "Many Malaysian pathways move faster, but documents still need careful preparation."],
    ],
  },
];

const services = [
  ["Country & course selection", "Choose a destination and programme that fit your academic profile, goals, and budget.", Compass],
  ["University application support", "Prepare applications with careful document checks and timeline tracking.", Landmark],
  ["Scholarship & budget guidance", "Understand tuition, living costs, scholarship possibilities, and realistic financial planning.", Sparkles],
  ["Visa documentation support", "Get structured guidance on document preparation, presentation, and visa-readiness.", FileCheck2],
  ["Pre-departure guidance", "Prepare for travel, arrival, accommodation, and the first few weeks abroad.", Plane],
];

const process = [
  ["Profile Review", "We review your academic background, English readiness, budget, and preferred destinations."],
  ["Country Strategy", "You receive a clear country, course, intake, and application plan."],
  ["Application Support", "We support applications, documents, statements, and university follow-ups."],
  ["Visa Preparation", "We help organise a complete, consistent, and visa-ready file."],
  ["Pre-Departure", "You prepare for travel, arrival, accommodation, and the first days abroad."],
];

const blogPosts = [
  {
    title: "How to Choose the Right Study Abroad Destination",
    slug: "choose-right-study-abroad-destination",
    excerpt: "A practical guide for Bangladeshi students comparing country fit, budget, course goals, and documentation.",
    category: "Planning",
    tags: ["study abroad", "counselling"],
    image: "/images/abroadways-destination-planning.png",
    publishedAt: "2026-06-01",
    content: [
      "Choosing a destination should begin with your academic background, preferred subject area, budget range, and long-term goals.",
      "A strong plan compares country fit, course quality, application timeline, documentation readiness, and family budget.",
      "Abroadways helps students turn broad interest into a focused shortlist for New Zealand, the United Kingdom, Australia, Canada, and Malaysia.",
    ],
  },
  {
    title: "What to Prepare Before a University Application",
    slug: "prepare-before-university-application",
    excerpt: "Keep documents, timelines, intake choices, and budget evidence organised before you start applying.",
    category: "Applications",
    tags: ["applications", "documents"],
    image: "/images/consultation-counsellor.png",
    publishedAt: "2026-05-20",
    content: [
      "A complete application file usually starts with academic transcripts, certificates, passport, English readiness, and a clear study goal.",
      "Students should also understand intake deadlines, budget requirements, and document consistency before submitting applications.",
    ],
  },
  {
    title: "Budget Planning for Study Abroad",
    slug: "budget-planning-for-study-abroad",
    excerpt: "Tuition is only one part of the plan. Living costs, travel, visa fees, and settlement costs matter too.",
    category: "Budget",
    tags: ["budget", "scholarships"],
    image: "/images/destination-canada.png",
    publishedAt: "2026-05-08",
    content: [
      "Good budget planning includes tuition, living costs, accommodation, insurance, visa costs, travel, and emergency funds.",
      "Scholarships may help, but students should plan around realistic funding and transparent documentation.",
    ],
  },
];

const adminRoutes = [
  ["/dashboard", "Overview", LayoutDashboard],
  ["/dashboard/pages", "Pages", BookOpenCheck],
  ["/dashboard/countries", "Countries", Compass],
  ["/dashboard/blogs", "Blogs", Newspaper],
  ["/dashboard/leads", "Leads", UsersRound],
  ["/dashboard/media", "Media", ImageIcon],
  ["/dashboard/settings", "Settings", Settings],
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Link({ href, className, children, onClick, ...props }) {
  return h("a", {
    href,
    className,
    onClick: (event) => {
      if (href?.startsWith("/")) {
        event.preventDefault();
        navigateTo(href);
      }
      onClick?.(event);
    },
    ...props,
  }, children);
}

function ButtonLink({ href, children, variant = "primary", className = "" }) {
  return h(Link, { href, className: cx("button", `button-${variant}`, className) }, h("span", null, children), h(ArrowRight, { size: 18 }));
}

function setSeo({ title, description, image = "/images/abroadways-hero-campus.png" }) {
  React.useEffect(() => {
    document.title = title;
    const ensure = (selector, create) => {
      let node = document.head.querySelector(selector);
      if (!node) {
        node = create();
        document.head.appendChild(node);
      }
      return node;
    };
    ensure('meta[name="description"]', () => Object.assign(document.createElement("meta"), { name: "description" })).content = description;
    ensure('meta[property="og:title"]', () => {
      const node = document.createElement("meta");
      node.setAttribute("property", "og:title");
      return node;
    }).content = title;
    ensure('meta[property="og:description"]', () => {
      const node = document.createElement("meta");
      node.setAttribute("property", "og:description");
      return node;
    }).content = description;
    ensure('meta[property="og:image"]', () => {
      const node = document.createElement("meta");
      node.setAttribute("property", "og:image");
      return node;
    }).content = image;
  }, [title, description, image]);
}

async function api(path, options = {}) {
  const token = getAdminToken();
  const response = await fetch(`/api${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

function getAdminToken() {
  return window.localStorage.getItem("abroadways_admin_token");
}

function setAdminToken(token) {
  if (token) window.localStorage.setItem("abroadways_admin_token", token);
  else window.localStorage.removeItem("abroadways_admin_token");
}

function logoutAdmin() {
  setAdminToken("");
  navigateTo(routes.login);
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeAll = () => {
    setOpen(false);
    setDropdownOpen(false);
  };

  return h(
    "header",
    { className: "site-header" },
    h(
      "nav",
      { className: "navbar container" },
      h(Link, { href: routes.home, className: "brand", onClick: closeAll, "aria-label": "Abroadways home" }, h("span", { className: "brand-mark" }, "A"), h("span", { className: "brand-text" }, "Abroadways")),
      h(
        "div",
        { className: "desktop-nav" },
        h(Link, { href: routes.home, className: "nav-link" }, "Home"),
        h(
          "div",
          { className: "dropdown", onMouseEnter: () => setDropdownOpen(true), onMouseLeave: () => setDropdownOpen(false) },
          h("button", { className: "nav-link dropdown-toggle", type: "button", onClick: () => setDropdownOpen((value) => !value), "aria-expanded": dropdownOpen }, "Study Abroad", h(ChevronDown, { size: 15 })),
          h("div", { className: cx("dropdown-menu", dropdownOpen && "dropdown-menu-open") }, destinations.map((destination) => h(Link, { key: destination.slug, href: `${routes.studyAbroad}/${destination.slug}`, className: "dropdown-item", onClick: closeAll }, destination.name))),
        ),
        h(Link, { href: routes.services, className: "nav-link" }, "Services"),
        h(Link, { href: routes.blog, className: "nav-link" }, "Blog"),
        h(Link, { href: routes.about, className: "nav-link" }, "About Us"),
        h(Link, { href: routes.contact, className: "nav-link" }, "Contact"),
      ),
      h(ButtonLink, { href: routes.planner, className: "desktop-cta" }, "Book Free Consultation"),
      h("button", { className: "mobile-menu-button", type: "button", onClick: () => setOpen((value) => !value), "aria-label": open ? "Close navigation" : "Open navigation" }, open ? h(X, { size: 24 }) : h(Menu, { size: 24 })),
    ),
    h(
      "div",
      { className: cx("mobile-nav", open && "mobile-nav-open") },
      h(Link, { href: routes.home, onClick: closeAll }, "Home"),
      h(Link, { href: routes.studyAbroad, onClick: closeAll }, "Study Abroad"),
      destinations.map((destination) => h(Link, { key: destination.slug, href: `${routes.studyAbroad}/${destination.slug}`, className: "mobile-sub-link", onClick: closeAll }, destination.name)),
      h(Link, { href: routes.services, onClick: closeAll }, "Services"),
      h(Link, { href: routes.blog, onClick: closeAll }, "Blog"),
      h(Link, { href: routes.about, onClick: closeAll }, "About Us"),
      h(Link, { href: routes.contact, onClick: closeAll }, "Contact"),
      h(ButtonLink, { href: routes.planner, className: "mobile-cta" }, "Book Free Consultation"),
    ),
  );
}

function SectionHeading({ eyebrow, title, copy }) {
  return h("div", { className: "section-heading" }, eyebrow && h("span", { className: "eyebrow" }, eyebrow), h("h2", null, title), copy && h("p", null, copy));
}

function HomePage() {
  setSeo({
    title: "Abroadways | Study Abroad with Confidence",
    description: "Premium study abroad counselling, university application, visa guidance, budget planning, and pre-departure support for Bangladeshi students.",
  });

  return h(React.Fragment, null, h(Hero), h(DestinationShowcase), h(PlannerPreview), h(ServicesSection), h(ProcessSection), h(BlogPreview), h(TrustSection), h(FinalCta));
}

function Hero() {
  return h(
    "section",
    { className: "hero" },
    h(
      "div",
      { className: "container hero-shell" },
      h(
        "div",
        { className: "hero-copy" },
        h("span", { className: "eyebrow" }, "Abroadways Limited"),
        h("h1", null, "Study Abroad with Confidence"),
        h("p", { className: "hero-subtitle" }, "Clear counselling, university application, and visa guidance for Bangladeshi students."),
        h("div", { className: "hero-actions" }, h(ButtonLink, { href: routes.planner }, "Book Free Consultation"), h(ButtonLink, { href: routes.studyAbroad, variant: "secondary" }, "Explore Countries")),
        h("div", { className: "hero-chips" }, destinations.map((destination) => h("span", { key: destination.slug }, destination.chip))),
      ),
      h("div", { className: "hero-visual" }, h("img", { src: "/images/abroadways-hero-campus.png", alt: "Students walking across a university campus" }), h("div", { className: "hero-floating-card" }, h(GraduationCap, { size: 24 }), h("div", null, h("strong", null, "5 focused destinations"), h("span", null, "Counselling, applications, visa support")))),
    ),
  );
}

function DestinationShowcase({ compact = false }) {
  return h(
    "section",
    { className: "section destination-section" },
    h(
      "div",
      { className: "container" },
      h(SectionHeading, { eyebrow: "Destinations", title: "Focused countries, beautifully planned", copy: "Choose from five destinations with clear guidance and realistic pathway planning." }),
      h(
        "div",
        { className: cx("destination-grid", compact && "destination-grid-compact") },
        destinations.map((destination) =>
          h(
            Link,
            { key: destination.slug, href: `${routes.studyAbroad}/${destination.slug}`, className: "destination-card" },
            h("img", { src: destination.image, alt: `${destination.name} study destination` }),
            h(
              "div",
              { className: "destination-card-content" },
              h("h3", null, destination.name),
              h("p", null, destination.short),
              h("span", null, "Explore country", h(ArrowRight, { size: 16 })),
            ),
          ),
        ),
      ),
    ),
  );
}

function PlannerPreview() {
  return h(
    "section",
    { className: "section planner-preview" },
    h("div", { className: "container planner-preview-inner" }, h("div", null, h("span", { className: "eyebrow" }, "Smart pathway planner"), h("h2", null, "Find your best study abroad pathway"), h("p", null, "Answer a few focused questions and help our counsellors understand your country interest, study level, budget, intake, documents, and contact details."), h(ButtonLink, { href: routes.planner }, "Start Pathway Planner")), h("div", { className: "planner-mini-card" }, ["Country interest", "Study level", "Budget range", "Intake", "Documents", "Contact details"].map((item, index) => h("span", { key: item }, `0${index + 1}`, h("strong", null, item))))),
  );
}

function ServicesSection({ heading = true }) {
  return h("section", { className: "section services-section" }, h("div", { className: "container" }, heading && h(SectionHeading, { eyebrow: "Services", title: "Premium support without the noise", copy: "Short, practical guidance across the decisions that matter most." }), h("div", { className: "service-grid" }, services.map(([title, copy, Icon]) => h("article", { key: title, className: "service-card" }, h("span", { className: "icon-wrap" }, h(Icon, { size: 24 })), h("h3", null, title), h("p", null, copy))))));
}

function ProcessSection() {
  return h("section", { className: "section process-section" }, h("div", { className: "container" }, h("div", { className: "process-top" }, h(SectionHeading, { eyebrow: "Process", title: "A structured journey from profile to departure", copy: "A clean process that keeps students and families informed at every step." }), h("div", { className: "process-image" }, h("img", { src: "/images/abroadways-destination-planning.png", alt: "Study abroad planning materials" }))), h("div", { className: "process-grid" }, process.map(([title, copy], index) => h("article", { key: title, className: "process-card" }, h("span", { className: "process-number" }, `0${index + 1}`), h("h3", null, title), h("p", null, copy))))));
}

function BlogPreview() {
  return h("section", { className: "section blog-preview" }, h("div", { className: "container" }, h("div", { className: "split-heading" }, h(SectionHeading, { eyebrow: "Guides", title: "Latest study abroad guides", copy: "SEO-friendly planning notes for students and families." }), h(ButtonLink, { href: routes.blog, variant: "outline" }, "View Blog")), h("div", { className: "blog-grid" }, blogPosts.slice(0, 3).map((post) => h(BlogCard, { key: post.slug, post })))));
}

function BlogCard({ post }) {
  return h(Link, { href: `${routes.blog}/${post.slug}`, className: "blog-card" }, h("img", { src: post.image, alt: post.title }), h("div", { className: "blog-card-body" }, h("span", null, post.category), h("h3", null, post.title), h("p", null, post.excerpt), h("strong", null, "Read guide", h(ArrowRight, { size: 15 }))));
}

function TrustSection() {
  const trust = [["Abroadways Limited", BadgeCheck], ["Student-first counselling", GraduationCap], ["UKVI Approved LanguageCert Test Centre", ShieldCheck], ["Transparent process", CheckCircle2]];
  return h("section", { className: "section trust-section" }, h("div", { className: "container trust-layout" }, h("div", null, h("span", { className: "eyebrow" }, "Trust"), h("h2", null, "Built around clarity, care, and responsible guidance"), h("p", null, "Abroadways keeps the website focused on counselling, applications, visa guidance, budgets, and pre-departure support.")), h("div", { className: "trust-grid" }, trust.map(([item, Icon]) => h("div", { key: item, className: "trust-item" }, h(Icon, { size: 22 }), h("span", null, item))))));
}

function FinalCta() {
  return h("section", { className: "final-cta" }, h("div", { className: "container final-cta-inner" }, h("span", { className: "eyebrow" }, "Plan with confidence"), h("h2", null, "Ready to plan your study abroad journey?"), h("p", null, "Start with the pathway planner or contact Abroadways for a direct consultation."), h("div", { className: "hero-actions center" }, h(ButtonLink, { href: routes.planner, variant: "light" }, "Start Planner"), h(ButtonLink, { href: routes.contact, variant: "secondary" }, "Contact Abroadways"))));
}

function StudyAbroadPage() {
  setSeo({ title: "Study Abroad Destinations | Abroadways", description: "Explore study abroad pathways for New Zealand, the United Kingdom, Australia, Canada, and Malaysia.", image: "/images/abroadways-hero-campus.png" });
  return h(React.Fragment, null, h(PageHero, { eyebrow: "Study Abroad", title: "Five destinations. One focused agency.", copy: "Explore premium study pathways with Abroadways Limited.", image: "/images/abroadways-hero-campus.png" }), h(DestinationShowcase, { compact: true }), h(PlannerPreview), h(FinalCta));
}

function CountryPage({ destination }) {
  setSeo({ title: `Study in ${destination.name} | Abroadways`, description: destination.overview, image: destination.image });
  return h(React.Fragment, null, h(PageHero, { eyebrow: "Study Abroad", title: `Study in ${destination.name}`, copy: destination.short, image: destination.image }), h("section", { className: "section country-detail" }, h("div", { className: "container country-detail-grid" }, h("div", { className: "country-story" }, h("span", { className: "eyebrow" }, "Overview"), h("h2", null, `Your ${destination.name} pathway, organised`), h("p", null, destination.overview), h(ButtonLink, { href: routes.planner }, "Start Pathway Planner")), h("aside", { className: "country-panel" }, h("h3", null, "Why study there"), h("ul", null, destination.benefits.map((item) => h("li", { key: item }, h(CheckCircle2, { size: 18 }), h("span", null, item))))))), h(CountryInfoSections, { destination }), h(ProcessSection), h(FaqSection, { items: destination.faqs }), h(FinalCta));
}

function CountryInfoSections({ destination }) {
  const sections = [["Popular study areas", destination.studyAreas.join(", ")], ["Intake guidance", destination.intakes], ["Cost guidance", destination.costGuide], ["Application requirements", destination.requirements.join(", ")], ["Visa support", destination.visaNotes]];
  return h("section", { className: "section services-section" }, h("div", { className: "container info-grid" }, sections.map(([title, copy]) => h("article", { key: title, className: "info-card" }, h("h3", null, title), h("p", null, copy)))));
}

function FaqSection({ items }) {
  return h("section", { className: "section faq-section" }, h("div", { className: "container" }, h(SectionHeading, { eyebrow: "FAQ", title: "Common questions", copy: "Short answers for early-stage planning." }), h("div", { className: "faq-grid" }, items.map(([question, answer]) => h("article", { key: question, className: "faq-card" }, h("h3", null, question), h("p", null, answer))))));
}

function ServicesPage() {
  setSeo({ title: "Study Abroad Services | Abroadways", description: "Country selection, applications, budget guidance, visa documentation, and pre-departure support.", image: "/images/consultation-counsellor.png" });
  return h(React.Fragment, null, h(PageHero, { eyebrow: "Services", title: "Counselling that makes the journey clear", copy: "Practical support from country strategy to pre-departure.", image: "/images/consultation-counsellor.png" }), h(ServicesSection), h(ProcessSection), h(FinalCta));
}

function BlogPage() {
  setSeo({ title: "Study Abroad Blog | Abroadways", description: "Study abroad guides for Bangladeshi students and families.", image: "/images/abroadways-destination-planning.png" });
  return h(React.Fragment, null, h(PageHero, { eyebrow: "Blog", title: "Study abroad guides", copy: "Clear, practical notes for planning your next step.", image: "/images/abroadways-destination-planning.png" }), h("section", { className: "section" }, h("div", { className: "container blog-grid blog-grid-large" }, blogPosts.map((post) => h(BlogCard, { key: post.slug, post })))));
}

function BlogDetailPage({ post }) {
  setSeo({ title: `${post.title} | Abroadways`, description: post.excerpt, image: post.image });
  return h(React.Fragment, null, h(PageHero, { eyebrow: post.category, title: post.title, copy: post.excerpt, image: post.image }), h("article", { className: "section article-section" }, h("div", { className: "container article-body" }, post.content.map((paragraph) => h("p", { key: paragraph }, paragraph)), h(ButtonLink, { href: routes.planner }, "Plan My Pathway"))));
}

function AboutPage() {
  setSeo({ title: "About Abroadways Limited", description: "Abroadways Limited is a focused study abroad agency for Bangladeshi students.", image: "/images/abroadways-hero-campus.png" });
  return h(React.Fragment, null, h(PageHero, { eyebrow: "About Us", title: "A focused study abroad agency for Bangladeshi students", copy: "Clear counselling and application guidance for selected destinations only.", image: "/images/abroadways-hero-campus.png" }), h(TrustSection), h(FinalCta));
}

function PathwayPlannerPage() {
  setSeo({ title: "Pathway Planner | Abroadways", description: "Start your free study abroad consultation with a premium multi-step pathway planner.", image: "/images/consultation-counsellor.png" });
  const steps = [
    ["interestedCountry", "Country interest", destinations.map((item) => item.name)],
    ["educationLevel", "Study level", ["Foundation", "Bachelor", "Master", "Diploma", "Other"]],
    ["budgetRange", "Budget", ["Below BDT 15 lakh", "BDT 15-25 lakh", "BDT 25-40 lakh", "BDT 40 lakh+"]],
    ["intake", "Intake", ["Next intake", "Within 6 months", "Within 12 months", "Not sure"]],
    ["examStatus", "English test status", ["Completed", "Preparing", "Not started", "Need advice"]],
    ["passportStatus", "Passport status", ["Ready", "Applied", "Need to apply"]],
    ["visaRefusalStatus", "Previous visa refusal", ["No", "Yes", "Prefer to discuss"]],
  ];
  const [index, setIndex] = useState(0);
  const [form, setForm] = useState({ source: "pathway-planner", status: "new" });
  const [saved, setSaved] = useState(false);
  const active = steps[index];
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event.preventDefault();
    await api("/leads", { method: "POST", body: JSON.stringify(form) }).catch(() => null);
    setSaved(true);
  };

  return h(React.Fragment, null, h(PageHero, { eyebrow: "Pathway Planner", title: "Find your best study abroad pathway", copy: "A focused planner for country interest, budget, intake, documents, and contact details.", image: "/images/consultation-counsellor.png" }), h("section", { className: "section planner-page" }, h("div", { className: "container planner-shell" }, h("div", { className: "planner-progress" }, steps.concat([["contact", "Contact details"]]).map((step, stepIndex) => h("span", { key: step[0], className: stepIndex <= index ? "active" : "" }, stepIndex + 1))), saved ? h("div", { className: "planner-success" }, h(CheckCircle2, { size: 44 }), h("h2", null, "Your pathway request has been saved."), h("p", null, "Abroadways will review your profile and contact you soon."), h(ButtonLink, { href: routes.home }, "Back to Home")) : h("form", { className: "planner-form", onSubmit: submit }, active ? h("div", null, h("span", { className: "eyebrow" }, `Step ${index + 1}`), h("h2", null, active[1]), h("div", { className: "choice-grid" }, active[2].map((choice) => h("button", { key: choice, type: "button", className: cx("choice-card", form[active[0]] === choice && "selected"), onClick: () => update(active[0], choice) }, choice)))) : h(ContactFields, { form, update }), h("div", { className: "planner-actions" }, index > 0 && h("button", { type: "button", className: "button button-outline", onClick: () => setIndex((value) => value - 1) }, "Back"), index < steps.length ? h("button", { type: "button", className: "button button-primary", onClick: () => setIndex((value) => value + 1) }, "Continue", h(ArrowRight, { size: 18 })) : h("button", { type: "submit", className: "button button-primary" }, "Submit Planner", h(ArrowRight, { size: 18 })))))));
}

function ContactFields({ form, update }) {
  return h("div", null, h("span", { className: "eyebrow" }, "Final step"), h("h2", null, "Contact details"), h("div", { className: "form-grid" }, ["name", "email", "phone"].map((field) => h("label", { key: field }, field[0].toUpperCase() + field.slice(1), h("input", { required: field !== "email", value: form[field] || "", onChange: (event) => update(field, event.target.value), placeholder: field === "phone" ? "018..." : field }))), h("label", { className: "full" }, "Message", h("textarea", { value: form.message || "", onChange: (event) => update("message", event.target.value), placeholder: "Tell us about your preferred course or questions." }))));
}

function ContactPage() {
  setSeo({ title: "Contact Abroadways", description: "Contact Abroadways Limited in Dhaka for study abroad counselling.", image: "/images/consultation-counsellor.png" });
  const [form, setForm] = useState({ source: "contact", status: "new" });
  const [sent, setSent] = useState(false);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event.preventDefault();
    await api("/leads", { method: "POST", body: JSON.stringify(form) }).catch(() => null);
    setSent(true);
  };
  return h(React.Fragment, null, h(PageHero, { eyebrow: "Contact", title: "Book your free consultation", copy: "Visit or contact Abroadways for country planning, applications, and visa preparation.", image: "/images/consultation-counsellor.png" }), h("section", { className: "section contact-section" }, h("div", { className: "container contact-grid" }, h("div", { className: "contact-card contact-primary" }, h("span", { className: "eyebrow" }, "Dhaka office"), h("h2", null, "Talk to Abroadways"), h(ContactList), h(ButtonLink, { href: routes.planner }, "Start Pathway Planner")), h("form", { className: "contact-card contact-form", onSubmit: submit }, h("h3", null, sent ? "Message saved" : "Send a message"), sent ? h("p", null, "Thank you. Abroadways will contact you soon.") : h(ContactFields, { form, update }), !sent && h("button", { className: "button button-primary", type: "submit" }, "Send Message", h(ArrowRight, { size: 18 }))))));
}

function ContactList() {
  return h("div", { className: "contact-list" }, h(ContactItem, { icon: MapPin, title: "Address", lines: [contactInfo.address] }), h(ContactItem, { icon: Phone, title: "Phone", lines: contactInfo.phones, tel: true }), h(ContactItem, { icon: Mail, title: "Social", lines: ["facebook.com/abroadways", "instagram.com/abroadwaysbd"], social: true }), h("div", { className: "map-area" }, "Malibag, Dhaka office area"));
}

function ContactItem({ icon: Icon, title, lines, tel, social }) {
  return h("div", { className: "contact-item" }, h("span", { className: "icon-wrap" }, h(Icon, { size: 22 })), h("div", null, h("h3", null, title), lines.map((line) => {
    if (tel) return h("a", { key: line, href: `tel:${line}`, className: "contact-line" }, line);
    if (social && line.includes("facebook")) return h("a", { key: line, href: contactInfo.facebook, target: "_blank", rel: "noreferrer", className: "contact-line" }, line);
    if (social && line.includes("instagram")) return h("a", { key: line, href: contactInfo.instagram, target: "_blank", rel: "noreferrer", className: "contact-line" }, line);
    return h("p", { key: line, className: "contact-line" }, line);
  })));
}

function PageHero({ eyebrow, title, copy, image }) {
  return h("section", { className: "page-hero" }, h("img", { src: image, alt: "", "aria-hidden": "true" }), h("div", { className: "container page-hero-content" }, h("span", { className: "eyebrow" }, eyebrow), h("h1", null, title), h("p", null, copy)));
}

function LoginPage() {
  setSeo({ title: "Admin Login | Abroadways", description: "Secure admin login for Abroadways CMS." });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setAdminToken(result.token);
      navigateTo("/dashboard");
    } catch {
      setError("Access denied. Check your admin email and password.");
    } finally {
      setLoading(false);
    }
  };

  return h(
    "section",
    { className: "login-page" },
    h(
      "form",
      { className: "login-card", onSubmit: submit },
      h(Link, { href: routes.home, className: "brand login-brand" }, h("span", { className: "brand-mark" }, "A"), h("span", null, "Abroadways CMS")),
      h("span", { className: "eyebrow" }, "Secure admin"),
      h("h1", null, "Login to dashboard"),
      h("p", null, "CMS access is restricted to authorized Abroadways admins."),
      error && h("div", { className: "auth-alert" }, error),
      h("label", null, "Admin email", h("input", { type: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true, autoComplete: "username" })),
      h("label", null, "Password", h("input", { type: "password", value: password, onChange: (event) => setPassword(event.target.value), required: true, autoComplete: "current-password" })),
      h("button", { className: "button button-primary", type: "submit", disabled: loading }, loading ? "Checking..." : "Login", h(ArrowRight, { size: 18 })),
    ),
  );
}

function AuthGate({ section }) {
  const [state, setState] = useState(getAdminToken() ? "checking" : "denied");
  React.useEffect(() => {
    if (!getAdminToken()) {
      setState("denied");
      return;
    }
    api("/auth/me")
      .then(() => setState("allowed"))
      .catch(() => {
        setAdminToken("");
        setState("expired");
      });
  }, []);

  if (state === "checking") {
    return h("section", { className: "login-page" }, h("div", { className: "login-card" }, h("span", { className: "eyebrow" }, "Checking access"), h("h1", null, "Loading dashboard")));
  }
  if (state === "denied" || state === "expired") {
    return h(
      "section",
      { className: "login-page" },
      h(
        "div",
        { className: "login-card" },
        h("span", { className: "eyebrow" }, state === "expired" ? "Login expired" : "Access denied"),
        h("h1", null, "Admin login required"),
        h("p", null, "Please login before accessing the Abroadways CMS dashboard."),
        h(ButtonLink, { href: routes.login }, "Go to Login"),
      ),
    );
  }
  return h(DashboardPage, { section });
}

function DashboardPage({ section = "overview" }) {
  setSeo({ title: "Abroadways CMS Dashboard", description: "Admin CMS dashboard for Abroadways V2 Pro." });
  return h("div", { className: "dashboard" }, h(DashboardSidebar), h("main", { className: "dashboard-main" }, section === "overview" && h(DashboardOverview), section === "pages" && h(CmsManager, { title: "Public Pages", collection: "pages" }), section === "countries" && h(CmsManager, { title: "Country Pages", collection: "countries" }), section === "blogs" && h(CmsManager, { title: "Blog Posts", collection: "blogs" }), section === "leads" && h(LeadManager), section === "media" && h(CmsManager, { title: "Media Library", collection: "media" }), section === "settings" && h(CmsManager, { title: "Site Settings", collection: "settings" })));
}

function DashboardSidebar() {
  return h(
    "aside",
    { className: "dashboard-sidebar" },
    h(Link, { href: routes.home, className: "brand dashboard-brand" }, h("span", { className: "brand-mark" }, "A"), h("span", null, "Abroadways CMS")),
    adminRoutes.map(([href, label, Icon]) => h(Link, { key: href, href, className: "dashboard-link" }, h(Icon, { size: 18 }), label)),
    h("button", { className: "dashboard-link dashboard-logout", type: "button", onClick: logoutAdmin }, h(LogOut, { size: 18 }), "Logout"),
  );
}

function DashboardOverview() {
  return h("section", null, h("span", { className: "eyebrow" }, "V2 Pro"), h("h1", null, "CMS Dashboard"), h("p", null, "Manage pages, countries, blogs, leads, media, and settings through REST APIs backed by MongoDB-ready storage."), h("div", { className: "dashboard-stats" }, ["Public pages", "Country pages", "Blog posts", "Leads"].map((item) => h("article", { key: item }, h("strong", null, item), h("span", null, "REST API ready")))));
}

function CmsManager({ title, collection }) {
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState({ title: "", slug: "", status: "published" });
  const [error, setError] = useState("");
  React.useEffect(() => {
    api(`/${collection}`).then((data) => setItems(data.items || data)).catch(() => setItems([]));
  }, [collection]);
  const save = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const saved = await api(`/${collection}`, { method: "POST", body: JSON.stringify(draft) });
      setItems((current) => [saved.item || saved, ...current]);
      setDraft({ title: "", slug: "", status: "published" });
    } catch {
      setError("Login expired or write access denied. Please login again.");
    }
  };
  return h("section", null, h("div", { className: "dashboard-title" }, h("div", null, h("span", { className: "eyebrow" }, "Admin CMS"), h("h1", null, title)), h(Search, { size: 24 })), error && h("div", { className: "auth-alert" }, error), h("form", { className: "cms-form", onSubmit: save }, h("input", { placeholder: "Title / name", value: draft.title || draft.name || "", onChange: (event) => setDraft((current) => ({ ...current, title: event.target.value, name: event.target.value, slug: slugify(event.target.value) })) }), h("input", { placeholder: "Slug or URL", value: draft.slug || draft.url || "", onChange: (event) => setDraft((current) => ({ ...current, slug: event.target.value, url: event.target.value })) }), h("select", { value: draft.status || "published", onChange: (event) => setDraft((current) => ({ ...current, status: event.target.value })) }, ["draft", "published", "archived"].map((item) => h("option", { key: item }, item))), h("button", { className: "button button-primary", type: "submit" }, h(Plus, { size: 18 }), "Create")), h("div", { className: "cms-table" }, items.map((item) => h("article", { key: item.id || item._id || item.slug || item.title }, h("strong", null, item.title || item.name || item.slug || item.url || "Untitled"), h("span", null, item.slug || item.url || item.status || "CMS item"), h("em", null, item.status || "published")))));
}

function LeadManager() {
  const [items, setItems] = useState([]);
  React.useEffect(() => {
    api("/leads").then((data) => setItems(data.items || data)).catch(() => setItems([]));
  }, []);
  return h("section", null, h("span", { className: "eyebrow" }, "Lead management"), h("h1", null, "Pathway and contact leads"), h("div", { className: "cms-table" }, items.map((lead) => h("article", { key: lead.id || lead._id }, h("strong", null, lead.name || "New lead"), h("span", null, `${lead.interestedCountry || "Country not set"} · ${lead.phone || "No phone"}`), h("em", null, lead.status || "new")))));
}

function slugify(value) {
  return String(value || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function NotFoundPage() {
  return h("section", { className: "section not-found" }, h("div", { className: "container" }, h("span", { className: "eyebrow" }, "404"), h("h1", null, "Page not found"), h("p", null, "This route is not part of Abroadways V2 Pro."), h(ButtonLink, { href: routes.home }, "Go Home")));
}

function Footer() {
  return h("footer", { className: "footer" }, h("div", { className: "container footer-grid" }, h("div", null, h("div", { className: "footer-brand" }, h("span", { className: "brand-mark" }, "A"), h("span", null, "Abroadways")), h("p", null, "Premium study abroad counselling for New Zealand, the United Kingdom, Australia, Canada, and Malaysia.")), h("div", null, h("h3", null, "Destinations"), destinations.map((destination) => h(Link, { key: destination.slug, href: `${routes.studyAbroad}/${destination.slug}` }, destination.name))), h("div", null, h("h3", null, "Explore"), h(Link, { href: routes.services }, "Services"), h(Link, { href: routes.planner }, "Pathway Planner"), h(Link, { href: routes.blog }, "Blog"), h(Link, { href: routes.about }, "About Us")), h("div", null, h("h3", null, "Contact"), h("p", null, contactInfo.address), contactInfo.phones.map((phone) => h("a", { key: phone, href: `tel:${phone}` }, phone)), h("a", { href: contactInfo.facebook, target: "_blank", rel: "noreferrer" }, "Facebook"), h("a", { href: contactInfo.instagram, target: "_blank", rel: "noreferrer" }, "Instagram"))), h("div", { className: "footer-bottom container" }, `© ${new Date().getFullYear()} Abroadways Limited. All rights reserved.`));
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  React.useEffect(() => {
    const syncPath = () => setPath(window.location.pathname);
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  const page = useMemo(() => {
    if (path === routes.login) return h(LoginPage);
    if (path.startsWith("/dashboard")) {
      const section = path.split("/")[2] || "overview";
      return h(AuthGate, { section });
    }
    if (path === routes.home) return h(HomePage);
    if (path === routes.studyAbroad) return h(StudyAbroadPage);
    if (path === routes.services) return h(ServicesPage);
    if (path === routes.planner) return h(PathwayPlannerPage);
    if (path === routes.blog) return h(BlogPage);
    if (path.startsWith(`${routes.blog}/`)) {
      const post = blogPosts.find((item) => path === `${routes.blog}/${item.slug}`);
      return post ? h(BlogDetailPage, { post }) : h(NotFoundPage);
    }
    if (path === routes.about) return h(AboutPage);
    if (path === routes.contact) return h(ContactPage);
    const country = destinations.find((destination) => path === `${routes.studyAbroad}/${destination.slug}` || path === `${routes.studyAbroad}/${destination.legacySlug}`);
    if (country) return h(CountryPage, { destination: country });
    return h(NotFoundPage);
  }, [path]);

  const isAdminSurface = path.startsWith("/dashboard") || path === routes.login;
  return h(React.Fragment, null, !isAdminSurface && h(Navbar), h("main", null, page), !isAdminSurface && h(Footer));
}

createRoot(document.getElementById("root")).render(h(App));
