
	function getValue(aQueryString, aKey){
		if (aKey == null || aKey == ""){
			return "";
		}
		var keyIndex = aQueryString.indexOf(aKey + "=");
		if (keyIndex < 0){
			return "";
		}
		keyIndex += aKey.length;
		var separatorIndex = aQueryString.indexOf("&", (keyIndex + 1));
		if (separatorIndex < 0){
			return aQueryString.substring((keyIndex + 1), aQueryString.length);
		}else{
			return aQueryString.substring((keyIndex + 1), separatorIndex);
		}
	}
	function isStartsWith(src, compareString){
		if (src.indexOf(compareString) == 0){
			return true;
		}else{
			return false;
		}
	}
	function getEmptyForValue(aValue){
		if (aValue == null || aValue == ""){
			return "";
		}
		return aValue;
	}
	function isEmpty(aValue){
		if (aValue == null || aValue == ""){
			return true;
		}else{
			return false;
		}
	}
	function getUrlUpToSlashOrQuery(aValue){
		aValue = aValue.substring("http://".length, aValue.length);
		var domainIndex = aValue.indexOf(".");
		if (domainIndex >= 0){
			if (domainIndex == 0){
				if (aValue.length() > 1){
					aValue = aValue.substring(1, aValue.length);
				}else{
					return "";
				}
			}else{
				aValue = aValue.substring((domainIndex + 1), aValue.length);
			}
		}
		var slashIndex = aValue.indexOf("/");
		if (slashIndex >= 0){
			return aValue.substring(0, slashIndex);
		}
		else
		{
			var queryIndex = aValue.indexOf("?");
			if (queryIndex >= 0){
				return aValue.substring(0, queryIndex);
			}else{
				return aValue.substring(0, aValue.length);
			}
		}
	}
	var referer = document.referrer;
	var currUrl = location.href;
	var urlQuery = "";
	var queryTokenIndex = currUrl.indexOf("?");
	var searchEngineId = "";
	var searchEngineKeywords = "";
	if (queryTokenIndex >= 0 && (queryTokenIndex + 1) < currUrl.length){
		urlQuery = currUrl.substring(queryTokenIndex + 1);
	}
	if (referer == null || referer == ""){}
	else{
		var searchEngineId = "";
		var appendPaidString = "";
		if (currUrl.indexOf("CREF") >= 0 || currUrl.indexOf("cref") >= 0 || currUrl.indexOf("EADID") >= 0 || currUrl.indexOf("eadid") >= 0){
			appendPaidString = " - PAID";
		}
		if (isStartsWith(referer, "http://www.google.")) {
			searchEngineId = getUrlUpToSlashOrQuery(referer) + appendPaidString;
		}else if (isStartsWith(referer, "http://search.yahoo.")) {
			searchEngineId = getUrlUpToSlashOrQuery(referer) + appendPaidString;
		}
		else if (isStartsWith(referer, "http://search.msn.com/")) { searchEngineId = "msn"+appendPaidString; }
		else if (isStartsWith(referer, "http://search.aol.com/")) { searchEngineId = "aol"+appendPaidString; }
		else if (isStartsWith(referer, "http://www.ask.com/")) { searchEngineId = "ask.com"+appendPaidString; }
		else if (isStartsWith(referer, "http://cnet.search.com/")) { searchEngineId = "cnet"+appendPaidString; }
		else if (isStartsWith(referer, "http://search.netscape.com/")) { searchEngineId = "netscape"+appendPaidString; }
		else if (isStartsWith(referer, "http://mysearch.myway.com/")) { searchEngineId = "myway"+appendPaidString; }
		else if (isStartsWith(referer, "http://www.dogpile.com/info.dogpl/search/")) { searchEngineId = "dogpile"+appendPaidString; }
		else if (isStartsWith(referer, "http://www.overture.com/d/search/")) { searchEngineId = "overture"+appendPaidString; }
		else if (referer.indexOf("foo=info.dogpl") >= 0){ searchEngineId = "dogPile"+appendPaidString; }
		if (searchEngineId != "" && searchEngineId != appendPaidString){
			if (isStartsWith(searchEngineId, "localhost")){
				searchEngineKeywords = getValue(referer, "foo");
			}
			if (isStartsWith(searchEngineId, "mng")){
				searchEngineKeywords = getValue(referer, "foo");
			}
			if (isStartsWith(searchEngineId, "google")){
				searchEngineKeywords = getValue(referer, "q");
			}
			if (isStartsWith(searchEngineId, "yahoo"))
			{
				searchEngineKeywords = getValue(referer, "p");
			}
			if (searchEngineId == "msn"){	searchEngineKeywords = getValue(referer, "q");}
			else if (searchEngineId == "aol") { searchEngineKeywords = getValue(referer, "encquery"); }
			else if (searchEngineId == "ask.com") { searchEngineKeywords = getValue(referer, "q"); }
			else if (searchEngineId == "cnet") { searchEngineKeywords = getValue(referer, "q"); }
			else if (searchEngineId == "netscape") { searchEngineKeywords = getValue(referer, "query"); }
			else if (searchEngineId == "myway") { searchEngineKeywords = getValue(referer, "type"); }
			else if (searchEngineId == "dogPile") {
			keywordEndIndex = "http://www.dogpile.com/info.dogpl/search/web/".length;
			keywordSearchStringEndIndex = referer.indexOf("/", keywordEndIndex);
				if (keywordSearchStringEndIndex < 0){
					searchEngineKeywords = "";
				}else{
					searchEngineKeywords = referer.substring(keywordEndIndex, keywordSearchStringEndIndex);
				}
			}
			else if (searchEngineId == "overture") { searchEngineKeywords = getValue(referer, "Keywords"); }
			prop39CookieVal = "" + searchEngineId + " / " + getEmptyForValue(searchEngineKeywords);
			prop39CookieVal = prop39CookieVal.toLowerCase();
			s.prop39 =  prop39CookieVal + " / " + getEmptyForValue(s.pageName);
			setCookie("prop39", prop39CookieVal);
			prop41CookieVal = "" + searchEngineId;
			s.prop41 =  prop41CookieVal + " / " + getEmptyForValue(s.pageName);
			setCookie("prop41", prop41CookieVal);
		} else {
			prop39CookieVal = getCookie("prop39");
			if (getEmptyForValue(prop39CookieVal)!=""){
				s.prop39 =  prop39CookieVal + " / " + getEmptyForValue(s.pageName);
			}
			prop41CookieVal = getCookie("prop41");
			if (getEmptyForValue(prop41CookieVal)!=""){
				s.prop41 =  prop41CookieVal + " / " + getEmptyForValue(s.pageName);
			}
		}
	}