const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@nova.io', role: 'Admin', status: 'active' },
  { id: 2, name: 'Bob Smith', email: 'bob@nova.io', role: 'Manager', status: 'pending' },
  { id: 3, name: 'Carol Lee', email: 'carol@nova.io', role: 'Editor', status: 'inactive' },
  { id: 4, name: 'David Kim', email: 'david@nova.io', role: 'User', status: 'active' }
];

const userTableBody = document.getElementById('user-table-body');
const recentUsersBody = document.getElementById('recent-users-body');
const searchInput = document.getElementById('global-search');
const modal = document.getElementById('user-modal');
const modalTitle = document.getElementById('modal-title');
const userForm = document.getElementById('user-form');
const addUserBtn = document.getElementById('add-user-btn');
const closeModalBtn = document.getElementById('close-modal');
const cancelModalBtn = document.getElementById('cancel-modal');

let editingUserId = null;

function getStatusClass(status) {
  if (status === 'active') return 'success';
  if (status === 'pending') return 'pending';
  return 'danger';
}

function renderStatus(status) {
  const className = getStatusClass(status);
  return `<span class="status ${className}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>`;
}

function renderRecentUsers(filteredUsers = users) {
  const rows = filteredUsers.slice(0, 3).map((user) => `
    <tr>
      <td>${user.name}</td>
      <td>${user.role}</td>
      <td>${renderStatus(user.status)}</td>
      <td>
        <div class="action-row">
          <button class="btn btn-mini success" type="button" data-edit="${user.id}">Edit</button>
          <button class="btn btn-mini danger" type="button" data-delete="${user.id}">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');

  recentUsersBody.innerHTML = rows || '<tr><td colspan="4">No users found.</td></tr>';
}

function renderUsers(filteredUsers = users) {
  const rows = filteredUsers.map((user) => `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${renderStatus(user.status)}</td>
      <td>
        <div class="action-row">
          <button class="btn btn-mini success" type="button" data-edit="${user.id}">Edit</button>
          <button class="btn btn-mini danger" type="button" data-delete="${user.id}">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');

  userTableBody.innerHTML = rows || '<tr><td colspan="5">No users found.</td></tr>';
}

function renderAll() {
  const query = searchInput.value.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    const haystack = `${user.name} ${user.email} ${user.role} ${user.status}`.toLowerCase();
    return haystack.includes(query);
  });

  renderRecentUsers(filteredUsers);
  renderUsers(filteredUsers);
}

function openModal(mode, user = null) {
  editingUserId = user ? user.id : null;
  modalTitle.textContent = mode === 'edit' ? 'Edit user' : 'Add user';

  if (user) {
    document.getElementById('user-name').value = user.name;
    document.getElementById('user-email').value = user.email;
    document.getElementById('user-role').value = user.role;
    document.getElementById('user-status').value = user.status;
  } else {
    userForm.reset();
    document.getElementById('user-role').value = 'User';
    document.getElementById('user-status').value = 'active';
  }

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  editingUserId = null;
  userForm.reset();
}

function handleAddOrUpdateUser(event) {
  event.preventDefault();

  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();
  const role = document.getElementById('user-role').value;
  const status = document.getElementById('user-status').value;

  if (!name || !email) return;

  if (editingUserId !== null) {
    const user = users.find((item) => item.id === editingUserId);
    if (user) {
      user.name = name;
      user.email = email;
      user.role = role;
      user.status = status;
    }
  } else {
    const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    users.push({ id: newId, name, email, role, status });
  }

  renderAll();
  closeModal();
}

function handleDeleteUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index >= 0) {
    users.splice(index, 1);
    renderAll();
  }
}

searchInput.addEventListener('input', renderAll);
addUserBtn.addEventListener('click', () => openModal('add'));
closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);
userForm.addEventListener('submit', handleAddOrUpdateUser);

modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener('click', (event) => {
  const editButton = event.target.closest('[data-edit]');
  if (editButton) {
    const user = users.find((entry) => entry.id === Number(editButton.dataset.edit));
    if (user) openModal('edit', user);
  }

  const deleteButton = event.target.closest('[data-delete]');
  if (deleteButton) {
    handleDeleteUser(Number(deleteButton.dataset.delete));
  }
});

const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach((button) => {
  button.addEventListener('click', () => {
    navItems.forEach((item) => item.classList.remove('active'));
    pages.forEach((page) => page.classList.remove('active'));

    button.classList.add('active');
    const targetId = button.dataset.section;
    const targetPage = document.getElementById(targetId);
    if (targetPage) targetPage.classList.add('active');

    const title = targetId.charAt(0).toUpperCase() + targetId.slice(1);
    document.getElementById('page-title').textContent = title;
  });
});

renderAll();
