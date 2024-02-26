import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../tools/store";
import { Link } from "react-router-dom";
import { deleteTodo, getYoutubeVideo } from "../../tools/slice/youTubeThunk";
import scss from "./Videos.module.scss";

const Videos: React.FC = () => {
	const { data, search } = useSelector((state: RootState) => state.youtube);
	const dispatch = useAppDispatch();

	const deleteItem = (_id: number) => {
		dispatch(deleteTodo(_id)).then(() => {
			dispatch(getYoutubeVideo());
		});
	};

	const filteredData = data?.filter((item: { title: string }) =>
		search.toLowerCase() === ""
			? true
			: item.title.toLowerCase().includes(search)
	);

	return (
		<div className={scss.videos}>
			<div className="container">
				<div className={scss.content}>
					{filteredData?.map((item) => (
						<Link to={`/${item._id}`} className={scss.car} key={item.id}>
							<h1>{item.title}</h1>
							<img src={item.url} alt={item.title} />
							<h3>{item.description}</h3>
							<p>{item.tags}</p>
							<button onClick={() => deleteItem(item._id)}>Delete</button>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Videos;
