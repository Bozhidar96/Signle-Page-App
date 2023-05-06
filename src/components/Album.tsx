import { AlbumType } from "../types";
import styled from "styled-components";

const AlbumList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const AlbumListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const AlbumArtwork = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const AlbumName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

interface Props {
  albums: AlbumType[];
  rotatedAlbums: AlbumType[];
}

const Album = ({ rotatedAlbums }: Props) => {
  return (
    <AlbumList>
      {rotatedAlbums && rotatedAlbums.length > 0
        ? rotatedAlbums.map(
            ({
              collectionId,
              collectionName,
              artistName,
              artworkUrl100,
            }: AlbumType) => (
              <AlbumListItem key={collectionId}>
                <AlbumArtwork
                  src={artworkUrl100}
                  alt={`${collectionName} artwork`}
                />
                <div>
                  <AlbumName>{collectionName}</AlbumName>
                  <p>{artistName}</p>
                </div>
              </AlbumListItem>
            )
          )
        : null}
    </AlbumList>
  );
};

export default Album;
