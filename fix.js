const fs = require('fs');
const files = ['index.html', 'dashboard.html', 'admin-login.html', 'admin.html', 'admission.html'];

files.forEach(f => {
    const path = 'C:/Users/Fathima hana HS/Desktop/mini-project/' + f;
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf8');

    const searchStr = "import { supabase } from './supabase-client.js';";
    const replaceStr = "const supabase = window._supabaseClient;";
    while (content.includes(searchStr)) {
        content = content.replace(searchStr, replaceStr);
    }
    fs.writeFileSync(path, content, 'utf8');
    console.log('Fixed', f);
});
