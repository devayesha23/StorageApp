let folders = {
    'root': []
};

let storageUsage = 0; // Track the user's storage usage
document.getElementById('uploadButton').addEventListener('click', (event) => {
    event.preventDefault();
    client.picker({
        accept: 'image/*',
        fromSources: ['local_file_system', 'url'],
        maxFiles: 5,
        onUploadDone: (res) => {
            res.filesUploaded.forEach(file => {
                displayFile(file);
            });
        }
    }).open();
});

function createSubFolder(parentFolder, subFolderName) {
    if (!folders[parentFolder]) {
        folders[parentFolder] = [];
    }
    folders[parentFolder].push(subFolderName);
    folders[subFolderName] = [];
    displayFolder(subFolderName);
}

document.getElementById('createFolderButton').addEventListener('click', () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
        createSubFolder(currentFolder, folderName);
    }
});

let currentFolder = 'root'; // Track the current folder being viewed

function openFolder(folderName) {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Clear the file list

    const backButton = document.createElement('a');
    backButton.href = '#';
    backButton.className = 'button backButton';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => {
        fileList.innerHTML = ''; // Clear the file list
        displayFolder('root');
    });
    fileList.appendChild(backButton);

    folders[folderName].forEach(item => {
        if (typeof item === 'string') {
            displayFolder(item);
        } else {
            displayFile(item);
        }
    });
}

function displayFolder(folderName, folderContent) {
    const fileList = document.getElementById('fileList');
    const folderItem = document.createElement('div');
    folderItem.className = 'folderItem';
    folderItem.textContent = folderName;
    folderItem.addEventListener('click', () => {
        openFolder(folderName);
    });
    fileList.appendChild(folderItem);

    folderContent.forEach(item => {
        if (typeof item === 'string') {
            displayFolder(item, folders[item]);
        } else {
            displayFile(item);
        }
    });
}
let files = JSON.parse(localStorage.getItem('files')) || [];

function saveFilesToStorage() {
    localStorage.setItem('files', JSON.stringify(files));
}

function displayFile(file) {
const fileList = document.getElementById('fileList');
const fileItem = document.createElement('div');
fileItem.className = 'fileItem';

if (file.mimetype.includes('image')) {
const img = document.createElement('img');
img.src = file.url;
fileItem.appendChild(img);
}

const fileName = document.createElement('p');
fileName.textContent = file.filename;
fileItem.appendChild(fileName);

const replaceButton = document.createElement('button');
replaceButton.textContent = 'Replace';
replaceButton.addEventListener('click', () => {
replaceFile(fileItem, file);
});
fileItem.appendChild(replaceButton);

const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.addEventListener('click', () => {
deleteFile(fileItem, file);
});
fileItem.appendChild(deleteButton);

const moveButton = document.createElement('button');
moveButton.textContent = 'Move to Folder';
moveButton.addEventListener('click', () => {
moveFileToFolder(fileItem, file);
});
fileItem.appendChild(moveButton);

if (!folders['root']) {
folders['root'] = [];
}
folders['root'].push(file);

}



function replaceFile(fileItem, file) {
    client.picker({
        accept: 'image/*',
        fromSources: ['local_file_system', 'url'],
        maxFiles: 1,
        onUploadDone: (res) => {
            res.filesUploaded.forEach(newFile => {
                fileItem.remove(); // Remove the old file item
                displayFile(newFile); // Display the new file item
            });
        }
    }).open();
}

function deleteFile(fileItem, file) {
    const confirmed = confirm('Are you sure you want to delete this file?');
    if (confirmed) {
        const index = folders['root'].indexOf(file);
        if (index !== -1) {
            folders['root'].splice(index, 1);
            saveFilesToStorage();
        }
        fileItem.remove(); // Remove the file from the file list

        // Update storage usage
        storageUsage -= file.size;
        updateStorageCounter();
    }
}

function moveFileToFolder(fileItem, file) {
    const folderName = prompt('Enter folder name to move to:');
    if (folderName && folders[folderName]) {
        const index = folders['root'].indexOf(file);
        if (index !== -1) {
            folders['root'].splice(index, 1);
        }
        folders[folderName].push(file);
        fileItem.remove(); // Remove the file from the file list
        saveFilesToStorage();
        // Update storage usage
        updateStorageCounter();
    }
}

function updateStorageCounter() {
    const storageTracker = document.getElementById('storageTracker');
    storageTracker.textContent = `Storage: ${(storageUsage / (1024 * 1024)).toFixed(2)} MB / 10 MB`;
}

function loadFilesFromStorage() {
files.forEach(file => {
displayFile(file);
});
}