import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { UsersProvider } from "./context/UsersContext";


function App() {
return (
<UsersProvider>
<Routes>
<Route path="/" element={<Home />} />
</Routes>
</UsersProvider>
);
}


export default App;
