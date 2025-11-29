import React, { useEffect, useState } from "react";
import axios from "axios"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";
import HotCollectionsTile from "../UI/HotCollectionsTile";


const HotCollections = () => {

  const [hotCollectionsData, setHotCollectionsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchHotCollectionsData()
  }, [])

  async function fetchHotCollectionsData() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")

    setHotCollectionsData(data)
    setIsLoading(false)
  }

  function skeletonRender() {
    return (
      new Array(4).fill(0).map((_, i) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i} >
          <div className="nft_coll">
            <div className="nft_wrap">
              <Skeleton width="100%" height="200px" />
            </div>
            <div className="nft_coll_pp">
              <Skeleton width="50px" height="50px"borderRadius="50%" />
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Skeleton width="100px" height="20px" />
              <br />
              <Skeleton width="60px" height="20px" />
            </div>
          </div>
        </div>
      ))
    )
  }

  function hotCollectionsRender() {
    return (
      hotCollectionsData.map((hotCollectionsItem) => (
        <HotCollectionsTile authorId={hotCollectionsItem.authorId} authorImage={hotCollectionsItem.authorImage}
          code={hotCollectionsItem.code} nftId={hotCollectionsItem.nftId} nftImage={hotCollectionsItem.nftImage} title={hotCollectionsItem.title}
          key={hotCollectionsItem.nftId} />
      ))
    )
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="zoom-in" data-aos-duration="600" data-aos-once="true">Hot Collections</h2>
              <div className="small-border bg-color-2" data-aos="zoom-in" data-aos-duration="600" data-aos-once="true"></div>
            </div>
          </div>

          {isLoading ? (
            <>
              {skeletonRender()}
            </>
          ) : (
            <OwlCarousel className="owl-theme" loop nav navText={["<", ">"]} dots={false}
              responsive={{ 0: { items: 1 }, 572: { items: 2 }, 992: { items: 3 }, 1200: { items: 4 } }}
              data-aos="zoom-in" data-aos-duration="600" data-aos-once="true">
              {hotCollectionsRender()}
            </OwlCarousel>
          )}
        </div>
      </div >
    </section >
  );
};

export default HotCollections;
