import jwt from "jsonwebtoken"
import dbConnect from "./dbConnect.js"
import { secretKey } from "../credentials.js"

export async function getTasks(req, res) {
  const token = req.headers.authorization
  const user = jwt.verify(token, secretKey)
  const db = dbConnect()
  const collection = await db
    .collection("tasks")
    .where("userId", "==", user.id)
    // .find({'userId': user.id}) samething for mongodb
    .get()
    .catch((err) => res.status(500).send(err))
  const tasks = collection.docs.map((doc) => {
    // return {...doc.datat(), id: doc.id}
    let task = doc.data()
    task.id = doc.id
    return task
  })
  res.send(tasks)
}

export async function createTask(req, res) {
  const token = req.headers.authorization
  let newTask = req.body
  const user = jwt.verify(token, secretKey)
  if (!newTask || !newTask.task || !user) {
    res.status(400).send({ sucess: false, message: "Invaild request" })
    return
  }
  newTask.userId = user.id
  const db = dbConnect()
  await db
    .collection("tasks")
    .add(newTask)
    .catch((err) => res.status(500).send(err))
  res.status(201)
  getTasks(req, res) // send back full list of task...
}

export async function updateTask(req, res) {
  const taskUpdate = req.body
  const { taskId } = req.params
  const db = dbConnect()
  await db
    .collection("tasks")
    .doc(taskId)
    .update(taskUpdate)
    .catch((err) => res.status(500).send(err))
  res.status(202)
  getTasks(req, res)
}

export function deleteTask(req, res) {
  const { teskId } = req.params
  res.status(203).send("task deleted")
}
