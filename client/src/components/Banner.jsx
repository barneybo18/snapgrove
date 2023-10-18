import React, { useState } from 'react'
import { Background, BannerImage, BannerImg, NewPostBack } from '../assets'
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const heroImages = [
  { imgUrl: Background, alt: 'smart watch'},
  { imgUrl: NewPostBack, alt: 'smart watch', innerHeight: 100},
  
  
]

const Banner = () => {
      const [search, setSearch] = useState("");
      const navigate = useNavigate();

      const handleKeyDown = (event) => {
            if (event.key === "Enter") {
              navigate(`search/${search}`, { replace: true });
            }
          };
  return (
      <div className=" w-screen h-auto flex flex-col items-center justify-center relative">
        
        <Carousel 
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={10000}
          showArrows={false}
          showStatus={false}
        
        >
          {heroImages.map((image) => (
            <img 
            src={image.imgUrl} 
            className=" w-full h-[80vh] object-cover" alt="" />
          ))}
      </Carousel>
      <div className="absolute inset-0 bg-overlay-4"></div>
      
      
      <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
        <h2 className="text-2xl font-extrabold text-white tracking-wider font-sans text-center">
          Stunning free images & royalty free stock
        </h2>
        <p className="text-white outline-1 outline-black text-center sm:text-sm">
          Over 2.8 million+ high quality stock images, videos and music shared
          by our talented community.
        </p>
        

        <div className="w-1/2 gap-4 px-4 py-3 rounded-full bg-white flex opacity-50 items-center justify-between hover:opacity-100 transition-all duration-500 overflow-hidden hover:overflow-visible ">
          <FaSearch size={16} color="#656F79" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="search here"
            className="flex-1 border-none outline-none  text-textColor text-lg font-semibold md:w-2"
          />
          
        </div>
      </div>
    </div>
  )
}

export default Banner