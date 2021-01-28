import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px 24px;
`;

let taskId = 1;
let subId = 1;
function App() {
  const [tasks, setTasks] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [subTaskName, setSubTaskName] = useState('');

  function createTask(taskName) {
    const newTask = {
      id: taskId,
      name:taskName,
      isAllDone: false
    };
    setTasks([newTask, ...tasks])
    taskId ++;
  }

  function createSubTask(subTaskName,taskId) {
    const newSubTask = {subId, subTaskName, taskId};
    setSubTasks([newSubTask, ...subTasks])
    subId ++;
  }

  function getTaskName() {
    if(taskName) {
      createTask(taskName);
      setTaskName('');
    }
  }

  function getSubTaskName(taskId){
    if(subTaskName && taskId) {
      createSubTask(subTaskName,taskId);
      setSubTaskName('');
    }
  }

  function onChangeTaskName(event) {
    setTaskName(event.target.value)
  }

  function onChangeSubTaskName(event) {
    setSubTaskName(event.target.value)
  }

  function duplicateTask(taskName) {
    createTask(taskName)
  }

  function deleteTask(id){
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
  }

  function deleteSubTask(Id){
    const updatedSubTask = subTasks.filter((subTasks) => subTasks.subId !== Id);
    setSubTasks(updatedSubTask);
  }

  return (
    <Container>
      <Space>
        <Input style={{ width: 400 }} placeholder="Enter Task Name" value={taskName} onChange={onChangeTaskName}/>
        <Button type="primary" onClick={getTaskName}>Create Task</Button>
      </Space>
      {tasks.map((task) => (
        <Space key={task.id} direction="vertical" style={{ marginTop: 24 }}>
          <Card
            title={task.name}
            style={{ width: 600 }}
            extra={
              <>
                <Button type="primary" onClick={() => duplicateTask(task.name)}>Duplicate</Button>{" "}
                <Button type="primary" onClick={() => deleteTask(task.id)} danger>
                  Delete
                </Button>
              </>
            }
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Space>
                <Input placeholder="Enter Subtask Name" style={{ width: 400 }} value={subTaskName} onChange={onChangeSubTaskName} />
                <Button type="primary" onClick={() => getSubTaskName(task.id)}>Add Subtask</Button>
              </Space>
              <Divider />
              {subTasks.map((subTask) => (
                  <Row key={subTask.subId}>
                    <Col span={16}>
                      <Typography.Text>{subTask.subTaskName}</Typography.Text>
                    </Col>
                    <Col span={8}>
                      {/* <Button type="primary">Done</Button>{" "} */}
                      <Button type="danger" onClick={() => deleteSubTask(subTask.subId)}>Delete</Button>
                    </Col>
                  </Row>
              ))}
            </Space>
          </Card>
        </Space>
      ))}
    </Container>
  );
}

export default App;
