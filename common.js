// Mission Gyan Jobs - Common.js V4.4 FINAL PRO MAX
// Rule: Sirf Hindi Roman → Devanagari | English/Dates/Posts/Names = No Change

document.addEventListener('DOMContentLoaded', function() {
    
    const h1 = document.querySelector('h1');
    const metaDiv = document.getElementById('job-meta');
    
    if(!h1) return;
    
    // ===== 1. SMART DATA READER =====
    const jobData = {
        qualification: metaDiv?.dataset.qualification || null,
        formMode: metaDiv?.dataset.formMode || null,
        status: metaDiv?.dataset.status || 'New Vacancy',
        post: metaDiv?.dataset.post || null,
        total: metaDiv?.dataset.total || null,
        lastDate: metaDiv?.dataset.lastDate || null,
        showUpdated: metaDiv?.dataset.showUpdated!== 'false',
        showShare: metaDiv?.dataset.showShare!== 'false'
    };

    // ===== 2. COUNTDOWN =====
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

    // ===== 3. DYNAMIC TAGS =====
    let tagsArray = [];
    if(jobData.qualification) tagsArray.push({text: jobData.qualification, color: '#4caf50'});
    if(jobData.formMode) tagsArray.push({text: jobData.formMode, color: '#2196f3'});
    if(jobData.status) tagsArray.push({text: jobData.status, color: '#ff5722'});
    
    if(tagsArray.length > 0) {
        let tagsHTML = `<div style="margin:0 0 12px 0;display:flex;flex-wrap:wrap;gap:8px;">`;
        tagsArray.forEach(tag => {
            tagsHTML += `<span style="background:${tag.color};color:white;padding:6px 14px;border-radius:20px;font-size:13px;font-weight:600;box-shadow:0 2px 4px rgba(0,0,0,0.1);">${tag.text}</span>`;
        });
        tagsHTML += `</div>`;
        h1.insertAdjacentHTML('afterend', tagsHTML);
    }

    // ===== 4. LAST UPDATED =====
    if(jobData.showUpdated) {
        let today = new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'long',year:'numeric'});
        let updatedHTML = `<p style="font-size:13px;color:#1b5e20;margin:8px 0 15px 0;background:#e8f5e9;padding:8px 14px;border-left:4px solid #4caf50;border-radius:4px;display:inline-block;font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,0.05);">✅ Last Updated: ${today}</p>`;
        h1.insertAdjacentHTML('afterend', updatedHTML);
    }

    // ===== 5. INFO LINE =====
    let infoParts = [];
    if(jobData.post) infoParts.push(jobData.post);
    if(jobData.total) infoParts.push(`Total ${jobData.total} Posts`);
    if(jobData.lastDate) infoParts.push(`Last Date: ${jobData.lastDate}`);
    
    if(infoParts.length > 0) {
        let infoLine = `<p style="font-size:14px;color:#fff;margin:-8px 0 18px 0;opacity:0.95;font-weight:500;">${infoParts.join(' | ')} ${countdownHTML}</p>`;
        h1.insertAdjacentHTML('afterend', infoLine);
    }

    // ===== 6. SHARE + BOOKMARK + TELEGRAM =====
    if(jobData.showShare) {
        let title = document.title.replace(/ \| Mission Gyan Jobs/gi, '');
        let url = window.location.href;
        let shareHTML = `
        <div id="mgj-share-box" style="text-align:center;margin:35px 0;padding:28px;background:linear-gradient(135deg,#f8f9fa 0%,#ffffff 100%);border-radius:16px;border:1px solid #e8e8e8;box-shadow:0 4px 12px rgba(0,0,0,0.06)">
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
        document.body.insertAdjacentHTML('beforeend', shareHTML);
    }

    // ===== 7. RELATED JOBS - TERE ASLI LINKS =====
    const relatedJobs = [
        {title: 'Civil Court Ranchi Recruitment 2026', desc: '10th Pass | 25 Posts | Offline Form', url: 'https://missiongyanjobs.github.io/civil-court-ranchi-2026.html'},
        {title: 'BRO GREF Recruitment 2026', desc: '10th Pass | 411 Posts | Last Date: 12/08/2026', url: 'https://missiongyanjobs.github.io/bro-gref-2026.html'},
        {title: 'Income Tax Odisha Sports Quota 2026', desc: '10th Pass | 55 Posts | Last Date: 30/07/2026', url: 'https://missiongyanjobs.github.io/income-tax-odisha-sports-2026.html'},
        {title: 'IAF Group C Bangalore 2026', desc: '10th/12th Pass | 182 Posts | Last Date: 15/07/2026', url: 'https://missiongyanjobs.github.io/iaf-groupc-bangalore-2026.html'}
    ];
    
    const relatedCSS = `
 .mgj-related{margin:25px 20px;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden}
 .mgj-related-header{background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;padding:12px 15px;font-size:18px;font-weight:600}
 .mgj-related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:15px;padding:15px;background:#faf5ff}
 .mgj-related-card{background:#fff;border:1px solid #e9d5ff;border-radius:8px;padding:12px;text-decoration:none!important;color:#333;transition:0.2s}
 .mgj-related-card:hover{transform:translateY(-3px);box-shadow:0 4px 12px rgba(124,58,237,0.2)}
 .mgj-related-card h4{color:#7c3aed;font-size:15px;margin-bottom:5px;font-weight:600}
 .mgj-related-card p{font-size:12px;color:#666;margin:0}
        @media(max-width:768px){.mgj-related-grid{grid-template-columns:1fr}}
    `;
    const styleTag = document.createElement('style');
    styleTag.innerHTML = relatedCSS;
    document.head.appendChild(styleTag);
    
    const relatedHTML = `
        <div class="mgj-related">
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
    
    const footerNote = document.querySelector('.footer-note');
    if (footerNote) {
        footerNote.insertAdjacentHTML('beforebegin', relatedHTML);
    } else {
        document.querySelector('.container').insertAdjacentHTML('beforeend', relatedHTML);
    }

    // ===== 8. SMART HINDI-ROMAN CONVERTER =====
    const safeWords = new Set([
        'Civil Court', 'Ranchi', 'Peon', 'Orderly', 'Registered Post', 'Speed Post', 
        'Screening Test', 'Interview', 'Notification', 'Post', 'Posts', 'Pass',
        'District', 'Office', 'Jharkhand', 'India', 'SSC', 'MTS', 'IAF', 'Group',
        'Income Tax', 'Odisha', 'Railway', 'Bank', 'Police', 'Army', 'Navy', 
        'Air Force', 'BRO', 'GREF', 'Bangalore', 'OBC', 'SC', 'ST', 'EWS', 'EBC', 
        'General', 'Male', 'Female', 'Both', 'Online', 'Offline', 'WhatsApp', 
        'Telegram', 'Link', 'Copy', 'Bookmark', 'Join', 'Share', 'This', 'Job', 
        'Vacancy', 'Today', 'Days', 'Left', 'Expired', 'Last', 'Date', 'Updated', 
        'Total', 'For', 'Educational', 'Purpose', 'Only', 'Important', 'Note', 
        'Download', 'Official', 'Website', 'Mission Gyan Jobs'
    ]);

    const hindiRomanDict = {
        'bhejna': 'भेजना', 'me': 'में', 'ke liye': 'के लिए', 'liye': 'लिए',
        'ummeedwar': 'उम्मीदवार', 'ummeedwaron': 'उम्मीदवारों',
        'swahastlikhit': 'स्वहस्तलिखित', 'aadhar': 'आधार', 'anusaar': 'अनुसार',
        'bharti': 'भर्ती', 'vigyaapan': 'विज्ञापन', 'vigyapan': 'विज्ञापन',
        'aavedan': 'आवेदन', 'yogya': 'योग्य', 'yogyata': 'योग्यता',
        'pad': 'पद', 'padon': 'पदों', 'kewal': 'केवल', 'purush': 'पुरुष',
        'mahila': 'महिला', 'evam': 'एवं', 'dono': 'दोनों', 'sarkari': 'सरकारी',
        'naukri': 'नौकरी', 'devnagri': 'देवनागरी', 'lipi': 'लिपि',
        'lifaafa': 'लिफाफा', 'lifaafe': 'लिफाफे', 'par': 'पर',
        'dak': 'डाक', 'anivarya': 'अनिवार्य', 'sankhya': 'संख्या',
        'naam': 'नाम', 'likhna': 'लिखना', 'hoga': 'होगा', 'hai': 'है',
        'ka': 'का', 'ki': 'की', 'ko': 'को', 'se': 'से', 'aur': 'और', 
        'ya': 'या', 'ek': 'एक', 'do': 'दो', 'teen': 'तीन', 'chaar': 'चार',
        'paanch': 'पांच', 'saal': 'साल', 'varsh': 'वर्ष', 'umar': 'उम्र', 
        'aayu': 'आयु', 'shulk': 'शुल्क', 'maany': 'मान्य', 
        'niyamanusaar': 'नियमानुसार', 'chhoot': 'छूट', 'ullekhit': 'उल्लेखित',
        'nahi': 'नहीं', 'sath': 'साथ', 'apna': 'अपना', 'apne': 'अपने'
    };

    function isSafeWord(word) {
        if (/\d/.test(word)) return true;
        if (word.includes('/')) return true;
        if (word.includes('-')) return true;
        if (word.length <= 2) return true;
        return safeWords.has(word);
    }

    function convertRomanHindi(text) {
        // Step 1: Pure vakya
        text = text.replace(/IMPORTANT: Ye Bharti Keval Purush Ummeedwaron \(Male Only\) Ke Liye Hai/gi, 
                           '⚠️ IMPORTANT: यह भर्ती केवल पुरुष उम्मीदवारों के लिए है।');
        text = text.replace(/IMPORTANT: Ye Bharti Keval Mahila Ummeedwaron \(Female Only\) Ke Liye Hai/gi, 
                           '⚠️ IMPORTANT: यह भर्ती केवल महिला उम्मीदवारों के लिए है।');
        text = text.replace(/Ye Bharti Keval Purush Ummeedwaron Ke Liye Hai/gi, 
                           'यह भर्ती केवल पुरुष उम्मीदवारों के लिए है।');
        text = text.replace(/Ye Bharti Keval Mahila Ummeedwaron Ke Liye Hai/gi, 
                           'यह भर्ती केवल महिला उम्मीदवारों के लिए है।');
        
        // Step 2: Word by word, sirf Hindi Roman
        return text.replace(/\b([a-zA-Z]+)\b/g, (word) => {
            if (isSafeWord(word)) return word;
            const lowerWord = word.toLowerCase();
            if (hindiRomanDict[lowerWord]) {
                return hindiRomanDict[lowerWord];
            }
            return word;
        });
    }

    function scanAndConvert(node) {
        if (node.nodeType === 3) {
            node.nodeValue = convertRomanHindi(node.nodeValue);
        } else if (node.nodeType === 1 &&!['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'SELECT'].includes(node.nodeName)) {
            for (let child of node.childNodes) {
                scanAndConvert(child);
            }
        }
    }
    
    scanAndConvert(document.body);
});