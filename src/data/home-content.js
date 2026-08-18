/**
 * Copy for the homepage sections. Kept out of the components so marketing
 * text can be edited without touching JSX.
 */

export const hero = {
  titleStart: "Transforming Business with",
  titleHighlight: "Innovation",
  description:
    "At CODERZON, we provide top-tier technology consulting and recruitment services, helping businesses thrive with tailored digital solutions and access to the industry's best tech talent.",
  cta: { label: "Find Solutions", href: "/services" },
  image: "/images/hero-robot-hand.png",
};

export const aboutSection = {
  eyebrow: "About us",
  title: "Empower businesses through technology, innovation, and excellence",
  body: "We specialize in delivering cutting-edge technology consulting services that drive innovation and business success. With a team of highly experienced software architects and engineers, we help organizations across the globe build scalable, secure, and future-ready digital solutions. From enterprise web and mobile app development to AI, data engineering, cloud computing, blockchain, and system integration, we bring deep technical expertise and industry insights to every project. Whether you're a startup looking to accelerate growth or an enterprise aiming to modernize your tech stack, Coderzon is your trusted technology partner.",
  cta: { label: "Discover More", href: "/services" },
  yearsExperience: 25,
  images: {
    primary: "/images/about-primary.png",
    secondary: "/images/about-secondary.png",
  },
};

export const featureSection = {
  eyebrow: "Core Features",
  title: "Innovative IT Strategies and Solutions",
  image: "/images/services-overview.png",
  features: [
    {
      icon: "Globe",
      title: "Cloud Solutions Management",
      description:
        "Seamless deployment, scaling, and monitoring of cloud infrastructure to ensure business continuity and agility.",
    },
    {
      icon: "ChartColumnBig",
      title: "Analytics & Business Intelligence",
      description:
        "Transform data into actionable insights with advanced analytics, dashboards, and data-driven decision-making tools.",
    },
    {
      icon: "CodeXml",
      title: "Custom Software Development",
      description:
        "Designing scalable, secure, and tailored software solutions that drive innovation and business efficiency.",
    },
    {
      icon: "Bot",
      title: "Machine Learning Implementation",
      description:
        "Deploy intelligent systems that automate processes, enhance accuracy, and unlock predictive capabilities.",
    },
  ],
};

export const whyChooseUsSection = {
  eyebrow: "Why Choose Us",
  title: "Tailored IT Strategies for Your Business",
  description:
    "Craft personalized action plans harnessing the latest IT innovations to support your business objectives, driving growth and advantage.",
  image: "/images/why-choose-us.png",
  reasons: [
    {
      icon: "Wrench",
      title: "Innovative Tech Leader",
      description:
        "Harnessing ingenuity and foresight, we consistently pioneer advanced solutions that set the industry standard.",
    },
    {
      icon: "LifeBuoy",
      title: "Reliable Global Support",
      description:
        "Day or night, our global support team stands ready, providing reliable assistance and technical expertise.",
    },
  ],
};

export const workProcessSection = {
  eyebrow: "Work Process",
  title: "Sustainable and Responsible Computing",
  yearsExperience: 20,
  images: {
    primary: "/images/work-process-1.png",
    secondary: "/images/work-process-2.png",
  },
  steps: [
    {
      number: "01",
      title: "Assess Requirements Precisely",
      description:
        "Begin by comprehensively understanding your business needs to ensure a perfect fit for tech solutions.",
    },
    {
      number: "02",
      title: "Develop Custom Solutions",
      description:
        "Engage in crafting tailor-made software designed meticulously to align with your specific targets.",
    },
    {
      number: "03",
      title: "Implement and Support",
      description:
        "Seamlessly integrate the new systems into your framework with ongoing support for continual optimization.",
    },
  ],
};

export const contactSection = {
  eyebrow: "Contact us",
  title: "Do you have any question?",
  description:
    "Got a tech challenge? We're here to solve it. From expert advice to end-to-end solutions, you can count on us to keep your digital world running smoothly — feel free to reach out anytime!",
  person: {
    name: "Vijeesh TP",
    photo: "/images/vijeesh-tp.jpg",
    linkedIn: "https://www.linkedin.com/in/vijeesh-tp-91268015a/",
  },
};
