import { siteConfig } from "@/config/site";
import { services } from "./services";
import { platforms } from "./platforms";

/**
 * Copy for the homepage sections. Kept out of the components so marketing
 * text can be edited without touching JSX.
 */

export const hero = {
  // Mono spec line — real discipline and location, not a tagline.
  spec: ["Technology consulting", "Kochi, India"],
  titleStart: "Transforming business with",
  titleHighlight: "Innovation",
  titleEnd: "",
  description:
    "We build the data platforms, cloud systems and AI that businesses run on \u2014 from first architecture to the team that keeps it running.",
  primaryCta: { label: "Find solutions", href: "/services" },
  secondaryCta: { label: "Talk to an expert", href: "/contact" },
};

export const aboutSection = {
  eyebrow: "About Coderzon",
  title: "A technology partner, not only a staffing supplier",
  lead: "We deliver consulting that drives innovation and business success. Our software architects and engineers help organisations build digital systems that are scalable, secure and ready for what comes next.",
  body: "From enterprise web and mobile to AI, data engineering, cloud and system integration, we bring deep technical expertise to every engagement \u2014 whether you are a startup racing to product-market fit or a larger company upgrading systems it already runs.",
  // Drawn from the description above; every row is a fact we can stand behind.
  spec: [
    { label: "Disciplines", value: "Data engineering, cloud, AI and product" },
    {
      label: "Engagements",
      value: "New products, and upgrades to systems you already run",
    },
    { label: "Team", value: "Software architects and senior engineers" },
    { label: "Based", value: "Kochi, India \u2014 working globally" },
  ],
  cta: { label: "Discover more", href: "/services" },
  yearsExperience: siteConfig.yearsExperience,
  image: "/images/about-primary.png",
  imageCaption: "Building for what comes next",
};

export const whyChooseUsSection = {
  eyebrow: "Why Choose Us",
  title: "One team, from architecture to uptime",
  description:
    "We plan the system, build it, and stay on to run it. The people who designed your platform are the people who answer when it needs attention.",
  image: "/images/why-choose-us.png",
  imageCaption: "Senior engineers, in-house",
  // Each tag is a fact drawn from the service and platform catalogues.
  reasons: [
    {
      icon: "Wrench",
      tag: "Architecture-led",
      title: "Innovative tech leadership",
      description:
        "Harnessing ingenuity and foresight, we pioneer advanced solutions that set the standard rather than follow it.",
    },
    {
      icon: "LifeBuoy",
      tag: "Around the clock",
      title: "Reliable global support",
      description:
        "Day or night, our support team stands ready with reliable assistance and deep technical expertise.",
    },
    {
      icon: "CloudCog",
      tag: `${platforms.length} platforms`,
      // Retitled: "Vendor-neutral by design" is the heading of the platforms
      // section, and the same sentence twice on one page weakens both. This
      // says the same thing in the words of its own description below.
      title: "Chosen for fit, not licence",
      description:
        "Microsoft, AWS, Google Cloud and open-source stacks. We recommend what fits the problem, not a licence quota.",
    },
    {
      icon: "CodeXml",
      tag: `${services.length} services`,
      title: "Owned end to end",
      description:
        "Discovery, delivery, modernisation and long-term maintenance sit under one roof and one accountable team.",
    },
  ],
};

export const workProcessSection = {
  eyebrow: "How we work",
  // Retitled. "Sustainable and responsible computing" described nothing in
  // this section — the eyebrow, the description and all three steps are about
  // a gated three-stage process, and the heading pointed somewhere else
  // entirely. This one says what the section actually contains.
  title: "Three stages, each closed before the next",
  description:
    "Three stages, in order. Each one has to close before the next begins, so nothing is built on an assumption nobody checked.",
  steps: [
    {
      number: "01",
      title: "Assess requirements precisely",
      description:
        "We start by understanding the business need in full, so the solution fits the problem rather than the other way round.",
    },
    {
      number: "02",
      title: "Develop custom solutions",
      description:
        "Software designed against your specific targets, built by the architects who scoped it.",
    },
    {
      number: "03",
      title: "Implement and support",
      description:
        "New systems integrated into your framework, with ongoing support and continual optimisation.",
    },
  ],
};

export const contactSection = {
  eyebrow: "Start a conversation",
  title: "Tell us what you are trying to build",
  description:
    "Send the problem rather than a spec. We will tell you what it takes, who would work on it, and whether we are the right people for it.",
  person: {
    name: "Vijeesh TP",
    role: "Founder",
    photo: "/images/vijeesh-tp.jpg",
    linkedIn: "https://www.linkedin.com/in/vijeesh-tp-91268015a/",
  },
};
