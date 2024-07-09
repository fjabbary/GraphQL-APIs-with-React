import { useMutation, useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/Queries";
import { DELETE_POST, UPDATE_POST } from "../mutations/Mutations";
import { Alert, Container, Spinner, Row, Col, Card } from "react-bootstrap";

interface User {
  id: string;
}

interface PostProps {
  id: string;
  title: string;
  body: string;
  user: User;
}

const Posts: React.FC = () => {
  const { data, loading, error } = useQuery(GET_POSTS);
  const [deletePost] = useMutation(DELETE_POST);
  const [updatePost] = useMutation(UPDATE_POST);

  const handleDelete = async (id: string) => {
    try {
      await deletePost({ variables: { id } });
      alert("Post with id of " + id + " deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const title = prompt("Enter post title: ");
      const body = prompt("Enter post body: ");

      const res = await updatePost({ variables: { id, title, body } });
      console.log("Post with id of " + id + " updated");
      console.log("Updated post", res.data.updatePost);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>Failed to fetch data!</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    );
  }

  return (
    <Container>
      <h1 className="bg-dark text-white">List of Posts</h1>
      <Row>
        {data.posts.data.map(({ id, title, body, user }: PostProps) => (
          <Col key={id}>
            <Card style={{ width: "18rem" }} className="mb-3">
              <Card.Body>
                <p className="text-primary">Post Id: {id}</p>
                <p className="text-success">User Id: {user.id}</p>
                <Card.Title>{title.substring(0, 20)}</Card.Title>

                <Card.Text>{body.substring(0, 40)}</Card.Text>
              </Card.Body>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(id)}
              >
                X
              </button>
              <button
                className="btn btn-sm btn-warning"
                onClick={() => handleUpdate(id)}
              >
                Edit
              </button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Posts;
