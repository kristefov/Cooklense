import React, { useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";
import { Form, Button, Spinner, Container, Card } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_REVIEW } from "../../utils/mutations";
import { GET_REVIEWS } from "../../utils/queries";
import { useSelector } from "react-redux/es/hooks/useSelector";
import StarRating from '../../components/StarRating';

const ReviewTab = ({ idMeal }) => {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [createReview] = useMutation(CREATE_REVIEW);
  const { loading, error, data } = useQuery(GET_REVIEWS, {
    variables: { idMeal: idMeal },
  });
  const { username } = useSelector((state) => state.auth.user);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  useEffect(() => {
    if (!loading && !error) {
      setReviews(data.getReviews);
      setReviewsLoaded(true);
    }
  }, [loading, data, error]);

  const onStarClick = (nextRating) => {
    setRating(nextRating);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setFormError(false);
  };

  const handleReviewChange = (e) => {
    setComment(e.target.value);
    setFormError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || title.trim().length < 5 || comment.trim().length < 5) {
      setFormError(true);
      return;
    }
    const reviewData = {
      idMeal: idMeal,
      username: username,
      rating: rating,
      title: title,
      comment: comment,
    };

    await createReview({ variables: { reviewData } })
      .then(({ data }) => {
        console.log("Review created.");
        setReviews((prevReviews) => [...prevReviews, data.createReview]);
      })
      .catch((error) => {
        console.error("Error creating review:", error);
      });
    setTitle("");
    setComment("");
    setRating(5);
  };

  if (loading || !reviewsLoaded) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Your rating: </Form.Label>
          <Container style={{ display: "inline-block", verticalAlign: "middle" }}>
            <StarRatingComponent
              name="rating"
              starCount={5}
              value={rating}
              onStarClick={onStarClick}
              isInvalid={formError && rating === 0}
            />
          </Container>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            isInvalid={
              formError && (title.trim().length < 5 || title.trim() === "")
            }
          />
          <Form.Control
            as="textarea"
            placeholder="Your review..."
            rows={3}
            value={comment}
            onChange={handleReviewChange}
            isInvalid={
              formError && (comment.trim().length < 5 || comment.trim() === "")
            }
          />
          {formError && (
            <Form.Control.Feedback type="invalid">
              Please provide a title and review (minimum 5 characters).
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Container>
      </Form>
      <Container>
        {reviews.slice(-5).map((review) => (
          <Card key={review.id} className="mb-3">
            <Card.Body>
              <Card.Title>{review.title}</Card.Title>
              <Card.Text>{review.comment}</Card.Text>
              <Card.Text>Rating: <StarRating numStars={review.rating} /></Card.Text>
              <Card.Text>Username: {review.username}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default ReviewTab;
