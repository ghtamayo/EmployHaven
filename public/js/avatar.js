const avatar = document.getElementById('avatar');

if (avatar) {
  avatar.style.opacity = 0;

  avatar.addEventListener('change', function () {
    let fileInput = this;
    let bLogo = document.getElementById('avatarimg');
    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        bLogo.src = e.target.result;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  });
}
