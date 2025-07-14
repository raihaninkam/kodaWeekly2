const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

function showMenu () {
    console.log("\n===== Welcome to CRUD File Operations =====");
    console.log("1. Create File");
    console.log("2. Read File");
    console.log("3. Update File");
    console.log("4. Delete File");
    console.log("5. Exit");

    rl.question("Pilih salah satu Program dibawah ini:", (answer) => {
        switch (answer) {
            case '1':
                createFile();
                break;
            case '2':
                readFile();    
                break;
            case '3':
                updateFile();
                break;
            case '4':
                deleteFile();
                break;
            case '5':
                rl.close();
                break;        
            default:
                console.log("Error: Invalid Input!");
                showMenu()
        }
    })
};

function readFile() {
  rl.question('Enter filename to read: ', (filename) => {
    const filePath = path.join(dataDir, filename);
    
    if (!fs.existsSync(filePath)) {
      console.log('File not found!');
      return showMenu();
    }
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
      } else {
        console.log('\nFile content:');
        console.log(data);
      }
      showMenu();
    });
  });
}

function createFile () {
    rl.question("Enter a filename:", (fileName) => {
        const filePath = path.join(dataDir, fileName)

        if (fs.existsSync(filePath)) {
            console.log("This File already exist.")
            return showMenu();
        }

        rl.question("Enter file content:", (content) => {
            fs.writeFile(filePath, content, (err) => {

          
            if (err) {
                console.log("Error creating File", err);
            } else {
                console.log("Create File Successfully");
            }
            showMenu();
      });
    });
  });
}

function updateFile() {
  rl.question('Enter filename to update: ', (filename) => {
    const filePath = path.join(dataDir, filename);
    
    if (!fs.existsSync(filePath)) {
      console.log('File not found!');
      return showMenu();
    }
    
    rl.question('Enter new content: ', (newContent) => {
      fs.writeFile(filePath, newContent, (err) => {
        if (err) {
          console.error('Error updating file:', err);
        } else {
          console.log('File updated successfully!');
        }
        showMenu();
      });
    });
  });
}

function deleteFile () {
    rl.question("Masukkan nama File yang ingin di Delete:", (fileName) => {
         const filePath = path.join(dataDir,  fileName);

        if (!fs.existsSync(filePath)){
            console.log("Data File tidak ditemukan!");
            return showMenu();
          }
    

     fs.unlink((filePath), (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully!');
      }
      showMenu();
    });
})}


module.exports = {
  showMenu,
  createFile,
  readFile,
  updateFile,
  deleteFile
};