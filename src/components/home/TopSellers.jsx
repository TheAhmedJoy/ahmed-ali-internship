import React, { useEffect, useState } from "react";
import axios from "axios"
import Skeleton from "../UI/Skeleton";
import TopSellersItem from "../UI/TopSellersItem";

const TopSellers = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [topSellersData, setTopSellersData] = useState([])

  useEffect(() => {
    fetchTopSellersData()
  }, [])

  async function fetchTopSellersData() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")

    setTopSellersData(data)
    setIsLoading(false)
  }

  function skeletonRender() {
    return (
      new Array(12).fill(0).map((_, index) => (
        <li key={index}>
          <div className="author_list_pp">
            <Skeleton width="50px" height="50px" borderRadius="50%" />
            <i className="fa fa-check"></i>
          </div>
          <div className="author_list_info">
            <Skeleton width="100px" height="20px" />
            <span>
              <Skeleton width="40px" height="20px" />
            </span>
          </div>
        </li>
      ))
    )
  }

  function topSellersRender() {
    return (
      topSellersData.map((item) => (
        <TopSellersItem authorName={item.authorName} authorImage={item.authorImage} authorId={item.authorId} price={item.price} key={item.id}/>
      ))
    )
  }

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="zoom-in" data-aos-duration="600" data-aos-once="true">Top Sellers</h2>
              <div className="small-border bg-color-2" data-aos="zoom-in" data-aos-duration="400" data-aos-once="true"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {isLoading ? (
                <>
                  {skeletonRender()}
                </>
              ) : (
                <>
                  {topSellersRender()}
                </>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
