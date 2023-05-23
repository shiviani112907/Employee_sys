const textarea = document.querySelector('textarea[name="newReview"]');

textarea.addEventListener('focus', () => {
  textarea.selectionStart = 0;
});