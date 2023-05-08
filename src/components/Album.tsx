import { AlbumType } from "../types";
import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #dbeadb;
  border-radius: 10px;
  border: 2px solid #808080;
  min-width: auto;
  min-height: 100px;
  padding: 30px;
`;
const AlbumList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const AlbumListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid #808080;
  padding: 10px;
  height: 100px;
`;

const AlbumArtwork = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 50px;
  border: 1px solid #808080;
`;

const AlbumName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

interface Props {
  rotatedAlbums: AlbumType[];
  albums?: AlbumType[];
}

export const Album = ({ rotatedAlbums }: Props) => {
  return (
    <Container>
      <AlbumList>
        {rotatedAlbums && rotatedAlbums.length > 0
          ? rotatedAlbums.map(
              ({
                collectionId,
                collectionName,
                artistName,
                artworkUrl100,
              }: AlbumType) => (
                <AlbumListItem key={collectionId + collectionName}>
                  {artworkUrl100 ? (
                    <AlbumArtwork
                      src={artworkUrl100}
                      alt={`${collectionName}`}
                    />
                  ) : null}
                  <div>
                    <AlbumName>{collectionName ?? "No Title"}</AlbumName>
                    <p>{artistName ?? "No Artist Name"}</p>
                  </div>
                </AlbumListItem>
              )
            )
          : null}
      </AlbumList>
    </Container>
  );
};

export default Album;
