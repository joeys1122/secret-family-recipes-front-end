import React from "react";
import { Container, Col, Button } from "react-bootstrap";

function Home() {
  return(
    <Container className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Secret Family Recipes</h1>
      <Col className="mx-auto">
        <p className="lead mb-4">
          Anyone can go out and buy a cookbook these days, but I want a place to store all my secret family recipes, handed down from generation to generation.
          The little cards my grandma wrote the recipes on in her beautiful cursive are getting lost or are hard to read. I need somewhere secure to keep my recipes with me at all times!
        </p>
        <p className="text-muted">Create an account to view recipes or login here!</p>
        <div>
          <Button className="me-4" size="lg" href='/login'>Login</Button>
          <Button size="lg" variant="secondary" href='/signup'>Signup</Button>
        </div>
      </Col>
    </Container>
  )
}

export default Home;