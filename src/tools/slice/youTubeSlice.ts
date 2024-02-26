import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteTodo, getYoutubeVideo } from "./youTubeThunk";

interface VideoState {
	loading: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any[];
	search: string;
	error: string | null;
}

const initialState: VideoState = {
	loading: false,
	data: [],
	search: '',
	error: null,
};

export const youTubeSlice = createSlice({
	name: "youtube",
	initialState,
	reducers: {
		getSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				getYoutubeVideo.fulfilled,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(state, { payload }: PayloadAction<any[]>) => {
					state.loading = false;
					state.data = payload;
					state.error = null;
				}
			)
			.addCase(deleteTodo.fulfilled, (state, { payload }) => {
				state.data = state.data.filter((item) => item._id !== payload);
			});
	},
});

export const { getSearch } = youTubeSlice.actions;
