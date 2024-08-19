import axiosInstance from "../axios.ts";
import {ISuccessOperation} from "../../types/base.ts";
import {IAdminCourseRunTimetable, ICreatedTimetableRule, ICreateOrUpdateRule} from "../../types/timetable.ts";

const URL = {
    GET_TIMETABLE: "/api/v1/admin/courses/courseId/runs/courseRunId/timetable",
    CREATE_TIMETABLE_RULE: "/api/v1/admin/courses/courseId/runs/courseRunId/timetable/rules",
    DELETE_TIMETABLE_RULE: "/api/v1/admin/courses/courseId/runs/courseRunId/timetable/rules/ruleId",
    UPDATE_TIMETABLE_RULE: "/api/v1/admin/courses/courseId/runs/courseRunId/timetable/rules/ruleId",
};


const getCourseRunTimetable = (courseId: string, courseRunId: string) => {
    return axiosInstance.get<IAdminCourseRunTimetable>(
        URL.GET_TIMETABLE.replace("courseId", courseId).replace("courseRunId", courseRunId)
    ).then(res => res.data);
};

const createTimetableRule = (courseId: string, courseRunId: string, timetableId: string, data: ICreateOrUpdateRule) => {
    return axiosInstance.post<ICreatedTimetableRule>(
        URL.CREATE_TIMETABLE_RULE
            .replace("courseId", courseId)
            .replace("courseRunId", courseRunId),
        data
    ).then(res => res.data);
};

const updateTimetableRule = (courseId: string, courseRunId: string, timetableId: string, ruleId: string, data: ICreateOrUpdateRule) => {
    return axiosInstance.put<ISuccessOperation>(
        URL.UPDATE_TIMETABLE_RULE
            .replace("courseId", courseId)
            .replace("courseRunId", courseRunId)
            .replace("ruleId", ruleId),
        data
    ).then(res => res.data);
};

const deleteTimetableRule = (courseId: string, courseRunId: string, timetableId: string, ruleId: string) => {
    return axiosInstance.delete<ISuccessOperation>(
        URL.DELETE_TIMETABLE_RULE
            .replace("courseId", courseId)
            .replace("courseRunId", courseRunId)
            .replace("ruleId", ruleId)
    ).then(res => res.data);
};

export {getCourseRunTimetable, createTimetableRule, updateTimetableRule, deleteTimetableRule};