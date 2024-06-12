"use client"
import React from 'react';
import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';
import Link from 'next/link';
import arrow from '../assets/images/right_arrow.png'
import step1 from '../assets/images/staking_upgrade.jpg'
import step2 from '../assets/images/armica_upgrade.jpg'
import step3 from '../assets/images/tokenomics_upgrade.jpg'
import step4 from '../assets/images/kasumi_upgrade.jpg'
import step5 from '../assets/images/partnership_update.jpg'
import VideoThumbnail from '../components/VideoComponent/videoThumbnail';
const posts =[
  {
    "title": "Introducing AIUS Staking",
    "description": "$AIUS staking is being worked on. Staked holders can enjoy a constant APR/APY and wield their voting power to determine which AI models will receive more rewards. Get ready to shape the future of computing and network incentives.",
    "date": "May 27, 2024",
    "image": step1,
    "url": "https://x.com/arbius_ai/status/1795184308199551008"
  },
  {
    "title": "First DAO Proposal",
    "description": "Arbius and @exa_bits have joined forces to redefine the AI sector and prioritize the compute of the many over the compute of the abundant few. Together, we are redefining AI hosting and ownership, putting the power back in the hands of the people.",
    "date": "May 3, 2024",
    "image": step5,
    "url": "https://x.com/arbius_ai/status/1790367805352603820"
  },
  {
    "title": "Tokenomics Upgrade Announcement",
    "description": "The Arbius Network Upgrade is imminent. The Arbius network is about to undergo its most significant upgrade since its launch. We are introducing a new feature where task creators will now receive a 10% reward from the rewards pool. This will add new possibilities for users.",
    "date": "April 30, 2024",
    "image": step3,
    "url": "https://x.com/arbius_ai/status/1785401938550444218"
  },
  {
    "title": "Kasumi-2 Released",
    "description": "We are thrilled to announce Kasumi2 Open Beta. Kasumi2 is an autonomous AI agent that performs actions in the Arbius network. It is a miner, has its own wallet, can retrieve results from Arbius AI models, and runs its own individual LLM model.",
    "date": "April 27, 2024",
    "image": step4,
    "url": "https://x.com/arbius_ai/status/1783980046111150589"
  },
  {
    "title": "Amica Update",
    "description": "Say hello to the new Amica soon! A small update has been deployed with the following features: Load/Save Conversations: Easily save and load your chats right where you left them last time. Ability to Upload Images: Share photos and visuals to improve your conversations.",
    "date": "April 22, 2024",
    "image": step2,
    "url": "https://x.com/arbius_ai/status/1800228956651573748"
  }
]

export default function ArbiusMedia() {
  return (
    <div className='w-[100%] h-[100%] bg-media-gradient py-20'>
      <div className="bg-gray-50 lg:p-0 w-mobile-section-width lg:w-section-width m-[auto] max-w-center-width ">
        <div className='pt-10 pb-10'>
          <div className="flex items-center lg:flex-row flex-col justify-between pb-5">
            <div className="lg:w-[70%] 2xl:w-[50%] w-[100%]">
              <div>
                  <h2 className="lato-regular lg:text-header-xl 2xl:text-header-xl text-mobile-header text-black-text mb-2 fade-container">
                      <Fade delay={0.1} cascade damping={0.05} triggerOnce={true}>
                      Arbius Media
                      </Fade>
                  </h2>
              </div>
              <div>
                  <Fade direction="up" triggerOnce={true}>
                      <div className="mb-4">
                          <p className="text-subtext-three lato-regular text-large-description">
                          See what’s happening across the Arbius Ecosystem.
                          </p>
                      </div>
                  </Fade>
              </div>
              <Link href="https://x.com/arbius_ai" target="_blank">
                <button type="button" className="relative group bg-white-background border-[1px] border-original-black py-2  px-8 rounded-full flex items-center  gap-3 hover:border-original-white">
                    <div class="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500 "></div>
                    <p className="relative z-10 text-original-black lato-bold group-hover:text-original-white ">View more</p>
                    <Image src={arrow} width={18} className="relative z-10 filter invert group-hover:filter-none"  alt="right arrow"/>
                </button>
              </Link>
            </div>
                      
          </div>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index}>
              <div id="image-parent" className="relative bg-models-gradient border-transparent w-[350px] h-[260px] flex justify-center items-center rounded-[30px] ">
                  <VideoThumbnail thumbnailSrc={post.image} altText="kokok"  url={post.url}/>
              </div>
              <div className="py-2">
                <h2 className=" text-large-description lato-bold text-gray-800">{post.title}</h2>
                <p className=" text-subtext-one mt-2 lato-Regular">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
