function loadData() {
  const url = 'https://precios-7352b.firebaseio.com/precios.json';
  getData(url);
}


function getData(url) {
  const tbody = getElementById('precios');
  tbody.innerHTML = '';
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      let precios = data.results;
      return precios.map(function (precio, index) {
        let tr = createNode('tr'),
        tdNombre = createNode('td'),
        tdCodigo= createNode('td'),
        tdCategoria = createNode('td'),
        tdAttconsumidor= createNode('td'),
        tdCodigoBarra= createNode('td'),
        tdContenido = createNode('td'),
        tdTipo= createNode('td'),
        tdUnidad = createNode('td'),
        tdMarca= createNode('td'),
        tdProveedor= createNode('td'),
        tdCalidad = createNode('td'),
        tdAction = createNode('td');
        aAction = createNode('button');
        tdNombre.innerHTML = `${precio.nombre}`;
        tdCodigo.innerHTML = `${precio.codigo}`;
        tdCategoria.innerHTML = `${precio.categoria}`;
        tdAttconsumidor.innerHTML = `${precio.attconsumidor}`;
        tdCodigoBarra.innerHTML = `${precio.codebarra}`;
        tdContenido.innerHTML = `${precio.contenido}`;
        tdTipo.innerHTML = `${precio.tipo}`;
        tdUnidad.innerHTML = `${precio.unidad}`;
        tdMarca.innerHTML = `${precio.marca}`;
        tdProveedor.innerHTML = `${precio.proveedor}`;
        tdCalidad.innerHTML = `${precio.calidad}`;
        aAction.innerText = "Editar";
        aAction.addEventListener('click', () => setprecios(precio, index));
        append(tr, tdNombre);
        append(tr, tdCodigo);
        append(tr, tdCategoria);
        append(tr, tdAttconsumidor);
        append(tr, tdCodigoBarra);
        append(tr, tdContenido);
        append(tr, tdTipo);
        append(tr, tdUnidad);
        append(tr, tdMarca);
        append(tr, tdProveedor);
	      append(tr, tdCalidad);
        append(tdAction, aAction);
        append(tr, tdAction);
        append(tbody, tr);
      })
    })
    .catch(function (error) {
      console.log(JSON.stringify(error));
    });
}

function setprecios(precio, index) {
  none('table');
  block('formprecios');
  indexId = index;
  getElementById("listar").style.display = "none";
  setElementById('nombre', precio.nombre);
  setElementById('codigo', precio.codigo);
  setElementById('categoria', precio.categoria);
  setElementById('attconsumidor', precio.attconsumidor);
  setElementById('codigobarra', precio.codebarra);
  setElementById('contenido', precio.contenido);
  setElementById('tipo', precio.tipo);
  setElementById('unidad', precio.unidad);
  setElementById('marca', precio.marca);
  setElementById('proveedor', precio.proveedor);
  setElementById('calidad', precio.calidad);
  
  
}

function editData() {
  const url = `https://precios-7352b.firebaseio.com/precios/results/${indexId}.json`;
  setData(url);
}

function setData(url) {
  let data = {
    nombre: getElementById('nombre').value,
    codigo: getElementById('codigo').value,
    categoria: getElementById('categoria').value,
    attconsumidor: getElementById('attconsumidor').value,
    codebarra: getElementById('codigobarra').value,
    contenido: getElementById('contenido').value,
    tipo: getElementById('tipo').value,
    unidad: getElementById('unidad').value,
    marca: getElementById('marca').value,
    proveedor: getElementById('proveedor').value,
    calidad: getElementById('calidad').value

  }
  let fetchData = {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: new Headers()
  }
  fetch(url, fetchData).then(function (response) {
    console.log(response);
    none('formprecios');
    block('table');
    loadData();
  })
}

function getElementById(id) {
  return document.getElementById(id);
}
function setElementById(id, value) {
  return document.getElementById(id).value = value;
}
function createNode(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendChild(el);
}
function block(id) {
  document.getElementById(id).style.display = 'block';
}
function none(id) {
  document.getElementById(id).style.display = 'none';
}