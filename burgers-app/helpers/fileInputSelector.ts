// Get references to the button, file input, and file name elements
const fileButton: HTMLButtonElement = document.querySelector('.file-button') as HTMLButtonElement;
const fileInput: HTMLInputElement = document.getElementById('file-input') as HTMLInputElement;
const fileNameElement: HTMLParagraphElement = document.getElementById('file-name') as HTMLParagraphElement;

// Add event listener to the custom button to trigger file input click
fileButton.addEventListener('click', () => {
  fileInput.click();
});

// Add event listener to update the file name text when a file is chosen
fileInput.addEventListener('change', () => {
  const fileName: string = fileInput.files && fileInput.files.length > 0 ? fileInput.files[0].name : 'No file chosen';
  fileNameElement.textContent = fileName;
});
