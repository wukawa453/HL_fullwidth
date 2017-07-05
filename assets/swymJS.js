var swymJSObject = {
    swym_shopify_JS: "//swymprod.azureedge.net/code/swym-shopify.js",
    pid: "jrQG0Eb+hvHFPUJlHMzYY1b+ZvOx1ILi51NdlD9410M=",
    isTest: false,
    interface: "/apps/swymWishlist/interfaces/interfaceStore.php?appname=Wishlist",
    actions: {
        cartRequest: "cart",
        customerRequest: "customer"
    },
    shopid: "2339",
    customerCookieName: "swymCustomerAPI"
};
function swym_SetCookie(cookieName, cookieValue, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + "; " + expires;
}
function swym_getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function swym_get_cookies_array() {
    var cookies = {};
    if (document.cookie && document.cookie != '') {
        var split = document.cookie.split(';');
        for (var i = 0; i < split.length; i++) {
            try{
              var name_value = split[i].split("=");
              name_value[0] = name_value[0].replace(/^ /, '');
              cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
            }catch(err){
              console.warn("Error decoding cookie", split[i]);
            }
        }
    }
    return cookies;
}
function swymLoadScript(url, callback) {

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.body.appendChild(script);
}


if (swymJSObject.isTest) {

} else {
    if(document.readyState == "loading"){
      document.addEventListener('DOMContentLoaded', swymJSShopifyLoad);
    }else{
      swymJSShopifyLoad();
    }
    function swymJSShopifyLoad(){
      if(window.swymPageLoad) swymPageLoad();
      if(!window._swat) {
        var scripts = "(function (s, w, r, e, l, a, y) {"
                + "r['SwymRetailerConfig'] = s;"
                + "r[s] = r[s] || function (k, v) {"
                + "r[s][k] = v;"
                + "};"
                + "})('_swrc', '', window);"
                + "_swrc('RetailerId', '" + swymJSObject.pid + "');";
        var script = document.createElement("script");
    // Add script content
        script.innerHTML = scripts;
    // Append
        document.body.appendChild(script);
        swymLoadScript(swymJSObject.swym_shopify_JS,
          function() {
            var sw = window._swat;
            if(!sw){
              console.log("sw not initialized!");
              _swrc('Callback', function(){
                sw = window._swat;
                initSwymShopify();
              });
            }else{
              initSwymShopify();
            }
          });
      }else{
        initSwymShopify();
      }
    }
}
