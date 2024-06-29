export class APIConstant{
    public static BaseAPI="http://localhost:4000/api/"
    public static getAllProject=APIConstant.BaseAPI+"projectlist"
    public static saveProject=APIConstant.BaseAPI+"projectadd"
    public static deleteProject=APIConstant.BaseAPI+"projectdelete"
    public static getAllApps=APIConstant.BaseAPI+"getApps"
    public static ADD_TASK=APIConstant.BaseAPI+"addTask"
    public static ADD_ATTENDENCE=APIConstant.BaseAPI+"addAttendence"
    public static GET_ATTENDENCE=APIConstant.BaseAPI+"getAttendence"
    public static UPDATE_ATTENDENCE=APIConstant.BaseAPI+"updateAttendence"
}