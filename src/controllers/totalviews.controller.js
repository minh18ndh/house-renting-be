import * as totalViewsService from '../services/totalviews.service.js';

export const incrementView = async (req, res) => {
  await totalViewsService.incrementView();
  res.sendStatus(204);
};

export const getTotalViews = async (req, res) => {
  const count = await totalViewsService.getTotalViews();
  res.json({ total: count });
};