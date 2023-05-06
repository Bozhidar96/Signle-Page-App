import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AlbumType } from "../types";
import SearchInput from "./SearchInput";
import Album from "./Album";
import axios from 'axios';
import { API_URL, defaultAlbums } from "../constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function SearchApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [rotatedAlbums, setRotatedAlbums] = useState<AlbumType[]>(defaultAlbums);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if(albums && albums.length > 0) {
          const copyRotatedAlbums = [...rotatedAlbums]
          copyRotatedAlbums.shift()
          copyRotatedAlbums.push(albums[0]) // get first element 
          setRotatedAlbums(copyRotatedAlbums)
          setAlbums((prevAlbums) => {
            const copyAlbums = prevAlbums.map((e) => e)
            const newElement = copyAlbums.shift() // set first to last and second be first
            copyAlbums.push(newElement!)
            return copyAlbums
          })
      } else {
        const copyRotatedAlbums = [...rotatedAlbums]
        copyRotatedAlbums.shift()
         copyRotatedAlbums.push(rotatedAlbums[0])
          setRotatedAlbums(copyRotatedAlbums)
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [albums, rotatedAlbums]);


  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    try {

      if(!term) {
        return
      }
      const response = await axios.get(`${API_URL}?term=${term}`);
      console.log("res===", response)
      const albums: AlbumType[] = response.data.results
        .filter((result: any) => result.wrapperType === 'track')
        .map((result: any) => ({
          collectionId: result.collectionId,
          collectionName: result.collectionName,
          artistName: result.artistName,
          artworkUrl100: result.artworkUrl100,
        }));

      const uniqueAlbums = albums.filter((obj, index, arr) => arr.findIndex((o) => o.collectionId === obj.collectionId) === index);
      if(uniqueAlbums.length > 0) {
        uniqueAlbums.sort((a, b) => a.collectionName.localeCompare(b.collectionName));
      }
      console.log("uniqueAlbums", uniqueAlbums)
      setAlbums(uniqueAlbums);
      // setRotatedAlbums(() => [...uniqueAlbums.slice(0, 5)]);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Container>
      <SearchInput type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search for an artist" />
      <Album albums={albums} rotatedAlbums={rotatedAlbums}/>
    </Container>
  );
};

export default SearchApp;
