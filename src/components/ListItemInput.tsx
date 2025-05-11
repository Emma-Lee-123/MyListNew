import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import type { ListItemInputProps } from "../models/TaskItem";

const ListItemInput: React.FC<ListItemInputProps> = ({ handleAddTaskItem }) => {
  const [taskName, setTaskName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskName.trim()) {
      handleAddTaskItem(taskName.trim());
      setTaskName(""); //clear the input field after adding the task
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <InputGroup>
        <Form.Control
          type="text"
          value={taskName}
          onChange={handleChange}
          placeholder="Add a new task..."
          required
          className="shadow-sm"
        />
        <Button type="submit" variant="primary">
          <i className="fa-solid fa-plus me-1"></i>Add
        </Button>
      </InputGroup>
    </Form>
  );
};

export default ListItemInput;
