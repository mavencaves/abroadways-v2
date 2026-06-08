export const seedData = {
  pages: [
    {
      id: "home",
      routeKey: "home",
      title: "Homepage",
      slug: "/",
      heroHeading: "Study Abroad with Confidence",
      heroSubtitle: "Clear counselling, university application, and visa guidance for Bangladeshi students.",
      imageUrls: ["/images/abroadways-hero-campus.png"],
      ctaText: "Book Free Consultation",
      ctaLink: "/pathway-planner",
      seoTitle: "Abroadways | Study Abroad with Confidence",
      seoDescription: "Study abroad counselling for New Zealand, United Kingdom, Australia, Canada, and Malaysia.",
      ogImage: "/images/abroadways-hero-campus.png",
      status: "published",
    },
  ],
  countries: [
    { id: "new-zealand", countryName: "New Zealand", slug: "new-zealand", heroImage: "/images/destination-new-zealand.png", status: "published" },
    { id: "united-kingdom", countryName: "United Kingdom", slug: "united-kingdom", heroImage: "/images/destination-uk.png", status: "published" },
    { id: "australia", countryName: "Australia", slug: "australia", heroImage: "/images/destination-australia.png", status: "published" },
    { id: "canada", countryName: "Canada", slug: "canada", heroImage: "/images/destination-canada.png", status: "published" },
    { id: "malaysia", countryName: "Malaysia", slug: "malaysia", heroImage: "/images/destination-malaysia.png", status: "published" },
  ],
  blogs: [
    {
      id: "choose-right-study-abroad-destination",
      title: "How to Choose the Right Study Abroad Destination",
      slug: "choose-right-study-abroad-destination",
      excerpt: "A practical guide for Bangladeshi students comparing country fit, budget, course goals, and documentation.",
      category: "Planning",
      tags: ["study abroad", "counselling"],
      featuredImage: "/images/abroadways-destination-planning.png",
      status: "published",
      publishedAt: "2026-06-01",
    },
  ],
  leads: [],
  media: [
    { id: "hero-campus", url: "/images/abroadways-hero-campus.png", publicId: "hero-campus", altText: "Students on campus", uploadedBy: "system", createdAt: "2026-06-08T00:00:00.000Z" },
  ],
  settings: [
    {
      id: "site",
      siteLogoUrl: "",
      faviconUrl: "",
      contactInfo: {
        address: "260 Sareng Tower, Malibag, Dhaka-1217, Bangladesh",
        phones: ["01898801960", "01898801961", "01898801962"],
      },
      socialLinks: {
        facebook: "https://www.facebook.com/abroadways",
        instagram: "https://instagram.com/abroadwaysbd",
      },
    },
  ],
};
