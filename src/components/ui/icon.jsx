import {
  Bot,
  Braces,
  ChartColumnBig,
  CloudCog,
  CodeXml,
  Globe,
  Headset,
  LifeBuoy,
  RadioTower,
  Satellite,
  Search,
  Smartphone,
  Wrench,
} from "lucide-react";

/**
 * Maps the icon names stored in our data files onto lucide-react components,
 * which keeps the data files plain JS with no JSX in them.
 *
 * Brand logos live in social-icon.jsx instead — lucide removed them in v1.
 */
const ICONS = {
  Bot,
  Braces,
  ChartColumnBig,
  CloudCog,
  CodeXml,
  Globe,
  Headset,
  LifeBuoy,
  RadioTower,
  Satellite,
  Search,
  Smartphone,
  Wrench,
};

/** Renders an icon by name, falling back to a neutral icon if unknown. */
export function Icon({ name, className, ...props }) {
  const Component = ICONS[name] ?? Globe;
  return <Component className={className} aria-hidden="true" {...props} />;
}
