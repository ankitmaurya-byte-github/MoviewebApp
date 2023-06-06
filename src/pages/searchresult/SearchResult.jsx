import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './style.scss'
import useFetch from '../../hooks/useFetch'
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentwrapper/contentwraper'
import noresults from '../../assets/no-results.png'
import Spinner from '../../components/spinner/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/moviecard/MovieCard'
function SearchResult() {
  const [data,setdata]=useState({})
  const [pagenum,setpagenum]=useState(1)
  const [loading,setloading]=useState(false)
  const {query}=useParams()
  const initialfetchdata=()=>{
    setloading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then((res)=>{
      setdata(res)
      setloading(false)
      setpagenum(prev=>prev+1)
    })
  }
  const nextfetchdata=()=>{
    setloading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then((res)=>{
        if(data.results){
          setdata({
        ...data,
        results:[...data.results,...res.results]
      })
        }else{
          setdata(res)
        }
        setloading(false)
        setpagenum(prev=>prev+1)
    })
  }
  useEffect(()=>{
    setpagenum(1)
    initialfetchdata()
  },[query])
  return (
 
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}/>}
      {!loading && <ContentWrapper>
          {data?.results?.length>0?
         <>
             <div className="pageTitle">
              {`search results for ${query} `}
             </div>
             <InfiniteScroll
             className="content"
             dataLength={data?.results?.length || []}
             next={nextfetchdata}
             hasMore={pagenum<=data?.total_pages}
             loader={<Spinner/>}
             >
              {data?.results?.map((card,index)=>{
               return <MovieCard key={index} data={card} fromSearch={true} />
              })}
             </InfiniteScroll>

          </>: <div className="resultNotFound">
            {`result not found ,try another search`}
          </div> }
        </ContentWrapper>} 
    </div>
  )
}

export default SearchResult