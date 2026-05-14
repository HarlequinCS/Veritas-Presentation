const slides = Array.from(document.querySelectorAll('.slide'));
const progress = document.getElementById('progress');
const notesPanel = document.getElementById('notes-panel');
const notesText = document.getElementById('notes-text');
const notesNum = document.getElementById('notes-slidenum');

let current = 0;
let notesVisible = false;

function syncPageNumbers() {
  slides.forEach((slide, index) => {
    const pageEl = slide.querySelector('.page');
    if (pageEl) {
      pageEl.textContent = `${String(index + 1).padStart(2, '0')} / ${slides.length}`;
    }
  });
}

function updateNotes() {
  const slide = slides[current];
  const noteEl = slide.querySelector('.notes-content');
  const script = noteEl ? noteEl.getAttribute('data-script') : '';

  notesText.textContent = script || 'No notes for this slide.';
  notesNum.textContent = `Slide ${current + 1} / ${slides.length}`;
}

function render() {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === current);
  });

  progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  updateNotes();
}

function next() {
  if (current < slides.length - 1) {
    current += 1;
    render();
  }
}

function prev() {
  if (current > 0) {
    current -= 1;
    render();
  }
}

function toggleNotes() {
  notesVisible = !notesVisible;
  notesPanel.classList.toggle('visible', notesVisible);
}

document.getElementById('next').addEventListener('click', next);
document.getElementById('prev').addEventListener('click', prev);
document.getElementById('notes-toggle').addEventListener('click', toggleNotes);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
    e.preventDefault();
    next();
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    e.preventDefault();
    prev();
  } else if (e.key === 'n' || e.key === 'N') {
    toggleNotes();
  } else if (e.key === 'f' || e.key === 'F') {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  } else if (e.key === 'Home') {
    current = 0;
    render();
  } else if (e.key === 'End') {
    current = slides.length - 1;
    render();
  }
});

syncPageNumbers();
render();
