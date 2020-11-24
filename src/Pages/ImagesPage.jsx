import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Container, Row, CardColumns } from 'reactstrap';

import Loader from '../Components/Loader';
import PostImage from '../Components/PostImage';
import './ImagesPage.css';

const ImagesPage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get('https://www.reddit.com/r/Eyebleach.json').then((res) => {
      setPosts(res.data.data.children);
      setLoading(false);
    });
  }, []);

  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-center">
        <CardColumns className="cardscolumslayoutimages px-3">
          {loading && <Loader />}
          {posts &&
            posts
              .filter(
                (post) =>
                  post.data.url_overridden_by_dest?.split('.').pop() ===
                    'png' ||
                  post.data.url_overridden_by_dest?.split('.').pop() === 'jpg'
              )
              .map((post) => {
                return (
                  <PostImage
                    id={post.data.permalink.split('/')[4]}
                    slugTitle={post.data.permalink.split('/')[5]}
                    title={post.data.title}
                    url_overridden_by_dest={post.data.url_overridden_by_dest}
                    author={post.data.author}
                    key={post.data.id}
                  />
                );
              })
              .slice(1, 50)}
        </CardColumns>
      </Row>
    </Container>
  );
};

export default ImagesPage;
