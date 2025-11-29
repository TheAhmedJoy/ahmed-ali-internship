import React, { useEffect, useState } from "react";
import axios from "axios"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import NewItemsTile from "../UI/NewItemsTile";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {

  const [newItemsData, setnewItemsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNewItemsData()
  }, [])

  async function fetchNewItemsData() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")

    setnewItemsData(data)
    setIsLoading(false)
  }

  function skeletonRender() {
    return (
      new Array(4).fill(0).map((_, i) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i} style={{ width: "100%", maxWidth: "100%", padding: "0" }}>
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

  function newItemsRender() {
    return (
      newItemsData.map((item) => (
        <NewItemsTile authorId={item.authorId} authorImage={item.authorImage} nftImage={item.nftImage} nftId={item.nftId}
          title={item.title} price={item.price} likes={item.likes} expiryDate={item.expiryDate} useCarousel={true} key={item.id} />
      ))
    )
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="zoom-in" data-aos-duration="600" data-aos-once="true">New Items</h2>
              <div className="small-border bg-color-2" data-aos="zoom-in" data-aos-duration="600" data-aos-once="true"></div>
            </div>
          </div>
          {isLoading ? (
            <>
              <OwlCarousel className="owl-theme" loop nav navText={["<", ">"]} dots={false}
                responsive={{ 0: { items: 1 }, 572: { items: 2 }, 992: { items: 3 }, 1200: { items: 4 } }}
                data-aos="zoom-in" data-aos-duration="600" data-aos-once="true">
                {skeletonRender()}
              </OwlCarousel>
            </>
          ) : (
            <OwlCarousel className="owl-theme" loop nav navText={["<", ">"]} dots={false}
              responsive={{ 0: { items: 1 }, 572: { items: 2 }, 992: { items: 3 }, 1200: { items: 4 } }}
              data-aos="zoom-in" data-aos-duration="600" data-aos-once="true">
              {newItemsRender()}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
