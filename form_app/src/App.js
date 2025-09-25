import Form from "./pages/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router'
import { ROUTES } from './constants/routes';
import Table from "./pages/Table";
import { Provider } from 'react-redux'
import { store } from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Form />} />
          <Route path={ROUTES.TABLE} element={<Table />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
