import { useHistory } from 'react-router-dom';
import { Card, CardText, CardImg, CardImgOverlay } from 'reactstrap';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { VscAccount } from 'react-icons/vsc';
import { BsHeart } from 'react-icons/bs';

import './PostPreview.css';

const PostPreview = ({
  id,
  slugTitle,
  title,
  url_overridden_by_dest,
  author,
  preview,
}) => {
  const [isVideo, setIsVideo] = useState(false);
  useEffect(() => {
    if (preview) setIsVideo(preview.split('.').pop() === 'mp4');
  }, [preview]);
  const history = useHistory();

  const goToPage = () => {
    history.push(`/Post/${id}/${slugTitle}`);
  };

  return (
    <Card
      inverse
      onClick={goToPage}
      style={{
        cursor: 'pointer',
      }}
    >
      {isVideo && (
        <video autoPlay="true" loop width="100%" src={preview}>
          <track default kind="captions" />
        </video>
      )}
      {!isVideo && (
        <CardImg top width="100%" src={url_overridden_by_dest} alt={title} />
      )}
      <CardImgOverlay className="hideinfos d-inline-flex align-items-end justify-content-between">
        <CardText>
          <VscAccount size={18} />
          {author}
        </CardText>
        <CardText>
          <BsHeart size={18} />
        </CardText>
      </CardImgOverlay>
    </Card>
  );
};

PostPreview.propTypes = {
  title: PropTypes.string.isRequired,
  url_overridden_by_dest: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  slugTitle: PropTypes.string.isRequired,
  preview: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default PostPreview;
