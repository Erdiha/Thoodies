import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useAuth, { AuthProvider } from '../firebaseData';
import Signin_signup from '../components/Signin_signup';
import UserProfile from './UserProfile';
import { BsArrowLeft } from 'react-icons/bs';
import { displayModalAtom, modalRecipeCardAtom } from '../recoilAtom';
import { useRecoilState } from 'recoil';
import RecipeModal from '../components/RecipeModal';

function Account() {
	const { isLoading, currentUser, logout } = useAuth();
	const [displayModal, setDisplayModal] = useRecoilState(displayModalAtom);
	const [getCardInfo, setGetCardInfo] = useRecoilState(modalRecipeCardAtom);
	const [loggedOut, setLoggedOut] = useState(false);
	 useEffect(() => {
		currentUser ? setLoggedOut(false) : setLoggedOut(true);
	}, [currentUser]);
	return (
		<div className='flex flex-col min-w-full min-h-[100vh]  bg-gray-100  '>
			<div className='w-full h-[10vh] justify-around  items-center px-2 flex'>
				<Link
					href='/..'
					className='flex justify-center items-center min-w-[10%] p-1 h-12 font-bold gap-2 rounded-lg default-animation hover:-translate-x-1 '>
					<BsArrowLeft className='text-2xl ' /> HOME
				</Link>
				{!loggedOut && (
					<button
						onClick={() => {
							setLoggedOut(true);
							logout();
						}}
						className=' font-bold min-w-[10%] h-12 rounded-lg p-2 default-animation hover:translate-y-1 hover:bg-red-200'>
						LOG OUT
					</button>
				)}
			</div>

			<div className='w-full bg-gray-100  flex flex-col justify-center items-center relative min-h-[90vh]'>
				{loggedOut && !currentUser ? (
					<div className='w-full  flex flex-col justify-center items-center'>
						<h1 className='flex justify-center  w-[80%] md:w-[50%] text-2xl p-8'>
							To save and like recipes please Sign up/Sign in.
						</h1>
						<Signin_signup />
					</div>
				) : (
					<UserProfile />
				)}
			</div>
			<RecipeModal modalCard={getCardInfo} />
		</div>
	);
}

export default Account;
