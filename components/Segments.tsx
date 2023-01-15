import React from 'react';
import Image from 'next/image';
import { BiSearchAlt } from 'react-icons/bi';

function Segments({ extendNavBar, setExtendNavBar }: boolean | any) {
	const handleClick = () => {
    window.focus();
    window.scrollTo(0, 0);
  };
  return (
    <div className="w-full h-full flex flex-col md:gap-24 gap-20 justify-center items-center bg-slate-400 mb-56 md:mb-80">
      <section className="flex justify-end items-end md:ml-[10rem] bg-gradient-to-r from-red-400 to-transparent">
        <div
          onClick={() => {
            setExtendNavBar((prev: boolean) => true);
            handleClick();
          }}
          className=" cursor-pointer w-[300px] md:w-[400px]  md:mr-[40rem] flex shadow-xl relative  shadow-black"
        >
          <img
            alt="rice-dish"
            className="p-4 z-50"
            src="/rice-chicken.jpg"
          ></img>
          <div
            className="top-0 bottom-0 md:w-[200%] xl:w-[250%] bg-gradient-to-r from-yellow-400 to-transparent p-4 
                    justify-center items-center flex absolute left-0 "
          >
            <p className="uppercase relative md:text-2xl text-black font-medium z-[100] bg-white/60 p-2 md:leading-[2rem]">
              Search dishes of any cuisine including vegan and vegeterian
              options. For any taste or diet restriction.
              <button
                onClick={() => {
                  setExtendNavBar(true);
                  handleClick();
                }}
                className="absolute -right-8 -bottom-5 rounded-full  bg-black/70 p-2"
              >
                <BiSearchAlt className="text-2xl text-white" />
              </button>
            </p>
          </div>
        </div>
      </section>
      <section className="flex justify-start items-start md:mr-[10rem] bg-gradient-to-l  from-red-400 to-transparent">
        <div
          onClick={() => {
            setExtendNavBar((prev: boolean) => true);
            handleClick();
          }}
          className="cursor-pointer w-[300px] md:w-[400px]  md:ml-[40rem] flex shadow-xl shadow-black relative "
        >
          <img
            alt="rice-dish"
            className="p-4 z-50"
            src="/ingredients.jpg"
          ></img>
          <div
            className="top-0 bottom-0 md:w-[200%] xl:w-[250%] bg-gradient-to-l from-yellow-400 to-transparent p-4 
                    justify-center items-center flex absolute right-0 "
          >
            <p className=" text-end uppercase relative md:text-2xl text-black font-medium z-[100] bg-white/80 p-2 md:leading-[2rem]">
              Search based on thousands of ingredients, with detailed nutrition
              information and calories.
              <button
                onClick={() => {
                  setExtendNavBar((prev: boolean) => true);
                  handleClick();
                }}
                className="absolute md:-left-4 -bottom-4 rounded-full bg-black/70 p-2"
              >
                <BiSearchAlt className="text-2xl text-white" />
              </button>
            </p>
          </div>
        </div>
      </section>
      <section className="flex justify-end items-end md:ml-[10rem] bg-gradient-to-r from-red-400 to-transparent">
        <div
          onClick={() => {
            setExtendNavBar((prev: boolean) => true);
            handleClick();
          }}
          className="cursor-pointer w-[300px] md:w-[400px]  md:mr-[40rem] flex shadow-xl shadow-black relative "
        >
          <img
            alt="rice-dish"
            className="p-4 z-50"
            src="/dough-making.jpg"
          ></img>
          <div
            className="top-0 bottom-0 md:w-[200%] xl:w-[250%] bg-gradient-to-r from-yellow-400 to-transparent p-4 
                    justify-center items-center flex absolute left-0 "
          >
            <p className="uppercase relative md:text-2xl text-black font-medium z-[100] bg-white/60 p-2 md:leading-[2rem]">
              Simple, straight-forward instructions for a frustration-free,
              enjoyable cooking experience.
              <button
                onClick={() => {
                  setExtendNavBar((prev: boolean) => true);
                  handleClick();
                }}
                className="absolute -right-8 -bottom-5 rounded-full  bg-black/70 p-2"
              >
                <BiSearchAlt className="text-2xl text-white" />
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Segments;
