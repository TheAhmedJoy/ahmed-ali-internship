import React from 'react'
import { Link } from "react-router-dom";

export default function HotCollectionsTile({ authorId, authorImage, code, nftId, nftImage, title }) {
    return (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ width: "100%", maxWidth: "100%", padding: "0" }}>
            <div className="nft_coll">
                <div className="nft_wrap">
                    <Link to={`/item-details/`}>
                        <img src={nftImage} className="lazy img-fluid" alt="" /> 
                    </Link>
                </div>
                <div className="nft_coll_pp">
                    <Link to={`/author/`}>
                        <img className="lazy pp-coll" src={authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                    <Link to="/explore">
                        <h4>{title}</h4>
                    </Link>
                    <span>ERC-{code}</span>
                </div>
            </div>
        </div>
    )
}
