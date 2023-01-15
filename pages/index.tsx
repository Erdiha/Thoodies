import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Result from '../components/Result';
import Segments from '../components/Segments';
import disableScroll from 'disable-scroll';
import {
	displayModalAtom,
	modalRecipeCardAtom,
	startSearch,
	scrollInitiatedAtom
} from '../recoilAtom';
import { ISearch } from '../types.d';
import { IRecipe, IRecipeArray } from '../types.d';
import {
	AiOutlineInstagram,
	AiOutlineLinkedin,
	AiOutlineTwitter,
	AiOutlineFacebook,
	AiOutlineMail,
	AiOutlineArrowUp,
	AiOutlineArrowDown,
} from 'react-icons/ai';
import RecipeModal from '../components/RecipeModal';

function Home() {
	const [searchTerms, setSearchTerms] = useState<ISearch>();
	const [extendNavBar, setExtendNavBar] = useState(false);
	const [recipeData, setRecipeData] = useState([]);
	const [initiateSearch, setInitiateSearch] = useRecoilState(startSearch);
	const [displayModal, setDisplayModal] = useRecoilState(displayModalAtom);
	const [selectedCard, setSelectedCard] = useRecoilState(modalRecipeCardAtom);
	const [upButton, setUpButton] = useRecoilState<number>(scrollInitiatedAtom);
	const [loading, setLoading] = useState(true);

	const handleArrow = () => {
		let docHeight: null | any;
		if (typeof document !== 'undefined') {
			docHeight = document.body.scrollHeight!;
		}
		return upButton > docHeight / 2 ? (
			<AiOutlineArrowUp className='text-2xl ' />
		) : (
			<AiOutlineArrowDown className='text-2xl' />
		);
	};

	useEffect(() => {
		const getScrollButton = document.getElementById('scroll-button')!;

		displayModal ? disableScroll.on() : disableScroll.off();
		if (displayModal) {
			getScrollButton.classList.add('hidden');
		} else {
			getScrollButton.classList.remove('hidden');
		}
	}, [displayModal]);

	useEffect(() => {
		const recipeApi = process.env.NEXT_PUBLIC_RECIPE_API;
		const recipeID = process.env.NEXT_PUBLIC_RECIPE_ID;
		const recipeURL = `https://api.edamam.com/api/recipes/v2?type=any&app_id=${recipeID}&app_key=${recipeApi}&to=100&more=true$to=100
    ${
			searchTerms?.ingredients !== undefined
				? '&q=' + searchTerms?.ingredients
				: undefined
		}
    ${
			searchTerms?.cuisine !== undefined
				? '&cuisineType=' + searchTerms?.cuisine
				: ''
		}`;
		async function fetchRecipe() {
			const resp = await fetch(recipeURL);
			const data = await resp.json();
			setRecipeData(data.hits);
			setLoading(false);
		}
		initiateSearch && fetchRecipe();
	}, [initiateSearch, searchTerms, setInitiateSearch]);

	const handleClick = () => {
		if (upButton > document.body.scrollHeight / 2) {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		} else {
			window?.scrollTo(0, document.body.scrollHeight);
		}
	};

	useEffect(() => {
		if (searchTerms?.ingredients === undefined) {
			setRecipeData([]);
		}
	}, [searchTerms]);
	return (
		<div className='relative'>
			<Head>
				<title>THOOD</title>
				<link rel='icon' href='/dish.png' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<main className='min-h-[100vh] relative  bg-slate-400'>
				<Navbar extendNavBar={extendNavBar} setExtendNavBar={setExtendNavBar} />
				<Hero
					extendNavBar={extendNavBar}
					setExtendNavBar={setExtendNavBar}
					setSearchTerms={setSearchTerms}
					searchTerms={searchTerms}
				/>
				{recipeData?.length !== 0 && extendNavBar ? (
					loading ? (
						<p>LOADING...</p>
					) : (
						<div className=' bg-slate-100   overflow-x-hidden'>
							<Result recipeData={recipeData} searchTerms={searchTerms} />
						</div>
					)
				) : (
					<div className='flex bg-slate-400'>
						<Segments
							extendNavBar={extendNavBar}
							setExtendNavBar={setExtendNavBar}
						/>
					</div>
				)}
				<div className='flex flex-end top-[60%] h-[7rem]  shadow-xl fixed z-[9999]  md:hidden  w-fit  flex-row'>
					<button
						onClick={handleClick}
						id='scroll-button'
						className={`left-2 flex items-center rounded-full bg-yellow-400 w-14 h-14 absolute 
						${
							extendNavBar ? 'bottom-[2rem]' : 'bottom-[2rem]'
						} justify-center border-black border-2`}>
						{handleArrow()}
					</button>
				</div>
				<RecipeModal modalCard={selectedCard} />
			</main>

			<footer
				className=' grid grid-cols-2  absolute bottom-0 min-h-[10rem] md:h-[15rem] w-full bg-black/80 
      md:p-2 p-1'>
				<section
					className='bg-yellow-400 footer-section
        justify-center items-center flex flex-row md:gap-2 gap-[2px] footer-section-one text-slate-100'>
					<span className='w-full  md:text-5xl icon-text bg-black/80 md:p-3 text-center'>
						THOODIES
					</span>
					<span className='w-full justify-center flex items-center border-l-[1px] border-black h-[90%]  '>
						<ul className='text-black  opacity-90 md:font-semibold p-1 md:p-0'>
							<li>About Us</li>
							<li>Contact Us</li>
							<li> Terms & Conditions</li>
						</ul>
					</span>
				</section>
				<section className='bg-yellow-400 footer-section footer-section-two text-black justify-around items-center md:grid md:grid-cols-5  flex flex-rows flex-wrap'>
					<span className='footer-social-links-wrapper'>
						<AiOutlineFacebook className='footer-social-links' />
					</span>
					<span className='footer-social-links-wrapper'>
						<AiOutlineInstagram className='footer-social-links' />
					</span>
					<span className='footer-social-links-wrapper'>
						<AiOutlineLinkedin className='footer-social-links' />
					</span>
					<span className='footer-social-links-wrapper'>
						<AiOutlineMail className='footer-social-links' />
					</span>
					<span className='footer-social-links-wrapper border-none'>
						<AiOutlineTwitter className='footer-social-links' />
					</span>
				</section>
			</footer>
		</div>
	);
}

export default Home;

