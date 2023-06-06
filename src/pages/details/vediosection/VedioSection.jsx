import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentwrapper/contentwraper";
import { PlayIcon } from "../detailBanner/Playbutton";
import VideoPopup from "../../../components/videoPopup/VedioPopUp";
import Img from "../../../components/lasyLoading/Lasyloding";

const VideosSection = ({ data, loading }) => {
    const [show, setshow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {
                        data?.map(ved=>
                            <div key={ved.id} className="videoItem" onClick={()=>{
                                setshow(true)
                                setVideoId(ved?.key)
                            }}>
                            <div className="videoThumbnail">
                                <Img src={`https://img.youtube.com/vi/${ved?.key}/mqdefault.jpg`}/>
                                <PlayIcon/>
                            </div>
                            <div className="videoTitle">
                                {ved?.name}
                            </div>
                        </div>
                        )
                    }
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setshow={setshow}
                vedioId={videoId}
                setVedioId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;
