"use client";
import Link from "next/link";
import React, { useState } from "react";

const ResponsiveMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const active = (value) => setActiveMenu(value === activeMenu ? null : value),
    activeIcon = (value) => (activeMenu == value ? "mean-clicked" : ""),
    activeSubMenu = (value) =>
      value == activeMenu ? { display: "block" } : { display: "none" };

  return (
    <>
      <ul>
        <li className="menu-item-has-children">
          <Link href="/">Home</Link>
        </li>
        <li className="menu-item-has-children">
          <Link href="#">Consult</Link>
          <ul className="sub-menu" style={activeSubMenu("services")}>
           <li><Link href="/services/data-analytics-consulting-services">Data Analytics & Business Intelligence</Link></li>
  <li><Link href="/services/web-development-services">Custom Web Application Development</Link></li>
  <li><Link href="/services/cloud-computing">Cloud Infrastructure & Solutions</Link></li>
  <li><Link href="/services/machine-learning-app-development-services">AI & Machine Learning Solutions</Link></li>
  <li><Link href="/services/software-modernization">Enterprise Software Modernization</Link></li>
  <li><Link href="/services">Explore All Services</Link></li>
          </ul>
          <a
            className={`mean-expand ${activeIcon("services")}`}
            onClick={() => active("services")}
          ></a>
        </li>
           <li ><Link href="https://codiin.com/" target='_blank' >Training</Link></li>
        <li>
          <Link href="/blog">Blogs</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </>
  );
};

export default ResponsiveMenu;
