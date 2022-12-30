import React, { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import {
	healthOptionsAtom,
	scrollInitiatedAtom,
	startSearch,
} from '../recoilAtom';
import Select from 'react-select';
import {
	formNames,
	searchNames,
	formLabels,
	healthOptions,
	inputPlaceholder,
	cuisineLabels,
} from '../data';

function Search({ extendNavBar, setSearchTerms, searchTerms }: any) {
	const [initiateSearch, setInitiateSearch] = useRecoilState(startSearch);
	const [selectedAtom, setSelectedAtom] = useRecoilState(healthOptionsAtom);
	const selectRef: any = useRef();
	const [scrollInitiated, setScrollInitiated] =
		useRecoilState(scrollInitiatedAtom);
	const dropdownRef = useRef<Select | any>(null);
	const handleClear = () => {
		const getClearButton: HTMLInputElement =
			document.querySelector('#search-input')!;

		if (typeof document !== undefined) {
			getClearButton.value = '';
		}

		setSearchTerms({
			cuisine: undefined,
			healthLabels: undefined,
			ingredients: undefined,
			filterHealth: false,
			filterCuisine: false,
		});
		setInitiateSearch(false);
	};

	useEffect(() => {
		//get the element in DOM
		const getSearchBars = document.getElementById('search-div-wrapper')!;

		//if search button is clicked
		extendNavBar
			? (getSearchBars.style.transform = 'translateY(0%)')
			: (getSearchBars.style.transform = 'translateY(-100%)');

		//function when scroll
		const scrollEvent = () => {
			setScrollInitiated(document.documentElement.scrollTop);
			if (extendNavBar) {
				const scrollTopNavbar = document.documentElement.scrollTop;
				getSearchBars.style.transform =
					'translateY(-' + scrollTopNavbar + 'px)';
			}
		};

		//listen for scroll event
		document.addEventListener('scroll', scrollEvent);

		//cleanup
		return () => document.removeEventListener('scroll', scrollEvent);
	}, [extendNavBar]);

	//save the search term in hook
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		value
			? setSearchTerms({ ...searchTerms, [name]: value })
			: setSearchTerms({ ...searchTerms, [name]: '' });
	};

	//when the submit button is clicked
	const handleSubmit = (e: any) => {
		e.preventDefault();
		setInitiateSearch(true);
	};
	//populates the forms for search words
	const populateForms = () => {
		const options = [healthOptions, cuisineLabels];
		return (
			<>
				<form
					onSubmit={handleSubmit}
					className={`search-div ${formNames[0]} flex flex-col  shadow-md shadow-yellow-400 justify-around min-h-[15rem]  overflow-x-hidden  md:w-[30rem] duration-700 transition-all ease-in-out w-[95vw] px-6  md:min-w-[35rem]`}>
					<div>
						<label
							className='font-light italic flex pb-2 text-[17px] md:text-2xl '
							htmlFor='search input'>
							Search dish, ingredients, cuisine, etc. 
						</label>
						<div className=' flex flex-row  justify-center items-center   min-w-full relative'>
							<input
								defaultValue=''
								required
								id='search-input'
								name={searchNames[0]}
								onChange={handleChange}
								type={`text`}
								className='p-2 w-full text-[17px] md:text-xl text-black/90 rounded'
								placeholder={inputPlaceholder[0]}
							/>
						</div>
					</div>

					<div className='flex flex-row justify-between p-2 gap-4 font-semibold tracking-wide '>
						<div
							onClick={handleClear}
							className=' h-10 gap-2 items-center bg-red-400 rounded-full font-semibold  text-black cursor-pointer text-[15px] md:text-md default-animation md:hover:bg-red-200 md:hover:translate-y-1 px-2 flex justify-center '>
							{' '}
							CLEAR
						</div>

						<button
							disabled={initiateSearch ? true : false}
							type='submit'
							className={`h-10 gap-2 items-center bg-yellow-400 px-3 rounded-full  text-black text-[15px] md:text-md
	                  transition-all duration-300 ease-in-out md:font-medium flex-grow
	                    ${
												!initiateSearch
													? 'opacity-100 md:hover:translate-y-1 md:hover:bg-yellow-200'
													: 'opacity-50 md:hover:translate-none md:hover:bg-yellow-400'
											}
	                  flex justify-center`}>
							{' '}
							SEARCH
							<BsSearch />
						</button>
					</div>
				</form>
			</>
		);
	};

	return (
		<div
			id='search-div-wrapper'
			className={`w-full flex min-h-[11rem] text-white-600 text-2xl fixed z-[9999] mt-[9rem] md:mt-[10rem] transform-all duration-500 ease-in-out search-div-wrapper bg-black text-gray-50 items-center  justify-center`}>
			{populateForms()}
		</div>
	);
}

export default Search;
