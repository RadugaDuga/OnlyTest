import React from "react";
import App from "./App";
import "./styles/index.scss";
import "swiper/css";
import "swiper/css/navigation";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
if (!container) throw new Error("Что то пошло не так, вот тебе ошибка");
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
