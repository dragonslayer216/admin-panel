let lastDeletedUserId = null;

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        if (e.key === 'd' || e.key === 'D') {
            e.preventDefault();
            navigateToPage('dashboard');
        } else if (e.key === 'u' || e.key === 'U') {
            e.preventDefault();
            navigateToPage('users');
        } else if (e.key === 's' || e.key === 'S') {
            e.preventDefault();
            navigateToPage('settings');
        } else if (e.key === 'h' || e.key === 'H') {
            e.preventDefault();
            navigateToPage('help');
        }
    } else if (e.key === 'Escape') {
        e.preventDefault();
        closeUserModal();
    } else if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        const form = document.getElementById('user-form');
        if (userModal.style.display === 'block') {
            form.dispatchEvent(new Event('submit'));
        }
    } else if (e.ctrlKey && (e.key === 'n' || e.key === 'N')) {
        const currentPage = document.querySelector('.page:not(.hidden)');
        if (currentPage && currentPage.id === 'users') {
            e.preventDefault();
            openAddUserModal();
        }
    } else if (e.key === 'Delete') {
        if (lastDeletedUserId !== null) {
            e.preventDefault();
            deleteUser(lastDeletedUserId);
        }
    }
});

function navigateToPage(page) {
    const link = document.querySelector(`[data-page="${page}"]`);
    if (link) {
        link.click();
    }
}

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.dataset.page;
        
        if (page === 'logout') {
            alert('Logging out...');
            return;
        }

        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        document.getElementById(page).classList.remove('hidden');
        
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');

        const pageTitle = page.charAt(0).toUpperCase() + page.slice(1);
        document.getElementById('page-title').textContent = pageTitle;
    });
});

// User Modal
const userModal = document.getElementById('userModal');

function openAddUserModal() {
    document.getElementById('modal-title').textContent = 'Add User';
    document.getElementById('user-form').reset();
    userModal.style.display = 'block';
}

function editUser(id) {
    document.getElementById('modal-title').textContent = 'Edit User';
    lastDeletedUserId = id;
    userModal.style.display = 'block';
}

function closeUserModal() {
    userModal.style.display = 'none';
}

function deleteUser(id) {
    lastDeletedUserId = id;
    if (confirm('Are you sure you want to delete this user?')) {
        alert('User ID ' + id + ' deleted!');
    }
}

document.getElementById('user-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    alert('User saved: ' + name + ' (' + email + ')');
    closeUserModal();
});

window.onclick = (event) => {
    if (event.target === userModal) {
        closeUserModal();
    }
};

// Track user hover for Delete key functionality
document.addEventListener('mouseover', (e) => {
    const row = e.target.closest('tr');
    if (row && row.querySelector('.btn-danger')) {
        const deleteBtn = row.querySelector('.btn-danger');
        const userId = deleteBtn.getAttribute('onclick').match(/\d+/)[0];
        lastDeletedUserId = parseInt(userId);
    }
});