import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Archive,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  Compass,
  Copy,
  Edit3,
  Eye,
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
  Save,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
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
  linkedin: "",
  youtube: "",
  whatsappNumber: "01898801960",
};

const destinations = [
  {
    name: "New Zealand",
    chip: "New Zealand",
    slug: "new-zealand",
    image: "/images/destination-new-zealand.png",
    galleryImages: ["/images/destination-new-zealand.png", "/images/abroadways-destination-planning.png"],
    heroHeading: "Study in New Zealand from Bangladesh",
    heroSubtitle: "A calm, practical study destination with supportive campuses and clear planning steps.",
    short: "Supportive campuses, practical pathways, and careful visa planning.",
    overview: "New Zealand suits students who want quality education, smaller learning environments, and a focused plan for course, budget, and visa documentation.",
    benefits: ["Supportive campus culture", "Practical study pathways", "Clear intake planning", "Strong student wellbeing focus"],
    studyAreas: ["Business", "Information Technology", "Health Sciences", "Hospitality", "Engineering"],
    intakes: "February and July are common intakes. Some institutions offer additional starts depending on programme availability.",
    costGuide: "Plan for tuition, living costs, insurance, accommodation, travel, and visa documentation funds. Abroadways helps families compare budgets before applying.",
    requirements: ["Academic transcripts and certificates", "English readiness evidence", "Statement of purpose", "Financial documents", "Valid passport"],
    visaNotes: "Abroadways helps organise a consistent visa-ready file, review document gaps, and prepare students for each required step.",
    seoTitle: "Study in New Zealand from Bangladesh | Abroadways",
    seoDescription: "New Zealand study planning for Bangladeshi students with counselling, university application support, visa guidance, and budget planning.",
    ogTitle: "Study in New Zealand from Bangladesh | Abroadways",
    ogDescription: "Plan your New Zealand study pathway with Abroadways Limited.",
    faqs: [
      ["Is New Zealand suitable after HSC?", "It can be, depending on academic profile, course level, budget, and institution requirements."],
      ["When should I start planning?", "Start at least six to nine months before your target intake so applications and documents stay on track."],
      ["Can Abroadways help compare courses?", "Yes, counselling starts with your profile, subject interest, budget, and preferred intake."],
    ],
  },
  {
    name: "United Kingdom",
    chip: "UK",
    slug: "united-kingdom",
    legacySlug: "uk",
    image: "/images/destination-uk.png",
    galleryImages: ["/images/destination-uk.png", "/images/consultation-counsellor.png"],
    heroHeading: "Study in the United Kingdom from Bangladesh",
    heroSubtitle: "Plan respected UK study options with focused applications and document guidance.",
    short: "Respected study options with focused application planning.",
    overview: "The United Kingdom offers broad course choice, recognised qualifications, and structured application timelines for students who plan early.",
    benefits: ["Wide course selection", "Recognised academic routes", "Multiple intake options", "Clear application milestones"],
    studyAreas: ["Business", "Computer Science", "Law", "Engineering", "Public Health"],
    intakes: "September is the main intake. January and selected spring intakes are also available at many institutions.",
    costGuide: "Plan for tuition, living expenses, health surcharge, visa fees, accommodation, and initial settlement costs.",
    requirements: ["Academic documents", "English evidence", "Personal statement", "University offer requirements", "Financial evidence"],
    visaNotes: "Abroadways supports document organisation, application follow-up, and visa-readiness checks before submission.",
    seoTitle: "Study in the United Kingdom from Bangladesh | Abroadways",
    seoDescription: "United Kingdom study planning for Bangladeshi students with counselling, applications, visa guidance, and budget planning.",
    ogTitle: "Study in the United Kingdom from Bangladesh | Abroadways",
    ogDescription: "Plan your UK study pathway with Abroadways Limited.",
    faqs: [
      ["Which UK intake offers the most options?", "September usually offers the widest choice, while January works well for many students with later preparation timelines."],
      ["Can Abroadways help with university shortlisting?", "Yes, we shortlist options based on profile, budget, course goals, and intake."],
      ["Do I need a personal statement?", "Many UK applications require a strong personal statement or study-focused supporting text."],
    ],
  },
  {
    name: "Australia",
    chip: "Australia",
    slug: "australia",
    image: "/images/destination-australia.png",
    galleryImages: ["/images/destination-australia.png", "/images/abroadways-hero-campus.png"],
    heroHeading: "Study in Australia from Bangladesh",
    heroSubtitle: "Modern campuses, strong course options, and profile-led application planning.",
    short: "Modern campuses with profile-led course planning.",
    overview: "Australia is a strong choice for students seeking modern learning environments, diverse programmes, and clear course planning.",
    benefits: ["Modern learning environment", "Diverse programme options", "Profile-led course selection", "Clear document planning"],
    studyAreas: ["Business", "Information Technology", "Engineering", "Nursing", "Accounting"],
    intakes: "February and July are common intakes. Some institutions also offer trimester or rolling options.",
    costGuide: "Plan tuition, living costs, health cover, travel, accommodation, and visa documentation funds before committing.",
    requirements: ["Academic transcripts", "English readiness", "Genuine study plan", "Financial documents", "Valid passport"],
    visaNotes: "Abroadways helps students prepare documents, review consistency, and plan the visa preparation timeline.",
    seoTitle: "Study in Australia from Bangladesh | Abroadways",
    seoDescription: "Australia study planning for Bangladeshi students with counselling, applications, visa guidance, and budget planning.",
    ogTitle: "Study in Australia from Bangladesh | Abroadways",
    ogDescription: "Plan your Australia study pathway with Abroadways Limited.",
    faqs: [
      ["Do I need a clear study plan for Australia?", "Yes, your course choice should connect with your academic background and future goals."],
      ["Can I compare budgets?", "Yes, budget guidance is part of the counselling process."],
      ["When should I begin?", "Begin early enough to compare courses, prepare funds, and complete documents before intake deadlines."],
    ],
  },
  {
    name: "Canada",
    chip: "Canada",
    slug: "canada",
    image: "/images/destination-canada.png",
    galleryImages: ["/images/destination-canada.png", "/images/consultation-counsellor.png"],
    heroHeading: "Study in Canada from Bangladesh",
    heroSubtitle: "Structured planning for competitive programmes, budgets, and study documentation.",
    short: "Structured planning for competitive study applications.",
    overview: "Canada requires careful planning around programme fit, budget, documentation, and application timing.",
    benefits: ["Competitive study options", "Profile-based planning", "Clear document strategy", "Practical budget review"],
    studyAreas: ["Business", "Computer Science", "Health", "Engineering", "Applied Sciences"],
    intakes: "Fall is the major intake. Winter and selected spring/summer intakes vary by institution and programme.",
    costGuide: "Plan tuition, living costs, proof of funds, travel, accommodation, and settlement expenses with a realistic family budget.",
    requirements: ["Academic records", "English readiness", "Study plan", "Financial evidence", "Valid passport"],
    visaNotes: "We help students organise documents, understand study plan consistency, and prepare for a complete file.",
    seoTitle: "Study in Canada from Bangladesh | Abroadways",
    seoDescription: "Canada study planning for Bangladeshi students with counselling, applications, visa guidance, and budget planning.",
    ogTitle: "Study in Canada from Bangladesh | Abroadways",
    ogDescription: "Plan your Canada study pathway with Abroadways Limited.",
    faqs: [
      ["Is Canada competitive?", "Yes, strong planning and document consistency matter."],
      ["Does Abroadways support scholarship guidance?", "Yes, we help identify realistic budget and scholarship possibilities."],
      ["Can I apply without a final shortlist?", "You should shortlist carefully first so your applications match your profile and budget."],
    ],
  },
  {
    name: "Malaysia",
    chip: "Malaysia",
    slug: "malaysia",
    image: "/images/destination-malaysia.png",
    galleryImages: ["/images/destination-malaysia.png", "/images/abroadways-destination-planning.png"],
    heroHeading: "Study in Malaysia from Bangladesh",
    heroSubtitle: "Accessible international study options with practical application and visa guidance.",
    short: "Accessible international education options with clear guidance.",
    overview: "Malaysia offers accessible study options for students seeking international education close to home with flexible planning routes.",
    benefits: ["Accessible destination", "Practical budgets", "Flexible intake options", "Efficient planning timelines"],
    studyAreas: ["Business", "Information Technology", "Hospitality", "Engineering", "Health Sciences"],
    intakes: "Many institutions offer multiple intakes throughout the year, depending on course and seat availability.",
    costGuide: "Plan tuition, living expenses, accommodation, medical insurance, travel, and documentation costs.",
    requirements: ["Academic documents", "Passport", "Application forms", "Financial planning", "Health documentation"],
    visaNotes: "Abroadways guides students through application documents and visa preparation steps for Malaysia.",
    seoTitle: "Study in Malaysia from Bangladesh | Abroadways",
    seoDescription: "Malaysia study planning for Bangladeshi students with counselling, applications, visa guidance, and budget planning.",
    ogTitle: "Study in Malaysia from Bangladesh | Abroadways",
    ogDescription: "Plan your Malaysia study pathway with Abroadways Limited.",
    faqs: [
      ["Is Malaysia budget-friendly?", "It can be accessible compared with many destinations, depending on programme and lifestyle."],
      ["Can I apply quickly?", "Many Malaysian pathways move faster, but documents still need careful preparation."],
      ["Does Abroadways help with course selection?", "Yes, we compare course, cost, intake, and document requirements before application."],
    ],
  },
];

const services = [
  ["Country & course selection", "Shortlist destinations and courses that fit your profile, budget, goals, and intake timeline.", Compass],
  ["University application support", "Prepare applications with careful document checks, deadline tracking, and follow-up guidance.", Landmark],
  ["Scholarship & budget guidance", "Understand tuition, living costs, scholarship possibilities, and realistic family budgeting.", Sparkles],
  ["Visa documentation support", "Organise a consistent, complete, and visa-ready file with practical document guidance.", FileCheck2],
  ["Pre-departure guidance", "Prepare for travel, arrival, accommodation, and the first weeks in your new study destination.", Plane],
];

const process = [
  ["Profile Review", "We review your academics, English readiness, budget, goals, and preferred destinations."],
  ["Country Strategy", "You receive a focused country, course, intake, and budget plan."],
  ["Application Support", "We support applications, statements, documents, and university follow-ups."],
  ["Visa Preparation", "We help organise a consistent, complete, and visa-ready file."],
  ["Pre-Departure", "You prepare for travel, arrival, accommodation, and early settlement."],
];

const blogPosts = [
  {
    title: "Study in New Zealand from Bangladesh",
    slug: "study-in-new-zealand-from-bangladesh",
    language: "en",
    excerpt: "A focused planning guide for Bangladeshi students considering New Zealand for higher study.",
    category: "New Zealand",
    tags: ["New Zealand", "study abroad", "Bangladesh"],
    image: "/images/destination-new-zealand.png",
    publishedAt: "2026-07-01",
    seoTitle: "Study in New Zealand from Bangladesh | Abroadways",
    metaDescription: "Plan study in New Zealand from Bangladesh with guidance on courses, intakes, budget, requirements, and visa documentation.",
    content: [
      "New Zealand can be a strong fit for students who want supportive campuses, practical learning, and a calmer study environment.",
      "Start by reviewing your academic profile, preferred subject, budget, and intake timeline. Common intakes include February and July, but options vary by institution and programme.",
      "Before applying, prepare academic documents, passport, English readiness evidence, financial documents, and a clear study plan. Abroadways helps students compare courses, organise documents, and understand visa preparation steps.",
    ],
  },
  {
    title: "Study in UK from Bangladesh",
    slug: "study-in-uk-from-bangladesh",
    language: "en",
    excerpt: "What Bangladeshi students should know before shortlisting UK courses and preparing applications.",
    category: "United Kingdom",
    tags: ["UK", "study abroad", "Bangladesh"],
    image: "/images/destination-uk.png",
    publishedAt: "2026-06-28",
    seoTitle: "Study in UK from Bangladesh | Abroadways",
    metaDescription: "Plan study in the UK from Bangladesh with guidance on intakes, applications, budget, documents, and visa preparation.",
    content: [
      "The United Kingdom offers broad course choice, recognised qualifications, and clear application timelines for students who plan early.",
      "September is usually the main intake, while January and selected spring intakes may also be available. Students should compare course fit, entry requirements, tuition, living costs, and document readiness before applying.",
      "A strong UK application often depends on academic documents, English evidence, a focused personal statement, and timely follow-up. Abroadways supports shortlisting, application preparation, and visa-readiness planning.",
    ],
  },
  {
    title: "Study in Australia from Bangladesh",
    slug: "study-in-australia-from-bangladesh",
    language: "en",
    excerpt: "A practical guide to Australian study options, intakes, budget planning, and document preparation.",
    category: "Australia",
    tags: ["Australia", "study abroad", "Bangladesh"],
    image: "/images/destination-australia.png",
    publishedAt: "2026-06-24",
    seoTitle: "Study in Australia from Bangladesh | Abroadways",
    metaDescription: "Plan study in Australia from Bangladesh with guidance on courses, intakes, costs, requirements, and visa documentation.",
    content: [
      "Australia is popular among students who want modern campuses, diverse programmes, and a clear study plan.",
      "Common intakes are February and July, though some institutions offer trimester or rolling options. Course choice should match academic background, future goals, budget, and document readiness.",
      "Students should prepare academic transcripts, English readiness evidence, financial documents, passport, and a genuine study plan. Abroadways helps review options and organise each step before application and visa preparation.",
    ],
  },
  {
    title: "Study in Canada from Bangladesh",
    slug: "study-in-canada-from-bangladesh",
    language: "en",
    excerpt: "Understand programme fit, budget readiness, documents, and planning steps for Canada.",
    category: "Canada",
    tags: ["Canada", "study abroad", "Bangladesh"],
    image: "/images/destination-canada.png",
    publishedAt: "2026-06-20",
    seoTitle: "Study in Canada from Bangladesh | Abroadways",
    metaDescription: "Plan study in Canada from Bangladesh with guidance on programmes, budget, intakes, requirements, and visa preparation.",
    content: [
      "Canada requires careful planning because programme fit, budget readiness, and document consistency all matter.",
      "Fall is the major intake, while winter and selected spring or summer options vary by institution. Students should begin with a realistic shortlist and a clear budget plan.",
      "Prepare academic records, English readiness evidence, financial documents, passport, and a study plan that matches your background and goals. Abroadways helps students organise documents and prepare for a complete study application journey.",
    ],
  },
  {
    title: "Study in Malaysia from Bangladesh",
    slug: "study-in-malaysia-from-bangladesh",
    language: "en",
    excerpt: "A short guide to Malaysia study options, flexible intakes, budget planning, and visa steps.",
    category: "Malaysia",
    tags: ["Malaysia", "study abroad", "Bangladesh"],
    image: "/images/destination-malaysia.png",
    publishedAt: "2026-06-16",
    seoTitle: "Study in Malaysia from Bangladesh | Abroadways",
    metaDescription: "Plan study in Malaysia from Bangladesh with guidance on courses, intakes, costs, requirements, and visa preparation.",
    content: [
      "Malaysia can be an accessible international study destination for Bangladeshi students who want practical budgets and flexible planning.",
      "Many institutions offer multiple intakes, depending on programme availability. Students should compare course quality, tuition, living costs, accommodation, and documentation requirements.",
      "Before applying, prepare academic documents, passport, application forms, financial planning, and health documentation where required. Abroadways guides students through application and visa preparation steps.",
    ],
  },
];

const softColors = ["#eef7ff", "#fff3e8", "#eefaf4", "#f3efff", "#fff9db", "#eaf9ff", "#fff0f6", "#f2fce9"];
const brandStyleDefaults = {
  navbarLogoWidth: 160,
  navbarLogoHeight: "auto",
  navbarTaglineEnabled: true,
  navbarTaglinePosition: "below-logo",
  navbarTaglineOffsetX: 0,
  navbarTaglineOffsetY: -8,
  navbarTaglineColor: "#0057D9",
  navbarTaglineFontSize: 12,
  navbarTaglineFontWeight: 600,
  navbarTaglineStyle: "italic",
  navbarBrandAlign: "left",
  footerLogoWidth: 170,
  footerLogoHeight: "auto",
  footerTaglineEnabled: true,
  footerTaglinePosition: "below-logo",
  footerTaglineOffsetX: 0,
  footerTaglineOffsetY: -6,
  footerTaglineColor: "#0057D9",
  footerTaglineFontSize: 13,
  footerTaglineFontWeight: 600,
  footerTaglineStyle: "italic",
  footerBrandAlign: "left",
};

const defaultSupportChips = [
  "Free Counselling",
  "University Admission",
  "Scholarship Assistance",
  "Visa Processing",
  "Documentation",
  "Profile Evaluation",
  "Interview Preparation",
  "Accommodation Guidance",
  "Pre-departure Support",
];

const defaultInsightCountries = [
  { title: "UK", link: "/study-abroad/united-kingdom", backgroundColor: "#fff3e8" },
  { title: "Canada", link: "/study-abroad/canada", backgroundColor: "#eef7ff" },
  { title: "Australia", link: "/study-abroad/australia", backgroundColor: "#eefaf4" },
  { title: "New Zealand", link: "/study-abroad/new-zealand", backgroundColor: "#f3efff" },
  { title: "Malaysia", link: "/study-abroad/malaysia", backgroundColor: "#fff9db" },
];

const defaultResourceTiles = [
  { title: "University Map", description: "Explore focused destination options.", ctaText: "Explore", link: "/study-abroad", backgroundColor: "#dff2ff", icon: "map" },
  { title: "Free Guides", description: "Read country planning notes.", ctaText: "Read", link: "/blog", backgroundColor: "#fff3e8", icon: "book" },
  { title: "Prospectus", description: "Ask for course and budget guidance.", ctaText: "Request", link: "/contact", backgroundColor: "#efe2ff", icon: "file" },
  { title: "Success Stories", description: "See student journey examples.", ctaText: "View", link: "/about-us", backgroundColor: "#dafbdd", icon: "trophy" },
  { title: "Blog", description: "Latest study abroad articles.", ctaText: "Open", link: "/blog", backgroundColor: "#fff9bf", icon: "news" },
];

const homeSectionTypeOptions = ["hero", "pathwayCards", "featureCards", "successStories", "serviceChips", "insightsSection", "consultationForm", "blogPreview", "resourceTiles", "consultationCta", "trustSection"];

const legacyHomeSectionKeys = {
  "study-pathway": "pathwayCards",
  "feature-cards": "featureCards",
  "success-stories": "successStories",
  "service-bubbles": "serviceChips",
  "blog-preview": "blogPreview",
  "consultation-cta": "consultationCta",
  "trust-section": "trustSection",
  "insights-section": "insightsSection",
  "consultation-form": "consultationForm",
  "resource-tiles": "resourceTiles",
};

const modernHomeSectionKeys = {
  hero: "hero",
  pathwayCards: "study-pathway",
  featureCards: "feature-cards",
  successStories: "success-stories",
  serviceChips: "service-bubbles",
  blogPreview: "blog-preview",
  consultationCta: "consultation-cta",
  trustSection: "trust-section",
  insightsSection: "insights-section",
  consultationForm: "consultation-form",
  resourceTiles: "resource-tiles",
};

const defaultFeatureCards = [
  {
    eyebrow: "Bangladeshi Students",
    title: "Choose the Right Study Destination",
    description: "Compare countries, budgets, intakes, and course fit before committing.",
    text: "Compare your best-fit countries, match budget and profile, plan documents with expert guidance.",
    bullets: ["Compare your best-fit countries", "Match budget, course, and intake", "Plan documents with expert guidance"],
    imageUrl: "/images/abroadways-destination-planning.png",
    ctaText: "Explore destinations",
    ctaLink: routes.studyAbroad,
    backgroundColor: "#fff3e8",
  },
  {
    eyebrow: "Step-by-step support",
    title: "How Abroadways Guides You",
    description: "Move through applications, documents, and visa preparation with a structured plan.",
    text: "Profile review and strategy, application checklist and submission, visa file preparation.",
    bullets: ["Profile review and strategy", "Application checklist and submission", "Visa file preparation"],
    imageUrl: "/images/consultation-counsellor.png",
    ctaText: "View services",
    ctaLink: routes.services,
    backgroundColor: "#dff2ff",
  },
];

const defaultStories = [
  {
    studentName: "Student journey",
    destination: "Canada",
    qualification: "Application support",
    text: "Counselling helped the student organise country, course, and document priorities.",
    imageUrl: "/images/destination-canada.png",
  },
  {
    studentName: "Counselling experience",
    destination: "Australia",
    qualification: "Profile review",
    text: "A focused checklist made application planning easier for the student and family.",
    imageUrl: "/images/destination-australia.png",
  },
  {
    studentName: "Visa preparation",
    destination: "United Kingdom",
    qualification: "Document guidance",
    text: "The student prepared a consistent file with Abroadways guidance.",
    imageUrl: "/images/destination-uk.png",
  },
];

const adminRoutes = [
  ["/dashboard", "Overview", LayoutDashboard],
  ["/dashboard/homepage", "Homepage", Edit3],
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

function setSeo({ title, description, image = "/images/abroadways-hero-campus.png", ogTitle, ogDescription }) {
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
    }).content = ogTitle || title;
    ensure('meta[property="og:description"]', () => {
      const node = document.createElement("meta");
      node.setAttribute("property", "og:description");
      return node;
    }).content = ogDescription || description;
    ensure('meta[property="og:image"]', () => {
      const node = document.createElement("meta");
      node.setAttribute("property", "og:image");
      return node;
    }).content = image;
  }, [title, description, image, ogTitle, ogDescription]);
}

function apiBaseUrl() {
  return String(window.ABROADWAYS_API_BASE || localStorage.getItem("ABROADWAYS_API_BASE") || "").trim().replace(/\/+$/, "");
}

function apiEndpoint(path) {
  const endpoint = `${apiBaseUrl()}/api${path}`;
  return new URL(endpoint, window.location.origin).href;
}

async function api(path, options = {}) {
  const token = getAdminToken();
  const endpoint = apiEndpoint(path);
  const response = await fetch(endpoint, {
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

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("Could not read image."));
    reader.readAsDataURL(file);
  });
}

async function uploadMediaFile(file, details = {}) {
  if (!file) throw new Error("Choose an image to upload.");
  if (!String(file.type || "").startsWith("image/")) throw new Error("Only image files are supported.");
  const dataUrl = await fileToDataUrl(file);
  const result = await api("/media/upload", {
    method: "POST",
    body: JSON.stringify({
      dataUrl,
      fileName: file.name,
      mimeType: file.type,
      title: details.title || file.name,
      altText: details.altText || details.title || file.name,
      folder: details.folder || "abroadways/media",
    }),
  });
  return result.item;
}

async function publicApi(path) {
  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(apiEndpoint(`${path}${separator}_=${Date.now()}`), {
    cache: "no-store",
    headers: { "Cache-Control": "no-store" },
  });
  if (!response.ok) throw new Error(`Public API error: ${response.status}`);
  return response.json();
}

function useCmsData(path) {
  const [cms, setCms] = useState({ pages: [], countries: [], blogs: [], settings: [], loaded: false });
  React.useEffect(() => {
    let active = true;
    Promise.all([
      publicApi("/pages").catch(() => ({ items: [] })),
      publicApi("/countries").catch(() => ({ items: [] })),
      publicApi("/blogs").catch(() => ({ items: [] })),
      publicApi("/settings").catch(() => ({ items: [] })),
    ]).then(([pages, countries, blogs, settings]) => {
      if (!active) return;
      setCms({
        pages: pages.items || [],
        countries: countries.items || [],
        blogs: blogs.items || [],
        settings: settings.items || [],
        loaded: true,
      });
    });
    return () => {
      active = false;
    };
  }, [path]);
  return cms;
}

function published(items = []) {
  return items.filter((item) => !item.status || item.status === "published");
}

const statusOptions = ["draft", "published", "archived"];
const leadStatusOptions = ["new", "contacted", "qualified", "closed", "lost"];
const allowedCountrySlugs = destinations.map((item) => item.slug);
const allowedCountryNames = destinations.map((item) => item.name);

function itemId(item) {
  return item?.id || item?._id;
}

function mediaUrl(item = {}) {
  return item.url || item.secureUrl || item.imageUrl || "";
}

function cssSize(value, fallback = "auto") {
  if (value === undefined || value === null || value === "") return fallback;
  if (String(value).trim() === "auto") return "auto";
  return Number.isFinite(Number(value)) ? `${Number(value)}px` : String(value);
}

function boolValue(value, fallback = true) {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "boolean") return value;
  return String(value) === "true";
}

function offsetValue(value, fallback = 0) {
  return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

function formatDate(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function lines(value) {
  if (Array.isArray(value)) return value.join("\n");
  return value || "";
}

function lineList(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  return String(value || "").split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
}

function faqText(value) {
  if (!Array.isArray(value)) return "";
  return value.map((item) => {
    const pair = Array.isArray(item) ? item : [item.question, item.answer];
    return `${pair[0] || ""} | ${pair[1] || ""}`.trim();
  }).join("\n");
}

function parseFaqText(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, ...answerParts] = line.split("|");
      return [question.trim(), answerParts.join("|").trim()];
    })
    .filter(([question, answer]) => question && answer);
}

function jsonText(value) {
  if (!value) return "";
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return "";
  }
}

function parseJsonText(value, fallback = []) {
  if (!String(value || "").trim()) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function previewPathFor(collection, item) {
  if (collection === "pages") return item.routeKey === "home" || item.slug === "/" ? "/" : item.slug?.startsWith("/") ? item.slug : `/${item.slug || item.routeKey || ""}`;
  if (collection === "countries") return `${routes.studyAbroad}/${item.slug}`;
  if (collection === "blogs") return `${routes.blog}/${item.slug}`;
  return "/";
}

function firstImage(record, fallback) {
  return record?.heroImage || record?.featuredImage || record?.imageUrl || record?.image || record?.ogImage || record?.url || record?.imageUrls?.[0] || fallback;
}

function splitList(value, fallback = []) {
  if (Array.isArray(value)) return value.length ? value : fallback;
  if (typeof value === "string" && value.trim()) {
    return value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
  }
  return fallback;
}

function splitContent(value, fallback = []) {
  if (Array.isArray(value)) return value.length ? value : fallback;
  if (typeof value === "string" && value.trim()) {
    return value.split(/\n{2,}|\r?\n/).map((item) => item.trim()).filter(Boolean);
  }
  return fallback;
}

function normalizeFaqs(value, fallback = []) {
  if (Array.isArray(value) && value.length) {
    return value.map((item) => Array.isArray(item) ? item : [item.question || "Question", item.answer || "Answer"]);
  }
  return fallback;
}

function findPage(cms, routeKey, slug) {
  return published(cms.pages).find((page) => page.routeKey === routeKey || page.slug === slug || page.slug === routeKey);
}

function pageCopy(page, fallback) {
  return {
    ...fallback,
    eyebrow: page?.eyebrow || fallback.eyebrow,
    title: page?.heroHeading || page?.heading || page?.title || fallback.title,
    copy: page?.heroSubtitle || page?.subtitle || page?.excerpt || fallback.copy,
    image: firstImage(page, fallback.image),
    ctaTitle: page?.ctaTitle || fallback.ctaTitle,
    ctaText: page?.ctaText || fallback.ctaText,
    ctaButtonText: page?.heroButtonText || page?.ctaButtonText || page?.ctaText || fallback.ctaButtonText,
    ctaButtonLink: page?.heroButtonLink || page?.ctaButtonLink || page?.ctaLink || fallback.ctaButtonLink,
    secondaryButtonText: page?.heroSecondaryButtonText || fallback.secondaryButtonText,
    secondaryButtonLink: page?.heroSecondaryButtonLink || fallback.secondaryButtonLink,
    badgeText: page?.heroBadgeText || fallback.badgeText,
    bodySections: page?.bodySections || fallback.bodySections || [],
    seoTitle: page?.seoTitle || fallback.seoTitle || fallback.title,
    seoDescription: page?.seoDescription || page?.metaDescription || fallback.seoDescription || fallback.copy,
    ogTitle: page?.ogTitle || fallback.ogTitle || page?.seoTitle || fallback.seoTitle || fallback.title,
    ogDescription: page?.ogDescription || fallback.ogDescription || page?.seoDescription || page?.metaDescription || fallback.seoDescription || fallback.copy,
    ogImage: page?.ogImage || fallback.ogImage,
  };
}

function sectionFor(page, key, fallback = {}) {
  const sections = Array.isArray(page?.bodySections) ? page.bodySections : [];
  return { ...fallback, ...(sections.find((section) => section?.key === key) || {}) };
}

function sectionCards(section, fallback = []) {
  return Array.isArray(section?.cards) && section.cards.length ? section.cards : fallback;
}

function sectionItems(section, key, fallback = []) {
  return Array.isArray(section?.[key]) && section[key].length ? section[key] : fallback;
}

function homeSectionType(section = {}) {
  return section.type || legacyHomeSectionKeys[section.key] || section.key || "hero";
}

function legacyHomeKey(type) {
  return modernHomeSectionKeys[type] || type;
}

function homeSectionTitle(section = {}) {
  return section.heading || section.title || section.eyebrow || homeSectionType(section);
}

function normalizeHomeSection(section = {}, index = 0) {
  const type = homeSectionType(section);
  const normalized = {
    id: section.id || `${type}-${Date.now()}-${index}`,
    ...section,
    type,
    key: legacyHomeKey(type),
    enabled: section.enabled !== false,
    order: Number.isFinite(Number(section.order)) ? Number(section.order) : index + 1,
  };
  if (type === "hero") {
    normalized.heading = section.heading || section.heroHeading || section.title || "Your Study Abroad Journey Starts Here";
    normalized.subtitle = section.subtitle || section.heroSubtitle || section.copy || "";
    normalized.primaryButtonText = section.primaryButtonText || section.heroButtonText || section.ctaText || "Book Free Consultation";
    normalized.primaryButtonLink = section.primaryButtonLink || section.heroButtonLink || section.ctaLink || routes.planner;
    normalized.secondaryButtonText = section.secondaryButtonText || section.heroSecondaryButtonText || "Explore Destinations";
    normalized.secondaryButtonLink = section.secondaryButtonLink || section.heroSecondaryButtonLink || routes.studyAbroad;
    normalized.imageUrl = section.imageUrl || section.heroImageUrl || "";
    normalized.countryChips = splitList(section.countryChips || section.chips, destinations.map((item) => item.chip));
  }
  if (type === "pathwayCards") {
    normalized.title = section.heading || section.title || "Find Your Study Pathway";
    normalized.cards = Array.isArray(section.cards) ? section.cards : [];
  }
  if (type === "featureCards") {
    normalized.title = section.heading || section.title || "Plan with clarity";
    normalized.cards = Array.isArray(section.cards) ? section.cards : [];
  }
  if (type === "successStories") {
    normalized.title = section.heading || section.title || "Student Journey Stories";
    normalized.tabs = Array.isArray(section.tabs) ? section.tabs : ["All", "Canada", "Australia", "UK", "New Zealand", "Malaysia"];
    normalized.stories = Array.isArray(section.stories) ? section.stories : [];
  }
  if (type === "serviceChips") {
    normalized.title = section.heading || section.title || "Support at every step";
    normalized.chips = Array.isArray(section.chips) ? section.chips : [];
  }
  if (type === "blogPreview") {
    normalized.title = section.heading || section.title || "Study Abroad Guides";
    normalized.numberOfPosts = section.numberOfPosts || 3;
  }
  if (type === "insightsSection") {
    normalized.heading = section.heading || section.title || "Abroadways Study Abroad Insights";
    normalized.ctaText = section.ctaText || "Read Guides";
    normalized.ctaLink = section.ctaLink || routes.blog;
    normalized.items = Array.isArray(section.items) ? section.items : [];
  }
  if (type === "consultationForm") {
    normalized.heading = section.heading || section.title || "Claim Your Free Consultation";
    normalized.formHeading = section.formHeading || "Start with your study interest";
    normalized.items = Array.isArray(section.items) ? section.items : [];
  }
  if (type === "resourceTiles") {
    normalized.heading = section.heading || section.title || "Resources for your next step";
    normalized.items = Array.isArray(section.items) ? section.items : [];
  }
  if (type === "consultationCta") {
    normalized.heading = section.heading || section.title || "Claim your free Abroadways consultation";
    normalized.ctaText = section.primaryButtonText || section.ctaText || "Book Free Consultation";
    normalized.ctaLink = section.primaryButtonLink || section.ctaLink || routes.planner;
  }
  if (type === "trustSection") {
    normalized.heading = section.heading || section.title || "Built around clarity, care, and responsible guidance";
    normalized.trustItems = Array.isArray(section.trustItems) ? section.trustItems : [];
  }
  return normalized;
}

function normalizeHomeSections(sections = []) {
  const source = Array.isArray(sections) && sections.length ? sections : defaultHomeSections();
  return source.map(normalizeHomeSection).sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
}

function homeSectionPage(page, section) {
  return { ...page, bodySections: [section] };
}

function pathwayFallback(destinationItems = destinations) {
  const destinationCards = destinationItems.map((destination, index) => ({
    title: destination.name,
    icon: destination.chip || destination.name.slice(0, 2),
    backgroundColor: softColors[index % softColors.length],
    link: `${routes.studyAbroad}/${destination.slug}`,
  }));
  return [
    ...destinationCards,
    { title: "University Application", icon: "UA", backgroundColor: "#eaf9ff", link: routes.services },
    { title: "Visa Guidance", icon: "VG", backgroundColor: "#fff0f6", link: routes.services },
    { title: "Scholarship Planning", icon: "SP", backgroundColor: "#f2fce9", link: routes.services },
  ];
}

function defaultHomeSections() {
  return [
    {
      key: "hero",
      type: "hero",
      heading: "Plan Your Study Abroad Journey with Abroadways",
      subtitle: "Focused counselling, applications, and visa guidance for Bangladeshi students planning New Zealand, UK, Australia, Canada, and Malaysia.",
      secondaryText: "Start with the right country, course, documents, and timeline.",
      imageUrl: "/images/consultation-counsellor.png",
      backgroundImageUrl: "/images/abroadways-hero-campus.png",
      badgeText: "Focused guidance for five study destinations",
      countryChips: ["New Zealand", "UK", "Australia", "Canada", "Malaysia"],
      decorativeImageUrls: ["/images/abroadways-destination-planning.png"],
    },
    { key: "study-pathway", type: "pathwayCards", title: "Find Your Study Pathway", subtitle: "Explore destinations and key support areas before you apply.", cards: pathwayFallback() },
    { key: "feature-cards", type: "featureCards", title: "Plan with clarity", subtitle: "Focused guidance from first shortlist to final departure.", cards: defaultFeatureCards },
    { key: "success-stories", type: "successStories", title: "Our Student Journeys", subtitle: "Safe, realistic examples of how guided planning can make the process clearer.", tabs: ["All", "Canada", "Australia", "UK", "New Zealand", "Malaysia"], stories: defaultStories },
    { key: "service-bubbles", type: "serviceChips", title: "Support around every step", subtitle: "Small details matter when families are planning a major decision.", chips: defaultSupportChips },
    { key: "insights-section", type: "insightsSection", heading: "Abroadways Study Abroad Insights", subtitle: "Guides, counselling notes, country updates, visa preparation tips, and budget planning for students and families.", imageUrl: "/images/abroadways-destination-planning.png", ctaText: "Read Guides", ctaLink: routes.blog, items: defaultInsightCountries },
    { key: "consultation-form", type: "consultationForm", heading: "Claim Your Free Consultation", subtitle: "Share your study interest and destination plan. Abroadways will review the details and contact you.", imageUrl: "/images/consultation-counsellor.png", formHeading: "Submit Consultation Request" },
    { key: "blog-preview", type: "blogPreview", title: "Study Abroad Guides", subtitle: "Read practical destination guides written for Bangladeshi students and families.", numberOfPosts: 3, languageTabsEnabled: true, ctaText: "View all guides", ctaLink: routes.blog },
    { key: "resource-tiles", type: "resourceTiles", heading: "Helpful resources for your next step", subtitle: "Quick links for destinations, guides, consultation, and planning.", items: defaultResourceTiles },
    { key: "trust-section", type: "trustSection", heading: "Guidance built on clarity and care", subtitle: "Abroadways keeps the process focused, transparent, and student-first.", trustItems: [{ title: "Abroadways Limited", description: "A focused study abroad agency in Dhaka." }, { title: "Student-first counselling", description: "Plans are shaped around profile, budget, and goals." }, { title: "UKVI Approved LanguageCert Test Centre", description: "A small trust signal, not the main service." }, { title: "Transparent process", description: "Clear steps from counselling to pre-departure." }] },
  ];
}
function mergeDestinations(cmsCountries = []) {
  const records = published(cmsCountries);
  return destinations.map((fallback) => {
    const record = records.find((item) => {
      const values = [item.slug, item.legacySlug, item.countryName, item.name, item.title].filter(Boolean).map((value) => String(value).toLowerCase());
      return values.includes(fallback.slug.toLowerCase()) || values.includes(fallback.legacySlug?.toLowerCase()) || values.includes(fallback.name.toLowerCase());
    });
    if (!record) return fallback;
    return {
      ...fallback,
      name: record.countryName || record.name || record.title || fallback.name,
      chip: record.chip || fallback.chip,
      image: firstImage(record, fallback.image),
      heroHeading: record.heroHeading || `Study in ${record.countryName || record.name || record.title || fallback.name}`,
      heroSubtitle: record.heroSubtitle || record.short || record.overview || fallback.short,
      short: record.short || record.heroSubtitle || record.overview || fallback.short,
      overview: record.overview || record.body || fallback.overview,
      benefits: splitList(record.benefits, fallback.benefits),
      studyAreas: splitList(record.studyAreas, fallback.studyAreas),
      intakes: record.intakes || fallback.intakes,
      costGuide: record.costGuide || fallback.costGuide,
      requirements: splitList(record.requirements, fallback.requirements),
      visaNotes: record.visaNotes || fallback.visaNotes,
      faqs: normalizeFaqs(record.faqs, fallback.faqs),
      galleryImages: splitList(record.galleryImages || record.imageGallery, []),
      ctaText: record.ctaText || "Start Pathway Planner",
      ctaLink: record.ctaLink || routes.planner,
      seoTitle: record.seoTitle,
      seoDescription: record.seoDescription,
      ogTitle: record.ogTitle,
      ogDescription: record.ogDescription,
      ogImage: record.ogImage,
    };
  });
}

function mergeBlogs(cmsBlogs = []) {
  const records = published(cmsBlogs);
  if (!records.length) return blogPosts;
  return records.map((record) => ({
    title: record.title || record.name || "Study abroad guide",
    slug: record.slug || slugify(record.title || record.name || "study-abroad-guide"),
    language: record.language || "en",
    excerpt: record.excerpt || record.metaDescription || "A practical Abroadways study abroad guide for students and families.",
    category: record.category || "Guide",
    tags: splitList(record.tags, []),
    image: firstImage(record, "/images/abroadways-destination-planning.png"),
    publishedAt: record.publishedAt || record.createdAt || "",
    content: splitContent(record.content || record.body, [record.excerpt || "This guide will be updated by the Abroadways team."]),
    seoTitle: record.seoTitle,
    metaDescription: record.metaDescription,
    canonicalUrl: record.canonicalUrl,
  }));
}

function mergeSettings(cmsSettings = []) {
  const settings = published(cmsSettings)[0] || cmsSettings[0] || {};
  const contact = settings.contactInfo || {};
  const social = settings.socialLinks || {};
  return {
    ...contactInfo,
    ...contact,
    siteName: settings.siteName || "Abroadways",
    navbarLogoUrl: settings.navbarLogoUrl || settings.siteLogoUrl || "",
    navbarLogoAlt: settings.navbarLogoAlt || `${settings.siteName || "Abroadways"} logo`,
    navbarTaglineText: settings.navbarTaglineText || settings.navbarTagline || settings.logoCaption || settings.logoTagline || "Your pathway to global education",
    navbarTagline: settings.navbarTaglineText || settings.navbarTagline || settings.logoCaption || settings.logoTagline || "Your pathway to global education",
    navbarTaglineEnabled: boolValue(settings.navbarTaglineEnabled, brandStyleDefaults.navbarTaglineEnabled),
    navbarTaglinePosition: settings.navbarTaglinePosition || brandStyleDefaults.navbarTaglinePosition,
    navbarTaglineOffsetX: settings.navbarTaglineOffsetX ?? brandStyleDefaults.navbarTaglineOffsetX,
    navbarTaglineOffsetY: settings.navbarTaglineOffsetY ?? brandStyleDefaults.navbarTaglineOffsetY,
    logoCaption: settings.logoCaption || settings.navbarTagline || settings.logoTagline || "Your pathway to global education",
    logoTagline: settings.logoTagline || settings.navbarTagline || settings.logoCaption || "Your pathway to global education",
    siteLogoUrl: settings.siteLogoUrl || settings.navbarLogoUrl || "",
    footerLogoUrl: settings.footerLogoUrl || "",
    footerLogoAlt: settings.footerLogoAlt || `${settings.siteName || "Abroadways"} logo`,
    footerTaglineText: settings.footerTaglineText || settings.footerTagline || settings.navbarTagline || settings.logoCaption || "Your pathway to global education",
    footerTagline: settings.footerTaglineText || settings.footerTagline || settings.navbarTagline || settings.logoCaption || "Your pathway to global education",
    footerTaglineEnabled: boolValue(settings.footerTaglineEnabled, brandStyleDefaults.footerTaglineEnabled),
    footerTaglinePosition: settings.footerTaglinePosition || brandStyleDefaults.footerTaglinePosition,
    footerTaglineOffsetX: settings.footerTaglineOffsetX ?? brandStyleDefaults.footerTaglineOffsetX,
    footerTaglineOffsetY: settings.footerTaglineOffsetY ?? brandStyleDefaults.footerTaglineOffsetY,
    footerDescription: settings.footerDescription || "Premium study abroad counselling for New Zealand, United Kingdom, Australia, Canada, and Malaysia.",
    navbarLogoWidth: settings.navbarLogoWidth || brandStyleDefaults.navbarLogoWidth,
    navbarLogoHeight: settings.navbarLogoHeight || brandStyleDefaults.navbarLogoHeight,
    navbarTaglineColor: settings.navbarTaglineColor || brandStyleDefaults.navbarTaglineColor,
    navbarTaglineFontSize: settings.navbarTaglineFontSize || brandStyleDefaults.navbarTaglineFontSize,
    navbarTaglineFontWeight: settings.navbarTaglineFontWeight || brandStyleDefaults.navbarTaglineFontWeight,
    navbarTaglineStyle: settings.navbarTaglineStyle || brandStyleDefaults.navbarTaglineStyle,
    navbarBrandAlign: settings.navbarBrandAlign || brandStyleDefaults.navbarBrandAlign,
    footerLogoWidth: settings.footerLogoWidth || brandStyleDefaults.footerLogoWidth,
    footerLogoHeight: settings.footerLogoHeight || brandStyleDefaults.footerLogoHeight,
    footerTaglineColor: settings.footerTaglineColor || brandStyleDefaults.footerTaglineColor,
    footerTaglineFontSize: settings.footerTaglineFontSize || brandStyleDefaults.footerTaglineFontSize,
    footerTaglineFontWeight: settings.footerTaglineFontWeight || brandStyleDefaults.footerTaglineFontWeight,
    footerTaglineStyle: settings.footerTaglineStyle || brandStyleDefaults.footerTaglineStyle,
    footerBrandAlign: settings.footerBrandAlign || brandStyleDefaults.footerBrandAlign,
    faviconUrl: settings.faviconUrl || "",
    primaryColor: settings.primaryColor || "#1877f2",
    accentColor: settings.accentColor || "#f8c84e",
    phones: contact.phones || contactInfo.phones,
    email: contact.email || settings.email || "",
    facebook: social.facebook || settings.facebook || contactInfo.facebook,
    instagram: social.instagram || settings.instagram || contactInfo.instagram,
    linkedin: social.linkedin || settings.linkedin || "",
    youtube: social.youtube || settings.youtube || "",
    whatsappNumber: settings.whatsappNumber || contact.whatsappNumber || contactInfo.whatsappNumber,
    defaultSeoTitle: settings.defaultSeoTitle,
    defaultSeoDescription: settings.defaultSeoDescription,
    defaultOgImage: settings.defaultOgImage,
  };
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

function BrandLogo({ settings = contactInfo, footer = false }) {
  const logoUrl = footer ? settings.footerLogoUrl || settings.navbarLogoUrl : settings.navbarLogoUrl || settings.siteLogoUrl;
  const alt = footer ? settings.footerLogoAlt || settings.navbarLogoAlt : settings.navbarLogoAlt;
  const tagline = footer ? settings.footerTaglineText || settings.footerTagline || settings.navbarTagline : settings.navbarTaglineText || settings.navbarTagline || settings.logoCaption || settings.logoTagline;
  const enabled = footer ? boolValue(settings.footerTaglineEnabled, true) : boolValue(settings.navbarTaglineEnabled, true);
  const position = footer ? settings.footerTaglinePosition || "below-logo" : settings.navbarTaglinePosition || "below-logo";
  const align = footer ? settings.footerBrandAlign || "left" : settings.navbarBrandAlign || "left";
  const logoStyle = {
    width: cssSize(footer ? settings.footerLogoWidth : settings.navbarLogoWidth, footer ? "170px" : "160px"),
    height: cssSize(footer ? settings.footerLogoHeight : settings.navbarLogoHeight, "auto"),
  };
  const taglineStyle = {
    color: footer ? settings.footerTaglineColor || "#0057D9" : settings.navbarTaglineColor || "#0057D9",
    fontSize: cssSize(footer ? settings.footerTaglineFontSize : settings.navbarTaglineFontSize, footer ? "13px" : "12px"),
    fontWeight: footer ? settings.footerTaglineFontWeight || 600 : settings.navbarTaglineFontWeight || 600,
    fontStyle: footer ? settings.footerTaglineStyle || "italic" : settings.navbarTaglineStyle || "italic",
    transform: position === "custom" ? `translate(${offsetValue(footer ? settings.footerTaglineOffsetX : settings.navbarTaglineOffsetX, 0)}px, ${offsetValue(footer ? settings.footerTaglineOffsetY : settings.navbarTaglineOffsetY, footer ? -6 : -8)}px)` : undefined,
  };
  const logoNode = logoUrl ? h("img", { className: "brand-logo-img", src: logoUrl, alt: alt || `${settings.siteName || "Abroadways"} logo`, style: logoStyle }) : h("span", { className: "brand-mark" }, "A");
  const taglineNode = enabled && tagline ? h("small", { className: "brand-tagline", style: taglineStyle }, tagline) : null;
  return h(
    "span",
    { className: cx("brand-lockup", footer && "brand-lockup-footer", align === "center" && "brand-lockup-center", `brand-tagline-${position}`) },
    h("span", { className: "brand-logo-wrap" }, logoNode, !logoUrl && h("strong", null, settings.siteName || "Abroadways")),
    taglineNode,
  );
}

function SocialDots({ settings = contactInfo }) {
  const socials = [
    ["Facebook", "fb", settings.facebook],
    ["Instagram", "ig", settings.instagram],
    ["LinkedIn", "in", settings.linkedin],
    ["YouTube", "yt", settings.youtube],
  ].filter(([, , href]) => href);
  return h("div", { className: "social-dots" }, socials.map(([label, short, href]) => h("a", { key: label, href, target: "_blank", rel: "noreferrer", "aria-label": label }, short)));
}

function Navbar({ items = destinations, settings = contactInfo }) {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const closeAll = () => {
    setOpen(false);
    setDropdownOpen(false);
    setBlogOpen(false);
  };

  return h(
    "header",
    { className: "site-header" },
    h(
      "nav",
      { className: "navbar container" },
      h(Link, { href: routes.home, className: "brand", onClick: closeAll, "aria-label": "Abroadways home" }, h(BrandLogo, { settings })),
      h(
        "div",
        { className: "desktop-nav" },
        h(Link, { href: routes.home, className: "nav-link" }, "Home"),
        h(
          "div",
          { className: "dropdown", onMouseEnter: () => setDropdownOpen(true), onMouseLeave: () => setDropdownOpen(false) },
          h("button", { className: "nav-link dropdown-toggle", type: "button", onClick: () => setDropdownOpen((value) => !value), "aria-expanded": dropdownOpen }, "Study Abroad", h(ChevronDown, { size: 15 })),
          h("div", { className: cx("dropdown-menu", dropdownOpen && "dropdown-menu-open") }, items.map((destination) => h(Link, { key: destination.slug, href: `${routes.studyAbroad}/${destination.slug}`, className: "dropdown-item", onClick: closeAll }, destination.name))),
        ),
        h(Link, { href: routes.services, className: "nav-link" }, "Services"),
        h(Link, { href: routes.about, className: "nav-link" }, "About Us"),
        h(Link, { href: routes.contact, className: "nav-link" }, "Contact Us"),
        h(
          "div",
          { className: "dropdown", onMouseEnter: () => setBlogOpen(true), onMouseLeave: () => setBlogOpen(false) },
          h("button", { className: "nav-link dropdown-toggle", type: "button", onClick: () => setBlogOpen((value) => !value), "aria-expanded": blogOpen }, "Blog", h(ChevronDown, { size: 15 })),
          h("div", { className: cx("dropdown-menu", blogOpen && "dropdown-menu-open") },
            h(Link, { href: `${routes.blog}?language=en`, className: "dropdown-item", onClick: closeAll }, "English Blog"),
            h(Link, { href: `${routes.blog}?language=bn`, className: "dropdown-item", onClick: closeAll }, "বাংলা Blog"),
          ),
        ),
      ),
      h("div", { className: "navbar-actions" }, h(SocialDots, { settings }), h(ButtonLink, { href: routes.planner, className: "desktop-cta" }, "Book Free Consultation")),
      h("button", { className: "mobile-menu-button", type: "button", onClick: () => setOpen((value) => !value), "aria-label": open ? "Close navigation" : "Open navigation" }, open ? h(X, { size: 24 }) : h(Menu, { size: 24 })),
    ),
    h(
      "div",
      { className: cx("mobile-nav", open && "mobile-nav-open") },
      h(Link, { href: routes.home, onClick: closeAll }, "Home"),
      h(Link, { href: routes.studyAbroad, onClick: closeAll }, "Study Abroad"),
      items.map((destination) => h(Link, { key: destination.slug, href: `${routes.studyAbroad}/${destination.slug}`, className: "mobile-sub-link", onClick: closeAll }, destination.name)),
      h(Link, { href: routes.services, onClick: closeAll }, "Services"),
      h(Link, { href: routes.about, onClick: closeAll }, "About Us"),
      h(Link, { href: routes.contact, onClick: closeAll }, "Contact Us"),
      h(Link, { href: `${routes.blog}?language=en`, onClick: closeAll }, "English Blog"),
      h(Link, { href: `${routes.blog}?language=bn`, onClick: closeAll }, "বাংলা Blog"),
      h(SocialDots, { settings }),
      h(ButtonLink, { href: routes.planner, className: "mobile-cta" }, "Book Free Consultation"),
    ),
  );
}

function SectionHeading({ eyebrow, title, copy }) {
  return h("div", { className: "section-heading" }, eyebrow && h("span", { className: "eyebrow" }, eyebrow), h("h2", null, title), copy && h("p", null, copy));
}

function HomePage({ cms, destinations: destinationItems, blogs }) {
  const page = pageCopy(findPage(cms, "home", "/"), {
    eyebrow: "Abroadways Limited",
    title: "Plan Your Study Abroad Journey with Abroadways",
    copy: "Focused counselling, applications, and visa guidance for Bangladeshi students planning New Zealand, UK, Australia, Canada, and Malaysia.",
    image: "/images/consultation-counsellor.png",
    ctaButtonText: "Book Free Consultation",
    ctaButtonLink: routes.planner,
    secondaryButtonText: "Explore Destinations",
    secondaryButtonLink: routes.studyAbroad,
    badgeText: "Focused guidance for five study destinations",
    seoTitle: "Abroadways | Study Abroad Agency in Bangladesh",
    seoDescription: "Premium study abroad counselling for Bangladeshi students planning New Zealand, the United Kingdom, Australia, Canada, or Malaysia.",
    ogTitle: "Abroadways | Study Abroad Agency in Bangladesh",
    ogDescription: "Plan your study abroad journey with Abroadways Limited.",
    ogImage: "/images/abroadways-hero-campus.png",
  });
  setSeo({
    title: page.seoTitle,
    description: page.seoDescription,
    image: page.ogImage || page.image,
    ogTitle: page.ogTitle,
    ogDescription: page.ogDescription,
  });

  return h(
    React.Fragment,
    null,
    normalizeHomeSections(page.bodySections).filter((section) => section.enabled !== false).map((section) => h(HomeSectionRenderer, { key: section.id || `${section.type}-${section.order}`, section, page, destinations: destinationItems, blogs })),
  );
}

function HomeSectionRenderer({ section, page, destinations: destinationItems, blogs }) {
  const typedPage = homeSectionPage(page, section);
  switch (homeSectionType(section)) {
    case "hero":
      return h(Hero, { page: typedPage, destinations: destinationItems });
    case "pathwayCards":
      return h(StudyPathwaySection, { page: typedPage, destinations: destinationItems });
    case "featureCards":
      return h(FeatureCardsSection, { page: typedPage });
    case "successStories":
      return h(SuccessStoriesSection, { page: typedPage });
    case "serviceChips":
      return h(ServiceBubbleSection, { page: typedPage });
    case "insightsSection":
      return h(InsightsSection, { page: typedPage });
    case "consultationForm":
      return h(HomeConsultationFormSection, { page: typedPage });
    case "blogPreview":
      return h(BlogPreview, { blogs, page: typedPage });
    case "resourceTiles":
      return h(ResourceTilesSection, { page: typedPage });
    case "consultationCta":
      return h(ConsultationSection, { page: typedPage });
    case "trustSection":
      return h(TrustSection, { section });
    default:
      return null;
  }
}

function Hero({ page, destinations: destinationItems }) {
  const heroSection = sectionFor(page, "hero", {});
  const title = heroSection.heading || page.title;
  const copy = heroSection.subtitle || page.copy;
  const image = heroSection.imageUrl || heroSection.heroImageUrl || page.image;
  const primaryButtonText = heroSection.primaryButtonText || page.ctaButtonText || "Book Free Consultation";
  const primaryButtonLink = heroSection.primaryButtonLink || page.ctaButtonLink || routes.planner;
  const secondaryButtonText = heroSection.secondaryButtonText || page.secondaryButtonText || "Explore Destinations";
  const secondaryButtonLink = heroSection.secondaryButtonLink || page.secondaryButtonLink || routes.studyAbroad;
  const chips = splitList(heroSection.countryChips, destinationItems.map((destination) => destination.chip));
  return h(
    "section",
    { className: "hero scholars-hero" },
    h("span", { className: "doodle doodle-plane", "aria-hidden": "true" }),
    h("span", { className: "doodle doodle-pencil", "aria-hidden": "true" }),
    h("span", { className: "doodle doodle-ring", "aria-hidden": "true" }),
    h(
      "div",
      { className: "container hero-shell" },
      h(
      "div",
      { className: "hero-copy" },
        h("span", { className: "hero-badge" }, heroSection.badgeText || page.badgeText || page.eyebrow),
        h(HeroTitle, { title }),
        h("p", { className: "hero-subtitle" }, copy),
        h("p", { className: "hero-secondary-line" }, heroSection.secondaryText || "Start with the right country, course, documents, and timeline."),
        h("div", { className: "hero-actions" }, h(ButtonLink, { href: primaryButtonLink }, primaryButtonText), h(ButtonLink, { href: secondaryButtonLink, variant: "outline" }, secondaryButtonText)),
        h("div", { className: "hero-chips" }, chips.map((chip) => h("span", { key: chip }, chip))),
      ),
      h("div", { className: "hero-visual" }, h("div", { className: "student-shape shape-blue" }), h("div", { className: "student-shape shape-gold" }), h("div", { className: "hero-image-frame" }, h("img", { src: image, alt: "Study abroad counselling visual" })), h("div", { className: "hero-floating-card" }, h(GraduationCap, { size: 24 }), h("div", null, h("strong", null, "5 focused destinations"), h("span", null, "Counselling, applications, visa support")))),
    ),
  );
}

function HeroTitle({ title }) {
  const words = String(title || "").trim().split(/\s+/).filter(Boolean);
  const firstLine = words.slice(0, 2).join(" ");
  const secondLine = words.slice(2).join(" ");
  return h("h1", { className: "hero-title" }, firstLine && h("span", null, firstLine), secondLine && h("span", null, secondLine));
}

function DestinationShowcase({ compact = false, destinations: destinationItems = destinations }) {
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
        destinationItems.map((destination) =>
          h(
            Link,
            { key: destination.slug, href: `${routes.studyAbroad}/${destination.slug}`, className: "destination-card" },
            h("img", { src: destination.image, alt: `${destination.name} study destination` }),
            h(
              "div",
              { className: "destination-card-content" },
              h("span", { className: "destination-kicker" }, "Study in"),
              h("h3", null, destination.name),
              h("p", null, destination.short),
              h("strong", null, "Explore country", h(ArrowRight, { size: 16 })),
            ),
          ),
        ),
      ),
    ),
  );
}

function FocusStrip() {
  const items = [
    ["Counselling", "Profile-first country and course guidance"],
    ["Applications", "University application support with document checks"],
    ["Visa guidance", "Clear preparation for a consistent student file"],
  ];
  return h("section", { className: "focus-strip" }, h("div", { className: "container focus-strip-grid" }, items.map(([title, copy]) => h("article", { key: title }, h("span", null, title), h("strong", null, copy)))));
}

function StudyPathwaySection({ page, destinations: destinationItems }) {
  const section = sectionFor(page, "study-pathway", {
    title: "Find Your Study Pathway",
    subtitle: "Explore destinations and support areas with clear next steps.",
  });
  const cards = sectionCards(section, pathwayFallback(destinationItems));
  return h(
    "section",
    { className: "section study-pathway-section" },
    h(
      "div",
      { className: "container" },
      h("div", { className: "section-heading centered" }, h("h2", null, section.title), h("span", { className: "scribble-line", "aria-hidden": "true" }), section.subtitle && h("p", null, section.subtitle)),
      h("div", { className: "pathway-grid" }, cards.map((card, index) => h(Link, { key: `${card.title}-${index}`, href: card.link || routes.studyAbroad, className: "pathway-card", style: { background: card.backgroundColor || softColors[index % softColors.length] } }, card.imageUrl ? h("img", { src: card.imageUrl, alt: "" }) : h("span", { className: "pathway-icon" }, card.icon || String(card.title || "?").slice(0, 2)), h("strong", null, card.title), h(ArrowRight, { size: 18 })))),
    ),
  );
}

function FeatureCardsSection({ page }) {
  const section = sectionFor(page, "feature-cards", {
    title: "Plan with clarity",
    subtitle: "Two focused ways Abroadways helps students move from ideas to action.",
  });
  const cards = sectionCards(section, defaultFeatureCards);
  return h("section", { className: "section feature-card-section" }, h("div", { className: "container" }, h("div", { className: "feature-grid" }, cards.slice(0, 2).map((card, index) => h("article", { key: card.title, className: "big-feature-card", style: { background: card.backgroundColor || softColors[index] } }, h("div", null, h("span", { className: "eyebrow" }, card.eyebrow || (index === 0 ? "Bangladeshi Students" : "Step-by-step support")), h("h2", null, card.title), h("ul", null, (card.bullets || splitList(card.text, [])).slice(0, 3).map((item) => h("li", { key: item }, h(CheckCircle2, { size: 18 }), item))), h(ButtonLink, { href: card.ctaLink || routes.services }, card.ctaText || "Learn more")), h("img", { src: card.imageUrl || "/images/abroadways-destination-planning.png", alt: "" }), h("span", { className: "feature-doodle", "aria-hidden": "true" }))))));
}

function SuccessStoriesSection({ page }) {
  const section = sectionFor(page, "success-stories", { title: "Student Journey Stories", tabs: ["All", "Canada", "Australia", "UK", "New Zealand", "Malaysia"] });
  const title = section.heading || section.title;
  const subtitle = section.subtitle;
  const tabs = sectionItems(section, "tabs", ["All", "Canada", "Australia", "UK", "New Zealand", "Malaysia"]);
  const stories = sectionItems(section, "stories", defaultStories);
  const [active, setActive] = useState("All");
  const visible = stories.filter((story) => active === "All" || String(story.destination || story.country || "").toLowerCase().includes(active.toLowerCase()) || (active === "UK" && String(story.destination || story.country || "").toLowerCase().includes("kingdom")));
  return h("section", { className: "section success-section" }, h("div", { className: "container" }, h("div", { className: "section-heading centered" }, h("h2", null, title), h("span", { className: "scribble-line", "aria-hidden": "true" }), subtitle && h("p", null, subtitle)), h("div", { className: "tab-row" }, tabs.map((tab) => h("button", { key: tab, type: "button", className: cx(active === tab && "active"), onClick: () => setActive(tab) }, tab))), h("div", { className: "story-grid" }, (visible.length ? visible : stories).slice(0, 3).map((story) => h("article", { key: `${story.studentName}-${story.destination || story.country}`, className: "story-card" }, h("img", { src: story.imageUrl || "/images/consultation-counsellor.png", alt: "" }), h("div", null, h("span", null, story.destination || story.country), h("h3", null, story.studentName), h("strong", null, story.qualification), h("p", null, story.text || story.storyText)))))));
}

function ServiceBubbleSection({ page }) {
  const section = sectionFor(page, "service-bubbles", {});
  const chips = sectionItems(section, "chips", defaultSupportChips);
  const image = section.imageUrl || "/images/consultation-counsellor.png";
  return h("section", { className: "section bubble-section bubble-orbit-section" },
    h("div", { className: "container" },
      h("div", { className: "section-heading centered" }, h("h2", null, section.heading || section.title || "Support around every step"), h("span", { className: "scribble-line", "aria-hidden": "true" }), section.subtitle && h("p", null, section.subtitle)),
      h("div", { className: "bubble-orbit" },
        h("div", { className: "orbit-rings", "aria-hidden": "true" }),
        h("img", { className: "orbit-image", src: image, alt: "Abroadways counselling support" }),
        chips.map((chip, index) => {
          const label = typeof chip === "string" ? chip : chip.label;
          return h("span", { key: `${label}-${index}`, className: `bubble-chip bubble-${index % 9}`, style: typeof chip === "object" && chip.color ? { color: chip.color } : undefined }, h(Sparkles, { size: 16 }), label);
        }),
      ),
    ),
  );
}

function InsightsSection({ page }) {
  const section = sectionFor(page, "insights-section", {
    heading: "Abroadways Study Abroad Insights",
    subtitle: "Guides, counselling notes, country updates, visa preparation tips, and budget planning for students and families.",
    imageUrl: "/images/abroadways-destination-planning.png",
    ctaText: "Read Guides",
    ctaLink: routes.blog,
    items: defaultInsightCountries,
  });
  const items = sectionItems(section, "items", defaultInsightCountries);
  return h("section", { className: "section insights-section" },
    h("div", { className: "container insights-layout" },
      h("div", { className: "insights-visual" }, h("img", { src: section.imageUrl || "/images/abroadways-destination-planning.png", alt: "Study abroad insights" })),
      h("div", { className: "insights-copy" },
        h("span", { className: "eyebrow" }, section.eyebrow || "Insights"),
        h("h2", null, section.heading || section.title),
        h("p", null, section.subtitle),
        h(ButtonLink, { href: section.ctaLink || routes.blog }, section.ctaText || "Read Guides"),
      ),
    ),
    h("div", { className: "container country-slider-row" }, items.map((item, index) => h(Link, { key: `${item.title}-${index}`, href: item.link || routes.studyAbroad, className: "country-slide-card", style: { background: item.backgroundColor || softColors[index % softColors.length] } }, item.imageUrl ? h("img", { src: item.imageUrl, alt: "" }) : h("span", { className: "pathway-icon" }, String(item.title || "?").slice(0, 2)), h("strong", null, item.title)))),
  );
}

function HomeConsultationFormSection({ page }) {
  const section = sectionFor(page, "consultation-form", {
    heading: "Claim Your Free Consultation",
    subtitle: "Share your study interest and destination plan. Abroadways will review the details and contact you.",
    imageUrl: "/images/consultation-counsellor.png",
    formHeading: "Submit Consultation Request",
  });
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ source: "homepage-consultation", status: "new" });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event.preventDefault();
    await api("/leads", { method: "POST", body: JSON.stringify({ ...form, source: "homepage-consultation", status: "new" }) }).catch(() => null);
    setSent(true);
  };
  const stepContent = [
    h("div", { className: "consult-step", key: "interest" }, h("h3", null, "Visa / Study Interest"), h("div", { className: "consult-choice-grid" }, ["Higher Study", "Foundation", "Diploma", "Bachelor", "Masters", "Family Study Support"].map((item) => h("button", { key: item, type: "button", className: cx(form.educationLevel === item && "selected"), onClick: () => update("educationLevel", item) }, item)))),
    h("div", { className: "consult-step", key: "country" }, h("h3", null, "Country of Interest"), h("div", { className: "consult-choice-grid" }, ["New Zealand", "UK", "Australia", "Canada", "Malaysia"].map((item) => h("button", { key: item, type: "button", className: cx(form.interestedCountry === item && "selected"), onClick: () => update("interestedCountry", item) }, item)))),
    h("div", { className: "consult-step", key: "education" }, h("h3", null, "Planning Details"), h("input", { placeholder: "Current education", value: form.currentEducation || "", onChange: (event) => update("currentEducation", event.target.value) }), h("input", { placeholder: "Preferred intake", value: form.intake || "", onChange: (event) => update("intake", event.target.value) })),
    h("div", { className: "consult-step", key: "contact" }, h("h3", null, "Contact Details"), h("input", { placeholder: "Name", value: form.name || "", onChange: (event) => update("name", event.target.value), required: true }), h("input", { placeholder: "Phone", value: form.phone || "", onChange: (event) => update("phone", event.target.value), required: true }), h("input", { placeholder: "Email", value: form.email || "", onChange: (event) => update("email", event.target.value) }), h("textarea", { placeholder: "Message", value: form.message || "", onChange: (event) => update("message", event.target.value) })),
  ];
  return h("section", { className: "section home-consult-section" },
    h("div", { className: "container" },
      h("div", { className: "section-heading centered" }, h("h2", null, section.heading), h("span", { className: "scribble-line", "aria-hidden": "true" }), section.subtitle && h("p", null, section.subtitle)),
      h("div", { className: "home-consult-card" },
        h("form", { className: "home-consult-form", onSubmit: submit },
          h("span", { className: "eyebrow" }, section.formHeading || "Submit Consultation Request"),
          h("div", { className: "planner-progress consult-progress" }, [0, 1, 2, 3].map((item) => h("span", { key: item, className: item <= step ? "active" : "" }, item + 1))),
          sent ? h("div", { className: "planner-success" }, h(CheckCircle2, { size: 42 }), h("h3", null, "Consultation request saved."), h("p", null, "Abroadways will review your details and contact you soon.")) : stepContent[step],
          !sent && h("div", { className: "planner-actions" }, step > 0 && h("button", { type: "button", className: "button button-outline", onClick: () => setStep((value) => value - 1) }, "Back"), step < 3 ? h("button", { type: "button", className: "button button-primary", onClick: () => setStep((value) => value + 1) }, "Continue", h(ArrowRight, { size: 18 })) : h("button", { type: "submit", className: "button button-primary" }, "Submit Consultation Request", h(ArrowRight, { size: 18 })))),
        h("div", { className: "home-consult-image" }, h("img", { src: section.imageUrl || "/images/consultation-counsellor.png", alt: "Free Abroadways consultation" })),
      ),
    ),
  );
}

function ResourceTilesSection({ page }) {
  const section = sectionFor(page, "resource-tiles", { heading: "Helpful resources for your next step", subtitle: "Quick links for destinations, guides, consultation, and planning.", items: defaultResourceTiles });
  const items = sectionItems(section, "items", defaultResourceTiles);
  return h("section", { className: "section resource-tiles-section" },
    h("div", { className: "container" },
      h("div", { className: "section-heading centered" }, h("h2", null, section.heading || section.title), section.subtitle && h("p", null, section.subtitle)),
      h("div", { className: "resource-tile-row" }, items.map((item, index) => h(Link, { key: `${item.title}-${index}`, href: item.link || routes.blog, className: "resource-tile", style: { background: item.backgroundColor || softColors[index % softColors.length] } }, h("span", { className: "resource-icon" }, item.icon || String(item.title || "?").slice(0, 2)), h("strong", null, item.title), h("p", null, item.description), h("em", null, item.ctaText || "Open")))),
    ),
  );
}

function PlannerPreview() {
  return h(
    "section",
    { className: "section planner-preview" },
    h("div", { className: "container planner-preview-inner" }, h("div", { className: "planner-copy" }, h("span", { className: "eyebrow" }, "Smart pathway planner"), h("h2", null, "Find your best study abroad pathway"), h("p", null, "Answer a few focused questions and help our counsellors understand your country interest, study level, budget, intake, documents, and contact details."), h(ButtonLink, { href: routes.planner }, "Start Pathway Planner")), h("div", { className: "planner-visual-stack" }, h("img", { src: "/images/consultation-counsellor.png", alt: "Study abroad counselling session" }), h("div", { className: "planner-mini-card" }, ["Country interest", "Study level", "Budget range", "Intake", "Documents", "Contact details"].map((item, index) => h("span", { key: item }, `0${index + 1}`, h("strong", null, item)))))),
  );
}

function ServicesSection({ heading = true }) {
  return h("section", { className: "section services-section" }, h("div", { className: "container" }, heading && h(SectionHeading, { eyebrow: "Services", title: "Premium support without the noise", copy: "Short, practical guidance across the decisions that matter most." }), h("div", { className: "service-grid" }, services.map(([title, copy, Icon], index) => h("article", { key: title, className: "service-card" }, h("span", { className: "service-index" }, `0${index + 1}`), h("span", { className: "icon-wrap" }, h(Icon, { size: 24 })), h("h3", null, title), h("p", null, copy))))));
}

function ProcessSection() {
  return h("section", { className: "section process-section" }, h("div", { className: "container" }, h("div", { className: "process-top" }, h(SectionHeading, { eyebrow: "Process", title: "A structured journey from profile to departure", copy: "A clean process that keeps students and families informed at every step." }), h("div", { className: "process-image" }, h("img", { src: "/images/abroadways-destination-planning.png", alt: "Study abroad planning materials" }))), h("div", { className: "process-grid" }, process.map(([title, copy], index) => h("article", { key: title, className: "process-card" }, h("span", { className: "process-number" }, `0${index + 1}`), h("h3", null, title), h("p", null, copy))))));
}

function BlogPreview({ blogs = blogPosts, page }) {
  const section = sectionFor(page, "blog-preview", { title: "Study Abroad Guides", subtitle: "Read practical destination guides written for Bangladeshi students and families.", numberOfPosts: 3 });
  const [language, setLanguage] = useState("en");
  const filtered = blogs.filter((post) => (post.language || "en") === language);
  const visible = filtered.slice(0, Number(section.numberOfPosts || 3));
  return h("section", { className: "section blog-preview scholars-blog-preview" }, h("div", { className: "container" }, h("div", { className: "section-heading centered" }, h("h2", null, section.heading || section.title), h("span", { className: "scribble-line", "aria-hidden": "true" }), section.subtitle && h("p", null, section.subtitle)), section.languageTabsEnabled !== false && h(LanguageTabs, { language, setLanguage }), visible.length ? h("div", { className: "blog-grid blog-grid-large" }, visible.map((post) => h(BlogCard, { key: post.slug, post }))) : h("div", { className: "empty-card" }, language === "bn" ? "No Bangla guides published yet." : "No English guides published yet."), h("div", { className: "center-actions" }, h(ButtonLink, { href: section.ctaLink || routes.blog, variant: "outline" }, section.ctaText || "View Blog"))));
}

function BlogCard({ post }) {
  return h(Link, { href: `${routes.blog}/${post.slug}`, className: "blog-card" }, h("img", { src: post.image, alt: post.title }), h("div", { className: "blog-card-body" }, h("span", null, `${post.category} / ${formatDate(post.publishedAt)}`), h("h3", null, post.title), h("p", null, post.excerpt), h("strong", null, "Read more", h(ArrowRight, { size: 15 }))));
}

function LanguageTabs({ language, setLanguage }) {
  return h("div", { className: "tab-row language-tabs" }, [["en", "English"], ["bn", "Bangla"]].map(([value, label]) => h("button", { key: value, type: "button", className: cx(language === value && "active"), onClick: () => setLanguage(value) }, label)));
}

function TrustSection({ section = {} } = {}) {
  const trust = section.trustItems?.length ? section.trustItems.map((item) => [item.title, item.description, ShieldCheck]) : [["Abroadways Limited", "", BadgeCheck], ["Student-first counselling", "", GraduationCap], ["UKVI Approved LanguageCert Test Centre", "", ShieldCheck], ["Transparent process", "", CheckCircle2]];
  return h("section", { className: "section trust-section" }, h("div", { className: "container trust-layout" }, h("div", null, h("span", { className: "eyebrow" }, "Trust"), h("h2", null, section.heading || section.title || "Built around clarity, care, and responsible guidance"), h("p", null, section.subtitle || "Abroadways keeps the website focused on counselling, applications, visa guidance, budgets, and pre-departure support.")), h("div", { className: "trust-grid" }, trust.map(([item, description, Icon]) => h("div", { key: item, className: "trust-item" }, h(Icon, { size: 22 }), h("span", null, item, description && h("small", null, description)))))));
}

function FinalCta() {
  return h("section", { className: "final-cta" }, h("div", { className: "container final-cta-inner" }, h("span", { className: "eyebrow" }, "Plan with confidence"), h("h2", null, "Ready to plan your study abroad journey?"), h("p", null, "Start with the pathway planner or contact Abroadways for a direct consultation."), h("div", { className: "hero-actions center" }, h(ButtonLink, { href: routes.planner, variant: "light" }, "Start Planner"), h(ButtonLink, { href: routes.contact, variant: "secondary" }, "Contact Abroadways"))));
}

function ConsultationSection({ page }) {
  const section = sectionFor(page, "consultation-cta", {
    heading: "Claim your free Abroadways consultation",
    subtitle: "Start with a short pathway planner and help our counsellors understand your goals.",
    imageUrl: "/images/consultation-counsellor.png",
    formHeading: "Ready to begin?",
    ctaText: "Book Free Consultation",
  });
  return h("section", { className: "section consultation-claim" }, h("div", { className: "container" }, h("div", { className: "section-heading centered" }, h("h2", null, section.heading), h("span", { className: "scribble-line", "aria-hidden": "true" }), section.subtitle && h("p", null, section.subtitle)), h("div", { className: "claim-card" }, h("div", { className: "claim-copy" }, h("span", { className: "eyebrow" }, section.formHeading || "Free counselling"), h("h3", null, "Tell us your country interest and study goal"), h("ol", null, ["Choose your preferred destination", "Share budget, intake, and document status", "An Abroadways counsellor reviews your pathway"].map((item) => h("li", { key: item }, item))), h(ButtonLink, { href: section.primaryButtonLink || section.ctaLink || routes.planner }, section.primaryButtonText || section.ctaText || "Book Free Consultation"), section.secondaryButtonText && h(ButtonLink, { href: section.secondaryButtonLink || routes.contact, variant: "outline" }, section.secondaryButtonText)), h("img", { src: section.imageUrl || "/images/consultation-counsellor.png", alt: "Abroadways consultation" }))));
}

function StudyAbroadPage({ cms, destinations: destinationItems }) {
  const page = pageCopy(findPage(cms, "study-abroad", "/study-abroad"), {
    eyebrow: "Study Abroad",
    title: "Explore Your Study Abroad Destination",
    copy: "Compare five focused study destinations with practical counselling, application, and visa guidance.",
    image: "/images/abroadways-hero-campus.png",
    seoTitle: "Study Abroad Destinations from Bangladesh | Abroadways",
    seoDescription: "Explore study pathways for New Zealand, the United Kingdom, Australia, Canada, and Malaysia with Abroadways.",
    ogTitle: "Study Abroad Destinations | Abroadways",
    ogDescription: "Five focused destinations for Bangladeshi students.",
    ogImage: "/images/abroadways-hero-campus.png",
  });
  setSeo({ title: page.seoTitle, description: page.seoDescription, image: page.ogImage || page.image, ogTitle: page.ogTitle, ogDescription: page.ogDescription });
  return h(React.Fragment, null, h(PageHero, { eyebrow: page.eyebrow, title: page.title, copy: page.copy, image: page.image }), h(DestinationShowcase, { compact: true, destinations: destinationItems }), h(PlannerPreview), h(FinalCta));
}

function CountryPage({ destination }) {
  setSeo({ title: destination.seoTitle || `Study in ${destination.name} | Abroadways`, description: destination.seoDescription || destination.overview, image: destination.ogImage || destination.image, ogTitle: destination.ogTitle, ogDescription: destination.ogDescription });
  return h(React.Fragment, null,
    h(PageHero, { eyebrow: "Study Abroad", title: destination.heroHeading || `Study in ${destination.name}`, copy: destination.heroSubtitle || destination.short, image: destination.image }),
    h(CountryAtGlance, { destination }),
    h("section", { className: "section country-detail country-landing" }, h("div", { className: "container country-detail-grid" },
      h("div", { className: "country-story" }, h("span", { className: "eyebrow" }, "Overview"), h("h2", null, `Your ${destination.name} pathway, organised`), h("p", null, destination.overview), h("div", { className: "country-actions" }, h(ButtonLink, { href: destination.ctaLink || routes.planner }, destination.ctaText || "Start Pathway Planner"), h(ButtonLink, { href: routes.contact, variant: "outline" }, "Talk to Counsellor"))),
      h("aside", { className: "country-panel country-benefits" }, h("h3", null, "Why study there"), h("ul", null, destination.benefits.map((item) => h("li", { key: item }, h(CheckCircle2, { size: 18 }), h("span", null, item)))), h("div", { className: "country-panel-note" }, "Profile-led planning for Bangladeshi students")),
    )),
    destination.galleryImages?.length ? h(CountryGallery, { images: destination.galleryImages, title: destination.name }) : null,
    h(CountryInfoSections, { destination }),
    h(ProcessSection),
    h(FaqSection, { items: destination.faqs }),
    h(FinalCta),
  );
}

function CountryGallery({ images = [], title }) {
  return h("section", { className: "section country-gallery-section" }, h("div", { className: "container" },
    h(SectionHeading, { eyebrow: "Gallery", title: `${title} study visuals`, copy: "Images added from the Abroadways media library." }),
    h("div", { className: "country-gallery-grid" }, images.slice(0, 6).map((image, index) => h("img", { key: `${image}-${index}`, src: image, alt: `${title} gallery ${index + 1}` }))),
  ));
}

function CountryAtGlance({ destination }) {
  const items = [
    ["Study areas", destination.studyAreas.slice(0, 3).join(", ")],
    ["Intakes", destination.intakes],
    ["Visa support", destination.visaNotes],
  ];
  return h("section", { className: "country-glance" }, h("div", { className: "container country-glance-grid" }, items.map(([title, copy]) => h("article", { key: title }, h("span", null, title), h("p", null, copy)))));
}

function CountryInfoSections({ destination }) {
  const sections = [["Popular study areas", destination.studyAreas.join(", ")], ["Intake guidance", destination.intakes], ["Cost guidance", destination.costGuide], ["Application requirements", destination.requirements.join(", ")], ["Visa support", destination.visaNotes]];
  return h("section", { className: "section country-info-section" }, h("div", { className: "container" }, h(SectionHeading, { eyebrow: "Country guide", title: "Plan the details before you apply", copy: "A practical view of study areas, intakes, budget, requirements, and visa support." }), h("div", { className: "info-grid" }, sections.map(([title, copy], index) => h("article", { key: title, className: "info-card" }, h("span", { className: "info-number" }, `0${index + 1}`), h("h3", null, title), h("p", null, copy))))));
}

function FaqSection({ items }) {
  return h("section", { className: "section faq-section" }, h("div", { className: "container" }, h(SectionHeading, { eyebrow: "FAQ", title: "Common questions", copy: "Short answers for early-stage planning." }), h("div", { className: "faq-grid" }, items.map(([question, answer]) => h("article", { key: question, className: "faq-card" }, h("h3", null, question), h("p", null, answer))))));
}

function ServicesPage({ cms }) {
  const page = pageCopy(findPage(cms, "services", "/services"), {
    eyebrow: "Services",
    title: "Study Abroad Services with Clear Next Steps",
    copy: "Country selection, applications, scholarship and budget guidance, visa documentation, and pre-departure support.",
    image: "/images/consultation-counsellor.png",
    seoTitle: "Study Abroad Services in Bangladesh | Abroadways",
    seoDescription: "Get counselling, university application support, budget guidance, visa documentation support, and pre-departure guidance.",
    ogTitle: "Study Abroad Services | Abroadways",
    ogDescription: "Practical support from profile review to pre-departure.",
    ogImage: "/images/consultation-counsellor.png",
  });
  setSeo({ title: page.seoTitle, description: page.seoDescription, image: page.ogImage || page.image, ogTitle: page.ogTitle, ogDescription: page.ogDescription });
  return h(React.Fragment, null, h(PageHero, { eyebrow: page.eyebrow, title: page.title, copy: page.copy, image: page.image }), h(ServicesSection), h(ProcessSection), h(FinalCta));
}

function BlogPage({ blogs, cms }) {
  const [language, setLanguage] = useState(() => new URLSearchParams(window.location.search).get("language") === "bn" ? "bn" : "en");
  React.useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("language");
    if (requested === "bn" || requested === "en") setLanguage(requested);
  }, []);
  const visible = blogs.filter((post) => (post.language || "en") === language);
  const page = pageCopy(findPage(cms, "blog", "/blog"), {
    eyebrow: "Blog",
    title: "Study Abroad Guides",
    copy: "Short, practical guides for Bangladeshi students and families planning the next step.",
    image: "/images/abroadways-destination-planning.png",
    seoTitle: "Study Abroad Blog for Bangladeshi Students | Abroadways",
    seoDescription: "Read destination guides for studying in New Zealand, the United Kingdom, Australia, Canada, and Malaysia.",
    ogTitle: "Study Abroad Guides | Abroadways",
    ogDescription: "Practical destination guides from Abroadways.",
    ogImage: "/images/abroadways-destination-planning.png",
  });
  setSeo({ title: page.seoTitle, description: page.seoDescription, image: page.ogImage || page.image, ogTitle: page.ogTitle, ogDescription: page.ogDescription });
  return h(React.Fragment, null, h(PageHero, { eyebrow: page.eyebrow, title: page.title, copy: page.copy, image: page.image }), h("section", { className: "section blog-index-section scholars-blog-preview" }, h("div", { className: "container" }, h("div", { className: "blog-index-head centered" }, h("span", { className: "eyebrow" }, "Latest insights"), h("h2", null, "Practical guides for focused decisions"), h("span", { className: "scribble-line", "aria-hidden": "true" })), h(LanguageTabs, { language, setLanguage }), visible.length ? h("div", { className: "blog-grid blog-grid-large" }, visible.map((post) => h(BlogCard, { key: post.slug, post }))) : h("div", { className: "empty-card" }, language === "bn" ? "No Bangla guides published yet." : "No English guides published yet."))));
}

function BlogDetailPage({ post, blogs = [] }) {
  const related = blogs.filter((item) => item.slug !== post.slug && (item.language || "en") === (post.language || "en")).slice(0, 2);
  setSeo({ title: post.seoTitle || `${post.title} | Abroadways`, description: post.metaDescription || post.excerpt, image: post.image, ogTitle: post.seoTitle || post.title, ogDescription: post.metaDescription || post.excerpt });
  return h(React.Fragment, null, h(PageHero, { eyebrow: post.category, title: post.title, copy: post.excerpt, image: post.image }), h("article", { className: "section article-section", lang: post.language === "bn" ? "bn" : "en" }, h("div", { className: "container article-layout" }, h("div", { className: "article-body" }, h("span", { className: "article-meta" }, `${formatDate(post.publishedAt)} / ${post.category}`), post.content.map((paragraph) => h("p", { key: paragraph }, paragraph)), h(ButtonLink, { href: routes.planner }, "Plan My Pathway")), h("aside", { className: "article-aside" }, h("span", { className: "eyebrow" }, "Abroadways guide"), h("h3", null, "Need a profile review?"), h("p", null, "Share your country interest, study level, budget, and intake plan with an Abroadways counsellor."), h(ButtonLink, { href: routes.planner, variant: "outline" }, "Start Planner")))), related.length && h("section", { className: "section related-posts" }, h("div", { className: "container" }, h(SectionHeading, { eyebrow: "Related", title: "More study abroad guides" }), h("div", { className: "blog-grid" }, related.map((item) => h(BlogCard, { key: item.slug, post: item }))))));
}

function AboutPage({ cms }) {
  const page = pageCopy(findPage(cms, "about-us", "/about-us"), {
    eyebrow: "About Us",
    title: "A Focused Study Abroad Agency for Bangladeshi Students",
    copy: "Abroadways Limited guides students through selected destinations with careful counselling and transparent planning.",
    image: "/images/abroadways-hero-campus.png",
    seoTitle: "About Abroadways Limited | Study Abroad Agency",
    seoDescription: "Learn about Abroadways Limited, a focused study abroad agency for Bangladeshi students.",
    ogTitle: "About Abroadways Limited",
    ogDescription: "Student-first study abroad counselling in Dhaka.",
    ogImage: "/images/abroadways-hero-campus.png",
  });
  setSeo({ title: page.seoTitle, description: page.seoDescription, image: page.ogImage || page.image, ogTitle: page.ogTitle, ogDescription: page.ogDescription });
  return h(React.Fragment, null, h(PageHero, { eyebrow: page.eyebrow, title: page.title, copy: page.copy, image: page.image }), h(TrustSection), h(FinalCta));
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

  return h(React.Fragment, null, h(PageHero, { eyebrow: "Pathway Planner", title: "Find your best study abroad pathway", copy: "A focused planner for country interest, budget, intake, documents, and contact details.", image: "/images/consultation-counsellor.png" }), h("section", { className: "section planner-page planner-page-pro" }, h("div", { className: "container planner-layout" }, h("aside", { className: "planner-side-card" }, h("span", { className: "eyebrow" }, "Profile review"), h("h2", null, "Plan with clarity before you apply"), h("p", null, "Your answers help Abroadways understand destination fit, budget, intake, documents, and consultation priority."), h("img", { src: "/images/abroadways-destination-planning.png", alt: "Study abroad planning materials" })), h("div", { className: "planner-shell" }, h("div", { className: "planner-progress" }, steps.concat([["contact", "Contact details"]]).map((step, stepIndex) => h("span", { key: step[0], className: stepIndex <= index ? "active" : "" }, stepIndex + 1))), saved ? h("div", { className: "planner-success" }, h(CheckCircle2, { size: 44 }), h("h2", null, "Your pathway request has been saved."), h("p", null, "Abroadways will review your profile and contact you soon."), h(ButtonLink, { href: routes.home }, "Back to Home")) : h("form", { className: "planner-form", onSubmit: submit }, active ? h("div", null, h("span", { className: "eyebrow" }, `Step ${index + 1}`), h("h2", null, active[1]), h("div", { className: "choice-grid" }, active[2].map((choice) => h("button", { key: choice, type: "button", className: cx("choice-card", form[active[0]] === choice && "selected"), onClick: () => update(active[0], choice) }, choice)))) : h(ContactFields, { form, update }), h("div", { className: "planner-actions" }, index > 0 && h("button", { type: "button", className: "button button-outline", onClick: () => setIndex((value) => value - 1) }, "Back"), index < steps.length ? h("button", { type: "button", className: "button button-primary", onClick: () => setIndex((value) => value + 1) }, "Continue", h(ArrowRight, { size: 18 })) : h("button", { type: "submit", className: "button button-primary" }, "Submit Planner", h(ArrowRight, { size: 18 }))))))));
}

function ContactFields({ form, update }) {
  return h("div", null, h("span", { className: "eyebrow" }, "Final step"), h("h2", null, "Contact details"), h("div", { className: "form-grid" }, ["name", "email", "phone"].map((field) => h("label", { key: field }, field[0].toUpperCase() + field.slice(1), h("input", { required: field !== "email", value: form[field] || "", onChange: (event) => update(field, event.target.value), placeholder: field === "phone" ? "018..." : field }))), h("label", { className: "full" }, "Message", h("textarea", { value: form.message || "", onChange: (event) => update("message", event.target.value), placeholder: "Tell us about your preferred course or questions." }))));
}

function ContactPage({ cms, settings }) {
  const page = pageCopy(findPage(cms, "contact", "/contact"), {
    eyebrow: "Contact",
    title: "Book Your Free Study Abroad Consultation",
    copy: "Visit or contact Abroadways for country planning, applications, and visa preparation.",
    image: "/images/consultation-counsellor.png",
    seoTitle: "Contact Abroadways | Study Abroad Counselling Dhaka",
    seoDescription: "Contact Abroadways Limited at 260 Sareng Tower, Malibag, Dhaka for study abroad counselling.",
    ogTitle: "Contact Abroadways",
    ogDescription: "Book a free study abroad consultation in Dhaka.",
    ogImage: "/images/consultation-counsellor.png",
  });
  setSeo({ title: page.seoTitle, description: page.seoDescription, image: page.ogImage || page.image, ogTitle: page.ogTitle, ogDescription: page.ogDescription });
  const [form, setForm] = useState({ source: "contact", status: "new" });
  const [sent, setSent] = useState(false);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event.preventDefault();
    await api("/leads", { method: "POST", body: JSON.stringify(form) }).catch(() => null);
    setSent(true);
  };
  return h(React.Fragment, null, h(PageHero, { eyebrow: page.eyebrow, title: page.title, copy: page.copy, image: page.image }), h("section", { className: "section contact-section contact-premium" }, h("div", { className: "container contact-grid" }, h("div", { className: "contact-card contact-primary" }, h("span", { className: "eyebrow" }, "Dhaka office"), h("h2", null, "Talk to Abroadways"), h("p", null, "Use the pathway planner for a structured profile review, or contact the Dhaka office directly."), h(ContactList, { settings }), h(ButtonLink, { href: routes.planner }, "Start Pathway Planner")), h("div", { className: "contact-side" }, h("div", { className: "contact-card contact-map-card" }, h("span", { className: "eyebrow" }, "Office area"), h("div", { className: "map-area" }, "Malibag, Dhaka")), h("form", { className: "contact-card contact-form", onSubmit: submit }, h("h3", null, sent ? "Message saved" : "Send a message"), sent ? h("p", null, "Thank you. Abroadways will contact you soon.") : h(ContactFields, { form, update }), !sent && h("button", { className: "button button-primary", type: "submit" }, "Send Message", h(ArrowRight, { size: 18 })))))));
}

function ContactList({ settings = contactInfo }) {
  return h("div", { className: "contact-list" }, h(ContactItem, { icon: MapPin, title: "Address", lines: [settings.address] }), h(ContactItem, { icon: Phone, title: "Phone", lines: settings.phones, tel: true }), h(ContactItem, { icon: Mail, title: "Social", lines: ["facebook.com/abroadways", "instagram.com/abroadwaysbd"], social: true, settings }));
}

function ContactItem({ icon: Icon, title, lines, tel, social, settings = contactInfo }) {
  return h("div", { className: "contact-item" }, h("span", { className: "icon-wrap" }, h(Icon, { size: 22 })), h("div", null, h("h3", null, title), lines.map((line) => {
    if (tel) return h("a", { key: line, href: `tel:${line}`, className: "contact-line" }, line);
    if (social && line.includes("facebook")) return h("a", { key: line, href: settings.facebook, target: "_blank", rel: "noreferrer", className: "contact-line" }, line);
    if (social && line.includes("instagram")) return h("a", { key: line, href: settings.instagram, target: "_blank", rel: "noreferrer", className: "contact-line" }, line);
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
  return h("div", { className: "dashboard" }, h(DashboardSidebar), h("main", { className: "dashboard-main" }, section === "overview" && h(DashboardOverview), section === "homepage" && h(HomepageBuilder), section === "pages" && h(PageManager), section === "countries" && h(CountryManager), section === "blogs" && h(BlogManager), section === "leads" && h(LeadManagerPro), section === "media" && h(MediaManager), section === "settings" && h(SettingsManager)));
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
  const [data, setData] = useState({ pages: [], countries: [], blogs: [], leads: [] });
  React.useEffect(() => {
    let active = true;
    Promise.all(["pages", "countries", "blogs", "leads"].map((collection) => api(`/${collection}`).catch(() => ({ items: [] })))).then(([pages, countries, blogs, leads]) => {
      if (!active) return;
      setData({ pages: pages.items || [], countries: countries.items || [], blogs: blogs.items || [], leads: leads.items || [] });
    });
    return () => {
      active = false;
    };
  }, []);
  const latestLeads = [...data.leads].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || ""))).slice(0, 5);
  const latestContent = [...data.pages, ...data.countries, ...data.blogs].sort((a, b) => String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || ""))).slice(0, 5);
  const stats = [
    ["Public pages", data.pages.length, "/dashboard/pages", BookOpenCheck],
    ["Published countries", data.countries.filter((item) => item.status === "published").length, "/dashboard/countries", Compass],
    ["Published blogs", data.blogs.filter((item) => item.status === "published").length, "/dashboard/blogs", Newspaper],
    ["New leads", data.leads.filter((item) => (item.status || "new") === "new").length, "/dashboard/leads", UsersRound],
  ];
  return h("section", null, h("span", { className: "eyebrow" }, "V2 Pro"), h("h1", null, "CMS Dashboard"), h("p", null, "Manage live Abroadways content, leads, media, and settings from one protected workspace."), h("div", { className: "dashboard-stats" }, stats.map(([label, value, href, Icon]) => h(Link, { key: label, href, className: "dashboard-stat-card" }, h(Icon, { size: 22 }), h("strong", null, value), h("span", null, label)))), h("div", { className: "dashboard-panels" }, h("article", { className: "dashboard-panel" }, h("h2", null, "Latest leads"), latestLeads.length ? latestLeads.map((lead) => h("div", { key: itemId(lead) || lead.phone, className: "mini-row" }, h("strong", null, lead.name || "New lead"), h("span", null, `${lead.interestedCountry || "Country not set"} / ${lead.status || "new"}`))) : h("p", null, "No leads yet.")), h("article", { className: "dashboard-panel" }, h("h2", null, "Latest edited content"), latestContent.length ? latestContent.map((item) => h("div", { key: itemId(item) || item.slug, className: "mini-row" }, h("strong", null, item.title || item.countryName || item.heroHeading || "Untitled"), h("span", null, formatDate(item.updatedAt || item.createdAt)))) : h("p", null, "No content changes yet."))));
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
      const saved = await api(`/${collection}`, { method: "POST", body: JSON.stringify(cmsPayload(collection, draft)) });
      setItems((current) => [saved.item || saved, ...current]);
      setDraft({ title: "", slug: "", status: "published" });
    } catch {
      setError("Login expired or write access denied. Please login again.");
    }
  };
  const setField = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  return h(
    "section",
    null,
    h("div", { className: "dashboard-title" }, h("div", null, h("span", { className: "eyebrow" }, "Admin CMS"), h("h1", null, title)), h(Search, { size: 24 })),
    error && h("div", { className: "auth-alert" }, error),
    h(
      "form",
      { className: "cms-form cms-form-expanded", onSubmit: save },
      h("input", { placeholder: "Title / name", value: draft.title || draft.name || "", onChange: (event) => setDraft((current) => ({ ...current, title: event.target.value, name: event.target.value, slug: current.slug || slugify(event.target.value) })) }),
      h("input", { placeholder: "Slug or URL", value: draft.slug || draft.url || "", onChange: (event) => setDraft((current) => ({ ...current, slug: event.target.value, url: event.target.value })) }),
      h("input", { placeholder: "Hero heading", value: draft.heroHeading || "", onChange: (event) => setField("heroHeading", event.target.value) }),
      h("input", { placeholder: "Image URL", value: draft.imageUrl || "", onChange: (event) => setField("imageUrl", event.target.value) }),
      h("textarea", { placeholder: collection === "blogs" ? "Excerpt" : "Hero subtitle / overview", value: draft.heroSubtitle || draft.overview || draft.excerpt || "", onChange: (event) => {
        const key = collection === "countries" ? "overview" : collection === "blogs" ? "excerpt" : "heroSubtitle";
        setField(key, event.target.value);
      } }),
      collection === "blogs" && h("textarea", { placeholder: "Blog content", value: draft.content || "", onChange: (event) => setField("content", event.target.value) }),
      collection === "pages" && h("input", { placeholder: "Route key, for example home or study-abroad", value: draft.routeKey || "", onChange: (event) => setField("routeKey", event.target.value) }),
      h("select", { value: draft.status || "published", onChange: (event) => setDraft((current) => ({ ...current, status: event.target.value })) }, ["draft", "published", "archived"].map((item) => h("option", { key: item }, item))),
      h("button", { className: "button button-primary", type: "submit" }, h(Plus, { size: 18 }), "Create"),
    ),
    h("div", { className: "cms-table" }, items.map((item) => h("article", { key: item.id || item._id || item.slug || item.title }, h("strong", null, item.heroHeading || item.title || item.countryName || item.name || item.slug || item.url || "Untitled"), h("span", null, item.slug || item.url || item.routeKey || item.status || "CMS item"), h("em", null, item.status || "published")))),
  );
}

function cmsPayload(collection, draft) {
  const payload = { ...draft };
  if (collection === "pages") {
    payload.routeKey = payload.routeKey || (payload.slug === "/" ? "home" : String(payload.slug || "").replace(/^\//, ""));
    payload.heroHeading = payload.heroHeading || payload.title;
    payload.imageUrls = payload.imageUrl ? [payload.imageUrl] : payload.imageUrls;
  }
  if (collection === "countries") {
    payload.countryName = payload.countryName || payload.title || payload.name;
    payload.overview = payload.overview || payload.heroSubtitle;
    payload.heroImage = payload.imageUrl || payload.heroImage;
  }
  if (collection === "blogs") {
    payload.excerpt = payload.excerpt || payload.heroSubtitle;
    payload.featuredImage = payload.imageUrl || payload.featuredImage;
    payload.content = payload.content || payload.excerpt;
    payload.category = payload.category || "Guide";
  }
  return payload;
}

function useAdminCollection(collection) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const refresh = React.useCallback(() => {
    setLoading(true);
    return api(`/${collection}`)
      .then((data) => setItems(data.items || data || []))
      .catch(() => setError("Login expired or write access denied. Please login again."))
      .finally(() => setLoading(false));
  }, [collection]);
  React.useEffect(() => {
    refresh();
  }, [refresh]);
  const saveRecord = async (draft, payload) => {
    setError("");
    setMessage("");
    const id = itemId(draft);
    const result = await api(`/${collection}${id ? `/${id}` : ""}`, { method: id ? "PUT" : "POST", body: JSON.stringify(payload) });
    setMessage("Saved successfully.");
    await refresh();
    return result.item;
  };
  const patchRecord = async (item, patch) => {
    setError("");
    const id = itemId(item);
    await api(`/${collection}/${id}`, { method: "PUT", body: JSON.stringify(patch) });
    setMessage("Updated successfully.");
    await refresh();
  };
  const deleteRecord = async (item, label = "this item") => {
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;
    setError("");
    await api(`/${collection}/${itemId(item)}`, { method: "DELETE" });
    setMessage("Deleted successfully.");
    await refresh();
  };
  return { items, loading, error, message, refresh, saveRecord, patchRecord, deleteRecord, setMessage };
}

function CmsHeader({ eyebrow = "Admin CMS", title, copy, action }) {
  return h("div", { className: "dashboard-title" }, h("div", null, h("span", { className: "eyebrow" }, eyebrow), h("h1", null, title), copy && h("p", null, copy)), action);
}

function Field({ label, children, className = "" }) {
  return h("label", { className: cx("cms-field", className) }, h("span", null, label), children);
}

function TextInput({ label, value, onChange, placeholder = "", type = "text", className = "" }) {
  return h(Field, { label, className }, h("input", { type, value: value || "", placeholder, onChange: (event) => onChange(event.target.value) }));
}

function TextArea({ label, value, onChange, placeholder = "", className = "" }) {
  return h(Field, { label, className }, h("textarea", { value: value || "", placeholder, onChange: (event) => onChange(event.target.value) }));
}

function SelectInput({ label, value, onChange, options, className = "" }) {
  return h(Field, { label, className }, h("select", { value: value || "", onChange: (event) => onChange(event.target.value) }, options.map((item) => h("option", { key: item, value: item }, item || "All"))));
}

function ImageField({ label, value, onChange, className = "", folder = "abroadways/media" }) {
  const inputRef = useRef(null);
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState("");
  React.useEffect(() => {
    let active = true;
    api("/media").then((data) => {
      if (active) setMedia(data.items || []);
    }).catch(() => null);
    return () => {
      active = false;
    };
  }, []);
  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    setMessage("");
    try {
      const item = await uploadMediaFile(file, { title: file.name, altText: label, folder });
      setMedia((current) => [item, ...current]);
      onChange(item.url || item.secureUrl || "");
      setMessage("Uploaded and selected.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };
  return h(Field, { label, className: cx("image-field", className) },
    h("input", { value: value || "", placeholder: "Paste image URL or upload/select from media", onChange: (event) => onChange(event.target.value) }),
    h("div", { className: "image-field-tools" },
      h("select", { value: "", onChange: (event) => event.target.value && onChange(event.target.value) }, h("option", { value: "" }, "Select from Media Library"), media.filter(mediaUrl).map((item) => h("option", { key: itemId(item) || mediaUrl(item), value: mediaUrl(item) }, item.title || item.altText || item.publicId || mediaUrl(item)))),
      h("button", { type: "button", className: "mini-button", onClick: () => inputRef.current?.click(), disabled: uploading }, h(ImageIcon, { size: 15 }), uploading ? "Uploading..." : "Upload Image"),
      value && h("button", { type: "button", className: "mini-button", onClick: () => navigator.clipboard?.writeText(value).catch(() => null) }, h(Copy, { size: 15 }), "Copy URL"),
      h("input", { ref: inputRef, type: "file", accept: "image/*", hidden: true, onChange: (event) => upload(event.target.files?.[0]) }),
    ),
    h("div", {
      className: cx("image-dropzone", dragging && "dragging"),
      onDragOver: (event) => {
        event.preventDefault();
        setDragging(true);
      },
      onDragLeave: () => setDragging(false),
      onDrop: (event) => {
        event.preventDefault();
        setDragging(false);
        upload(event.dataTransfer.files?.[0]);
      },
    }, value ? h("img", { src: value, alt: `${label} preview` }) : h("span", null, "Drag and drop an image here")),
    message && h("small", { className: cx(message.includes("failed") || message.includes("Only") || message.includes("Choose") ? "field-error" : "field-success") }, message),
  );
}

function MediaUploadPanel({ onUploaded, title = "Upload Image" }) {
  const [status, setStatus] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const upload = async (file) => {
    if (!file) return;
    setStatus("Uploading...");
    try {
      const item = await uploadMediaFile(file, { title: file.name, altText: file.name });
      setStatus("Uploaded successfully.");
      onUploaded?.(item);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed.");
    }
  };
  return h("div", {
    className: cx("media-upload-panel", dragging && "dragging"),
    onDragOver: (event) => {
      event.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop: (event) => {
      event.preventDefault();
      setDragging(false);
      upload(event.dataTransfer.files?.[0]);
    },
  },
    h("div", null, h("strong", null, title), h("p", null, "Drag and drop an image, or choose a file from your computer."), status && h("small", { className: status.includes("failed") || status.includes("Only") ? "field-error" : "field-success" }, status)),
    h("button", { type: "button", className: "button button-primary", onClick: () => inputRef.current?.click() }, h(ImageIcon, { size: 18 }), "Upload Image"),
    h("input", { ref: inputRef, type: "file", accept: "image/*", hidden: true, onChange: (event) => upload(event.target.files?.[0]) }),
  );
}

function GalleryImageEditor({ label, value, onChange }) {
  const images = lineList(value);
  const append = (url) => onChange([...images, url].filter(Boolean).join("\n"));
  const remove = (url) => onChange(images.filter((item) => item !== url).join("\n"));
  return h("div", { className: "gallery-editor full" },
    h(ImageField, { label: `${label}: add image`, value: "", onChange: append, folder: "abroadways/countries" }),
    h(TextArea, { label: `${label} URLs`, value, onChange, placeholder: "One image URL per line" }),
    images.length ? h("div", { className: "gallery-preview-grid" }, images.map((url) => h("figure", { key: url }, h("img", { src: url, alt: "" }), h("button", { type: "button", className: "mini-button danger", onClick: () => remove(url) }, h(Trash2, { size: 14 }), "Remove")))) : h("div", { className: "notice-card" }, "No gallery images added yet."),
  );
}

function StatusBadge({ status = "published" }) {
  return h("em", { className: cx("status-badge", `status-${status}`) }, status);
}

function FormActions({ savingLabel = "Save", onCancel }) {
  return h("div", { className: "cms-form-actions" }, h("button", { className: "button button-primary", type: "submit" }, h(Save, { size: 18 }), savingLabel), h("button", { className: "button button-outline", type: "button", onClick: onCancel }, "Cancel"));
}

function renderAlerts(cms) {
  return h(React.Fragment, null, cms.error && h("div", { className: "auth-alert" }, cms.error), cms.message && h("div", { className: "success-alert" }, cms.message));
}

function HomepageBuilder() {
  const cms = useAdminCollection("pages");
  const home = cms.items.find((item) => item.routeKey === "home" || item.slug === "/");
  const [sections, setSections] = useState([]);
  const [editingId, setEditingId] = useState("");
  React.useEffect(() => {
    if (!cms.loading) setSections(normalizeHomeSections(home?.bodySections || defaultHomeSections()));
  }, [cms.loading, home?.updatedAt, home?.id, home?._id]);
  const editing = sections.find((section) => section.id === editingId);
  const updateSection = (id, patch) => setSections((current) => current.map((section) => section.id === id ? normalizeHomeSection({ ...section, ...patch }, section.order - 1) : section));
  const reorder = (id, direction) => {
    setSections((current) => {
      const list = [...current].sort((a, b) => a.order - b.order);
      const index = list.findIndex((item) => item.id === id);
      const target = index + direction;
      if (target < 0 || target >= list.length) return current;
      [list[index], list[target]] = [list[target], list[index]];
      return list.map((item, orderIndex) => ({ ...item, order: orderIndex + 1 }));
    });
  };
  const duplicate = (section) => {
    const copy = normalizeHomeSection({ ...section, id: `${section.type}-${Date.now()}`, title: `${homeSectionTitle(section)} copy`, order: sections.length + 1 }, sections.length);
    setSections((current) => [...current, copy]);
    setEditingId(copy.id);
  };
  const remove = (section) => {
    if (!window.confirm(`Delete ${homeSectionTitle(section)}?`)) return;
    setSections((current) => current.filter((item) => item.id !== section.id).map((item, index) => ({ ...item, order: index + 1 })));
    if (editingId === section.id) setEditingId("");
  };
  const addSection = (type) => {
    const section = createHomeSection(type, sections.length + 1);
    setSections((current) => [...current, section]);
    setEditingId(section.id);
  };
  const save = async () => {
    const base = home || { id: "home", routeKey: "home", slug: "/", title: "Homepage", status: "published" };
    const payload = {
      ...pagePayload(normalizePageDraft(base)),
      id: itemId(base) || "home",
      title: base.title || "Homepage",
      routeKey: "home",
      slug: "/",
      status: base.status || "published",
      bodySections: sections.map((section, index) => normalizeHomeSection({ ...section, order: index + 1 }, index)),
    };
    await cms.saveRecord(home || {}, payload);
  };
  return h("section", null,
    h(CmsHeader, { title: "Homepage Builder", copy: "Show, hide, reorder, duplicate, and edit homepage sections without touching code.", action: h("div", { className: "cms-actions" }, h(Link, { href: routes.home, className: "button button-outline", target: "_blank" }, h(Eye, { size: 18 }), "Preview Homepage"), h("button", { type: "button", className: "button button-primary", onClick: save }, h(Save, { size: 18 }), "Save Homepage")) }),
    h(renderAlerts, { ...cms }),
    h("div", { className: "homepage-builder-layout" },
      h("aside", { className: "homepage-section-list" },
        h("div", { className: "cms-section-title" }, h("h3", null, "Sections"), h("p", null, "Click a section to edit. Changes save when you press Save Homepage.")),
        h("div", { className: "section-add-row" }, h(SelectInput, { label: "Add section", value: "", onChange: (value) => value && addSection(value), options: ["", ...homeSectionTypeOptions] })),
        [...sections].sort((a, b) => a.order - b.order).map((section) => h("article", { key: section.id, className: cx("homepage-section-row", editingId === section.id && "selected") },
          h("button", { type: "button", onClick: () => setEditingId(section.id) }, h("strong", null, homeSectionTitle(section)), h("span", null, `${section.type} / ${section.enabled === false ? "hidden" : "visible"} / #${section.order}`)),
          h("div", { className: "cms-row-actions" },
            h("button", { type: "button", className: "mini-button", onClick: () => updateSection(section.id, { enabled: section.enabled === false }) }, section.enabled === false ? "Show" : "Hide"),
            h("button", { type: "button", className: "mini-button", onClick: () => reorder(section.id, -1) }, "Up"),
            h("button", { type: "button", className: "mini-button", onClick: () => reorder(section.id, 1) }, "Down"),
            h("button", { type: "button", className: "mini-button", onClick: () => duplicate(section) }, "Duplicate"),
            h("button", { type: "button", className: "mini-button danger", onClick: () => remove(section) }, "Delete"),
          ),
        )),
      ),
      h("div", { className: "homepage-section-editor" }, editing ? h(HomeSectionEditor, { section: editing, update: (patch) => updateSection(editing.id, patch) }) : h("div", { className: "notice-card" }, "Select a homepage section to edit.")),
    ),
  );
}

function createHomeSection(type, order) {
  const base = { id: `${type}-${Date.now()}`, type, key: legacyHomeKey(type), enabled: true, order, title: "", subtitle: "", backgroundColor: "", textColor: "", imageUrl: "", ctaText: "", ctaLink: "", items: [], settings: {} };
  if (type === "hero") return normalizeHomeSection({ ...base, eyebrow: "Abroadways Limited", heading: "Plan Your Study Abroad Journey with Abroadways", subtitle: "Focused counselling, applications, and visa guidance for Bangladeshi students planning New Zealand, UK, Australia, Canada, and Malaysia.", secondaryText: "Start with the right country, course, documents, and timeline.", primaryButtonText: "Book Free Consultation", primaryButtonLink: routes.planner, secondaryButtonText: "Explore Destinations", secondaryButtonLink: routes.studyAbroad, imageUrl: "/images/consultation-counsellor.png", countryChips: destinations.map((item) => item.chip) }, order - 1);
  if (type === "pathwayCards") return normalizeHomeSection({ ...base, heading: "Find Your Study Pathway", cards: pathwayFallback() }, order - 1);
  if (type === "featureCards") return normalizeHomeSection({ ...base, heading: "Plan with clarity", cards: defaultFeatureCards }, order - 1);
  if (type === "successStories") return normalizeHomeSection({ ...base, heading: "Student Journey Stories", tabs: ["All", "Canada", "Australia", "UK", "New Zealand", "Malaysia"], stories: defaultStories }, order - 1);
  if (type === "serviceChips") return normalizeHomeSection({ ...base, heading: "Support at every step", chips: defaultSupportChips.map((label) => ({ label, icon: "sparkles", color: "" })) }, order - 1);
  if (type === "insightsSection") return normalizeHomeSection({ ...base, heading: "Abroadways Study Abroad Insights", subtitle: "Guides, counselling notes, country updates, visa preparation tips, and budget planning for students and families.", imageUrl: "/images/abroadways-destination-planning.png", ctaText: "Read Guides", ctaLink: routes.blog, items: defaultInsightCountries }, order - 1);
  if (type === "consultationForm") return normalizeHomeSection({ ...base, heading: "Claim Your Free Consultation", subtitle: "Share your study interest and destination plan. Abroadways will review the details and contact you.", imageUrl: "/images/consultation-counsellor.png", formHeading: "Submit Consultation Request" }, order - 1);
  if (type === "blogPreview") return normalizeHomeSection({ ...base, heading: "Study Abroad Guides", subtitle: "Read practical destination guides written for Bangladeshi students and families.", languageTabsEnabled: true, numberOfPosts: 3, ctaText: "View Blog", ctaLink: routes.blog }, order - 1);
  if (type === "resourceTiles") return normalizeHomeSection({ ...base, heading: "Helpful resources for your next step", subtitle: "Quick links for destinations, guides, consultation, and planning.", items: defaultResourceTiles }, order - 1);
  if (type === "consultationCta") return normalizeHomeSection({ ...base, heading: "Claim your free Abroadways consultation", subtitle: "Start with a short pathway planner.", imageUrl: "/images/consultation-counsellor.png", primaryButtonText: "Book Free Consultation", primaryButtonLink: routes.planner, secondaryButtonText: "Contact Abroadways", secondaryButtonLink: routes.contact }, order - 1);
  if (type === "trustSection") return normalizeHomeSection({ ...base, heading: "Built around clarity, care, and responsible guidance", subtitle: "Trust signals kept focused and transparent.", trustItems: ["Abroadways Limited", "Student-first counselling", "UKVI Approved LanguageCert Test Centre", "Transparent process"].map((title) => ({ title, description: "", icon: "badge", imageUrl: "" })) }, order - 1);
  return normalizeHomeSection(base, order - 1);
}

function sectionArrayKey(type) {
  if (type === "pathwayCards" || type === "featureCards") return "cards";
  if (type === "successStories") return "stories";
  if (type === "serviceChips") return "chips";
  if (type === "trustSection") return "trustItems";
  if (type === "insightsSection" || type === "resourceTiles" || type === "consultationForm") return "items";
  return "items";
}

function defaultSectionItem(type) {
  if (type === "pathwayCards") return { title: "New card", icon: "NC", description: "", link: routes.studyAbroad, backgroundColor: "#eef7ff", imageUrl: "" };
  if (type === "featureCards") return { title: "New feature", description: "", bullets: ["First point"], imageUrl: "", ctaText: "Learn more", ctaLink: routes.services, backgroundColor: "#eef7ff" };
  if (type === "successStories") return { studentName: "Student journey", country: "Canada", qualification: "Application support", storyText: "Counselling experience summary.", imageUrl: "", status: "published" };
  if (type === "serviceChips") return { label: "New support item", icon: "sparkles", color: "" };
  if (type === "trustSection") return { title: "Trust item", description: "", icon: "badge", imageUrl: "" };
  if (type === "insightsSection") return { title: "Canada", link: "/study-abroad/canada", backgroundColor: "#eef7ff", imageUrl: "" };
  if (type === "resourceTiles") return { title: "New resource", description: "Short resource description.", ctaText: "Open", link: routes.blog, backgroundColor: "#eef7ff", icon: "book" };
  return { title: "New item", description: "", imageUrl: "" };
}

function HomeSectionEditor({ section, update }) {
  const type = homeSectionType(section);
  const arrayKey = sectionArrayKey(type);
  const items = Array.isArray(section[arrayKey]) ? section[arrayKey] : [];
  const setJson = (key, value) => update({ [key]: parseJsonText(value, section[key] || []) });
  return h("div", { className: "cms-editor homepage-builder-editor" },
    h("h2", null, `Edit ${homeSectionTitle(section)}`),
    h("div", { className: "cms-form-grid" },
      h(SelectInput, { label: "Section type", value: type, onChange: (value) => update({ ...createHomeSection(value, section.order), id: section.id }), options: homeSectionTypeOptions }),
      h(SelectInput, { label: "Enabled", value: String(section.enabled !== false), onChange: (value) => update({ enabled: value === "true" }), options: ["true", "false"] }),
      h(TextInput, { label: "Order", value: section.order, onChange: (value) => update({ order: Number(value) || section.order }), type: "number" }),
      h(TextInput, { label: "Eyebrow", value: section.eyebrow, onChange: (value) => update({ eyebrow: value }) }),
      h(TextInput, { label: "Heading / title", value: section.heading || section.title, onChange: (value) => update({ heading: value, title: value }), className: "full" }),
      h(TextArea, { label: "Subtitle", value: section.subtitle, onChange: (value) => update({ subtitle: value }), className: "full" }),
      type === "hero" && h(TextInput, { label: "Secondary hero line", value: section.secondaryText, onChange: (value) => update({ secondaryText: value }), className: "full" }),
      type === "consultationForm" && h(TextInput, { label: "Form heading", value: section.formHeading, onChange: (value) => update({ formHeading: value }), className: "full" }),
      h(ImageField, { label: "Main image", value: section.imageUrl, onChange: (value) => update({ imageUrl: value }), className: "full", folder: "abroadways/homepage" }),
      type === "hero" && h(ImageField, { label: "Background image", value: section.backgroundImageUrl, onChange: (value) => update({ backgroundImageUrl: value }), className: "full", folder: "abroadways/homepage" }),
      h(TextInput, { label: "Background color", value: section.backgroundColor, onChange: (value) => update({ backgroundColor: value }) }),
      h(TextInput, { label: "Text color", value: section.textColor, onChange: (value) => update({ textColor: value }) }),
      (type === "hero" || type === "consultationCta") && h(TextInput, { label: "Primary button text", value: section.primaryButtonText || section.ctaText, onChange: (value) => update({ primaryButtonText: value, ctaText: value }) }),
      (type === "hero" || type === "consultationCta") && h(TextInput, { label: "Primary button link", value: section.primaryButtonLink || section.ctaLink, onChange: (value) => update({ primaryButtonLink: value, ctaLink: value }) }),
      (type === "hero" || type === "consultationCta") && h(TextInput, { label: "Secondary button text", value: section.secondaryButtonText, onChange: (value) => update({ secondaryButtonText: value }) }),
      (type === "hero" || type === "consultationCta") && h(TextInput, { label: "Secondary button link", value: section.secondaryButtonLink, onChange: (value) => update({ secondaryButtonLink: value }) }),
      type === "hero" && h(TextArea, { label: "Country chips, one per line", value: lines(section.countryChips), onChange: (value) => update({ countryChips: lineList(value) }), className: "full" }),
      type === "blogPreview" && h(SelectInput, { label: "Language tabs enabled", value: String(section.languageTabsEnabled !== false), onChange: (value) => update({ languageTabsEnabled: value === "true" }), options: ["true", "false"] }),
      type === "blogPreview" && h(TextInput, { label: "Number of posts", value: section.numberOfPosts, onChange: (value) => update({ numberOfPosts: Number(value) || 3 }), type: "number" }),
      type === "blogPreview" && h(TextInput, { label: "CTA text", value: section.ctaText, onChange: (value) => update({ ctaText: value }) }),
      type === "blogPreview" && h(TextInput, { label: "CTA link", value: section.ctaLink, onChange: (value) => update({ ctaLink: value }) }),
      ["pathwayCards", "featureCards", "successStories", "serviceChips", "trustSection", "insightsSection", "resourceTiles", "consultationForm"].includes(type) && h("div", { className: "home-items-editor full" },
        h("div", { className: "cms-section-title" }, h("h3", null, `${arrayKey} editor`), h("p", null, "Edit structured JSON, add a starter item, or remove items below.")),
        h("button", { type: "button", className: "mini-button", onClick: () => update({ [arrayKey]: [...items, defaultSectionItem(type)] }) }, h(Plus, { size: 15 }), "Add item"),
        h(TextArea, { label: `${arrayKey} JSON`, value: jsonText(items), onChange: (value) => setJson(arrayKey, value), className: "full" }),
        h("div", { className: "home-item-list" }, items.map((item, index) => h("article", { key: `${item.title || item.label || index}-${index}` }, h("strong", null, item.title || item.label || item.studentName || `Item ${index + 1}`), h("button", { type: "button", className: "mini-button danger", onClick: () => update({ [arrayKey]: items.filter((_, itemIndex) => itemIndex !== index) }) }, h(Trash2, { size: 14 }), "Remove")))),
      ),
      h(TextArea, { label: "Advanced settings JSON", value: jsonText(section.settings || {}), onChange: (value) => update({ settings: parseJsonText(value, {}) }), className: "full" }),
    ),
  );
}

function PageManager() {
  const cms = useAdminCollection("pages");
  const [editing, setEditing] = useState(null);
  const protectedKeys = ["home", "study-abroad", "services", "about-us", "contact", "blog"];
  const startNew = () => setEditing(normalizePageDraft({ status: "draft" }));
  const startHome = () => setEditing(normalizePageDraft(cms.items.find((item) => item.routeKey === "home" || item.slug === "/") || { id: "home", routeKey: "home", slug: "/", title: "Homepage", status: "published" }));
  const save = async (draft) => {
    const saved = await cms.saveRecord(draft, pagePayload(draft));
    setEditing(normalizePageDraft(saved));
  };
  return h("section", null, h(CmsHeader, { title: "Public Pages", copy: "Edit page heroes, CTAs, SEO, and structured homepage sections.", action: h("div", { className: "cms-actions" }, h("button", { className: "button button-outline", type: "button", onClick: startHome }, h(Edit3, { size: 18 }), "Home Page Editor"), h("button", { className: "button button-primary", type: "button", onClick: startNew }, h(Plus, { size: 18 }), "New Page")) }), h(renderAlerts, { ...cms }), editing && h(PageEditor, { draft: editing, setDraft: setEditing, onSave: save, onCancel: () => setEditing(null) }), h("div", { className: "cms-table cms-table-wide" }, cms.loading ? h("article", null, "Loading pages...") : cms.items.map((item) => {
    const safeDelete = !protectedKeys.includes(item.routeKey) && item.slug !== "/";
    return h("article", { key: itemId(item) || item.slug }, h("div", { className: "cms-row-main" }, h("strong", null, item.title || item.heroHeading || "Untitled page"), h("span", null, `routeKey: ${item.routeKey || "not set"}`), h("span", null, `Path: ${item.slug || previewPathFor("pages", item)}`), h("span", null, `Updated: ${formatDate(item.updatedAt || item.createdAt)}`)), h("div", { className: "cms-row-actions" }, h(StatusBadge, { status: item.status || "published" }), h("button", { type: "button", className: "mini-button", onClick: () => setEditing(normalizePageDraft(item)) }, h(Edit3, { size: 15 }), "Edit"), h(Link, { href: previewPathFor("pages", item), className: "mini-button" }, h(Eye, { size: 15 }), "Preview"), h("button", { type: "button", className: "mini-button", onClick: () => cms.patchRecord(item, { status: item.status === "published" ? "archived" : "published" }) }, h(Archive, { size: 15 }), item.status === "published" ? "Archive" : "Publish"), safeDelete && h("button", { type: "button", className: "mini-button danger", onClick: () => cms.deleteRecord(item, item.title || "page") }, h(Trash2, { size: 15 }), "Delete")));
  })));
}

function normalizePageDraft(item = {}) {
  const isHome = item.routeKey === "home" || item.slug === "/";
  const sections = Array.isArray(item.bodySections) && item.bodySections.some((section) => ["study-pathway", "feature-cards", "success-stories", "service-bubbles", "blog-preview", "consultation-cta", "insights-section", "consultation-form", "resource-tiles"].includes(section.key)) ? item.bodySections : isHome ? defaultHomeSections() : item.bodySections || [];
  return { ...item, imageUrl: firstImage(item, ""), bodySectionsText: jsonText(sections), heroButtonText: item.heroButtonText || item.ctaButtonText || item.ctaText || "", heroButtonLink: item.heroButtonLink || item.ctaButtonLink || item.ctaLink || "", heroSecondaryButtonText: item.heroSecondaryButtonText || "", heroSecondaryButtonLink: item.heroSecondaryButtonLink || "", heroBadgeText: item.heroBadgeText || "" };
}

function pagePayload(draft) {
  return { id: draft.id, title: draft.title, routeKey: draft.routeKey || (draft.slug === "/" ? "home" : String(draft.slug || "").replace(/^\//, "")), slug: draft.slug, heroHeading: draft.heroHeading, heroSubtitle: draft.heroSubtitle, imageUrls: draft.imageUrl ? [draft.imageUrl] : [], heroButtonText: draft.heroButtonText, heroButtonLink: draft.heroButtonLink, heroSecondaryButtonText: draft.heroSecondaryButtonText, heroSecondaryButtonLink: draft.heroSecondaryButtonLink, heroBadgeText: draft.heroBadgeText, ctaTitle: draft.ctaTitle, ctaText: draft.heroButtonText || draft.ctaText, ctaButtonText: draft.heroButtonText, ctaButtonLink: draft.heroButtonLink, ctaLink: draft.heroButtonLink, bodySections: parseJsonText(draft.bodySectionsText, []), seoTitle: draft.seoTitle, seoDescription: draft.seoDescription, ogImage: draft.ogImage, status: draft.status || "draft" };
}

function HomeSectionImageTools({ draft, setDraft }) {
  const isHome = draft.routeKey === "home" || draft.slug === "/";
  if (!isHome) return null;
  const sections = parseJsonText(draft.bodySectionsText, []);
  if (!Array.isArray(sections)) return h("div", { className: "notice-card full" }, "Homepage structured sections must be valid JSON before image tools can load.");
  const targets = [];
  sections.forEach((section, sectionIndex) => {
    if (["study-pathway", "feature-cards"].includes(section.key) && Array.isArray(section.cards)) {
      section.cards.forEach((card, cardIndex) => targets.push({ label: `${section.title || section.key}: ${card.title || `Card ${cardIndex + 1}`}`, path: [sectionIndex, "cards", cardIndex, "imageUrl"], value: card.imageUrl || "" }));
    }
    if (["insights-section", "resource-tiles"].includes(section.key) && Array.isArray(section.items)) {
      section.items.forEach((item, itemIndex) => targets.push({ label: `${section.title || section.heading || section.key}: ${item.title || `Item ${itemIndex + 1}`}`, path: [sectionIndex, "items", itemIndex, "imageUrl"], value: item.imageUrl || "" }));
    }
    if (section.key === "success-stories" && Array.isArray(section.stories)) {
      section.stories.forEach((story, storyIndex) => targets.push({ label: `Success story: ${story.studentName || `Story ${storyIndex + 1}`}`, path: [sectionIndex, "stories", storyIndex, "imageUrl"], value: story.imageUrl || "" }));
    }
    if (section.key === "consultation-cta") {
      targets.push({ label: "Final consultation CTA image", path: [sectionIndex, "imageUrl"], value: section.imageUrl || "" });
    }
  });
  const updatePath = (path, value) => {
    const next = JSON.parse(JSON.stringify(sections));
    let cursor = next;
    path.slice(0, -1).forEach((key) => {
      cursor = cursor[key];
    });
    cursor[path[path.length - 1]] = value;
    setDraft((current) => ({ ...current, bodySectionsText: jsonText(next) }));
  };
  return h("div", { className: "home-image-tools full" },
    h("h3", null, "Homepage Section Images"),
    h("p", null, "Upload or select images for destination cards, feature cards, success stories, and the consultation CTA. The structured JSON updates automatically."),
    targets.length ? h("div", { className: "home-image-grid" }, targets.map((target) => h(ImageField, { key: target.path.join("."), label: target.label, value: target.value, onChange: (value) => updatePath(target.path, value), folder: "abroadways/homepage" }))) : h("div", { className: "notice-card" }, "No editable homepage image slots found."),
  );
}

function PageEditor({ draft, setDraft, onSave, onCancel }) {
  const set = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSave(draft);
  };
  return h("form", { className: "cms-editor", onSubmit: submit },
    h("h2", null, draft.routeKey === "home" ? "Home Page Editor" : itemId(draft) ? "Edit Page" : "Create Page"),
    h("div", { className: "cms-form-grid" },
      h(TextInput, { label: "Title", value: draft.title, onChange: (value) => set("title", value) }),
      h(TextInput, { label: "Route key", value: draft.routeKey, onChange: (value) => set("routeKey", value), placeholder: "home, study-abroad, services" }),
      h(TextInput, { label: "Slug/path", value: draft.slug, onChange: (value) => set("slug", value), placeholder: "/services" }),
      h(SelectInput, { label: "Status", value: draft.status, onChange: (value) => set("status", value), options: statusOptions }),
      h(TextInput, { label: "Hero heading", value: draft.heroHeading, onChange: (value) => set("heroHeading", value), className: "full" }),
      h(TextArea, { label: "Hero subtitle", value: draft.heroSubtitle, onChange: (value) => set("heroSubtitle", value), className: "full" }),
      h(ImageField, { label: "Hero image", value: draft.imageUrl, onChange: (value) => set("imageUrl", value), className: "full", folder: "abroadways/pages" }),
      h(TextInput, { label: "Hero badge text", value: draft.heroBadgeText, onChange: (value) => set("heroBadgeText", value), className: "full" }),
      h(TextInput, { label: "Hero primary button text", value: draft.heroButtonText, onChange: (value) => set("heroButtonText", value) }),
      h(TextInput, { label: "Hero primary button link", value: draft.heroButtonLink, onChange: (value) => set("heroButtonLink", value) }),
      h(TextInput, { label: "Hero secondary button text", value: draft.heroSecondaryButtonText, onChange: (value) => set("heroSecondaryButtonText", value) }),
      h(TextInput, { label: "Hero secondary button link", value: draft.heroSecondaryButtonLink, onChange: (value) => set("heroSecondaryButtonLink", value) }),
      h(TextInput, { label: "CTA title", value: draft.ctaTitle, onChange: (value) => set("ctaTitle", value) }),
      h(TextArea, { label: "Homepage structured sections JSON", value: draft.bodySectionsText, onChange: (value) => set("bodySectionsText", value), placeholder: "[{\"key\":\"study-pathway\",\"title\":\"Find Your Study Pathway\",\"cards\":[{\"title\":\"New Zealand\",\"link\":\"/study-abroad/new-zealand\"}]}]", className: "full" }),
      h(HomeSectionImageTools, { draft, setDraft }),
      h(TextInput, { label: "SEO title", value: draft.seoTitle, onChange: (value) => set("seoTitle", value), className: "full" }),
      h(TextArea, { label: "SEO description", value: draft.seoDescription, onChange: (value) => set("seoDescription", value), className: "full" }),
      h(ImageField, { label: "OG image", value: draft.ogImage, onChange: (value) => set("ogImage", value), className: "full", folder: "abroadways/pages" }),
    ),
    h(FormActions, { onCancel }),
  );
}

function CountryManager() {
  const cms = useAdminCollection("countries");
  const [editing, setEditing] = useState(null);
  const countryItems = destinations.map((fallback) => normalizeCountryDraft(cms.items.find((item) => item.slug === fallback.slug || item.countryName === fallback.name) || { id: fallback.slug, countryName: fallback.name, slug: fallback.slug, heroImage: fallback.image, overview: fallback.overview, benefits: fallback.benefits, studyAreas: fallback.studyAreas, intakes: fallback.intakes, costGuide: fallback.costGuide, requirements: fallback.requirements, visaNotes: fallback.visaNotes, faqs: fallback.faqs, status: "published" }));
  const save = async (draft) => {
    const saved = await cms.saveRecord(draft, countryPayload(draft));
    setEditing(normalizeCountryDraft(saved));
  };
  return h("section", null, h(CmsHeader, { title: "Country Pages", copy: "Only the five approved Abroadways destinations are editable here." }), h(renderAlerts, { ...cms }), editing && h(CountryEditor, { draft: editing, setDraft: setEditing, onSave: save, onCancel: () => setEditing(null) }), h("div", { className: "media-grid" }, countryItems.map((item) => h("article", { key: item.slug, className: "media-card" }, h("img", { src: item.heroImage || "/images/abroadways-hero-campus.png", alt: item.countryName }), h("div", { className: "media-card-body" }, h("strong", null, item.countryName), h(StatusBadge, { status: item.status || "published" }), h("div", { className: "cms-row-actions" }, h("button", { type: "button", className: "mini-button", onClick: () => setEditing(item) }, h(Edit3, { size: 15 }), "Edit"), h(Link, { href: `${routes.studyAbroad}/${item.slug}`, className: "mini-button" }, h(Eye, { size: 15 }), "View"), h("button", { type: "button", className: "mini-button", onClick: () => cms.patchRecord(item, { status: item.status === "published" ? "archived" : "published" }) }, h(Archive, { size: 15 }), item.status === "published" ? "Archive" : "Publish")))))));
}

function normalizeCountryDraft(item = {}) {
  return { ...item, countryName: item.countryName || item.name || item.title || "", heroImage: firstImage(item, ""), galleryImagesText: lines(item.galleryImages || item.imageGallery), benefitsText: lines(item.benefits), studyAreasText: lines(item.studyAreas), requirementsText: lines(item.requirements), faqsText: faqText(item.faqs) };
}

function countryPayload(draft) {
  return { id: draft.id, countryName: draft.countryName, slug: draft.slug, heroHeading: draft.heroHeading, heroSubtitle: draft.heroSubtitle, heroImage: draft.heroImage, galleryImages: lineList(draft.galleryImagesText), overview: draft.overview, benefits: lineList(draft.benefitsText), studyAreas: lineList(draft.studyAreasText), intakes: draft.intakes, costGuide: draft.costGuide, requirements: lineList(draft.requirementsText), visaNotes: draft.visaNotes, faqs: parseFaqText(draft.faqsText), ctaText: draft.ctaText, ctaLink: draft.ctaLink, seoTitle: draft.seoTitle, seoDescription: draft.seoDescription, ogImage: draft.ogImage, status: draft.status || "draft" };
}

function CountryEditor({ draft, setDraft, onSave, onCancel }) {
  const set = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSave(draft);
  };
  return h("form", { className: "cms-editor", onSubmit: submit },
    h("h2", null, `Edit ${draft.countryName}`),
    h("div", { className: "cms-form-grid" },
      h(SelectInput, { label: "Country", value: draft.countryName, onChange: (value) => set("countryName", value), options: allowedCountryNames }),
      h(TextInput, { label: "Slug", value: draft.slug, onChange: (value) => set("slug", value) }),
      h(SelectInput, { label: "Status", value: draft.status, onChange: (value) => set("status", value), options: statusOptions }),
      h(TextInput, { label: "Hero heading", value: draft.heroHeading, onChange: (value) => set("heroHeading", value), className: "full" }),
      h(TextArea, { label: "Hero subtitle", value: draft.heroSubtitle, onChange: (value) => set("heroSubtitle", value), className: "full" }),
      h(ImageField, { label: "Hero image", value: draft.heroImage, onChange: (value) => set("heroImage", value), className: "full", folder: "abroadways/countries" }),
      h(GalleryImageEditor, { label: "Gallery images", value: draft.galleryImagesText, onChange: (value) => set("galleryImagesText", value) }),
      h(TextArea, { label: "Overview", value: draft.overview, onChange: (value) => set("overview", value), className: "full" }),
      h(TextArea, { label: "Why study there", value: draft.benefitsText, onChange: (value) => set("benefitsText", value) }),
      h(TextArea, { label: "Popular study areas", value: draft.studyAreasText, onChange: (value) => set("studyAreasText", value) }),
      h(TextArea, { label: "Intake guidance", value: draft.intakes, onChange: (value) => set("intakes", value) }),
      h(TextArea, { label: "Approximate cost guide", value: draft.costGuide, onChange: (value) => set("costGuide", value) }),
      h(TextArea, { label: "Requirements", value: draft.requirementsText, onChange: (value) => set("requirementsText", value) }),
      h(TextArea, { label: "Visa support notes", value: draft.visaNotes, onChange: (value) => set("visaNotes", value) }),
      h(TextArea, { label: "FAQs, one per line: Question | Answer", value: draft.faqsText, onChange: (value) => set("faqsText", value), className: "full" }),
      h(TextInput, { label: "CTA text", value: draft.ctaText, onChange: (value) => set("ctaText", value) }),
      h(TextInput, { label: "CTA link", value: draft.ctaLink, onChange: (value) => set("ctaLink", value) }),
      h(TextInput, { label: "SEO title", value: draft.seoTitle, onChange: (value) => set("seoTitle", value), className: "full" }),
      h(TextArea, { label: "SEO description", value: draft.seoDescription, onChange: (value) => set("seoDescription", value), className: "full" }),
      h(ImageField, { label: "OG image", value: draft.ogImage, onChange: (value) => set("ogImage", value), className: "full", folder: "abroadways/countries" }),
    ),
    h(FormActions, { onCancel }),
  );
}

function BlogManager() {
  const cms = useAdminCollection("blogs");
  const [editing, setEditing] = useState(null);
  const newBlog = () => setEditing(normalizeBlogDraft({ status: "draft", language: "en", category: "Guide", publishedAt: new Date().toISOString().slice(0, 10) }));
  const save = async (draft) => {
    const saved = await cms.saveRecord(draft, blogPayload(draft));
    setEditing(normalizeBlogDraft(saved));
  };
  return h("section", null, h(CmsHeader, { title: "Blog Manager", copy: "Create English or Bangla study abroad guides, preview, publish, archive, and delete posts.", action: h("button", { className: "button button-primary", type: "button", onClick: newBlog }, h(Plus, { size: 18 }), "New Blog") }), h(renderAlerts, { ...cms }), editing && h(BlogEditor, { draft: editing, setDraft: setEditing, onSave: save, onCancel: () => setEditing(null) }), h("div", { className: "cms-table cms-table-wide" }, cms.loading ? h("article", null, "Loading blogs...") : cms.items.map((item) => h("article", { key: itemId(item) || item.slug }, h("div", { className: "cms-row-main" }, h("strong", null, item.title || "Untitled blog"), h("span", null, `Slug: ${item.slug || "not-set"}`), h("span", null, `Language: ${(item.language || "en").toUpperCase()}`), h("span", null, `Category: ${item.category || "Guide"}`), h("span", null, `Published: ${formatDate(item.publishedAt)}`), h("span", null, `Updated: ${formatDate(item.updatedAt || item.createdAt)}`)), h("div", { className: "cms-row-actions" }, h(StatusBadge, { status: item.status || "draft" }), h("button", { type: "button", className: "mini-button", onClick: () => setEditing(normalizeBlogDraft(item)) }, h(Edit3, { size: 15 }), "Edit"), h(Link, { href: `${routes.blog}/${item.slug}`, className: "mini-button" }, h(Eye, { size: 15 }), "Preview"), h("button", { type: "button", className: "mini-button", onClick: () => cms.patchRecord(item, { status: item.status === "published" ? "archived" : "published" }) }, h(Archive, { size: 15 }), item.status === "published" ? "Archive" : "Publish"), h("button", { type: "button", className: "mini-button danger", onClick: () => cms.deleteRecord(item, item.title || "blog post") }, h(Trash2, { size: 15 }), "Delete"))))));
}

function normalizeBlogDraft(item = {}) {
  return { ...item, language: item.language || "en", tagsText: lines(item.tags), imageUrl: item.featuredImage || item.imageUrl || "" };
}

function blogPayload(draft) {
  return { id: draft.id, title: draft.title, slug: draft.slug || slugify(draft.title), language: draft.language || "en", excerpt: draft.excerpt, content: draft.content, category: draft.category || "Guide", tags: lineList(draft.tagsText), featuredImage: draft.imageUrl, seoTitle: draft.seoTitle, metaDescription: draft.metaDescription, canonicalUrl: draft.canonicalUrl, status: draft.status || "draft", publishedAt: draft.publishedAt };
}

function BlogEditor({ draft, setDraft, onSave, onCancel }) {
  const set = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSave(draft);
  };
  return h("form", { className: "cms-editor", onSubmit: submit },
    h("h2", null, itemId(draft) ? "Edit Blog Post" : "Create Blog Post"),
    h("div", { className: "cms-form-grid" },
      h(TextInput, { label: "Title", value: draft.title, onChange: (value) => setDraft((current) => ({ ...current, title: value, slug: current.slug || slugify(value) })) }),
      h(TextInput, { label: "Slug", value: draft.slug, onChange: (value) => set("slug", slugify(value)) }),
      h(SelectInput, { label: "Language", value: draft.language, onChange: (value) => set("language", value), options: ["en", "bn"] }),
      h(SelectInput, { label: "Status", value: draft.status, onChange: (value) => set("status", value), options: statusOptions }),
      h(TextInput, { label: "Category", value: draft.category, onChange: (value) => set("category", value) }),
      h(TextInput, { label: "Published date", value: draft.publishedAt, onChange: (value) => set("publishedAt", value), type: "date" }),
      h(ImageField, { label: "Featured image", value: draft.imageUrl, onChange: (value) => set("imageUrl", value), className: "full", folder: "abroadways/blogs" }),
      h(TextArea, { label: "Excerpt", value: draft.excerpt, onChange: (value) => set("excerpt", value), className: "full" }),
      h(TextArea, { label: "Content", value: draft.content, onChange: (value) => set("content", value), className: "full" }),
      h(TextArea, { label: "Tags", value: draft.tagsText, onChange: (value) => set("tagsText", value) }),
      h(TextInput, { label: "Canonical URL", value: draft.canonicalUrl, onChange: (value) => set("canonicalUrl", value) }),
      h(TextInput, { label: "SEO title", value: draft.seoTitle, onChange: (value) => set("seoTitle", value), className: "full" }),
      h(TextArea, { label: "Meta description", value: draft.metaDescription, onChange: (value) => set("metaDescription", value), className: "full" }),
    ),
    h(FormActions, { onCancel }),
  );
}

function MediaManager() {
  const cms = useAdminCollection("media");
  const [draft, setDraft] = useState({ title: "", url: "", altText: "", publicId: "" });
  const [editing, setEditing] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState("");
  const set = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const folders = Array.from(new Set(cms.items.map((item) => item.folder).filter(Boolean))).sort();
  const filteredMedia = cms.items.filter((item) => {
    const haystack = [item.title, item.altText, item.publicId, item.url, item.folder].join(" ").toLowerCase();
    return (!search || haystack.includes(search.toLowerCase())) && (!folder || item.folder === folder);
  });
  const submit = async (event) => {
    event.preventDefault();
    await cms.saveRecord({}, { ...draft, publicId: draft.publicId || slugify(draft.title || draft.url), folder: draft.folder || "url-library", uploadedBy: "admin", uploadedAt: new Date().toISOString() });
    setDraft({ title: "", url: "", altText: "", publicId: "" });
  };
  const copyUrl = async (url) => {
    await navigator.clipboard?.writeText(url).catch(() => null);
    cms.setMessage("Image URL copied.");
  };
  const saveEdit = async (event) => {
    event.preventDefault();
    const saved = await cms.saveRecord(editing, { title: editing.title, url: editing.url, publicId: editing.publicId, folder: editing.folder, altText: editing.altText, uploadedBy: editing.uploadedBy || "admin" });
    setEditing(null);
    return saved;
  };
  return h("section", null,
    h(CmsHeader, { title: "Media Library", copy: "Upload images to Cloudinary, add image URLs, preview, copy URLs, edit alt text, and delete media items." }),
    h(renderAlerts, { ...cms }),
    h(MediaUploadPanel, { title: "Upload Image to Cloudinary", onUploaded: (item) => {
      cms.setMessage("Image uploaded successfully.");
      setPreviewUrl(mediaUrl(item));
      cms.refresh();
    } }),
    h("div", { className: "media-filter-bar" }, h(TextInput, { label: "Search media", value: search, onChange: setSearch, placeholder: "Title, alt text, URL, folder" }), h(SelectInput, { label: "Folder", value: folder, onChange: setFolder, options: ["", ...folders] })),
    previewUrl && h("div", { className: "upload-preview-card" }, h("img", { src: previewUrl, alt: "Latest upload preview" }), h("button", { type: "button", className: "mini-button", onClick: () => copyUrl(previewUrl) }, h(Copy, { size: 15 }), "Copy URL")),
    h("form", { className: "cms-editor", onSubmit: submit },
      h("h2", null, "Add Image by URL"),
      h("div", { className: "cms-form-grid" },
        h(TextInput, { label: "Image title", value: draft.title, onChange: (value) => set("title", value) }),
        h(TextInput, { label: "Public ID", value: draft.publicId, onChange: (value) => set("publicId", value) }),
        h(TextInput, { label: "Folder", value: draft.folder, onChange: (value) => set("folder", value), placeholder: "url-library" }),
        h(TextInput, { label: "Image URL", value: draft.url, onChange: (value) => set("url", value), className: "full" }),
        h(TextInput, { label: "Alt text", value: draft.altText, onChange: (value) => set("altText", value), className: "full" }),
      ),
      h("button", { className: "button button-primary", type: "submit" }, h(Plus, { size: 18 }), "Add Image"),
    ),
    editing && h("form", { className: "cms-editor", onSubmit: saveEdit },
      h("h2", null, "Edit Media"),
      h("div", { className: "cms-form-grid" },
        h(TextInput, { label: "Image title", value: editing.title, onChange: (value) => setEditing((current) => ({ ...current, title: value })) }),
        h(TextInput, { label: "Public ID", value: editing.publicId, onChange: (value) => setEditing((current) => ({ ...current, publicId: value })) }),
        h(TextInput, { label: "Folder", value: editing.folder, onChange: (value) => setEditing((current) => ({ ...current, folder: value })) }),
        h(TextInput, { label: "Image URL", value: mediaUrl(editing), onChange: (value) => setEditing((current) => ({ ...current, url: value })), className: "full" }),
        h(TextInput, { label: "Alt text", value: editing.altText, onChange: (value) => setEditing((current) => ({ ...current, altText: value })), className: "full" }),
      ),
      h(FormActions, { onCancel: () => setEditing(null) }),
    ),
    h("div", { className: "media-grid" }, filteredMedia.map((item) => {
      const url = mediaUrl(item);
      return h("article", { key: itemId(item) || url, className: "media-card" },
        h("img", { src: url, alt: item.altText || item.title || "CMS media" }),
        h("div", { className: "media-card-body" },
          h("strong", null, item.title || item.publicId || "Image"),
          h("span", null, item.altText || "No alt text"),
          h("span", null, `${item.folder || "No folder"}${item.provider ? ` / ${item.provider}` : ""}`),
          item.width && item.height && h("span", null, `${item.width}x${item.height} / ${Math.round(Number(item.bytes || 0) / 1024)} KB`),
          h("div", { className: "cms-row-actions" },
            h("button", { type: "button", className: "mini-button", onClick: () => setEditing(item) }, h(Edit3, { size: 15 }), "Edit"),
            h("button", { type: "button", className: "mini-button", onClick: () => copyUrl(url) }, h(Copy, { size: 15 }), "Copy URL"),
            h("button", { type: "button", className: "mini-button danger", onClick: () => cms.deleteRecord(item, item.title || "media item") }, h(Trash2, { size: 15 }), "Delete"),
          ),
        ),
      );
    })),
  );
}

function SettingsManager() {
  const cms = useAdminCollection("settings");
  const [draft, setDraft] = useState(null);
  React.useEffect(() => {
    if (!draft && cms.items.length) setDraft(normalizeSettingsDraft(cms.items[0]));
    if (!draft && !cms.loading && !cms.items.length) setDraft(normalizeSettingsDraft({ id: "site" }));
  }, [cms.items, cms.loading, draft]);
  const set = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event.preventDefault();
    const saved = await cms.saveRecord(draft, settingsPayload(draft));
    setDraft(normalizeSettingsDraft(saved));
  };
  return h("section", null,
    h(CmsHeader, { title: "Site Settings", copy: "Edit public logo, tagline, brand colors, contact, social, and default SEO details." }),
    h(renderAlerts, { ...cms }),
    draft ? h("form", { className: "cms-editor", onSubmit: submit },
      h("h2", null, "Global Settings"),
      h("div", { className: "cms-form-grid" },
        h(TextInput, { label: "Site name", value: draft.siteName, onChange: (value) => set("siteName", value) }),
        h("div", { className: "cms-section-title full" }, h("h3", null, "Branding"), h("p", null, "Edit navbar and footer logo, alt text, tagline, and footer description.")),
        h(ImageField, { label: "Navbar Logo URL", value: draft.navbarLogoUrl, onChange: (value) => set("navbarLogoUrl", value), className: "full", folder: "abroadways/branding" }),
        h(TextInput, { label: "Navbar Logo Alt Text", value: draft.navbarLogoAlt, onChange: (value) => set("navbarLogoAlt", value), className: "full" }),
        h(TextInput, { label: "Navbar Tagline Text", value: draft.navbarTaglineText, onChange: (value) => set("navbarTaglineText", value), className: "full" }),
        h(SelectInput, { label: "Navbar tagline enabled", value: String(draft.navbarTaglineEnabled), onChange: (value) => set("navbarTaglineEnabled", value), options: ["true", "false"] }),
        h(SelectInput, { label: "Navbar tagline position", value: draft.navbarTaglinePosition, onChange: (value) => set("navbarTaglinePosition", value), options: ["below-logo", "above-logo", "right-of-logo", "left-of-logo", "custom"] }),
        h(TextInput, { label: "Navbar tagline offset X", value: draft.navbarTaglineOffsetX, onChange: (value) => set("navbarTaglineOffsetX", value), type: "number" }),
        h(TextInput, { label: "Navbar tagline offset Y", value: draft.navbarTaglineOffsetY, onChange: (value) => set("navbarTaglineOffsetY", value), type: "number" }),
        h(TextInput, { label: "Navbar logo width", value: draft.navbarLogoWidth, onChange: (value) => set("navbarLogoWidth", value), type: "number" }),
        h(TextInput, { label: "Navbar logo height", value: draft.navbarLogoHeight, onChange: (value) => set("navbarLogoHeight", value), placeholder: "auto or pixels" }),
        h(TextInput, { label: "Navbar tagline color", value: draft.navbarTaglineColor, onChange: (value) => set("navbarTaglineColor", value), type: "color" }),
        h(TextInput, { label: "Navbar tagline font size", value: draft.navbarTaglineFontSize, onChange: (value) => set("navbarTaglineFontSize", value), type: "number" }),
        h(TextInput, { label: "Navbar tagline font weight", value: draft.navbarTaglineFontWeight, onChange: (value) => set("navbarTaglineFontWeight", value), type: "number" }),
        h(SelectInput, { label: "Navbar tagline style", value: draft.navbarTaglineStyle, onChange: (value) => set("navbarTaglineStyle", value), options: ["normal", "italic"] }),
        h(SelectInput, { label: "Navbar brand align", value: draft.navbarBrandAlign, onChange: (value) => set("navbarBrandAlign", value), options: ["left", "center"] }),
        h(ImageField, { label: "Footer Logo URL", value: draft.footerLogoUrl, onChange: (value) => set("footerLogoUrl", value), className: "full", folder: "abroadways/branding" }),
        h(TextInput, { label: "Footer Logo Alt Text", value: draft.footerLogoAlt, onChange: (value) => set("footerLogoAlt", value), className: "full" }),
        h(TextInput, { label: "Footer Tagline Text", value: draft.footerTaglineText, onChange: (value) => set("footerTaglineText", value), className: "full" }),
        h(SelectInput, { label: "Footer tagline enabled", value: String(draft.footerTaglineEnabled), onChange: (value) => set("footerTaglineEnabled", value), options: ["true", "false"] }),
        h(SelectInput, { label: "Footer tagline position", value: draft.footerTaglinePosition, onChange: (value) => set("footerTaglinePosition", value), options: ["below-logo", "above-logo", "right-of-logo", "left-of-logo", "custom"] }),
        h(TextInput, { label: "Footer tagline offset X", value: draft.footerTaglineOffsetX, onChange: (value) => set("footerTaglineOffsetX", value), type: "number" }),
        h(TextInput, { label: "Footer tagline offset Y", value: draft.footerTaglineOffsetY, onChange: (value) => set("footerTaglineOffsetY", value), type: "number" }),
        h(TextArea, { label: "Footer Description", value: draft.footerDescription, onChange: (value) => set("footerDescription", value), className: "full" }),
        h(TextInput, { label: "Footer logo width", value: draft.footerLogoWidth, onChange: (value) => set("footerLogoWidth", value), type: "number" }),
        h(TextInput, { label: "Footer logo height", value: draft.footerLogoHeight, onChange: (value) => set("footerLogoHeight", value), placeholder: "auto or pixels" }),
        h(TextInput, { label: "Footer tagline color", value: draft.footerTaglineColor, onChange: (value) => set("footerTaglineColor", value), type: "color" }),
        h(TextInput, { label: "Footer tagline font size", value: draft.footerTaglineFontSize, onChange: (value) => set("footerTaglineFontSize", value), type: "number" }),
        h(TextInput, { label: "Footer tagline font weight", value: draft.footerTaglineFontWeight, onChange: (value) => set("footerTaglineFontWeight", value), type: "number" }),
        h(SelectInput, { label: "Footer tagline style", value: draft.footerTaglineStyle, onChange: (value) => set("footerTaglineStyle", value), options: ["normal", "italic"] }),
        h(SelectInput, { label: "Footer brand align", value: draft.footerBrandAlign, onChange: (value) => set("footerBrandAlign", value), options: ["left", "center"] }),
        h(BrandingPreview, { draft }),
        h("div", { className: "cms-section-title full" }, h("h3", null, "Site Identity and SEO"), h("p", null, "Optional favicon, colors, contact details, social links, and default SEO metadata.")),
        h(ImageField, { label: "Favicon Upload", value: draft.faviconUrl, onChange: (value) => set("faviconUrl", value), className: "full", folder: "abroadways/branding" }),
        h(TextInput, { label: "Primary color", value: draft.primaryColor, onChange: (value) => set("primaryColor", value), placeholder: "#1877f2" }),
        h(TextInput, { label: "Accent color", value: draft.accentColor, onChange: (value) => set("accentColor", value), placeholder: "#f8c84e" }),
        h(TextInput, { label: "Primary contact address", value: draft.address, onChange: (value) => set("address", value), className: "full" }),
        h(TextArea, { label: "Phone numbers", value: draft.phonesText, onChange: (value) => set("phonesText", value) }),
        h(TextInput, { label: "Email, if used", value: draft.email, onChange: (value) => set("email", value) }),
        h(TextInput, { label: "Facebook URL", value: draft.facebook, onChange: (value) => set("facebook", value) }),
        h(TextInput, { label: "Instagram URL", value: draft.instagram, onChange: (value) => set("instagram", value) }),
        h(TextInput, { label: "LinkedIn URL", value: draft.linkedin, onChange: (value) => set("linkedin", value) }),
        h(TextInput, { label: "YouTube URL", value: draft.youtube, onChange: (value) => set("youtube", value) }),
        h(TextInput, { label: "WhatsApp number", value: draft.whatsappNumber, onChange: (value) => set("whatsappNumber", value) }),
        h(TextInput, { label: "Default SEO title", value: draft.defaultSeoTitle, onChange: (value) => set("defaultSeoTitle", value), className: "full" }),
        h(TextArea, { label: "Default SEO description", value: draft.defaultSeoDescription, onChange: (value) => set("defaultSeoDescription", value), className: "full" }),
        h(ImageField, { label: "Default OG image", value: draft.defaultOgImage, onChange: (value) => set("defaultOgImage", value), className: "full", folder: "abroadways/seo" }),
      ),
      h("button", { className: "button button-primary", type: "submit" }, h(Save, { size: 18 }), "Save Settings"),
    ) : h("div", { className: "notice-card" }, "Loading settings..."),
  );
}

function BrandingPreview({ draft }) {
  const settings = {
    ...mergeSettings([{ ...settingsPayload({ ...normalizeSettingsDraft({}), ...draft }) }]),
    siteName: draft.siteName || "Abroadways",
  };
  return h("div", { className: "branding-preview full" },
    h("div", { className: "cms-section-title" }, h("h3", null, "Branding Live Preview"), h("p", null, "Preview updates instantly while you edit position, size, color, and offsets.")),
    h("div", { className: "branding-preview-grid" },
      h("article", null, h("span", { className: "eyebrow" }, "Navbar"), h(BrandLogo, { settings })),
      h("article", null, h("span", { className: "eyebrow" }, "Footer"), h(BrandLogo, { settings, footer: true }), h("p", null, settings.footerDescription)),
    ),
  );
}

function normalizeSettingsDraft(item = {}) {
  const contact = item.contactInfo || {};
  const social = item.socialLinks || {};
  const defaultTagline = "Your pathway to global education";
  return {
    ...item,
    siteName: item.siteName || "Abroadways",
    navbarLogoUrl: item.navbarLogoUrl || item.siteLogoUrl || "/images/abroadways-navbar-logo-320x90.png",
    navbarLogoAlt: item.navbarLogoAlt || "Abroadways logo",
    navbarTaglineText: item.navbarTaglineText || item.navbarTagline || item.logoCaption || item.logoTagline || defaultTagline,
    navbarTagline: item.navbarTaglineText || item.navbarTagline || item.logoCaption || item.logoTagline || defaultTagline,
    navbarTaglineEnabled: boolValue(item.navbarTaglineEnabled, brandStyleDefaults.navbarTaglineEnabled),
    navbarTaglinePosition: item.navbarTaglinePosition || brandStyleDefaults.navbarTaglinePosition,
    navbarTaglineOffsetX: item.navbarTaglineOffsetX ?? brandStyleDefaults.navbarTaglineOffsetX,
    navbarTaglineOffsetY: item.navbarTaglineOffsetY ?? brandStyleDefaults.navbarTaglineOffsetY,
    navbarLogoWidth: item.navbarLogoWidth || brandStyleDefaults.navbarLogoWidth,
    navbarLogoHeight: item.navbarLogoHeight || brandStyleDefaults.navbarLogoHeight,
    navbarTaglineColor: item.navbarTaglineColor || brandStyleDefaults.navbarTaglineColor,
    navbarTaglineFontSize: item.navbarTaglineFontSize || brandStyleDefaults.navbarTaglineFontSize,
    navbarTaglineFontWeight: item.navbarTaglineFontWeight || brandStyleDefaults.navbarTaglineFontWeight,
    navbarTaglineStyle: item.navbarTaglineStyle || brandStyleDefaults.navbarTaglineStyle,
    navbarBrandAlign: item.navbarBrandAlign || brandStyleDefaults.navbarBrandAlign,
    logoCaption: item.logoCaption || item.navbarTagline || item.logoTagline || defaultTagline,
    footerLogoUrl: item.footerLogoUrl || item.navbarLogoUrl || item.siteLogoUrl || "/images/abroadways-navbar-logo-320x90.png",
    footerLogoAlt: item.footerLogoAlt || "Abroadways logo",
    footerTaglineText: item.footerTaglineText || item.footerTagline || item.navbarTagline || item.logoCaption || defaultTagline,
    footerTagline: item.footerTaglineText || item.footerTagline || item.navbarTagline || item.logoCaption || defaultTagline,
    footerTaglineEnabled: boolValue(item.footerTaglineEnabled, brandStyleDefaults.footerTaglineEnabled),
    footerTaglinePosition: item.footerTaglinePosition || brandStyleDefaults.footerTaglinePosition,
    footerTaglineOffsetX: item.footerTaglineOffsetX ?? brandStyleDefaults.footerTaglineOffsetX,
    footerTaglineOffsetY: item.footerTaglineOffsetY ?? brandStyleDefaults.footerTaglineOffsetY,
    footerDescription: item.footerDescription || "Premium study abroad counselling for New Zealand, United Kingdom, Australia, Canada, and Malaysia.",
    footerLogoWidth: item.footerLogoWidth || brandStyleDefaults.footerLogoWidth,
    footerLogoHeight: item.footerLogoHeight || brandStyleDefaults.footerLogoHeight,
    footerTaglineColor: item.footerTaglineColor || brandStyleDefaults.footerTaglineColor,
    footerTaglineFontSize: item.footerTaglineFontSize || brandStyleDefaults.footerTaglineFontSize,
    footerTaglineFontWeight: item.footerTaglineFontWeight || brandStyleDefaults.footerTaglineFontWeight,
    footerTaglineStyle: item.footerTaglineStyle || brandStyleDefaults.footerTaglineStyle,
    footerBrandAlign: item.footerBrandAlign || brandStyleDefaults.footerBrandAlign,
    faviconUrl: item.faviconUrl || "",
    primaryColor: item.primaryColor || "#1877f2",
    accentColor: item.accentColor || "#f8c84e",
    address: contact.address || contactInfo.address,
    phonesText: lines(contact.phones || contactInfo.phones),
    email: contact.email || item.email || "",
    facebook: social.facebook || item.facebook || contactInfo.facebook,
    instagram: social.instagram || item.instagram || contactInfo.instagram,
    linkedin: social.linkedin || item.linkedin || "",
    youtube: social.youtube || item.youtube || "",
    whatsappNumber: item.whatsappNumber || contact.whatsappNumber || contactInfo.whatsappNumber,
    defaultSeoTitle: item.defaultSeoTitle || "Abroadways | Study Abroad with Confidence",
    defaultSeoDescription: item.defaultSeoDescription || "Study abroad counselling for New Zealand, United Kingdom, Australia, Canada, and Malaysia.",
    defaultOgImage: item.defaultOgImage || item.ogImage || "/images/abroadways-hero-campus.png",
  };
}

function settingsPayload(draft) {
  const phones = lineList(draft.phonesText);
  return {
    id: draft.id || "site",
    siteName: draft.siteName,
    navbarLogoUrl: draft.navbarLogoUrl,
    navbarLogoAlt: draft.navbarLogoAlt,
    navbarTaglineText: draft.navbarTaglineText,
    navbarTagline: draft.navbarTaglineText,
    navbarTaglineEnabled: boolValue(draft.navbarTaglineEnabled, true),
    navbarTaglinePosition: draft.navbarTaglinePosition,
    navbarTaglineOffsetX: draft.navbarTaglineOffsetX,
    navbarTaglineOffsetY: draft.navbarTaglineOffsetY,
    navbarLogoWidth: draft.navbarLogoWidth,
    navbarLogoHeight: draft.navbarLogoHeight,
    navbarTaglineColor: draft.navbarTaglineColor,
    navbarTaglineFontSize: draft.navbarTaglineFontSize,
    navbarTaglineFontWeight: draft.navbarTaglineFontWeight,
    navbarTaglineStyle: draft.navbarTaglineStyle,
    navbarBrandAlign: draft.navbarBrandAlign,
    logoCaption: draft.navbarTaglineText,
    logoTagline: draft.navbarTaglineText,
    siteLogoUrl: draft.navbarLogoUrl,
    footerLogoUrl: draft.footerLogoUrl,
    footerLogoAlt: draft.footerLogoAlt,
    footerTaglineText: draft.footerTaglineText,
    footerTagline: draft.footerTaglineText,
    footerTaglineEnabled: boolValue(draft.footerTaglineEnabled, true),
    footerTaglinePosition: draft.footerTaglinePosition,
    footerTaglineOffsetX: draft.footerTaglineOffsetX,
    footerTaglineOffsetY: draft.footerTaglineOffsetY,
    footerDescription: draft.footerDescription,
    footerLogoWidth: draft.footerLogoWidth,
    footerLogoHeight: draft.footerLogoHeight,
    footerTaglineColor: draft.footerTaglineColor,
    footerTaglineFontSize: draft.footerTaglineFontSize,
    footerTaglineFontWeight: draft.footerTaglineFontWeight,
    footerTaglineStyle: draft.footerTaglineStyle,
    footerBrandAlign: draft.footerBrandAlign,
    faviconUrl: draft.faviconUrl,
    primaryColor: draft.primaryColor,
    accentColor: draft.accentColor,
    contactInfo: { address: draft.address || contactInfo.address, phones: phones.length ? phones : contactInfo.phones, email: draft.email, whatsappNumber: draft.whatsappNumber },
    socialLinks: { facebook: draft.facebook || contactInfo.facebook, instagram: draft.instagram || contactInfo.instagram, linkedin: draft.linkedin, youtube: draft.youtube },
    whatsappNumber: draft.whatsappNumber,
    defaultSeoTitle: draft.defaultSeoTitle,
    defaultSeoDescription: draft.defaultSeoDescription,
    defaultOgImage: draft.defaultOgImage,
    status: "published",
  };
}

function LeadManagerPro() {
  const cms = useAdminCollection("leads");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState("");
  const filtered = cms.items.filter((lead) => {
    const haystack = [lead.name, lead.email, lead.phone, lead.interestedCountry, lead.message].join(" ").toLowerCase();
    return (!search || haystack.includes(search.toLowerCase())) && (!country || lead.interestedCountry === country) && (!status || (lead.status || "new") === status) && (!source || lead.source === source);
  });
  const openLead = (lead) => {
    setSelected(lead);
    setNotes(lead.adminNotes || "");
  };
  const updateLead = async (patch) => {
    await cms.patchRecord(selected, patch);
    setSelected((current) => ({ ...current, ...patch }));
  };
  return h("section", null, h(CmsHeader, { title: "Lead Manager", copy: "Search, filter, review, and update consultation and pathway planner leads." }), h(renderAlerts, { ...cms }), h("div", { className: "lead-filters" }, h(Field, { label: "Search" }, h("input", { value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Name, phone, country, message" })), h(SelectInput, { label: "Country", value: country, onChange: setCountry, options: ["", ...allowedCountryNames] }), h(SelectInput, { label: "Status", value: status, onChange: setStatus, options: ["", ...leadStatusOptions] }), h(SelectInput, { label: "Source", value: source, onChange: setSource, options: ["", "pathway-planner", "contact"] })), h("div", { className: "lead-layout" }, h("div", { className: "cms-table lead-list" }, filtered.length ? filtered.map((lead) => h("article", { key: itemId(lead), className: cx(selected && itemId(selected) === itemId(lead) && "selected"), onClick: () => openLead(lead) }, h("strong", null, lead.name || "New lead"), h("span", null, lead.email || "No email"), h("span", null, lead.phone || "No phone"), h("span", null, lead.interestedCountry || "Country not set"), h("span", null, `${lead.source || "unknown"} / ${formatDate(lead.createdAt)}`), h(StatusBadge, { status: lead.status || "new" }))) : h("article", null, "No leads match these filters.")), selected && h("aside", { className: "lead-detail" }, h("h2", null, selected.name || "Lead detail"), h("p", null, selected.message || "No message provided."), h("dl", null, ["email", "phone", "interestedCountry", "educationLevel", "budgetRange", "intake", "examStatus", "passportStatus", "visaRefusalStatus", "source"].map((key) => h(React.Fragment, { key }, h("dt", null, key.replace(/([A-Z])/g, " $1")), h("dd", null, selected[key] || "Not set")))), h(SelectInput, { label: "Lead status", value: selected.status || "new", onChange: (value) => updateLead({ status: value }), options: leadStatusOptions }), h(TextArea, { label: "Admin notes", value: notes, onChange: setNotes }), h("div", { className: "cms-form-actions" }, h("button", { type: "button", className: "button button-primary", onClick: () => updateLead({ adminNotes: notes }) }, h(Save, { size: 18 }), "Save Notes"), ["contacted", "qualified", "closed", "lost"].map((value) => h("button", { key: value, type: "button", className: "mini-button", onClick: () => updateLead({ status: value }) }, value))))));
}

function LeadManager() {
  const [items, setItems] = useState([]);
  React.useEffect(() => {
    api("/leads").then((data) => setItems(data.items || data)).catch(() => setItems([]));
  }, []);
  return h("section", null, h("span", { className: "eyebrow" }, "Lead management"), h("h1", null, "Pathway and contact leads"), h("div", { className: "cms-table" }, items.map((lead) => h("article", { key: lead.id || lead._id }, h("strong", null, lead.name || "New lead"), h("span", null, `${lead.interestedCountry || "Country not set"} · ${lead.phone || "No phone"}`), h("em", null, lead.status || "new")))));
}

function slugify(value) {
  const slug = String(value || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return slug || `post-${Date.now()}`;
}

function NotFoundPage() {
  return h("section", { className: "section not-found" }, h("div", { className: "container" }, h("span", { className: "eyebrow" }, "404"), h("h1", null, "Page not found"), h("p", null, "This route is not part of Abroadways V2 Pro."), h(ButtonLink, { href: routes.home }, "Go Home")));
}

function FooterPro({ items = destinations, settings = contactInfo }) {
  return h("footer", { className: "footer footer-pro scholars-footer" },
    h("div", { className: "container footer-newsletter" },
      h("div", { className: "footer-brand-block" }, h(BrandLogo, { settings, footer: true }), h("p", null, settings.footerDescription || "Premium study abroad counselling for New Zealand, United Kingdom, Australia, Canada, and Malaysia.")),
      h("div", { className: "footer-social-wrap" }, h(SocialDots, { settings })),
    ),
    h("div", { className: "container footer-grid" },
      h("div", { className: "footer-intro" },
        h("p", null, "Start with a focused pathway review before choosing your destination and intake."),
        h(ButtonLink, { href: routes.planner, variant: "primary" }, "Book Free Consultation"),
      ),
      h("div", null, h("h3", null, "Destinations"), items.map((destination) => h(Link, { key: destination.slug, href: `${routes.studyAbroad}/${destination.slug}` }, destination.name))),
      h("div", null, h("h3", null, "Explore"), h(Link, { href: routes.services }, "Services"), h(Link, { href: routes.planner }, "Pathway Planner"), h(Link, { href: routes.blog }, "Blog"), h(Link, { href: routes.about }, "About Us")),
      h("div", null, h("h3", null, "Contact"), h("p", null, settings.address), settings.phones.map((phone) => h("a", { key: phone, href: `tel:${phone}` }, phone)), settings.email && h("a", { href: `mailto:${settings.email}` }, settings.email), h("a", { href: settings.facebook, target: "_blank", rel: "noreferrer" }, "Facebook"), h("a", { href: settings.instagram, target: "_blank", rel: "noreferrer" }, "Instagram")),
    ),
    h("div", { className: "footer-bottom container" }, `Copyright ${new Date().getFullYear()} Abroadways Limited. All rights reserved.`),
  );
}

function Footer({ items = destinations, settings = contactInfo }) {
  return h("footer", { className: "footer" }, h("div", { className: "container footer-grid" }, h("div", null, h("div", { className: "footer-brand" }, h("span", { className: "brand-mark" }, "A"), h("span", null, "Abroadways")), h("p", null, "Premium study abroad counselling for New Zealand, the United Kingdom, Australia, Canada, and Malaysia.")), h("div", null, h("h3", null, "Destinations"), items.map((destination) => h(Link, { key: destination.slug, href: `${routes.studyAbroad}/${destination.slug}` }, destination.name))), h("div", null, h("h3", null, "Explore"), h(Link, { href: routes.services }, "Services"), h(Link, { href: routes.planner }, "Pathway Planner"), h(Link, { href: routes.blog }, "Blog"), h(Link, { href: routes.about }, "About Us")), h("div", null, h("h3", null, "Contact"), h("p", null, settings.address), settings.phones.map((phone) => h("a", { key: phone, href: `tel:${phone}` }, phone)), h("a", { href: settings.facebook, target: "_blank", rel: "noreferrer" }, "Facebook"), h("a", { href: settings.instagram, target: "_blank", rel: "noreferrer" }, "Instagram"))), h("div", { className: "footer-bottom container" }, `© ${new Date().getFullYear()} Abroadways Limited. All rights reserved.`));
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const cms = useCmsData(path);
  const destinationItems = mergeDestinations(cms.countries);
  const blogItems = mergeBlogs(cms.blogs);
  const settings = mergeSettings(cms.settings);
  React.useEffect(() => {
    document.documentElement.style.setProperty("--blue", settings.primaryColor || "#1877f2");
    document.documentElement.style.setProperty("--royal", settings.primaryColor || "#1877f2");
    document.documentElement.style.setProperty("--gold", settings.accentColor || "#f8c84e");
    if (settings.faviconUrl) {
      let icon = document.querySelector('link[rel="icon"]');
      if (!icon) {
        icon = document.createElement("link");
        icon.rel = "icon";
        document.head.appendChild(icon);
      }
      icon.href = settings.faviconUrl;
    }
  }, [settings.primaryColor, settings.accentColor, settings.faviconUrl]);
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
    if (path === routes.home) return h(HomePage, { cms, destinations: destinationItems, blogs: blogItems });
    if (path === routes.studyAbroad) return h(StudyAbroadPage, { cms, destinations: destinationItems });
    if (path === routes.services) return h(ServicesPage, { cms });
    if (path === routes.planner) return h(PathwayPlannerPage);
    if (path === routes.blog) return h(BlogPage, { blogs: blogItems, cms });
    if (path.startsWith(`${routes.blog}/`)) {
      const post = blogItems.find((item) => path === `${routes.blog}/${item.slug}`);
      return post ? h(BlogDetailPage, { post, blogs: blogItems }) : h(NotFoundPage);
    }
    if (path === routes.about) return h(AboutPage, { cms });
    if (path === routes.contact) return h(ContactPage, { cms, settings });
    const country = destinationItems.find((destination) => path === `${routes.studyAbroad}/${destination.slug}` || path === `${routes.studyAbroad}/${destination.legacySlug}`);
    if (country) return h(CountryPage, { destination: country });
    return h(NotFoundPage);
  }, [path, cms, destinationItems, blogItems, settings]);

  const isAdminSurface = path.startsWith("/dashboard") || path === routes.login;
  return h(React.Fragment, null, !isAdminSurface && h(Navbar, { items: destinationItems, settings }), h("main", null, page), !isAdminSurface && h(FooterPro, { items: destinationItems, settings }));
}

createRoot(document.getElementById("root")).render(h(App));
