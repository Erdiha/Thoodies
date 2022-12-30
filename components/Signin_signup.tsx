import React, { useState } from 'react';
import useAuth, { IRegister, Iinput } from '../firebaseData';
import { useForm, SubmitHandler } from 'react-hook-form';

function Signin_signup() {
	const [userLogin, setUserLogin] = useState(false);
	const [demo, setDemo] = useState(false);
	const { logIn, Register } = useAuth();

	//react hook form validation
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Iinput>();

	//when the user clicked button to login, do auth
	const onSubmit: SubmitHandler<Iinput> = async (data: any) => {
		if (demo) {
			data.email = 'demo@demo.com';
			data.password = '123456';
		}
		//if user has account login else register
		userLogin
			? await logIn(data.email, data.password)
			: await Register(data.email, data.password);
	};
	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className=' relative flex h-[24rem] w-[16rem] flex-col px-4 md:p-0  bg-black/70
                items-center justify-center space-y-[1rem] rounded-2xl m-2 z-10 border-2 border-yellow-400
                 md:h-[26rem] md:w-[22rem] lg:h-[32rem] lg:w-[26rem]'>
				<h1 className='md:left-[2rem] left-6 absolute top-[15%] text-2xl font-bold  text-slate-100'>
					Sign In
				</h1>
				<div className=' flex h-[50%] w-[90%] flex-col  justify-around '>
					<input
						{...register('email')}
						required
						className='input'
						type='email'
						placeholder='email'
					/>
					<input
						{...register('password')}
						required
						className='input'
						type='password'
						placeholder='password'
					/>
					<button
						onClick={() => setUserLogin(true)}
						className='md:hover:scale-120 h-[18%] w-[100%]
            hover:md:bg-slate-200 rounded bg-slate-100 font-semibold'
						type='submit'>
						Sign in
					</button>
					<span className='absolute bottom-5 m-auto mt-0 font-semibold text-slate-400 md:bottom-10 '>
						Register Today!{' '}
						<button
							type='submit'
							onClick={() => setUserLogin(false)}
							className='text-slate-300'>
							Register
						</button>
					</span>
				</div>
			</form>
			<div className=' items z-10 center m-5 flex flex-col items-center justify-center gap-4  text-slate-900'>
				{' '}
				<p className='text-[20px]'>OR</p>
				<form action='' className='z-50' onSubmit={handleSubmit(onSubmit)}>
					<button
						type='submit'
						onClick={() => {
							setDemo(true);
							setUserLogin(true);
						}}
						className='  h-10 w-20 cursor-pointer
            border-b-2 border-yellow-400 md:hover:scale-105 default-animation
             rounded-md bg-black/20 font-semibold text-xl'>
						Demo
					</button>
				</form>
			</div>
		</div>
	);
}

export default Signin_signup;
