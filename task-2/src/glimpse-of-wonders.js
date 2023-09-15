const get_breed_img = async (breed) => {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    const json = await response.json();
    return json.message;
}

const get_sub_breeds = async (breed) => {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/list`)
    const json = await response.json();
    return json.message;
}

const get_dogs = async () => {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const json = await response.json();
  const dogs = json.message;
  var ul = document.getElementById("gallery");

  for (var breed in dogs){
    var li = document.createElement('li');
    var figure = document.createElement("figure");
    var figcaption = document.createElement("figcaption");
    figcaption.innerHTML = breed;

    var img_url = await get_breed_img(breed);
    var img = document.createElement('img');
    img.setAttribute("src", img_url);

    var div = document.createElement('div')
    div.setAttribute("class", "overlay")
    var span = document.createElement('span')

    var sub_breeds = await get_sub_breeds(breed);
    var str_sub_breeds = sub_breeds.join("<br>");
    span.innerHTML = str_sub_breeds;

    div.appendChild(span);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    figure.appendChild(div);
    li.appendChild(figure);
    ul.appendChild(li);
  }
}

get_dogs();
