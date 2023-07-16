import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { Form, Button } from "react-bootstrap";

const ReviewTab = () => {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [formError, setFormError] = useState(false);

  const onStarClick = (nextRating) => {
    setRating(nextRating);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setFormError(false);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
    setFormError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      rating === 0 ||
      title.trim().length < 5 ||
      review.trim().length < 5
    ) {
      setFormError(true);
      return;
    }

    console.log(rating);
    console.log(title);
    console.log(review);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Your rating: </Form.Label>
        <div style={{ display: "inline-block", verticalAlign: "middle" }}>
          <StarRatingComponent
            name="rating"
            starCount={5}
            value={rating}
            onStarClick={onStarClick}
            isInvalid={formError && rating === 0}
          />
        </div>
        <Form.Control
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          isInvalid={formError && (title.trim().length < 5 || title.trim() === "")}
        />
        <Form.Control
          as="textarea"
          placeholder="Your review..."
          rows={3}
          value={review}
          onChange={handleReviewChange}
          isInvalid={formError && (review.trim().length < 5 || review.trim() === "")}
        />
        {formError && (
          <Form.Control.Feedback type="invalid">
            Please provide a title and review (minimum 5 characters).
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
    </Form>
  );
};

export default ReviewTab;
