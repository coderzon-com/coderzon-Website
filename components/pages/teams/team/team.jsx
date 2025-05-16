import Link from 'next/link';
import teamData from '../../../data/team-data';

const TeamMain = () => {
    return (
        <>
            <div className="team__two section-padding">
                <div className="container">
                    <div className="row gy-4 justify-content-center">
                        {teamData?.map((data, id) => (
                            <div className="col-xl-4 col-lg-4 col-md-6" key={id}>
                                <div className="team__two-team-item">
                                    <img src={data.image.src} alt="image" />
                                    <div className="team__two-team-item-content">
                                        <div className="member-name">
                                            <h3>{data.name}</h3>
                                            <span>{data.position}</span>
                                        </div>
                                        <div className="fas fa-share-alt share-link-wrapper">
                                            <div className="share-links">
                                                {data.social_link.map((social, id) => (
                                                    <Link className="inner-link" key={id} href={social.link} target={social.target}>{social.icon}</Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))};
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamMain;