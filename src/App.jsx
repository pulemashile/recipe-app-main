import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardTitle, CardContent } from './components/card';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Import } from 'lucide-react';
import './App.css';

// Enhanced RecipeCard component with prep and serving time
const RecipeCard = ({ recipe, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(recipe);

  const handleEditClick = () => {
    if (isEditing) {
      onEdit(editedRecipe);
    }
    setIsEditing(!isEditing);
  };

  return (
    <Card>
      <CardTitle>
        {isEditing ? (
          <Input
            value={editedRecipe.label}
            onChange={(e) => setEditedRecipe({ ...editedRecipe, label: e.target.value })}
          />
        ) : (
          recipe.label
        )}
      </CardTitle>
      <CardContent>
        <img 
          src={recipe.image || "/api/placeholder/300/200"} 
          alt={recipe.label}
          className="w-full h-48 object-cover rounded mb-2"
        />
        {isEditing ? (
          <div className="space-y-2">
            <Input
              value={editedRecipe.image}
              onChange={(e) => setEditedRecipe({ ...editedRecipe, image: e.target.value })}
              placeholder="Image URL"
            />
            <Input
              value={editedRecipe.source}
              onChange={(e) => setEditedRecipe({ ...editedRecipe, source: e.target.value })}
              placeholder="Source"
            />
            <Input
              value={editedRecipe.prepTime}
              onChange={(e) => setEditedRecipe({ ...editedRecipe, prepTime: e.target.value })}
              placeholder="Prep Time (minutes)"
              type="number"
            />
            <Input
              value={editedRecipe.servingTime}
              onChange={(e) => setEditedRecipe({ ...editedRecipe, servingTime: e.target.value })}
              placeholder="Serving Time (minutes)"
              type="number"
            />
            <Input
              value={editedRecipe.ingredients}
              onChange={(e) => setEditedRecipe({ ...editedRecipe, ingredients: e.target.value })}
              placeholder="Ingredients"
            />
          </div>
        ) : (
          <>
            <p><strong>Source:</strong> {recipe.source}</p>
            <div className="flex space-x-4 my-2">
              <p><strong>Prep:</strong> {recipe.prepTime || 'N/A'} mins</p>
              <p><strong>Serving:</strong> {recipe.servingTime || 'N/A'} mins</p>
            </div>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
          </>
        )}
        <div className="flex gap-2 mt-4">
          <Button 
            onClick={handleEditClick} 
            variant="outline"
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
          {!isEditing && (
            <Button onClick={() => onDelete(recipe.id)} variant="danger">
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced RecipeForm with validation
const RecipeForm = ({ onSubmit }) => {
  const [recipe, setRecipe] = useState({
    label: '',
    image: '',
    source: '',
    prepTime: '',
    servingTime: '',
    ingredients: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!recipe.label.trim()) {
      newErrors.label = 'Recipe name is required';
    }
    
    if (recipe.prepTime && (isNaN(recipe.prepTime) || parseInt(recipe.prepTime) < 0)) {
      newErrors.prepTime = 'Prep time must be a positive number';
    }
    
    if (recipe.servingTime && (isNaN(recipe.servingTime) || parseInt(recipe.servingTime) < 0)) {
      newErrors.servingTime = 'Serving time must be a positive number';
    }
    
    if (!recipe.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
    setTouched({ ...touched, [name]: true });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validate());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched to show all validation errors
    const allTouched = Object.keys(recipe).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(recipe);
      setRecipe({ 
        label: '', 
        image: '', 
        source: '', 
        prepTime: '', 
        servingTime: '', 
        ingredients: '' 
      });
      setTouched({});
    }
  };

  return (
    <>
     <div className="bg-gradient-to-b from-green-50 to-green-100">
      <header className="">
  <div className="px-4 mx-auto sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16 lg:h-20">
      <div className="flex-shrink-0">
        <a href="#" title="" className="flex">
          {/* <img className="w-auto h-8" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/logo.svg" alt="" /> */}Yummly.
        </a>
      </div>

      <div className="flex items-center space-x-6 w-full lg:w-auto">
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
          <a href="#" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80"> Features </a>
          <a href="#" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80"> Solutions </a>
          <div className="flex items-center w-full max-w-md lg:max-w-xs mx-auto">
        
        </div>
          <a href="#" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80"> Resources </a>
          <a href="#" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80"> Pricing </a>
          <div className="w-px h-5 bg-black/20"></div>
          <a href="#" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Login </a>
          <a href="#" title="" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2
           border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white rounded-md" 
           role="button"> Register </a>
        </div>      
      </div>
    </div>
  </div>
</header>


        <section className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h1 className="text-3xl font-bold text-black sm:text-6xl lg:text-7xl">
                With a vast collection of recipes
                  <div className="relative inline-flex">
                    <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
                    <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl"></h1>
                  </div>
                </h1>

                <p className="mt-8 text-base text-black sm:text-xl">Yummly is a recipe app that offers personalized 
                  recommendations based on your taste preferences and dietary restrictions <br></br>Yummly also allows 
                  users to create shopping lists and save their favorite recipes for easy access.</p>

                <div className="mt-10 sm:flex sm:items-center sm:space-x-8">
                  <a href="#" title="" className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-[#D80032] hover:bg-[#D80032] focus:bg-orange-600" role="button"> Start exploring </a>
                </div>
              </div>

              <div>
                <img className="w-full pl-6" src="src/assets/pic.png" />
              </div>
            </div>
          </div>
        </section>
      </div>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
      <div className="space-y-4">
        <div>
          <Input
            name="label"
            placeholder="Recipe Name *"
            value={recipe.label}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.label && touched.label ? "border-red-500" : ""}
          />
          {errors.label && touched.label && <p className="text-red-500 text-sm mt-1">{errors.label}</p>}
        </div>
        
        <Input
          name="image"
          placeholder="Image URL"
          value={recipe.image}
          onChange={handleChange}
        />
        
        <Input
          name="source"
          placeholder="Source"
          value={recipe.source}
          onChange={handleChange}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              name="prepTime"
              placeholder="Prep Time (mins)"
              type="number"
              value={recipe.prepTime}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.prepTime && touched.prepTime ? "border-red-500" : ""}
            />
            {errors.prepTime && touched.prepTime && <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>}
          </div>
          
          <div>
            <Input
              name="servingTime"
              placeholder="Serving Time (mins)"
              type="number"
              value={recipe.servingTime}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.servingTime && touched.servingTime ? "border-red-500" : ""}
            />
            {errors.servingTime && touched.servingTime && <p className="text-red-500 text-sm mt-1">{errors.servingTime}</p>}
          </div>
        </div>
        
        <div>
          <Input
            name="ingredients"
            placeholder="Ingredients (comma separated) *"
            value={recipe.ingredients}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.ingredients && touched.ingredients ? "border-red-500" : ""}
          />
          {errors.ingredients && touched.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
        </div>
        
        <Button type="submit" variant="primary" className="w-full">
          Add Recipe
        </Button>
      </div>
    </form>
    </>
  );
};

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleAddRecipe = async (newRecipe) => {
    try {
      const response = await axios.post('http://localhost:3000/recipes', newRecipe);
      setRecipes([...recipes, response.data]);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleEditRecipe = async (updatedRecipe) => {
    try {
      await axios.put(`http://localhost:3000/recipes/${updatedRecipe.id}`, updatedRecipe);
      setRecipes(recipes.map(recipe => 
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ));
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">

        <header className="mb-8 absolute top-[18%] Left-[10%] ">         
        <div className="flex items-center w-full max-w-md lg:max-w-xs mx-auto">
        <div className="absolute right-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M14 14L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M16.4333 18.5252C15.8556 17.9475 15.8556 17.0109 16.4333 16.4333C17.0109 15.8556 17.9475 15.8556 18.5252 16.4333L21.5667 19.4748C22.1444 20.0525 22.1444 20.9891 21.5667 21.5667C20.9891 22.1444 20.0525 22.1444 19.4748 21.5667L16.4333 18.5252Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
</div>
          <Input
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>
        </header>

        <RecipeForm onSubmit={handleAddRecipe} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={handleDeleteRecipe}
              onEdit={handleEditRecipe}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;