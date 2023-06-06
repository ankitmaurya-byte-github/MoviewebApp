import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import { PlayIcon } from "./playbutton";
import ContentWrapper from "../../../components/contentwrapper/contentwraper";
import useFetch from "../../../hooks/useFetch";
import Genre from "../../../components/genre/Genre";
import CircleRating from "../../../components/circlerating/CircleRating";
import Img from "../../../components/lasyLoading/Lasyloding";
import PosterFallback from "../../../assets/no-poster.png";
import VideoPopup from "../../../components/videoPopup/VedioPopUp";
import Recommendation from "../carousels/Recomendation";
import Similar from "../carousels/similar";
const DetailsBanner = ({ video, crew }) => {
    video=video?.filter(play=>play.type=='Trailer')
    const [show,setshow]=useState(false)
    const [vedioId,setVedioId]=useState(null)
    const {url}=useSelector(state=>state.home)
    const {mediatype,id}=useParams()
    const {data,loading}=useFetch(`/${mediatype}/${id}`)
    const director=crew?.filter(member=>member.job=="Director")
    const created_by=crew?.filter(member=>member.job=='Creator')
    const writer=crew?.filter(member=>(member.job=='Writer' || member.job=='Story' ||member.job=='ScreenPlay'))


    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const detailgenre=data?.genres?.map(g=>g.id)
    return (    
        <div className="detailsBanner">
            {!loading ? (
                <>
                {!!data && (
                    <React.Fragment>
                        <div className="backdrop-img">
                            <Img src={url.poster+data?.backdrop_path}/>
                        </div>
                        <div className="opacity-layer"></div>
                        <ContentWrapper>

                            <div className="content">
                                <div className="left">
                                  <Img className="posterImg" src={data?.poster_path?url.poster+data?.poster_path:PosterFallback}/>
                                </div>
                                <div className="right">
                                    <div className="title">
                                        {`${data.title || data.name} 
                                        (${dayjs(data?.release_date).format("YYYY")}
                                        )`}
                                    </div>
                                    <div className="subtitle">
                                        {data.tagline}
                                    </div>
                                    <Genre data={detailgenre}/>
                                    <div className="row">
                                        <CircleRating rating={data?.vote_average.toFixed(1)} />
                                        <div className="playbtn" onClick={()=>{
                                            setshow(true)
                                            setVedioId(video[0]?.key)
                                        }}>
                                        <PlayIcon/>
                                        <span className="text">
                                            Watch Trailer
                                        </span>
                                        </div>
                                    </div>
                                    <div className="overview">
                                        <div className="heading">Overview</div>
                                        <div className="description">{data.overview}</div>
                                    </div>
                                    <div className="info">
                                      {data.status && (  <div className="infoItem">
                                            <span className="text bold">Status:{""}</span>
                                            <div className="text">{data.status}</div>
                                        </div>
                                    )}
                                      {data.release_date && (  <div className="infoItem">
                                            <span className="text bold">release_date:</span>
                                            <div className="text">{data.release_date}</div>
                                        </div>
                                    )}
                                 
                                      {data.runtime && (  <div className="infoItem">
                                            <span className="text bold">runtime:</span>
                                            <div className="text">{toHoursAndMinutes(data.runtime)}</div>
                                        </div>
                                    )}
                                    </div>
                                  {director?.length>0 && <div className="info">
                                        <span className="text bold">Director:{""}</span>
                                        <span className="text">{
                                            director.map((member,i)=>(
                                                <span key={i}>{member.name}{i==director.length-1?"":", "}</span>
                                            ))
                                        }</span>
                                    </div>}
                                  {writer?.length>0 && <div className="info">
                                        <span className="text bold">writer:{""}</span>
                                        <span className="text">{
                                            director.map((member,i)=>(
                                                <span key={i}>{member.name}{i==writer.length-1?"":", "}</span>
                                            ))
                                        }</span>
                                    </div>}
                                  {created_by?.length>0 && <div className="info">
                                        <span className="text bold">created_by:{""}</span>
                                        <span className="text">{
                                            director.map((member,i)=>(
                                                <span key={i}>{member.name}{i==created_by.length-1?"":", "}</span>
                                            ))
                                        }</span>
                                    </div>}
                                </div>
                            </div>
                            <VideoPopup 
                            show={show}
                            setshow={setshow}
                            vedioId={vedioId}
                            setVedioId={setVedioId}
                            />

                        </ContentWrapper>
                    </React.Fragment>
                )}
                
                </>
      
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
