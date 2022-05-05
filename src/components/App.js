import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import '../css/app.css'
import RecipeEdit from './RecipeEdit';

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)
  
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: Math.random() *1000,
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: Math.random() *1000, name: '', amount: '' }
      ]
    }

    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  )
}


const sampleRecipes = [
  {
    id:1,
    name: 'Khichdi',
    cookTime: '00:30',
    servings: 3,
    instructions: "1. Rinse ½ cup moong lentils and ½ cup rice together. Wash them well under running cold water or rinse them 3-4 times till water becomes clear. \n2. Add salt and turmeric powder.\n3. Turn the heat on medium and let it cook for 3-4 whistles.",
    ingredients: [
      {
        id:1,
        name: 'Moong lentils and rice',
        amount: '1/2 cup'
      },
      {
        id:2,
        name: 'Salt to taste & Turmeric Powder',
        amount: '1/2 teaspoon'
      }
    ]
  },
  {
    id:2,
    name: 'Jeera Rice',
    cookTime: '00:45',
    servings: 4,
    instructions: '1. Soak the washed rice in water for at least 30 minutes and drain the soaked rice.\n2. Heat ghee and add the spices - cardamom, cinnamon, bay leaf, green chilli and cumin and then add the soaked rice.\n3. Cover it and let it come to a boil. On low flame let it cook for 10 minutes and serve it.',
    ingredients: [
      {
        id:1,
        name: 'Basmati rice',
        amount: '1/2 cup'
      },
      {
        id:2,
        name: 'Salt to taste',
        amount: '1/2 teaspoon'
      },
      {
        id:3,
        name: 'Oil, jeera, coriander (finely chopped)',
        amount: '1 tsp'
      }
    ]
  }
]

export default App;