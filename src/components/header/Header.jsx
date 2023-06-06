import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentwrapper/contentwraper";
import logo from '../../assets/movix-logo.svg'

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        window.scrollTo(0,0)
    },[location])
    const searchQueryHandler=(event)=>{
        if(event.key=='Enter' && query.length>0 ){
          setQuery("")
          navigate(`/search/${query}`)
        }
      }
      const handelScroll=()=>{
        if(window.scrollY>200){
            if(lastScrollY<window.scrollY && !mobileMenu){
                setShow('hide')
            }else{
                setShow('show')
            }
        }else{
            setShow('top')
        }
        setLastScrollY(window.scrollY)
      }
      useEffect(()=>{
        window.addEventListener('scroll',handelScroll)
      },[lastScrollY])

    const openSearch=()=>{
        setMobileMenu(false)
        setShowSearch(true)
    }
    const openMobileMenu=()=>{
        setMobileMenu(true)
        setShowSearch(false)
    }
    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobileMenu(false);
    };
    return (
        <header className={`header${mobileMenu?" mobileView":""} ${show}`}>
            
            <ContentWrapper>
                <div className="logo" onClick={()=>navigate('/')}>
                    <img src={logo} alt=""/>
                </div>
                <ul className="menuItems">
                    <li className="menuItem"  onClick={() => navigationHandler("movie")}>movie </li>
                    <li className="menuItem"  onClick={() => navigationHandler("tv")}>tv show</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch}/>
                    </li>
                </ul>
                
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch}/>
                    {mobileMenu?<VscChromeClose onClick={()=>setMobileMenu(false)} />:<SlMenu onClick={openMobileMenu}/>}
                </div>
            </ContentWrapper>

            {showSearch && <div className="searchBar">
                <ContentWrapper>
                    <div className="searchInput">

                <input type='text'value={query} onChange={(e)=>setQuery(e.target.value)} onKeyDown={searchQueryHandler} placeholder='search movie ....'/>
                    <VscChromeClose onClick={()=>setShowSearch(false)}/>
                    </div>
                </ContentWrapper>
            </div>}
            
        </header>
    );
};

export default Header;
