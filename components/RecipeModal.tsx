import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import MuiModal from '@mui/material/Modal';
import { displayModalAtom } from '../recoilAtom';
import { BsArrowUpRight } from 'react-icons/bs';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { TiTick, TiPlus } from 'react-icons/ti';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import useAuth from '../firebaseData';
import { db } from '../firebaseAuth';
import useDatabase from './useDatabase';

function ModalCard({ modalCard }: any) {
	const [displayModal, setDisplayModal] = useRecoilState(displayModalAtom);
	const { currentUser } = useAuth();
	const [liked, disliked, added] = useDatabase(modalCard);
	
	const addRecipesToLibrary = async () => {
		const userID = currentUser!.uid;
		!added
			? await setDoc(
					doc(db, 'recipes', userID, 'myrecipes', modalCard?.label.toString()!),
					{ ...modalCard },
			  )
			: await deleteDoc(
					doc(db, 'recipes', userID, 'myrecipes', modalCard?.label.toString()!),
			  );
	};

	const addLikesOrDislikes = async (str: string) => {
		if (str === 'like') {
			if (liked) {
				await deleteDoc(
					doc(
						db,
						'recipes',
						currentUser!.uid,
						'likes',
						modalCard?.label.toString()!,
					),
				);
			} else {
				await deleteDoc(
					doc(
						db,
						'recipes',
						currentUser!.uid,
						'dislikes',
						modalCard?.label.toString()!,
					),
				);

				await setDoc(
					doc(
						db,
						'recipes',
						currentUser!.uid,
						'likes',
						modalCard?.label.toString()!,
					),
					{ ...modalCard },
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
						modalCard?.label.toString()!,
					),
				);
			} else {
				await deleteDoc(
					doc(
						db,
						'recipes',
						currentUser!.uid,
						'likes',
						modalCard?.label.toString()!,
					),
				);
				await setDoc(
					doc(
						db,
						'recipes',
						currentUser!.uid,
						'dislikes',
						modalCard?.label.toString()!,
					),
					{ ...modalCard },
				);
			}
		}
	};

	return (
		<MuiModal
			onClose={() => {
				setDisplayModal(false);
			}}
			open={displayModal}>
			<div className='flex w-full h-full items-center justify-center'>
				<div className='flex flex-col md:w-[60vw] lg:w-[50vw] 2xl:w-[40vw] min-h-fit bg-slate-200 items-center relative opacity-1 rounded md:p-4'>
					<h1 className=' flex mt-10 text-2xl uppercase font-extrabold m-auto'>
						{modalCard?.dishType}
					</h1>
					<button
						className='close-button absolute  shadow-lg shadow-slate-400  top-[2%] right-[5%] text-2xl bg-yellow-400 rounded-full w-[3rem] h-[3rem] z-100'
						onClick={() => setDisplayModal(false)}>
						{' '}
						<b>X</b>
					</button>

					<div className='flex flex-col p-2 mb-12 mt-4  gap-2 w-full h-fit md:min-h-[33rem] z-[50]'>
						<div className='sections w-full py-2  flex flex-col  relative justify-center '>
							<p className=' uppercase w-full my-1  md:text-xl text-yellow-400 font-medium z-[100] bg-black/60 p-2 md:leading-[2rem]'>
								{modalCard?.label}
							</p>
							<div className=' w-full h-full  bg-gradient-to-l to-transparent justify-start items-center flex flex-row  '>
								<div className='  bg-black/60 z-[100] text-slate-100 w-full'>
									<ul className='list-disc list-inside text-black p-2 w-full'>
										{modalCard?.ingredientLines.map(
											(ingredient: string | undefined, index: number) => {
												return (
													<li key={index} className='text-slate-100 text-sm '>
														{ingredient}
													</li>
												);
											},
										)}
									</ul>
								</div>
							</div>
						</div>
						<section className='w-full min-h-fit  flex flex-col  '>
							<div className='capitalize italic'>
								<span className='font-semibold not-italic mr-2'>
									Dish Type:
								</span>
								{modalCard?.cuisineType}
							</div>
							<div className='capitalize italic font-semibold'>
								Diets:{' '}
								<span className=' italic font-normal'>
									{modalCard?.dietLabels}
								</span>
							</div>
							<div className='capitalize italic font-semibold min-h-fit'>
								Health Labels: {'  '}
								{modalCard?.healthLabels.map(
									(label: string | undefined, index: number) => {
										if (index < 10) {
											return (
												<span key={index} className=' italic font-normal'>
													{(index ? ', ' : '') + label}
												</span>
											);
										}
										if (index === 10) {
											return (
												<span key={index} className=' italic font-normal'>
													{', ' + label + '...'}
												</span>
											);
										}
									},
								)}
							</div>
						</section>
					</div>

					<section
						className={`grid ${
							currentUser?.uid ? 'grid-cols-2' : 'grid-cols-1'
						} w-[90%] text-center text-black   border-black border-t-[1px] p-2 z-50`}>
						{currentUser?.uid && (
							<div className='grid grid-cols-3'>
								<button
									onClick={() => addLikesOrDislikes('like')}
									className={`m-auto hover:scale-105 rounded-full md:hover:bg-yellow-400 p-2`}
									title='like item'>
									<AiFillLike
										className={`${liked && 'text-green-500 scale-150'}`}
									/>
								</button>

								<button
									onClick={() => addLikesOrDislikes('dislike')}
									className={`m-auto hover:scale-105 rounded-full md:hover:bg-yellow-400 p-2`}
									title='dislike item'>
									<AiFillDislike
										className={`${disliked && 'text-red-500 scale-150'}`}
									/>
								</button>
								<button
									onClick={() => addRecipesToLibrary()}
									className={`m-auto text-2xl hover:scale-105 rounded-full md:hover:bg-yellow-400 p-1`}
									title={`${
										!added ? 'add to library' : 'remove from library'
									}`}>
									{added ? (
										<TiTick className='text-yellow-600 text-3xl' />
									) : (
										<TiPlus />
									)}
								</button>
							</div>
						)}
						<button className='p-2 bg-yellow-400 justify-end rounded hover:scale-105 default-animation shadow-[0_1px_6px_-1px_rgba(0,0,0,0.3)]'>
							<a
								rel='noopener noreferrer'
								target='_blank'
								className='flex justify-center transition-none items-center p-1 font-bold'
								href={modalCard?.url}>
								Instructions <BsArrowUpRight />
							</a>
						</button>
					</section>
				</div>
			</div>
		</MuiModal>
	);
}

export default ModalCard;
