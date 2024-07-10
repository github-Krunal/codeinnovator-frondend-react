import { TasksModel } from "./tasks.model";

export class ContainerModel{
    public _id?:string;
    public Name?:string;
    public PlanID?:string;
    public Tasks:TasksModel[]=[]
}