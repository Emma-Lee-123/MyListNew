import type { TaskItem } from "../models/TaskItem";
import { appendParameterToUrl } from "./Util";

const addNewTaskItem = async (taskItem: TaskItem): Promise<TaskItem> => {
  const func_url_base: string = import.meta.env.VITE_WEBAPP_FUNC_ADDTASK_URL;
  console.log("func_url_base:", func_url_base); // Log the URL for debugging
  const response = await fetch(func_url_base, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskItem),
  });

  if (!response.ok) {
    throw new Error("Failed to add new taskitem");
  }
  const result: TaskItem = await response.json();
  console.log("taskItem added:", result);
  return result;
};

const getTaskItems = async (userId: number): Promise<TaskItem[]> => {
  const func_url: string = import.meta.env.VITE_WEBAPP_FUNC_GETTASKSBYUSER_URL;
  console.log("func_url:", func_url); // Log the URL for debugging
  const url = appendParameterToUrl(func_url, "userId", userId.toString());

  console.log("url:", url); 
  console.log("userId:", userId); 

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get taskitems");
  }
  const result: TaskItem[] = await response.json();
  console.log("taskItems fetched:", result);
  return result;
};

const setTaskCompleted = async (taskItem: TaskItem): Promise<boolean> => {
  const func_url_base: string = import.meta.env.VITE_WEBAPP_FUNC_SETTASKCOMPLETE_URL;
  console.log("func_url_base:", func_url_base); 
  const response = await fetch(func_url_base, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskItem),
  });

  if (!response.ok) {
    console.error("Error:Failed to set task completed - ", response);
    throw new Error("Failed to set task completed status");
  }
  const result: boolean = await response.json();
  console.log("taskItem completed status updated:", taskItem);
  return result;
};

const deleteTaskItem = async (id: number): Promise<boolean> => {
  const func_url_base: string = import.meta.env.VITE_WEBAPP_FUNC_DELETETASK_URL;
  console.log("func_url_base:", func_url_base); 
  const func_url = appendParameterToUrl(func_url_base, "taskId", id.toString());
  console.log("func_url:", func_url); // Log the URL for debugging

  const response = await fetch(func_url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete taskitem");
  }
  const result: boolean = await response.json();
  console.log("taskItem deleted:", result);
  return result;
};
export { addNewTaskItem, getTaskItems, setTaskCompleted, deleteTaskItem };
