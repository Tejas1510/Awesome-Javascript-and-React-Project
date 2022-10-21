import Routes from "./routes";
import Provider from "./provider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export function App() {
  return (
    <div>
      <Provider>
        <main>
          <div>
            <Routes />
          </div>
        </main>
      </Provider>
    </div>
  );
}

export default App;
