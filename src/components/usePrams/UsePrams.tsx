import axios from "axios";
import scss from "./UsePrams.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../tools/store";

interface VideoPayload {
	_id?: number;
	title: string;
	description: string;
	urls: string;
	tags: string;
}

const UsePramst = () => {
	const bektodo = useAppSelector((state) => state.youtube.data);
	const { id } = useParams();
	const url = ` https://api.elchocrud.pro/api/v1/163f5f5009829fada554c4d06e9aab2f/youtube/${id}`;

	const [todos, setTodos] = useState<VideoPayload[]>([]);

	const getRequest = async () => {
		const response = await axios.get(url);
		setTodos([response.data]);
	};

	useEffect(() => {
		getRequest();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div>
			<div className={scss.cars}>
				<div className={scss.content}>
					{todos.map((item) => (
						<div key={item._id}>
							<iframe allowFullScreen src={item.urls} />
							<h1> {item.title}</h1>
							<h3> {item.description}</h3>
							<p> {item.tags}</p>
						</div>
					))}
				</div>
				<div className={scss.car}>
					{bektodo.map((item) => (
						<div key={item._id}>
							<div className={scss.form}>
								<h1> {item.title}</h1>
								<img src={item.url} alt="logo" />
								<h3> {item.description}</h3>
								<p> {item.tags}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UsePramst;
