import Link from 'next/link'

const MainMenu = () => {
    return (
        <>
            <ul>
                    <li><Link href="/">Home</Link></li>
                <li className="menu-item-has-children"><Link href="#">Services <i className="fas fa-angle-down"></i></Link>
                    <ul className=' sub-menu ' >
                        <li><Link href="/services/Data-Analytics-Consulting">Data Analytics Consulting</Link></li>
                        <li><Link href="/services/Web-App-Developments">Web App Developments</Link></li>
                        <li><Link href="/services/cloud-computing">Cloud Computing</Link></li>
                        <li><Link href="/services/AI-Software-Development">AI Software Development</Link></li>
                        <li><Link href="/services/Legacy-Software-Modernization">Legacy Software Modernization</Link></li>
                        <li><Link href="/services">View more services</Link></li>
                    </ul>
                </li>
                
                <li className="menu-item-has-children"><Link href="/blog">Blogs</Link></li>
                <li><Link href="/about">About us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </>
    );
};

export default MainMenu;