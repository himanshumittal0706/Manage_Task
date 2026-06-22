import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReceipe } from "../store/slices/recipeSlice";
import { Container, Row, Col, Card, Badge, } from "react-bootstrap";
import { Rating, Chip, Divider, } from "@mui/material";
import { Loader } from "../utils/Loader";
import { Error } from "../utils/Error";


export const RecipePage = () => {
    const dispatch = useDispatch();

    const { loading, error, recipes } = useSelector((state) => state.receipeAPI);

    useEffect(() => {
        dispatch(fetchReceipe());
    }, [dispatch]);

    if (loading) return <Loader />;
    if (error) return <Error />;

    return (
        <Container fluid className="recipe-container">
            <Row>
                {recipes?.map((recipe) => (
                    <Col key={recipe.id} xxl={4} xl={4} lg={6} md={6} sm={12} xs={12} className="mb-4">
                        <Card className="recipe-card shadow-lg">
                            <Card.Img variant="top" src={recipe.image} className="recipe-image" />

                            <Card.Body>
                                <Card.Title className="recipe-title"> {recipe.name}</Card.Title>

                                <div className="mb-3">
                                    <Badge bg="success" className="me-2">
                                        {recipe.cuisine}
                                    </Badge>

                                    <Badge bg="warning">{recipe.difficulty}</Badge>
                                </div>

                                <Rating value={recipe.rating} precision={0.1} readOnly />

                                <p className="review-count">{recipe.reviewCount} Reviews </p>

                                <Divider className="mb-3" />

                                <div className="recipe-info">
                                    <p>
                                        🍽 Servings:
                                        <strong>
                                            {recipe.servings}
                                        </strong>
                                    </p>

                                    <p>
                                        ⏱ Prep:
                                        <strong>
                                            {recipe.prepTimeMinutes} mins
                                        </strong>
                                    </p>

                                    <p>
                                        🔥 Cook:
                                        <strong>
                                            {recipe.cookTimeMinutes} mins
                                        </strong>
                                    </p>

                                    <p>
                                        🥗 Calories:
                                        <strong>
                                            {recipe.caloriesPerServing}
                                        </strong>
                                    </p>
                                </div>

                                <Divider className="mb-3" />

                                <h6>Ingredients</h6>

                                <ul className="ingredient-list">
                                    {recipe.ingredients
                                        ?.slice(0, 5)
                                        .map((item, index) => (
                                            <li key={index}>
                                                {item}
                                            </li>
                                        ))}
                                </ul>

                                <Divider className="mb-3" />

                                <h6>Tags</h6>

                                <div className="tag-container">
                                    {recipe.tags?.map((tag, index) => (
                                        <Chip key={index} label={tag} size="small" className="tag-chip" />
                                    ))}
                                </div>

                                <Divider className="mb-3" />

                                <h6>Meal Type</h6>

                                {recipe.mealType?.map(
                                    (meal, index) => (
                                        <Chip key={index} label={meal} color="primary" size="small" sx={{ mr: 1 }} />
                                    )
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};



