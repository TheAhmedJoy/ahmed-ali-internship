import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {

  const { nftId } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [itemDetailsData, setItemDetailsData] = useState([])

  useEffect(() => {
    fetchItemDetailsData()
    window.scrollTo(0, 0);
  }, []);

  async function fetchItemDetailsData() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)

    setIsLoading(false)
    setItemDetailsData(data)
  }

  function skeletonRender() {
    return (
      <>
        <div className="col-md-6 text-center" data-aos="zoom-in" data-aos-duration="600" data-aos-once="true">
          <Skeleton width="100%" height="100%" />
        </div>
        <div className="col-md-6" data-aos="zoom-in" data-aos-duration="600" data-aos-once="true">
          <div className="item_info">
            <Skeleton width="300px" height="40px" />
            <div className="item_info_counts">
              <Skeleton width="80px" height="30px" />
              <Skeleton width="80px" height="30px" />
            </div>
            <Skeleton width="100%" height="80px" />
            <div className="d-flex flex-row">
              <div className="mr40">
                <Skeleton width="40px" height="10px" />
                <div className="item_author">
                  <div className="author_list_pp">
                    <Skeleton width="300px" height="40px" />
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">Monica Lucas</Link>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="de_tab tab_simple">
              <div className="de_tab_content">
                <Skeleton width="40px" height="10px" />
                <div className="item_author">
                  <div className="author_list_pp">
                    <Skeleton width="300px" height="40px" />
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">Monica Lucas</Link>
                  </div>
                </div>
              </div>
              <div className="spacer-40"></div>
              <Skeleton width="40px" height="10px" />
              <div className="nft-item-price">
                <Skeleton width="75px" height="25px" />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  function renderItemDetails() {
    return (
      <>
        <div className="col-md-6 text-center" data-aos="zoom-in" data-aos-duration="600" data-aos-once="true">
          <img src={itemDetailsData.nftImage} className="img-fluid img-rounded mb-sm-30 nft-image" alt="" />
        </div>
        <div className="col-md-6" data-aos="zoom-in" data-aos-duration="600" data-aos-once="true">
          <div className="item_info">
            <h2>{itemDetailsData.title} #{itemDetailsData.tag}</h2>
            <div className="item_info_counts">
              <div className="item_info_views">
                <i className="fa fa-eye"></i>
                {itemDetailsData.views}
              </div>
              <div className="item_info_like">
                <i className="fa fa-heart"></i>
                {itemDetailsData.likes}
              </div>
            </div>
            <p>
              {itemDetailsData.description}
            </p>
            <div className="d-flex flex-row">
              <div className="mr40">
                <h6>Owner</h6>
                <div className="item_author">
                  <div className="author_list_pp">
                    <Link to={`/author/${itemDetailsData.ownerId}`}>
                      <img className="lazy" src={itemDetailsData.ownerImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${itemDetailsData.ownerId}`}>{itemDetailsData.ownerName}</Link>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="de_tab tab_simple">
              <div className="de_tab_content">
                <h6>Creator</h6>
                <div className="item_author">
                  <div className="author_list_pp">
                    <Link to={`/author/${itemDetailsData.creatorId}`}>
                      <img className="lazy" src={itemDetailsData.creatorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${itemDetailsData.creatorId}`}>{itemDetailsData.creatorName}</Link>
                  </div>
                </div>
              </div>
              <div className="spacer-40"></div>
              <h6>Price</h6>
              <div className="nft-item-price">
                <img src={EthImage} alt="" />
                <span>{itemDetailsData.price}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {isLoading ? (
                skeletonRender()
              ) : (
                renderItemDetails()
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
