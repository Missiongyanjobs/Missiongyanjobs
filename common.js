// common.js - MISSION GYAN JOBS - PRO MAX VERSION
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. LAST UPDATED DATE - H1 KE NICHE AUTO =====
    let h1 = document.querySelector('h1');
    if(h1) {
        let today = new Date().toLocaleDateString('en-GB', {
            day: '2-digit', 
            month: 'long', 
            year: 'numeric'
        });
        let updatedHTML = `<p style="font-size:13px;color:#666;margin:8px 0 15px 0;background:#e8f5e9;padding:6px 10px;border-left:4px solid #4caf50;border-radius:3px;display:inline-block;">✅ <strong>Last Updated: ${today}</strong></p>`;
        h1.insertAdjacentHTML('afterend', updatedHTML);
    }

    // ===== 2. SHARE BUTTON - PAGE KE END ME AUTO =====
    let title = document.title.replace(' | Mission Gyan Jobs', ''); // Site ka naam hata de
    let url = window.location.href;
    let shareHTML = `
    <div style="text-align:center;margin:25px 0;padding:20px;background:#f8f9fa;border-radius:10px;border:1px solid #e0e0e0">
        <h3 style="margin:0 0 15px 0;font-size:18px;">📤 Share This Vacancy</h3>
        <a href="https://api.whatsapp.com/send?text=*${encodeURIComponent(title)}* %0A%0A👉 ${url}" target="_blank" 
           style="background:#25D366;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;margin:5px;display:inline-block;font-weight:bold;font-size:15px">
           WhatsApp
        </a>
        <a href="https://t.me/share/url?url=${url}&text=${encodeURIComponent(title)}" target="_blank" 
           style="background:#0088cc;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;margin:5px;display:inline-block;font-weight:bold;font-size:15px">
           Telegram
        </a>
        <button onclick="navigator.clipboard.writeText('${url}');this.innerText='✅ Copied!';setTimeout(()=>{this.innerText='Copy Link'},2000)" 
           style="background:#555;color:white;padding:12px 24px;border-radius:6px;border:none;margin:5px;display:inline-block;font-weight:bold;font-size:15px;cursor:pointer">
           Copy Link
        </button>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', shareHTML);

    // ===== 3. IMPORTANT TAGS - H1 KE NICHE AUTO =====
    // Ye tags har page me same dikhenge. Agar alag chahiye to class="job-tags" wala div bana lena
    if(h1) {
        let tagsHTML = `
        <div style="margin:10px 0 15px 0;">
            <span style="background:#4caf50;color:white;padding:4px 10px;border-radius:4px;font-size:12px;margin:3px;display:inline-block;">🟢 10th Pass</span>
            <span style="background:#2196f3;color:white;padding:4px 10px;border-radius:4px;font-size:12px;margin:3px;display:inline-block;">🔵 Offline Form</span>
            <span style="background:#ff5722;color:white;padding:4px 10px;border-radius:4px;font-size:12px;margin:3px;display:inline-block;">🔴 New Vacancy</span>
        </div>`;
        h1.insertAdjacentHTML('afterend', tagsHTML);
    }

});