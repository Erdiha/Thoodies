import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { displayModalAtom, modalRecipeCardAtom } from '../recoilAtom';
import RecipeModal from './RecipeModal';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { TiTick, TiPlus } from 'react-icons/ti';
import { IRecipe } from '../types.d';
import useAuth from '../firebaseData';
import {
	DocumentData,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	setDoc,
} from 'firebase/firestore';
import { db } from '../firebaseAuth';
import useDatabase from './useDatabase';

function Cards(card: any) {
	const [displayModal, setDisplayModal] = useRecoilState(displayModalAtom);
	const [liked, disliked, added] = useDatabase(card?.card);
	const [getCardInfo, setGetCardInfo] = useRecoilState(modalRecipeCardAtom);
	const { currentUser } = useAuth();

	const addMoviesToLibrary = async () => {
		const userID = currentUser!.uid;
		console.log(added);
		!added
			? await setDoc(
					doc(db, 'recipes', userID, 'myrecipes', card?.card.label.toString()!),
					{ ...card?.card },
			  )
			: await deleteDoc(
					doc(db, 'recipes', userID, 'myrecipes', card?.card.label.toString()!),
			  );
	};

	//add or delete the item from liked database
	const addLikesOrDislikes = async (str: string) => {
		if (str === 'like') {
			if (liked) {
				await deleteDoc(
					doc(
						db,
						'recipes',
						currentUser!.uid,
						'likes',
						card?.card?.label.toString()!,
					),
				);
			} else {
				await deleteDoc(
					doc(
						db,
						'recipes',
						currentUser!.uid,
						'dislikes',
						card?.card?.label.toString()!,
					),
				);

				await setDoc(
					doc(
						db,
						'recipes',
						currentUser!.uid,
						'likes',
						card?.card?.label.toString()!,
					),
					{ ...card?.card },
				);
			}
		}
		if (str === 'dislike') {
			if (disliked) {
				await deleteDoc(
					doc(
						db,
						'recipes',
						currentUser!.uid,
						'dislikes',
						card?.card?.label.toString()!,
					),
				);
			} else {
				await deleteDoc(
					doc(
						db,
						'recipes',
						currentUser!.uid,
						'likes',
						card?.card?.label.toString()!,
					),
				);
				await setDoc(
					doc(
						db,
						'recipes',
						currentUser!.uid,
						'dislikes',
						card?.card?.label.toString()!,
					),
					{ ...card?.card },
				);
			}
		}
	};

	useEffect(() => {
		setGetCardInfo(card?.card);
	}, []);
	return (
		<div
			className='card w-80 min-h-[30rem] duration-400 ease-in transition-all p-2
    md:hover:bg-yellow-100 overflow-x-hidden glass md:hover:shadow-2xl z-[100]'>
			<span
				className='absolute font-bold text-black bg-yellow-200 top-6 left-6 p-2
    rounded-xl'>
				{card?.card?.mealType}
			</span>
			<figure className='pt-2 px-2 '>
				<img
					className='w-full aspect-square rounded-tl-xl rounded-tr-xl'
					src={card?.card?.image}
					alt={card?.card?.label}
				/>
			</figure>
			<div className='card-body w-full p-4 h-56 z-50 relative flex justify-between'>
				<h2 className='card-title'>
					{card?.card?.label.substring(0, 25) +
						`${card?.card?.label.length > 25 ? '...' : ''}`}
				</h2>
				<span className=' flex rounded py-1  gap-1 text-[14px]  '>
					<span className='font-semibold'>Cautions: </span>
					{card?.card?.cautions?.map((item: string, index: number) => {
						return (
							<React.Fragment key={index}>
								{item}
								{index < card?.card?.cautions.length - 1 ? ', ' : ''}
							</React.Fragment>
						);
					})}
				</span>
				<span className='rounded  py-1 text-[14px]'>
					<span className='font-semibold'>Calories:</span>{' '}
					{card?.card?.calories.toFixed(2)}
				</span>

				<div
					className={` ${
						currentUser?.uid ? 'grid-cols-[20%,20%,20%,34%]' : 'grid-cols-auto'
					}
					 grid  gap-[2%] w-full  bottom-2 z-50`}>
					{currentUser?.uid && (
						<>
							<button
								onClick={() => addLikesOrDislikes('like')}
								className={`m-auto md:hover:rounded-full md:hover:bg-yellow-400 p-2`}>
								<AiFillLike
									className={`${liked && 'text-green-500 scale-150'}`}
								/>
							</button>
							<button
								onClick={() => addLikesOrDislikes('dislike')}
								className={`m-auto md:hover:rounded-full md:hover:bg-yellow-400 p-2`}>
								<AiFillDislike
									className={`${disliked && 'text-red-500 scale-150'}`}
								/>
							</button>
							<button
								title={`${added ? 'remove item' : 'add item'}`}
								onClick={() => addMoviesToLibrary()}
								className={`m-auto text-2xl p-1 md:hover:rounded-full md:hover:bg-yellow-400`}>
								{added ? (
									<TiTick className='text-yellow-600 text-3xl' />
								) : (
									<TiPlus />
								)}
							</button>
						</>
					)}
					<button
						onClick={() => {
							setDisplayModal(true);
							setGetCardInfo(card?.card);
						}}
						className='btn btn-primary'>
						Lets Cook!
					</button>
				</div>
			</div>
		</div>
	);
}

export default Cards;
