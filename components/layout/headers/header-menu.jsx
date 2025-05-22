import Link from 'next/link'

const MainMenu = () => {
    return (
        <>
            <ul>
                    <li><Link href="/">Home</Link></li>
                <li className="menu-item-has-children"><Link href="#">Consulting<i className="fas fa-angle-down"></i></Link>
                    <ul className=' sub-menu ' >
                      <li><Link href="/services/Data-Analytics-Consulting">Data Analytics & Insights</Link></li>
<li><Link href="/services/Web-App-Developments">Web Application Development</Link></li>
<li><Link href="/services/cloud-computing">Cloud Computing & Infrastructure</Link></li>
<li><Link href="/services/AI-Software-Development">Artificial Intelligence Solutions</Link></li>
<li><Link href="/services/Legacy-Software-Modernization">Legacy System Modernization</Link></li>
<li><Link href="/services">View All Services</Link></li>

                    </ul>
                </li> 
                 <li ><Link href="https://codiin.com/" target='_blank' >Training</Link></li>
                <li className="menu-item-has-children"><Link href="/blog">Blogs</Link></li>
                <li><Link href="/about">About us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </>
    );
};

export default MainMenu;