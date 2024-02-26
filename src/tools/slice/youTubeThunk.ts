import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Url: string = import.meta.env.VITE_BACKEND_URL as string;

interface VideoPayload {
	title: string;
	description: string;
	url: string;
	tags: string;
}

export const getYoutubeVideo = createAsyncThunk(
	"youtube/getVideo",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get<VideoPayload[]>(Url);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const postYoutubeVideo = createAsyncThunk(
	"youtube/postVideo",
	async (payload: VideoPayload, { rejectWithValue }) => {
		try {
			const response = await axios.post(Url, payload);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteTodo = createAsyncThunk(
	"youtube/Delete",
	async (_id: number, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`${Url}/${_id}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
