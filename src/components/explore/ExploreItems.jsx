import React, { useEffect, useState } from "react";
import axios from "axios"
import Skeleton from "../UI/Skeleton";
import NewItemsTile from "../UI/NewItemsTile";

const ExploreItems = () => {

  const [sliceLength, setSliceLength] = useState()
  const [loadItemsLength, setLoadItemsLength] = useState()
  const [itemsData, setItemsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchItemsData(filterValue) {
    setIsLoading(true)

    if (filterValue) {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`)
      setItemsData(data)

      return
    }

    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`)
    setItemsData(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (itemsData.length > 0) {
      setSliceLength(itemsData.length - 8)
      setLoadItemsLength(itemsData.length)
      setIsLoading(false)
    }

  }, [itemsData])

  useEffect(() => {
    fetchItemsData()
  }, [])

  function skeletonRender() {
    return (
      new Array(8).fill(0).map((_, i) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i} data-aos="zoom-in" data-aos-duration="600" data-aos-once="true">
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
      ))
    )
  }

  function itemsRender() {
    return (
      itemsData.slice(0, sliceLength).map((item) => (
        <NewItemsTile authorId={item.authorId} authorImage={item.authorImage} nftImage={item.nftImage} nftId={item.nftId}
          title={item.title} price={item.price} likes={item.likes} expiryDate={item.expiryDate} useCarousel={false} key={item.id} />
      ))
    )
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => fetchItemsData(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {
        isLoading ? (
          <>
            {skeletonRender()}
          </>
        ) : (
          <>
            {itemsRender()}
          </>
        )
      }

      {
        sliceLength < loadItemsLength && (
          <div className="col-md-12 text-center">
            <button id="loadmore" className="btn-main lead" onClick={() => setSliceLength(sliceLength + 4)}>
              Load more
            </button>
          </div>
        )
      }
    </>
  );
};

export default ExploreItems;
