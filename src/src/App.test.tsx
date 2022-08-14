import { render, screen } from "@testing-library/react";
import App from "./App";
import createMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = createMockStore([]);

test("renders react component", () => {
  const state = {
    poke: {
      cards: [
        {
          name: "pikachu",
          id: 29,
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
          abilities: [
            {
              ability: {
                name: "static",
                url: "https://pokeapi.co/api/v2/ability/9/",
              },
              is_hidden: false,
              slot: 1,
            },
            {
              ability: {
                name: "lightning-rod",
                url: "https://pokeapi.co/api/v2/ability/31/",
              },
              is_hidden: true,
              slot: 3,
            },
          ],
        },
      ],
      total_added: 1,
    },
  };
  const store = mockStore(state);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const divElement = screen.getByText(/lightning-rod/i);
  expect(divElement).toBeInTheDocument();
});
