import React from 'react'
import Skeleton from './Skeleton'

export default function NewItemsSkeleton() {
    return (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ width: "100%", maxWidth: "100%", padding: "0" }}>
            <div className="nft__item">
                <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                </div>
                <Skeleton width="100%" height="350px" />
                <div className="nft__item_info">
                    <Skeleton width="180px" height="30px" />
                    <div className="nft__item_price">
                        <Skeleton width="100px" height="20px" />
                    </div>
                    <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <Skeleton width="30px" height="15px" />
                    </div>
                </div>
            </div>
        </div>
    )
}
