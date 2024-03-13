import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Pages from "../Pages";
import store from "../../data/store";
import Test from "../../test";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages.Home />} />
          <Route path="/signup" element={<Pages.Signup />} />
          <Route path="/login" element={<Pages.Login />} />
          <Route path="/profile" element={<Pages.Profile />} />
          <Route path="/dimensions" element={<Pages.Dimensions />} />
          <Route path="/resetPassword" element={<Pages.ResetPassword />} />
          <Route path="/dashboard" element={<Pages.Dashboard/>}/>
          
          <Route path="/test" element={<Test />} />

          <Route path="*" element={<Pages.NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
