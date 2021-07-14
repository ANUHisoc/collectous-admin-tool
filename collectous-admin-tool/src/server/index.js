import * as publicUiFunctions from './ui';
import * as publicSheetFunctions from './sheets';
import * as publicRequestHandlerFunctions from './handler/request'
import * as publicUserFunctions from './user'
import * as publicDriveUtilFunctions from './drive-utils'
import * as publicDriveFunctions from './drive'


/* Expose public functions by attaching to `global`
   Note only functions can be retrieved at the client end: 
   https://developers.google.com/apps-script/guides/html/communication
*/

/*TODO: Make use of custom responseStatus type for better error identification and communication.*/
global.doGet = publicUiFunctions.doGet;


global.getData = publicSheetFunctions.getData;


global.injectTemplates = publicDriveFunctions.injectTemplates;


global.getLastModified = publicDriveFunctions.getLastModified;


global.getUserEmail = publicUserFunctions.getUserEmail;
global.isAdmin = publicUserFunctions.isAdmin;




