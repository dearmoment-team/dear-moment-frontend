import { ApiResponse } from '../common/types';

interface AddLikeSuccess {
  likeId: number;
}

export type AddLikeResponse = ApiResponse<AddLikeSuccess>;
