import React from "react";
import { render } from "@testing-library/react";
import { AlbumCover } from "../components/AlbumCover";

describe("AlbumCover", () => {
  it("renders the image with correct props", () => {
    const imageUrl = "testUrl";
    const altText = "Bozhidar";
    const { getByAltText } = render(
      <AlbumCover imageUrl={imageUrl} altText={altText} />
    );
    const image = getByAltText(altText);
    expect(image).toHaveAttribute("src", imageUrl);
  });
});
