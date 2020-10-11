export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function deleteCookie(name) {
    var expiry = new Date();
    expiry.setTime(expiry.getTime() - 3600);
    document.cookie = name + "=; expires=" + expiry.toGMTString() + "; path=/"
}