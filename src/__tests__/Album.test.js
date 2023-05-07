import { render, screen } from "@testing-library/react";
import Album from "../components/Album";
import { defaultAlbums } from "../constants";

describe("Album", () => {
  it("renders a list of rotated albums", () => {
    render(<Album rotatedAlbums={defaultAlbums} />);

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
  });

  it("does not render when rotatedAlbums is empty", () => {
    render(<Album rotatedAlbums={[]} />);
    expect(screen.queryByText("A")).toBeNull();
    expect(screen.queryByText("B")).toBeNull();
    expect(screen.queryByText("C")).toBeNull();
    expect(screen.queryByText("D")).toBeNull();
  });
});
