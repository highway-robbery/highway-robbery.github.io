
function omniObj(){
	this.COOKIE_NAME = 'u';
	this.load = loadValues;
	this.save = saveValues;
	this.get  = getValue;
	this.set = setValue;
	this.alertValues = alertValues;
	this.update = updateValues;
	function loadValues(){
		var cookieValue;
		cookieValue = getCookie(this.COOKIE_NAME);
		var valueArray = cookieValue.split(";");
		for (var i=0; i<valueArray.length;i++){
			var elementArray = valueArray[i].split("=");
			try{
				eval("this." + elementArray[0] + "='" + elementArray[1] + "'");
			}catch(err){
			}finally{
			}
		}
	}
	function getValue(key){
		var value = eval("this."+key);
		if(typeof(value)=="undefined"){
		value='';
		}
		return value;
	}
	function setValue(key, value){
		eval("this." + key + "='" + value + "'");
	}
	function saveValues(){
		var cookieValue;
		cookieValue='';
		for (sProperty in this) {
        	if ( typeof(this[sProperty]) != "function"){
				cookieValue += sProperty + "=" + this[sProperty]+";";
			}
      	}
		setCookie(this.COOKIE_NAME, cookieValue, 365*10, '/', null, null);
	}
	function alertValues(){
		var v;
		v='';
		for (sProperty in this) {
        	if ( typeof(this[sProperty]) != "function"){
				v += sProperty + "=" + this[sProperty]+";\n";
			}
      	}
	  	alert(v);
	}
	function updateValues(){
		if (this.userId != getUserID()){
			this.userIdChange = true;
		}else{
			this.userIdChange = false;
		}
		this.userId = getUserID();
		if (window.location.href.indexOf("rPage=thankyou") != -1){
			this.conPage = true;
		}else{
			this.conPage = false;
		}
		if (window.location.href.indexOf("rPage=activated") != -1){
			this.aaPage = true;
		}else{
			this.aaPage = false;
		}
		if ((document.referrer.indexOf("autoLogin.jsp") != -1 || document.referrer.indexOf("rPage=login") != -1) && (typeof(MNGiRegistrationLoginStatus) != "undefined") && (MNGiRegistrationLoginStatus == "in")){
			this.loginConPage = true;
		}else{
			this.loginConPage = false;
		}
		if (this.conPage){
			this.rType = "NEWS";
		}
		if (getCookie('fPage')==''){
			this.fPage=true;
			setCookie('fPage','true', null, '/');
		}else{
			this.fPage=false;
			setCookie('fPage','false', null, '/');
		}
		var cookieExists = getCookie(this.COOKIE_NAME);
		if (this.fPage){
			if (cookieExists==''){
				this.fVisit=true;
			}else{
				this.fVisit=false;
			}
		}
		if (this.fVisit){
			this.vType = '1';
		}else{
			this.vType = '2';
		}
		if ((typeof(MNGiRegistrationLoginStatus) != "undefined") && (MNGiRegistrationLoginStatus == "in")){
			this.vType = '4+' + this.rType;
		}else{
			if ((this.userId).indexOf('R:') != -1) {
				this.vType = '3+' + this.rType;
			}
		}
		var date = new Date();
		var registrationWindow = 72*60*60*1000;
		var visitWindow = 30*24*60*60*1000;
		if (this.fPage){
			if (this.lVisit){
				this.lVisit = this.cVisit;
			}else{
				this.lVisit = date.getTime();
			}
			this.cVisit = date.getTime();
		}
		if (this.conPage){
			this.rDate = date.getTime();
		}
		if (this.aaPage){
			this.aaDate = date.getTime();
		}
		if (this.rDate){
			if (this.aaDate){
				if (parseInt(this.cVisit) < (parseInt(this.lVisit) + visitWindow)){
					this.status = "Active"
				}else{
					this.status = "Inactive"
				}
			}else{
				if (parseInt(this.cVisit) < (parseInt(this.rDate) + registrationWindow)){
					this.status = "New"
				}else{
					this.status = "Old"
				}
			}
		}
		if (this.conPage){
			var voluntary = true
			if (voluntary){
				this.initRegType = 'Voluntary'
			}else{
				this.initRegType = 'Premium'
			}
		}
		if (this.conPage){
			if (window.location.href.indexOf("print=true") != -1){
				this.pSub = 'Yes'
			}else{
				this.pSub = 'No'
			}
		}
		if (typeof(this.rDate) != "undefined"){
			this.regStatus = this.status + ":" + this.initRegType + ":" + this.pSub
		}
	}
}