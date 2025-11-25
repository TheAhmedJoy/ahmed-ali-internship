import React, { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import NewItemsSkeleton from "../UI/NewItemsSkeleton"
import NewItemsTile from "../UI/NewItemsTile";


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
        <NewItemsSkeleton />
      ))
    )
  }

  function newItemsRender() {
    return (
      newItemsData.map((item) => (
        <NewItemsTile authorId={item.authorId} authorImage={item.authorImage} nftImage={item.nftImage} nftId={item.nftId}
          title={item.title} price={item.price} likes={item.likes} expiryDate={item.expiryDate} key={item.id} />
      ))
    )
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading ? (
            <>
              <OwlCarousel className="owl-theme" loop nav navText={["<", ">"]} dots={false}
                responsive={{ 0: { items: 1 }, 572: { items: 2 }, 992: { items: 3 }, 1200: { items: 4 } }}>
                {skeletonRender()}
              </OwlCarousel>
            </>
          ) : (
            <OwlCarousel className="owl-theme" loop nav navText={["<", ">"]} dots={false}
              responsive={{ 0: { items: 1 }, 572: { items: 2 }, 992: { items: 3 }, 1200: { items: 4 } }}>
              {newItemsRender()}
            </OwlCarousel>
          )}
          
        </div>
      </div>
    </section>
  );
};

export default NewItems;
