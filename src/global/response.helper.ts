import { Response } from 'express';

function sendResponse(
  res: Response,
  status: any,
  success: boolean,
  data: any,
  errors: any,
  msg: any,
  token: any,
) {
  const response: any = {};

  if (success !== null) response.success = success;
  if (data !== null) response.data = data;
  if (errors !== null) response.errors = errors;
  if (msg !== null) response.msg = msg;
  if (token !== null) response.token = token;
  res.status(status).json(response);
  return response;
}

async function getQueryRequest(
  model: any,
  searchq: any,
  selectq: any,
  sortq: any,
  page: any,
  size: any,
  populate: any,
  poulate1: any,
) {
  try {
    const datas: any = {};

    datas.data = await model
      .find(searchq)
      .select(selectq)
      .sort(sortq)
      .skip((page - 1) * size)
      .limit(size * 1)
      .populate(populate)
      .populate(poulate1);

    datas.totalData = await model.countDocuments(searchq);

    return datas;
  } catch (error) {
    console.log(error);
  }
}

async function paginationHelper(
  res: any,
  status: any,
  success: any,
  data: any,
  msg: any,
  pageno: any,
  pagesize: any,
  totaldata: any,
) {
  const response: any = {};
  if (data) response.data = data;
  if (success !== null) response.success = success;
  if (msg) response.msg = msg;
  if (pageno) response.page = pageno;
  if (pagesize) response.size = pagesize;
  if (typeof totaldata === 'number') response.totaldata = totaldata;
  return res.status(status).json(response);
}
export { sendResponse, getQueryRequest, paginationHelper };
