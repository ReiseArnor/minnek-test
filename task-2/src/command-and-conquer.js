var current_dog_list = [];

const get_sub_breeds = async (breed) => {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/list`);
    const json = await response.json();
    return json.message;
};

const get_dogs = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const json = await response.json();
    const dogs = json.message;

    for (var breed in dogs) {
        var sub_breeds = await get_sub_breeds(breed);
        current_dog_list[current_dog_list.length] = [
            current_dog_list.length,
            breed,
            sub_breeds,
        ];
    }
};

function update_modify_id(new_list_size) {
    var modify_id = document.getElementById("modify-id");
    if (new_list_size == -1)
    {
        modify_id.setAttribute("max", 0);
        return;
    }
    modify_id.setAttribute("max", new_list_size);
}

function update_list() {
    const new_list = [];
    for (var index = 0; index < current_dog_list.length; index++) {
        new_list[new_list.length] = [
            new_list.length,
            current_dog_list[index][1],
            current_dog_list[index][2],
        ];
    }
    current_dog_list = new_list;
    update_modify_id(current_dog_list.length - 1);
}

function delete_dog(id) {
    current_dog_list.splice(id, 1);
    update_list();
    update_search();
}

function add_dog() {
    console.log("add_dog");
    var new_breed = document.getElementById("new-breed");
    var new_sub_breed = document.getElementById("new-sub-breed");
    var new_dog = new_breed.value;
    var new_dog_sub_breeds = new_sub_breed.value;
    console.log("dog: " + new_dog);

    var sub_breeds = [];
    if (new_dog_sub_breeds != "") {
        console.log("sub-breeds: " + new_dog_sub_breeds);
        sub_breeds = new_dog_sub_breeds.split(",");
    }

    current_dog_list[current_dog_list.length] = [
        current_dog_list.length,
        new_dog,
        sub_breeds,
    ];

    new_breed.value = "";
    new_sub_breed.value = "";
    update_search();
}

function modify_dog() {
    console.log("modify dog");
    if (current_dog_list.length <= 0){
        return;
    }
    var mod_id = document.getElementById("modify-id");
    var id = mod_id.value;
    console.log("id: " + id);
    var mod_breed = document.getElementById("modify-breed");
    var breed = mod_breed.value;
    console.log("breed: " + breed);
    var mod_sub_breeds = document.getElementById("modify-sub-breed");

    var sub_breeds = [];
    if (mod_sub_breeds.value != "") {
        console.log("sub-breeds: " + mod_sub_breeds.value);
        sub_breeds = mod_sub_breeds.value.split(",");
    }

    current_dog_list[id] = [id, breed, sub_breeds];

    mod_id.value = "";
    mod_breed.value = "";
    mod_sub_breeds.value = "";
    update_search();
}

function create_table(arr, table_element) {
    var tr_th = document.createElement("tr");
    var id = document.createElement("th");
    id.innerHTML = "ID";
    var th_breed = document.createElement("th");
    th_breed.innerHTML = "Breed";
    var th_sub_breed = document.createElement("th");
    th_sub_breed.innerHTML = "Sub Breed";
    tr_th.appendChild(id);
    tr_th.appendChild(th_breed);
    tr_th.appendChild(th_sub_breed);
    table_element.appendChild(tr_th);

    for (var index = 0; index < arr.length; index++) {
        var tr = document.createElement("tr");

        var breed_id = document.createElement("td");
        breed_id.innerHTML = arr[index][0];

        var breed = document.createElement("td");
        breed.innerHTML = arr[index][1];

        var sub_breed = document.createElement("td");
        if (arr[index][2] == undefined) {
            sub_breed.innerHTML = "";
        } else {
            sub_breed.innerHTML = arr[index][2].join(", ");
        }

        var del_td = document.createElement("td");
        var del_button = document.createElement("button");
        del_button.setAttribute("onclick", `delete_dog(${arr[index][0]})`);
        del_button.setAttribute("class", "button-delete");
        del_button.innerHTML = "delete";

        del_td.appendChild(del_button);
        tr.appendChild(breed_id);
        tr.appendChild(breed);
        tr.appendChild(sub_breed);
        tr.appendChild(del_td);
        table_element.appendChild(tr);
    }
}

function destroy_table(table_element) {
    table_element.innerHTML = "";
}

const full_table = async (first_time) => {
    if (first_time) {
        await get_dogs();
    }

    console.log("update_table");
    console.log(current_dog_list.length);
    var dog_table = document.getElementById("dog-table");

    create_table(current_dog_list, dog_table);
    update_modify_id(current_dog_list.length - 1);
};

function search_by_breed(table, rgx) {
    for (var index = 0; index < current_dog_list.length; index++) {
        console.log(current_dog_list[index][1]);
        console.log(rgx);
        if (current_dog_list[index][1].match(rgx)) {
            table.push(current_dog_list[index]);
        }
    }
}

function search_by_sub_breed(temp_table, rgx) {
    for (var index = 0; index < current_dog_list.length; index++) {
        for (var n_sub = 0; n_sub < current_dog_list[index][2].length; n_sub++) {
            if (current_dog_list[index][2][n_sub].match(rgx)) {
                temp_table.push(current_dog_list[index]);
                break;
            }
        }
    }
}

function update_search() {
    console.log("update_search");
    var query = document.getElementById("search").value;
    var option = document.getElementById("search-type").value;
    console.log("query: " + query);
    var dog_table = document.getElementById("dog-table");

    if (query == "") {
        destroy_table(dog_table);
        full_table(false);
        return;
    }

    var temp_table = [];
    const rgx = new RegExp(query);
    if (option == "breed") {
        search_by_breed(temp_table, rgx);
    } else {
        search_by_sub_breed(temp_table, rgx);
    }

    destroy_table(dog_table);
    create_table(temp_table, dog_table);
}

full_table(true);
console.log(current_dog_list);
