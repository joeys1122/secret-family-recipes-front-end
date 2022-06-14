import React from "react";
import { Modal, Button } from "react-bootstrap";
import { axiosWithAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function DeleteRecipe(props) {
  const { recipe_id, showDelete, handleDelete, details } = props;
  const navigate = useNavigate();

  const deleteRecipe = () => {
    axiosWithAuth().delete(`recipes/${recipe_id}`)
      .then(res => {
        navigate('/recipes');
      })
      .catch(err => console.log(err));
  };
  
  return(
    <Modal show={showDelete} onHide={handleDelete} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Recipe?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete {details.title} by {details.source}?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleDelete}>Cancel</Button>
        <Button onClick={deleteRecipe}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
};

export default DeleteRecipe;