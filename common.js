// Mission Gyan Jobs - Common.js V6.5 FINAL FIXED
// Rule: 100% English Only | Home Clean | Left Side Back/Home | All Features Intact

// ===== GOOGLE ANALYTICS 4 - START =====
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8GKG4REDX6');

// GA4 Script Auto Load
(function() {
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-8GKG4REDX6';
  document.head.appendChild(gaScript);
})();

// Custom Event Tracking Functions
function trackDownload(jobTitle, fileUrl) {
  gtag('event', 'file_download', {
    'event_category': 'Job PDF',
    'event_label': jobTitle,
    'file_url': fileUrl,
    'value': 1
  });
}

function trackOutboundClick(url) {
  gtag('event', 'click', {
    'event_category': 'Outbound Link',
    'event_label': url,
    'transport_type': 'beacon'
  });
}
// ===== GOOGLE ANALYTICS 4 - END =====

document.addEventListener('DOMContentLoaded', function() {

    // ===== AUTO OUTBOUND LINK TRACKING =====
    document.querySelectorAll('a[href^="http"]').forEach(function(link) {
      if (!link.href.includes('missiongyanjobs.github.io')) {
        link.addEventListener('click', function() {
          trackOutboundClick(link.href);
        });
      }
    });

    // ===== 0. CHECK: SIRF VACANCY PAGE PE HI VACANCY CODE CHALE =====
    const metaDiv = document.getElementById('job-meta');
    const isVacancyPage =!!metaDiv;

    if (isVacancyPage) { // Sirf Vacancy page pe ye sab chale

        const h1 = document.querySelector('h1');
        if(!h1) return;

        // ===== 1. AUTO FIND MAIN CONTAINER =====
        const jobPage = document.getElementById('job-page') ||
                        document.querySelector('.container') ||
                        document.querySelector('main') ||
                        document.querySelector('.main-content') ||
                        document.body;

        // ===== 2. SMART DATA READER =====
        const jobData = {
            qualification: metaDiv?.dataset.qualification || 'Not Specified',
            formMode: metaDiv?.dataset.formMode || 'Check Notification',
            status: metaDiv?.dataset.status || 'New Vacancy',
            post: metaDiv?.dataset.post || null,
            total: metaDiv?.dataset.total || null,
            lastDate: metaDiv?.dataset.lastDate || null,
            showUpdated: metaDiv?.dataset.showUpdated!== 'false',
            showShare: metaDiv?.dataset.showShare!== 'false'
        };

        // ===== 3. COUNTDOWN =====
        function getCountdown(lastDateStr) {
            if (!lastDateStr) return '';
            const parts = lastDateStr.split('/');
            if (parts.length!== 3) return '';
            const lastDate = new Date(parts[2], parts[1] - 1, parts[0]);
            const today = new Date();
            today.setHours(0,0,0,0);
            const diff = Math.ceil((lastDate - today) / (1000 * 60 * 60 * 24));

            if (diff < 0) return '<span style="background:#dc2626;color:#fff;padding:3px 10px;border-radius:6px;font-weight:600;margin-left:8px;">⛔ Expired</span>';
            if (diff === 0) return '<span style="background:#dc2626;color:#fff;padding:3px 10px;border-radius:6px;font-weight:600;margin-left:8px;">⏳ Last Day Today</span>';
            if (diff <= 7) return `<span style="background:#dc2626;color:#fff;padding:3px 10px;border-radius:6px;font-weight:600;margin-left:8px;">⏳ ${diff} Days Left</span>`;
            return `<span style="background:#16a34a;color:#fff;padding:3px 10px;border-radius:6px;font-weight:600;margin-left:8px;">⏳ ${diff} Days Left</span>`;
        }

        const countdownHTML = getCountdown(jobData.lastDate);

        // ===== 4. DYNAMIC TAGS =====
        let tagsArray = [];
        if(jobData.qualification && jobData.qualification!== 'Not Specified') tagsArray.push({text: jobData.qualification, color: '#4caf50'});
        if(jobData.formMode && jobData.formMode!== 'Check Notification') tagsArray.push({text: jobData.formMode, color: '#2196f3'});
        if(jobData.status) tagsArray.push({text: jobData.status, color: '#ff5722'});

        if(tagsArray.length > 0) {
            let tagsHTML = `<div id="mgj-tags" style="margin:0 0 12px 0;display:flex;flex-wrap:wrap;gap:8px;">`;
            tagsArray.forEach(tag => {
                tagsHTML += `<span style="background:${tag.color};color:white;padding:6px 14px;border-radius:20px;font-size:13px;font-weight:600;box-shadow:0 2px 4px rgba(0,0,0,0.1);">${tag.text}</span>`;
            });
            tagsHTML += `</div>`;
            h1.insertAdjacentHTML('afterend', tagsHTML);
        }

        // ===== 5. LAST UPDATED =====
        if(jobData.showUpdated) {
            let today = new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'long',year:'numeric'});
            let updatedHTML = `<p id="mgj-updated" style="font-size:13px;color:#1b5e20;margin:8px 0 15px 0;background:#e8f5e9;padding:8px 14px;border-left:4px solid #4caf50;border-radius:4px;display:inline-block;font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,0.05);">✅ Last Updated: ${today}</p>`;
            h1.insertAdjacentHTML('afterend', updatedHTML);
        }

        // ===== 6. INFO LINE =====
        let infoParts = [];
        if(jobData.post) infoParts.push(jobData.post);
        if(jobData.total) infoParts.push(`Total ${jobData.total} Posts`);
        if(jobData.lastDate) infoParts.push(`Last Date: ${jobData.lastDate}`);

        if(infoParts.length > 0) {
            let infoLine = `<p id="mgj-info" style="font-size:14px;color:#fff;margin:-8px 0 18px 0;opacity:0.95;font-weight:500;">${infoParts.join(' | ')} ${countdownHTML}</p>`;
            h1.insertAdjacentHTML('afterend', infoLine);
        }
    } // VACANCY CODE END

    // ===== SMART BACK/HOME BUTTON - 100% FIXED =====
    const header = document.querySelector('.top-bar');
    if(header) {
        const isVacancyPage = document.getElementById('job-meta');
        const isHomePage = window.location.pathname === '/' ||
                           window.location.pathname === '/index.html' ||
                           window.location.pathname === '' ||
                           window.location.href === 'https://missiongyanjobs.github.io/' ||
                           window.location.href === 'https://missiongyanjobs.github.io/index.html' ||
                           window.location.href.endsWith('missiongyanjobs.github.io/');

        // HOME PAGE PE BUTTON HI NAHI DIKHEGA
        if (!isHomePage) {
            var btn = document.createElement('a');
            btn.id = 'mgj-home-btn';
            btn.href = '#';

            if (isVacancyPage) {
                // VACANCY PAGE PE "BACK" DIKHEGA LEFT ME
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg><span>Back</span>`;
                btn.onclick = function(e) {
                    e.preventDefault();
                    window.history.back();
                };
            } else {
                // SECTION PAGES PE "HOME" DIKHEGA LEFT ME
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 22"></polyline></svg><span>Home</span>`;
                btn.onclick = function(e) {
                    e.preventDefault();
                    window.location.href = 'https://missiongyanjobs.github.io/';
                };
            }

            // CSS - LEFT SIDE ME LOGO SE DOOR
            var css = `#mgj-home-btn{position:absolute;left:15px;top:50%;transform:translateY(-50%);display:inline-flex;align-items:center;gap:6px;background:#fff;color:#0d47a1!important;padding:8px 14px;border-radius:8px;text-decoration:none!important;font-weight:600;font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,0.15);transition:0.2s;z-index:999} #mgj-home-btn:hover{background:#0d47a1;color:#fff!important} @media(max-width:768px){#mgj-home-btn{left:10px;top:15px;transform:none;padding:6px 10px} #mgj-home-btn span{display:none}.top-bar{padding-top:55px!important}}`;

            if (!document.getElementById('mgj-btn-style')) {
                var style = document.createElement('style');
                style.id = 'mgj-btn-style';
                style.innerHTML = css;
                document.head.appendChild(style);
            }
            header.insertBefore(btn, header.firstChild);
        }
    }
});