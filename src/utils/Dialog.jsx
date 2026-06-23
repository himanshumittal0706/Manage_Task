
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Slide } from "@mui/material";
import { useDispatch } from "react-redux";
import { addReceipe } from "../store/slices/recipeSlice";

const Transition = React.forwardRef(function Transition(props, ref) { return <Slide direction="up" ref={ref} {...props} /> });

export const FetchByIdDialog = ({ open, handleClose }) => {

    const { singleTodo } = useSelector((state) => state.todoAPI);

    return (
        <section>
            <Dialog open={open} onClose={handleClose} slots={{ transition: Transition, }} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description" role="alertdialog">
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p>ID: {singleTodo?.id}</p>
                        <p>Todo: {singleTodo?.todo}</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>Close</Button>
                </DialogActions>
            </Dialog>
        </section>
    );
}

export const AddRecipeDialog = ({ open, handleClose }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ name: "", cuisine: "", difficulty: "", servings: "" });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        dispatch(
            addReceipe({
                ...formData,

                ingredients: [
                    "Tomato",
                    "Cheese",
                    "Bread",
                ],

                instructions: [
                    "Prepare Ingredients",
                    "Cook",
                    "Serve",
                ],
            })
        );

        setFormData({
            name: "",
            cuisine: "",
            difficulty: "",
            servings: "",
        });

        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} fullWidth maxWidth="sm" >
            <DialogTitle>Add Recipe</DialogTitle>

            <DialogContent>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Recipe Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Cuisine"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    type="number"
                    label="Servings"
                    name="servings"
                    value={formData.servings}
                    onChange={handleChange}
                />
            </DialogContent>

            <DialogActions>
                <Button
                    color="error"
                    onClick={handleClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Save Recipe
                </Button>
            </DialogActions>
        </Dialog>
    );
};


