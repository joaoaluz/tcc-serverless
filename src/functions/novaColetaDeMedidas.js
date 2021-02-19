import {
  Logger,
  apiResponse,
} from 'bgc-shared';

export const main = async (event) => {
  try {
    return apiResponse(200, {
      body: {
        message: 'Successfully fetched!',
      },
    });
  } catch (error) {
    Logger.error('Something went wrong.', { error });
    return apiResponse(500, { body: error });
  }
};
