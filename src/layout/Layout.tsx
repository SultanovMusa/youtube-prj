import Videos from "../components/Videos/Videos";
import scss from "./Layout.module.scss";
import Footer from "./footer/Footer";
import {Routes, Route } from 'react-router-dom';
import Header from "./header/Header";
import UsePramst from "../components/usePrams/UsePrams";
const Layout = () => {
	return (
		<div className={scss.layout}>
			<Header />
			<Routes>
				<Route path="/" element={<Videos/>}/>
				<Route path="/:id" element={<UsePramst/>}/>
			</Routes>
			<Footer />
			
		</div>
	);
};

export default Layout;
