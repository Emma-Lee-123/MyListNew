import { useEffect, useState } from "react";
//import { ListTabs, ListItemInput } from "./Lists/index";
import { useUser } from "../UserContext";
import AppHeader from "../components/AppHeader";
import {
  addNewTaskItem,
  deleteTaskItem,
  getTaskItems,
  setTaskCompleted,
} from "../stores/TaskStore";
import { type TaskItem } from "../models/TaskItem";
import ListTabs from "./ListTabs";
import ListItemInput from "./ListItemInput";

const ListMain: React.FC = () => {
  const { user } = useUser();
  const [items, setItems] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("All");

  async function handleAddNewTaskItem(name: string): Promise<void> {
    setError("");
    if (user?.id !== undefined) {
      const newItem: TaskItem = {
        id: 0,
        isCompleted: false,
        taskName: name,
        category: "General",
        userId: user?.id,
      };
      try {
        const addedItem = await addNewTaskItem(newItem);
        if (addedItem) {
          const newItems: TaskItem[] = [...items, addedItem];
          setItems(newItems);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    }
  }

  async function handleComplete(id: number): Promise<void> {
    setError("");
    if (id !== 0) {
      const newItem: TaskItem = {
        id: id,
        isCompleted: true,
        taskName: "",
        category: "",
        userId: 0,
      };
      try {
        const updated = await setTaskCompleted(newItem);
        if (updated) {
          const newItems: TaskItem[] = [...items];
          newItems.find((item) => item.id === id)!.isCompleted =
            newItem.isCompleted;
          setItems(newItems);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    }
  }

  async function handleDelete(id: number): Promise<void> {
    if (id === 0) return;
    setError("");
    try {
      const deleted = await deleteTaskItem(id);
      if (deleted) {
        const newItems: TaskItem[] = items.filter((item) => item.id !== id);
        setItems(newItems);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  }

  /*
If user is initially null or undefined, and then becomes a valid object after login, here's what happens:
React renders your component with user = null.
useEffect(() => ..., [user]) and useEffect(() => ..., [user?.id]) both skip running because dependencies didn't change.
Then user is updated (e.g., via setUser()), triggering a re-render.
Now both user and user?.id are new values.
Both useEffect hooks are triggered again (in order), with the first one (watching user) running before the second (watching user?.id).
*/
  useEffect(() => {
    if (user) {
      console.log("User is available:", user);
    }
  }, [user]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        if (user?.id !== undefined) {
          const userTasks = await getTaskItems(user.id);
          setItems(userTasks);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user?.id]);
  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <AppHeader />
      <ListTabs
        taskItems={items}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        handleDeleteTaskItem={handleDelete}
        handleSetTaskItemComplete={handleComplete}
      />
      <ListItemInput handleAddTaskItem={handleAddNewTaskItem} />
    </>
  );
};

export default ListMain;
