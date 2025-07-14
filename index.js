
const path = require('path');
const promiseTask = require('./modules/task1-promise');
const callbackTask = require('./modules/task2-callback');
const fetchTask = require('./modules/task3-fetch');
const divideSortTask = require('./modules/task4-divide-sort');
const { 
  initDataDir,
  createFile,
  readFile,
  updateFile,
  deleteFile
} = require('./modules/task5-file-crud');

async function runAllTasks() {
    try {
        console.log("=== Task 1: Promise Handling ===");
        await promiseTask.handleWithThenCatch(true);
        await promiseTask.handleWithAsyncAwait(false);
        
        console.log("\n=== Task 2: Callback Handling ===");
        callbackTask.getDataFromServer(true, callbackTask.processData);
        await new Promise(resolve => setTimeout(resolve, 3500));
        
        console.log("\n=== Task 3: Fetch API ===");
        const users = await fetchTask.getData();
        console.log(users);
        
        console.log("\n=== Task 4: Divide and Sort ===");
        console.log(divideSortTask.divideAndSort(5956560159466056));
        
        console.log("\n=== Task 5: File CRUD ===");
        const dataDir = initDataDir(path.join(__dirname, 'data'));

        await createFile(dataDir, 'test.txt', 'Hello World');
        const content = await readFile(dataDir, 'test.txt');
        console.log('File content:', content);
        await deleteFile(dataDir, 'test.txt');
    } catch(err) {
        console.error('Error:', err.message);
    }
}

runAllTasks();