var now = new Date();

var jvSeed = Math.random() * now.valueOf() * 100000;

jvSeed = jvSeed.toString().substr(0, 15);

var jvPURL = '';

var defaultPath = '';

var BottomInclude = '';

var strInterstitial = '';



function GetAd(TheTile, ThePosition, ThePath, TheKeyword, TheSiteUrl, TheInterstitial, TheWidth, TheHeight) {

    if (ThePath == '') {

        ThePath = defaultPath;

    }

	ThePath = TheSiteUrl + ThePath;

	

	// This will hard code the embedded ad position (position = 'box') to width=300 and height=250.

	// This was requested by John Jenks on 3/27/2007, and should apply across the entire network.

	// The change was made by JGC on 3/30/2007.

	if (ThePosition == 'box') {

		TheWidth = '300';

		TheHeight = '250';

	}

    

    if((TheWidth=='null' && TheHeight=='null')||(TheWidth=='' && TheHeight=='')){

        document.write('<SCR'+'IPT type="text/javascript" language="JavaScript1.1" SRC="http://ad.doubleclick.net/adj/'+ThePath+';abr=!webtv;kw='+TheKeyword+';pos='+ThePosition+TheInterstitial+';'+TheTile+'='+(ThePosition-(-1))+';ord='+jvSeed+'?"></SCR'+'IPT>');

	    if ((!document.images && navigator.userAgent.indexOf('Mozilla/2.') >= 0)  || navigator.userAgent.indexOf("WebTV")>= 0) {

	        document.write('<A HREF="http://ad.doubleclick.net/jump/'+ThePath+';kw='+TheKeyword+';pos='+ThePosition+';'+TheTile+'='+(ThePosition-(-1))+';ord='+jvSeed+'?">');

	        document.write('<IMG SRC="http://ad.doubleclick.net/ad/'+ThePath+';kw='+TheKeyword+';pos='+ThePosition+';'+TheTile+'='+(ThePosition-(-1))+';ord='+jvSeed+'?" border="0"></A>');

	    }

	 }else{

        document.write('<SCR'+'IPT type="text/javascript" language="JavaScript1.1" SRC="http://ad.doubleclick.net/adj/'+ThePath+';abr=!webtv;kw='+TheKeyword+';pos='+ThePosition+TheInterstitial+';sz='+TheWidth+'x'+TheHeight+';'+TheTile+'='+(ThePosition-(-1))+';ord='+jvSeed+'?"></SCR'+'IPT>');

			if ((!document.images && navigator.userAgent.indexOf('Mozilla/2.') >= 0)  || navigator.userAgent.indexOf("WebTV")>= 0) {

		  	document.write('<A HREF="http://ad.doubleclick.net/jump/'+ThePath+';kw='+TheKeyword+';pos='+ThePosition+';sz='+TheWidth+'x'+TheHeight +';'+TheTile+'='+(ThePosition-(-1))+';ord='+jvSeed+'?">');

		    document.write('<IMG SRC="http://ad.doubleclick.net/ad/'+ThePath+';kw='+TheKeyword+';pos='+ThePosition+';sz='+TheWidth+'x'+TheHeight +';'+TheTile+'='+(ThePosition-(-1))+';ord='+jvSeed+'?" border="0"></A>');

    	}

	}

}