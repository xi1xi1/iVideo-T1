// 侧边栏菜单点击效果
const menuItems = document.querySelectorAll('.sidebar-menu li');
menuItems.forEach(item => {
    item.addEventListener('click', function () {
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// 搜索功能
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        alert(`搜索: ${query}`);
    }
}

// 移动端搜索功能
const mobileSearchBtn = document.querySelector('.mobile-search-btn');
const mobileSearchPanel = document.getElementById('mobileSearchPanel');
const mobileSearchClose = document.querySelector('.mobile-search-close');
const mobileSearchInput = document.querySelector('.mobile-search-input');

mobileSearchBtn.addEventListener('click', function () {
    mobileSearchPanel.style.display = 'flex';
    mobileSearchInput.focus();
});

mobileSearchClose.addEventListener('click', function () {
    mobileSearchPanel.style.display = 'none';
});

mobileSearchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const query = mobileSearchInput.value.trim();
        if (query) {
            alert(`搜索: ${query}`);
            mobileSearchPanel.style.display = 'none';
        }
    }
});

function goPlayPage(title, duration, video, poster) {
    const url = `play.html?title=${encodeURIComponent(title)}&duration=${encodeURIComponent(duration)}&video=${encodeURIComponent(video)}&poster=${encodeURIComponent(poster)}`;
    window.location.href = url;
}

// 登录弹窗逻辑
const openLoginModal = document.getElementById('openLoginModal');
const loginModal = document.getElementById('loginModal');
const loginMask = document.getElementById('loginMask');
const closeLoginModal = document.getElementById('closeLoginModal');
const toggleLoginPassword = document.getElementById('toggleLoginPassword');
const loginPassword = document.getElementById('login-password');
if (openLoginModal && loginModal && loginMask && closeLoginModal && toggleLoginPassword && loginPassword) {
    openLoginModal.onclick = function () {
        loginModal.style.display = 'block';
        loginMask.style.display = 'block';
    };
    closeLoginModal.onclick = function () {
        loginModal.style.display = 'none';
        loginMask.style.display = 'none';
    };
    loginMask.onclick = closeLoginModal.onclick;
    toggleLoginPassword.onclick = function () {
        if (loginPassword.type === 'password') {
            loginPassword.type = 'text';
            toggleLoginPassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            loginPassword.type = 'password';
            toggleLoginPassword.innerHTML = '<i class="fas fa-eye"></i>';
        }
    };
    document.getElementById('loginForm').onsubmit = function (e) {
        e.preventDefault();
        if (loginPassword.value && document.getElementById('login-username').value) {
            alert('登录成功！');
            loginModal.style.display = 'none';
            loginMask.style.display = 'none';
        }
    };
}