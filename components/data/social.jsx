import Link from 'next/link';
import React from 'react';

const Social = () => {
    return (
        <>
            <ul>
                <li><Link href="https://www.facebook.com/people/Coderzon/61564371975938" target="_blank"><i className="fab fa-facebook-f"></i></Link></li>
                <li><Link href="https://x.com/coderzon" target="_blank"><i className="fa-brands fa-x-twitter"></i></Link></li>
                <li><Link href="https://www.instagram.com/coderzon" target="_blank"><i className="fab fa-instagram"></i></Link></li>
                <li><Link href="https://www.linkedin.com/company/coderzon-technologies/" target="_blank"><i className="fab fa-linkedin-in"></i></Link></li>
                  <li><Link href="https://www.youtube.com/@codiin" target="_blank"><i className="fab fa-youtube"></i></Link></li>
                
            </ul>            
        </>
    );
};

export default Social;