import React, { useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lasyLoading/Lasyloding'
import ContentWrapper from '../../../components/contentwrapper/contentwraper'

function Herobanner() {
  const {url}=useSelector(state=>state.home) //base url
  const [background,setbackgroud]=useState("") //home page banner
  const [query,setquery]=useState("") //search input
  const navigate=useNavigate()
  const {data,loading}=useFetch('/movie/upcoming')


const searchQueryHandler=(event)=>{
  if((event.key=='Enter' || event.type === "click") && query.length>0 ){
    setquery("")
    navigate(`/search/${query}`)

  }
}

  // selecting url to change background
  useEffect(()=>{
    setbackgroud(url.backdrop+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path)
   
  },[data])



  return (
    <div className='heroBanner'>

      <div className="backdrop_img">
        {!loading && <Img src={background} />}
      </div>
      <div className="opacity_layer"></div>

      <ContentWrapper>
        <div className='heroBannerContent'>

          <span className='title'>Welcome</span>
          <span className='subtitle'>let's watch a movie</span>

          <div className='serachInput'>
              <input type='text'value={query} onChange={(e)=>setquery(e.target.value)} onKeyDown={searchQueryHandler} placeholder='search movie ....'/>
              <button onClick={searchQueryHandler} >search</button>
          </div>

      </div>
      </ContentWrapper>
    
    </div>
  )
}

export default Herobanner