import React, { useState } from 'react'
import './style.scss'
import { useDispatch } from 'react-redux'
import useFetch from '../../hooks/useFetch'
function Switchtabs({data,onTabChange}) {
    const [selectedTabs,setSelectedTabs]=useState(0)
    const [left,setleft]=useState(0)
    const activetab=(tab,index)=>{
        setleft(index*100)
        setSelectedTabs(index)
        onTabChange(tab)
    }
  return (
    <div className="switchingTabs">
        <div className="tabItems">
            {data.map((tab,index)=>{
              return <span key={index} onClick={()=>activetab(tab,index)} className={`tabItem ${selectedTabs==index?'active':''}`}>{tab}</span>
            })}
        <span className="movingBg" style={{left}}/>
        </div>
    </div>
  )
}

export default Switchtabs