function getCookieValue(cookieName) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const [name, value] = cookies[i].split('=');
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return '';
}

var currentUser = getCookieValue('currentUser');
console.log(currentUser); // Valor de la cookie 'miCookie'
