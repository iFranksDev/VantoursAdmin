/*var mainApp = {};

(function(){*/
    //let img = document.getElementById('img');
var firebase = app_fireBase;
var uid = null;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      uid = user.uid;
      //console.log(user.uid);
    }else{
        uid = null;
        window.location.replace("index.html");
    }   
});
function logOut(){
    firebase.auth().signOut();
}
this.logOut = logOut;

///////////////////////////////////////////Materialize///////////////////////////////////////////
/* Add your logic here */
document.addEventListener('DOMContentLoaded', function() {
  var collapsibles = document.querySelectorAll('.collapsible');
  var instances_collapsible = M.Collapsible.init(collapsibles);

  var modal = document.querySelectorAll('.modal');
  var instances_modal = M.Modal.init(modal);

  var chips = document.querySelectorAll('.chips');
  var instances_chips = M.Chips.init(chips);

  var fab = document.querySelectorAll('.fixed-action-btn');
  var instances_fab = M.FloatingActionButton.init(fab);

  var datepicker = document.querySelectorAll('.datepicker');
  var instances_dp = M.Datepicker.init(datepicker, {
    defaultDate: new Date(),
    minDate: new Date(),
    i18n: { //Language
      cancel: "Cancelar",
      months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      weekdaysAbbrev: ["D","L", "M", "M", "J", "V", "S"]
    }
  });
});
///////////////////////////////////////////Materialize///////////////////////////////////////////
  
  
  const db = firebase.firestore();
  const taskForm = document.getElementById("task-form");
  const tasksContainer = document.getElementById("tasks-container");
  let editStatus = false;
  let id = '';
  
  
  ///////////////////////////////////////////////////////////
  /** 
   * Save a New Task in Firestore
   * @param {string} title the title of the Task
   * @param {string} description the description of the Task
   */
  
  const saveTask = (title, description, descriptionLarge, price, dates1, dates2, photo) =>
    db.collection("tours").doc().set({
      title,
      description,
      descriptionLarge,
      price,
      dates1,
      dates2,
      photo
    });
  
  ////////////////////////////////////////////////////////////
  
  const getTasks = () => db.collection("tours").get();
  
  const onGetTasks = (callback) => db.collection("tours").onSnapshot(callback);
  
  const deleteTask = (id) => db.collection("tours").doc(id).delete();
  
  const getTask = (id) => db.collection("tours").doc(id).get();
  
  const updateTask = (id, updatedTask) => db.collection('tours').doc(id).update(updatedTask);
  

  
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    onGetTasks((querySnapshot) => {
      tasksContainer.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        const mod = document.addEventListener('DOMContentLoaded', function() {
          var elems = document.querySelectorAll('.modal');
          
        });
        
       
        tasksContainer.innerHTML += 
    `<div class="col s10 m8 l3 offset-s1 offset-m2" style="margin-top: 1.2rem;">
      <div class="card z-depth-4" align="right" style="margin-bottom: 0.5rem;">
        <div class="card-image" style="
        width: 100%;
        height: 400px;
        background-image: url('${task.photo}');
        background-size: cover;" >

          <!--img class="materialboxed" src="${task.photo}" id="img"-->
        
          <a class="btn-small halfway-fab orange darken-4 right">$${task.price}</a>
      
          <br>
        </div>
        <div class="card-content" align="left">
          <span class="card-title activator grey-text text-darken-4"><span class="card-title">
          <blockquote style="border-color:#0b4c7c">${task.title}</blockquote>
          </span><i class="material-icons right">more_vert</i></span>
          <p>${task.description}</p>
        </div>
        <div class="card-reveal">
          <blockquote>
          <span class="card-title grey-text text-darken-4">${task.title}<i class="material-icons right">close</i></span>
          </blockquote>
          <p>${task.descriptionLarge}</p>
          <div class="chip">
            De
            ${task.dates1}
            hasta
            ${task.dates2}
          </div>
          <div class="chip">
            $${task.price}
          </div>
        </div>
        <div class="chip" >
          De 
          ${task.dates1}
          hasta 
          ${task.dates2}
        </div>
      </div>
      
      <div>
        <button class="btn-delete white orange-text text-darken-4 waves-effect waves-light btn" data-id="${doc.id}">
          <i class="material-icons">delete_forever</i>
          Borrar
        </button>
        <button class="btn-edit white blue-text text-darken-4 waves-effect waves-light btn" data-id="${doc.id}" onclick="scrollToTop()">
          <i class="material-icons">edit</i>  
          Editar
        </button>
      </div> 

    </div>          
    `;
      
      });
  
  
  
  
  
  
      const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          try {
            if(confirm("El tour se eliminará por completo, ¿Desea continuar?"))
              await deleteTask(e.target.dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      


  
  
      const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            
            const doc = await getTask(e.target.dataset.id);
            const task = doc.data();
            ///////////////////////////////////////////////////////////
            taskForm["task-title"].value = task.title;
            taskForm["task-description"].value = task.description;
            taskForm["task-descriptionLarge"].value = task.descriptionLarge;
            taskForm["task-price"].value = task.price;
            taskForm["task-dates-1"].value = task.dates1;
            taskForm["task-dates-2"].value = task.dates1;
            taskForm["task-photo"].value = task.photo;
            ///////////////////////////////////////////////////////////
  
            editStatus = true;
            id = doc.id;
            taskForm["btn-task-form"].innerText = "Save";

  
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
  
  
  
  
  
  
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  ///////////////////////////////////////////////////
    const title = taskForm["task-title"];
    const description = taskForm["task-description"];
    const descriptionLarge = taskForm["task-descriptionLarge"];
    const price = taskForm["task-price"];
    const dates1 = taskForm["task-dates-1"];
    const dates2 = taskForm["task-dates-2"];
    const photo = taskForm["task-photo"];
  ///////////////////////////////////////////////////
  
    try {
      if (!editStatus) {
        await saveTask(title.value, description.value, descriptionLarge.value, price.value, dates1.value, dates2.value, photo.value);
        M.toast({html: 'Guardado!'});
      } else {
        await updateTask(id, {
          title: title.value,
          description: description.value,
          descriptionLarge: descriptionLarge.value,
          price: price.value,
          dates1: dates1.value,
          dates2: dates2.value,
          photo: photo.value
        })
  
        editStatus = false;
        id = '';
        taskForm['btn-task-form'].innerText = 'Save';
        M.toast({html: 'Actualizado!'});
      }
  
      taskForm.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
  });
  

  let file = {};

 
  
 
      
//})()
const imagePreview = document.getElementById("imagePreview");
function chooseFile(e){
  file = e.target.files[0];

  saveFile();
  
}

function saveFile(){
  var input = document.getElementById('fileSelected');
  console.log(input.files.item(0).name);
  firebase.storage().ref(input.files.item(0).name).put(file).then(function(){
    console.log('succesful upload')
    firebase.storage().ref(input.files.item(0).name).getDownloadURL().then(imgURL =>{   
      console.log(imgURL); 
      img.src = imgURL;   
      document.getElementById("task-photo").value = imgURL;
    })
  }).catch(error=> {
    console.log(error.message);
})

}

function setBacktoNormal(){
  img.src = "https://via.placeholder.com/150";
}


function scrollToTop() { 
  window.scrollTo(0, 0); 
  
  var instance = M.Collapsible.getInstance(elem);
  instance.open(0); 

} 