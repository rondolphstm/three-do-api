// app.get('/taskts', getTasks);
// app.post('/tasks', createTask);
// app.patch('/tasks/:taskId', updateTask);
// app.delete('/tasks/:taskId', deleteTasks);

export function getTasks(req,res){
    res.send('TASKS');
}

export function createTask(req,res){
    const newTask = req.body;
    res.status(201).send('Task Added')
}

export function updateTask(req,res){
    const taskUpdate = req.body;
    const {taskId} = req.params;
    res.status(202).send('tesk updated');
}

 export function deleteTask(req,res){
    const {teskId} = req.params
    res.status(203).send('task deleted');
 }