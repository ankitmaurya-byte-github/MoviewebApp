import React from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailBanner/DetailBanner'
import Cast from './cast/Cast'
import VideosSection from './vediosection/VedioSection'
import Recommendation from './carousels/Recomendation'
import Similar from './carousels/similar'
function Details() {
        const {mediatype,id}=useParams()
        const {data,loading}=useFetch(`/${mediatype}/${id}/videos`)
        const {data:credits,loading:creditsLoading}=useFetch(`/${mediatype}/${id}/credits`)
  return (
    <div>
        <DetailsBanner  video={data?.results} crew={credits?.crew}/>
        <Cast data={credits?.cast} loading={creditsLoading}/>
        <VideosSection data={data?.results} loading={loading}/>
        <Recommendation mediaType={mediatype} id={id}/>
        <Similar mediaType={mediatype} id={id}/>
    </div>
  )
}

export default Details