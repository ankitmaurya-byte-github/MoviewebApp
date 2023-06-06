import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentwrapper/contentwraper";
import Img from "../../../components/lasyLoading/Lasyloding";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                       { data?.map((item,index)=>{
                            let img=item?.profile_path ? url.poster+item.profile_path :avatar
                            return  (
                                <div key={item.item} className="listItem">
                                    <div className="profileImg">
                                    <Img src={img}/>
                                    </div>
                                    <div className="name">
                                        {item.name}
                                    </div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
