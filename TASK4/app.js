// NAV ACTIVE STATE
const links = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('section')];
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            links.forEach(a => a.classList.remove('active'));
            const id = '#' + e.target.id; const m = links.find(a => a.getAttribute('href') === id); if (m) m.classList.add('active');
        }
    });
}, { root: null, threshold: .3 });
sections.forEach(s => obs.observe(s));

// FOOTER YEAR 
document.getElementById('year').textContent = new Date().getFullYear();

// TO‑DO APP (LocalStorage)
const $ = s => document.querySelector(s);
const listEl = $('#todoList');
const emptyEl = $('#todoEmpty');
const key = 'apx.todos.v1';
let todos = JSON.parse(localStorage.getItem(key) || '[]');

function save() { localStorage.setItem(key, JSON.stringify(todos)); render(); }

function render() {
    listEl.innerHTML = '';
    const query = $('#todoSearch').value.toLowerCase();
    const filter = $('#todoFilter').value;
    const filtered = todos.filter(t =>
        t.title.toLowerCase().includes(query) && (filter === 'all' || (filter === 'done' ? t.done : !t.done))
    );
    if (filtered.length === 0) {
        emptyEl.hidden = false; return;
    } else {
        emptyEl.hidden = true
    };

    filtered.forEach(t => {
        const row = document.createElement('div'); row.className = 'todo-item';
        const left = document.createElement('div');
        left.style.display = 'flex';
        left.style.alignItems = 'center';
        left.style.gap = '10px';
        const chk = document.createElement('input');
        chk.type = 'checkbox';
        chk.checked = t.done;
        chk.onchange = () => {
            t.done = chk.checked;
            save();
        };
        const title = document.createElement('input');
        title.className = 'todo-title' + (t.done ? ' done' : '');
        title.value = t.title;
        title.oninput = () => {
            t.title = title.value;
        };
        title.onblur = save;
        title.style.background = 'transparent';
        title.style.border = 'none';
        title.style.color = 'inherit';
        const tag = document.createElement('span');
        tag.className = 'chip';
        tag.textContent = t.tag;
        left.append(chk, title, tag);
        const del = document.createElement('button');
        del.className = 'btn';
        del.textContent = 'Delete';
        del.onclick = () => {
            todos = todos.filter(x => x.id !== t.id);
            save();
        };
        row.append(left, del); listEl.append(row);
    });
}

$('#addTodo').onclick = () => {
    const title = $('#todoTitle').value.trim();
    if (!title) return alert('Please enter a task or note.');
    const tag = $('#todoTag').value;
    todos.unshift({ id: crypto.randomUUID(), title, tag, done: false, created: Date.now() });
    $('#todoTitle').value = ''; save();
};
$('#todoSearch').oninput = render; $('#todoFilter').onchange = render;
render();

// PRODUCT LISTING (Filter + Sort)
const products = [
    {
        id: 1,
        name: 'Boat Headphones',
        category: 'Electronics',
        price: 1999,
        rating: 4.5,
        img: 'https://www.boat-lifestyle.com/cdn/shop/products/R550playbacktime20hrs_01423432-41fe-4c08-8fb0-b36054e64eb3_1500x.jpg?v=1659339545'
    },
    {
        id: 2,
        name: 'Comfy Hoodie',
        category: 'Clothing',
        price: 1299,
        rating: 4.2,
        img: 'https://img.lazcdn.com/g/p/e6988c01735c67381059861c2c8c2f82.jpg_720x720q80.jpg'
    },
    {
        id: 3,
        name: 'Smart Watch',
        category: 'Electronics',
        price: 3499,
        rating: 4.7,
        img: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 4,
        name: 'Running Shoes',
        category: 'Footwear',
        price: 2599,
        rating: 4.4,
        img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 5,
        name: 'Notebook Set',

        category: 'Stationery',
        price: 399,
        rating: 4.1,
        img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 6,
        name: 'Gaming Mouse',
        category: 'Electronics',
        price: 1499,
        rating: 4.6,
        img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 7,
        name: 'Classic Tee',
        category: 'Clothing',
        price: 599,
        rating: 4.0,
        img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 8,
        name: 'Leather Wallet',
        category: 'Accessories',
        price: 899,
        rating: 4.3,
        img: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1200&auto=format&fit=crop'
    }
];

const grid = $('#productGrid');
const emptyP = $('#productEmpty');
const catSel = $('#catFilter');
const search = $('#searchBox');
const sortSel = $('#sortBy');

// Populate categories
[...new Set(products.map(p => p.category))].forEach(c => {
    const opt = document.createElement('option'); opt.value = c; opt.textContent = c; catSel.append(opt);
});

function applyFilters() {
    const term = search.value.toLowerCase();
    const cat = catSel.value;
    let out = products.filter(p => p.name.toLowerCase().includes(term) && (cat === 'all' || p.category === cat));
    switch (sortSel.value) {
        case 'price-asc': out.sort((a, b) => a.price - b.price); break;
        case 'price-desc': out.sort((a, b) => b.price - a.price); break;
        case 'rating-desc': out.sort((a, b) => b.rating - a.rating); break;
        case 'rating-asc': out.sort((a, b) => a.rating - b.rating); break;
    }
    renderProducts(out);
}

function renderProducts(items) {
    grid.innerHTML = '';
    if (items.length === 0) { emptyP.hidden = false; return; } else emptyP.hidden = true;
    items.forEach(p => {
        const el = document.createElement('div'); el.className = 'product';
        el.innerHTML = `<img alt="${p.name}" src="${p.img}">\n          <h4>${p.name}</h4>\n          <div class="chip">${p.category}</div>\n          <div class="price" style="margin-top:8px">₹${p.price}</div>\n          <div aria-label="rating">⭐ ${p.rating.toFixed(1)}</div>`;
        grid.append(el);
    });
}

catSel.onchange = applyFilters; search.oninput = applyFilters; sortSel.onchange = applyFilters;
applyFilters();