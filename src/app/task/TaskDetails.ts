import { ProjectDetails } from "../project/ProjectDetails";
import { UserDetails } from "../user/UserDetails";

export class TaskDetails{
    taskId: number;
    taskName: string;
    taskPriority: string;
    taskRequirements: string;
    taskPercentage: number;
    user: UserDetails;
    parentProject: ProjectDetails;
}