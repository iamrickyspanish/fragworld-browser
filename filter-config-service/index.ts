import { IncomingMessage, ServerResponse } from "http";
import { send, createError, json } from "micro";
import url from "url";
// @ts-ignore
import query from "micro-query";
import DataService, { IFilterConfigCreateData } from "./src/dataService";

interface IndexQueryParams {
  userId: string | number;
}

const service = new DataService({
  notFoundError: createError(404, "item not found"),
  noDatabaseError: createError(500, "no db connection")
});

const mapRequestToId = (req: IncomingMessage): any => {
  if (!req.url) return null;
  const { pathname } = new url.URL(req.url, `http://${req.headers.host}`);
  return pathname.slice(1).split("/")[0];
};

const server = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<any> => {
  if (req.method === "GET") {
    const id = mapRequestToId(req);
    if (id) {
      const item = await service.get(id);
      return send(res, 200, item);
    } else {
      const queryData: IndexQueryParams = query(req);
      if (!queryData.userId) throw createError(400, "userId required");
      const items = await service.index(queryData);
      return send(res, 200, items);
    }
  } else if (req.method === "POST") {
    const data: IFilterConfigCreateData = <IFilterConfigCreateData>(
      await json(req)
    );
    const newItem = await service.create(data);
    return send(res, 201, newItem);
  } else if (req.method === "PATCH") {
    const id = mapRequestToId(req);
    const data = await json(req);
    const item = await service.update(id, data);
    return send(res, 200, item);
  } else if (req.method === "DELETE") {
    const id = mapRequestToId(req);
    await service.destroy(id);
    return send(res, 200, { message: "ok " });
  }
};

export default server;
module.exports = server;