import "./App.scss";
import MyHeader from "./components/MyHeader/MyHeader";
import PokeList from "./components/PokeList/PokeList";
import PokeSlide from "./components/PokeSlide/PokeSlide";

function App() {
  return (
    <div className="App">
      <MyHeader />
      <PokeSlide />
      <PokeList />
    </div>
  );
}

export default App;
