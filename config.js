<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Profile — Insight</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

  <style>
    :root {
      --primary:      #8A4FF7;
      --bg:           #ffffff;
      --surface:      #f7f7f7;
      --border:       #f0f0f0;
      --text:         #1a1a1a;
      --text-2:       #555;
      --text-muted:   #aaa;
      --topbar-h:     46px;
      --pad:          15px;
    }

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    html, body {
      font-family: 'Poppins', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      overflow-x: hidden;
    }

    .hidden { display: none !important; }

    @keyframes spin { to { transform: rotate(360deg); } }

    /* ══════════════════════════════════════
       TOP BAR
    ══════════════════════════════════════ */
    .topbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: var(--topbar-h);
      background: #fff;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .topbar-inner {
      width: 100%; max-width: 420px;
      padding: 0 12px;
      display: flex; align-items: center;
      justify-content: space-between;
    }

    .icon-btn {
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      background: none; border: none; border-radius: 50%;
      cursor: pointer; color: var(--text);
      transition: background .15s;
      -webkit-tap-highlight-color: transparent;
    }
    .icon-btn:hover { background: var(--surface); }

    .topbar-right { display: flex; align-items: center; gap: 2px; }

    .more-wrap { position: relative; }

    .dropdown {
      position: absolute; right: 0; top: calc(100% + 4px);
      background: #fff; border-radius: 14px;
      box-shadow: 0 6px 24px rgba(0,0,0,0.13);
      min-width: 155px; padding: 6px; z-index: 300;
      animation: fadeDown .15s ease;
    }
    @keyframes fadeDown {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .dropdown-item {
      display: flex; align-items: center; gap: 10px;
      width: 100%; padding: 10px 12px;
      border: none; background: none; cursor: pointer;
      border-radius: 10px;
      font-size: 14px; font-family: 'Poppins', sans-serif;
      font-weight: 500; color: #e63950;
      transition: background .15s; white-space: nowrap;
    }
    .dropdown-item:hover { background: #fff5f5; }

    /* ══════════════════════════════════════
       MAIN
    ══════════════════════════════════════ */
    .main {
      padding-top: var(--topbar-h);
      display: flex; flex-direction: column; align-items: center;
    }

    .page-body {
      width: 100%; max-width: 420px;
      padding: 0 var(--pad);
    }

    .cover-wrap {
      margin: 0 calc(-1 * var(--pad));
      position: relative;
    }

    .cover-photo {
      width: 100%;
      height: 145px;
      border-radius: 10px;
      background: #d9d9d9;
      overflow: hidden;
    }

    .cover-photo img {
      width: 100%; height: 100%;
      object-fit: cover; display: block;
    }

    .profile-section {
      margin-top: -50px;
      padding: 0 4px 20px;
      position: relative;
      z-index: 10;
    }

    .profile-pic {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 3px solid #ffffff;
      background: #e0e0e0;
      overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 10px;
    }

    .profile-pic img {
      width: 100%; height: 100%; object-fit: cover; display: block;
    }

    .default-avatar { color: #b8b8b8; }

    .profile-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
      opacity: 0;
      transition: opacity 0.22s ease;
    }
    .profile-info.loaded { opacity: 1; }

    .profile-name {
      font-size: 17px;
      font-weight: 600;
      color: var(--text);
      line-height: 1.3;
      margin-bottom: 2px;
    }

    .profile-username {
      font-size: 13.5px;
      font-weight: 400;
      color: var(--text-muted);
      margin-bottom: 8px;
    }

    .profile-bio {
      font-size: 11.5px;
      font-weight: 400;
      line-height: 1.5;
      color: var(--text-2);
      white-space: pre-wrap;
      word-break: keep-all;
      overflow-wrap: break-word;
      max-width: 27ch;
      margin-bottom: 8px;
    }

    .profile-address {
      display: flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 500; color: #6b6b6b;
      margin-bottom: 3px;
    }
    .profile-address svg { flex-shrink: 0; }

    .profile-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 14px;
    }

    .btn-edit,
    .btn-share {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      height: 30.5px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      font-family: 'Poppins', sans-serif;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .btn-edit {
      width: 171.5px;
      background: #1a1a1a;
      border: none;
      color: #fff;
      transition: opacity .15s, transform .15s;
    }
    .btn-edit:hover { opacity: .88; transform: translateY(-1px); }

    .btn-share {
      width: 154.5px;
      background: #fff;
      border: 1.5px solid #e0e0e0;
      color: var(--text);
      transition: background .15s;
    }
    .btn-share:hover { background: var(--surface); }

    .btn-share img {
      width: 16px;
      height: 16px;
      object-fit: contain;
    }

    .btn-add-friend,
    .btn-follow,
    .btn-friend-state {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      height: 30.5px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      font-family: 'Poppins', sans-serif;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      width: 171.5px;
      border: none;
      transition: opacity .15s, transform .15s;
    }

    .btn-add-friend {
      background: var(--primary);
      color: #fff;
    }
    .btn-add-friend:hover { opacity: .88; transform: translateY(-1px); }

    .btn-follow {
      background: #1a1a1a;
      color: #fff;
    }
    .btn-follow:hover { opacity: .88; transform: translateY(-1px); }

    .btn-friend-state {
      background: #f0f0f0;
      color: #1a1a1a;
    }
    .btn-friend-state.accept {
      background: #22c55e;
      color: #fff;
    }
    .btn-friend-state:hover { opacity: .88; }

    /* ══════════════════════════════════════
       VISITOR OPTIONS BOTTOM SHEET
    ══════════════════════════════════════ */
    .vsheet-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.45);
      z-index: 700;
      display: flex; align-items: flex-end; justify-content: center;
    }

    .vsheet {
      background: #fff;
      width: 100%; max-width: 420px;
      border-radius: 22px 22px 0 0;
      padding: 6px 16px 36px;
      display: flex; flex-direction: column;
      animation: slideUp .25s ease;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }

    .vsheet-handle {
      width: 36px; height: 4px;
      background: #e0e0e0; border-radius: 2px;
      margin: 8px auto 14px;
    }

    .vsheet-item {
      display: flex; align-items: center; gap: 14px;
      width: 100%; padding: 13px 6px;
      border: none; background: none; cursor: pointer;
      font-size: 14px; font-family: 'Poppins', sans-serif;
      font-weight: 500; color: #1a1a1a;
      border-bottom: 1px solid #f4f4f4;
      transition: background .12s;
      text-align: left;
    }
    .vsheet-item:last-child { border-bottom: none; }
    .vsheet-item:hover { background: #fafafa; border-radius: 10px; }
    .vsheet-item.danger { color: #e63950; }

    .vsheet-icon {
      width: 36px; height: 36px; border-radius: 50%;
      background: #f4f4f4;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .vsheet-item.danger .vsheet-icon { background: #fff0f2; }

    .vs-toast {
      position: fixed; bottom: 24px; left: 50%;
      transform: translateX(-50%) translateY(16px);
      background: #1a1a1a; color: #fff;
      padding: 10px 18px; border-radius: 10px;
      font-size: 12.5px; font-family: 'Poppins', sans-serif;
      font-weight: 500; opacity: 0; pointer-events: none;
      transition: opacity .22s ease, transform .22s ease;
      z-index: 900; white-space: nowrap;
      box-shadow: 0 4px 16px rgba(0,0,0,.22);
    }
    .vs-toast.show {
      opacity: 1; transform: translateX(-50%) translateY(0);
    }

    /* ══════════════════════════════════════
       HIGHLIGHTS ROW
    ══════════════════════════════════════ */
    .highlights-section {
      margin-top: 18px;
      padding-bottom: 4px;
    }

    .highlights-scroll {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 2px;
      scrollbar-width: none;
    }
    .highlights-scroll::-webkit-scrollbar { display: none; }

    .hl-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
      cursor: pointer;
    }

    .hl-media {
      width: 78px;
      height: 100px;
      border-radius: 14px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .hl-media img,
    .hl-media video {
      width: 100%; height: 100%;
      object-fit: cover; display: block;
    }

    .hl-new .hl-media {
      background: #f3f3f3;
      border: 1.5px dashed #ccc;
      color: #bbb;
    }

    .profile-header {
      display: flex;
      align-items: flex-end;
      gap: 16px;
      margin-bottom: 10px;
    }

    .profile-stats {
      flex: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-top: 54px;
      padding-bottom: 4px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .stat-count {
      font-size: 17px;
      font-weight: 550;
      color: var(--text);
      line-height: 1.2;
    }

    .stat-label {
      font-size: 11px;
      font-weight: 400;
      color: var(--text-muted);
    }

    .hl-title {
      font-size: 11px;
      font-weight: 500;
      color: var(--text-2);
      text-align: center;
      width: 78px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ══════════════════════════════════════
       HIGHLIGHT FULL-SCREEN VIEWER
    ══════════════════════════════════════ */
    .hl-viewer {
      position: fixed; inset: 0;
      background: #000;
      z-index: 600;
      display: flex; align-items: center; justify-content: center;
    }

    .hl-viewer-bar {
      position: absolute; top: 0; left: 0; right: 0;
      height: 56px;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 14px;
      background: linear-gradient(rgba(0,0,0,.55), transparent);
      z-index: 10;
    }

    .hl-vbtn {
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      background: none; border: none; cursor: pointer;
      color: #fff; border-radius: 50%;
    }

    .hl-more-wrap { position: relative; }

    .hl-viewer-dd {
      position: absolute; right: 0; top: calc(100% + 4px);
      background: #fff; border-radius: 12px;
      box-shadow: 0 6px 24px rgba(0,0,0,.22);
      min-width: 130px; padding: 6px; z-index: 20;
    }

    .hl-delete-btn {
      width: 100%; padding: 10px 12px;
      border: none; background: none; cursor: pointer;
      font-size: 14px; font-family: 'Poppins', sans-serif;
      font-weight: 500; color: #e63950;
      text-align: left; border-radius: 8px;
      display: flex; align-items: center; gap: 8px;
    }
    .hl-delete-btn:hover { background: #fff5f5; }

    .hl-viewer-media {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      padding: 56px 0 50px;
    }
    .hl-viewer-media img,
    .hl-viewer-media video {
      max-width: 100%; max-height: 100%;
      object-fit: contain;
    }

    .hl-viewer-title {
      position: absolute; bottom: 20px; left: 0; right: 0;
      text-align: center; color: #fff;
      font-size: 14px; font-weight: 600;
      text-shadow: 0 1px 6px rgba(0,0,0,.6);
    }

    /* ══════════════════════════════════════
       UPLOAD MODAL
    ══════════════════════════════════════ */
    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.45);
      z-index: 500;
      display: flex; align-items: flex-end; justify-content: center;
    }

    .modal-sheet {
      background: #fff;
      width: 100%; max-width: 420px;
      border-radius: 20px 20px 0 0;
      padding: 22px 20px 32px;
      display: flex; flex-direction: column; gap: 14px;
    }

    .modal-handle {
      width: 36px; height: 4px;
      background: #ddd; border-radius: 2px;
      margin: 0 auto 6px;
    }

    .modal-title {
      font-size: 15px; font-weight: 600; text-align: center;
    }

    .modal-preview {
      width: 100%; height: 180px;
      background: #f5f5f5; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; cursor: pointer; border: 2px dashed #ddd;
      color: var(--text-muted); font-size: 13px;
    }

    .modal-preview img,
    .modal-preview video {
      width: 100%; height: 100%; object-fit: cover;
    }

    .modal-input {
      width: 100%; padding: 11px 14px;
      border: 1.5px solid #e8e8e8; border-radius: 10px;
      font-size: 14px; font-family: 'Poppins', sans-serif;
      outline: none; color: var(--text);
    }

    .modal-input:focus {
      border-color: #8A4DFF;
      box-shadow: 0 0 0 3px rgba(138,77,255,.1);
    }

    .char-count {
      font-size: 11px; color: var(--text-muted);
      text-align: right; margin-top: -8px;
    }

    .modal-post-btn {
      width: 100%; padding: 13px;
      background: linear-gradient(to right, #6D3DF5, #8A4DFF, #A85CF6);
      border: none; border-radius: 10px;
      color: #fff; font-size: 15px; font-weight: 600;
      font-family: 'Poppins', sans-serif;
      cursor: pointer; position: relative;
      transition: opacity .2s;
    }
    .modal-post-btn:disabled { opacity: .6; cursor: not-allowed; }
    .modal-post-btn.loading { color: transparent; }
    .modal-post-btn.loading::after {
      content: ''; position: absolute; top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      width: 20px; height: 20px;
      border: 2.5px solid rgba(255,255,255,.3);
      border-top-color: #fff; border-radius: 50%;
      animation: spin .65s linear infinite;
    }
    @keyframes spin { to { transform: translate(-50%,-50%) rotate(360deg); } }

    .modal-cancel {
      background: none; border: none;
      font-size: 14px; color: var(--text-muted);
      font-family: 'Poppins', sans-serif;
      cursor: pointer; text-align: center;
    }

    /* ══════════════════════════════════════
       POSTS TAB BAR
    ══════════════════════════════════════ */
    .posts-tab-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      border-top: 1.5px solid var(--border);
      margin: 0 calc(-1 * var(--pad));
      padding-top: 4px;
      margin-top: 6px;
    }

    .posts-tab-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      padding: 12px 0 10px;
      border: none;
      background: none;
      color: var(--text-muted);
      cursor: pointer;
      border-bottom: 2.5px solid transparent;
      margin-bottom: -1.5px;
      transition: color .15s, border-color .15s;
      -webkit-tap-highlight-color: transparent;
    }

    .posts-tab-btn.active {
      color: var(--text);
      border-bottom-color: var(--text);
    }

    .posts-tab-btn svg { flex-shrink: 0; }

    /* ══════════════════════════════════════
       GRID VIEWS
    ══════════════════════════════════════ */
    .grid-view {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2px;
      padding: 2px 0 80px;
    }

    .grid-cell {
      position: relative;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      cursor: pointer;
      background: #ececec;
    }

    .grid-cell img,
    .grid-cell video {
      width: 100%; height: 100%;
      object-fit: cover; display: block;
    }

    .grid-cell.text-only {
      background: #fafafa;
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }
    .grid-cell.text-only p {
      font-size: 11px;
      line-height: 1.5;
      color: var(--text-2);
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-align: center;
      word-break: break-word;
    }

    .grid-cell .reel-badge {
      position: absolute; top: 6px; right: 6px;
      color: #fff; filter: drop-shadow(0 1px 3px rgba(0,0,0,.5));
    }

    .grid-empty {
      grid-column: 1 / -1;
      display: flex; flex-direction: column;
      align-items: center; gap: 10px;
      padding: 48px 20px;
      color: var(--text-muted);
    }
    .grid-empty svg { opacity: .35; }
    .grid-empty p { font-size: 13px; font-weight: 500; text-align: center; }

    /* ══════════════════════════════════════
       FULLSCREEN MEDIA VIEWER
    ══════════════════════════════════════ */
    .media-viewer {
      position: fixed; inset: 0;
      background: #000;
      z-index: 650;
    }

    .media-viewer-bar {
      position: absolute; top: 0; left: 0; right: 0;
      height: 56px;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 14px;
      background: linear-gradient(rgba(0,0,0,.55), transparent);
      z-index: 10;
    }

    .media-viewer-scroll {
      display: flex;
      width: 100%; height: 100%;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }
    .media-viewer-scroll::-webkit-scrollbar { display: none; }

    .mv-item {
      flex: 0 0 100%;
      scroll-snap-align: center;
      display: flex; align-items: center; justify-content: center;
      padding: 56px 0;
    }
    .mv-item img,
    .mv-item video {
      max-width: 100%; max-height: 100%;
      object-fit: contain;
    }

    .posts-list { display: none; }
  </style>
</head>
<body>

  <div id="app">

    <!-- Top Navbar -->
    <header class="topbar">
      <div class="topbar-inner">

        <button class="icon-btn" id="backBtn" aria-label="Go back">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.2"
               stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div class="topbar-right">
          <button class="icon-btn" aria-label="Notifications"
                  onclick="window.location.href='/notifications'">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>

          <div class="more-wrap">
            <button class="icon-btn" id="moreBtn" aria-label="More options">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5"  cy="12" r="1.6"/>
                <circle cx="12" cy="12" r="1.6"/>
                <circle cx="19" cy="12" r="1.6"/>
              </svg>
            </button>

            <div class="dropdown hidden" id="dropdown">
              <button class="dropdown-item" id="logoutBtn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>


    <!-- Main -->
    <main class="main">
      <div class="page-body">

        <div class="cover-wrap">
          <div class="cover-photo" id="coverPhoto"></div>
        </div>

        <div class="profile-section">

          <div class="profile-header">

            <div class="profile-pic" id="profilePic">
              <svg class="default-avatar" width="52" height="52"
                   viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66
                         5.33-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
              </svg>
            </div>

            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-count" id="postsCount">0</span>
                <span class="stat-label">Post</span>
              </div>
              <div class="stat-item">
                <span class="stat-count" id="friendsCount">0</span>
                <span class="stat-label">Friends</span>
              </div>
              <div class="stat-item">
                <span class="stat-count" id="followersCount">0</span>
                <span class="stat-label">Follower</span>
              </div>
            </div>

          </div>

          <!-- Info -->
          <div class="profile-info">
            <h1 class="profile-name"     id="profileName"></h1>
            <p  class="profile-username"  id="profileUsername"></p>
            <p  class="profile-bio"       id="profileBio"></p>

            <div class="profile-address hidden" id="profileAddress">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span id="addressText"></span>
            </div>

            <div class="profile-address hidden" id="profileJoined">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span id="joinedText"></span>
            </div>

            <div class="profile-address hidden" id="profileBirthday">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
                <path d="M4 21h16"/>
                <path d="M12 3v6"/>
                <path d="M8 11V9a2 2 0 1 1 4 0 2 2 0 1 1 4 0v2"/>
              </svg>
              <span id="birthdayText"></span>
            </div>

            <!-- Action Buttons -->
            <div class="profile-actions">

              <button class="btn-edit hidden" id="editProfileBtn" onclick="window.location.href='/edit-profile'">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="#fff" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
                </svg>
                Edit Profile
              </button>

              <button class="btn-add-friend hidden" id="addFriendBtn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2.2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
                Add Friend
              </button>

              <button class="btn-follow hidden" id="followBtn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2.2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                  <line x1="19" y1="1" x2="19" y2="7"/>
                  <line x1="22" y1="4" x2="16" y2="4"/>
                </svg>
                Follow
              </button>

              <button class="btn-friend-state hidden" id="friendStateBtn"></button>

              <button class="btn-share" id="shareBtn">
                <img src="https://i.ibb.co.com/5hsvkZPk/images-removebg-preview.png" alt="share" />
                Share Profile
              </button>

            </div>

            <!-- Highlights Row -->
            <div class="highlights-section">
              <div class="highlights-scroll" id="highlightsRow">
                <div class="hl-item hl-new hidden" id="hlNewBtn">
                  <div class="hl-media">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                         stroke="#bbb" stroke-width="2" stroke-linecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </div>
                  <span class="hl-title">New</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Posts Tab Bar -->
        <div class="posts-tab-bar" id="postsTabBar">
          <button class="posts-tab-btn active" id="allTab" aria-label="All Posts">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.8"
                 stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </button>
          <button class="posts-tab-btn" id="photosTab" aria-label="Photos">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.8"
                 stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.8"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </button>
          <button class="posts-tab-btn" id="reelsTab" aria-label="Video">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.8"
                 stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5"/>
              <path d="M3 8H21"/>
              <path d="M8 3L11 8"/>
              <path d="M15 3L18 8"/>
              <polygon points="10.2,10.6 15.4,13.3 10.2,16" fill="currentColor" stroke="none"/>
            </svg>
          </button>
          <button class="posts-tab-btn" id="savedTab" aria-label="Saved">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.8"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>

        <!-- Grid Views -->
        <div class="grid-view" id="allGrid"></div>
        <div class="grid-view hidden" id="photosGrid"></div>
        <div class="grid-view hidden" id="reelsGrid"></div>
        <div class="grid-view hidden" id="savedGrid"></div>

        <div class="posts-list" id="postsList">
          <div class="posts-empty hidden" id="postsEmpty"></div>
        </div>

      </div>
    </main>

  </div>


  <!-- Upload Modal -->
  <div class="modal-overlay hidden" id="uploadModal">
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <p class="modal-title">New Highlight</p>

      <div class="modal-preview" id="modalPreview" style="cursor:pointer;">
        <span id="previewHint">Tap to add photo / video</span>
      </div>
      <input type="file" id="mediaInput" accept="image/*,video/*" style="display:none"/>

      <input class="modal-input" type="text" id="hlTitleInput"
             placeholder="Title (max 8 chars)" maxlength="8" autocomplete="off" />
      <p class="char-count"><span id="charCount">0</span>/8</p>

      <button class="modal-post-btn" id="modalPostBtn">Post</button>
      <button class="modal-cancel" id="modalCancel">Cancel</button>
    </div>
  </div>


  <!-- Highlight Viewer -->
  <div class="hl-viewer hidden" id="hlViewer">
    <div class="hl-viewer-bar">
      <button class="hl-vbtn" id="hlViewerClose">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.2"
             stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <div class="hl-more-wrap">
        <button class="hl-vbtn hidden" id="hlViewerMore">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5"  cy="12" r="1.6"/>
            <circle cx="12" cy="12" r="1.6"/>
            <circle cx="19" cy="12" r="1.6"/>
          </svg>
        </button>
        <div class="hl-viewer-dd hidden" id="hlViewerDd">
          <button class="hl-delete-btn" id="hlDeleteBtn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
    <div class="hl-viewer-media" id="hlViewerMedia"></div>
    <div class="hl-viewer-title" id="hlViewerTitle"></div>
  </div>


  <!-- Fullscreen Media Viewer -->
  <div class="media-viewer hidden" id="mediaViewer">
    <div class="media-viewer-bar">
      <button class="hl-vbtn" id="mediaViewerClose">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.2"
             stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <div class="hl-more-wrap">
        <button class="hl-vbtn hidden" id="mediaViewerDeleteBtn" aria-label="Delete post">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6"/><path d="M14 11v6"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="media-viewer-scroll" id="mediaViewerScroll"></div>
  </div>


  <!-- Visitor Options Bottom Sheet -->
  <div class="vsheet-overlay hidden" id="vsheetOverlay">
    <div class="vsheet" id="vsheet">
      <div class="vsheet-handle"></div>

      <button class="vsheet-item" id="vs-follow">
        <span class="vsheet-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#1a1a1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </span>
        <span id="vs-follow-label">Follow</span>
      </button>

      <button class="vsheet-item danger" id="vs-block">
        <span class="vsheet-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#e63950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
          </svg>
        </span>
        Block
      </button>

      <button class="vsheet-item danger hidden" id="vs-unfriend">
        <span class="vsheet-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#e63950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="8.5" cy="7" r="4"/>
            <line x1="23" y1="11" x2="17" y2="11"/>
          </svg>
        </span>
        Unfriend
      </button>

      <button class="vsheet-item" id="vs-details">
        <span class="vsheet-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#1a1a1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </span>
        Account Details
      </button>

      <button class="vsheet-item danger" id="vs-report">
        <span class="vsheet-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#e63950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
            <line x1="4" y1="22" x2="4" y2="15"/>
          </svg>
        </span>
        Report
      </button>

    </div>
  </div>

  <div class="vs-toast" id="vsToast"></div>

  <!-- Firebase -->
  <script type="module">
    import { auth, db, app, uploadToCloudinary } from "./config.js";
    import {
      onAuthStateChanged, signOut
    } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
    import {
      ref, onValue, push, set, remove, get, update
    } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

    const $ = (id) => document.getElementById(id);

    const backBtn         = $("backBtn");
    const moreBtn         = $("moreBtn");
    const dropdown        = $("dropdown");
    const logoutBtn       = $("logoutBtn");
    const coverPhoto      = $("coverPhoto");
    const profilePic      = $("profilePic");
    const profileName     = $("profileName");
    const profileUsername = $("profileUsername");
    const profileBio      = $("profileBio");
    const profileAddress  = $("profileAddress");
    const addressText     = $("addressText");
    const profileJoined   = $("profileJoined");
    const joinedText      = $("joinedText");
    const profileBirthday = $("profileBirthday");
    const birthdayText    = $("birthdayText");
    const postsCount     = $("postsCount");
    const friendsCount   = $("friendsCount");
    const followersCount = $("followersCount");
    const highlightsRow  = $("highlightsRow");
    const hlNewBtn        = $("hlNewBtn");
    const editProfileBtn  = $("editProfileBtn");
    const uploadModal     = $("uploadModal");
    const modalPreview    = $("modalPreview");
    const previewHint     = $("previewHint");
    const mediaInput      = $("mediaInput");
    const hlTitleInput    = $("hlTitleInput");
    const charCount       = $("charCount");
    const modalPostBtn    = $("modalPostBtn");
    const modalCancel     = $("modalCancel");
    const shareBtn        = $("shareBtn");

    const allTab     = $("allTab");
    const photosTab  = $("photosTab");
    const reelsTab   = $("reelsTab");
    const savedTab   = $("savedTab");
    const allGrid    = $("allGrid");
    const photosGrid = $("photosGrid");
    const reelsGrid  = $("reelsGrid");
    const savedGrid  = $("savedGrid");

    const mediaViewer       = $("mediaViewer");
    const mediaViewerScroll = $("mediaViewerScroll");
    const mediaViewerClose  = $("mediaViewerClose");
    const mediaViewerDeleteBtn = $("mediaViewerDeleteBtn");

    const addFriendBtn    = $("addFriendBtn");
    const followBtn       = $("followBtn");
    const friendStateBtn  = $("friendStateBtn");
    const vsheetOverlay   = $("vsheetOverlay");
    const vsToast         = $("vsToast");
    const vsFollowBtn     = $("vs-follow");
    const vsFollowLabel   = $("vs-follow-label");
    const vsBlockBtn      = $("vs-block");
    const vsUnfriendBtn   = $("vs-unfriend");

    let currentUser  = null;
    let profileUid   = null;
    let isOwnProfile = false;
    let selectedFile = null;
    let currentHlId  = null;

    // "none" | "request_sent" | "request_received" | "friend"
    let friendState  = "none";
    let isFollowing  = false;

    let allItems   = [];
    let photoItems = [];
    let reelItems  = [];
    let savedItems = [];

    let activeMediaList   = [];
    let activeMediaSource = null;

    // ── Toast ────────────────────────────────────────────────
    function showToast(msg, duration = 2200) {
      vsToast.textContent = msg;
      vsToast.classList.add("show");
      clearTimeout(vsToast._t);
      vsToast._t = setTimeout(() => vsToast.classList.remove("show"), duration);
    }

    // ── Back ────────────────────────────────────────────────
    backBtn.addEventListener("click", () => {
      if (history.length > 1) history.back();
      else window.location.href = "/";
    });

    // ── Dropdown / Bottom Sheet ──────────────────────────────
    moreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isOwnProfile) {
        dropdown.classList.toggle("hidden");
      } else {
        openVSheet();
      }
    });
    document.addEventListener("click", () => dropdown.classList.add("hidden"));
    dropdown.addEventListener("click", (e) => e.stopPropagation());

    // ── Logout ───────────────────────────────────────────────
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
      window.location.href = "/login";
    });

    // ── Share Profile ────────────────────────────────────────
    shareBtn.addEventListener("click", async () => {
      const url = window.location.href;
      if (navigator.share) {
        await navigator.share({ title: "Insight Profile", url });
      } else {
        await navigator.clipboard.writeText(url);
        const orig = shareBtn.innerHTML;
        shareBtn.textContent = "Copied!";
        setTimeout(() => { shareBtn.innerHTML = orig; }, 2000);
      }
    });

    // ── URL helpers ──────────────────────────────────────────
    function getParamFromUrl() {
      const params = new URLSearchParams(window.location.search);
      return { username: params.get("username") || null, uid: params.get("uid") || null };
    }

    async function resolveUsernameToUid(username) {
      const snap = await get(ref(db, `usernames/${username.toLowerCase()}`));
      return snap.exists() ? snap.val() : null;
    }

    function buildProfileUrl(username) {
      return `/profile?username=${encodeURIComponent(username)}`;
    }

    // ── Auth check ───────────────────────────────────────────
    onAuthStateChanged(auth, async (user) => {
      if (!user) { window.location.href = "/login"; return; }
      currentUser = user;

      const { username: paramUsername, uid: paramUid } = getParamFromUrl();

      if (!paramUsername && !paramUid) {
        profileUid   = user.uid;
        isOwnProfile = true;
        const ownSnap     = await get(ref(db, `users/${user.uid}`));
        const ownUsername = (ownSnap.val()?.username || "").replace(/^@/, "");
        if (ownUsername) history.replaceState({}, "", buildProfileUrl(ownUsername));

      } else if (paramUid && !paramUsername) {
        profileUid   = paramUid;
        isOwnProfile = paramUid === user.uid;
        const snap     = await get(ref(db, `users/${paramUid}`));
        const uname    = (snap.val()?.username || "").replace(/^@/, "");
        if (uname) history.replaceState({}, "", buildProfileUrl(uname));

      } else {
        const resolved = await resolveUsernameToUid(paramUsername);
        if (!resolved) {
          document.body.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Poppins,sans-serif;color:#aaa;font-size:15px;">User not found</div>`;
          return;
        }
        profileUid   = resolved;
        isOwnProfile = resolved === user.uid;
      }

      editProfileBtn.classList.toggle("hidden", !isOwnProfile);
      hlNewBtn.classList.toggle("hidden", !isOwnProfile);
      hlViewerMoreBtnVisibility();
      savedTab.classList.toggle("hidden", !isOwnProfile);

      if (!isOwnProfile) {
        await loadVisitorState(profileUid);
      }

      loadProfile(profileUid);
      loadHighlights(profileUid);
      loadPosts(profileUid);
      if (isOwnProfile) loadSavedPosts(user.uid);
    });

    function hlViewerMoreBtnVisibility() {
      $("hlViewerMore").classList.toggle("hidden", !isOwnProfile);
    }

    // ── Load profile ─────────────────────────────────────────
    function loadProfile(uid) {
      onValue(ref(db, `users/${uid}`), (d_snap) => {
        const d = d_snap.val() || {};
        if (d.coverPhotoUrl) {
          coverPhoto.innerHTML = `<img src="${esc(d.coverPhotoUrl)}" alt="Cover">`;
        }
        const photoUrl = d.profilePhotoUrl || d.photoURL || (isOwnProfile ? currentUser.photoURL : "") || "";
        if (photoUrl) {
          profilePic.innerHTML = `<img src="${esc(photoUrl)}" alt="Profile">`;
        }
        const name = d.name || d.displayName || d.fullName ||
                     [d.firstName, d.lastName].filter(Boolean).join(' ') ||
                     (isOwnProfile ? currentUser.displayName : "") || "";
        profileName.textContent = name;
        if (d.username || d.userName) {
          const uname = d.username || d.userName;
          profileUsername.textContent = uname.startsWith("@") ? uname : "@" + uname;
        }
        if (d.bio) profileBio.textContent = d.bio;

        const addr = d.address || d.location || "";
        if (addr) { addressText.textContent = addr; profileAddress.classList.remove("hidden"); }
        else profileAddress.classList.add("hidden");

        const createdAt = d.createdAt || (isOwnProfile && currentUser.metadata?.creationTime
          ? new Date(currentUser.metadata.creationTime).getTime()
          : null);
        if (createdAt) {
          joinedText.textContent = "Joined " + formatLongDate(createdAt);
          profileJoined.classList.remove("hidden");
        } else {
          profileJoined.classList.add("hidden");
        }

        const dob = d.dateOfBirth || d.birthday || d.dob || "";
        if (dob) {
          const dobMs = typeof dob === "number" ? dob : new Date(dob).getTime();
          if (!isNaN(dobMs)) {
            birthdayText.textContent = "Born " + formatLongDate(dobMs);
            profileBirthday.classList.remove("hidden");
          }
        } else {
          profileBirthday.classList.add("hidden");
        }

        postsCount.textContent     = d.postsCount     || 0;
        const fCount = d.friendsCount || 0;
        friendsCount.textContent   = fCount;
        followersCount.textContent = d.followersCount || 0;

        if (!isOwnProfile) {
          renderVisitorPrimaryBtn(fCount);
        }

        document.querySelector(".profile-info").classList.add("loaded");
      });
    }

    // ══════════════════════════════════════════════════════════
    //  VISITOR STATE & BUTTONS
    // ══════════════════════════════════════════════════════════

    /*
     * Firebase paths (rules-এর সাথে মিলিয়ে):
     *   friends/{me}/{them}                    → বন্ধু আছে কিনা
     *   friendRequests/{them}/{me}             → আমি request পাঠিয়েছি (me=fromUid)
     *   friendRequests/{me}/{them}             → ওরা আমাকে request পাঠিয়েছে
     *   following/{me}/{them}                  → আমি follow করি (value: true)
     */
    async function loadVisitorState(targetUid) {
      const me = currentUser.uid;
      const [friendSnap, sentSnap, recvSnap, followSnap] = await Promise.all([
        get(ref(db, `friends/${me}/${targetUid}`)),
        get(ref(db, `friendRequests/${targetUid}/${me}`)),   // আমি পাঠিয়েছি
        get(ref(db, `friendRequests/${me}/${targetUid}`)),   // ওরা পাঠিয়েছে
        get(ref(db, `following/${me}/${targetUid}`))
      ]);

      if (friendSnap.exists()) {
        friendState = "friend";
      } else if (sentSnap.exists()) {
        friendState = "request_sent";
      } else if (recvSnap.exists()) {
        friendState = "request_received";
      } else {
        friendState = "none";
      }

      isFollowing = followSnap.exists();
      updateFollowLabel();
    }

    function renderVisitorPrimaryBtn(friendCountVal) {
      addFriendBtn.classList.add("hidden");
      followBtn.classList.add("hidden");
      friendStateBtn.classList.add("hidden");

      if (friendState === "friend") {
        friendStateBtn.textContent = "✓ Friend";
        friendStateBtn.className   = "btn-friend-state";
        friendStateBtn.classList.remove("hidden");
        vsUnfriendBtn.classList.remove("hidden");

      } else if (friendState === "request_sent") {
        friendStateBtn.textContent = "Request Sent";
        friendStateBtn.className   = "btn-friend-state";
        friendStateBtn.classList.remove("hidden");
        vsUnfriendBtn.classList.add("hidden");

      } else if (friendState === "request_received") {
        friendStateBtn.textContent = "Accept Request";
        friendStateBtn.className   = "btn-friend-state accept";
        friendStateBtn.classList.remove("hidden");
        vsUnfriendBtn.classList.add("hidden");

      } else {
        vsUnfriendBtn.classList.add("hidden");
        if (friendCountVal > 10000) {
          followBtn.classList.remove("hidden");
        } else {
          addFriendBtn.classList.remove("hidden");
        }
      }
    }

    function updateFollowLabel() {
      vsFollowLabel.textContent = isFollowing ? "Unfollow" : "Follow";
    }

    // ── Add Friend ──────────────────────────────────────────
    // Rules: friendRequests/{toUid}/{fromUid} চাই {fromUid, status, timestamp}
    addFriendBtn.addEventListener("click", async () => {
      if (addFriendBtn.disabled) return;
      addFriendBtn.disabled = true;
      const me  = currentUser.uid;
      const now = Date.now();
      try {
        await Promise.all([
          // friendRequests/{profileUid}/{me} → আমি request পাঠালাম
          set(ref(db, `friendRequests/${profileUid}/${me}`), {
            fromUid:   me,
            status:    "pending",
            timestamp: now
          }),
          // following/{me}/{profileUid} = true
          set(ref(db, `following/${me}/${profileUid}`), true)
        ]);
        friendState = "request_sent";
        isFollowing = true;
        updateFollowLabel();
        renderVisitorPrimaryBtn(parseInt(friendsCount.textContent) || 0);
        showToast("Friend request sent!");
      } catch (err) {
        console.error("Add friend error:", err);
        showToast("Failed. Please try again.");
        addFriendBtn.disabled = false;
      }
    });

    // ── Follow (10k+ mode) ───────────────────────────────────
    followBtn.addEventListener("click", async () => {
      if (followBtn.disabled) return;
      followBtn.disabled = true;
      const me  = currentUser.uid;
      const now = Date.now();
      try {
        if (isFollowing) {
          await remove(ref(db, `following/${me}/${profileUid}`));
          isFollowing = false;
          followBtn.textContent = "Follow";
          showToast("Unfollowed.");
        } else {
          await set(ref(db, `following/${me}/${profileUid}`), true);
          isFollowing = true;
          followBtn.textContent = "Following";
          showToast("Following!");
        }
      } catch (err) {
        console.error("Follow error:", err);
        showToast("Failed. Please try again.");
      } finally {
        followBtn.disabled = false;
      }
    });

    // ── Friend State button (Accept Request) ─────────────────
    friendStateBtn.addEventListener("click", async () => {
      if (friendState !== "request_received") return;
      friendStateBtn.disabled   = true;
      friendStateBtn.textContent = "...";
      const me  = currentUser.uid;
      const now = Date.now();
      try {
        // Accept: friends path দুই দিকে set করো, request মুছো
        await Promise.all([
          set(ref(db, `friends/${me}/${profileUid}`), { addedAt: now }),
          set(ref(db, `friends/${profileUid}/${me}`), { addedAt: now }),
          remove(ref(db, `friendRequests/${me}/${profileUid}`))
        ]);
        friendState = "friend";
        isFollowing = true;
        updateFollowLabel();
        renderVisitorPrimaryBtn(parseInt(friendsCount.textContent) || 0);
        showToast("Friend request accepted!");
      } catch (err) {
        console.error("Accept error:", err);
        showToast("Failed. Please try again.");
        friendStateBtn.disabled   = false;
        friendStateBtn.textContent = "Accept Request";
      }
    });

    // ══════════════════════════════════════════════════════════
    //  VISITOR BOTTOM SHEET
    // ══════════════════════════════════════════════════════════

    function openVSheet() {
      updateFollowLabel();
      vsUnfriendBtn.classList.toggle("hidden", friendState !== "friend");
      vsheetOverlay.classList.remove("hidden");
    }

    vsheetOverlay.addEventListener("click", (e) => {
      if (e.target === vsheetOverlay) vsheetOverlay.classList.add("hidden");
    });

    // Follow / Unfollow
    vsFollowBtn.addEventListener("click", async () => {
      vsheetOverlay.classList.add("hidden");
      const me = currentUser.uid;
      try {
        if (isFollowing) {
          await remove(ref(db, `following/${me}/${profileUid}`));
          isFollowing = false;
          showToast("Unfollowed. Posts will no longer appear in your feed.");
        } else {
          await set(ref(db, `following/${me}/${profileUid}`), true);
          isFollowing = true;
          showToast("Following! Their posts will now appear in your feed.");
        }
        updateFollowLabel();
      } catch (err) {
        console.error("Follow/Unfollow error:", err);
        showToast("Failed. Please try again.");
      }
    });

    // Block
    vsBlockBtn.addEventListener("click", async () => {
      vsheetOverlay.classList.add("hidden");
      const me  = currentUser.uid;
      const now = Date.now();
      try {
        await Promise.all([
          // block করলে friendship ও request মুছে ফেলা হয়
          set(ref(db, `blockedUsers/${me}/${profileUid}`), { blockedAt: now }),
          remove(ref(db, `friends/${me}/${profileUid}`)),
          remove(ref(db, `friends/${profileUid}/${me}`)),
          remove(ref(db, `friendRequests/${profileUid}/${me}`)),
          remove(ref(db, `friendRequests/${me}/${profileUid}`))
        ]);
        showToast("User blocked.");
        setTimeout(() => history.back(), 1500);
      } catch (err) {
        console.error("Block error:", err);
        showToast("Failed to block. Try again.");
      }
    });

    // Unfriend
    vsUnfriendBtn.addEventListener("click", async () => {
      vsheetOverlay.classList.add("hidden");
      const me = currentUser.uid;
      try {
        await Promise.all([
          remove(ref(db, `friends/${me}/${profileUid}`)),
          remove(ref(db, `friends/${profileUid}/${me}`))
        ]);
        friendState = "none";
        isFollowing = false;
        updateFollowLabel();
        renderVisitorPrimaryBtn(parseInt(friendsCount.textContent) || 0);
        showToast("Unfriended.");
      } catch (err) {
        console.error("Unfriend error:", err);
        showToast("Failed to unfriend. Try again.");
      }
    });

    $("vs-details").addEventListener("click", () => {
      vsheetOverlay.classList.add("hidden");
      showToast("Account Details — coming soon.");
    });

    $("vs-report").addEventListener("click", () => {
      vsheetOverlay.classList.add("hidden");
      showToast("Report submitted.");
    });

    function formatLongDate(ts) {
      return new Date(ts).toLocaleDateString("en-US", {
        day: "numeric", month: "long", year: "numeric"
      });
    }

    // ── Highlights ────────────────────────────────────────────
    function loadHighlights(uid) {
      onValue(ref(db, `users/${uid}/highlights`), (snap) => {
        highlightsRow.querySelectorAll(".hl-existing").forEach(el => el.remove());
        if (!snap.exists()) return;
        const items = [];
        snap.forEach(child => items.push({ id: child.key, ...child.val() }));
        items.sort((a, b) => a.timestamp - b.timestamp);
        items.forEach(item => {
          const el = buildHighlightItem(item);
          highlightsRow.appendChild(el);
        });
      });
    }

    function buildHighlightItem(item) {
      const wrap = document.createElement("div");
      wrap.className = "hl-item hl-existing";
      const mediaTag = item.mediaType === "video"
        ? `<video src="${esc(item.mediaUrl)}" muted playsinline></video>`
        : `<img src="${esc(item.mediaUrl)}" alt="${esc(item.title)}">`;
      wrap.innerHTML = `
        <div class="hl-media">${mediaTag}</div>
        <span class="hl-title">${esc(item.title)}</span>`;
      wrap.addEventListener("click", () => openViewer(item));
      return wrap;
    }

    hlNewBtn.addEventListener("click", () => {
      selectedFile = null;
      mediaInput.value = "";
      hlTitleInput.value = "";
      charCount.textContent = "0";
      previewHint.style.display = "block";
      const old = modalPreview.querySelector("img,video");
      if (old) old.remove();
      uploadModal.classList.remove("hidden");
    });

    modalPreview.addEventListener("click", () => mediaInput.click());
    modalCancel.addEventListener("click", () => uploadModal.classList.add("hidden"));
    uploadModal.addEventListener("click", (e) => {
      if (e.target === uploadModal) uploadModal.classList.add("hidden");
    });

    mediaInput.addEventListener("change", () => {
      const file = mediaInput.files[0];
      if (!file) return;
      selectedFile = file;
      previewHint.style.display = "none";
      const old = modalPreview.querySelector("img,video");
      if (old) old.remove();
      const url = URL.createObjectURL(file);
      if (file.type.startsWith("video")) {
        const v = document.createElement("video");
        v.src = url; v.muted = true; v.autoplay = true;
        v.style.cssText = "width:100%;height:100%;object-fit:cover;pointer-events:none;";
        modalPreview.prepend(v);
      } else {
        const img = document.createElement("img");
        img.src = url;
        img.style.cssText = "width:100%;height:100%;object-fit:cover;pointer-events:none;";
        modalPreview.prepend(img);
      }
    });

    hlTitleInput.addEventListener("input", () => {
      charCount.textContent = hlTitleInput.value.length;
    });

    modalPostBtn.addEventListener("click", async () => {
      const title = hlTitleInput.value.trim();
      if (!selectedFile) { alert("Please select a photo or video."); return; }
      if (!title)        { alert("Please enter a title."); return; }

      modalPostBtn.classList.add("loading");
      modalPostBtn.disabled = true;

      try {
        const { url, resourceType } = await uploadToCloudinary(selectedFile, "highlights");
        const hlRef = push(ref(db, `users/${currentUser.uid}/highlights`));
        await set(hlRef, {
          mediaUrl:  url,
          mediaType: resourceType === "video" ? "video" : "image",
          title:     title,
          timestamp: Date.now()
        });
        uploadModal.classList.add("hidden");
        selectedFile = null;
      } catch (err) {
        console.error("Upload error:", err);
        alert("Upload failed. Please try again.");
      } finally {
        modalPostBtn.classList.remove("loading");
        modalPostBtn.disabled = false;
      }
    });

    // ── Highlight viewer ──────────────────────────────────────
    const hlViewer      = $("hlViewer");
    const hlViewerMedia  = $("hlViewerMedia");
    const hlViewerTitle  = $("hlViewerTitle");
    const hlViewerDd     = $("hlViewerDd");

    function openViewer(item) {
      currentHlId = item.id;
      hlViewerMedia.innerHTML = item.mediaType === "video"
        ? `<video src="${esc(item.mediaUrl)}" controls autoplay playsinline
               style="max-width:100%;max-height:100%;object-fit:contain;"></video>`
        : `<img src="${esc(item.mediaUrl)}" alt="${esc(item.title)}"
               style="max-width:100%;max-height:100%;object-fit:contain;">`;
      hlViewerTitle.textContent = item.title;
      hlViewerDd.classList.add("hidden");
      hlViewer.classList.remove("hidden");
    }

    $("hlViewerClose").addEventListener("click", () => {
      hlViewer.classList.add("hidden");
      hlViewerMedia.innerHTML = "";
      currentHlId = null;
    });

    $("hlViewerMore").addEventListener("click", (e) => {
      e.stopPropagation();
      hlViewerDd.classList.toggle("hidden");
    });

    hlViewer.addEventListener("click", (e) => {
      if (!e.target.closest(".hl-more-wrap")) {
        hlViewerDd.classList.add("hidden");
      }
    });

    $("hlDeleteBtn").addEventListener("click", async () => {
      if (!currentHlId || !isOwnProfile) return;
      try {
        await remove(ref(db, `users/${currentUser.uid}/highlights/${currentHlId}`));
        hlViewer.classList.add("hidden");
        hlViewerMedia.innerHTML = "";
        currentHlId = null;
      } catch (err) {
        console.error("Delete error:", err);
        alert("Delete failed. Please try again.");
      }
    });

    function esc(s) {
      return String(s)
        .replace(/&/g,"&amp;").replace(/</g,"&lt;")
        .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    }

    // ── Tabs ─────────────────────────────────────────────────
    function setActiveTab(name) {
      allTab.classList.toggle("active", name === "all");
      photosTab.classList.toggle("active", name === "photos");
      reelsTab.classList.toggle("active", name === "reels");
      savedTab.classList.toggle("active", name === "saved");
      allGrid.classList.toggle("hidden", name !== "all");
      photosGrid.classList.toggle("hidden", name !== "photos");
      reelsGrid.classList.toggle("hidden", name !== "reels");
      savedGrid.classList.toggle("hidden", name !== "saved");
    }
    allTab.addEventListener("click",    () => setActiveTab("all"));
    photosTab.addEventListener("click", () => setActiveTab("photos"));
    reelsTab.addEventListener("click",  () => setActiveTab("reels"));
    savedTab.addEventListener("click",  () => setActiveTab("saved"));

    function renderGridEmpty(container, message) {
      container.innerHTML = `
        <div class="grid-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
          <p>${esc(message)}</p>
        </div>`;
    }

    function renderGrid(container, items, source) {
      container.innerHTML = "";
      if (!items.length) {
        renderGridEmpty(container, source === "reels" ? "No videos yet" :
                                    source === "saved" ? "No saved posts" :
                                    source === "photos" ? "No photos yet" : "No posts yet");
        return;
      }
      items.forEach((item, idx) => {
        const cell = document.createElement("div");
        const isVideo = item.mediaType === "video";
        if (!item.mediaUrl) {
          cell.className = "grid-cell text-only";
          const preview = (item.caption || "").trim() || "(no text)";
          cell.innerHTML = `<p>${esc(preview)}</p>`;
        } else {
          cell.className = "grid-cell";
          cell.innerHTML = isVideo
            ? `<video src="${esc(item.mediaUrl)}" muted playsinline></video>
               <svg class="reel-badge" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                 <polygon points="5 3 19 12 5 21 5 3"/>
               </svg>`
            : `<img src="${esc(item.mediaUrl)}" alt="post" loading="lazy">`;
        }
        cell.addEventListener("click", () => openMediaViewer(items, idx, source));
        container.appendChild(cell);
      });
    }

    function openMediaViewer(items, startIndex, source) {
      activeMediaList   = items;
      activeMediaSource = source;

      mediaViewerScroll.innerHTML = "";
      items.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "mv-item";
        if (!item.mediaUrl) {
          slide.innerHTML = `<p style="color:#fff;font-size:15px;line-height:1.6;padding:0 28px;text-align:center;max-width:340px;">${esc(item.caption || "")}</p>`;
        } else {
          slide.innerHTML = item.mediaType === "video"
            ? `<video src="${esc(item.mediaUrl)}" controls playsinline></video>`
            : `<img src="${esc(item.mediaUrl)}" alt="post">`;
        }
        mediaViewerScroll.appendChild(slide);
      });

      mediaViewerDeleteBtn.classList.toggle("hidden", !(isOwnProfile && source !== "saved"));
      mediaViewer.classList.remove("hidden");
      requestAnimationFrame(() => {
        mediaViewerScroll.scrollLeft = startIndex * mediaViewerScroll.clientWidth;
      });
    }

    mediaViewerClose.addEventListener("click", () => {
      mediaViewer.classList.add("hidden");
      mediaViewerScroll.innerHTML = "";
    });

    mediaViewerDeleteBtn.addEventListener("click", async () => {
      if (!isOwnProfile) return;
      const idx = Math.round(mediaViewerScroll.scrollLeft / mediaViewerScroll.clientWidth);
      const item = activeMediaList[idx];
      if (!item) return;
      if (!confirm("Delete this post?")) return;
      try {
        await remove(ref(db, `posts/${currentUser.uid}/${item.id}`));
        const countSnap = await get(ref(db, `users/${currentUser.uid}/postsCount`));
        const cur = countSnap.exists() ? (countSnap.val() || 0) : 0;
        await update(ref(db, `users/${currentUser.uid}`), { postsCount: Math.max(0, cur - 1) });
        mediaViewer.classList.add("hidden");
        mediaViewerScroll.innerHTML = "";
      } catch (err) {
        console.error("Delete post error:", err);
        alert("Delete failed. Please try again.");
      }
    });

    // ── Load posts ────────────────────────────────────────────
    function loadPosts(uid) {
      onValue(ref(db, `posts/${uid}`), (snap) => {
        const items = [];
        snap.forEach(child => items.push({ id: child.key, ownerUid: uid, ...child.val() }));
        items.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        allItems   = items;
        photoItems = items.filter(p => p.mediaUrl && p.mediaType !== "video" && p.mediaType !== "audio");
        reelItems  = items.filter(p => p.mediaUrl && p.mediaType === "video");

        renderGrid(allGrid, allItems, "all");
        renderGrid(photosGrid, photoItems, "photos");
        renderGrid(reelsGrid, reelItems, "reels");
      });
    }

    // ── Load saved posts ──────────────────────────────────────
    function loadSavedPosts(viewerUid) {
      onValue(ref(db, `savedPosts/${viewerUid}`), async (snap) => {
        if (!snap.exists()) {
          savedItems = [];
          renderGrid(savedGrid, savedItems, "saved");
          return;
        }
        const entries = [];
        snap.forEach(child => entries.push({ id: child.key, ...child.val() }));

        const results = await Promise.all(entries.map(async (entry) => {
          const ownerUid = entry.ownerUid;
          const postId   = entry.postId || entry.id;
          if (!ownerUid) return null;
          const postSnap = await get(ref(db, `posts/${ownerUid}/${postId}`));
          if (!postSnap.exists()) return null;
          return { id: postId, ownerUid, ...postSnap.val() };
        }));

        savedItems = results.filter(Boolean).filter(p => p.mediaUrl);
        renderGrid(savedGrid, savedItems, "saved");
      });
    }
  </script>

</body>
</html>
