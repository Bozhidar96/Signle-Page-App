import { render, screen } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import SearchApp from "../components/SearchApp";
import { defaultAlbums } from "../constants/constants";

jest.mock("axios");

jest.spyOn(axios, "get").mockResolvedValueOnce({
  data: { defaultAlbums },
} as AxiosResponse);

describe("SearchApp component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders without errors", () => {
    render(<SearchApp />);
    expect(
      screen.getByPlaceholderText("Search for albums")
    ).toBeInTheDocument();
  });

  it("it returns default albums", async () => {
    render(<SearchApp />);
    const defaultAlbum1 = await screen.findByText("A");
    const defaultAlbum2 = await screen.findByText("B");
    const defaultAlbum3 = await screen.findByText("C");
    const defaultAlbum4 = await screen.findByText("D");

    expect(defaultAlbum1).toBeInTheDocument();
    expect(defaultAlbum2).toBeInTheDocument();
    expect(defaultAlbum3).toBeInTheDocument();
    expect(defaultAlbum4).toBeInTheDocument();
  });
});
