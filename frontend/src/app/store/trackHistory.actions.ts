import { createAction, props } from '@ngrx/store';
import { TrackHistoryData, TrackHistoryModel } from '../models/trackHistory.model';

export  const fetchTrackHistoryRequest = createAction('[TrackHistory] Fetch Request', props<{id: string}>());
export  const fetchTrackHistorySuccess = createAction('[TrackHistory] Fetch Success', props<{trackHistory: TrackHistoryModel[]}>());
export  const fetchTrackHistoryFailure = createAction('[TrackHistory] Fetch Failure', props<{error: string}>());

export  const createTrackHistoryRequest = createAction('[TrackHistory] Create Request', props<{data: TrackHistoryData}>());
export  const createTrackHistorySuccess = createAction('[TrackHistory] Create Success');
export  const createTrackHistoryFailure = createAction('[TrackHistory] Create Failure', props<{error: string}>());
