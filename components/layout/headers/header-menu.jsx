import Link from 'next/link'

const MainMenu = () => {
    return (
        <>
            <ul>
                    <li><Link href="/">Home</Link></li>
                <li className="menu-item-has-children"><Link href="#">Consulting<i className="fas fa-angle-down"></i></Link>
                    <ul className=' sub-menu ' >
                      <li><Link href="/services/data-analytics-consulting-services">Data Analytics & Business Intelligence</Link></li>
  <li><Link href="/services/web-development-services">Custom Web Application Development</Link></li>
  <li><Link href="/services/cloud-computing">Cloud Infrastructure & Solutions</Link></li>
  <li><Link href="/services/machine-learning-app-development-services">AI & Machine Learning Solutions</Link></li>
  <li><Link href="/services/software-modernization">Enterprise Software Modernization</Link></li>
  <li><Link href="/services">Explore All Services</Link></li>
                    </ul>
                </li> 
     <li className="menu-item-has-children"><Link href="#">Products and Platforms<i className="fas fa-angle-down"></i></Link>
                    <ul className=' sub-menu ' >
  <li><Link href="/product-platforms/Microsoft-BI">Microsoft BI</Link></li>
  <li><Link href="/product-platforms/Open-Source-BI">Open Source BI</Link></li>
  <li><Link href="/product-platforms/Amazon-Web-Services">Amazon Web Services</Link></li>
  <li><Link href="/product-platforms/Microsoft-Azure">Microsoft Azure</Link></li>
  <li><Link href="/product-platforms/Google-Cloud">Google Cloud</Link></li>
  <li><Link href="/product-platforms/shopify">Shopify</Link></li>
  <li><Link href="/product-platforms/WordPress">WordPress</Link></li>
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