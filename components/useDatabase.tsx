import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
	databaseRecipesAtom,
	displayModalAtom,
	cardAddedAtom,
} from '../recoilAtom';
import {
	DocumentData,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	setDoc,
} from 'firebase/firestore';
import { IRecipe } from '../types.d';
import useAuth from '../firebaseData';
import { db } from '../firebaseAuth';
interface IAllDatabase {
	allLibrary: [];
	liked: [];
	disliked: [];
	saved: [];
};

function useDatabase(recipeArray: any) {
	const [added, setAdded] = useState(false);
	const [allLibrary, setAllLibrary] = useState<IRecipe[] | DocumentData[]>([]);
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);
	const [likes, setLikes] = useState<DocumentData[]>([]);
	const [dislikes, setDislikes] = useState<DocumentData[]>([]);
	const { currentUser } = useAuth();

	useEffect(() => {
		if (currentUser) {
			return onSnapshot(
				collection(db, 'recipes', currentUser.uid, 'myrecipes'),
				(snapshot) => setAllLibrary(snapshot.docs),
			);
		}
	}, [db, recipeArray?.label]);
	//check the database if the item is already saved in library
	useEffect(() => {
		setAdded(
			allLibrary.findIndex(
				(result: any) => result.id === recipeArray?.label,
			) !== -1,
		);
	}, [allLibrary, added]);

	useEffect(() => {
		setLiked(
			likes.findIndex((result: any) => result.id === recipeArray?.label) !== -1,
		);
	}, [allLibrary, liked, likes]);

	useEffect(() => {
		setDisliked(
			dislikes.findIndex((result: any) => result.id === recipeArray?.label) !==
				-1,
		);
	}, [allLibrary, disliked, dislikes]);

	useEffect(() => {
		if (currentUser) {
			return onSnapshot(
				collection(db, 'recipes', currentUser.uid, 'likes'),
				(snapshot) => setLikes(snapshot.docs),
			);
		}
	}, [db, recipeArray?.label]);

	useEffect(() => {
		if (currentUser) {
			return onSnapshot(
				collection(db, 'recipes', currentUser.uid, 'dislikes'),
				(snapshot) => setDislikes(snapshot.docs),
			);
		}
	}, [db, recipeArray?.label]);

	return [liked, disliked, added];
}

export default useDatabase;
