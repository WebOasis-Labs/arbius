'use client';
import React from 'react';
import Image from 'next/image';
import white_logo from '@/app/assets/images/generated_arbius_logo.png';
import showcase_1 from '@/app/assets/images/showcase_1.jpg';
import showcase_2 from '@/app/assets/images/showcase_2.jpg';
import showcase_3 from '@/app/assets/images/showcase_3.jpg';
import showcase_4 from '@/app/assets/images/showcase_4.jpg';
import showcase_5 from '@/app/assets/images/showcase_5.jpg';
import showcase_6 from '@/app/assets/images/showcase_6.jpg';

export default function Showcase() {
  const images = [
    showcase_1,
    showcase_2,
    showcase_3,
    showcase_4,
    showcase_5,
    showcase_6,
  ];

  return (
    <div className='relative bg-democratic-gradient pb-14 pt-16'>
      <div>
        <p className='lato-bold absolute right-8 top-4 text-right font-normal text-purple-text'>
          Generated by Arbius Network
        </p>
      </div>
      <div className='CollaboratorsMarquee'>
        <div className='MarqueeContainer'>
          {images.map((image, index) => (
            <div className='Item relative' key={index}>
              <div className='ImageItem'>
                <Image
                  src={image}
                  alt=''
                  className='rounded-xl'
                  priority
                />
              </div>
              <div className='absolute bottom-3 right-3 flex h-[40px] w-[40px] items-center justify-center rounded-[50%]'>
                <Image
                  src={white_logo}
                  width={30}
                  alt='arbius white'
                  priority
                />
              </div>
            </div>
          ))}
        </div>
        <div className='MarqueeContainer' aria-hidden='true'>
          {images.map((image, index) => (
            <div className='Item relative' key={index}>
              <div className='ImageItem'>
                <Image
                  src={image}
                  alt=''
                  className='rounded-xl'
                  priority
                />
              </div>
              <div className='h-[40px absolute bottom-3 right-3 flex w-[40px] items-center justify-center rounded-[50%]'>
                <Image src={white_logo} width={30} alt='arbius white' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}