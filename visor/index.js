import {data} from './data/datos_c3.js';

// Definir una lista de colores
const colores = ["table-primary", "table-secondary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-dark"];
let contadorTablas = 0; // Contador para alternar colores

// Función recursiva para contar contenidos que no sean del tipo "DIRECTORY"
const contarContenidos = (nodos) => {
    let contador = 0;

    nodos.forEach(nodo => {
        // Si el tipo no es "DIRECTORY", incrementar el contador
        if (nodo.type !== "DIRECTORY") {
            contador++;
        }

        // Si el nodo tiene subnodos, realizar la recursión
        if (nodo.nodes && nodo.nodes.length > 0) {
            contador += contarContenidos(nodo.nodes);
        }
    });

    return contador;
};

// Función para crear un elemento 'th' con texto
const crearTH = (texto) => {
    const th = document.createElement('th');
    th.textContent = texto;
    return th;
};

// Función para crear una celda 'td' con atributos comunes
const crearTD = (contenido, targetId) => {
    const td = document.createElement('td');
    td.textContent = contenido;
    td.classList.add('collapsed');
    td.setAttribute("data-bs-toggle", "collapse");
    td.setAttribute("data-bs-target", `#flush-collapse-${targetId}`);
    td.setAttribute("aria-expanded", "false");
    td.setAttribute("aria-controls", `flush-collapse-${targetId}`);
    return td;
};

// Función para alternar la creación o eliminación de nodos hijos recursivamente
const toggleNodosHijos = (tr_padre, cant_tds, id_padre, subnodos) => {
    const existingTr = document.getElementById(`flush-collapse-${id_padre}`);
    
    // Si los nodos hijos ya existen, eliminarlos
    if (existingTr) {
        existingTr.remove();
        return; // Salir de la función
    }

    // Si no existen, crearlos
    const trContainer = document.createElement('tr');
    trContainer.id = `flush-collapse-${id_padre}`;
    trContainer.classList.add('accordion-collapse', 'show');
    
    const tdContainer = document.createElement('td');
    tdContainer.classList.add('accordion-body');
    tdContainer.colSpan = cant_tds;

    const table = document.createElement('table');
    table.classList.add("table", "border", "mb-0");

    // Aplicar color alternante a la tabla según el contador
    const colorClase = colores[contadorTablas % colores.length];
    table.classList.add(colorClase); // Asignar la clase de color
    contadorTablas++; // Incrementar el contador para el siguiente color

    const thead = document.createElement('thead');
    thead.classList.add('table-dark');
    
    const trhead = document.createElement('tr');
    const theadArray = ["Nombre", "Tipo", "Cantidad de Subcarpetas", "Total de Contenidos"];
    theadArray.forEach(t => trhead.appendChild(crearTH(t)));
    
    thead.appendChild(trhead);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    subnodos.forEach(nodo => {
        const tr = document.createElement('tr');
        tr.id = nodo._id;
        tr.classList.add('accordion-item', 'collapsed');

        const td_name = crearTD(nodo.name, nodo._id);
        const td_type = crearTD(nodo.type, nodo._id);

        const td_qnty_fold = crearTD(
            nodo.type === "DIRECTORY" ? nodo.nodes.length : "-", 
            nodo._id
        );
        
        const td_ttl_content = crearTD(
            nodo.type === "DIRECTORY" ? contarContenidos(nodo.nodes) : "-", 
            nodo._id
        );

        tr.appendChild(td_name);
        tr.appendChild(td_type);
        tr.appendChild(td_qnty_fold);
        tr.appendChild(td_ttl_content);

        tbody.appendChild(tr);

        // Verificar si el nodo tiene hijos y agregar un event listener recursivo
        if (nodo.nodes && nodo.nodes.length > 0) {
            tr.addEventListener('click', () => {
                toggleNodosHijos(tr, 4, nodo._id, nodo.nodes);
            });
        }
    });

    table.appendChild(tbody);
    tdContainer.appendChild(table);
    trContainer.appendChild(tdContainer);

    // Insertar el nuevo tr justo después del tr padre
    tr_padre.parentNode.insertBefore(trContainer, tr_padre.nextSibling);
};

// Crear las filas principales
const table_body = document.getElementById('table_body');
data.forEach(d => {
    const tr = document.createElement('tr');
    tr.id = d._id;
    tr.classList.add('accordion-item');

    const td_name = crearTD(d.name, d._id);

    const td_qnty_fold = crearTD(   
        d.nodes.length, 
        d._id
    );

    const td_ttl_content = crearTD(
        contarContenidos(d.nodes), 
        d._id
    );

    tr.appendChild(td_name);
    tr.appendChild(td_qnty_fold);
    tr.appendChild(td_ttl_content);
    
    const cant_tds = tr.getElementsByTagName("td").length;

    // Añadir el event listener para alternar los nodos hijos al hacer clic
    tr.addEventListener('click', () => {
        toggleNodosHijos(tr, cant_tds, d._id, d.nodes);
    });

    table_body.appendChild(tr);
});

const endpoint = 'http://127.0.0.1:5005/api/dash/table/contenido'

async function fetchData() {
    try {
        const response = await fetch(endpoint);

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        // Convierte la respuesta a JSON
        const data = await response.json();

        // Obtiene el contenedor donde se mostrarán los datos
        const tableBody = document.getElementById('accordion-data');

        // Limpia cualquier contenido previo en el cuerpo de la tabla
        tableBody.innerHTML = '';

        // Recorre el array de "dato" y agrega cada elemento a la tabla
        data.dato.forEach((item, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td class='align-middle'>${index + 1}</td>
                <td class='align-middle'>${item.categoria}</td>
                <td class='align-middle'>${item.subcategoria}</td>
                <td class='align-middle'>${item.tema}</td>
                <td class='align-middle'>${item.contenido}</td>
            `;

            // Añade la fila a la tabla
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        const tableBody = document.getElementById('accordion-data');
        tableBody.innerHTML = `<tr><td colspan="5">Error al cargar datos.</td></tr>`;
    }
}

function downloadXLSX() {
    // URL del archivo XLSX que quieres descargar
    const fileUrl = '../imgs/Inventario.xlsx'; // Reemplaza con la ruta a tu archivo

    // Crea un enlace temporal y haz clic en él para iniciar la descarga
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'Inventario.xlsx'; // Nombre del archivo descargado
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.getElementById('download-btn').addEventListener('click', downloadXLSX);

// Llama a la función para cargar los datos cuando se carga la página
window.onload = fetchData;
