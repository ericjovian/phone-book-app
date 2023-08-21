import Routes from "./routes/routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ContactProvider } from "./contexts/ContactContext";

function App() {
  return (
    <>
      <Provider store={store}>
        <ContactProvider>
          <Routes />
        </ContactProvider>
      </Provider>
    </>
  );
}

export default App;
