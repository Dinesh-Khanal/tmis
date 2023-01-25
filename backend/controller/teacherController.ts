import { Response, Request } from "express";
export const getTeachers = (req: Request, res: Response) => {
  res.json({
    name: "Teaher name",
    address: "teacher address",
  });
};
