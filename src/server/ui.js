export const doGet = () => {
  var output = HtmlService.createHtmlOutputFromFile('index');
  output.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
return output;
};

