// Backbone Models and Collections and View
var Student = Backbone.Model.extend({
	defaults: {
		first_names: '',
    last_names: '',
    email: '',
    grade: '',
    code: '',
	}
});
 
var StudentCollection = Backbone.Collection.extend({
	model: Student
});

var AppView = Backbone.View.extend({
  students: new StudentCollection(),
  basePDF: null,
  folderPDF: null,
  basePDFUploaded: null,
  pdfType: null,
  el: '#app',
  initialize: function(){
  },
  render: function() {
    
  },
  events: {
    // 'change input[name=optType]': 'changedType',
    'change #slcType': 'changedType', 
    'click #btnSend': 'send',
    'click #btnLoadCSV': 'loadCSV',
    'change #inputFilePDF': 'selectPDF',
    'click .btn-resend': 'resend',
  },
  changedType: function(event){
    this.pdfType = event.target.value;
  },
  loadCSV: function(event){
    var inputFile = $('#inputFileCSV');
    var ext = inputFile.val().split('.').pop().toLowerCase();
    if($.inArray(ext, ['csv']) == -1) {
      $('#alertMessage').addClass('alert-danger');
      $('#alertMessage').html('Debe de seleccionar un el archivo CSV con la información de los alumnos');
      $('#alertRow').removeClass('no-height');
      setInterval(() => {
        $('#alertMessage').removeClass('alert-danger');
        $('#alertMessage').html('');
        $('#alertRow').addClass('no-height');
      }, 5000);
      return false
    }
    if(this.pdfType == null) {
      $('#alertMessage').addClass('alert-danger');
      $('#alertMessage').html('Debe de seleccionar Tipo de Certificado a emitir');
      $('#alertRow').removeClass('no-height');
      setInterval(() => {
        $('#alertMessage').removeClass('alert-danger');
        $('#alertMessage').html('');
        $('#alertRow').addClass('no-height');
      }, 5000);
      return false
    }
    this.students.reset();
    if (inputFile.prop('files')[0] != undefined) {
      var reader = new FileReader();
      var _this = this;
      reader.onload = function(e) {
        fileContent = reader.result;
        var allTextLines = fileContent.split(/\r\n|\n/);
        var i = 0;
        allTextLines.forEach(element => {
          if(i != 0 && (allTextLines.length - 2) >= i){
            var dataArray = element.split(',');
            var student = new Student({
              id: i ,
              last_names: dataArray[0],
              first_names: dataArray[1],
              email: dataArray[2],
              grade: dataArray[3],
              code: dataArray[4],
              subject: dataArray[5],
            });
            _this.students.add(student);  
          }
          i++;
        });
        _this.showTable();
      }
      reader.readAsText(inputFile.prop('files')[0], 'UTF-8');
    }
  },
  showTable: function(){
    $('#studentTable').empty();
    var tbody = '';
    if(this.pdfType == 'certified'){
      tbody = `
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Nombres</th>
            <th scope="col">Correo</th>
            <th scope="col">Asunto</th>
            <th class="text-center" scope="col">Nota</th>
            <th class="text-center" scope="col">Cód. de Registro</th>
            <th scope="col">Acciones</th>
            <th scope="col">Resultado</th>
          </tr>
        </thead>
        <tbody>
      `;
      var i = 0;
      this.students.forEach(student => {
        tbody += `
          <tr model-id="${student.get('id')}">
            <th>${++i}</th>
            <td>${student.get('last_names')}</td>
            <td>${student.get('first_names')}</td>
            <td>${student.get('email')}</td>
            <td>${student.get('subject')}</td>
            <td class="text-center">${student.get('grade')}</td>
            <td class="text-center">${student.get('code')}</td>
            <td>
              <button type="button" class="btn btn-info btn-resend">
                <i class="fa fa-undo" aria-hidden="true"></i>
                  Reennviar
                </button>
            </td>
            <td>Envio Pendiente</td>
          </tr>
        `;
      });
      tbody += `
        </tbody>
      `;
    }else if(this.pdfType == 'course'){
      tbody = `
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Nombres</th>
            <th scope="col">Correo</th>
            <th scope="col">Asunto</th>
            <th class="text-center" scope="col">Registro</th>
            <th scope="col">Acciones</th>
            <th scope="col">Resultado</th>
          </tr>
        </thead>
        <tbody>
      `;
      var i = 0;
      this.students.forEach(student => {
        console.log(student)
        tbody += `
          <tr model-id="${student.get('id')}">
            <th>${++i}</th>
            <td>${student.get('last_names')}</td>
            <td>${student.get('first_names')}</td>
            <td>${student.get('email')}</td>
            <td>${student.get('subject')}</td>
            <td class="text-center">${student.get('code')}</td>
            <td>
              <button type="button" class="btn btn-info btn-resend">
                <i class="fa fa-undo" aria-hidden="true"></i>
                  Reennviar
              </button>
            </td>
            <td>Envio Pendiente</td>
          </tr>
        `;
      });
      tbody += `
        </tbody>
      `;
    } else if(this.pdfType == 'free-course'){
    tbody = `
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Nombres</th>
          <th scope="col">Correo</th>
          <th scope="col">Asunto</th>
          <th scope="col">Acciones</th>
          <th scope="col">Resultado</th>
        </tr>
      </thead>
      <tbody>
    `;
    var i = 0;
    this.students.forEach(student => {
      // console.log(student)
      tbody += `
        <tr model-id="${student.get('id')}">
          <th>${++i}</th>
          <td>${student.get('last_names')}</td>
          <td>${student.get('first_names')}</td>
          <td>${student.get('email')}</td>
          <td>${student.get('subject')}</td>
          <td>
            <button type="button" class="btn btn-info btn-resend">
              <i class="fa fa-undo" aria-hidden="true"></i>
                Reennviar
            </button>
          </td>
          <td>Envio Pendiente</td>
        </tr>
      `;
    });
    tbody += `
      </tbody>
    `;
  }
    $('#studentTable').append(tbody);
  },
  selectPDF: function(event){
    var inputFile = $('#inputFilePDF');
    var ext = inputFile.val().split('.').pop().toLowerCase();
    if($.inArray(ext, ['pdf']) == -1) {
      $('#alertMessage').addClass('alert-danger');
      $('#alertMessage').html('Debe de seleccionar un el archivo PDF del certificado');
      $('#alertRow').removeClass('no-height');
      setInterval(() => {
        $('#alertMessage').removeClass('alert-danger');
        $('#alertMessage').html('');
        $('#alertRow').addClass('no-height');
      }, 5000);
    }else{
      this.basePDF = inputFile[0].files[0];
    }
  },
  resend: function(event){
    var modelId = event.target.parentElement.parentElement.getAttribute('model-id');
    var student = this.students.get(modelId);
    if(this.folderPDF == null || this.basePDFUploaded == null){
      var _this = this;
      var form_data = new FormData();
      form_data.append('pdf_file', _this.basePDF);
      $.ajax({
        type: 'POST',
        url: BASE_URL + 'student/upload',
        headers: {
          // [CSRF_KEY]: CSRF,
        },
        data: form_data,
        //use contentType, processData for sure.
        contentType: false,
        processData: false,
        async: false,
        beforeSend: function() {
        },
        success: function(data) {
          var resp = JSON.parse(data);
          _this.folderPDF = resp.folder;
          _this.basePDFUploaded = resp.name;
          _this.sendStudent(student);
        },
        error: function(xhr, status, error){
          console.error(xhr.responseText);
          resp.status = xhr.status;
          resp.message = xhr.responseText;
        }
      });
    }else{
      this.sendStudent(student);
    }
  },
  sendStudent: function(student){
    var _this = this;
    $.ajax({
      url: BASE_URL + 'student/send',
      type: 'POST',
      data: {
        data: JSON.stringify([student.toJSON()]),
        file: _this.basePDFUploaded,
        folder: _this.folderPDF,
        type: _this.pdfType,
      },
      headers: {
        // [CSRF_KEY]: CSRF,
      },
      async: true,
      beforeSend: function() {
        $("#btnSend").prop("disabled", true);
        $(".btn-resend").prop("disabled", true);
      },
      success: function(data) {
        var respData = JSON.parse(data);
        respData.forEach(data => {
          var tr = $("tr[model-id='" + data._id +"']");
          tr.children().last().html('Enviado')
        });
        $("#btnSend").prop("disabled", false);
        $(".btn-resend").prop("disabled", false);
      }
    });
  },
  send: function(event){
    if(this.pdfType == null){
      $('#alertMessage').addClass('alert-danger');
      $('#alertMessage').html('Debe de seleccionar Tipo de Certificado a emitir');
      $('#alertRow').removeClass('no-height');
      setInterval(() => {
        $('#alertMessage').removeClass('alert-danger');
        $('#alertMessage').html('');
        $('#alertRow').addClass('no-height');
      }, 5000);
    }else{
      // send pdf
      var _this = this;
      var form_data = new FormData();
      form_data.append('pdf_file', _this.basePDF);
      $.ajax({
        type: 'POST',
        url: BASE_URL + 'student/upload',
        headers: {
          // [CSRF_KEY]: CSRF,
        },
        data: form_data,
        //use contentType, processData for sure.
        contentType: false,
        processData: false,
        async: false,
        beforeSend: function() {
        },
        success: function(data) {
          var resp = JSON.parse(data);
          _this.folderPDF = resp.folder;
          _this.basePDFUploaded = resp.name;
          if(_this.pdfType != 'certified'){
            _this.sendStudents();
          }else{
            _this.sendStudents();
            $('#alertMessage').addClass('alert-success');
            $('#alertMessage').html(`Certificados generados en la carpeta ${_this.folderPDF}`);
            $('#alertRow').removeClass('no-height');
          }
        },
        error: function(xhr, status, error){
          console.error(xhr.responseText);
          resp.status = xhr.status;
          resp.message = xhr.responseText;
        }
      });
      // create websockets
    }
  },
  sendStudents: function(folder, basePDF){
    var _this = this;
    $.ajax({
      url: BASE_URL + 'student/send',
      type: 'POST',
      data: {
        data: JSON.stringify(_this.students.toJSON()),
        file: _this.basePDFUploaded,
        folder: _this.folderPDF,
        type: _this.pdfType, 
      },
      headers: {
        // [CSRF_KEY]: CSRF,
      },
      async: true,
      beforeSend: function() {
        $("#btnSend").prop("disabled", true);
        $(".btn-resend").prop("disabled", true);
      },
      success: function(data) {
        var respData = JSON.parse(data);
        respData.forEach(data => {
          var tr = $("tr[model-id='" + data._id +"']");
          tr.children().last().html('Enviado')
        });
        $("#btnSend").prop("disabled", false);
        $(".btn-resend").prop("disabled", false);
      }
    });
  },
});

var StudenTable = Backbone.View.extend({
  model: StudentCollection,
  el: 'studentsRow',
  render: function() {
    
  },
});

// form actions

function CSVtoTable(event){
  var inputFile = $('#inputFile');
  var ext = inputFile.val().split('.').pop().toLowerCase();
  if($.inArray(ext, ['csv']) == -1) {
    alert('Upload CSV');
    return false;
  }
  if (inputFile.prop('files')[0] != undefined) {
    var reader = new FileReader();
    reader.onload = function(e) {
      fileContent = reader.result;
      var allTextLines = fileContent.split(/\r\n|\n/);
      var i = 0;
      var students = new StudentCollection();
      allTextLines.forEach(element => {
        if(i != 0 && (allTextLines.length - 2) >= i){
          var dataArray = element.split(':');
          var student = new Student({
            last_names: dataArray[0],
            first_names: dataArray[1],
            email: dataArray[2],
            grade: dataArray[3],
          });
          students.add(student);  
        }
        i++;
      });
      console.log(students)
      /*
      $.ajax({
        url: 'http://localhost:3000/student/send_pdfs',
        type: 'POST',
        data: {
          data: JSON.stringify(students)
        },
        headers: {
          // [CSRF_KEY]: CSRF,
        },
        async: false,
        success: function(data) {
          console.log(data)
        }
      });
      */
    }
    reader.readAsText(inputFile.prop('files')[0], 'UTF-8');
  }
  return false;
}

function sendPDFs(){
  var table = new StudenTable();
  table.render();
}

$(document).ready(function() {
  new AppView();
});