import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import Skeleton from "../components/UI/Skeleton";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";


const Author = () => {

  const { authorId } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [isFollowed, setIsFollowed] = useState(false)
  const [followerCount, setFollowerCount] = useState()
  const [authorData, setAuthorData] = useState([])
  const [authorItems, setAuthorItems] = useState([])

  useEffect(() => {
    fetchAuthorData()
    setFollowerCount(authorData.followers)
  }, [])

  async function fetchAuthorData() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)

    setAuthorData(data)
    setAuthorItems(data.nftCollection)
    setIsLoading(false)
  }

  function followButtonClicked() {
    setIsFollowed(!isFollowed)
    setFollowerCount(isFollowed ? (authorData.followers) : (authorData.followers + 1))
  }

  function skeletonRender() {
    return (
      <>
        <div className="col-md-12">
          <div className="d_profile de-flex">
            <div className="de-flex-col">
              <div className="profile_avatar">
                <Skeleton width="150px" height="150px" borderRadius="50%" />
                <i className="fa fa-check"></i>
                <div className="profile_name">
                  <h4>
                    <Skeleton width="200px" />
                    <span className="profile_username">@{authorData.tag}</span>
                    <span id="wallet" className="profile_wallet">
                      <Skeleton width="100px" />
                    </span>
                    <button id="btn_copy" title="Copy Text">
                      <Skeleton width="250px" />
                    </button>
                  </h4>
                </div>
              </div>
            </div>
            <div className="profile_follow de-flex">
              <div className="de-flex-col">
                <div className="profile_follower">
                  <Skeleton width="150px" height="40px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {new Array(8).fill(0).map((_, i) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
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
        ))}
      </>
    )
  }

  function renderAuthor() {
    return (
      <>
        <div className="col-md-12">
          <div className="d_profile de-flex">
            <div className="de-flex-col">
              <div className="profile_avatar">
                <img src={authorData.authorImage} alt="" />

                <i className="fa fa-check"></i>
                <div className="profile_name">
                  <h4>
                    {authorData.authorName}
                    <span className="profile_username">@{authorData.tag}</span>
                    <span id="wallet" className="profile_wallet">
                      {authorData.address}
                    </span>
                    <button id="btn_copy" title="Copy Text">
                      Copy
                    </button>
                  </h4>
                </div>
              </div>
            </div>
            <div className="profile_follow de-flex">
              <div className="de-flex-col">
                <div className="profile_follower">{followerCount ?? authorData.followers} followers</div>
                <Link to="#" className="btn-main" onClick={() => followButtonClicked()}>
                  {isFollowed ? <>Unfollow</> : <>Follow</>}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="de_tab tab_simple">
            <AuthorItems authorItems={authorItems} authorImage={authorData.authorImage} />
          </div>
        </div>
      </>
    )
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {isLoading ? (
                skeletonRender()
              ) : (
                renderAuthor()
              )}

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
