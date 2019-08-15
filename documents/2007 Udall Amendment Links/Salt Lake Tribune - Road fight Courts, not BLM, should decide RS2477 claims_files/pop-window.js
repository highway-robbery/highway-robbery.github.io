
var PopWindow = null;
function PopWindowSettings(pth,scrollbars,resizable,width,height,number)
{
		var aw = screen.availWidth;
		var ah = screen.availHeight;
		var xPos = (aw/2) - width/2;
		var yPos = (ah/2) - height/2;
        var size = '';
        if(scrollbars) {
            size += 'scrollbars=yes,';
        }
        if(resizable) {
            size += 'resizable=yes,';
        }
		size += 'width=' + width + ',height=' + height + ',left=' + xPos + ',top=' + yPos;
		window.PopWindow = window.open(pth,number,size);
        window.PopWindow.name = number;
	window.PopWindow.focus();
}
function OpenNonModalWindow(pth,number,nada) {
    OpenWindow(pth,"non_modal");
}
function OpenWindow(pth,number) {
    var scrollbars = true;
    var resizable = true;
    var width = 750;
    var height = 500;
    PopWindowSettings(pth,scrollbars,resizable,width,height,number);
}
function OpenModalWindow(path,fieldToPopulate,populateFlag){
	strFeatures = "dialogWidth=700px;dialogHeight=500px;center=yes;help=no;status=no";
	result = window.showModalDialog(path, eval(fieldToPopulate+'.value'), strFeatures);
	if (result != null && result != "" && populateFlag == true){
		eval(fieldToPopulate + '.value = result');
	}
	window.event.cancelBubble = true;
	window.event.returnValue = false;
}