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
  CircleHelp,
  Edit3,
  Eye,
  FileCheck2,
  GripVertical,
  GraduationCap,
  Image as ImageIcon,
  Landmark,
  Layers,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Newspaper,
  Phone,
  Plane,
  Plus,
  RotateCcw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Tablet,
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
  academy: "/academy",
  partners: "/partners",
  whoAreWe: "/who-are-we",
  planner: "/pathway-planner",
  blog: "/blog",
  about: "/about-us",
  contact: "/contact",
};

const trustTagline = "UKVI approved Testing center";

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

const defaultServicePreviewCards = [
  { title: "Free Counselling", description: "Start with a profile-led discussion before choosing a country or course.", icon: "FC", backgroundColor: "#eef7ff", link: routes.planner },
  { title: "Country & Course Selection", description: "Shortlist destinations and courses that fit profile, budget, goals, and intake.", icon: "CS", backgroundColor: "#fff3e8", link: routes.services },
  { title: "University Application", description: "Prepare applications with document checks, deadline tracking, and follow-up.", icon: "UA", backgroundColor: "#eefaf4", link: routes.services },
  { title: "Visa Documentation", description: "Organise a consistent, complete, and visa-ready file with practical guidance.", icon: "VD", backgroundColor: "#f3efff", link: routes.services },
  { title: "Scholarship & Budget Planning", description: "Understand tuition, living costs, scholarship possibilities, and family budgeting.", icon: "SB", backgroundColor: "#fff9db", link: routes.services },
  { title: "Pre-departure Support", description: "Prepare for travel, accommodation, arrival, and the first weeks abroad.", icon: "PD", backgroundColor: "#eaf9ff", link: routes.services },
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
  navbarTaglineColor: "#FF6B00",
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
  footerTaglineColor: "#FF6B00",
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
  { title: "Our Blog", description: "Read the latest destination planning notes.", ctaText: "Open", link: "/blog", backgroundColor: "#fff9bf", icon: "news" },
  { title: "University Map", description: "Explore focused destination options.", ctaText: "Explore", link: "/study-abroad", backgroundColor: "#dff2ff", icon: "map" },
  { title: "Free Guides", description: "Read country planning notes.", ctaText: "Read", link: "/blog", backgroundColor: "#fff3e8", icon: "book" },
  { title: "Prospectus", description: "Ask for course and budget guidance.", ctaText: "Request", link: "/contact", backgroundColor: "#efe2ff", icon: "file" },
  { title: "Success Story", description: "See student journey examples.", ctaText: "View", link: "/#success-story", backgroundColor: "#dafbdd", icon: "trophy" },
];

const defaultSuccessMetrics = [
  { value: "5+", label: "Years of Experience", description: "A focused study abroad team for Bangladeshi students." },
  { value: "20,000+", label: "Students Guided", description: "Counselling and testing-service support across student journeys." },
  { value: "5", label: "Focus Countries", description: "New Zealand, UK, Australia, Canada, and Malaysia." },
  { value: "3", label: "Authorized Testing Services", description: "Testing-service signals managed from CMS settings." },
  { value: "1:1", label: "Counselling Support", description: "Personal guidance for country, course, and documents." },
];

const academyTracks = [
  { examName: "IELTS", title: "IELTS", examLogoUrl: "", statusBadge: "Coming Soon", description: "Future English test preparation track.", backgroundColor: "#eef7ff", icon: "IE", displayOrder: 1 },
  { examName: "TOEFL", title: "TOEFL", examLogoUrl: "", statusBadge: "Coming Soon", description: "Future academic English preparation support.", backgroundColor: "#fff3e8", icon: "TF", displayOrder: 2 },
  { examName: "GRE", title: "GRE", examLogoUrl: "", statusBadge: "Coming Soon", description: "Future graduate exam readiness pathway.", backgroundColor: "#eefaf4", icon: "GR", displayOrder: 3 },
  { examName: "GMAT", title: "GMAT", examLogoUrl: "", statusBadge: "Coming Soon", description: "Future business-school exam preparation.", backgroundColor: "#f3efff", icon: "GM", displayOrder: 4 },
  { examName: "LanguageCert", title: "LanguageCert", examLogoUrl: "", statusBadge: "Coming Soon", description: "Future LanguageCert readiness and registration guidance.", backgroundColor: "#fff9db", icon: "LC", displayOrder: 5 },
  { examName: "PTE", title: "PTE", examLogoUrl: "", statusBadge: "Coming Soon", description: "Future English test preparation track.", backgroundColor: "#eaf9ff", icon: "PT", displayOrder: 6 },
  { examName: "ELLT", title: "ELLT", examLogoUrl: "", statusBadge: "Coming Soon", description: "Future English language readiness support.", backgroundColor: "#fff0f6", icon: "EL", displayOrder: 7 },
  { examName: "Other Programs", title: "Other Programs", examLogoUrl: "", statusBadge: "Coming Soon", description: "Additional academic preparation programs will be announced later.", backgroundColor: "#f2fce9", icon: "OP", displayOrder: 8 },
];

const defaultPartners = [
  {
    partnerName: "LanguageCert",
    partnerLogoUrl: "",
    partnerLogoAlt: "LanguageCert logo",
    partnerType: "Testing Partner",
    statusText: "We are its Authorized Testing Center",
    authorizationText: "We are its Authorized Testing Center",
    description: "AbroadWays supports students with testing guidance and registration support through this authorized testing relationship.",
    websiteUrl: "",
    status: "active",
    displayOrder: 1,
  },
  {
    partnerName: "Pearson VUE",
    partnerLogoUrl: "",
    partnerLogoAlt: "Pearson VUE logo",
    partnerType: "Testing Partner",
    statusText: "We are its Authorized Test Centers",
    authorizationText: "We are its Authorized Test Centers",
    description: "AbroadWays supports secure computer-based exam delivery through authorized test center services.",
    websiteUrl: "",
    status: "active",
    displayOrder: 2,
  },
  {
    partnerName: "Other Partners",
    partnerLogoUrl: "",
    partnerLogoAlt: "Other partner logo",
    partnerType: "Editable CMS Partner",
    statusText: "Coming Soon",
    authorizationText: "Coming Soon",
    description: "Additional verified partners can be added and updated from the CMS settings page.",
    websiteUrl: "",
    status: "active",
    displayOrder: 3,
  },
];

const homeSectionTypeOptions = ["hero", "successMetrics", "pathwayCards", "featureCards", "servicesPreview", "academyTeaser", "successStories", "serviceChips", "insightsSection", "consultationForm", "blogPreview", "resourceTiles", "trustSection", "ctaBanner", "faqSection", "imageGallery", "partnerCta", "consultationCta"];
const sectionLibrary = [
  ["hero", "Hero", "Large headline, CTAs, image, chips, and animation controls.", Sparkles],
  ["successMetrics", "Success Metrics", "Conversion stats with editable values, labels, icons, and colors.", BadgeCheck],
  ["pathwayCards", "Pathway Cards", "Pastel destination and support cards with links.", Compass],
  ["featureCards", "Feature Cards", "Large two-column visual cards with bullets and CTAs.", LayoutDashboard],
  ["servicesPreview", "Services", "Service cards for counselling, applications, visas, and support.", FileCheck2],
  ["academyTeaser", "Academy Teaser", "Coming-soon exam preparation cards and CTA.", GraduationCap],
  ["successStories", "Success Stories", "Tabbed student journey cards with images and tags.", UsersRound],
  ["serviceChips", "Service Chips", "Floating support chips and center image.", Sparkles],
  ["insightsSection", "Insights", "Content feature with guide CTA and country cards.", Newspaper],
  ["consultationForm", "Consultation Form", "Homepage lead form settings and image.", Mail],
  ["blogPreview", "Blog Preview", "Latest published posts with language tabs.", BookOpenCheck],
  ["resourceTiles", "Resource Tiles", "Pastel quick-link tiles.", Layers],
  ["trustSection", "Trust Section", "Trust cards and credibility signals.", ShieldCheck],
  ["ctaBanner", "CTA Banner", "Prominent call-to-action with image or background.", ArrowRight],
  ["faqSection", "FAQ Section", "Frequently asked questions for homepage.", CircleHelp],
  ["imageGallery", "Image Gallery", "Editable image grid with captions.", ImageIcon],
  ["partnerCta", "Partner CTA", "Small CTA linking to partner information.", BadgeCheck],
];

const legacyHomeSectionKeys = {
  "study-pathway": "pathwayCards",
  "success-metrics": "successMetrics",
  "feature-cards": "featureCards",
  "services-preview": "servicesPreview",
  "success-stories": "successStories",
  "academy-teaser": "academyTeaser",
  "partners-section": "partnersSection",
  "service-bubbles": "serviceChips",
  "blog-preview": "blogPreview",
  "consultation-cta": "consultationCta",
  "trust-section": "trustSection",
  "insights-section": "insightsSection",
  "consultation-form": "consultationForm",
  "resource-tiles": "resourceTiles",
  "cta-banner": "ctaBanner",
  "faq-section": "faqSection",
  "image-gallery": "imageGallery",
  "partner-cta": "partnerCta",
};

const modernHomeSectionKeys = {
  hero: "hero",
  successMetrics: "success-metrics",
  pathwayCards: "study-pathway",
  featureCards: "feature-cards",
  servicesPreview: "services-preview",
  successStories: "success-stories",
  academyTeaser: "academy-teaser",
  partnersSection: "partners-section",
  serviceChips: "service-bubbles",
  blogPreview: "blog-preview",
  consultationCta: "consultation-cta",
  trustSection: "trust-section",
  insightsSection: "insights-section",
  consultationForm: "consultation-form",
  resourceTiles: "resource-tiles",
  ctaBanner: "cta-banner",
  faqSection: "faq-section",
  imageGallery: "image-gallery",
  partnerCta: "partner-cta",
};

const defaultFeatureCards = [
  {
    eyebrow: "BANGLADESHI STUDENTS",
    title: "Choose the Right Study Destination",
    description: "Compare countries, budgets, intakes, and course fit before committing.",
    text: "Find your best-fit country, plan budget, intake, and documents, apply with clear counselling support.",
    bullets: ["Find your best-fit country", "Plan budget, intake, and documents", "Apply with clear counselling support"],
    imageUrl: "/images/abroadways-destination-planning.png",
    ctaText: "Explore Destinations",
    ctaLink: routes.studyAbroad,
    backgroundColor: "#fff3e8",
  },
  {
    eyebrow: "STEP-BY-STEP SUPPORT",
    title: "How AbroadWays Guides You",
    description: "Move through applications, documents, and visa preparation with a structured plan.",
    text: "Profile review and country strategy, document checklist and application plan, visa file preparation and submission support.",
    bullets: ["Profile review and country strategy", "Application checklist and submission", "Visa file preparation support"],
    imageUrl: "/images/consultation-counsellor.png",
    ctaText: "View Services",
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
  if (!response.ok) {
    let message = `API error: ${response.status}`;
    try {
      const payload = await response.json();
      message = payload.error || payload.message || message;
    } catch {
      // keep the status-based fallback
    }
    throw new Error(message);
  }
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
      caption: details.caption || "",
      tags: details.tags || [],
    }),
  });
  return result.item;
}

async function replaceMediaFile(id, file, details = {}) {
  if (!id) throw new Error("Choose a media item to replace.");
  if (!file) throw new Error("Choose an image to upload.");
  if (!String(file.type || "").startsWith("image/")) throw new Error("Only image files are supported.");
  const dataUrl = await fileToDataUrl(file);
  const result = await api(`/media/${id}/replace`, {
    method: "PATCH",
    body: JSON.stringify({
      dataUrl,
      fileName: file.name,
      mimeType: file.type,
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
const mediaFolders = ["Homepage", "Countries", "Blogs", "Academy", "Partners", "Logos", "Success Stories", "Miscellaneous"];

function itemId(item) {
  return item?.id || item?._id;
}

function mediaUrl(item = {}) {
  return item.url || item.secureUrl || item.imageUrl || "";
}

function mediaTags(item = {}) {
  return Array.isArray(item.tags) ? item.tags : String(item.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean);
}

function tagsText(tags) {
  return mediaTags({ tags }).join(", ");
}

function formatFileSize(bytes) {
  const size = Number(bytes || 0);
  if (!size) return "Size unknown";
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function mediaType(item = {}) {
  return item.mimeType || (item.format ? `image/${item.format}` : item.source || item.provider || "image");
}

function isLargeMedia(item = {}) {
  return Number(item.bytes || 0) > 1024 * 1024 || Number(item.width || 0) > 2200;
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

function normalizePartners(value = defaultPartners) {
  const source = Array.isArray(value) && value.length ? value : defaultPartners;
  return source
    .map((partner, index) => ({
      partnerName: partner.partnerName || partner.name || "Partner",
      partnerLogoUrl: partner.partnerLogoUrl || partner.logoUrl || "",
      partnerLogoAlt: partner.partnerLogoAlt || partner.logoAlt || `${partner.partnerName || partner.name || "Partner"} logo`,
      partnerType: partner.partnerType || partner.type || "Partner",
      statusText: partner.statusText || partner.authorizationText || partner.authorization || "",
      authorizationText: partner.statusText || partner.authorizationText || partner.authorization || "",
      description: partner.description || "",
      websiteUrl: partner.websiteUrl || partner.url || "",
      status: partner.status || "active",
      displayOrder: Number(partner.displayOrder || index + 1),
    }))
    .filter((partner) => partner.status !== "inactive")
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

function initialsFor(value, fallback = "AW") {
  const words = String(value || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return fallback;
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words.map((word) => word[0]).join("").slice(0, 3).toUpperCase();
}

function normalizeAcademyTracks(value = academyTracks) {
  const source = Array.isArray(value) && value.length ? value : academyTracks;
  return source
    .map((track, index) => {
      const examName = track.examName || track.title || track.name || "Exam";
      return {
        ...track,
        examName,
        title: track.title || examName,
        examLogoUrl: track.examLogoUrl || track.logoUrl || track.imageUrl || "",
        examLogoAlt: track.examLogoAlt || track.logoAlt || `${examName} logo`,
        statusBadge: track.statusBadge || track.badgeText || "Coming Soon",
        icon: track.icon || initialsFor(examName),
        displayOrder: Number(track.displayOrder || index + 1),
      };
    })
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

function taglineValue(...values) {
  const value = values.find((item) => String(item || "").trim());
  const normalized = String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
  const legacyOrForbidden = !normalized || normalized === "your pathway to global education" || normalized.includes("languagecert") || normalized.includes("test centre") || normalized.includes("test center");
  return legacyOrForbidden ? trustTagline : value;
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

function colorStyle(section = {}) {
  const style = {};
  if (section.backgroundColor) style.background = section.backgroundColor;
  if (section.textColor) style.color = section.textColor;
  return style;
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
    normalized.secondaryButtonText = section.secondaryButtonText || section.heroSecondaryButtonText || "";
    normalized.secondaryButtonLink = section.secondaryButtonLink || section.heroSecondaryButtonLink || routes.studyAbroad;
    normalized.imageUrl = section.imageUrl || section.heroImageUrl || "";
    normalized.countryChips = splitList(section.countryChips || section.chips, destinations.map((item) => item.chip));
  }
  if (type === "successMetrics") {
    normalized.heading = section.heading || section.title || "Trusted by students and families";
    normalized.metrics = Array.isArray(section.metrics) ? section.metrics : Array.isArray(section.items) ? section.items : [];
  }
  if (type === "pathwayCards") {
    normalized.title = section.heading || section.title || "Find Your Study Pathway";
    normalized.cards = Array.isArray(section.cards) ? section.cards : [];
  }
  if (type === "featureCards") {
    normalized.title = section.heading || section.title || "Plan with clarity";
    normalized.cards = Array.isArray(section.cards) ? section.cards : [];
  }
  if (type === "servicesPreview") {
    normalized.heading = section.heading || section.title || "Services built around your study plan";
    normalized.cards = Array.isArray(section.cards) ? section.cards : [];
  }
  if (type === "academyTeaser") {
    normalized.heading = section.heading || section.title || "AbroadWays Academy is Coming Soon";
    normalized.ctaText = section.ctaText || section.primaryButtonText || "Explore Academy";
    normalized.ctaLink = section.ctaLink || section.primaryButtonLink || routes.academy;
    normalized.cards = Array.isArray(section.cards) ? section.cards : [];
  }
  if (type === "partnersSection") {
    normalized.heading = section.heading || section.title || "Our Partners";
    normalized.partners = Array.isArray(section.partners) ? section.partners : Array.isArray(section.items) ? section.items : [];
  }
  if (type === "successStories") {
    normalized.title = section.heading || section.title || "Our Success Story";
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
    normalized.heading = section.heading || section.title || "AbroadWays Study Abroad Insights";
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
  if (type === "ctaBanner") {
    normalized.heading = section.heading || section.title || "Ready to plan your study abroad journey?";
    normalized.ctaText = section.ctaText || section.primaryButtonText || "Book Free Consultation";
    normalized.ctaLink = section.ctaLink || section.primaryButtonLink || routes.planner;
  }
  if (type === "faqSection") {
    normalized.heading = section.heading || section.title || "Common questions";
    normalized.faqs = Array.isArray(section.faqs) ? section.faqs : Array.isArray(section.items) ? section.items : [];
  }
  if (type === "imageGallery") {
    normalized.heading = section.heading || section.title || "Gallery";
    normalized.images = Array.isArray(section.images) ? section.images : Array.isArray(section.items) ? section.items : [];
  }
  if (type === "partnerCta") {
    normalized.heading = section.heading || section.title || "View Our Partners";
    normalized.ctaText = section.ctaText || section.primaryButtonText || "View Our Partners";
    normalized.ctaLink = section.ctaLink || section.primaryButtonLink || routes.partners;
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
      heading: "Your Study Abroad Journey Starts Here",
      subtitle: "Focused counselling, applications, and visa guidance for Bangladeshi students planning New Zealand, UK, Australia, Canada, and Malaysia.",
      secondaryText: "Start with the right country, course, documents, and timeline.",
      imageUrl: "/images/consultation-counsellor.png",
      backgroundImageUrl: "/images/abroadways-hero-campus.png",
      badgeText: "Focused guidance for five study destinations",
      countryChips: ["New Zealand", "UK", "Australia", "Canada", "Malaysia"],
      decorativeImageUrls: ["/images/abroadways-destination-planning.png"],
    },
    { key: "success-metrics", type: "successMetrics", heading: "Trusted by students and families", title: "Trusted by students and families", subtitle: "Clear, realistic guidance across counselling, testing services, applications, and focused destinations.", metrics: defaultSuccessMetrics },
    { key: "study-pathway", type: "pathwayCards", title: "Find Your Study Pathway", subtitle: "Explore destinations and key support areas before you apply.", cards: pathwayFallback() },
    { key: "feature-cards", type: "featureCards", title: "Plan with clarity", subtitle: "Focused guidance from first shortlist to final departure.", cards: defaultFeatureCards },
    { key: "services-preview", type: "servicesPreview", heading: "Services built around your study plan", title: "Services built around your study plan", subtitle: "Clear support across counselling, applications, visas, budgets, and pre-departure.", cards: defaultServicePreviewCards },
    { key: "academy-teaser", type: "academyTeaser", heading: "AbroadWays Academy is Coming Soon", title: "AbroadWays Academy is Coming Soon", subtitle: "A dedicated academic preparation platform for IELTS, TOEFL, GRE, GMAT, LanguageCert, PTE, ELLT, and international study readiness.", imageUrl: "/images/abroadways-destination-planning.png", ctaText: "Explore Academy", ctaLink: routes.academy, cards: academyTracks },
    { key: "success-stories", type: "successStories", title: "Our Success Story", subtitle: "Safe, realistic examples of how guided planning can make the process clearer.", tabs: ["All", "Canada", "Australia", "UK", "New Zealand", "Malaysia"], stories: defaultStories },
    { key: "service-bubbles", type: "serviceChips", title: "Support around every step", subtitle: "Small details matter when families are planning a major decision.", chips: defaultSupportChips },
    { key: "insights-section", type: "insightsSection", heading: "AbroadWays Study Abroad Insights", subtitle: "Guides, counselling notes, country updates, visa preparation tips, and budget planning for students and families.", imageUrl: "/images/abroadways-destination-planning.png", ctaText: "Read Guides", ctaLink: routes.blog, items: defaultInsightCountries },
    { key: "consultation-form", type: "consultationForm", heading: "Claim Your Free Consultation", subtitle: "Share your study interest and destination plan. Abroadways will review the details and contact you.", imageUrl: "/images/consultation-counsellor.png", formHeading: "Submit Consultation Request" },
    { key: "blog-preview", type: "blogPreview", title: "Study Abroad Guides", subtitle: "Read practical destination guides written for Bangladeshi students and families.", numberOfPosts: 3, languageTabsEnabled: true, ctaText: "View all guides", ctaLink: routes.blog },
    { key: "resource-tiles", type: "resourceTiles", heading: "Helpful resources for your next step", subtitle: "Quick links for destinations, guides, consultation, and planning.", items: defaultResourceTiles },
    { key: "trust-section", type: "trustSection", heading: "Guidance built on clarity and care", subtitle: "Abroadways keeps the process focused, transparent, and student-first.", trustItems: [{ title: "Abroadways Limited", description: "A focused study abroad agency in Dhaka." }, { title: "Student-first counselling", description: "Plans are shaped around profile, budget, and goals." }, { title: "Authorized testing services", description: "Partner details are clearly listed on the Partners page." }, { title: "Transparent process", description: "Clear steps from counselling to pre-departure." }] },
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
    navbarTaglineText: taglineValue(settings.navbarTaglineText, settings.navbarTagline, settings.logoCaption, settings.logoTagline),
    navbarTagline: taglineValue(settings.navbarTaglineText, settings.navbarTagline, settings.logoCaption, settings.logoTagline),
    navbarTaglineEnabled: boolValue(settings.navbarTaglineEnabled, brandStyleDefaults.navbarTaglineEnabled),
    navbarTaglinePosition: settings.navbarTaglinePosition || brandStyleDefaults.navbarTaglinePosition,
    navbarTaglineOffsetX: settings.navbarTaglineOffsetX ?? brandStyleDefaults.navbarTaglineOffsetX,
    navbarTaglineOffsetY: settings.navbarTaglineOffsetY ?? brandStyleDefaults.navbarTaglineOffsetY,
    logoCaption: taglineValue(settings.logoCaption, settings.navbarTagline, settings.logoTagline),
    logoTagline: taglineValue(settings.logoTagline, settings.navbarTagline, settings.logoCaption),
    siteLogoUrl: settings.siteLogoUrl || settings.navbarLogoUrl || "",
    footerLogoUrl: settings.footerLogoUrl || "",
    footerLogoAlt: settings.footerLogoAlt || `${settings.siteName || "Abroadways"} logo`,
    footerTaglineText: taglineValue(settings.footerTaglineText, settings.footerTagline, settings.navbarTagline, settings.logoCaption),
    footerTagline: taglineValue(settings.footerTaglineText, settings.footerTagline, settings.navbarTagline, settings.logoCaption),
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
    partners: normalizePartners(settings.partners || settings.partnerAuthorizations),
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
    color: footer ? settings.footerTaglineColor || "#FF6B00" : settings.navbarTaglineColor || "#FF6B00",
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
    ["Facebook", "facebook", settings.facebook],
    ["Instagram", "instagram", settings.instagram],
    ["LinkedIn", "linkedin", settings.linkedin],
    ["YouTube", "youtube", settings.youtube],
  ].filter(([, , href]) => href);
  return h("div", { className: "social-dots" }, socials.map(([label, icon, href]) => h("a", { key: label, href, target: "_blank", rel: "noreferrer", "aria-label": label }, h(SocialIcon, { name: icon }))));
}

function SocialIcon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", focusable: "false" };
  const paths = {
    facebook: h("path", { d: "M14.4 8.3V6.8c0-.7.5-.9.9-.9h2.1V2.4l-2.9-.1c-3.2 0-4.8 1.9-4.8 5.1v.9H6.6V12h3.1v9.7h4.1V12h3.1l.5-3.7h-3z" }),
    instagram: h(React.Fragment, null,
      h("path", { d: "M7.2 2.5h9.6c2.6 0 4.7 2.1 4.7 4.7v9.6c0 2.6-2.1 4.7-4.7 4.7H7.2c-2.6 0-4.7-2.1-4.7-4.7V7.2c0-2.6 2.1-4.7 4.7-4.7zm0 3A1.7 1.7 0 0 0 5.5 7.2v9.6c0 .9.8 1.7 1.7 1.7h9.6c.9 0 1.7-.8 1.7-1.7V7.2c0-.9-.8-1.7-1.7-1.7H7.2z" }),
      h("path", { d: "M12 7.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 2.9a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1z" }),
      h("circle", { cx: 17.1, cy: 6.9, r: 1.1 }),
    ),
    linkedin: h("path", { d: "M5.1 8.7h3.8v12.1H5.1V8.7zm1.9-5.6a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4zm4.3 5.6H15v1.7h.1c.5-1 1.8-2 3.6-2 3.9 0 4.6 2.6 4.6 5.9v6.5h-3.8V15c0-1.4 0-3.3-2-3.3s-2.4 1.6-2.4 3.2v5.9h-3.8V8.7z" }),
    youtube: h("path", { d: "M21.6 7.1a3 3 0 0 0-2.1-2.1C17.6 4.5 12 4.5 12 4.5s-5.6 0-7.5.5a3 3 0 0 0-2.1 2.1C2 9 2 12 2 12s0 3 .4 4.9a3 3 0 0 0 2.1 2.1c1.9.5 7.5.5 7.5.5s5.6 0 7.5-.5a3 3 0 0 0 2.1-2.1C22 15 22 12 22 12s0-3-.4-4.9zM10 15.5v-7l6 3.5-6 3.5z" }),
  };
  return h("svg", common, paths[name] || h("circle", { cx: 12, cy: 12, r: 8 }));
}

function Navbar({ items = destinations, settings = contactInfo }) {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const currentPath = window.location.pathname;
  const isActive = (href, options = {}) => options.startsWith ? currentPath.startsWith(href) : currentPath === href;
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
        h(Link, { href: routes.home, className: cx("nav-link", isActive(routes.home) && "active") }, "Home"),
        h(
          "div",
          { className: "dropdown", onMouseEnter: () => setDropdownOpen(true), onMouseLeave: () => setDropdownOpen(false) },
          h("button", { className: cx("nav-link dropdown-toggle", isActive(routes.studyAbroad, { startsWith: true }) && "active"), type: "button", onClick: () => setDropdownOpen((value) => !value), "aria-expanded": dropdownOpen }, "Study Abroad", h(ChevronDown, { size: 15 })),
          h("div", { className: cx("dropdown-menu", dropdownOpen && "dropdown-menu-open") }, items.map((destination) => h(Link, { key: destination.slug, href: `${routes.studyAbroad}/${destination.slug}`, className: "dropdown-item", onClick: closeAll }, destination.name))),
        ),
        h(Link, { href: routes.whoAreWe, className: cx("nav-link", (isActive(routes.whoAreWe) || isActive(routes.about)) && "active") }, "About Us"),
        h(Link, { href: routes.contact, className: cx("nav-link", isActive(routes.contact) && "active") }, "Contact Us"),
        h(Link, { href: routes.academy, className: cx("nav-link", isActive(routes.academy) && "active") }, "Academy"),
        h(Link, { href: routes.partners, className: cx("nav-link", isActive(routes.partners) && "active") }, "Partners"),
        h(
          "div",
          { className: "dropdown", onMouseEnter: () => setBlogOpen(true), onMouseLeave: () => setBlogOpen(false) },
          h("button", { className: cx("nav-link dropdown-toggle", isActive(routes.blog, { startsWith: true }) && "active"), type: "button", onClick: () => setBlogOpen((value) => !value), "aria-expanded": blogOpen }, "Blog", h(ChevronDown, { size: 15 })),
          h("div", { className: cx("dropdown-menu", blogOpen && "dropdown-menu-open") },
            h(Link, { href: `${routes.blog}?language=bn`, className: "dropdown-item", onClick: closeAll }, "Bangla Blog"),
            h(Link, { href: `${routes.blog}?language=en`, className: "dropdown-item", onClick: closeAll }, "English Blog"),
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
      h(Link, { href: routes.whoAreWe, onClick: closeAll }, "About Us"),
      h(Link, { href: routes.contact, onClick: closeAll }, "Contact Us"),
      h(Link, { href: routes.academy, onClick: closeAll }, "Academy"),
      h(Link, { href: routes.partners, onClick: closeAll }, "Partners"),
      h(Link, { href: `${routes.blog}?language=bn`, onClick: closeAll }, "Bangla Blog"),
      h(Link, { href: `${routes.blog}?language=en`, onClick: closeAll }, "English Blog"),
      h(SocialDots, { settings }),
      h(ButtonLink, { href: routes.planner, className: "mobile-cta" }, "Book Free Consultation"),
    ),
  );
}

function SectionHeading({ eyebrow, title, copy }) {
  return h("div", { className: "section-heading" }, eyebrow && h("span", { className: "eyebrow" }, eyebrow), h("h2", null, title), copy && h("p", null, copy));
}

function HomePage({ cms, destinations: destinationItems, blogs, settings }) {
  const page = pageCopy(findPage(cms, "home", "/"), {
    eyebrow: "Abroadways Limited",
    title: "Your Study Abroad Journey Starts Here",
    copy: "Focused counselling, applications, and visa guidance for Bangladeshi students planning New Zealand, UK, Australia, Canada, and Malaysia.",
    image: "/images/consultation-counsellor.png",
    ctaButtonText: "Book Free Consultation",
    ctaButtonLink: routes.planner,
    secondaryButtonText: "",
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
    normalizeHomeSections(page.bodySections).filter((section) => section.enabled !== false).map((section) => h(HomeSectionRenderer, { key: section.id || `${section.type}-${section.order}`, section, page, destinations: destinationItems, blogs, settings })),
  );
}

function HomeSectionRenderer({ section, page, destinations: destinationItems, blogs, settings }) {
  const typedPage = homeSectionPage(page, section);
  switch (homeSectionType(section)) {
    case "hero":
      return h(Hero, { page: typedPage, destinations: destinationItems });
    case "successMetrics":
      return h(SuccessMetricsSection, { page: typedPage });
    case "pathwayCards":
      return h(StudyPathwaySection, { page: typedPage, destinations: destinationItems });
    case "featureCards":
      return h(FeatureCardsSection, { page: typedPage });
    case "servicesPreview":
      return h(ServicesPreviewSection, { page: typedPage });
    case "academyTeaser":
      return h(AcademyTeaserSection, { page: typedPage });
    case "partnersSection":
      return h(PartnersHomeCta, { page: typedPage });
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
    case "ctaBanner":
      return h(CtaBannerSection, { page: typedPage });
    case "faqSection":
      return h(HomepageFaqSection, { page: typedPage });
    case "imageGallery":
      return h(HomepageGallerySection, { page: typedPage });
    case "partnerCta":
      return h(PartnersHomeCta, { page: typedPage });
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
  const secondaryButtonText = heroSection.secondaryButtonText || page.secondaryButtonText || "";
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
        h("div", { className: "hero-actions" }, h(ButtonLink, { href: primaryButtonLink }, primaryButtonText), secondaryButtonText && h(ButtonLink, { href: secondaryButtonLink, variant: "outline" }, secondaryButtonText)),
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

function SuccessMetricsSection({ page }) {
  const section = sectionFor(page, "success-metrics", {
    heading: "Trusted by students and families",
    subtitle: "Clear, realistic guidance across counselling, testing services, applications, and focused destinations.",
    metrics: defaultSuccessMetrics,
  });
  const metrics = sectionItems(section, "metrics", sectionItems(section, "items", defaultSuccessMetrics));
  return h("section", { className: "success-metrics-section" },
    h("div", { className: "container success-metrics-shell" },
      h("div", { className: "success-metrics-copy" },
        h("span", { className: "eyebrow" }, section.eyebrow || "AbroadWays"),
        h("h2", null, section.heading || section.title || "Trusted by students and families"),
        section.subtitle && h("p", null, section.subtitle),
      ),
      h("div", { className: "success-metrics-grid" }, metrics.map((metric, index) => h("article", { key: `${metric.label}-${index}` },
        h("strong", null, metric.value || metric.number || "1:1"),
        h("span", null, metric.label || metric.title),
        metric.description && h("p", null, metric.description),
      ))),
    ),
  );
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
      h("div", { className: "pathway-grid" }, cards.map((card, index) => {
        const title = card.title || card.name || "Pathway";
        return h(Link, { key: `${title}-${index}`, href: card.link || routes.studyAbroad, className: "pathway-card", style: { background: card.backgroundColor || softColors[index % softColors.length] } },
          h("span", { className: "pathway-icon" }, card.icon || initialsFor(title)),
          h("strong", null, title),
          h(ArrowRight, { size: 18 }),
        );
      })),
    ),
  );
}

function FeatureCardsSection({ page }) {
  const section = sectionFor(page, "feature-cards", {
    title: "Plan with clarity",
    subtitle: "Two focused ways Abroadways helps students move from ideas to action.",
  });
  const cards = sectionCards(section, defaultFeatureCards);
  return h("section", { className: "section feature-card-section" }, h("div", { className: "container" }, h("div", { className: "feature-grid" }, cards.slice(0, 2).map((card, index) => h("article", { key: card.title, className: "big-feature-card", style: { background: card.backgroundColor || softColors[index] } }, h("div", null, h("span", { className: "eyebrow" }, card.eyebrow || "BANGLADESHI STUDENTS"), h("h2", null, card.title), h("ul", null, (card.bullets || splitList(card.text, [])).slice(0, 3).map((item) => h("li", { key: item }, h(CheckCircle2, { size: 18 }), item))), h(ButtonLink, { href: card.ctaLink || routes.services }, card.ctaText || "Learn more")), h("img", { src: card.imageUrl || "/images/abroadways-destination-planning.png", alt: "" }), h("span", { className: "feature-doodle", "aria-hidden": "true" }))))));
}

function ServicesPreviewSection({ page }) {
  const section = sectionFor(page, "services-preview", {
    heading: "Services built around your study plan",
    subtitle: "Clear support across counselling, applications, visas, budgets, and pre-departure.",
    cards: defaultServicePreviewCards,
  });
  const cards = sectionCards(section, defaultServicePreviewCards);
  return h("section", { className: "section services-preview-section" },
    h("div", { className: "container" },
      h("div", { className: "section-heading centered" }, h("h2", null, section.heading || section.title), h("span", { className: "scribble-line", "aria-hidden": "true" }), section.subtitle && h("p", null, section.subtitle)),
      h("div", { className: "services-preview-grid" }, cards.map((card, index) => h(Link, { key: `${card.title}-${index}`, href: card.link || routes.services, className: "service-preview-card", style: { background: card.backgroundColor || softColors[index % softColors.length] } },
        h("span", { className: "service-preview-icon" }, card.imageUrl ? h("img", { src: card.imageUrl, alt: "" }) : card.icon || String(card.title || "?").slice(0, 2)),
        h("strong", null, card.title),
        h("p", null, card.description),
      ))),
    ),
  );
}

function AcademyTeaserSection({ page }) {
  const section = sectionFor(page, "academy-teaser", {
    heading: "AbroadWays Academy is Coming Soon",
    subtitle: "A dedicated academic preparation platform for IELTS, TOEFL, GRE, GMAT, LanguageCert, PTE, ELLT, and international study readiness.",
    imageUrl: "/images/abroadways-destination-planning.png",
    ctaText: "Explore Academy",
    ctaLink: routes.academy,
    cards: academyTracks,
  });
  const cards = normalizeAcademyTracks(sectionCards(section, academyTracks));
  return h("section", { className: "section academy-teaser-section" },
    h("div", { className: "container academy-teaser-card" },
      h("div", { className: "academy-teaser-copy" },
        h("span", { className: "eyebrow" }, section.eyebrow || "Coming soon"),
        h("h2", null, section.heading || section.title),
        section.subtitle && h("p", null, section.subtitle),
        h("div", { className: "academy-track-pills" }, cards.map((card, index) => h("span", { key: `${card.examName}-${index}`, style: { background: card.backgroundColor || softColors[index % softColors.length] } },
          h("strong", { className: "academy-logo-mark" }, card.examLogoUrl ? h("img", { src: card.examLogoUrl, alt: card.examLogoAlt }) : card.icon || initialsFor(card.examName)),
          h("em", null, card.examName),
          h("small", null, card.statusBadge || "Coming Soon"),
        ))),
        h(ButtonLink, { href: section.ctaLink || routes.academy }, section.ctaText || "Explore Academy"),
      ),
      h("div", { className: "academy-teaser-visual" },
        h("img", { src: section.imageUrl || "/images/abroadways-destination-planning.png", alt: "Abroadways Academy preview" }),
        h("span", null, "Being built"),
      ),
    ),
  );
}

function PartnersHomeCta({ page }) {
  const section = sectionFor(page, "partners-section", {
    heading: "Our Partners",
    subtitle: "Trusted testing and education partnerships supporting AbroadWays students.",
  });
  return h("section", { className: "section partners-home-cta-section" },
    h("div", { className: "container partners-home-cta" },
      h("div", null,
        h("span", { className: "eyebrow" }, "Partners"),
        h("h2", null, section.heading || section.title || "Our Partners"),
        h("p", null, section.subtitle || "View authorized testing and education partner details managed from CMS settings."),
      ),
      h(ButtonLink, { href: routes.partners }, section.ctaText || "View Our Partners"),
    ),
  );
}

function SuccessStoriesSection({ page }) {
  const section = sectionFor(page, "success-stories", { title: "Our Success Story", tabs: ["All", "Canada", "Australia", "UK", "New Zealand", "Malaysia"] });
  const title = section.heading || section.title;
  const subtitle = section.subtitle;
  const tabs = sectionItems(section, "tabs", ["All", "Canada", "Australia", "UK", "New Zealand", "Malaysia"]);
  const stories = sectionItems(section, "stories", defaultStories);
  const [active, setActive] = useState("All");
  const visible = stories.filter((story) => active === "All" || String(story.destination || story.country || "").toLowerCase().includes(active.toLowerCase()) || (active === "UK" && String(story.destination || story.country || "").toLowerCase().includes("kingdom")));
  return h("section", { className: "section success-section", id: "success-story" }, h("div", { className: "container" }, h("div", { className: "section-heading centered success-heading" }, h("span", { className: "success-plane", "aria-hidden": "true" }), h("h2", null, title), h("span", { className: "scribble-line", "aria-hidden": "true" }), subtitle && h("p", null, subtitle)), h("div", { className: "tab-row" }, tabs.map((tab) => h("button", { key: tab, type: "button", className: cx(active === tab && "active"), onClick: () => setActive(tab) }, tab))), h("div", { className: "story-grid" }, (visible.length ? visible : stories).slice(0, 3).map((story) => h("article", { key: `${story.studentName}-${story.destination || story.country}`, className: "story-card" }, h("img", { src: story.imageUrl || "/images/consultation-counsellor.png", alt: "" }), h("div", null, h("span", null, story.destination || story.country), h("h3", null, story.studentName), h("strong", null, story.qualification), h("p", null, story.text || story.storyText), h("em", null, story.status || "Counselling journey")))))));
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
    heading: "AbroadWays Study Abroad Insights",
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
    h("div", { className: "consult-step", key: "interest" }, h("h3", null, "Study Interest"), h("div", { className: "consult-choice-grid" }, ["Higher Study", "Foundation", "Diploma", "Bachelor", "Masters"].map((item) => h("button", { key: item, type: "button", className: cx(form.educationLevel === item && "selected"), onClick: () => update("educationLevel", item) }, item)))),
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

function CtaBannerSection({ page }) {
  const section = sectionFor(page, "cta-banner", {
    eyebrow: "Next step",
    heading: "Ready to plan your study abroad journey?",
    subtitle: "Start with a focused consultation and a practical route for your preferred destination.",
    ctaText: "Book Free Consultation",
    ctaLink: routes.planner,
    imageUrl: "/images/consultation-counsellor.png",
  });
  return h("section", { className: "section homepage-cta-banner" },
    h("div", { className: "container homepage-cta-card", style: colorStyle(section) },
      h("div", null,
        h("span", { className: "eyebrow" }, section.eyebrow || "Next step"),
        h("h2", null, section.heading || section.title),
        section.subtitle && h("p", null, section.subtitle),
        h(ButtonLink, { href: section.ctaLink || section.primaryButtonLink || routes.planner }, section.ctaText || section.primaryButtonText || "Book Free Consultation"),
      ),
      section.imageUrl && h("img", { src: section.imageUrl, alt: section.imageAlt || "Abroadways consultation" }),
    ),
  );
}

function HomepageFaqSection({ page }) {
  const section = sectionFor(page, "faq-section", {
    heading: "Common questions",
    subtitle: "Short answers for students and families starting their study abroad planning.",
    faqs: [{ question: "When should I start planning?", answer: "Start early enough to compare countries, courses, budget, intake timing, and documents before applying." }],
  });
  const faqs = sectionItems(section, "faqs", sectionItems(section, "items", []));
  return h("section", { className: "section homepage-faq-section" },
    h("div", { className: "container" },
      h("div", { className: "section-heading centered" }, h("h2", null, section.heading || section.title), section.subtitle && h("p", null, section.subtitle)),
      h("div", { className: "homepage-faq-grid" }, faqs.map((item, index) => h("article", { key: `${item.question || item.title}-${index}` },
        h("h3", null, item.question || item.title || `Question ${index + 1}`),
        h("p", null, item.answer || item.description || ""),
      ))),
    ),
  );
}

function HomepageGallerySection({ page }) {
  const section = sectionFor(page, "image-gallery", {
    heading: "Study abroad visuals",
    subtitle: "Editable media slots for campus, counselling, and student journey images.",
    images: [],
  });
  const images = sectionItems(section, "images", sectionItems(section, "items", []));
  return h("section", { className: "section homepage-gallery-section" },
    h("div", { className: "container" },
      h("div", { className: "section-heading centered" }, h("h2", null, section.heading || section.title), section.subtitle && h("p", null, section.subtitle)),
      images.length ? h("div", { className: "homepage-gallery-grid" }, images.map((item, index) => {
        const url = item.imageUrl || item.url;
        return h("figure", { key: `${url || item.caption}-${index}` },
          url && h("img", { src: url, alt: item.altText || item.caption || "Abroadways gallery image" }),
          (item.caption || item.title) && h("figcaption", null, item.caption || item.title),
        );
      })) : h("div", { className: "empty-card" }, "Add gallery images from the homepage builder."),
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
  return h("section", { className: "section blog-preview scholars-blog-preview" }, h("div", { className: "container" }, h("div", { className: "section-heading centered" }, h("h2", null, section.heading || section.title), h("span", { className: "scribble-line", "aria-hidden": "true" }), section.subtitle && h("p", null, section.subtitle)), section.languageTabsEnabled !== false && h(BlogLanguageTabs, { language, setLanguage }), visible.length ? h("div", { className: "blog-grid blog-grid-large" }, visible.map((post) => h(BlogCard, { key: post.slug, post }))) : h("div", { className: "empty-card" }, language === "bn" ? "No Bangla guides published yet." : "No English guides published yet."), h("div", { className: "center-actions" }, h(ButtonLink, { href: section.ctaLink || routes.blog, variant: "outline" }, section.ctaText || "View Blog"))));
}

function BlogCard({ post }) {
  return h(Link, { href: `${routes.blog}/${post.slug}`, className: "blog-card" }, h("img", { src: post.image, alt: post.title }), h("div", { className: "blog-card-body" }, h("span", null, `${post.category} / ${formatDate(post.publishedAt)}`), h("h3", null, post.title), h("p", null, post.excerpt), h("strong", null, "Read more", h(ArrowRight, { size: 15 }))));
}

function LanguageTabs({ language, setLanguage }) {
  return h("div", { className: "tab-row language-tabs" }, [["en", "English"], ["bn", "বাংলা"]].map(([value, label]) => h("button", { key: value, type: "button", className: cx(language === value && "active"), onClick: () => setLanguage(value) }, label)));
}

function BlogLanguageTabs({ language, setLanguage }) {
  return h("div", { className: "tab-row language-tabs" }, [["en", "English"], ["bn", "বাংলা"]].map(([value, label]) => h("button", { key: value, type: "button", className: cx(language === value && "active"), onClick: () => setLanguage(value) }, label)));
}

function TrustSection({ section = {} } = {}) {
  const trust = section.trustItems?.length ? section.trustItems.map((item) => [item.title, item.description, ShieldCheck]) : [["Abroadways Limited", "", BadgeCheck], ["Student-first counselling", "", GraduationCap], ["Authorized testing services", "", ShieldCheck], ["Transparent process", "", CheckCircle2]];
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

function AcademyPage({ cms }) {
  const page = pageCopy(findPage(cms, "academy", "/academy"), {
    eyebrow: "Coming soon",
    title: "AbroadWays Academy is Coming Soon",
    copy: "A dedicated academic preparation platform for English tests, graduate exams, and international study readiness.",
    image: "/images/abroadways-destination-planning.png",
    ctaButtonText: "Join Interest List",
    ctaButtonLink: routes.contact,
    seoTitle: "Abroadways Academy | Exam Preparation Platform Coming Soon",
    seoDescription: "A future academic preparation platform by Abroadways for IELTS, TOEFL, GRE, GMAT, LanguageCert, PTE, ELLT, and international study readiness.",
    ogTitle: "AbroadWays Academy is Coming Soon",
    ogDescription: "Future academic preparation and test readiness from Abroadways.",
    ogImage: "/images/abroadways-destination-planning.png",
    bodySections: [
      { key: "academy-tracks", title: "Future exam preparation tracks", items: academyTracks },
      { key: "academy-why", title: "Why Academy", items: [
        { title: "Structured preparation", description: "Organised learning paths for test and study readiness." },
        { title: "Expert trainers", description: "Trainer-led academic support planned for future launch." },
        { title: "Study abroad aligned planning", description: "Exam preparation connected to destination and application goals." },
        { title: "Future guided practice support", description: "Practice support may be added when the platform launches." },
      ] },
    ],
  });
  const tracksSection = sectionFor(page, "academy-tracks", { title: "Future exam preparation tracks", items: academyTracks });
  const whySection = sectionFor(page, "academy-why", { title: "Why Academy", items: [] });
  const tracks = normalizeAcademyTracks(sectionItems(tracksSection, "items", academyTracks));
  const whyItems = sectionItems(whySection, "items", []);
  setSeo({ title: page.seoTitle, description: page.seoDescription, image: page.ogImage || page.image, ogTitle: page.ogTitle, ogDescription: page.ogDescription });
  return h(React.Fragment, null,
    h(PageHero, { eyebrow: page.eyebrow, title: page.title, copy: page.copy, image: page.image }),
    h("section", { className: "section academy-page-section" },
      h("div", { className: "container" },
        h("div", { className: "academy-coming-card" },
          h("span", { className: "eyebrow" }, "Separate platform later"),
          h("h2", null, "Being built as a focused academic preparation platform"),
          h("p", null, "This teaser page introduces Abroadways Academy before the full learning platform and account experience are launched."),
          h(ButtonLink, { href: page.ctaButtonLink || routes.contact }, page.ctaButtonText || "Join Interest List"),
        ),
        h(SectionHeading, { eyebrow: "Academy", title: tracksSection.title || tracksSection.heading, copy: "The full platform is not live yet. These tracks are planned for a later academic launch." }),
        h("div", { className: "academy-track-grid" }, tracks.map((track, index) => h("article", { key: `${track.examName}-${index}`, style: { background: track.backgroundColor || softColors[index % softColors.length] } },
          h("span", { className: "academy-logo-mark" }, track.examLogoUrl ? h("img", { src: track.examLogoUrl, alt: track.examLogoAlt }) : track.icon || initialsFor(track.examName)),
          h("small", null, track.statusBadge || "Coming Soon"),
          h("h3", null, track.examName),
          h("p", null, track.description),
        ))),
        h("div", { className: "academy-why-grid" }, whyItems.map((item, index) => h("article", { key: `${item.title}-${index}` }, h(CheckCircle2, { size: 22 }), h("h3", null, item.title), h("p", null, item.description)))),
      ),
    ),
    h("section", { className: "final-cta academy-final-cta" }, h("div", { className: "container final-cta-inner" }, h("span", { className: "eyebrow" }, "Need guidance now?"), h("h2", null, "Talk to Abroadways about your exam and study plan."), h(ButtonLink, { href: routes.contact, variant: "light" }, "Talk to Abroadways"))),
  );
}

function PartnersPage({ cms, settings }) {
  const page = pageCopy(findPage(cms, "partners", "/partners"), {
    eyebrow: "Our Partners",
    title: "Our Partners",
    copy: "Testing and education partner signals that support AbroadWays students and families.",
    image: "/images/abroadways-hero-campus.png",
    ctaButtonText: "Book Free Consultation",
    ctaButtonLink: routes.planner,
    seoTitle: "Our Partners | AbroadWays Authorized Testing & Education Partners",
    seoDescription: "View AbroadWays partner and authorization information, including LanguageCert, Pearson VUE, and other editable partner records.",
    ogTitle: "Our Partners | AbroadWays",
    ogDescription: "Authorized testing and education partner signals managed from AbroadWays CMS settings.",
    ogImage: "/images/abroadways-hero-campus.png",
  });
  const partners = normalizePartners(settings.partners);
  setSeo({ title: page.seoTitle, description: page.seoDescription, image: page.ogImage || page.image, ogTitle: page.ogTitle, ogDescription: page.ogDescription });
  return h(React.Fragment, null,
    h(PageHero, { eyebrow: page.eyebrow, title: page.title, copy: page.copy, image: page.image }),
    h("section", { className: "section partners-page-section" },
      h("div", { className: "container" },
        h("div", { className: "section-heading centered" },
          h("span", { className: "eyebrow" }, "Trust signals"),
          h("h2", null, "Authorized partner information, clearly presented"),
          h("span", { className: "scribble-line", "aria-hidden": "true" }),
          h("p", null, "Partner names, logos, descriptions, status text, and display order are editable from Dashboard Settings."),
        ),
        h("div", { className: "partners-page-grid" }, partners.map((partner) => h("article", { key: partner.partnerName, className: "partner-card partners-page-card" },
          h("div", { className: "partner-logo-box" }, partner.partnerLogoUrl ? h("img", { src: partner.partnerLogoUrl, alt: partner.partnerLogoAlt || partner.partnerName }) : h("span", { className: "partner-logo-fallback" }, initialsFor(partner.partnerName))),
          h("small", null, partner.partnerType),
          h("h3", null, partner.partnerName),
          h("strong", null, partner.statusText || partner.authorizationText),
          h("p", null, partner.description),
          partner.websiteUrl && h("a", { href: partner.websiteUrl, target: "_blank", rel: "noreferrer" }, "Visit website"),
        ))),
      ),
    ),
    h("section", { className: "final-cta partners-final-cta" }, h("div", { className: "container final-cta-inner" }, h("span", { className: "eyebrow" }, "Need guidance?"), h("h2", null, "Start with a clear AbroadWays counselling session."), h(ButtonLink, { href: routes.planner, variant: "light" }, "Book Free Consultation"))),
  );
}

function WhoAreWePage({ cms, destinations: destinationItems, settings }) {
  const page = pageCopy(findPage(cms, "who-are-we", "/who-are-we") || findPage(cms, "about-us", "/about-us"), {
    eyebrow: "Who Are We",
    title: "Who Are We?",
    copy: "Abroadways is a Bangladesh-based study abroad consultancy helping students plan clear pathways to New Zealand, the United Kingdom, Australia, Canada, and Malaysia.",
    image: "/images/abroadways-hero-campus.png",
    ctaButtonText: "Start Your Study Abroad Plan",
    ctaButtonLink: routes.planner,
    seoTitle: "Who Are We | Abroadways Study Abroad Consultancy Bangladesh",
    seoDescription: "Learn about Abroadways, our study abroad counselling process, focus countries, and authorized testing partnerships.",
    ogTitle: "Who Are We | Abroadways",
    ogDescription: "Abroadways study abroad counselling, focus countries, process, and authorizations.",
    ogImage: "/images/abroadways-hero-campus.png",
    bodySections: [
      { key: "about-abroadways", title: "About Abroadways", description: "Abroadways supports students with counselling, country and course selection, university application support, visa documentation guidance, and transparent pathway planning." },
      { key: "who-process", title: "Our Process", items: process.map(([title, description]) => ({ title, description })) },
    ],
  });
  const aboutSection = sectionFor(page, "about-abroadways", {});
  const processSection = sectionFor(page, "who-process", { items: process.map(([title, description]) => ({ title, description })) });
  const partners = normalizePartners(settings.partners);
  const processItems = sectionItems(processSection, "items", process.map(([title, description]) => ({ title, description })));
  setSeo({ title: page.seoTitle, description: page.seoDescription, image: page.ogImage || page.image, ogTitle: page.ogTitle, ogDescription: page.ogDescription });
  return h(React.Fragment, null,
    h(PageHero, { eyebrow: page.eyebrow, title: page.title, copy: page.copy, image: page.image }),
    h("section", { className: "section who-page-section" },
      h("div", { className: "container who-layout" },
        h("article", { className: "who-about-card" },
          h("span", { className: "eyebrow" }, "About Abroadways"),
          h("h2", null, aboutSection.title || aboutSection.heading || "A focused study abroad consultancy"),
          h("p", null, aboutSection.description || aboutSection.subtitle || "Abroadways supports students with counselling, country and course selection, university application support, visa documentation guidance, and transparent pathway planning."),
          h("ul", null, ["Study abroad counselling", "Country and course selection", "Application support", "Visa documentation guidance", "Student-first pathway planning"].map((item) => h("li", { key: item }, h(CheckCircle2, { size: 18 }), item))),
        ),
        h("div", { className: "who-country-grid" }, destinationItems.map((destination) => h(Link, { key: destination.slug, href: `${routes.studyAbroad}/${destination.slug}` }, h("img", { src: destination.image, alt: destination.name }), h("strong", null, destination.name)))),
      ),
    ),
    h("section", { className: "section partners-section" },
      h("div", { className: "container" },
        h(SectionHeading, { eyebrow: "Partners & Authorizations", title: "Verified partner signals", copy: "Partner cards are managed from CMS settings and can be changed by an admin." }),
        h("div", { className: "partner-grid" }, partners.map((partner) => h("article", { key: partner.partnerName, className: "partner-card" }, partner.partnerLogoUrl ? h("img", { src: partner.partnerLogoUrl, alt: partner.partnerLogoAlt || partner.partnerName }) : h("span", { className: "partner-logo-fallback" }, initialsFor(partner.partnerName)), h("div", null, h("small", null, partner.partnerType), h("h3", null, partner.partnerName), h("strong", null, partner.authorizationText), h("p", null, partner.description), partner.websiteUrl && h("a", { href: partner.websiteUrl, target: "_blank", rel: "noreferrer" }, "Visit website"))))),
      ),
    ),
    h("section", { className: "section who-process-section" }, h("div", { className: "container" }, h(SectionHeading, { eyebrow: "Process", title: processSection.title || processSection.heading || "Our Process", copy: "A clear pathway from profile review to pre-departure guidance." }), h("div", { className: "process-grid" }, processItems.map((item, index) => h("article", { key: item.title, className: "process-card" }, h("span", { className: "process-number" }, `0${index + 1}`), h("h3", null, item.title), h("p", null, item.description)))))),
    h("section", { className: "final-cta" }, h("div", { className: "container final-cta-inner" }, h("span", { className: "eyebrow" }, "Start planning"), h("h2", null, page.ctaTitle || "Start Your Study Abroad Plan"), h(ButtonLink, { href: page.ctaButtonLink || routes.planner, variant: "light" }, page.ctaButtonText || "Start Your Study Abroad Plan"))),
  );
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
  return h(React.Fragment, null, h(PageHero, { eyebrow: page.eyebrow, title: page.title, copy: page.copy, image: page.image }), h("section", { className: "section blog-index-section scholars-blog-preview" }, h("div", { className: "container" }, h("div", { className: "blog-index-head centered" }, h("span", { className: "eyebrow" }, "Latest insights"), h("h2", null, "Practical guides for focused decisions"), h("span", { className: "scribble-line", "aria-hidden": "true" })), h(BlogLanguageTabs, { language, setLanguage }), visible.length ? h("div", { className: "blog-grid blog-grid-large" }, visible.map((post) => h(BlogCard, { key: post.slug, post }))) : h("div", { className: "empty-card" }, language === "bn" ? "No Bangla guides published yet." : "No English guides published yet."))));
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
  const [pickerOpen, setPickerOpen] = useState(false);
  const [message, setMessage] = useState("");
  const refreshMedia = React.useCallback(() => {
    return api("/media").then((data) => setMedia(data.items || [])).catch(() => null);
  }, []);
  React.useEffect(() => {
    let active = true;
    refreshMedia().then(() => active || null);
    return () => {
      active = false;
    };
  }, [refreshMedia]);
  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    setMessage("");
    try {
      const item = await uploadMediaFile(file, { title: file.name, altText: label, folder });
      setMedia((current) => [item, ...current]);
      onChange(mediaUrl(item), item);
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
      h("button", { type: "button", className: "mini-button", onClick: () => setPickerOpen(true) }, h(Search, { size: 15 }), "Select from Media"),
      h("button", { type: "button", className: "mini-button", onClick: () => inputRef.current?.click(), disabled: uploading }, h(ImageIcon, { size: 15 }), uploading ? "Uploading..." : "Upload New"),
      value && h("button", { type: "button", className: "mini-button", onClick: () => navigator.clipboard?.writeText(value).catch(() => null) }, h(Copy, { size: 15 }), "Copy URL"),
      value && h("button", { type: "button", className: "mini-button danger", onClick: () => onChange("") }, h(X, { size: 15 }), "Clear"),
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
    pickerOpen && h(MediaPickerModal, {
      media,
      folder,
      onClose: () => setPickerOpen(false),
      onRefresh: refreshMedia,
      onSelect: (item) => {
        onChange(mediaUrl(item), item);
        setPickerOpen(false);
      },
      onPasteUrl: (url) => {
        onChange(url);
        setPickerOpen(false);
      },
    }),
  );
}

function MediaPickerModal({ media = [], folder = "abroadways/media", onClose, onRefresh, onSelect, onPasteUrl }) {
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [folderFilter, setFolderFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const folders = Array.from(new Set([...mediaFolders, ...media.map((item) => item.folder).filter(Boolean)])).sort();
  const tags = Array.from(new Set(media.flatMap(mediaTags))).sort();
  const filtered = media.filter((item) => {
    const haystack = [item.title, item.altText, item.caption, item.publicId, item.url, item.folder, ...mediaTags(item)].join(" ").toLowerCase();
    return mediaUrl(item) && (!search || haystack.includes(search.toLowerCase())) && (!folderFilter || item.folder === folderFilter) && (!tagFilter || mediaTags(item).includes(tagFilter));
  });
  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const item = await uploadMediaFile(file, { title: file.name, altText: file.name, folder });
      await onRefresh?.();
      onSelect(item);
    } finally {
      setUploading(false);
    }
  };
  return h("div", { className: "media-picker-backdrop", role: "dialog", "aria-modal": "true" },
    h("div", { className: "media-picker-modal" },
      h("div", { className: "media-picker-head" },
        h("div", null, h("span", { className: "eyebrow" }, "Media Library"), h("h2", null, "Select Image"), h("p", null, "Search existing media, upload a new image, or paste a URL.")),
        h("button", { type: "button", className: "icon-button", onClick: onClose, "aria-label": "Close media picker" }, h(X, { size: 18 })),
      ),
      h("div", { className: "media-picker-tools" },
        h(TextInput, { label: "Search", value: search, onChange: setSearch, placeholder: "Title, alt, folder, tags" }),
        h(SelectInput, { label: "Folder", value: folderFilter, onChange: setFolderFilter, options: ["", ...folders] }),
        h(SelectInput, { label: "Tag", value: tagFilter, onChange: setTagFilter, options: ["", ...tags] }),
        h("div", { className: "media-picker-upload" }, h("button", { type: "button", className: "button button-outline", onClick: () => inputRef.current?.click(), disabled: uploading }, h(ImageIcon, { size: 16 }), uploading ? "Uploading..." : "Upload New"), h("input", { ref: inputRef, type: "file", accept: "image/*", hidden: true, onChange: (event) => upload(event.target.files?.[0]) })),
      ),
      h("div", { className: "media-picker-url-row" }, h("input", { value: url, placeholder: "Paste an external image URL", onChange: (event) => setUrl(event.target.value) }), h("button", { type: "button", className: "mini-button", disabled: !url, onClick: () => onPasteUrl(url) }, "Use URL")),
      h("div", { className: "media-picker-grid" }, filtered.length ? filtered.map((item) => h("button", { key: itemId(item) || mediaUrl(item), type: "button", onClick: () => onSelect(item) },
        h("img", { src: mediaUrl(item), alt: item.altText || item.title || "Media item", loading: "lazy" }),
        h("span", null, item.title || item.publicId || "Image"),
        h("small", null, item.altText || "Missing alt text"),
      )) : h("div", { className: "empty-card" }, "No media matched your filters.")),
    ),
  );
}

function MediaUploadPanel({ onUploaded, title = "Upload Image", folder = "abroadways/media", tags = [] }) {
  const [status, setStatus] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const upload = async (file) => {
    if (!file) return;
    setStatus("Uploading...");
    try {
      const item = await uploadMediaFile(file, { title: file.name, altText: file.name, folder, tags });
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
  const [savedSections, setSavedSections] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [draggingId, setDraggingId] = useState("");
  const [showLibrary, setShowLibrary] = useState(false);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [activeTab, setActiveTab] = useState("sections");
  const [lastSaved, setLastSaved] = useState("");
  const [saving, setSaving] = useState(false);
  React.useEffect(() => {
    if (!cms.loading) {
      const next = normalizeHomeSections(home?.bodySections || defaultHomeSections());
      setSections(next);
      setSavedSections(next);
      setEditingId((current) => current || next[0]?.id || "");
    }
  }, [cms.loading, home?.updatedAt, home?.id, home?._id]);
  const orderedSections = [...sections].sort((a, b) => a.order - b.order);
  const editing = orderedSections.find((section) => section.id === editingId);
  const dirty = jsonText(orderedSections) !== jsonText(savedSections);
  React.useEffect(() => {
    const warn = (event) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  const normalizeOrders = (list) => list.map((item, index) => normalizeHomeSection({ ...item, order: index + 1 }, index));
  const updateSection = (id, patch) => setSections((current) => normalizeOrders(current.map((section) => section.id === id ? { ...section, ...patch } : section).sort((a, b) => a.order - b.order)));
  const moveSection = (id, direction) => {
    setSections((current) => {
      const list = [...current].sort((a, b) => a.order - b.order);
      const index = list.findIndex((item) => item.id === id);
      const target = index + direction;
      if (target < 0 || target >= list.length) return current;
      [list[index], list[target]] = [list[target], list[index]];
      return normalizeOrders(list);
    });
  };
  const dropSection = (targetId) => {
    if (!draggingId || draggingId === targetId) return;
    setSections((current) => {
      const list = [...current].sort((a, b) => a.order - b.order);
      const from = list.findIndex((item) => item.id === draggingId);
      const to = list.findIndex((item) => item.id === targetId);
      if (from < 0 || to < 0) return current;
      const [item] = list.splice(from, 1);
      list.splice(to, 0, item);
      return normalizeOrders(list);
    });
    setDraggingId("");
  };
  const duplicate = (section) => {
    const list = [...orderedSections];
    const index = list.findIndex((item) => item.id === section.id);
    const copyTitle = `${homeSectionTitle(section)} Copy`;
    const copy = normalizeHomeSection({ ...section, id: `${section.type}-${Date.now()}`, heading: copyTitle, title: copyTitle, order: index + 2 }, index + 1);
    list.splice(index + 1, 0, copy);
    setSections(normalizeOrders(list));
    setEditingId(copy.id);
    setActiveTab("edit");
  };
  const remove = (section) => {
    if (!window.confirm(`Delete ${homeSectionTitle(section)}?`)) return;
    setSections((current) => normalizeOrders(current.filter((item) => item.id !== section.id).sort((a, b) => a.order - b.order)));
    if (editingId === section.id) setEditingId("");
  };
  const addSection = (type) => {
    const section = createHomeSection(type, orderedSections.length + 1);
    setSections((current) => normalizeOrders([...current, section].sort((a, b) => a.order - b.order)));
    setEditingId(section.id);
    setShowLibrary(false);
    setActiveTab("edit");
  };
  const reset = () => {
    if (!dirty || window.confirm("Reset all unsaved homepage builder changes?")) {
      setSections(savedSections);
      setEditingId(savedSections[0]?.id || "");
    }
  };
  const restoreRevision = (revision) => {
    if (!revision?.bodySections?.length) return;
    if (!window.confirm("Restore this saved homepage snapshot into the builder? You can review before saving.")) return;
    const restored = normalizeHomeSections(revision.bodySections);
    setSections(restored);
    setEditingId(restored[0]?.id || "");
  };
  const save = async () => {
    setSaving(true);
    try {
      const base = home || { id: "home", routeKey: "home", slug: "/", title: "Homepage", status: "published" };
      const nextSections = normalizeOrders(orderedSections);
      const revisions = [
        { id: `revision-${Date.now()}`, savedAt: new Date().toISOString(), bodySections: savedSections },
        ...(Array.isArray(base.homepageRevisions) ? base.homepageRevisions : []),
      ].filter((revision) => Array.isArray(revision.bodySections) && revision.bodySections.length).slice(0, 5);
      const payload = {
        ...pagePayload(normalizePageDraft(base)),
        id: itemId(base) || "home",
        title: base.title || "Homepage",
        routeKey: "home",
        slug: "/",
        status: base.status || "published",
        bodySections: nextSections,
        homepageRevisions: revisions,
      };
      await cms.saveRecord(home || {}, payload);
      setSections(nextSections);
      setSavedSections(nextSections);
      setLastSaved(new Date().toLocaleTimeString());
    } finally {
      setSaving(false);
    }
  };
  const previewSelection = (section) => {
    setEditingId(section.id);
    setActiveTab("preview");
  };
  return h("section", { className: "homepage-visual-builder" },
    h(CmsHeader, { title: "Homepage Visual Builder", copy: "Build the public homepage with visual sections, media, repeaters, preview modes, and saved CMS data.", action: h("div", { className: "cms-actions" }, h(Link, { href: routes.home, className: "button button-outline", target: "_blank" }, h(Eye, { size: 18 }), "Open live homepage"), h("button", { type: "button", className: "button button-outline", onClick: reset, disabled: !dirty }, h(RotateCcw, { size: 18 }), "Reset"), h("button", { type: "button", className: "button button-primary", onClick: save, disabled: saving }, h(Save, { size: 18 }), saving ? "Saving..." : "Save changes")) }),
    h(renderAlerts, { ...cms }),
    dirty && h("div", { className: "builder-unsaved-alert" }, "You have unsaved homepage changes."),
    lastSaved && h("div", { className: "success-alert" }, `Homepage saved at ${lastSaved}.`),
    h("div", { className: "builder-mobile-tabs" }, ["sections", "edit", "preview"].map((tab) => h("button", { key: tab, type: "button", className: cx(activeTab === tab && "active"), onClick: () => setActiveTab(tab) }, tab))),
    h("div", { className: "homepage-builder-shell" },
      h("aside", { className: cx("builder-panel builder-section-panel", activeTab !== "sections" && "mobile-hidden") },
        h("div", { className: "builder-panel-head" },
          h("div", null, h("h3", null, "Sections"), h("p", null, `${orderedSections.length} homepage blocks`)),
          h("button", { type: "button", className: "button button-primary button-small", onClick: () => setShowLibrary(true) }, h(Plus, { size: 16 }), "Add Section"),
        ),
        h("div", { className: "builder-section-list" }, orderedSections.map((section, index) => h(BuilderSectionCard, {
          key: section.id,
          section,
          index,
          selected: editingId === section.id,
          dragging: draggingId === section.id,
          onEdit: () => { setEditingId(section.id); setActiveTab("edit"); },
          onToggle: () => updateSection(section.id, { enabled: section.enabled === false }),
          onDuplicate: () => duplicate(section),
          onDelete: () => remove(section),
          onMoveUp: () => moveSection(section.id, -1),
          onMoveDown: () => moveSection(section.id, 1),
          onPreview: () => previewSelection(section),
          onDragStart: () => setDraggingId(section.id),
          onDragOver: (event) => event.preventDefault(),
          onDrop: () => dropSection(section.id),
          onDragEnd: () => setDraggingId(""),
        }))),
        Array.isArray(home?.homepageRevisions) && home.homepageRevisions.length ? h("div", { className: "builder-revisions" },
          h("h4", null, "Recent backups"),
          home.homepageRevisions.slice(0, 5).map((revision) => h("button", { key: revision.id || revision.savedAt, type: "button", className: "mini-button", onClick: () => restoreRevision(revision) }, h(RotateCcw, { size: 14 }), revision.savedAt ? formatDate(revision.savedAt) : "Restore snapshot")),
        ) : null,
      ),
      h("main", { className: cx("builder-workspace", activeTab === "sections" && "mobile-hidden") },
        h("div", { className: "builder-workspace-top" },
          h("div", null, h("h3", null, editing ? homeSectionTitle(editing) : "Select a section"), h("p", null, editing ? `${homeSectionType(editing)} section editor and live preview` : "Choose a homepage block to edit.")),
          h("div", { className: "preview-mode-toggle" },
            [["desktop", Monitor], ["tablet", Tablet], ["mobile", Smartphone]].map(([mode, Icon]) => h("button", { key: mode, type: "button", className: cx(previewMode === mode && "active"), onClick: () => setPreviewMode(mode), title: `${mode} preview` }, h(Icon, { size: 16 }))),
          ),
        ),
        h("div", { className: "builder-workspace-grid" },
          h("div", { className: cx("builder-editor-panel", activeTab === "preview" && "mobile-hidden") }, editing ? h(HomeSectionEditor, { section: editing, update: (patch) => updateSection(editing.id, patch) }) : h("div", { className: "notice-card" }, "Select a homepage section to edit.")),
          h("div", { className: cx("builder-preview-panel", activeTab === "edit" && "mobile-hidden") }, h(HomepageLivePreview, { sections: orderedSections, selectedId: editingId, previewMode })),
        ),
      ),
    ),
    showLibrary && h(SectionLibraryModal, { onClose: () => setShowLibrary(false), onAdd: addSection }),
  );
}

function BuilderSectionCard({ section, index, selected, dragging, onEdit, onToggle, onDuplicate, onDelete, onMoveUp, onMoveDown, onPreview, onDragStart, onDragOver, onDrop, onDragEnd }) {
  const thumb = sectionThumbnail(section);
  const title = homeSectionTitle(section);
  return h("article", {
    className: cx("builder-section-card", selected && "selected", dragging && "dragging", section.enabled === false && "disabled"),
    draggable: true,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
  },
    h("button", { type: "button", className: "builder-card-main", onClick: onEdit },
      h("span", { className: "builder-drag-handle", title: "Drag to reorder" }, h(GripVertical, { size: 18 })),
      h("span", { className: "builder-section-thumb" }, thumb ? h("img", { src: thumb, alt: "" }) : h(Layers, { size: 18 })),
      h("span", { className: "builder-section-copy" },
        h("strong", null, title),
        h("small", null, `Type: ${section.type} / Order: ${index + 1}`),
        h("em", null, sectionPreviewText(section)),
      ),
      h("span", { className: cx("builder-status-badge", section.enabled === false ? "hidden" : "visible") }, section.enabled === false ? "Hidden" : "Visible"),
    ),
    h("div", { className: "builder-section-actions" },
      h("button", { type: "button", className: "mini-button", onClick: onEdit }, h(Edit3, { size: 14 }), "Edit"),
      h("button", { type: "button", className: "mini-button", onClick: onToggle }, section.enabled === false ? "Show" : "Hide"),
      h("button", { type: "button", className: "mini-button", onClick: onMoveUp, disabled: index === 0 }, "Up"),
      h("button", { type: "button", className: "mini-button", onClick: onMoveDown }, "Down"),
      h("button", { type: "button", className: "mini-button", onClick: onPreview }, h(Eye, { size: 14 }), "Preview"),
      h("button", { type: "button", className: "mini-button", onClick: onDuplicate }, h(Copy, { size: 14 }), "Duplicate"),
      h("button", { type: "button", className: "mini-button danger", onClick: onDelete }, h(Trash2, { size: 14 }), "Delete"),
    ),
  );
}

function SectionLibraryModal({ onClose, onAdd }) {
  return h("div", { className: "section-library-backdrop", role: "dialog", "aria-modal": "true" },
    h("div", { className: "section-library-modal" },
      h("div", { className: "section-library-head" },
        h("div", null, h("span", { className: "eyebrow" }, "Component library"), h("h2", null, "Add Homepage Section"), h("p", null, "Choose a ready-made AbroadWays homepage block. You can edit every field after adding.")),
        h("button", { type: "button", className: "icon-button", onClick: onClose, "aria-label": "Close section library" }, h(X, { size: 18 })),
      ),
      h("div", { className: "section-library-grid" }, sectionLibrary.map(([type, name, description, Icon]) => h("article", { key: type },
        h("span", { className: "library-icon" }, h(Icon, { size: 22 })),
        h("h3", null, name),
        h("p", null, description),
        h("button", { type: "button", className: "button button-primary button-small", onClick: () => onAdd(type) }, h(Plus, { size: 15 }), "Add section"),
      ))),
    ),
  );
}

function HomepageLivePreview({ sections, selectedId, previewMode }) {
  const previewPage = {
    title: "Homepage preview",
    bodySections: sections,
    image: "/images/abroadways-hero-campus.png",
  };
  const destinationItems = destinations;
  const visible = normalizeHomeSections(sections).filter((section) => section.enabled !== false);
  return h("div", { className: "homepage-preview-wrap" },
    h("div", { className: cx("homepage-preview-frame", `preview-${previewMode}`) },
      visible.length ? visible.map((section) => h("div", { key: section.id, className: cx("preview-section-shell", selectedId === section.id && "selected"), id: `preview-${section.id}` },
        h(HomeSectionRenderer, { section, page: previewPage, destinations: destinationItems, blogs: blogPosts, settings: mergeSettings([]) }),
      )) : h("div", { className: "empty-card" }, "No visible homepage sections in this preview."),
    ),
  );
}

function sectionThumbnail(section = {}) {
  const arrays = [section.cards, section.stories, section.items, section.trustItems, section.images, section.partners].filter(Array.isArray);
  const candidates = [
    section.imageUrl,
    section.backgroundImageUrl,
    section.heroImageUrl,
    section.ogImage,
    ...arrays.flat().flatMap((item) => [item.imageUrl, item.examLogoUrl, item.partnerLogoUrl, item.url]),
  ];
  return candidates.find(Boolean) || "";
}

function sectionPreviewText(section = {}) {
  return String(section.subtitle || section.description || section.secondaryText || section.formHeading || section.ctaText || "Editable section").slice(0, 92);
}

function createHomeSection(type, order) {
  const base = { id: `${type}-${Date.now()}`, type, key: legacyHomeKey(type), enabled: true, order, title: "", subtitle: "", backgroundColor: "", textColor: "", imageUrl: "", ctaText: "", ctaLink: "", items: [], settings: {} };
  if (type === "hero") return normalizeHomeSection({ ...base, eyebrow: "Abroadways Limited", heading: "Your Study Abroad Journey Starts Here", subtitle: "Focused counselling, applications, and visa guidance for Bangladeshi students planning New Zealand, UK, Australia, Canada, and Malaysia.", secondaryText: "Start with the right country, course, documents, and timeline.", primaryButtonText: "Book Free Consultation", primaryButtonLink: routes.planner, secondaryButtonText: "", secondaryButtonLink: routes.studyAbroad, imageUrl: "/images/consultation-counsellor.png", countryChips: destinations.map((item) => item.chip) }, order - 1);
  if (type === "successMetrics") return normalizeHomeSection({ ...base, heading: "Trusted by students and families", subtitle: "Clear, realistic guidance across counselling, testing services, applications, and focused destinations.", metrics: defaultSuccessMetrics }, order - 1);
  if (type === "pathwayCards") return normalizeHomeSection({ ...base, heading: "Find Your Study Pathway", cards: pathwayFallback() }, order - 1);
  if (type === "featureCards") return normalizeHomeSection({ ...base, heading: "Plan with clarity", cards: defaultFeatureCards }, order - 1);
  if (type === "servicesPreview") return normalizeHomeSection({ ...base, heading: "Services built around your study plan", subtitle: "Clear support across counselling, applications, visas, budgets, and pre-departure.", cards: defaultServicePreviewCards }, order - 1);
  if (type === "academyTeaser") return normalizeHomeSection({ ...base, heading: "AbroadWays Academy is Coming Soon", subtitle: "A dedicated academic preparation platform for IELTS, TOEFL, GRE, GMAT, LanguageCert, PTE, ELLT, and international study readiness.", imageUrl: "/images/abroadways-destination-planning.png", ctaText: "Explore Academy", ctaLink: routes.academy, cards: academyTracks }, order - 1);
  if (type === "partnersSection") return normalizeHomeSection({ ...base, heading: "Our Partners", subtitle: "Trusted testing and education partnerships supporting AbroadWays students.", partners: defaultPartners }, order - 1);
  if (type === "successStories") return normalizeHomeSection({ ...base, heading: "Our Success Story", tabs: ["All", "Canada", "Australia", "UK", "New Zealand", "Malaysia"], stories: defaultStories }, order - 1);
  if (type === "serviceChips") return normalizeHomeSection({ ...base, heading: "Support at every step", chips: defaultSupportChips.map((label) => ({ label, icon: "sparkles", color: "" })) }, order - 1);
  if (type === "insightsSection") return normalizeHomeSection({ ...base, heading: "AbroadWays Study Abroad Insights", subtitle: "Guides, counselling notes, country updates, visa preparation tips, and budget planning for students and families.", imageUrl: "/images/abroadways-destination-planning.png", ctaText: "Read Guides", ctaLink: routes.blog, items: defaultInsightCountries }, order - 1);
  if (type === "consultationForm") return normalizeHomeSection({ ...base, heading: "Claim Your Free Consultation", subtitle: "Share your study interest and destination plan. Abroadways will review the details and contact you.", imageUrl: "/images/consultation-counsellor.png", formHeading: "Submit Consultation Request" }, order - 1);
  if (type === "blogPreview") return normalizeHomeSection({ ...base, heading: "Study Abroad Guides", subtitle: "Read practical destination guides written for Bangladeshi students and families.", languageTabsEnabled: true, numberOfPosts: 3, ctaText: "View Blog", ctaLink: routes.blog }, order - 1);
  if (type === "resourceTiles") return normalizeHomeSection({ ...base, heading: "Helpful resources for your next step", subtitle: "Quick links for destinations, guides, consultation, and planning.", items: defaultResourceTiles }, order - 1);
  if (type === "ctaBanner") return normalizeHomeSection({ ...base, heading: "Ready to plan your study abroad journey?", subtitle: "Start with a focused consultation and a practical route for your preferred destination.", imageUrl: "/images/consultation-counsellor.png", ctaText: "Book Free Consultation", ctaLink: routes.planner }, order - 1);
  if (type === "faqSection") return normalizeHomeSection({ ...base, heading: "Common questions", subtitle: "Short answers for early study abroad planning.", faqs: [{ question: "When should I start planning?", answer: "Start early enough to compare countries, courses, budget, intake timing, and documents before applying." }] }, order - 1);
  if (type === "imageGallery") return normalizeHomeSection({ ...base, heading: "Study abroad visuals", subtitle: "Editable media slots for campus, counselling, and student journey images.", images: [{ imageUrl: "/images/abroadways-hero-campus.png", altText: "Study abroad planning", caption: "Planning support" }] }, order - 1);
  if (type === "partnerCta") return normalizeHomeSection({ ...base, heading: "View Our Partners", subtitle: "See verified partner and authorization details managed from the CMS.", ctaText: "View Partners", ctaLink: routes.partners, items: [] }, order - 1);
  if (type === "consultationCta") return normalizeHomeSection({ ...base, heading: "Claim your free Abroadways consultation", subtitle: "Start with a short pathway planner.", imageUrl: "/images/consultation-counsellor.png", primaryButtonText: "Book Free Consultation", primaryButtonLink: routes.planner, secondaryButtonText: "Contact Abroadways", secondaryButtonLink: routes.contact }, order - 1);
  if (type === "trustSection") return normalizeHomeSection({ ...base, heading: "Built around clarity, care, and responsible guidance", subtitle: "Trust signals kept focused and transparent.", trustItems: ["Abroadways Limited", "Student-first counselling", "Authorized testing services", "Transparent process"].map((title) => ({ title, description: "", icon: "badge", imageUrl: "" })) }, order - 1);
  return normalizeHomeSection(base, order - 1);
}

function sectionArrayKey(type) {
  if (type === "successMetrics") return "metrics";
  if (type === "pathwayCards" || type === "featureCards" || type === "academyTeaser" || type === "servicesPreview") return "cards";
  if (type === "partnersSection") return "partners";
  if (type === "successStories") return "stories";
  if (type === "serviceChips") return "chips";
  if (type === "trustSection") return "trustItems";
  if (type === "faqSection") return "faqs";
  if (type === "imageGallery") return "images";
  if (type === "insightsSection" || type === "resourceTiles" || type === "consultationForm") return "items";
  return "items";
}

function defaultSectionItem(type) {
  if (type === "successMetrics") return { value: "1:1", label: "New metric", description: "Short metric context." };
  if (type === "pathwayCards") return { title: "New card", icon: "NC", description: "", link: routes.studyAbroad, backgroundColor: "#eef7ff", imageUrl: "" };
  if (type === "servicesPreview") return { title: "New service", icon: "NS", description: "Short service description.", link: routes.services, backgroundColor: "#eef7ff", imageUrl: "" };
  if (type === "academyTeaser") return { examName: "New academy track", title: "New academy track", icon: "NA", examLogoUrl: "", statusBadge: "Coming Soon", description: "Future preparation track.", backgroundColor: "#eef7ff", displayOrder: 99 };
  if (type === "partnersSection") return { partnerName: "New partner", partnerLogoUrl: "", partnerLogoAlt: "New partner logo", partnerType: "Partner", authorizationText: "To be updated", description: "Short partner description.", websiteUrl: "", status: "active", displayOrder: 99 };
  if (type === "featureCards") return { title: "New feature", description: "", bullets: ["First point"], imageUrl: "", ctaText: "Learn more", ctaLink: routes.services, backgroundColor: "#eef7ff" };
  if (type === "successStories") return { studentName: "Student journey", country: "Canada", qualification: "Application support", storyText: "Counselling experience summary.", imageUrl: "", status: "published" };
  if (type === "serviceChips") return { label: "New support item", icon: "sparkles", color: "" };
  if (type === "trustSection") return { title: "Trust item", description: "", icon: "badge", imageUrl: "" };
  if (type === "insightsSection") return { title: "Canada", link: "/study-abroad/canada", backgroundColor: "#eef7ff", imageUrl: "" };
  if (type === "resourceTiles") return { title: "New resource", description: "Short resource description.", ctaText: "Open", link: routes.blog, backgroundColor: "#eef7ff", icon: "book" };
  if (type === "faqSection") return { question: "New question", answer: "Short answer." };
  if (type === "imageGallery") return { imageUrl: "", altText: "", caption: "" };
  if (type === "partnerCta") return { title: "Partner logo", imageUrl: "", link: routes.partners };
  return { title: "New item", description: "", imageUrl: "" };
}

function HomeSectionEditor({ section, update }) {
  const type = homeSectionType(section);
  const set = (key, value) => update({ [key]: value });
  const changeType = (value) => update({ ...createHomeSection(value, section.order), id: section.id });
  return h("div", { className: "cms-editor homepage-builder-editor visual-section-editor" },
    h("div", { className: "builder-editor-head" },
      h("div", null, h("span", { className: "eyebrow" }, type), h("h2", null, `Edit ${homeSectionTitle(section)}`)),
      h("span", { className: cx("builder-status-badge", section.enabled === false ? "hidden" : "visible") }, section.enabled === false ? "Hidden" : "Visible"),
    ),
    h("div", { className: "cms-form-grid" },
      h(SelectInput, { label: "Section type", value: type, onChange: changeType, options: homeSectionTypeOptions }),
      h(SelectInput, { label: "Enabled", value: String(section.enabled !== false), onChange: (value) => set("enabled", value === "true"), options: ["true", "false"] }),
      h(TextInput, { label: "Order", value: section.order, onChange: (value) => set("order", Number(value) || section.order), type: "number" }),
      h(TextInput, { label: "Eyebrow / badge", value: section.eyebrow || section.badgeText, onChange: (value) => update({ eyebrow: value, badgeText: value }) }),
      h(TextInput, { label: "Section title", value: section.heading || section.title, onChange: (value) => update({ heading: value, title: value }), className: "full" }),
      h(TextArea, { label: "Subtitle", value: section.subtitle, onChange: (value) => set("subtitle", value), className: "full" }),
      h(ImageField, { label: "Main image", value: section.imageUrl, onChange: (value) => set("imageUrl", value), className: "full", folder: "abroadways/homepage" }),
      h(TextInput, { label: "Background color", value: section.backgroundColor, onChange: (value) => set("backgroundColor", value), placeholder: "#eef7ff or gradient" }),
      h(TextInput, { label: "Text color", value: section.textColor, onChange: (value) => set("textColor", value), placeholder: "#0d1f3c" }),
      h(TextInput, { label: "Top spacing", value: section.topSpacing, onChange: (value) => set("topSpacing", value), placeholder: "80px" }),
      h(TextInput, { label: "Bottom spacing", value: section.bottomSpacing, onChange: (value) => set("bottomSpacing", value), placeholder: "80px" }),
      h(TextInput, { label: "Custom anchor / ID", value: section.anchorId || section.customAnchor, onChange: (value) => update({ anchorId: value, customAnchor: value }) }),
      h(TextInput, { label: "CSS class (advanced)", value: section.customClass || section.cssClass, onChange: (value) => update({ customClass: value, cssClass: value }) }),
      h(SectionTypeFields, { section, update }),
      h("details", { className: "advanced-json full" },
        h("summary", null, "Advanced JSON"),
        h("p", null, "Optional fallback for advanced users. The visual fields above cover normal editing."),
        h(TextArea, { label: "Section JSON", value: jsonText(section), onChange: (value) => update(parseJsonText(value, section)), className: "full" }),
        h(TextArea, { label: "Settings JSON", value: jsonText(section.settings || {}), onChange: (value) => set("settings", parseJsonText(value, {})), className: "full" }),
      ),
    ),
  );
}

function SectionTypeFields({ section, update }) {
  const type = homeSectionType(section);
  const arrayKey = sectionArrayKey(type);
  const items = Array.isArray(section[arrayKey]) ? section[arrayKey] : [];
  const set = (key, value) => update({ [key]: value });
  const sharedCta = ["hero", "academyTeaser", "insightsSection", "consultationCta", "ctaBanner", "partnerCta"].includes(type);
  return h(React.Fragment, null,
    type === "hero" && h(React.Fragment, null,
      h(TextInput, { label: "Support line", value: section.secondaryText, onChange: (value) => set("secondaryText", value), className: "full" }),
      h(TextInput, { label: "Primary button text", value: section.primaryButtonText || section.ctaText, onChange: (value) => update({ primaryButtonText: value, ctaText: value }) }),
      h(TextInput, { label: "Primary button link", value: section.primaryButtonLink || section.ctaLink, onChange: (value) => update({ primaryButtonLink: value, ctaLink: value }) }),
      h(TextInput, { label: "Secondary button text", value: section.secondaryButtonText, onChange: (value) => set("secondaryButtonText", value) }),
      h(TextInput, { label: "Secondary button link", value: section.secondaryButtonLink, onChange: (value) => set("secondaryButtonLink", value) }),
      h(ImageField, { label: "Background image", value: section.backgroundImageUrl, onChange: (value) => set("backgroundImageUrl", value), className: "full", folder: "abroadways/homepage" }),
      h(TextArea, { label: "Country chips, one per line", value: lines(section.countryChips), onChange: (value) => set("countryChips", lineList(value)), className: "full" }),
      h(SelectInput, { label: "Animation enabled", value: String(section.animationEnabled !== false), onChange: (value) => set("animationEnabled", value === "true"), options: ["true", "false"] }),
    ),
    sharedCta && type !== "hero" && h(React.Fragment, null,
      h(TextInput, { label: "Button text", value: section.ctaText || section.primaryButtonText, onChange: (value) => update({ ctaText: value, primaryButtonText: value }) }),
      h(TextInput, { label: "Button link", value: section.ctaLink || section.primaryButtonLink, onChange: (value) => update({ ctaLink: value, primaryButtonLink: value }) }),
    ),
    type === "consultationCta" && h(React.Fragment, null,
      h(TextInput, { label: "Secondary button text", value: section.secondaryButtonText, onChange: (value) => set("secondaryButtonText", value) }),
      h(TextInput, { label: "Secondary button link", value: section.secondaryButtonLink, onChange: (value) => set("secondaryButtonLink", value) }),
      h(TextInput, { label: "Form heading", value: section.formHeading, onChange: (value) => set("formHeading", value), className: "full" }),
    ),
    type === "consultationForm" && h(React.Fragment, null,
      h(TextInput, { label: "Form title", value: section.formHeading || section.formTitle, onChange: (value) => update({ formHeading: value, formTitle: value }), className: "full" }),
      h(TextArea, { label: "Form intro", value: section.formIntro, onChange: (value) => set("formIntro", value), className: "full" }),
      h(TextArea, { label: "Study interests, one per line", value: lines(section.studyInterests), onChange: (value) => set("studyInterests", lineList(value)), className: "full" }),
      h(TextArea, { label: "Country options, one per line", value: lines(section.countryOptions), onChange: (value) => set("countryOptions", lineList(value)), className: "full" }),
      h(TextInput, { label: "Submit button text", value: section.buttonText || section.ctaText, onChange: (value) => update({ buttonText: value, ctaText: value }) }),
    ),
    type === "blogPreview" && h(React.Fragment, null,
      h(SelectInput, { label: "Language tabs enabled", value: String(section.languageTabsEnabled !== false), onChange: (value) => set("languageTabsEnabled", value === "true"), options: ["true", "false"] }),
      h(TextInput, { label: "Number of posts", value: section.numberOfPosts, onChange: (value) => set("numberOfPosts", Number(value) || 3), type: "number" }),
      h(TextInput, { label: "Button text", value: section.ctaText, onChange: (value) => set("ctaText", value) }),
      h(TextInput, { label: "Button link", value: section.ctaLink, onChange: (value) => set("ctaLink", value) }),
    ),
    type === "successStories" && h(TextArea, { label: "Tabs, one per line", value: lines(section.tabs), onChange: (value) => set("tabs", lineList(value)), className: "full" }),
    repeaterTypes().includes(type) && h(RepeaterEditor, { type, arrayKey, items, onChange: (next) => set(arrayKey, next) }),
  );
}

function repeaterTypes() {
  return ["successMetrics", "pathwayCards", "featureCards", "servicesPreview", "academyTeaser", "partnersSection", "successStories", "serviceChips", "trustSection", "insightsSection", "resourceTiles", "consultationForm", "faqSection", "imageGallery", "partnerCta"];
}

function RepeaterEditor({ type, arrayKey, items, onChange }) {
  const [open, setOpen] = useState({});
  const list = Array.isArray(items) ? items : [];
  const updateItem = (index, patch) => onChange(list.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  const moveItem = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };
  return h("div", { className: "visual-repeater full" },
    h("div", { className: "repeater-title" },
      h("div", null, h("h3", null, repeaterTitle(type, arrayKey)), h("p", null, "Add, reorder, duplicate, and edit each item without raw JSON.")),
      h("button", { type: "button", className: "button button-outline button-small", onClick: () => onChange([...list, defaultSectionItem(type)]) }, h(Plus, { size: 15 }), "Add item"),
    ),
    list.length ? list.map((item, index) => {
      const isOpen = open[index] !== false;
      return h("article", { key: `${item.id || item.title || item.label || index}-${index}`, className: "repeater-item" },
        h("div", { className: "repeater-header" },
          h("button", { type: "button", onClick: () => setOpen((current) => ({ ...current, [index]: !isOpen })) }, h("strong", null, arrayItemTitle(type, item, index)), h("span", null, isOpen ? "Collapse" : "Expand")),
          h("div", { className: "cms-row-actions" },
            h("button", { type: "button", className: "mini-button", onClick: () => moveItem(index, -1), disabled: index === 0 }, "Up"),
            h("button", { type: "button", className: "mini-button", onClick: () => moveItem(index, 1), disabled: index === list.length - 1 }, "Down"),
            h("button", { type: "button", className: "mini-button", onClick: () => onChange([...list.slice(0, index + 1), { ...item }, ...list.slice(index + 1)]) }, h(Copy, { size: 14 }), "Duplicate"),
            h("button", { type: "button", className: "mini-button danger", onClick: () => onChange(list.filter((_, itemIndex) => itemIndex !== index)) }, h(Trash2, { size: 14 }), "Remove"),
          ),
        ),
        isOpen && h("div", { className: "cms-form-grid repeater-fields" }, renderItemFields(type, item, index, (patch) => updateItem(index, patch))),
      );
    }) : h("div", { className: "notice-card" }, `No ${arrayKey} added yet.`),
  );
}

function repeaterTitle(type, arrayKey) {
  const labels = {
    successMetrics: "Metrics",
    pathwayCards: "Pathway cards",
    featureCards: "Feature cards",
    servicesPreview: "Service cards",
    academyTeaser: "Academy cards",
    partnersSection: "Partner cards",
    successStories: "Success story cards",
    serviceChips: "Floating service chips",
    trustSection: "Trust items",
    insightsSection: "Country insight cards",
    resourceTiles: "Resource tiles",
    consultationForm: "Form helper items",
    faqSection: "FAQs",
    imageGallery: "Gallery images",
    partnerCta: "Partner logo items",
  };
  return labels[type] || arrayKey;
}

function arrayItemTitle(type, item = {}, index = 0) {
  return item.title || item.label || item.studentName || item.partnerName || item.examName || item.question || item.caption || item.value || `${repeaterTitle(type, "Item")} ${index + 1}`;
}

function renderItemFields(type, item, index, updateItem) {
  if (type === "successMetrics") return [
    h(TextInput, { key: "value", label: "Value", value: item.value || item.number, onChange: (value) => updateItem({ value }) }),
    h(TextInput, { key: "label", label: "Label", value: item.label || item.title, onChange: (value) => updateItem({ label: value, title: value }) }),
    h(TextInput, { key: "color", label: "Color", value: item.color, onChange: (value) => updateItem({ color: value }) }),
    h(ImageField, { key: "icon", label: "Icon / logo URL", value: item.iconLogoUrl || item.imageUrl, onChange: (value) => updateItem({ iconLogoUrl: value, imageUrl: value }), className: "full", folder: "abroadways/homepage" }),
    h(TextArea, { key: "description", label: "Description", value: item.description, onChange: (value) => updateItem({ description: value }), className: "full" }),
  ];
  if (type === "pathwayCards" || type === "servicesPreview" || type === "resourceTiles" || type === "trustSection" || type === "insightsSection" || type === "partnerCta") return [
    h(TextInput, { key: "title", label: "Title", value: item.title || item.label, onChange: (value) => updateItem({ title: value, label: value }) }),
    h(TextInput, { key: "icon", label: "Icon initials / label", value: item.icon, onChange: (value) => updateItem({ icon: value }) }),
    h(TextInput, { key: "link", label: "Link", value: item.link || item.ctaLink, onChange: (value) => updateItem({ link: value, ctaLink: value }) }),
    h(TextInput, { key: "bg", label: "Background color", value: item.backgroundColor, onChange: (value) => updateItem({ backgroundColor: value }) }),
    h(ImageField, { key: "image", label: "Icon / image URL", value: item.imageUrl || item.url, onChange: (value) => updateItem({ imageUrl: value, url: value }), className: "full", folder: "abroadways/homepage" }),
    h(TextArea, { key: "description", label: "Description", value: item.description, onChange: (value) => updateItem({ description: value }), className: "full" }),
    type === "resourceTiles" && h(TextInput, { key: "ctaText", label: "Button text", value: item.ctaText, onChange: (value) => updateItem({ ctaText: value }) }),
  ].filter(Boolean);
  if (type === "academyTeaser") return [
    h(TextInput, { key: "examName", label: "Test / track name", value: item.examName || item.title, onChange: (value) => updateItem({ examName: value, title: value }) }),
    h(TextInput, { key: "badge", label: "Status badge", value: item.statusBadge, onChange: (value) => updateItem({ statusBadge: value }) }),
    h(TextInput, { key: "order", label: "Display order", value: item.displayOrder, onChange: (value) => updateItem({ displayOrder: Number(value) || index + 1 }), type: "number" }),
    h(TextInput, { key: "bg", label: "Background color", value: item.backgroundColor, onChange: (value) => updateItem({ backgroundColor: value }) }),
    h(ImageField, { key: "logo", label: "Exam logo URL", value: item.examLogoUrl || item.logoUrl, onChange: (value) => updateItem({ examLogoUrl: value, logoUrl: value }), className: "full", folder: "abroadways/academy" }),
    h(TextArea, { key: "description", label: "Description", value: item.description, onChange: (value) => updateItem({ description: value }), className: "full" }),
  ];
  if (type === "featureCards") return [
    h(TextInput, { key: "eyebrow", label: "Eyebrow", value: item.eyebrow, onChange: (value) => updateItem({ eyebrow: value }) }),
    h(TextInput, { key: "title", label: "Title", value: item.title, onChange: (value) => updateItem({ title: value }) }),
    h(TextInput, { key: "ctaText", label: "Button text", value: item.ctaText, onChange: (value) => updateItem({ ctaText: value }) }),
    h(TextInput, { key: "ctaLink", label: "Button link", value: item.ctaLink, onChange: (value) => updateItem({ ctaLink: value }) }),
    h(TextInput, { key: "bg", label: "Background color", value: item.backgroundColor, onChange: (value) => updateItem({ backgroundColor: value }) }),
    h(ImageField, { key: "image", label: "Card image", value: item.imageUrl, onChange: (value) => updateItem({ imageUrl: value }), className: "full", folder: "abroadways/homepage" }),
    h(TextArea, { key: "description", label: "Description", value: item.description, onChange: (value) => updateItem({ description: value }), className: "full" }),
    h(TextArea, { key: "bullets", label: "Bullets, one per line", value: lines(item.bullets), onChange: (value) => updateItem({ bullets: lineList(value) }), className: "full" }),
  ];
  if (type === "successStories") return [
    h(TextInput, { key: "student", label: "Student name", value: item.studentName, onChange: (value) => updateItem({ studentName: value }) }),
    h(TextInput, { key: "country", label: "Country / destination", value: item.country || item.destination, onChange: (value) => updateItem({ country: value, destination: value }) }),
    h(TextInput, { key: "qualification", label: "Study level / qualification", value: item.qualification || item.studyLevel, onChange: (value) => updateItem({ qualification: value, studyLevel: value }) }),
    h(TextInput, { key: "status", label: "Status badge", value: item.status, onChange: (value) => updateItem({ status: value }) }),
    h(ImageField, { key: "image", label: "Student image", value: item.imageUrl, onChange: (value) => updateItem({ imageUrl: value }), className: "full", folder: "abroadways/stories" }),
    h(TextArea, { key: "story", label: "Story text", value: item.storyText || item.text, onChange: (value) => updateItem({ storyText: value, text: value }), className: "full" }),
    h(TextArea, { key: "tags", label: "Tags, one per line", value: lines(item.tags), onChange: (value) => updateItem({ tags: lineList(value) }), className: "full" }),
  ];
  if (type === "serviceChips") return [
    h(TextInput, { key: "label", label: "Chip label", value: item.label || item.title, onChange: (value) => updateItem({ label: value, title: value }) }),
    h(TextInput, { key: "icon", label: "Icon text", value: item.icon, onChange: (value) => updateItem({ icon: value }) }),
    h(TextInput, { key: "color", label: "Icon color", value: item.color, onChange: (value) => updateItem({ color: value }) }),
    h(TextInput, { key: "position", label: "Position note", value: item.position, onChange: (value) => updateItem({ position: value }) }),
    h(ImageField, { key: "image", label: "Optional icon image", value: item.imageUrl, onChange: (value) => updateItem({ imageUrl: value }), className: "full", folder: "abroadways/homepage" }),
  ];
  if (type === "partnersSection") return [
    h(TextInput, { key: "name", label: "Partner name", value: item.partnerName || item.title, onChange: (value) => updateItem({ partnerName: value, title: value }) }),
    h(TextInput, { key: "status", label: "Status text", value: item.statusText || item.authorizationText, onChange: (value) => updateItem({ statusText: value, authorizationText: value }) }),
    h(TextInput, { key: "website", label: "Website URL", value: item.websiteUrl, onChange: (value) => updateItem({ websiteUrl: value }) }),
    h(TextInput, { key: "order", label: "Display order", value: item.displayOrder, onChange: (value) => updateItem({ displayOrder: Number(value) || index + 1 }), type: "number" }),
    h(ImageField, { key: "logo", label: "Partner logo URL", value: item.partnerLogoUrl || item.imageUrl, onChange: (value) => updateItem({ partnerLogoUrl: value, imageUrl: value }), className: "full", folder: "abroadways/partners" }),
    h(TextArea, { key: "description", label: "Description", value: item.description, onChange: (value) => updateItem({ description: value }), className: "full" }),
  ];
  if (type === "faqSection") return [
    h(TextInput, { key: "question", label: "Question", value: item.question || item.title, onChange: (value) => updateItem({ question: value, title: value }), className: "full" }),
    h(TextArea, { key: "answer", label: "Answer", value: item.answer || item.description, onChange: (value) => updateItem({ answer: value, description: value }), className: "full" }),
  ];
  if (type === "imageGallery") return [
    h(ImageField, { key: "image", label: "Image URL", value: item.imageUrl || item.url, onChange: (value) => updateItem({ imageUrl: value, url: value }), className: "full", folder: "abroadways/gallery" }),
    h(TextInput, { key: "alt", label: "Alt text", value: item.altText, onChange: (value) => updateItem({ altText: value }) }),
    h(TextInput, { key: "caption", label: "Caption", value: item.caption || item.title, onChange: (value) => updateItem({ caption: value, title: value }) }),
  ];
  return [
    h(TextInput, { key: "title", label: "Title", value: item.title, onChange: (value) => updateItem({ title: value }) }),
    h(TextArea, { key: "description", label: "Description", value: item.description, onChange: (value) => updateItem({ description: value }), className: "full" }),
  ];
}

function PageManager() {
  const cms = useAdminCollection("pages");
  const [editing, setEditing] = useState(null);
  const protectedKeys = ["home", "study-abroad", "services", "academy", "partners", "who-are-we", "about-us", "contact", "blog"];
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
  const sections = Array.isArray(item.bodySections) && item.bodySections.some((section) => ["success-metrics", "study-pathway", "feature-cards", "services-preview", "academy-teaser", "partners-section", "success-stories", "service-bubbles", "blog-preview", "consultation-cta", "insights-section", "consultation-form", "resource-tiles", "cta-banner", "faq-section", "image-gallery", "partner-cta"].includes(section.key)) ? item.bodySections : isHome ? defaultHomeSections() : item.bodySections || [];
  return { ...item, imageUrl: firstImage(item, ""), bodySectionsText: jsonText(sections), heroButtonText: item.heroButtonText || item.ctaButtonText || item.ctaText || "", heroButtonLink: item.heroButtonLink || item.ctaButtonLink || item.ctaLink || "", heroSecondaryButtonText: item.heroSecondaryButtonText || "", heroSecondaryButtonLink: item.heroSecondaryButtonLink || "", heroBadgeText: item.heroBadgeText || "" };
}

function pagePayload(draft) {
  return { id: draft.id, title: draft.title, routeKey: draft.routeKey || (draft.slug === "/" ? "home" : String(draft.slug || "").replace(/^\//, "")), slug: draft.slug, heroHeading: draft.heroHeading, heroSubtitle: draft.heroSubtitle, imageUrls: draft.imageUrl ? [draft.imageUrl] : [], heroButtonText: draft.heroButtonText, heroButtonLink: draft.heroButtonLink, heroSecondaryButtonText: draft.heroSecondaryButtonText, heroSecondaryButtonLink: draft.heroSecondaryButtonLink, heroBadgeText: draft.heroBadgeText, ctaTitle: draft.ctaTitle, ctaText: draft.heroButtonText || draft.ctaText, ctaButtonText: draft.heroButtonText, ctaButtonLink: draft.heroButtonLink, ctaLink: draft.heroButtonLink, bodySections: parseJsonText(draft.bodySectionsText, []), homepageRevisions: draft.homepageRevisions, seoTitle: draft.seoTitle, seoDescription: draft.seoDescription, ogImage: draft.ogImage, status: draft.status || "draft" };
}

function HomeSectionImageTools({ draft, setDraft }) {
  const isHome = draft.routeKey === "home" || draft.slug === "/";
  if (!isHome) return null;
  const sections = parseJsonText(draft.bodySectionsText, []);
  if (!Array.isArray(sections)) return h("div", { className: "notice-card full" }, "Homepage structured sections must be valid JSON before image tools can load.");
  const targets = [];
  sections.forEach((section, sectionIndex) => {
    if (["study-pathway", "feature-cards", "services-preview", "academy-teaser"].includes(section.key) && Array.isArray(section.cards)) {
      section.cards.forEach((card, cardIndex) => targets.push({ label: `${section.title || section.key}: ${card.title || `Card ${cardIndex + 1}`}`, path: [sectionIndex, "cards", cardIndex, "imageUrl"], value: card.imageUrl || "" }));
    }
    if (section.key === "academy-teaser" && Array.isArray(section.cards)) {
      section.cards.forEach((card, cardIndex) => targets.push({ label: `Academy logo: ${card.examName || card.title || `Track ${cardIndex + 1}`}`, path: [sectionIndex, "cards", cardIndex, "examLogoUrl"], value: card.examLogoUrl || card.logoUrl || "" }));
    }
    if (section.key === "partners-section" && Array.isArray(section.partners)) {
      section.partners.forEach((partner, partnerIndex) => targets.push({ label: `Partner logo: ${partner.partnerName || `Partner ${partnerIndex + 1}`}`, path: [sectionIndex, "partners", partnerIndex, "partnerLogoUrl"], value: partner.partnerLogoUrl || "" }));
    }
    if (["insights-section", "resource-tiles"].includes(section.key) && Array.isArray(section.items)) {
      section.items.forEach((item, itemIndex) => targets.push({ label: `${section.title || section.heading || section.key}: ${item.title || `Item ${itemIndex + 1}`}`, path: [sectionIndex, "items", itemIndex, "imageUrl"], value: item.imageUrl || "" }));
    }
    if (section.key === "success-stories" && Array.isArray(section.stories)) {
      section.stories.forEach((story, storyIndex) => targets.push({ label: `Success story: ${story.studentName || `Story ${storyIndex + 1}`}`, path: [sectionIndex, "stories", storyIndex, "imageUrl"], value: story.imageUrl || "" }));
    }
    if (["consultation-cta", "academy-teaser"].includes(section.key)) {
      targets.push({ label: `${section.title || section.heading || section.key} main image`, path: [sectionIndex, "imageUrl"], value: section.imageUrl || "" });
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
  const [draft, setDraft] = useState({ title: "", url: "", altText: "", caption: "", folder: "Miscellaneous", tagsText: "" });
  const [editing, setEditing] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [qualityFilter, setQualityFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [newFolder, setNewFolder] = useState("");
  const [bulkFolder, setBulkFolder] = useState("");
  const [bulkTag, setBulkTag] = useState("");
  const [replacingId, setReplacingId] = useState("");
  const set = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const folders = Array.from(new Set([...mediaFolders, ...cms.items.map((item) => item.folder).filter(Boolean), newFolder].filter(Boolean))).sort();
  const tags = Array.from(new Set(cms.items.flatMap(mediaTags))).sort();
  const duplicateUrls = new Set(cms.items.map(mediaUrl).filter((url, index, urls) => url && urls.indexOf(url) !== index));
  const missingAltCount = cms.items.filter((item) => !String(item.altText || "").trim()).length;
  const largeCount = cms.items.filter(isLargeMedia).length;
  const duplicateCount = cms.items.filter((item) => duplicateUrls.has(mediaUrl(item))).length;
  const filteredMedia = cms.items.filter((item) => {
    const itemTags = mediaTags(item);
    const haystack = [item.title, item.altText, item.caption, item.publicId, item.url, item.folder, ...itemTags].join(" ").toLowerCase();
    const recent = Date.now() - new Date(item.createdAt || item.uploadedAt || item.updatedAt || 0).getTime() < 1000 * 60 * 60 * 24 * 14;
    return (!search || haystack.includes(search.toLowerCase()))
      && (!folder || item.folder === folder)
      && (!typeFilter || item.source === typeFilter || item.provider === typeFilter || mediaType(item).includes(typeFilter))
      && (!tagFilter || itemTags.includes(tagFilter))
      && (!qualityFilter || (qualityFilter === "recent" && recent) || (qualityFilter === "missing-alt" && !String(item.altText || "").trim()) || (qualityFilter === "large" && isLargeMedia(item)) || (qualityFilter === "duplicate" && duplicateUrls.has(mediaUrl(item))));
  });
  const selectedItems = cms.items.filter((item) => selectedIds.includes(itemId(item)));
  const toggleSelected = (id) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const submit = async (event) => {
    event.preventDefault();
    await cms.saveRecord({}, {
      ...draft,
      publicId: draft.publicId || slugify(draft.title || draft.url),
      folder: draft.folder || "Miscellaneous",
      tags: lineList(String(draft.tagsText || "").replace(/,/g, "\n")),
      source: "external",
      provider: "external",
      uploadedBy: "admin",
      uploadedAt: new Date().toISOString(),
      status: "published",
    });
    setDraft({ title: "", url: "", altText: "", caption: "", folder: "Miscellaneous", tagsText: "" });
  };
  const copyUrl = async (url) => {
    await navigator.clipboard?.writeText(url).catch(() => null);
    cms.setMessage("Image URL copied.");
  };
  const saveEdit = async (event) => {
    event.preventDefault();
    const saved = await cms.saveRecord(editing, { ...editing, tags: lineList(String(editing.tagsText || tagsText(editing.tags)).replace(/,/g, "\n")), uploadedBy: editing.uploadedBy || "admin" });
    setEditing(null);
    return saved;
  };
  const startEdit = (item) => setEditing({ ...item, tagsText: tagsText(item.tags) });
  const replaceImage = async (item, file) => {
    if (!file) return;
    setReplacingId(itemId(item));
    try {
      await replaceMediaFile(itemId(item), file, { folder: item.folder || "abroadways/media" });
      cms.setMessage("Image replaced successfully.");
      await cms.refresh();
    } catch (error) {
      cms.setMessage(error instanceof Error ? error.message : "Replace failed.");
    } finally {
      setReplacingId("");
    }
  };
  const bulkDelete = async () => {
    if (!selectedIds.length || !window.confirm(`Delete ${selectedIds.length} selected media item(s)?`)) return;
    await Promise.all(selectedItems.map((item) => api(`/media/${itemId(item)}`, { method: "DELETE" })));
    setSelectedIds([]);
    await cms.refresh();
  };
  const bulkAssignFolder = async () => {
    if (!selectedIds.length || !bulkFolder) return;
    await Promise.all(selectedItems.map((item) => api(`/media/${itemId(item)}`, { method: "PUT", body: JSON.stringify({ ...item, folder: bulkFolder }) })));
    setSelectedIds([]);
    await cms.refresh();
  };
  const bulkAddTag = async () => {
    if (!selectedIds.length || !bulkTag.trim()) return;
    await Promise.all(selectedItems.map((item) => {
      const nextTags = Array.from(new Set([...mediaTags(item), bulkTag.trim()]));
      return api(`/media/${itemId(item)}`, { method: "PUT", body: JSON.stringify({ ...item, tags: nextTags }) });
    }));
    setBulkTag("");
    setSelectedIds([]);
    await cms.refresh();
  };
  return h("section", null,
    h(CmsHeader, { title: "Media Library Pro", copy: "Upload, search, tag, organize, replace, clean up, and reuse AbroadWays image assets." }),
    h(renderAlerts, { ...cms }),
    h("div", { className: "media-cleanup-panel" },
      h("article", null, h("strong", null, missingAltCount), h("span", null, "Missing alt text"), h("button", { type: "button", className: "mini-button", onClick: () => setQualityFilter("missing-alt") }, "Fix")),
      h("article", null, h("strong", null, largeCount), h("span", null, "Large images"), h("button", { type: "button", className: "mini-button", onClick: () => setQualityFilter("large") }, "Filter")),
      h("article", null, h("strong", null, duplicateCount), h("span", null, "Duplicate URLs"), h("button", { type: "button", className: "mini-button", onClick: () => setQualityFilter("duplicate") }, "Filter")),
      h("article", null, h("strong", null, "Deferred"), h("span", null, "Unused detection"), h("small", null, "Needs page usage tracking")),
    ),
    h(MediaUploadPanel, { title: "Upload Image to Cloudinary", folder: draft.folder || "abroadways/media", onUploaded: (item) => {
      cms.setMessage("Image uploaded successfully.");
      setPreviewUrl(mediaUrl(item));
      cms.refresh();
    } }),
    h("div", { className: "media-filter-bar media-pro-filter-bar" },
      h(TextInput, { label: "Search media", value: search, onChange: setSearch, placeholder: "Title, alt text, URL, folder, tags" }),
      h(SelectInput, { label: "Folder", value: folder, onChange: setFolder, options: ["", ...folders] }),
      h(SelectInput, { label: "Tag", value: tagFilter, onChange: setTagFilter, options: ["", ...tags] }),
      h(SelectInput, { label: "Type/source", value: typeFilter, onChange: setTypeFilter, options: ["", "cloudinary", "external", "local", "image"] }),
      h(SelectInput, { label: "Cleanup filter", value: qualityFilter, onChange: setQualityFilter, options: ["", "recent", "missing-alt", "large", "duplicate"] }),
      h(TextInput, { label: "Create folder", value: newFolder, onChange: setNewFolder, placeholder: "New folder name" }),
    ),
    selectedIds.length > 0 && h("div", { className: "media-bulk-bar" },
      h("strong", null, `${selectedIds.length} selected`),
      h(SelectInput, { label: "Assign folder", value: bulkFolder, onChange: setBulkFolder, options: ["", ...folders] }),
      h("button", { type: "button", className: "mini-button", onClick: bulkAssignFolder, disabled: !bulkFolder }, "Apply folder"),
      h(TextInput, { label: "Add tag", value: bulkTag, onChange: setBulkTag, placeholder: "tag" }),
      h("button", { type: "button", className: "mini-button", onClick: bulkAddTag, disabled: !bulkTag.trim() }, "Add tag"),
      h("button", { type: "button", className: "mini-button danger", onClick: bulkDelete }, h(Trash2, { size: 15 }), "Delete selected"),
    ),
    previewUrl && h("div", { className: "upload-preview-card" }, h("img", { src: previewUrl, alt: "Latest upload preview" }), h("button", { type: "button", className: "mini-button", onClick: () => copyUrl(previewUrl) }, h(Copy, { size: 15 }), "Copy URL")),
    h("form", { className: "cms-editor", onSubmit: submit },
      h("h2", null, "Add Image by URL"),
      h("div", { className: "cms-form-grid" },
        h(TextInput, { label: "Image title", value: draft.title, onChange: (value) => set("title", value) }),
        h(SelectInput, { label: "Folder", value: draft.folder, onChange: (value) => set("folder", value), options: folders }),
        h(TextInput, { label: "Tags", value: draft.tagsText, onChange: (value) => set("tagsText", value), placeholder: "homepage, hero, counselling" }),
        h(TextInput, { label: "Image URL", value: draft.url, onChange: (value) => set("url", value), className: "full" }),
        h(TextInput, { label: "Alt text", value: draft.altText, onChange: (value) => set("altText", value), className: "full" }),
        h(TextInput, { label: "Caption", value: draft.caption, onChange: (value) => set("caption", value), className: "full" }),
      ),
      h("button", { className: "button button-primary", type: "submit" }, h(Plus, { size: 18 }), "Add Image"),
    ),
    editing && h("form", { className: "cms-editor", onSubmit: saveEdit },
      h("h2", null, "Edit Media"),
      h("div", { className: "cms-form-grid" },
        h(TextInput, { label: "Image title", value: editing.title, onChange: (value) => setEditing((current) => ({ ...current, title: value })) }),
        h(TextInput, { label: "Public ID", value: editing.publicId, onChange: (value) => setEditing((current) => ({ ...current, publicId: value })) }),
        h(SelectInput, { label: "Folder", value: editing.folder, onChange: (value) => setEditing((current) => ({ ...current, folder: value })), options: folders }),
        h(TextInput, { label: "Tags", value: editing.tagsText, onChange: (value) => setEditing((current) => ({ ...current, tagsText: value })) }),
        h(TextInput, { label: "Image URL", value: mediaUrl(editing), onChange: (value) => setEditing((current) => ({ ...current, url: value })), className: "full" }),
        h(TextInput, { label: "Alt text", value: editing.altText, onChange: (value) => setEditing((current) => ({ ...current, altText: value })), className: "full" }),
        h(TextInput, { label: "Caption", value: editing.caption, onChange: (value) => setEditing((current) => ({ ...current, caption: value })), className: "full" }),
      ),
      h(FormActions, { onCancel: () => setEditing(null) }),
    ),
    h("div", { className: "media-grid" }, filteredMedia.map((item) => {
      const url = mediaUrl(item);
      const id = itemId(item);
      const replaceInputId = `replace-${String(id || url).replace(/[^a-z0-9_-]/gi, "-")}`;
      return h("article", { key: itemId(item) || url, className: "media-card" },
        h("div", { className: "media-card-select" }, h("input", { type: "checkbox", checked: selectedIds.includes(id), onChange: () => toggleSelected(id), "aria-label": `Select ${item.title || "media item"}` })),
        h("img", { src: url, alt: item.altText || item.title || "CMS media", loading: "lazy" }),
        h("div", { className: "media-card-body" },
          h("strong", null, item.title || item.publicId || "Image"),
          h("span", { className: cx(!item.altText && "media-warning") }, item.altText || "Missing alt text"),
          item.caption && h("span", null, item.caption),
          h("span", null, `${item.folder || "No folder"} / ${item.source || item.provider || "external"}`),
          h("span", null, `${mediaType(item)}${item.width && item.height ? ` / ${item.width}x${item.height}` : ""} / ${formatFileSize(item.bytes)}`),
          h("span", null, `Created: ${formatDate(item.createdAt || item.uploadedAt || item.updatedAt)}`),
          mediaTags(item).length ? h("div", { className: "media-tag-row" }, mediaTags(item).map((tag) => h("em", { key: tag }, tag))) : h("span", null, "No tags"),
          h("div", { className: "cms-row-actions" },
            h("button", { type: "button", className: "mini-button", onClick: () => startEdit(item) }, h(Edit3, { size: 15 }), "Edit"),
            h("button", { type: "button", className: "mini-button", onClick: () => copyUrl(url) }, h(Copy, { size: 15 }), "Copy URL"),
            h("button", { type: "button", className: "mini-button", onClick: () => document.getElementById(replaceInputId)?.click(), disabled: replacingId === id }, h(ImageIcon, { size: 15 }), replacingId === id ? "Replacing..." : "Replace"),
            h("input", { id: replaceInputId, type: "file", accept: "image/*", hidden: true, onChange: (event) => replaceImage(item, event.target.files?.[0]) }),
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
        h("div", { className: "cms-section-title full" }, h("h3", null, "Partners & Authorizations"), h("p", null, "Edit partner cards shown on the Partners page. Set status to inactive to hide a partner.")),
        h(TextArea, { label: "Partner cards JSON", value: draft.partnersText, onChange: (value) => set("partnersText", value), className: "full" }),
        h(PartnerLogoTools, { value: draft.partnersText, onChange: (value) => set("partnersText", value) }),
        h("div", { className: "partner-preview-list full" }, normalizePartners(parseJsonText(draft.partnersText, defaultPartners)).map((partner) => h("article", { key: partner.partnerName }, partner.partnerLogoUrl ? h("img", { src: partner.partnerLogoUrl, alt: partner.partnerLogoAlt || partner.partnerName }) : h("span", { className: "partner-logo-fallback" }, initialsFor(partner.partnerName)), h("strong", null, partner.partnerName), h("span", null, partner.authorizationText), h("small", null, partner.partnerType)))),
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
  const defaultTagline = trustTagline;
  return {
    ...item,
    siteName: item.siteName || "Abroadways",
    navbarLogoUrl: item.navbarLogoUrl || item.siteLogoUrl || "/images/abroadways-navbar-logo-320x90.png",
    navbarLogoAlt: item.navbarLogoAlt || "Abroadways logo",
    navbarTaglineText: taglineValue(item.navbarTaglineText, item.navbarTagline, item.logoCaption, item.logoTagline, defaultTagline),
    navbarTagline: taglineValue(item.navbarTaglineText, item.navbarTagline, item.logoCaption, item.logoTagline, defaultTagline),
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
    logoCaption: taglineValue(item.logoCaption, item.navbarTagline, item.logoTagline, defaultTagline),
    footerLogoUrl: item.footerLogoUrl || item.navbarLogoUrl || item.siteLogoUrl || "/images/abroadways-navbar-logo-320x90.png",
    footerLogoAlt: item.footerLogoAlt || "Abroadways logo",
    footerTaglineText: taglineValue(item.footerTaglineText, item.footerTagline, item.navbarTagline, item.logoCaption, defaultTagline),
    footerTagline: taglineValue(item.footerTaglineText, item.footerTagline, item.navbarTagline, item.logoCaption, defaultTagline),
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
    partnersText: jsonText(item.partners || item.partnerAuthorizations || defaultPartners),
  };
}

function PartnerLogoTools({ value, onChange }) {
  const partners = parseJsonText(value, defaultPartners);
  if (!Array.isArray(partners)) return h("div", { className: "notice-card full" }, "Partner JSON must be a list before logo tools can load.");
  const updatePartner = (index, patch) => {
    const next = partners.map((partner, partnerIndex) => partnerIndex === index ? { ...partner, ...patch } : partner);
    onChange(jsonText(next));
  };
  return h("div", { className: "partner-logo-tools full" },
    h("div", { className: "cms-section-title" }, h("h3", null, "Partner Logo Picker"), h("p", null, "Select logos from the media library or paste URLs. The partner JSON updates automatically.")),
    h("div", { className: "partner-logo-tool-grid" }, partners.map((partner, index) => h("article", { key: `${partner.partnerName || "partner"}-${index}` },
      h(ImageField, { label: `${partner.partnerName || `Partner ${index + 1}`} logo`, value: partner.partnerLogoUrl || "", onChange: (url) => updatePartner(index, { partnerLogoUrl: url }), folder: "abroadways/partners" }),
      h(TextInput, { label: "Logo alt text", value: partner.partnerLogoAlt || "", onChange: (alt) => updatePartner(index, { partnerLogoAlt: alt }) }),
    ))),
  );
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
    partners: parseJsonText(draft.partnersText, defaultPartners),
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
      h("div", null, h("h3", null, "Contact Us"), h("p", null, settings.address), settings.phones.map((phone) => h("a", { key: phone, href: `tel:${phone}` }, phone)), settings.email && h("a", { href: `mailto:${settings.email}` }, settings.email), h("a", { href: settings.facebook, target: "_blank", rel: "noreferrer" }, "Facebook"), h("a", { href: settings.instagram, target: "_blank", rel: "noreferrer" }, "Instagram")),
      h("div", null, h("h3", null, "Study Destinations"), items.map((destination) => h(Link, { key: destination.slug, href: `${routes.studyAbroad}/${destination.slug}` }, destination.name))),
      h("div", null, h("h3", null, "Quick Links"), h(Link, { href: routes.planner }, "Book Free Consultation"), h(Link, { href: routes.services }, "Services"), h(Link, { href: routes.academy }, "Academy"), h(Link, { href: routes.whoAreWe }, "Who Are We"), h(Link, { href: routes.blog }, "Blog"), h(Link, { href: routes.contact }, "Contact Us")),
      h("div", null, h("h3", null, "Academy"), h(Link, { href: routes.academy }, "Academy Coming Soon"), h(Link, { href: routes.partners }, "Our Partners"), h(Link, { href: routes.contact }, "Ask about testing services"), h(Link, { href: routes.planner }, "Plan my pathway")),
      h("div", { className: "footer-subscribe" }, h("h3", null, "Newsletter"), h("p", null, "Get study abroad guides and planning notes from Abroadways."), h("div", { className: "footer-subscribe-form" }, h("input", { type: "email", placeholder: "Your email", "aria-label": "Newsletter email" }), h("button", { type: "button" }, "Subscribe"))),
    ),
    h("div", { className: "footer-bottom container" }, `Copyright ${new Date().getFullYear()} Abroadways Limited. All rights reserved.`),
  );
}

function Footer({ items = destinations, settings = contactInfo }) {
  return h("footer", { className: "footer" }, h("div", { className: "container footer-grid" }, h("div", null, h("div", { className: "footer-brand" }, h("span", { className: "brand-mark" }, "A"), h("span", null, "Abroadways")), h("p", null, "Premium study abroad counselling for New Zealand, the United Kingdom, Australia, Canada, and Malaysia.")), h("div", null, h("h3", null, "Destinations"), items.map((destination) => h(Link, { key: destination.slug, href: `${routes.studyAbroad}/${destination.slug}` }, destination.name))), h("div", null, h("h3", null, "Explore"), h(Link, { href: routes.services }, "Services"), h(Link, { href: routes.planner }, "Pathway Planner"), h(Link, { href: routes.blog }, "Blog"), h(Link, { href: routes.about }, "About Us")), h("div", null, h("h3", null, "Contact"), h("p", null, settings.address), settings.phones.map((phone) => h("a", { key: phone, href: `tel:${phone}` }, phone)), h("a", { href: settings.facebook, target: "_blank", rel: "noreferrer" }, "Facebook"), h("a", { href: settings.instagram, target: "_blank", rel: "noreferrer" }, "Instagram"))), h("div", { className: "footer-bottom container" }, `© ${new Date().getFullYear()} Abroadways Limited. All rights reserved.`));
}

function FloatingTestCta() {
  return h(Link, { href: routes.academy, className: "floating-test-cta", "aria-label": "Book Your Test" },
    h("strong", null, "Book Your Test"),
    h("span", null, "Testing services and Academy coming soon."),
  );
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
  React.useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const nodes = Array.from(document.querySelectorAll("main .section, main .final-cta, main .success-metrics-section"));
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("reveal-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => {
      node.classList.add("scroll-reveal");
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, [path, cms.loaded]);

  const page = useMemo(() => {
    if (path === routes.login) return h(LoginPage);
    if (path.startsWith("/dashboard")) {
      const section = path.split("/")[2] || "overview";
      return h(AuthGate, { section });
    }
    if (path === routes.home) return h(HomePage, { cms, destinations: destinationItems, blogs: blogItems, settings });
    if (path === routes.studyAbroad) return h(StudyAbroadPage, { cms, destinations: destinationItems });
    if (path === routes.services) return h(ServicesPage, { cms });
    if (path === routes.academy) return h(AcademyPage, { cms });
    if (path === routes.partners) return h(PartnersPage, { cms, settings });
    if (path === routes.whoAreWe || path === routes.about) return h(WhoAreWePage, { cms, destinations: destinationItems, settings });
    if (path === routes.planner) return h(PathwayPlannerPage);
    if (path === routes.blog) return h(BlogPage, { blogs: blogItems, cms });
    if (path.startsWith(`${routes.blog}/`)) {
      const post = blogItems.find((item) => path === `${routes.blog}/${item.slug}`);
      return post ? h(BlogDetailPage, { post, blogs: blogItems }) : h(NotFoundPage);
    }
    if (path === routes.contact) return h(ContactPage, { cms, settings });
    const country = destinationItems.find((destination) => path === `${routes.studyAbroad}/${destination.slug}` || path === `${routes.studyAbroad}/${destination.legacySlug}`);
    if (country) return h(CountryPage, { destination: country });
    return h(NotFoundPage);
  }, [path, cms, destinationItems, blogItems, settings]);

  const isAdminSurface = path.startsWith("/dashboard") || path === routes.login;
  return h(React.Fragment, null, !isAdminSurface && h(Navbar, { items: destinationItems, settings }), h("main", null, page), !isAdminSurface && h(FloatingTestCta), !isAdminSurface && h(FooterPro, { items: destinationItems, settings }));
}

createRoot(document.getElementById("root")).render(h(App));
