import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
	return (
		<header className="netflix-header relative">
			<div className="left-controls absolute left-4 top-3 flex items-center gap-2 z-40">
				<button className="text-white hidden sm:inline">Pesquisar</button>
			</div>

			<div className="netflix-logo mx-auto">NETFLIX</div>

			<div className="right-controls absolute right-4 top-3 flex items-center gap-4">
				<Link to="/login" className="btn-netflix btn-login">Entrar</Link>
			</div>
		</header>
	);
};

export default Header;
