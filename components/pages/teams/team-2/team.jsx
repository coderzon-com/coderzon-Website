import teamData from "@/components/data/team-data";
import Link from "next/link";

const TeamMain = () => {
    return (
        <>
            <div className="team__one bg-color-2 section-padding">
                <div className="container">
                    <div className="row gy-4 justify-content-center">
                        {teamData?.map((data, id) => (
                            <div className="col-xl-4 col-lg-4 col-md-6" key={id}>
                                <div className="team__one-team-item">
                                    <img src={data.image.src} alt="image" />
                                    <div className="team__one-team-item-content">
                                        <div className="member-name">
                                            <span>{data.position}</span>
                                            <h3>{data.name}</h3>
                                        </div>
                                        <div className="team__one-social-wrapper fas fa-share-alt">
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