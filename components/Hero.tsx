import React, { useEffect, useRef } from 'react';
import Search from './Search';
import Image from 'next/image';
import Select from 'react-select';
import {startSearch } from '../recoilAtom';
import { useRecoilState } from 'recoil';
import { cuisineLabels, healthOptions } from 'data';

const Hero = ({ extendNavBar, setSearchTerms, searchTerms }: any) => {
	const [initiateSearch, setInitiateSearch] = useRecoilState(startSearch);
	const selectRef: any = useRef();
	const carouselHero = () => {
		return (
			<Image
				className='imgContainer z-50  blur-sm '
				layout='fill'
				objectFit='cover'
				src='/hero-img.jpg'
				alt={'bowl of meal'}
			/>
		);
	};
	return (
		<div className='relative w-full z-[500] flex flex-col gap-10 justify-center items-center  '>
			<div className='w-full'>
				<Search
					extendNavBar={extendNavBar}
					setSearchTerms={setSearchTerms}
					searchTerms={searchTerms}
				/>
			</div>
			{searchTerms?.ingredients !== undefined &&
				extendNavBar &&
				initiateSearch && (
					<>
						<div
							className={`bottom-0 absolute md:right-10 p-2 right-0   justify-center md:w-[20rem]  w-[15rem]  border-2 border-black z-[200] 
							bg-slate-200 `}>
							<label className='text-xl font-semibold' htmlFor='health label'>
								Filter by
							</label>
							<Select
								isClearable
								placeholder='Health...'
								onChange={(e: any) => {
									searchTerms?.healthLabels !== undefined &&
										setSearchTerms({
											...searchTerms,
											filterHealth: true,
										});
									setSearchTerms({
										...searchTerms,
										healthLabels: e?.value,
									});
								}}
								className=' text-black w-full mt-1'
								isSearchable={false}
								options={healthOptions}
								menuPosition='fixed'
							/>

							<Select
								id='select-two'
								isClearable
								placeholder='Cuisine...'
								onChange={(e: any) => {
									searchTerms?.healthLabels !== undefined &&
										setSearchTerms({
											...searchTerms,
											filterCuisine: true,
										});
									setSearchTerms({
										...searchTerms,
										cuisine: e?.value,
									});
								}}
								className=' text-black'
								isSearchable={false}
								options={cuisineLabels}
								menuPosition='fixed'
								ref={selectRef}
							/>
						</div>
					</>
				)}
			<section className='w-full px-4 hero-wrapper h-[30rem] flex items-center justify-center text-white'>
				{carouselHero()}

				{!extendNavBar && (
					<div
						className='flex md:text-4xl mt-[6rem] md:mt-[15rem] font-bold p-4 flex-col shadow-2xl text-xl  
				bg-black/60  md:w-[50%] md:shadow-black  md:mx-0 w-[98%] z-[200] '>
						<h1 className='hero-paragraph pb-2 py-2 '>
							SEARCH FOR THOUSANDS OF RECIPES
						</h1>
						<hr />
						<h2 className=' italic text-[1rem]  md:text-xl font-semibold py-2'>
							With simplicity and efficiency.{' '}
						</h2>

						<h3 className=' italic text-[0.9rem]  md:text-xl font-semibold '>
							Just recipes. No filler.
						</h3>
					</div>
				)}
			</section>
		</div>
	);
};

export default Hero;

//api = "563492ad6f91700001000001293179f70c2145cfb2c4be47d3fbd501"
