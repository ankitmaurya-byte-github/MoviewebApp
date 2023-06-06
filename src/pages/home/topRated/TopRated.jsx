import React, { useEffect, useState } from 'react'
import './style.scss'
import ContentWrapper from '../../../components/contentwrapper/contentwraper'
import Switchtabs from '../../../components/switchtabs/Switchtabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
function TopRated() {
    const [endingpoint,setendingpoint]=useState('movie')
    const [trendingData,setTrendingData]=useState({})
    const onTabChange=(tab)=>{
        if(tab=='Movies'){
            setendingpoint('movie')
        }else{
            setendingpoint('tv')
        }
        
    }
    const {loading,data}=useFetch(`/${endingpoint}/top_rated`)
    
  return (
    <div className='carouselSection' >
        <ContentWrapper>
            <span className='carouselTitle'>
                TOP RATED
            </span>
            <Switchtabs data={['Movies','TV shows']} endingpoint={endingpoint} onTabChange={onTabChange}/>
        </ContentWrapper>
        
        <Carousel data={data?.results} loading={loading} endingpoint={endingpoint} />
    </div>
  )
}

export default TopRated