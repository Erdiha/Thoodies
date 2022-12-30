import React, { useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { RiAccountCircleFill } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';

function Navbar({ extendNavBar, setExtendNavBar }: boolean | any) {
	useEffect(() => {
		const getSearch = document.getElementById('search-btn')!;
		extendNavBar
			? getSearch?.classList?.add('bg-white', 'text-black')
			: getSearch?.classList?.remove('bg-white', 'text-black');
	}, [extendNavBar]);
	return (
		<>
			<div
				id='navbar-wrapper'
				className=' justify-center items-center h-[9rem] md:h-[11rem] after:md:h-[11rem] grid grid-cols-3  w-[100%] z-[1000]  overflow-x-hidden after:h-[9rem] fixed  text-white navbar-wrapper  '>
				<div className='w-[5rem]   aspect-square justify-center items-center flex m-auto  text-center col-span-3 md:col-span-1'>
					<Link
						href='/'
						className='flex  relative icon-text text-2xl font-bold min-h-[4rem]  md:max-h-[6rem] aspect-square justify-center items-center'>
						THOODIES
						<Image
							className='opacity-100 -z-10'
							layout='fill'
							objectFit='cover'
							loading='lazy'
							src='/dish.png'
							alt='dish icon'
						/>
					</Link>
				</div>
				<div className='grid h-[80%] p-1 justify-center items-center z-50 col-span-3  md:col-span-1  '>
					<button
						id='search-btn'
						onClick={() => setExtendNavBar((prev: boolean) => !prev)}
						className='flex flex-row gap-2 justify-center items-center w-[6rem] md:w-[8rem] rounded-full border-[1px] default-animation hover:bg-stone-50 hover:text-black md:hover:translate-y-1 p-1 md:p-2 border-white '>
						{extendNavBar ? (
							<button className='w-[50%] text-black/90 font-bold text-[15px]'>
								CLOSE
							</button>
						) : (
							<>
								<button>
									<BsSearch />
								</button>
								<span>search</span>
							</>
						)}
					</button>
				</div>
				<div className='absolute top-[60%] right-[10%] rounded-full flex items-end m-auto bottom-[50%]'>
					<button className='text-4xl text-yellow-400 border-2 border-yellow-400 rounded-full'>
						<Link href='/Account'>
							<RiAccountCircleFill />
						</Link>
					</button>
				</div>
			</div>
		</>
	);
}

export default Navbar;
