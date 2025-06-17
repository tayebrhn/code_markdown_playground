import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import { useEffect, useRef } from "react";
import { initBundler } from "./bundler";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";

function App() {
  const initBundlerRef = useRef<any>(null);
  useEffect(() => {
    initBundler(initBundlerRef);
  }, []);

  return (
    <Provider store={store}>
      <CellList/>
    </Provider>
  );
}
export default App;
