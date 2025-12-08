let currentShape = '';

// Configuración de inputs necesarios por figura
const shapes = {
    cube: { title: "Volumen del Cubo", inputs: [{id: "side", label: "Lado (L)"}] },
    sphere: { title: "Volumen de la Esfera", inputs: [{id: "radius", label: "Radio (r)"}] },
    cylinder: { title: "Volumen del Cilindro", inputs: [{id: "radius", label: "Radio (r)"}, {id: "height", label: "Altura (h)"}] },
    cone: { title: "Volumen del Cono", inputs: [{id: "radius", label: "Radio (r)"}, {id: "height", label: "Altura (h)"}] },
    prism: { title: "Prisma Rectangular", inputs: [{id: "length", label: "Largo"}, {id: "width", label: "Ancho"}, {id: "height", label: "Altura"}] }
};

function selectShape(shapeKey) {
    currentShape = shapeKey;
    const data = shapes[shapeKey];
    
    // Mostrar área
    const calcArea = document.getElementById('calculation-area');
    calcArea.style.display = 'block';
    
    // Actualizar título
    document.getElementById('shape-title').innerText = data.title;
    document.getElementById('result').innerText = '';

    // Generar inputs dinámicamente
    const container = document.getElementById('inputs-container');
    container.innerHTML = '';
    
    data.inputs.forEach(input => {
        const group = document.createElement('div');
        group.className = 'input-group';
        group.innerHTML = `
            <label>${input.label}:</label>
            <input type="number" id="${input.id}" placeholder="Valor en cm">
        `;
        container.appendChild(group);
    });
}

function calculate() {
    let volume = 0;
    const resDiv = document.getElementById('result');

    try {
        if (currentShape === 'cube') {
            const s = parseFloat(document.getElementById('side').value);
            volume = Math.pow(s, 3);
        } else if (currentShape === 'sphere') {
            const r = parseFloat(document.getElementById('radius').value);
            volume = (4/3) * Math.PI * Math.pow(r, 3);
        } else if (currentShape === 'cylinder') {
            const r = parseFloat(document.getElementById('radius').value);
            const h = parseFloat(document.getElementById('height').value);
            volume = Math.PI * Math.pow(r, 2) * h;
        } else if (currentShape === 'cone') {
            const r = parseFloat(document.getElementById('radius').value);
            const h = parseFloat(document.getElementById('height').value);
            volume = (1/3) * Math.PI * Math.pow(r, 2) * h;
        } else if (currentShape === 'prism') {
            const l = parseFloat(document.getElementById('length').value);
            const w = parseFloat(document.getElementById('width').value);
            const h = parseFloat(document.getElementById('height').value);
            volume = l * w * h;
        }

        if (isNaN(volume) || volume <= 0) {
            resDiv.innerText = "Ingresa valores positivos válidos";
            resDiv.style.color = "#ff4d4d"; // Rojo alerta
        } else {
            resDiv.innerText = `V = ${volume.toFixed(2)} cm³`;
            resDiv.style.color = "var(--utez-green)";
        }
    } catch (e) {
        console.error(e);
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.querySelector('.toggle-mode');
    if(document.body.classList.contains('dark-mode')){
        btn.innerText = "☀️ Modo Día";
    } else {
        btn.innerText = "🌙 Modo Halcón";
    }
}