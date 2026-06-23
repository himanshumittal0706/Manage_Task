import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReceipe } from "../store/slices/recipeSlice";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Rating, Chip, Divider } from "@mui/material";

import { Loader } from "../utils/Loader";
import { Error } from "../utils/Error";
import { AddRecipeDialog } from "../utils/Dialog";
import { Search } from "@mui/icons-material";

export const RecipePage = () => {
    const [openRecipeDialog, setOpenRecipeDialog] = useState(false);
    const [searchRecipe, setSearchRecipe] = useState("");

    console.log("==", searchRecipe)

    const dispatch = useDispatch();

    const { loading, error, recipes } = useSelector((state) => state.receipeAPI);

    const filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchRecipe.toLowerCase()))

    useEffect(() => { dispatch(fetchReceipe()) }, [dispatch]);

    const handleOpen = () => { setOpenRecipeDialog(true) }

    const handleClose = () => {
        setOpenRecipeDialog(false);
    };

    if (loading) return <Loader />;
    if (error) return <Error />;

    return (
        <Container fluid className="recipe-container">
            <Row>
                <div className="text-center my-4">
                    <button className="btn btn-danger px-5" onClick={handleOpen}>
                        Add
                    </button>
                </div>

                <div className="d-flex justify-content-center">
                    <input value={searchRecipe} onChange={(e) => setSearchRecipe(e.target.value)} className="form-control w-50 mt-2 mb-5" type="text" name="" id="" autoFocus placeholder="Search here.." />
                </div>

                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                        <Col key={recipe.id} xxl={3} xl={3} lg={4} md={6} sm={12} xs={12} className="mb-4">
                            <Card className="recipe-card shadow">
                                <Card.Body>
                                    <Card.Title>{recipe.name} </Card.Title>

                                    <div className="mb-2"><Badge bg="success" className="me-2">{recipe.cuisine}</Badge>

                                        <Badge bg="warning">{recipe.difficulty}</Badge></div>

                                    <Rating value={recipe.rating} precision={0.1} readOnly />

                                    <p>{recipe.reviewCount}Reviews</p>

                                    <Divider />

                                    <div className="mt-2">
                                        <p>
                                            🍽 Servings:
                                            <strong>{recipe.servings}</strong>
                                        </p>

                                        <p>
                                            ⏱ Prep:
                                            <strong>{recipe.prepTimeMinutes}mins</strong>
                                        </p>

                                        <p>
                                            🔥 Cook:
                                            <strong>
                                                {recipe.cookTimeMinutes}
                                                mins
                                            </strong>
                                        </p>
                                    </div>

                                    <Divider />

                                    <h6 className="mt-2">
                                        Ingredients
                                    </h6>

                                    <ul>
                                        {recipe.ingredients?.slice(0, 4)
                                            .map((item, index) => (
                                                <li key={index}>
                                                    {item}
                                                </li>
                                            ))}
                                    </ul>

                                    <Divider />

                                    <div className="mt-2">
                                        {recipe.tags?.map(
                                            (tag, index) => (<Chip key={index} label={tag} size="small" sx={{ mr: 1, mb: 1 }} />)
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (<h2 className="text-center">Recipe Not Found</h2>)}
            </Row>
            <AddRecipeDialog open={openRecipeDialog} handleClose={handleClose} />
        </Container>
    );
};


