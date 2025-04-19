var output = [];
var childId = [];
var people = [{
  id: 1,
  name: "Aegon Targaryen",
  children: [{
    id: 2,
    name: "Jaehaerys Targaryen",
    children: [{
      id: 4,
      name: "Daenerys Targaryen"
    },{
      id: 5,
      name: "Rhaegar Targaryen",
      children: [{
        id: 6,
        name: "Aegon Targaryen"
      }]
    }] 
  },{
    id: 3,
    name: "Rhaelle Targaryen"
  }],
}];

function listChildId(people, childId) {

    for (var i = 0; i < people.children.length; i++) {
        childId.push(people.children[i].id);
        iterateFunc(people.children[i]);
    }
}


function iterateFunc(people) {
    if (people.children == undefined) {
        output.push({
            id: people.id,
            name: people.name,
            children: []
        });
    } else {
        var childId = [];
        listChildId(people, childId);
        output.push({
            id: people.id,
            name: people.name,
            children: childId
        })
    }
}

function objectNormalization(people) {
    iterateFunc(people[0]);
    for (var i = 0; i < output.length - 1; i++) {
        for (var j = 0; j < output.length - i - 1; j++) {
            if (output[j].id > output[j + 1].id) {
                var myTemp = output[j];
                output[j] = output[j + 1];
                output[j + 1] = myTemp;
            }
        }
    }

}

objectNormalization(people);
console.log(output);