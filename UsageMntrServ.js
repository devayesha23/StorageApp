if ((storageUsage + file.size) > (10 * 1024 * 1024)) {
    alert('Cannot upload file. Storage limit exceeded.');
    return;
    }
    
    fileList.appendChild(fileItem);
    files.push(file);
    
    // Save the files array to local storage
    saveFilesToStorage();
    
    // Update storage usage
    storageUsage += file.size;
    updateStorageCounter();
    
    // Alert when reaching 80% of the storage limit
    if ((storageUsage / (10 * 1024 * 1024)) >= 0.8) {
    alert('Warning: You have reached 80% of your storage limit.');
    }