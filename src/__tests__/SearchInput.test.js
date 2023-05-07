import { render, fireEvent } from "@testing-library/react";
import SearchInput from "../components/SearchInput";

describe("SearchInput component", () => {
  it("should render an input element with the given props", () => {
    const handleChange = jest.fn();
    const placeholder = "Search for albums";
    const { getByPlaceholderText } = render(
      <SearchInput
        type="text"
        value="query"
        onChange={handleChange}
        placeholder={placeholder}
      />
    );

    const inputElement = getByPlaceholderText(placeholder);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("value", "query");
    expect(inputElement).toHaveAttribute("placeholder", "Search for albums");

    fireEvent.change(inputElement, { target: { value: "BozhidarAlbum" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
