import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import {
	getYoutubeVideo,
	postYoutubeVideo,
} from "../../tools/slice/youTubeThunk";
import { RootState, useAppDispatch } from "../../tools/store";
import scss from "./AddVideo.module.scss";

interface AddVideoProps {
	open: boolean;
	onClose: () => void;
}

const style: React.CSSProperties = {
	position: "absolute",
	top: "50%",
	left: "50%",
	width: "20rem",
	height: "13rem",
	padding: "2%",
	transform: "translate(-50%, -50%)",
	backgroundColor: "#000000",
	border: "2px solid #f7080871",
	boxShadow: "5px 8px 10px #ca0f0f29",
};

const AddVideo: React.FC<AddVideoProps> = ({ open, onClose }) => {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [url, setUrl] = useState<string>("");
	const [tags, setTags] = useState<string>("");
	const [error, setError] = useState<string>("");

	const dispatch = useAppDispatch();
	const { loading } = useSelector((state: RootState) => state.youtube);
	useEffect(() => {
		const fetchYoutubeVideo = async () => {
			await dispatch(getYoutubeVideo());
		};
		fetchYoutubeVideo();
	}, [dispatch]);

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value);
	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) =>
		setDescription(e.target.value);
	const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) =>
		setUrl(e.target.value);
	const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) =>
		setTags(e.target.value);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = {
			title,
			description,
			url,
			tags,
		};

		if (!title || !description || !url || !tags) {
			setError("All fields are required");
			return;
		} else {
			try {
				await dispatch(postYoutubeVideo(data));
				await dispatch(getYoutubeVideo());
				setTitle("");
				setUrl("");
				setTags("");
				setDescription("");
				onClose();
			} catch (error) {
				console.error("Error occurred while posting video:", error);
			}
		}
	};

	return (
		<div className={scss.content}>
			<div className="container">
				<Modal
					className={scss.form}
					open={open}
					onClose={onClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description">
					<Box sx={style}>
						<form onSubmit={handleSubmit}>
							<div>
								<input
									type="text"
									placeholder="Ырчынын Аты 🥷"
									id="title"
									value={title}
									onChange={handleTitleChange}
								/>

								<input
									type="url"
									placeholder="Ссылка 🖼️"
									id="url"
									value={url}
									onChange={handleUrlChange}
								/>

								<input
									type="text"
									placeholder="Ырдын Аты 🎶"
									id="description"
									value={description}
									onChange={handleDescriptionChange}
								/>

								<input
									type="number"
									placeholder="Жылы ✏️"
									id="tags"
									value={tags}
									onChange={handleTagsChange}
								/>

								{error && <p style={{ color: "red" }}>{error}</p>}

								<button type="submit" disabled={loading}>
									Submit
								</button>
							</div>
						</form>
					</Box>
				</Modal>
			</div>
		</div>
	);
};

export default AddVideo;
