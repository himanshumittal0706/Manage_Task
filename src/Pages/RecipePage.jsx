import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipe } from "../store/slices/recipeSlice";
import { Container, Row, Col } from "react-bootstrap";
import { Rating } from "@mui/material";

import { Loader } from "../utils/Loader";
import { Error } from "../utils/Error";
import { AddRecipeDialog } from "../utils/Dialog";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import "./RecipePage.css";

export const RecipePage = () => {
    const [openRecipeDialog, setOpenRecipeDialog] = useState(false);
    const [searchRecipe, setSearchRecipe] = useState("");

    const dispatch = useDispatch();

    const { loading, error, recipes } = useSelector((state) => state.recipeAPI);

    const filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchRecipe.toLowerCase()))

    useEffect(() => { dispatch(fetchRecipe()) }, [dispatch]);

    const handleOpen = () => { setOpenRecipeDialog(true) }

    const handleClose = () => {
        setOpenRecipeDialog(false);
    };

    if (loading) return <Loader />;
    if (error) return <Error message={error} />;

    return (
        <div className="recipe-page-bg">
            <Container fluid className="recipe-container">
                <div className="recipe-header">
                    <h2 className="recipe-title">
                        <span className="recipe-title-icon">🍳</span>
                        Recipe Explorer
                    </h2>
                    <p className="recipe-subtitle">Discover delicious recipes from around the world</p>

                    <div className="recipe-actions">
                        <div className="recipe-search-wrapper">
                            <SearchIcon className="recipe-search-icon" />
                            <input
                                value={searchRecipe}
                                onChange={(e) => setSearchRecipe(e.target.value)}
                                className="recipe-search-input"
                                type="text"
                                autoFocus
                                placeholder="Search recipes..."
                            />
                        </div>
                        <button className="recipe-add-btn" onClick={handleOpen}>
                            <AddIcon fontSize="small" />
                            Add Recipe
                        </button>
                    </div>
                </div>

                <Row className="g-4">
                    {filteredRecipes.length > 0 ? (
                        filteredRecipes.map((recipe) => (
                            <Col key={recipe.id} xxl={3} xl={3} lg={4} md={6} sm={12} xs={12}>
                                <div className="recipe-card">
                                    <div className="recipe-card-img">
                                        <span className="recipe-card-img-icon">🍽️</span>
                                    </div>
                                    <div className="recipe-card-body">
                                        <h3 className="recipe-card-name">{recipe.name}</h3>

                                        <div className="recipe-card-badges">
                                            <span className="recipe-badge cuisine">
                                                🥘 {recipe.cuisine}
                                            </span>
                                            <span className="recipe-badge difficulty">
                                                📊 {recipe.difficulty}
                                            </span>
                                        </div>

                                        <div className="recipe-card-meta">
                                            <Rating value={recipe.rating} precision={0.1} readOnly size="small" />
                                            <p className="recipe-review-count">
                                                ({recipe.reviewCount} reviews)
                                            </p>
                                        </div>

                                        <div className="recipe-card-info">
                                            <p className="recipe-info-item">
                                                <span className="recipe-info-label">🍽 Servings: </span>
                                                <span className="recipe-info-value">{recipe.servings}</span>
                                            </p>
                                            <p className="recipe-info-item">
                                                <span className="recipe-info-label">⏱ Prep: </span>
                                                <span className="recipe-info-value">{recipe.prepTimeMinutes} min</span>
                                            </p>
                                            <p className="recipe-info-item">
                                                <span className="recipe-info-label">🔥 Cook: </span>
                                                <span className="recipe-info-value">{recipe.cookTimeMinutes} min</span>
                                            </p>
                                        </div>

                                        <p className="recipe-section-title">🥄 Ingredients</p>
                                        <ul className="recipe-ingredients-list">
                                            {recipe.ingredients?.slice(0, 4).map((item, index) => (
                                                <li key={index} className="recipe-ingredient-chip">{item}</li>
                                            ))}
                                        </ul>

                                        {recipe.tags && recipe.tags.length > 0 && (
                                            <div className="recipe-tags">
                                                {recipe.tags.map((tag, index) => (
                                                    <span key={index} className="recipe-tag">{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        ))
                    ) : (
                        <div className="recipe-not-found">
                            <p className="recipe-not-found-icon">🔍</p>
                            <p className="recipe-not-found-text">
                                {searchRecipe ? `No recipes found for "${searchRecipe}"` : "No recipes available"}
                            </p>
                        </div>
                    )}
                </Row>
                <AddRecipeDialog open={openRecipeDialog} handleClose={handleClose} />
            </Container>
        </div>
    );
};


