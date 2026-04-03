const fs = require('fs');
const files = ['index.html', 'dashboard.html', 'admin-login.html', 'admin.html', 'admission.html'];

files.forEach(f => {
    const path = 'C:/Users/Fathima hana HS/Desktop/mini-project/' + f;
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf8');

    // 1. Remove the head <script type="module"> that just imported supabase
    content = content.replace(/<script type="module">\s*import \{ supabase \} from '.\/supabase-client.js';\s*window\.supabase = supabase;\s*<\/script>\s*/g, '');

    // 2. Add local supabase + client script tags before </head> if not already present
    if (!content.includes('src="./supabase.js"')) {
        content = content.replace('</head>', '<script src="./supabase.js"></script>\n    <script src="./supabase-client.js"></script>\n</head>');
    }

    // 3. Replace ESM import line inside body scripts with window reference
    content = content.replace(/import \{ supabase \} from '.\/supabase-client.js';\n/g, 'const supabase = window._supabaseClient;\n');

    // 4. Downgrade type="module" to regular script (since we no longer need ESM)
    content = content.replace(/<script type="module">/g, '<script>');

    fs.writeFileSync(path, content, 'utf8');
    console.log('Updated:', f);
});
console.log('Done!');
