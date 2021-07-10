export const FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";
export const SHEETS_MIME_TYPE = "application/vnd.google-apps.spreadsheet";


export function getFolders(rootFolder, condition, limit = 1) {
    var stack = [rootFolder]
    var result = []
    while ((stack.length !== 0) && (result.length < limit)){
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


export function getFiles(rootFolder, condition, limit = 1) {
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



export function copyContent(sourceFolder, targetFolder, isSourceUnderTarget = false) {
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




export function getCurrentScriptFile(){
    return DriveApp.getFileById(ScriptApp.getScriptId())
}

export function getParentFolder() {
    return getCurrentScriptFile().getParents().next();
}

export function getFileUnderParentFolder(fileName, parentFolder) {
    return parentFolder.searchFiles("title contains '" + fileName + "'").next();
}


export function getFolderUnderParentFolder(fileName, parentFolder) {
    return parentFolder.searchFolders("title contains '" + fileName + "'").next();
}