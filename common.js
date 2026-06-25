// Mission Gyan Jobs - Common.js V5.0 UNIVERSAL FINAL
// Rule: 100% English Only | Auto Works On All Future Vacancies | Online + Offline

document.addEventListener('DOMContentLoaded', function() {

    const h1 = document.querySelector('h1');
    if(!h1) return;

    // ===== 1. AUTO FIND MAIN CONTAINER - WORKS EVERYWHERE =====
    const jobPage = document.getElementById('job-page') ||
                    document.querySelector('.container') ||
                    document.querySelector('main') ||
                    document.querySelector('.main-content') ||
                    document.body;

    // ===== 2. SMART DATA READER =====
    const metaDiv = document.getElementById('job-meta');
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

    // ===== 7. AUTO SYLLABUS - ONLY IF DATA EXISTS =====
    const syllabusData = document.getElementById('job-syllabus');
    if (syllabusData) {
        const subjects = [];
        for (let i = 1; i <= 15; i++) {
            const sub = syllabusData.getAttribute(`data-subject${i}`);
            if (sub && sub.trim()!== '') {
                const parts = sub.split('|');
                if (parts[0] && parts[0].trim()!== '') {
                    subjects.push(`<tr><td>${parts[0] || ''}</td><td>${parts[1] || ''}</td><td>${parts[2] || ''}</td></tr>`);
                }
            }
        }
        if (subjects.length > 0) {
            const syllabusHTML = `
            <div class="content-section" id="auto-syllabus">
                <h2 class="section-title">📚 Syllabus & Exam Pattern</h2>
                <div class="table-container">
                    <table class="data-table">
                        <thead><tr><th>Subject</th><th>Topics</th><th>Marks</th></tr></thead>
                        <tbody>${subjects.join('')}</tbody>
                    </table>
                </div>
                <p><strong>Note:</strong> For detailed syllabus, please check Official Notification.</p>
            </div>`;
            const allSections = jobPage.querySelectorAll('.content-section');
            if (allSections.length > 0) {
                allSections[allSections.length - 1].insertAdjacentHTML('afterend', syllabusHTML);
            } else {
                jobPage.insertAdjacentHTML('beforeend', syllabusHTML);
            }
        }
    }

    // ===== 8. AUTO FAQ - ONLY IF DATA EXISTS =====
    const faqData = document.getElementById('job-faq');
    if (faqData) {
        const faqItems = faqData.querySelectorAll('[data-q]');
        let validFaqs = [];
        faqItems.forEach((item) => {
            const q = item.getAttribute('data-q');
            const a = item.getAttribute('data-a');
            if (q && q.trim()!== '' && a && a.trim()!== '') {
                validFaqs.push({q, a});
            }
        });

        if (validFaqs.length > 0) {
            let faqHTML = '';
            validFaqs.forEach((item, index) => {
                faqHTML += `
                <div class="faq-item">
                    <div class="faq-question">Q${index + 1}: ${item.q}</div>
                    <div class="faq-answer">Ans: ${item.a}</div>
                </div>`;
            });

            const fullFaqHTML = `
            <div class="content-section" id="auto-faq">
                <h2 class="section-title">❓ Frequently Asked Questions</h2>
                <div class="faq-container">${faqHTML}</div>
            </div>`;

            const allSections = jobPage.querySelectorAll('.content-section');
            if (allSections.length > 0) {
                allSections[allSections.length - 1].insertAdjacentHTML('afterend', fullFaqHTML);
            } else {
                jobPage.insertAdjacentHTML('beforeend', fullFaqHTML);
            }
        }
    }

    // ===== 9. RELATED JOBS - ALWAYS WORKS =====
    const relatedJobs = [
        {title: 'Civil Court Ranchi Recruitment 2026', desc: '10th Pass | 25 Posts | Offline Form', url: 'https://missiongyanjobs.github.io/civil-court-ranchi-2026.html'},
        {title: 'BRO GREF Recruitment 2026', desc: '10th Pass | 411 Posts | Last Date: 12/08/2026', url: 'https://missiongyanjobs.github.io/bro-gref-2026.html'},
        {title: 'Income Tax Odisha Sports Quota 2026', desc: '10th Pass | 55 Posts | Last Date: 30/07/2026', url: 'https://missiongyanjobs.github.io/income-tax-odisha-sports-2026.html'},
        {title: 'IAF Group C Bangalore 2026', desc: '10th/12th Pass | 182 Posts | Last Date: 15/07/2026', url: 'https://missiongyanjobs.github.io/iaf-groupc-bangalore-2026.html'}
    ];

    const relatedCSS = `
.mgj-related{margin:25px 0;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden}
.mgj-related-header{background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;padding:12px 15px;font-size:18px;font-weight:600}
.mgj-related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:15px;padding:15px;background:#faf5ff}
.mgj-related-card{background:#fff;border:1px solid #e9d5ff;border-radius:8px;padding:12px;text-decoration:none!important;color:#333;transition:0.2s}
.mgj-related-card:hover{transform:translateY(-3px);box-shadow:0 4px 12px rgba(124,58,237,0.2)}
.mgj-related-card h4{color:#7c3aed;font-size:15px;margin-bottom:5px;font-weight:600}
.mgj-related-card p{font-size:12px;color:#666;margin:0}
        @media(max-width:768px){.mgj-related-grid{grid-template-columns:1fr}}
    `;
    if (!document.getElementById('mgj-related-style')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'mgj-related-style';
        styleTag.innerHTML = relatedCSS;
        document.head.appendChild(styleTag);
    }

    const relatedHTML = `
        <div class="mgj-related" id="auto-related-jobs">
            <div class="mgj-related-header">🔥 Related Jobs</div>
            <div class="mgj-related-grid">
                ${relatedJobs.map(job => `
                    <a href="${job.url}" class="mgj-related-card">
                        <h4>${job.title}</h4>
                        <p>${job.desc}</p>
                    </a>
                `).join('')}
            </div>
        </div>
    `;

    jobPage.insertAdjacentHTML('beforeend', relatedHTML);

    // ===== 10. SHARE + BOOKMARK + TELEGRAM - ALWAYS WORKS =====
    if(jobData.showShare) {
        let title = document.title.replace(/ \| Mission Gyan Jobs/gi, '');
        let url = window.location.href;
        let shareHTML = `
        <div id="mgj-share-box" style="text-align:center;margin:25px 0;padding:28px;background:linear-gradient(135deg,#f8f9fa 0%,#ffffff 100%);border-radius:16px;border:1px solid #e8e8e8;box-shadow:0 4px 12px rgba(0,0,0,0.06)">
            <h3 style="margin:0 0 20px 0;font-size:22px;color:#222;font-weight:700;">📤 Share This Vacancy</h3>
            <a href="https://api.whatsapp.com/send?text=*${encodeURIComponent(title)}*%0A%0A👉 ${url}" target="_blank"
               style="background:#25D366;color:white;padding:13px 30px;border-radius:10px;text-decoration:none;margin:8px;display:inline-block;font-weight:700;font-size:15px;box-shadow:0 4px 10px rgba(37,211,102,0.35);">
               WhatsApp
            </a>
            <a href="https://t.me/share/url?url=${url}&text=${encodeURIComponent(title)}" target="_blank"
               style="background:#0088cc;color:white;padding:13px 30px;border-radius:10px;text-decoration:none;margin:8px;display:inline-block;font-weight:700;font-size:15px;box-shadow:0 4px 10px rgba(0,136,204,0.35);">
               Telegram
            </a>
            <button onclick="navigator.clipboard.writeText('${url}');this.innerHTML='✅ Copied!';setTimeout(()=>{this.innerHTML='📋 Copy Link'},2000)"
               style="background:#333;color:white;padding:13px 30px;border-radius:10px;border:none;margin:8px;display:inline-block;font-weight:700;font-size:15px;cursor:pointer;box-shadow:0 4px 10px rgba(0,0,0,0.25);">
               📋 Copy Link
            </button>
            <button onclick="alert('Press Ctrl+D or Cmd+D to Bookmark');return false;"
               style="background:#7c3aed;color:white;padding:13px 30px;border-radius:10px;border:none;margin:8px;display:inline-block;font-weight:700;font-size:15px;cursor:pointer;box-shadow:0 4px 10px rgba(124,58,237,0.35);">
               ⭐ Bookmark This Job
            </button>
            <a href="https://t.me/missiongyanjobs" target="_blank"
               style="background:#229ED9;color:white;padding:13px 30px;border-radius:10px;text-decoration:none;margin:8px;display:inline-block;font-weight:700;font-size:15px;box-shadow:0 4px 10px rgba(34,158,217,0.35);">
               📢 Join Telegram for Daily Updates
            </a>
        </div>`;

        jobPage.insertAdjacentHTML('beforeend', shareHTML);
    }

});