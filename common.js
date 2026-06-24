// common.js - MISSION GYAN JOBS - ULTIMATE PREMIUM v3.0
// Ek baar daal de, zindagi bhar bhool ja

document.addEventListener('DOMContentLoaded', function() {
    
    const h1 = document.querySelector('h1');
    const metaDiv = document.getElementById('job-meta');
    
    if(!h1) return; // Agar h1 nahi hai to kuch mat kar
    
    // ===== 1. SMART DATA READER =====
    // HTML se data uthao, nahi mile to default use karo
    const jobData = {
        qualification: metaDiv?.dataset.qualification || null,
        formMode: metaDiv?.dataset.formMode || null,
        status: metaDiv?.dataset.status || 'New Vacancy',
        post: metaDiv?.dataset.post || null,
        total: metaDiv?.dataset.total || null,
        lastDate: metaDiv?.dataset.lastDate || null,
        showUpdated: metaDiv?.dataset.showUpdated !== 'false', // default true
        showShare: metaDiv?.dataset.showShare !== 'false' // default true
    };

    // ===== 2. DYNAMIC TAGS - JO HAI WOHI DIKHEGA =====
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

    // ===== 3. LAST UPDATED - ON/OFF KAR SAKTE HO =====
    if(jobData.showUpdated) {
        let today = new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'long',year:'numeric'});
        let updatedHTML = `<p style="font-size:13px;color:#1b5e20;margin:8px 0 15px 0;background:#e8f5e9;padding:8px 14px;border-left:4px solid #4caf50;border-radius:4px;display:inline-block;font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,0.05);">✅ Last Updated: ${today}</p>`;
        h1.insertAdjacentHTML('afterend', updatedHTML);
    }

    // ===== 4. INFO LINE - JO FIELD HAI WOHI DIKHEGA =====
    let infoParts = [];
    if(jobData.post) infoParts.push(jobData.post);
    if(jobData.total) infoParts.push(`Total ${jobData.total} Posts`);
    if(jobData.lastDate) infoParts.push(`Last Date: ${jobData.lastDate}`);
    
    if(infoParts.length > 0) {
        let infoLine = `<p style="font-size:14px;color:#fff;margin:-8px 0 18px 0;opacity:0.95;font-weight:500;">${infoParts.join(' | ')}</p>`;
        h1.insertAdjacentHTML('afterend', infoLine);
    }

    // ===== 5. SHARE BUTTON - PREMIUM + ON/OFF =====
    if(jobData.showShare) {
        let title = document.title.replace(/ \| Mission Gyan Jobs/gi, '');
        let url = window.location.href;
        let shareHTML = `
        <div id="mgj-share-box" style="text-align:center;margin:35px 0;padding:28px;background:linear-gradient(135deg,#f8f9fa 0%,#ffffff 100%);border-radius:16px;border:1px solid #e8e8e8;box-shadow:0 4px 12px rgba(0,0,0,0.06)">
            <h3 style="margin:0 0 20px 0;font-size:22px;color:#222;font-weight:700;">📤 Share This Vacancy</h3>
            <a href="https://api.whatsapp.com/send?text=*${encodeURIComponent(title)}*%0A%0A👉 ${url}" target="_blank" 
               style="background:#25D366;color:white;padding:13px 30px;border-radius:10px;text-decoration:none;margin:8px;display:inline-block;font-weight:700;font-size:15px;box-shadow:0 4px 10px rgba(37,211,102,0.35);transition:all 0.2s;">
               WhatsApp
            </a>
            <a href="https://t.me/share/url?url=${url}&text=${encodeURIComponent(title)}" target="_blank" 
               style="background:#0088cc;color:white;padding:13px 30px;border-radius:10px;text-decoration:none;margin:8px;display:inline-block;font-weight:700;font-size:15px;box-shadow:0 4px 10px rgba(0,136,204,0.35);transition:all 0.2s;">
               Telegram
            </a>
            <button onclick="navigator.clipboard.writeText('${url}');this.innerHTML='✅ Copied!';setTimeout(()=>{this.innerHTML='📋 Copy Link'},2000)" 
               style="background:#333;color:white;padding:13px 30px;border-radius:10px;border:none;margin:8px;display:inline-block;font-weight:700;font-size:15px;cursor:pointer;box-shadow:0 4px 10px rgba(0,0,0,0.25);transition:all 0.2s;">
               📋 Copy Link
            </button>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', shareHTML);
    }
});