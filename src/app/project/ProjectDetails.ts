import { UserDetails } from "../user/UserDetails";

export class ProjectDetails{
    projectId: number;
    projectName: string;
    projectRequirement: string;
    startDate: Date;
    endDate: Date;
    manager: UserDetails;
}