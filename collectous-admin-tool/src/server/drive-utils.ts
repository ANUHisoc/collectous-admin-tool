export const FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";
export const SHEETS_MIME_TYPE = "application/vnd.google-apps.spreadsheet";
import Folder = GoogleAppsScript.Drive.Folder;
import File = GoogleAppsScript.Drive.File;

export function getFolders(rootFolder:Folder, condition, limit = 1):Folder[] {
    var stack = [rootFolder]
    var result = []
    while ((stack.length !== 0) && (result.length < limit)) {
        var folderIterator = stack.pop().getFolders()
        while (folderIterator.hasNext()) {
            var folder = folderIterator.next()
            stack.push(folder)
            if (condition(folder)) {
                result.push(folder);
            }
        }
    }
    return result;
}


export function getFiles(rootFolder:Folder, condition, limit = 1):File[] {
    var stack = [rootFolder]
    var result = []
    while ((stack.length !== 0) && (result.length < limit)) {
        var folder = stack.pop()
        var fileIterator = folder.getFiles()
        while (fileIterator.hasNext()) {
            var file = fileIterator.next()
            if (condition(file)) {
                result.push(file)
            }
        }

        var folderIterator = folder.getFolders()
        while (folderIterator.hasNext()) {
            var folder = folderIterator.next()
            stack.push(folder)
        }
    }
    return result;
}



export function copyContent(sourceFolder:Folder, targetFolder:Folder, isSourceUnderTarget = false) {
    var sourceFolderStack = [sourceFolder]
    var currentTargetFolder = targetFolder
    var isRoot = true

    while (sourceFolderStack.length !== 0) {
        var currentSourceFolder = sourceFolderStack.pop()

        var folderIterator = currentSourceFolder.getFolders()
        while (folderIterator.hasNext()) {
            var folder = folderIterator.next()
            sourceFolderStack.push(folder)
        }

        if (isRoot) {
            isRoot = false;
            if (isSourceUnderTarget) {
                currentTargetFolder = currentTargetFolder.createFolder(currentSourceFolder.getName())
                continue;
            }
        }

        var fileIterator = currentSourceFolder.getFiles()
        while (fileIterator.hasNext()) {
            var file = fileIterator.next()
            file.makeCopy(file.getName(), currentTargetFolder)
        }
        currentTargetFolder = currentTargetFolder.createFolder(currentSourceFolder.getName())

    };
}


export function isDriveFolderTreeIdentical(sourceFolder:Folder, targetFolder:Folder):boolean {
    // TODO: Will be used to check if it is system compatible folder where the sourceFolder will be the template.
    return false;
}


export function getFolder(id: string) {
    return DriveApp.getFolderById(id)
}

export function getCurrentScriptFile():File {
    return DriveApp.getFileById(ScriptApp.getScriptId())
}

export function getParentFolder():Folder {
    return getCurrentScriptFile().getParents().next();
}

export function getFileUnderParentFolder(fileName:string, parentFolder:Folder):File {
    return parentFolder.searchFiles("title contains '" + fileName + "'").next();
}


export function getFolderUnderParentFolder(folderName:string, parentFolder:Folder):Folder {
    return parentFolder.searchFolders("title contains '" + folderName + "'").next();
}