const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const characterName = document.getElementById('characterName').value;
    localStorage.setItem('characterName', characterName);
    window.location.href = 'game.html';
});
