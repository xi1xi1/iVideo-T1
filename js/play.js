// 获取URL参数
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        title: params.get('title') || '默认视频标题',
        duration: params.get('duration') || '00:00',
        video: params.get('video') || 'https://www.w3schools.com/html/movie.mp4',
        poster: params.get('poster') || 'https://picsum.photos/800/450?random=1'
    };
}

// 初始化页面
function initPage() {
    const params = getUrlParams();
    const video = document.getElementById('mainVideo');
    fallbackInit(params, video);
    generateRecommendations();
}

function fallbackInit(params, video) {
    document.getElementById('videoTitle').textContent = params.title;
    document.getElementById('uploadDate').textContent = new Date().toISOString().split('T')[0];
    video.src = params.video;
    video.poster = params.poster;

    const playCount = Math.floor(Math.random() * 100) + 10;
    const likeCount = Math.floor(playCount * 0.2);
    const favoriteCount = Math.floor(playCount * 0.1);
    const commentCount = Math.floor(playCount * 0.05);

    document.getElementById('playCount').textContent = `${playCount}万次播放`;
    document.getElementById('likeCount').textContent = `${likeCount}万`;
    document.getElementById('favoriteCount').textContent = `${favoriteCount}万`;
    document.getElementById('commentCount').textContent = commentCount;

    document.getElementById('videoDescription').innerHTML = `
        <p>这是关于"${params.title}"的详细描述。视频内容精彩，值得一看。</p>
        <p>视频时长: ${params.duration}</p>
    `;

    generateComments(commentCount);
}

// 生成评论
function generateComments(count) {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';

    const comments = [
        { author: '科技爱好者', text: '这个视频讲解得非常清晰，对内容有了更深入的理解。期待更多相关内容！', likes: 12000 },
        { author: '专业观众', text: '视频中提到的几个观点很有启发性，特别是实际应用部分，未来潜力巨大。', likes: 856 },
        { author: '学习达人', text: '讲解得很详细，适合初学者学习。希望能有更多这样的教学视频。', likes: 543 },
        { author: '行业专家', text: '从专业角度分析，这个视频的内容准确且深入，值得推荐。', likes: 321 }
    ];

    for (let i = 0; i < Math.min(count, comments.length); i++) {
        const comment = comments[i];
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="comment-avatar">${comment.author.charAt(0)}</div>
            <div class="comment-content">
                <div class="comment-author">${comment.author}</div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-actions">
                    <div class="comment-action"><i class="far fa-thumbs-up"></i> ${comment.likes}</div>
                    <div class="comment-action"><i class="far fa-thumbs-down"></i></div>
                    <div class="comment-action">回复</div>
                </div>
            </div>
        `;
        commentList.appendChild(commentElement);
    }
}


// 生成推荐视频
function generateRecommendations() {
    const recommendationList = document.getElementById('recommendationList');

    const recommendations = [
        { title: '科技前沿：量子计算的突破与应用前景', channel: '科技频道', views: '8.7万', img: 'https://picsum.photos/120/70?random=11' },
        { title: '区块链技术解析：从原理到实际应用', channel: '科技频道', views: '6.3万', img: 'https://picsum.photos/120/70?random=12' },
        { title: '5G技术深度解析：如何改变我们的未来', channel: '科技频道', views: '10.2万', img: 'https://picsum.photos/120/70?random=13' },
        { title: '虚拟现实技术发展：从游戏到医疗的应用', channel: '科技频道', views: '5.8万', img: 'https://picsum.photos/120/70?random=14' }
    ];

    recommendations.forEach(rec => {
        const recElement = document.createElement('div');
        recElement.className = 'recommendation-item';
        recElement.onclick = () => changeVideo(rec.title, '10:00');
        recElement.innerHTML = `
            <div class="rec-thumbnail">
                <img src="${rec.img}" alt="推荐视频">
            </div>
            <div class="rec-info">
                <div class="rec-title">${rec.title}</div>
                <div class="rec-meta">${rec.channel} • ${rec.views}次播放</div>
            </div>
        `;
        recommendationList.appendChild(recElement);
    });
}

// 切换视频功能
function changeVideo(title, duration) {
    // 加载新的视频
    const video = document.getElementById('mainVideo');

    // 重置播放器
    video.pause();
    video.currentTime = 0;

    // 更新视频信息
    document.getElementById('videoTitle').textContent = title;
    document.getElementById('playCount').textContent =
        `${Math.floor(Math.random() * 100) + 10}万次播放`;

    // 更新播放按钮
    document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play"></i>';

    // 重置进度条
    document.getElementById('progress').style.width = '0%';
    document.getElementById('timeDisplay').textContent = '00:00 / ' + duration;
}

// 返回首页
function goHome() {
    window.location.href = 'index.html';
}

// 视频播放器功能
document.addEventListener('DOMContentLoaded', function () {
    // 初始化页面
    initPage();

    // 点赞/点踩/收藏按钮变色逻辑
    const likeBtn = document.querySelector('.action-btn i.far.fa-thumbs-up')?.parentElement;
    const dislikeBtn = document.querySelector('.action-btn i.far.fa-thumbs-down')?.parentElement;
    const favoriteBtn = document.querySelector('.action-btn i.far.fa-star')?.parentElement;

    if (likeBtn && dislikeBtn && favoriteBtn) {
        likeBtn.addEventListener('click', function () {
            if (!likeBtn.classList.contains('active-like')) {
                likeBtn.classList.add('active-like');
                dislikeBtn.classList.remove('active-dislike');
            } else {
                likeBtn.classList.remove('active-like');
            }
        });
        dislikeBtn.addEventListener('click', function () {
            if (!dislikeBtn.classList.contains('active-dislike')) {
                dislikeBtn.classList.add('active-dislike');
                likeBtn.classList.remove('active-like');
            } else {
                dislikeBtn.classList.remove('active-dislike');
            }
        });
        favoriteBtn.addEventListener('click', function () {
            favoriteBtn.classList.toggle('active-favorite');
        });
    }

    // 获取DOM元素
    const video = document.getElementById('mainVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const timeDisplay = document.getElementById('timeDisplay');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeBar = document.getElementById('volumeBar');
    const volumeLevel = document.getElementById('volumeLevel');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    // 播放/暂停功能
    playPauseBtn.addEventListener('click', togglePlayPause);
    video.addEventListener('click', togglePlayPause);

    function togglePlayPause() {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    // 更新进度条
    video.addEventListener('timeupdate', updateProgress);

    function updateProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progress.style.width = `${percent}%`;

        // 更新时间显示
        const currentTime = formatTime(video.currentTime);
        const duration = formatTime(video.duration);
        timeDisplay.textContent = `${currentTime} / ${duration}`;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // 点击进度条跳转
    progressBar.addEventListener('click', seek);

    function seek(e) {
        const percent = e.offsetX / progressBar.offsetWidth;
        video.currentTime = percent * video.duration;
    }

    // 音量控制
    volumeBtn.addEventListener('click', toggleMute);
    volumeBar.addEventListener('click', changeVolume);

    function toggleMute() {
        video.muted = !video.muted;
        volumeBtn.innerHTML = video.muted ?
            '<i class="fas fa-volume-mute"></i>' :
            '<i class="fas fa-volume-up"></i>';
    }

    function changeVolume(e) {
        const percent = e.offsetX / volumeBar.offsetWidth;
        video.volume = percent;
        volumeLevel.style.width = `${percent * 100}%`;

        // 更新音量图标
        if (percent === 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (percent < 0.5) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }

    // 全屏功能
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    }

    // 视频结束时重置
    video.addEventListener('ended', function () {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        video.currentTime = 0;
    });

    // 初始化音量
    video.volume = 0.8;
    volumeLevel.style.width = '80%';

    // 评论提交功能
    const commentInput = document.querySelector('.comment-input');
    const commentSubmit = document.querySelector('.comment-submit');

    commentSubmit.addEventListener('click', addComment);
    commentInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addComment();
        }
    });

    function addComment() {
        const text = commentInput.value.trim();
        if (!text) return;
        const commentList = document.getElementById('commentList');
        const commentCount = document.getElementById('commentCount');
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="comment-avatar">用</div>
            <div class="comment-content">
                <div class="comment-author">用户</div>
                <div class="comment-text">${text}</div>
                <div class="comment-actions">
                    <div class="comment-action"><i class="far fa-thumbs-up"></i> 0</div>
                    <div class="comment-action"><i class="far fa-thumbs-down"></i></div>
                    <div class="comment-action">回复</div>
                </div>
            </div>
        `;
        commentList.insertBefore(commentElement, commentList.firstChild);
        commentCount.textContent = parseInt(commentCount.textContent) + 1;
        commentInput.value = '';
    }
});