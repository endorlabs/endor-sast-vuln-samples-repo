const fs = require('fs');
const path = require('path');

// Simulating user input
const userInput = {
    fileName: '../sensitive_data.txt',
    dirName: '../../important_docs',
    content: 'This is some content',
    newFileName: 'renamed_file.txt',
    symLinkName: 'symlink_file',
    userId: 1000,
    groupId: 1000
};

// Function to create an unsafe path
function createUnsafePath(base, input) {
    return path.join(base, input);
}

// Using various fs functions with user input
function unsafeFileOperations() {
    const baseDir = '/tmp';
    const filePath = createUnsafePath(baseDir, userInput.fileName);
    const dirPath = createUnsafePath(baseDir, userInput.dirName);

    // Append to file
    // ruleid: js-non-literal-fs-filename
    fs.appendFile(filePath, userInput.content, (err) => {
        if (err) console.error('Error appending to file:', err);
    });

    // Append to file synchronously
    try {
        // ruleid: js-non-literal-fs-filename
        fs.appendFileSync(filePath, userInput.content);
    } catch (err) {
        console.error('Error appending to file synchronously:', err);
    }

    // Change file permissions
    // ruleid: js-non-literal-fs-filename
    fs.chmod(filePath, 0o666, (err) => {
        if (err) console.error('Error changing file permissions:', err);
    });

    // Change file permissions synchronously
    try {
        // ruleid: js-non-literal-fs-filename
        fs.chmodSync(filePath, 0o666);
    } catch (err) {
        console.error('Error changing file permissions synchronously:', err);
    }

    // Change file ownership
    // ruleid: js-non-literal-fs-filename
    fs.chown(filePath, userInput.userId, userInput.groupId, (err) => {
        if (err) console.error('Error changing file ownership:', err);
    });

    // Create read stream
    // ruleid: js-non-literal-fs-filename
    const readStream = fs.createReadStream(filePath);
    readStream.on('error', (err) => console.error('Read stream error:', err));

    // Create write stream
    // ruleid: js-non-literal-fs-filename
    const writeStream = fs.createWriteStream(filePath);
    writeStream.on('error', (err) => console.error('Write stream error:', err));

    // Check if file exists
    // ruleid: js-non-literal-fs-filename
    fs.exists(filePath, (exists) => {
        console.log('File exists:', exists);
    });

    // Create directory
    // ruleid: js-non-literal-fs-filename
    fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) console.error('Error creating directory:', err);
    });

    // Open file
    // ruleid: js-non-literal-fs-filename
    fs.open(filePath, 'r', (err, fd) => {
        if (err) {
            console.error('Error opening file:', err);
        } else {
            fs.close(fd, (err) => {
                if (err) console.error('Error closing file:', err);
            });
        }
    });

    // Read directory
    // ruleid: js-non-literal-fs-filename
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
        } else {
            console.log('Directory contents:', files);
        }
    });

    // Read file
    // ruleid: js-non-literal-fs-filename
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            console.log('File contents:', data);
        }
    });

    // Rename file
    const newFilePath = createUnsafePath(baseDir, userInput.newFileName);
    // ruleid: js-non-literal-fs-filename
    fs.rename(filePath, newFilePath, (err) => {
        if (err) console.error('Error renaming file:', err);
    });

    // Create symlink
    const symlinkPath = createUnsafePath(baseDir, userInput.symLinkName);
    // ruleid: js-non-literal-fs-filename
    fs.symlink(filePath, symlinkPath, (err) => {
        if (err) console.error('Error creating symlink:', err);
    });

    // Write to file
    // ruleid: js-non-literal-fs-filename
    fs.writeFile(filePath, userInput.content, (err) => {
        if (err) console.error('Error writing to file:', err);
    });

    // Watch file
    // ruleid: js-non-literal-fs-filename
    fs.watchFile(filePath, (curr, prev) => {
        console.log('File was modified');
    });
}

unsafeFileOperations();