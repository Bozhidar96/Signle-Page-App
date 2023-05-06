import React from 'react';
import styled from 'styled-components';

type AlbumCoverProps = {
  imageUrl: string;
  altText: string;
};

const AlbumCoverImage = styled.img`
  max-width: 100%;
`;

const AlbumCover: React.FC<AlbumCoverProps> = ({ imageUrl, altText }) => {
  return <AlbumCoverImage src={imageUrl} alt={altText} />;
};

export default AlbumCover;