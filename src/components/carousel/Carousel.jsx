import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CircleRating from "../circlerating/CircleRating";
import ContentWrapper from "../contentwrapper/contentwraper";
import Img from "../lasyLoading/Lasyloding";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import Genre from "../genre/Genre";

function Carousel({data,loading,endingpoint,title}) {
  const ref=useRef()
    const navigate=useNavigate()

    const navigation=(direction)=>{
      const container=ref.current
      const scrollAmount=direction=='left'?container.scrollLeft-container.offsetWidth:container.scrollLeft+container.offsetWidth
      container.scrollTo({left:scrollAmount ,behavior:'smooth'})
    }
    const skitem=()=>{
      return(
        <div className="skeletonItem">
          <div className="posterBlock skeleton"></div>
          <div className="textBlock"></div>
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      )
    }
    const url=useSelector(a=>a.home.url)
  return (
    <div className="carousel">
        <ContentWrapper>
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={()=>navigation('left')}/>
        <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={()=>navigation('right')}/>

      {title && <div className="carouselTitle">{title}</div> }
        <div ref={ref} className="carouselItems">
           {!loading ? (data?.map((item)=>{
        const posterUrl=item?.poster_path?url.poster+item.poster_path:PosterFallback
              
              return  <div key={item.id} onClick={()=>{
                navigate(`/${item.media_type?item.media_type:endingpoint}/${item.id}`)}} className="carouselItem">

                    <div className="posterBlock">
                        <Img src={posterUrl}/>
                        <CircleRating rating={item.vote_average.toFixed(1)}/>
                        <Genre data={item.genre_ids.slice(2)}/>
                    </div>
                    <div className="textBlock">
                        <span className="title">{item.title || item.name}</span>
                        <span className="date">{dayjs(item.release_date).format("MMM D, YYYY")}</span>
                    </div>


                </div>
           })):
           <div className="loadingSkeleton">
            {skitem()}
            {skitem()}
            {skitem()}
            {skitem()}
            {skitem()}
            {skitem()}
            {skitem()}
            {skitem()}
            {skitem()}
           
           </div> }
        </div>
    </ContentWrapper>
    </div>
  )
}

export default Carousel