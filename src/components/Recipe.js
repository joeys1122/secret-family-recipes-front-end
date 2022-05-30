import React from "react";
import { Link } from "react-router-dom";
import { Col, Card } from "react-bootstrap";

function Recipe(props) {
  const { recipe_id, title, source } = props.recipe;

  return(
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>By {source}</Card.Subtitle>
          <Link to={`/recipes/${recipe_id}`}>View</Link>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Recipe;