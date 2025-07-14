const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Fungsi inisialisasi direktori data
function initDataDir(dataDir) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  return dataDir;
}

// Fungsi membuat file
function createFile(dataDir, filename, content) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(dataDir, filename);
    fs.writeFile(filePath, content, (err) => {
      if (err) reject(err);
      else resolve('File created successfully');
    });
  });
}

// Fungsi membaca file
function readFile(dataDir, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(dataDir, filename);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Fungsi mengupdate file
function updateFile(dataDir, filename, newContent) {
  return createFile(dataDir, filename, newContent);
}

// Fungsi menghapus file
function deleteFile(dataDir, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(dataDir, filename);
    fs.unlink(filePath, (err) => {
      if (err) reject(err);
      else resolve('File deleted successfully');
    });
  });
}

// Fungsi untuk menampilkan menu
function setupMenu(dataDir) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function showMenu() {
    console.log('\nFile CRUD Operations:');
    console.log('1. Create file');
    console.log('2. Read file');
    console.log('3. Update file');
    console.log('4. Delete file');
    console.log('5. Exit');

    rl.question('Choose option: ', handleMenuChoice);
  }

  async function handleMenuChoice(choice) {
    try {
      switch (choice) {
        case '1':
          await handleCreate();
          break;
        case '2':
          await handleRead();
          break;
        case '3':
          await handleUpdate();
          break;
        case '4':
          await handleDelete();
          break;
        case '5':
          rl.close();
          return;
        default:
          console.log('Invalid choice!');
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
    showMenu();
  }

  async function handleCreate() {
    const filename = await askQuestion('Enter filename: ');
    const content = await askQuestion('Enter content: ');
    const result = await createFile(dataDir, filename, content);
    console.log(result);
  }

  async function handleRead() {
    const filename = await askQuestion('Enter filename to read: ');
    const content = await readFile(dataDir, filename);
    console.log('\nFile content:');
    console.log(content);
  }

  async function handleUpdate() {
    const filename = await askQuestion('Enter filename to update: ');
    const content = await askQuestion('Enter new content: ');
    const result = await updateFile(dataDir, filename, content);
    console.log(result);
  }

  async function handleDelete() {
    const filename = await askQuestion('Enter filename to delete: ');
    const result = await deleteFile(dataDir, filename);
    console.log(result);
  }

  function askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(question, resolve);
    });
  }

  return {
    start: () => {
      console.log('File CRUD Application');
      showMenu();
      
      rl.on('close', () => {
        console.log('\nGoodbye!');
        process.exit(0);
      });
    }
  };
}

module.exports = {
  initDataDir,
  createFile,
  readFile,
  updateFile,
  deleteFile,
};