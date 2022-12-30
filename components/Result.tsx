import React from 'react';
import Cards from './Cards';

function Result({ recipeData, searchTerms }: any) {
	function capitalizeWords(word: string | undefined) {
		return word?.replace(/\b[a-z]/gi, function (letter) {
			return letter.toUpperCase();
		});
	}
	const handleFilter = () => {
		const filteredData = recipeData?.filter((item: any) =>
			item.recipe.healthLabels.includes(
				capitalizeWords(searchTerms?.healthLabels),
			),
		);
	
		const resData = filteredData.length > 0 ? filteredData : recipeData;
		return resData?.map((card: any, index: number) => {
			return <Cards key={index} card={card.recipe} id={index} />;
		});
	};

	return (
		<div
			className='w-full flex flex-wrap  overflow-x-hidden z-[200] mb-[15rem]
    justify-center items-center  default-animation
    gap-10 p-10 py-20'>
			{handleFilter()}
		</div>
	);
}

export default Result;
