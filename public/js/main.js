//tạo một mảng danh sách để hứng dữ liệu nhập vào
var todoList = [];

//Load todoList form localStorage
$(document).ready(function() {
    var json = localStorage.getItem('todoList')
    if(json != null){
        todoList = JSON.parse(json)     //sử dụng để chuyển đổi một chuỗi JSON thành một đối tượng JavaScript.
    }
    render()
});

//Save todoList to localStorage when tab closing
window.addEventListener('beforeunload', function (e) {
    this.localStorage.setItem('todoList', JSON.stringify(todoList)) //JSON.stringify(todoList) được sử dụng để chuyển đổi mảng todoList thành một chuỗi JSON trước khi lưu vào localStorage
});

// tạo một hàm để add dữ liệu vào mảng 
function addTodo() {
    var taskInput = document.getElementById('task');// phần nhập công việc
    var taskName = taskInput.value;// tạo taskinput trở thành một giá trị và gán giá trị đó cho taskname 


    // tương tự như công việc nhập vào, đây là phần thời gian bắt đầu và thời gian kết thúc
    var dateBeginInput = document.getElementById('currentDatebe');
    var dateEndInput = document.getElementById('currentDateen');
    var timeBegin = dateBeginInput.value;
    var timeEnd = dateEndInput.value;


    // tạo một đối tượng để chứa các thuộc tính  vừa tạo
    var todo = {
        taskName: taskName,
        timeBegin: timeBegin,
        timeEnd: timeEnd
    };

    todoList.push(todo);// thêm đối tượng vào mảng
    render();
    console.log(todoList); // use để kiểm tra  

    // reset lại trường công việc nhập vào.
    taskInput.value = "";
    dateBeginInput.value = "";
    dateEndInput.value = "";
}
// hiển thị 
function render() {
    let domTodoList = document.getElementById("todoList");
    let htmlTodoList = '';
    for (let i = 0; i < todoList.length; i++) {
        // var todo = todoList[i];
        htmlTodoList += `<tr>
                    <th scope="row">` + (i + 1) + `</th>
                    <td>` + todoList[i].taskName + `</td>
                    <td>` + todoList[i].timeBegin + `</td>
                    <td>` + todoList[i].timeEnd + `</td>
                    <td><input type="checkbox" onclick="check()" checked></td>
                    <td><button type="button" class="btn btn-success" onclick="editTodo(` + i + `)">Sửa</button></td>
                    <td><button type="button" class="btn btn-danger" onclick="deleteTodo(` + i + `)">Xoá</button></td>
                </tr>`;
    }

    domTodoList.innerHTML = '';
    domTodoList.innerHTML = htmlTodoList;
}

//    edit lỏ
function editTodo(index) {
    var updatedTaskName = prompt("Sửa công việc");
    if (updatedTaskName) {
        todoList[index].taskName = updatedTaskName;
        render();
    }
}


//   // Hàm xoá một công việc khỏi danh sách dựa trên chỉ mục (index)
function deleteTodo(index) {
    todoList.splice(index, 1);
    render();
}

render();

function check(){
    
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Chúc mừng đã hoàn thành công việc!",
      showConfirmButton: false,
      timer: 1500
    });
}