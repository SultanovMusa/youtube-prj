import React, { useEffect, useState } from "react";
import scss from "./Header.module.scss";
import { AiFillYoutube } from "react-icons/ai";
import { IoSearchSharp } from "react-icons/io5";
import Profile from "../../components/Profile/Profile";
import { useDispatch } from "react-redux";
import { getSearch } from "../../tools/slice/youTubeSlice";

const Header = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSearch(searchQuery));
	}, [dispatch, searchQuery]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchQuery(e.target.value);

	const handleSearch = () => {
		console.log("Search query:", searchQuery);
	};

	return (
		<header className={scss.header}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.iconi}>
						<p className={scss.icon}>
							<AiFillYoutube />
						</p>
						<p className={scss.icons}>YouTube</p>
					</div>
					<div className={scss.inpt_btn}>
						<input
							type="text"
							value={searchQuery}
							onChange={handleInputChange}
							placeholder="Введите запрос"
						/>
						<button onClick={handleSearch}>
							<IoSearchSharp />
						</button>
					</div>
					<div className={scss.btn_spn}>
						<p>
							<Profile />
						</p>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
