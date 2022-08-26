import dbConnect from './dbConnect.js'

export async function getTasks(req,res){// later add "by user id" to this... 
    const db = dbConnect()
   const collection = await db.collection('tasks').get() 
   .catch(err => res.status(500).send(err));
   const tasks = collection.docs.map(doc=>{
    // return {...doc.datat(), id: doc.id}
    let task = doc.data()
    task.id = doc.id
    return task;
   })
    res.send(tasks);
}

export async function createTask(req,res){ // later we will add userId and timestamp....
    const newTask = req.body;
    if (!newTask || !newTask.task){
        res.status(400).send({sucess: false , message: 'Invaild request'});
        return
    }
    const db =dbConnect();
   await db.collection('tasks').add(newTask)
   .catch(err => res.status(500).send(err))
    res.status(201)
    getTasks(req,res) // send back full list of task...
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