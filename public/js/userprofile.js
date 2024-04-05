const addExperience = document.getElementById('addExperience');
const addExperienceModal = new bootstrap.Modal(addExperience, {});
const modalToggle = document.getElementById('toggleMyModal');

const employment = document.getElementById('employment');
const experience = document.getElementById('experience');
const experienceForm = document.getElementById('experienceForm');

function isValidExperienceForm() {
  if (!employment.value || !experience.value) {
    if (employment.value) employment.classList.remove('is-invalid');
    else employment.classList.add('is-invalid');

    if (experience.value) experience.classList.remove('is-invalid');
    else experience.classList.add('is-invalid');
    return false;
  }
  return true;
}

function clearExperience() {
  document.getElementById('employment_old').value = '';
  document.getElementById('experience_old').value = '';

  employment.value = '';
  experience.value = '';
}

// Experience
document
  .getElementById('xcloseexperience')
  .addEventListener('click', function (event) {
    clearExperience();
    addExperience.removeEventListener('hidden.bs.modal', onHiddenBsModal);
  });

document
  .getElementById('closeexperience')
  .addEventListener('click', function (event) {
    clearExperience();
    addExperience.removeEventListener('hidden.bs.modal', onHiddenBsModal);
  });

experienceForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (!isValidExperienceForm()) {
    console.log('Existe error!');

    addExperience.addEventListener('hidden.bs.modal', onHiddenBsModal);

    return false; // Evita que el modal se cierre automáticamente
  } else {
    experienceForm.submit();
    return true;
  }
});

addExperience.addEventListener('show.bs.modal', (event) => {
  if (event.relatedTarget.classList.contains('edit-eh-employment')) {
    employment.value = event.relatedTarget.getAttribute('data-employment');
    experience.value = event.relatedTarget.getAttribute('data-experience');
  }
});

function onHiddenBsModal(e) {
  if (!isValidExperienceForm()) {
    addExperienceModal.show(modalToggle);
    return false; // Evita que el modal se cierre automáticamente
  }
}
