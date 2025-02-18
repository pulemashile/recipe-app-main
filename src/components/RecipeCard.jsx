import { useState } from "react";

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
                value={editedRecipe.ingredients}
                onChange={(e) => setEditedRecipe({ ...editedRecipe, ingredients: e.target.value })}
                placeholder="Ingredients"
              />
            </div>
          ) : (
            <>
              <p><strong>Source:</strong> {recipe.source}</p>
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