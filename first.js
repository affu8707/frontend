function del(id)
{
    fetch(`http://3.27.121.19:8000/api/student/${id}/delete`,{
        method : 'DELETE'
    })
.then(res => res.json())
.then(res => console.log(res));
}

async function geteditapi(url){
    const response = await fetch(url);

    var editdata = await response.json();
 console.log(editdata);
    let mydata = ` 
    <input type="hidden" name="id" id="id" value="${editdata.student.id}">
    <div class="mb-3">
      <label for="exampleInput1" class="form-label"></label>
      <input type="text" name="name" value="${editdata.student.name}" class="form-control" id="exampleInput1">
    </div>
    <div class="mb-3">
      <label for="exampleInput2" class="form-label">Course</label>
      <input type="text" name="course" value="${editdata.student.course}" class="form-control" id="exampleInput2">
    </div>
    <div class="mb-3">
      <label for="exampleInput3" class="form-label">Email</label>
      <input type="email" name="email" value="${editdata.student.email}" class="form-control" id="exampleInput3">
    </div>
    <div class="mb-3">
      <label for="exampleInput4" class="form-label">Phone Number</label>
      <input type="number" name="phone" value="${editdata.student.phone}" class="form-control" id="exampleInput4">
    </div>
    <div class="mb-3">
      <button type="submit" class="btn btn-warning">Edit Student</button>
    </div>
    `;
    document.getElementById('form-edit').innerHTML=mydata;
}

const editForm = document.getElementById('form-edit');
editForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    data={
        id : editForm.id.value,
        name: editForm.name.value,
        course: editForm.course.value,
        email: editForm.email.value,
        phone: editForm.phone.value,
    }
    record=JSON.stringify(data);
    const response = await fetch(`http://3.27.121.19:8000/api/student/${data.id}/edit`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: record
    });

    const result = await response.json();
    if(result.status==200)
    {
        window.location.reload();
    }
});

function update(id){
    const api_url = `http://127.0.0.1:8000/api/student/${id}/edit`;
    geteditapi(api_url);
}

const thisForm = document.getElementById('form-data');
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    data={
        name: thisForm.name.value,
        course: thisForm.course.value,
        email: thisForm.email.value,
        phone: thisForm.phone.value,
    }
    record=JSON.stringify(data);
    const response = await fetch('http://3.27.121.19:8000/api/student/', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: record
    });

    const result = await response.json();
    if(result.status==200)
    {
        window.location.reload();
    }
});


// api url
const api_url =
	"http://3.27.121.19:8000/api/student/";

// Defining async function
async function getapi(url) {
	
	// Storing response
	const response = await fetch(url);
	
	// Storing data in form of JSON
	var data = await response.json();
	console.log(data);
	if (response) {
		hideloader();
	}
	show(data);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
	document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
	let tab =
		`<tr>
		<th scope="col">Sr No.</th>
		<th>Name</th>
		<th>Course</th>
		<th>Email</th>
        <th>Phone No.</th>
        <th colspan='2' class='text-center'>Action</th>
		</tr>`;
	
	// Loop to access all rows
	for (let r of data.student) {
		tab += `<tr>
	<td>${r.id} </td>
	<td>${r.name}</td>
	<td>${r.course}</td>
	<td>${r.email}</td>		
	<td>${r.phone}</td>
    <td> 
    <button type="button" id="editbtn" onclick="update(${r.id})" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#editModal">
      Edit Student
    </button></td>
    <td><button class='btn btn-danger'  data-dismiss="modal" onclick="del(${r.id})">Delete</td>	
</tr>`;
	}
	// Setting innerHTML as tab variable
	document.getElementById("employees").innerHTML = tab;
}


const api = document.getElementById('form-data');
console.log(api);