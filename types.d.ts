export interface ISearch {
  ingredients: '';
  healthLabels: '';
  cuisine: '';
  filterHealth: false;
  filterCuisine: false;
}

export interface IRecipe {
  recipe: {
    id: string;
    calories: GLfloat;
    cautions: [];
    cuisineType: [];
    dietLabels: [];
    digest: [];
    dishType: [];
    healthLabels: [];
    image: string;
    images: [];
    ingredientLines: [];
    ingredients: [];
    label: string | any;
    mealType: [];
    shareAs: string;
    source: string;
    totalDaily: {};
    totalNutrients: {};
    totalTime: number;
    totalWeight: GLfloat;
    uri: string;
    url: string;
    yield: number;
  };
}
export interface IRecipeArray {
  recipe: IRecipe[] | null;
}
