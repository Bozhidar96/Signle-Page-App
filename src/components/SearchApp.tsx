import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AlbumType } from "../types";
import SearchInput from "./SearchInput";
import Album from "./Album";
import axios from "axios";
import { API_URL, defaultAlbums } from "../constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function SearchApp() {
  const [searchAlbum, setSearchAlbum] = useState("");
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [rotatedAlbums, setRotatedAlbums] =
    useState<AlbumType[]>(defaultAlbums);

  useEffect(() => {
    const intervalId: NodeJS.Timer = setInterval(() => {
      if (albums.length > 0) {
        const [firstAlbum, ...restAlbums] = albums; // get first element and all others
        const newRotatedAlbums = [...rotatedAlbums.slice(1), firstAlbum]; // get second element and all others 2,3,4,5, 1
        setAlbums(restAlbums.concat(firstAlbum)); // 2,3,4,5 and then 1
        setRotatedAlbums(newRotatedAlbums);
      } else {
        setRotatedAlbums([...rotatedAlbums.slice(1), rotatedAlbums[0]]);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [albums, rotatedAlbums]);

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const search = event.target.value;
    setSearchAlbum(search);
    if (!search) {
      setAlbums(defaultAlbums);
    }
    try {
      if (!search) return;

      const response = await axios.get(`${API_URL}?term=${search}`);

      const albums: AlbumType[] = response.data.results
        .filter((result: AlbumType) => result.wrapperType === "track")
        .map((result: AlbumType) => ({
          collectionId: result.collectionId,
          collectionName: result.collectionName,
          artistName: result.artistName,
          artworkUrl100: result.artworkUrl100,
        }));

      const uniqueAlbums = albums.filter(
        (obj: AlbumType, index: number, arr: AlbumType[]) =>
          arr.findIndex((o) => o.collectionId === obj.collectionId) === index
      ); // remove duplicates findIndex?

      setAlbums(uniqueAlbums);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <SearchInput
        type="text"
        value={searchAlbum}
        onChange={handleSearchChange}
        placeholder="Search for albums"
      />
      <Album albums={albums} rotatedAlbums={rotatedAlbums} />
    </Container>
  );
}

export default SearchApp;
