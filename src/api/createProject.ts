import axios from "axios";

type CreateProjectData = {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  areaOfInterest: string;
};

export const createProjectMutation = (data: CreateProjectData) => {
  return axios.post("/api/create-project", data);
};
