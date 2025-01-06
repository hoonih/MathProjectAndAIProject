import {BrowserRouter, Route, Routes} from "react-router-dom";
import InputScreen from "../pages/InputScreen.tsx";
import ResultScreen from "../pages/ResultScreen.tsx";
import Mandelbrot from "../pages/Mandella.tsx";
import Jullia from "../pages/Jullia.tsx";
import EnterScreen from "../pages/EnterScreen.tsx";
import ChattingScreen from "../pages/ChattingScreen.tsx";


function RootRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EnterScreen />} />
                <Route path="/chat" element={<ChattingScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RootRoute;
