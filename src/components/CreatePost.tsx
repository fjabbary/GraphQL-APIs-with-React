import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../mutations/Mutations";
import { FormEvent, useRef } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";

const CreatePostForm = () => {
  const inputTitle = useRef<HTMLInputElement>(null);
  const inputBody = useRef<HTMLInputElement>(null);

  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (inputTitle.current && inputBody.current) {
      createPost({
        variables: {
          title: inputTitle.current.value,
          body: inputBody.current.value,
        },
      });
      inputTitle.current.value = "";
      inputBody.current.value = "";
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>ERROR</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    );
  }

  return (
    <Container>
      <h1>Create Post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="postTitle">
          <Form.Label>Title: </Form.Label>
          <Form.Control
            autoComplete="off"
            type="text"
            placeholder="Enter post title"
            ref={inputTitle}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="postBody">
          <Form.Label>Body: </Form.Label>
          <Form.Control
            autoComplete="off"
            type="text"
            placeholder="Enter post body"
            ref={inputBody}
          />
        </Form.Group>

        <Button type="submit">Create Post</Button>
      </Form>
      <br />
      <hr />
      <br />
      {data && data.createPost && (
        <div>
          <h4>New Post Title: {data.createPost.title}</h4>
          <p>New Post Body: {data.createPost.body}</p>
        </div>
      )}
    </Container>
  );
};

export default CreatePostForm;
