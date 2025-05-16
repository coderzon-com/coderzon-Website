"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const ResponsiveMenu = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const active = (value) => setActiveMenu(value === activeMenu ? null : value),
    activeIcon = (value) => (activeMenu == value ? "mean-clicked" : ""),
    activeSubMenu = (value) => value == activeMenu ? { display: "block" } : { display: "none" };

  return (
        <>
            <ul>
                <li className='menu-item-has-children'>
                    <Link href='/'>Home</Link>
                </li>  
                <li className='menu-item-has-children'><Link href='#'>Services</Link>
                    <ul className='sub-menu' style={activeSubMenu("services")}>
                        <li><Link href="/services/Data-Analytics-Consulting">Data Analytics Consulting</Link></li>
                        <li><Link href="/services/Web-App-Developments">Web App Developments</Link></li>
                        <li><Link href="/services/MVP-Development">MVP Development</Link></li>
                        <li><Link href="/services/cloud-computing">Cloud Computing</Link></li>
                        <li><Link href="/services/Mobile-App-Developments">Mobile App Developments</Link></li>
                        <li><Link href="/services">View more services</Link></li>
                    </ul>
                    <a className={`mean-expand ${activeIcon("services")}`} onClick={() => active("services")}></a>
                </li>
                <li><Link href='/blog'>Blogs</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>   
            </ul>  
        </>
    );
};

export default ResponsiveMenu;