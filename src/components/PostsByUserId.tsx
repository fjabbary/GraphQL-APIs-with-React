import { useQuery } from "@apollo/client";
import { GET_POSTS_BY_USER_ID } from "../queries/Queries";
import { Alert, Container, Spinner, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";

interface PostProps {
  title: string;
  body: string;
}

const PostsByUserId: React.FC = () => {
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const inputId = prompt("Enter user id") || "";
    setId(inputId);
  }, []);

  const { data, loading, error } = useQuery(GET_POSTS_BY_USER_ID, {
    variables: { id },
  });

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
      <h1 className="bg-dark text-white">List of Posts for userId of 44{id}</h1>
      <Row>
        {data?.user.posts.data.map(
          ({ title, body }: PostProps, index: number) => (
            <Col key={index}>
              <Card style={{ width: "18rem" }} className="mb-3">
                <Card.Body>
                  <Card.Title>{title.substring(0, 20)}</Card.Title>

                  <Card.Text>{body.substring(0, 40)}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>
    </Container>
  );
};

export default PostsByUserId;
