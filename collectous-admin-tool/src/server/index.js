import * as publicUiFunctions from './ui';
import * as publicSheetFunctions from './sheets';
import * as publicRequestHandlerFunctions from './handler/request'
import * as publicUserFunctions from './user'
import * as publicDriveUtilFunctions from './drive-utils'
import * as publicDriveFunctions from './drive'


/* Expose public functions by attaching to `global`
   Note only functions can be retrieved at the client end: 
   https://developers.google.com/apps-script/guides/html/communication  */

/* Transferring some load from the server to the client, 
   given that there are limitations on server operations and google could put extra limitations.
   See limitations: https://developers.google.com/apps-script/guides/services/quotas#current_limitations */


global.doGet = publicUiFunctions.doGet;


global.getData = publicSheetFunctions.getData;
global.deleteRow = publicSheetFunctions.deleteRow;


global.injectTemplates = publicDriveFunctions.injectTemplates;


global.getLastModified = publicDriveFunctions.getLastModified;


global.getUserEmail = publicUserFunctions.getUserEmail;
global.isAdmin = publicUserFunctions.isAdmin;




