import React, { ChangeEvent, useState } from 'react';
import useAuth, { userLibrary } from '../firebaseData';
import { displayModalAtom, modalRecipeCardAtom } from '../recoilAtom';
import { useRecoilState } from 'recoil';

interface IDatabase {
	all: boolean;
	saved: boolean;
	liked: boolean;
	disliked: boolean;
}
function UserProfile() {
	const [displayModal, setDisplayModal] = useRecoilState(displayModalAtom);
	const [getCardInfo, setGetCardInfo] = useRecoilState(modalRecipeCardAtom);
	const { isLoading, currentUser } = useAuth();
	const [displayDatabase, setDisplayDatabase] = useState<IDatabase>({
		all: true,
		saved: false,
		liked: false,
		disliked: false,
	});

	const savedLib: any[] = userLibrary(currentUser?.uid, 0);
	const likedLib: any[] = userLibrary(currentUser?.uid, 1);
	const dislikedLib: any[] = userLibrary(currentUser?.uid, 2);
	const allLib: any[] = [...savedLib, ...likedLib, ...dislikedLib];

	const [filter, setFilter] = useState('');

	let userEmail = currentUser?.email;
	let sorted: any = [];

	const handleLibrary = displayDatabase.all
		? allLib
		: displayDatabase.saved
		? savedLib
		: displayDatabase.liked
		? likedLib
		: dislikedLib;

	const uniqueItems: any = handleLibrary
		.filter((item) => item.id.toLowerCase().includes(filter.toLowerCase()))
		.filter((items) => {
			if (!sorted.includes(items.id)) {
				sorted.push(items.id);
				return items;
			}
		});
	return (
		<div className='w-full md:w-[60vw] h-full absolute border-t-2 border-yellow-700 p-2'>
			<form
				action=''
				className='flex items-center justify-center w-full  h-[5rem] text-black   z-50 absolute top-0 left-0'>
				<input
					placeholder='search for recipe'
					className='flex rounded w-[80%] md:w-[50%] h-12 px-4 bg-white/90 text-black font-semibold border-black/80 border-2'
					type='search'
					onChange={(event: ChangeEvent<HTMLInputElement>) =>
						setFilter(event?.target?.value)
					}
				/>
			</form>
			<section className='w-full min-h-fit flex justify-start items-center pb-16 pt-20'>
				<h1 className='text-2xl font-semibold shadow-lg'>
					Hi,{' '}
					<span className='italic font-normal underline  text-black/80'>
						{userEmail}
					</span>
				</h1>
			</section>
			<div
				className={`grid grid-cols-4 h-12 justify-between default-animation`}>
				<button
					onClick={() =>
						setDisplayDatabase({
							all: true,
							saved: false,
							liked: false,
							disliked: false,
						})
					}
					className={`h-full  rounded-t-md font-bold text-xl default-animation ${
						displayDatabase.all && 'bg-slate-500  text-yellow-400'
					} `}>
					All
				</button>
				<button
					onClick={() =>
						setDisplayDatabase({
							all: false,
							saved: true,
							liked: false,
							disliked: false,
						})
					}
					className={`h-full rounded-t-md  font-bold text-xl default-animation ${
						displayDatabase.saved && 'bg-slate-500  text-yellow-400'
					} `}>
					Saved
				</button>
				<button
					onClick={() =>
						setDisplayDatabase({
							all: false,
							saved: false,
							liked: true,
							disliked: false,
						})
					}
					className={`h-full  rounded-t-md font-bold text-xl default-animation ${
						displayDatabase.liked && 'bg-slate-500 text-yellow-400'
					} `}>
					Liked
				</button>
				<button
					onClick={() =>
						setDisplayDatabase({
							all: false,
							saved: false,
							liked: false,
							disliked: true,
						})
					}
					className={`h-full  rounded-t-md  font-bold text-xl default-animation ${
						displayDatabase.disliked && 'bg-slate-500 text-yellow-400'
					} `}>
					Disliked
				</button>
			</div>
			<div className='grid md:grid-cols-4 grid-cols-1 bg-slate-500'>
				{uniqueItems?.map((item: any, index: number) => {
					return (
						<button
							onClick={() => {
								setDisplayModal(true);
								setGetCardInfo(item);
							}}
							className='text-white bg-slate-400 min-w-12 min-h-12 p-2 m-1 border-2 border-black md:hover:bg-slate-200 md:hover:text-black'
							key={index}>
							{item.id}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default UserProfile;
